import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import { FontAwesome5 } from "@expo/vector-icons";
// import TrackPlayer, {
//   AppKilledPlaybackBehavior,
//   Capability,
//   RepeatMode,
//   Event
// } from 'react-native-track-player';

export default function DetailScreen({ navigation }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackLength] = useState(300); // Thời gian của bài hát
  const [currentPosition, setCurrentPosition] = useState(0);

  const changeTime = (seconds) => {
    setCurrentPosition(seconds);
  };

  const playPauseToggle = () => {
    setIsPlaying(!isPlaying);
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Now Playing</Text>
      <View style={styles.trackInfo}>
        <Image
          source={require("./../../assets/img/cho.jpg")}
          style={styles.coverImage}
        />
        <Text style={styles.trackName}>Tên bài hát</Text>
        <Text style={styles.artistName}>Nghệ sỹ</Text>
      </View>

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={trackLength}
        value={currentPosition}
        minimumTrackTintColor="#93A8B3"
        thumbTintColor="#3D425C"
        onValueChange={changeTime}
      />

      <View style={styles.timeContainer}>
        <Text style={styles.timeStamp}>{formatTime(currentPosition)}</Text>
        <Text style={styles.timeStamp}>
          {formatTime(trackLength - currentPosition)}
        </Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity onPress={skipToPreviousTrack}>
          <FontAwesome5
            name="backward"
            size={32}
            color="#3D425C"
          ></FontAwesome5>
        </TouchableOpacity>
        <TouchableOpacity onPress={playPauseToggle}>
          <FontAwesome5
            name={isPlaying ? "pause" : "play"}
            size={32}
            color="#3D425C"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={skipToNextTrack}>
          <FontAwesome5 name="forward" size={32} color="#3D425C"></FontAwesome5>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 16,
  },
  title: {
    marginTop: 10,
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
    borderRadius: 125,
    marginBottom: 20,
  },
  trackName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  artistName: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
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
  },
  controlText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
