import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import { FontAwesome5 } from "@expo/vector-icons";
import { 
  FlatList,
  Dimensions
} from "react-native";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import * as Animatable from "react-native-animatable";
import { Ionicons } from '@expo/vector-icons';
import { Notifications } from 'expo';

export default function DetailScreen({ navigation }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [sound, setSound] = useState();
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    loadAudio();
    // Notifications.presentLocalNotificationAsync({
    //   title: 'Now Playing',
    //   body: 'Your Music is playing in the background.',
    //   ios: { _displayInForeground: true },
    // });
  }, []);

  const loadAudio = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('./../../assets/mp3/VungLaMeBay-DuongHongLoan-4796874.mp3')
      );
      setSound(sound);

      const status = await sound.getStatusAsync();
      setDuration(Math.round(status.durationMillis / 1000));

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isPlaying) {
          setCurrentPosition(Math.round(status.positionMillis / 1000));
        }
      });
    } catch (error) {
      console.error("Error loading audio:", error);
    }
  };

  if (Platform.OS === "ios") {
    const enableAudio = async () => {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        staysActiveInBackground: true,
        interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
        shouldDuckAndroid: false,
        playThroughEarpieceAndroid: false,
        allowsRecordingIOS: false,
        interruptionModeIOS: InterruptionModeIOS.DoNotMix,
        playsInSilentModeIOS: true,
      });
    };
    enableAudio();
  } else {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
    });
  }

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

  const skipToNextTrack = () => {
    // Logic để chuyển bài tiếp theo
  };

  const skipToPreviousTrack = () => {
    // Logic để chuyển bài trước đó
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  };

  const [isHeartFull, setIsHeartFull] = useState(false);

  const toggleHeart = () => {
    setIsHeartFull(!isHeartFull);
  };

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
          source={require("./../../assets/img/vlmb.jpg")}
          style={ styles.coverImage }
        />
          <Text style={styles.trackName}>Vùng lá me bay</Text>
          <Text style={styles.artistName}>Hihi</Text>
          <TouchableOpacity onPress={toggleHeart}>
          <Ionicons 
            name={isHeartFull ? 'heart' : 'heart-outline'} 
            size={32} 
            color={"rgba(221,114,158,1)"} 
            style={{marginTop: 10}}
          />
          </TouchableOpacity>
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
        <TouchableOpacity onPress={skipToPreviousTrack}>
          <FontAwesome5
            name="backward"
            size={32}
            color="gray"
          ></FontAwesome5>
        </TouchableOpacity>
        <TouchableOpacity onPress={playSound}>
          <FontAwesome5
            name={isPlaying ? "pause" : "play"}
            size={32}
            color="gray"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={skipToNextTrack}>
          <FontAwesome5 name="forward" size={32} color="gray"></FontAwesome5>
        </TouchableOpacity>
      </View>

      <View style="lyricContainer">

      </View>
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
    marginTop: 30,
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
    marginLeft: 50,
    marginRight: 50,
  },
  controlText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});