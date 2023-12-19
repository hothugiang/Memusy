import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
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

const SKIP_INTERVAL = 10;

export default function DetailScreen({ navigation, route }) {
  const { s_id } = route.params;
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
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
      console.log(lyricsData.data.data.data.file);
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
      await sound.playAsync();
    } else {
      await sound.pauseAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const changeTime = (seconds) => {
    setCurrentPosition(seconds);
    sound.setPositionAsync(seconds * 1000);
  };

  const skipForward = () => {
    if (sound) {
      const newPosition = Math.min(duration, currentPosition + SKIP_INTERVAL);
      sound.setPositionAsync(newPosition * 1000);
      setCurrentPosition(newPosition);
    }
  };
  
  const skipBackward = () => {
    if (sound) {
      const newPosition = Math.max(0, currentPosition - SKIP_INTERVAL);
      sound.setPositionAsync(newPosition * 1000);
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
        <Text style={styles.trackName}>{information.title}</Text>
        <Text style={styles.artistName}>{information.artistsNames}</Text>
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
        <TouchableOpacity onPress={replayMusic}>
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

        <TouchableOpacity>
          <Ionicons
            name={"add-circle-outline"}
            size={32}
            color={"rgba(221,114,158,1)"}
          />
        </TouchableOpacity>
      </View>

      <Lyric lrc={lyrics} currentTime={currentPosition} />
    </View>
  );
}

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 16,
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
