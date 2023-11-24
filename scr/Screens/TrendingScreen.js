import * as React from "react";
import { useState } from "react";

import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
  ImageBackground,
  Touchable,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  VirtualizedList,
} from "react-native";
import kpop from "./../../assets/img/kpop.jpg";
import { BackgroundImage } from "react-native-elements/dist/config";

const { width: WIDTH } = Dimensions.get("window");
const { height: HEIGHT } = Dimensions.get("window");
const standardWidth = 360;
const standardHeight = 800;
export default function TrendingScreen({ navigation }) {
  const data = [
    {
      name: "BOLERO",
      src: require("./../../assets/img/vlmb.jpg"),
      rank1: "Vùng Lá Me Bay",
      rank2: "Tấm Lòng Son",
      rank3: "Bạn Đời",
    },
    {
      name: "KPOP",
      src: require("./../../assets/img/kpop.jpg"),
      rank1: "Seven",
      rank2: "Baddie",
      rank3: "Love Lee",
    },
    {
      name: "LOVE",
      artist: "g",
      src: require("./../../assets/img/bandoi.jpg"),
      rank1: "Love Story",
      rank2: "You Broke Me First",
      rank3: "Hard To Let Go",
    },
    {
      name: "US-UK",
      artist: "Hihi",
      src: require("./../../assets/img/pop.jpg"),
      rank1: "Is It Over Now?",
      rank2: "Paint The Town Red",
      rank3: "Snooze",
    },
    {
      name: "VPOP",
      artist: "Hihi",
      src: require("./../../assets/img/divenha.jpg"),
      rank1: "Cắt đôi nỗi sầu",
      rank2: "Từng quen",
      rank3: "Tất cả hoặc không là gì cả",
    },
  ];
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.text}>Trending Now</Text>
      </View>

      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.chartContainer}>
            <ImageBackground source={item.src} blurRadius={40}>
              <Image source={item.src} style={styles.img} resizeMode="cover" />
              <View style={styles.songContainer}>
                <Text style={styles.chartName}>{item.name}</Text>
                <Text
                  style={styles.song}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  1. {item.rank1}
                </Text>
                <Text
                  style={styles.song}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  2. {item.rank2}
                </Text>
                <Text
                  style={styles.song}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  3. {item.rank3}
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        )}
      ></FlatList>
      <View height={90}></View>
    </View>
  );
}

const styles = {
  background: {
    backgroundColor: "#000000",
    flex: 1,
  },

  container: {
    marginHorizontal: 30,
    borderRadius: 20,
    marginTop: 80,
    alignItems: "flex-start",

    marginBottom: 20,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    justifyContent: "flex-start",
    fontSize: 30,
  },
  chartContainer: {
    marginTop: 20,
    height: HEIGHT / 6,
    width: WIDTH - 50,
    borderRadius: 20,
    overflow: "hidden",
    alignSelf: "center",
  },

  img: {
    width: (100 / standardWidth) * WIDTH,
    height: (100 / standardWidth) * WIDTH,
    margin: 18,
    borderRadius: 20,
  },
  songContainer: {
    position: "absolute",
    marginTop: 20,
    marginLeft: 150,
  },
  chartName: {
    color: "white",
    marginBottom: 5,
    fontWeight: "bold",
    fontSize: 18,
  },
  song: {
    color: "white",
    marginTop: 5,
  },
};
