import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import { FontAwesome5 } from "@expo/vector-icons";
import { 
  FlatList,
  Dimensions
} from "react-native";
// import TrackPlayer, {
//   AppKilledPlaybackBehavior,
//   Capability,
//   RepeatMode,
//   Event
// } from 'react-native-track-player';
import {Audio} from "expo-av"

export default function DetailScreen({ navigation }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [sound, setSound] = useState();

  async function playPauseSound() {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  }

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('./../../assets/mp3/VungLaMeBay-DuongHongLoan-4796874.mp3')
    );
    setSound(sound);

    const status = await sound.getStatusAsync();
    setDuration(Math.round(status.durationMillis/1000));
    console.log(duration);

    if (!isPlaying) {
      setIsPlaying(true);
      await sound.playAsync();
    } else {
      setIsPlaying(false);
      const position = await sound.getStatusAsync();
      await sound.setPositionAsync(position.positionMillis);
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const changeTime = (seconds) => {
    setCurrentPosition(seconds);
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

  const renderSongs = ({item, index}) => {
    return (
      <View style={styles.songInfor}>
        <View style={styles.trackInfo}>
          <Image
            source={item.src}
            style={styles.coverImage}
          />
          <Text style={styles.trackName}>{item.name}</Text>
          <Text style={styles.artistName}>{item.artist}</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Now Playing</Text>
      <View style={styles.trackInfo}>
          <Image
            source={require("./../../assets/img/cho.jpg")}
            style={styles.coverImage}
          />
          <Text style={styles.trackName}>Tên bài hát</Text>
          <Text style={styles.artistName}>Artist</Text>
        </View>
      {/* <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={renderSongs}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={() => {}}
      /> */}

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={currentPosition}
        minimumTrackTintColor="#93A8B3"
        thumbTintColor="#3D425C"
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
            color="#3D425C"
          ></FontAwesome5>
        </TouchableOpacity>
        <TouchableOpacity onPress={playSound}>
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
    marginLeft: 50,
    marginRight: 50,
  },
  controlText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});