import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
} from "react-native";
import { Button, Icon } from "react-native-elements"
import Slider from "@react-native-community/slider";
import { FontAwesome5 } from "@expo/vector-icons";
import { FlatList, Dimensions } from "react-native";
import { baseURL, axiosInstance } from "../constants/Axios";
import * as SplashScreen from "expo-splash-screen";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import Lyric from "../component/Lyric";
import Modal from "react-native-modal";
import playlist from "../../assets/img/playlist.png";

const SKIP_INTERVAL = 10;

export default function DetailScreen({ navigation, route }) {
  const { s_id } = route.params;
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [sound, setSound] = useState();
  const [duration, setDuration] = useState(0);
  const [information, setInformation] = useState("");
  const [link, setLink] = useState("");
  const [lyrics, setLyrics] = useState("");

  useEffect(() => {
    loadAudio();
    loadInfomation();
    loadLyric();
    setupNotifications();
  }, []);

  useEffect(() => {
    sendNotification();
  }, [isPlaying]);

  useEffect(() => {
    if (link) {
      fetchLyrics();
    }
  }, [link]);
  
  const loadLyric = async () => {
    try {
      const lyricsData = await axiosInstance.get(`/musics/lyric/${s_id}`);
      setLink(lyricsData.data.data.data.file); 
    } catch (error) {
      console.error("Error loading lyrics:", error);
    }
  };
  
  const fetchLyrics = async () => {
    try {
      const response = await axiosInstance.get(link);
      if (response.status === 200) {
        const lyricsData = response.data;
        setLyrics(lyricsData);
      }
    } catch (error) {
      console.error('Error fetching lyrics:', error.message);
    }
  };

  const setupNotifications = async () => {
    await Notifications.requestPermissionsAsync();

    Notifications.addNotificationReceivedListener(handleNotification);

    const actionButton = [
      {
        text: "Dừng",
        onPress: playSound,
      },
      {
        text: "Phát",
        onPress: playSound,
      },
    ];

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
        priority: Notifications.AndroidNotificationPriority.MAX,
        actions: actionButton,
      }),
    });
  };

  const handleNotification = (notification) => {
    console.log("Notification received:", notification);
  };

  const sendNotification = async () => {
    const content = {
      title: "Memusy",
      body: isPlaying ? "Đang phát nhạc" : "Dừng phát nhạc",
      sound: true,
    };

    await Notifications.scheduleNotificationAsync({
      content,
      trigger: null,
    });
  };
  
  const loadInfomation = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        navigation.navigate("Login");
      }
      const info = await axiosInstance.get(`/musics/infosong/${s_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setInformation(info.data.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigation.navigate("Login");
      } else {
        console.error("Error loading info:", error);
      }
    }
  };

  const loadAudio = async () => {
    try {
      const mp3 = await axiosInstance.get(`/musics/song/${s_id}`);
      if (mp3.data.data.err !== -1150) {
        const audioURI = mp3.data.data.data["128"];
        const { sound } = await Audio.Sound.createAsync({
          uri: audioURI,
        });

        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          interruptionModeIOS: InterruptionModeIOS.DuckOthers,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
          playThroughEarpieceAndroid: false
        });

        setSound(sound);

        const status = await sound.getStatusAsync();
        setDuration(Math.round(status.durationMillis / 1000));

        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isPlaying) {
            setCurrentPosition(Math.round(status.positionMillis / 1000));
            setCurrentTime(status.positionMillis);
          }
        });
      } else {
        Alert.alert("Bài hát bản quyền", "Bạn không nghe được bài hát này", [
          {
            text: "Trở về",
            onPress: () => {
              navigation.goBack();
            },
          },
        ]);
      }
    } catch (error) {
      console.error("Error loading audio:", error);
    }
  };

  const playSound = async () => {
    if (!isPlaying) {
      if (!sound) {
        console.log("Error: Sound is not defined");
        return;
      }
      await sound.playAsync();
    } else {
      await sound.pauseAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const changeTime = (seconds) => {
    setCurrentPosition(seconds);
    setCurrentTime(seconds * 1000);
    sound.setPositionAsync(seconds * 1000);
  };

  const skipForward = () => {
    if (sound) {
      const newPosition = Math.min(duration, currentPosition + SKIP_INTERVAL);
      sound.setPositionAsync(newPosition * 1000);
      setCurrentTime(newPosition*1000);
      setCurrentPosition(newPosition);
    }
  };
  
  const skipBackward = () => {
    if (sound) {
      const newPosition = Math.max(0, currentPosition - SKIP_INTERVAL);
      sound.setPositionAsync(newPosition * 1000);
      setCurrentTime(newPosition*1000);
      setCurrentPosition(newPosition);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  };

  const [isReplay, setIsReplay] = useState(false);

  const replayMusic = async () => {
    setIsReplay(!isReplay)
  };

  useEffect(() => {
    if (currentPosition === duration) {
      if (isReplay) {
        const replayAsync = async () => {
          if (sound) {
            await sound.stopAsync();
          }
          await loadAudio();
          await playSound();
          setCurrentPosition(0);
          setCurrentTime(0);
        };
    
        replayAsync();
      } else {
        const stopPlayAsync = async () => {
          if (sound) {
            await sound.stopAsync();
          }
          await playSound();
        };

        stopPlayAsync();
      }
      
    }
    
  }, [isReplay, currentPosition, duration])

  //Modal
  const [isPlaylistModalVisible, setPlaylistModalVisible] = useState(false);
  const toggleModal = () => {
    setPlaylistModalVisible(!isPlaylistModalVisible);
  };

  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const toggleModalCreate = () => {
    setCreateModalVisible(!isCreateModalVisible);
  };

  //favourite
  const [isFavourite, setFavourite] = useState(false);
  const favouriteHandle = () => {
    setFavourite(!isFavourite);
  }

  const [isSuffle, setSuffle] = useState(false);
  const suffleHandle = () => {
    setSuffle(!isSuffle);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Now Playing</Text>
      <View style={styles.trackInfo}>
        <Animatable.Image
          animation={
            isPlaying
              ? {
                  from: { rotate: "0deg" },
                  to: { rotate: "360deg" },
                }
              : undefined
          }
          easing="linear"
          useNativeDriver
          iterationCount={isPlaying ? "infinite" : 1}
          duration={isPlaying ? 10000 : 0}
          source={{ uri: information.thumbnailM }}
          style={styles.coverImage}
        />

        <View style={{ alignItems: "flex-start", flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity style={{ flex: 1, marginRight: 10, alignItems:'flex-end' }}>
            <Ionicons
              name={"add-circle-outline"}
              size={32}
              color={"rgba(221,114,158,1)"}
              style={{ marginTop: 10 }}
              onPress={() => setPlaylistModalVisible(true)}
            />
          </TouchableOpacity>

          <View style={{ flex: 5 }}>
            <Text style={styles.trackName}>{information.title}</Text>
            <Text style={styles.artistName}>{information.artistsNames}</Text>
          </View>

          <TouchableOpacity 
            onPress={() => {
              favouriteHandle();
              if (!isFavourite) {
                Alert.alert("Thông báo", "Đã thêm vào yêu thích!");
              }
            }} 
            style={{ flex: 1 }}
          >
            <Ionicons
              name={isFavourite ? "heart" : "heart-outline"}
              size={32}
              color={"rgba(221,114,158,1)"}
              style={{ marginTop: 10 }}
            />
          </TouchableOpacity>
        </View>
        
      </View>

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={currentPosition}
        minimumTrackTintColor="gray"
        thumbTintColor="rgba(221,114,158,1)"
        onValueChange={changeTime}
      />

      <View style={styles.timeContainer}>
        <Text style={styles.timeStamp}>{formatTime(currentPosition)}</Text>
        <Text style={styles.timeStamp}>
          {formatTime(duration - currentPosition)}
        </Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity onPress={() => {
          replayMusic();
          if (!isReplay) {
            Alert.alert("Thông báo", "Đã thêm vào yêu thích!");
          }
        }}>
          <Ionicons
            name={"repeat"}
            size={32}
            color={isReplay ? "rgba(221,114,158,1)" : "gray"}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={skipBackward}>
          <FontAwesome5 name="undo" size={32} color="gray"></FontAwesome5>
        </TouchableOpacity>
        <TouchableOpacity onPress={playSound}>
          <FontAwesome5
            name={isPlaying ? "pause" : "play"}
            size={32}
            color="gray"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={skipForward}>
          <FontAwesome5 name="redo" size={32} color="gray"></FontAwesome5>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => {
            suffleHandle();
            if (!isSuffle) {
              Alert.alert("Thông báo", "Đã bật chế độ phát ngẫu nhiên!")
            }
          }}>
          <Ionicons
            name={"shuffle-outline"}
            size={32}
            color={isSuffle ? "rgba(221,114,158,1)" : "gray"}
          />
        </TouchableOpacity>
      </View>

      <Lyric lrc={lyrics} currentTime={currentTime} />

      {/* Danh sách playlist */}
      <Modal
          onBackdropPress={() => setPlaylistModalVisible(false)}
          onBackButtonPress={() => setPlayplistModalVisible(false)}
          isVisible={isPlaylistModalVisible}
          onSwipeComplete={toggleModal}
          animationIn="bounceInUp"
          animationOut="bounceOutDown"
          animationInTiming={600}
          animationOutTiming={300}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={300}
          style={styles.modal}
      >
        <View style={styles.modalContent}>
          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingRight: 15,
              paddingLeft: 10,
              paddingTop: 10,
              paddingBottom: 10,
            }}>
            <TouchableOpacity>
              <Icon
                name="chevron-left"
                type="font-awesome"
                color="white"
                size={24}
                style={{padding: 3}}
                onPress={() => setPlaylistModalVisible(false)}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 18,
                color: 'white',
                flex: 1,
                textAlign: 'center',
                fontWeight: "bold"
              }}>
              Add to Playlist
            </Text>
            <TouchableOpacity/>
          </View>

          {/* Content */}
          <View style={{height: height * 0.85}}>
            <ScrollView>
              <View style={{
                flexDirection: 'row',
                justifyContent: "space-between",
                alignItems: "center",
                paddingRight: 15,
                paddingLeft: 15,
                paddingTop: 5,
                paddingBottom: 5,
              }}>
                <View style={{flexDirection: "row", alignItems: 'center'}}>
                  <Image source={playlist} style={{width: 70, height: 70}}/>
                  <Text style = {{color: "white", fontSize: 18 , justifyContent: "center", marginLeft: 10}}> Tên playlist </Text>
                </View>

                <TouchableOpacity 
                  onPress={() => {
                    toggleModal(); 
                    Alert.alert("Thông báo", "Đã thêm vào playlist!");
                  }} 
                  style={{ alignItems: "flex-end" }}
                >
                  <View style={{ backgroundColor: "#dd729e", padding: 5, paddingHorizontal: 10, alignItems: "center", borderRadius: 5, width: 50 }}>
                    <Text style={{ fontSize: 16 }}>Add</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>

          {/*Footer*/}
          <View style={{alignItems: "center"}}>
            <TouchableOpacity 
              onPress={() => {
                setPlaylistModalVisible(false);
                setCreateModalVisible(true);
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons
                  name="add-circle-outline"
                  size={22}
                  color="white"  
                  style={{ marginRight: 5 }}  
                />
                <Text style={{color: "white", fontSize: 18}}>Create new playlist</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>
      </Modal>

      {/* Tạo playlist */}
      <Modal
          onBackdropPress={() => setCreateModalVisible(false)}
          onBackButtonPress={() => setCreateModalVisible(false)}
          isVisible={isCreateModalVisible}
          onSwipeComplete={toggleModalCreate}
          animationIn="bounceInUp"
          animationOut="bounceOutDown"
          animationInTiming={600}
          animationOutTiming={300}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={300}
          style={styles.modal}
      >
        <View style={{...styles.modalContent, minHeight: height/3, alignItems: "center"}}>
          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingRight: 15,
              paddingLeft: 10,
              paddingTop: 10,
              paddingBottom: 10,
            }}>
            <TouchableOpacity>
              <Icon
                name="chevron-left"
                type="font-awesome"
                color="white"
                size={24}
                style={{padding: 3}}
                onPress={() => setCreateModalVisible(false)}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 18,
                color: 'white',
                flex: 1,
                textAlign: 'center',
                fontWeight: "bold"
              }}>
              Create playlist
            </Text>
            <TouchableOpacity/>
          </View>

          <View style={styles.postContent}>
            <TextInput
              placeholder="Nhập tên package"
              placeholderTextColor="gray"
              style={styles.textPost}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              toggleModalCreate(); 
              Alert.alert("Thông báo", "Đã tạo playlist mới!");
            }} 
          >
            <View style={{ backgroundColor: "#dd729e", padding: 10, paddingHorizontal: 20, alignItems: "center", borderRadius: 5, marginTop: 15 }}>
              <Text style={{ fontSize: 18 }}>Create</Text>
            </View>
          </TouchableOpacity>
          
        </View>
      </Modal>
    </View>
  );
}

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const settingsWidth = width / 12;
const paddingTopModalContent = 10;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 16,
  },

  textPost: {
    padding: 15,
    color: "white"
  },

  postContent: {
    borderWidth: 2,
    width: width * 0.85,
    borderColor: "gray",
    borderRadius: 20,
  },

  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "black",
    paddingTop: paddingTopModalContent,
    borderWidth: 5,
    borderColor: "#000",
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    minHeight: height,
    paddingBottom: 20,
    justifyContent: "start",
  },

  songInfor: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },

  songInfor: {
    width: width,
  },

  title: {
    marginTop: 5,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  trackInfo: {
    alignItems: "center",
  },
  coverImage: {
    width: 250,
    height: 250,
    borderRadius: 150,
    marginBottom: 30,
  },
  trackName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  artistName: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    fontStyle: "italic",
  },
  slider: {
    marginTop: 20,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeStamp: {
    fontSize: 11,
    fontWeight: "500",
    color: "white",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
  },
  controlText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
