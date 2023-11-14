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
import UserScreenTab from "../Tabs/UserScreenTab";
import { Ionicons } from "@expo/vector-icons";

import { Button } from "react-native-elements";

import electronic from "./../../assets/img/electronic.jpg";
import remix from "./../../assets/img/remix.jpg";
import hiphop from "./../../assets/img/hiphop.jpg";
import rnb from "./../../assets/img/rnb.jpg";
import movie from "./../../assets/img/movie.jpg";
import latin from "./../../assets/img/latin.jpg";
import rock from "./../../assets/img/rock.jpg";
import acoustic from "./../../assets/img/acoustic.jpg";
import indie from "./../../assets/img/indie.jpg";
import jazz from "./../../assets/img/jazz.jpg";
import classical from "./../../assets/img/classical.jpg";
import pop from "./../../assets/img/pop.jpg";
import country from "./../../assets/img/country.jpg";
import metal from "./../../assets/img/metal.jpg";
import instrumental from "./../../assets/img/instrumental.jpg";
import blues from "./../../assets/img/blues.jpg";
import disco from "./../../assets/img/disco.jpg";
import kpop from "./../../assets/img/kpop.jpg";

const { width: WIDTH } = Dimensions.get("window");
const { height: HEIGHT } = Dimensions.get("window");
const standardWidth = 360;
const standardHeight = 800;

export default function SearchScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState("Songs");
  const data = [
    {
      name: "Vùng lá me bay",
      artist: "Hihi",
      src: require("./../../assets/img/vlmb.jpg"),
      year: 2022,
      type: "Single",
    },
    {
      name: "Tấm lòng son",
      artist: "Hihi",
      src: require("./../../assets/img/kpop.jpg"),
      year: 2008,
      type: "EP",
    },
    {
      name: "Bạn đời",
      artist: "g",
      src: require("./../../assets/img/bandoi.jpg"),
      year: 1989,
    },
    {
      name: "Mang tiền về cho mẹ",
      artist: "Hihi",
      src: require("./../../assets/img/mangtien.jpg"),
      year: 1908,
      type: "Single",
    },
    {
      name: "Đi theo bóng mặt trời",
      artist: "Hihi",
      src: require("./../../assets/img/theobong.jpg"),
      year: 2003,
      type: "Single",
    },
    {
      name: "Đi về nhà",
      artist: "Hihi",
      src: require("./../../assets/img/divenha.jpg"),
      year: 2021,
      type: "Single",
    },
    {
      name: "Vùng lá me bay",
      artist: "Hihi",
      src: require("./../../assets/img/vlmb.jpg"),
      year: 2022,
      type: "Single",
    },
    {
      name: "Tấm lòng son",
      artist: "Hihi",
      src: require("./../../assets/img/kpop.jpg"),
      year: 2008,
      type: "EP",
    },
    {
      name: "Bạn đời",
      artist: "g",
      src: require("./../../assets/img/bandoi.jpg"),
      year: 1989,
    },
    {
      name: "Mang tiền về cho mẹ",
      artist: "Hihi",
      src: require("./../../assets/img/mangtien.jpg"),
      year: 1908,
      type: "Single",
    },
    {
      name: "Đi theo bóng mặt trời",
      artist: "Hihi",
      src: require("./../../assets/img/theobong.jpg"),
      year: 2003,
      type: "Single",
    },
    {
      name: "Đi về nhà",
      artist: "Hihi",
      src: require("./../../assets/img/divenha.jpg"),
      year: 2021,
      type: "Single",
    },
  ];
  const data2 = [
    {
      artist: "Nhạc lofy",
      src: require("./../../assets/img/lofy.jpg"),
    },
    {
      artist: "Chill Music",
      src: require("./../../assets/img/chill.jpg"),
    },
    {
      artist: "Nhớ về em",
      src: require("./../../assets/img/nho.jpg"),
    },
    {
      artist: "Lạc vào trong mơ",
      src: require("./../../assets/img/lac.jpg"),
    },
    {
      artist: "Audio",
      src: require("./../../assets/img/audio.jpg"),
    },
    {
      artist: "Hơn cả mây trôi",
      src: require("./../../assets/img/hon.jpg"),
    },
    
  ];
  const renderContent = () => {
    switch (selectedCategory) {
      case "Songs":
        return (
          <View style={[styles.songsContainer, { flex: 1 }]}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data}
              renderItem={({ item }) => (
                <View style={styles.songsWrapper}>
                  <TouchableOpacity
                    style={styles.songs}
                    onPress={() => navigation.navigate("SongDetail")}
                  >
                    <Image
                      source={item.src}
                      style={styles.songImage}
                      resizeMode="cover"
                    />
                    <View>
                      <Text style={styles.songTitle}>{item.name}</Text>
                      <Text style={styles.songType}>{item.artist}</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={styles.songOption}>...</Text>
                  </TouchableOpacity>
                </View>
              )}
            ></FlatList>
            <View style = {{height:60}}></View>
          </View>
        );
      case "Artists":
        return (
          <View style={styles.songsContainer}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data2}
              renderItem={({ item }) => (
                <View style={styles.songsWrapper}>
                  <TouchableOpacity
                    style={styles.songs}
                    onPress={() => navigation.navigate("SongDetail")}
                  >
                    <Image
                      source={item.src}
                      style={[styles.songImage, { borderRadius: 30 }]}
                      resizeMode="cover"
                    />
                    <View>
                      <Text
                        style={{ marginTop: 35, color: "white", fontSize: 18 }}
                      >
                        {item.artist}{" "}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Ionicons
                      name="md-chevron-forward"
                      style={styles.typeOption}
                    ></Ionicons>
                  </TouchableOpacity>
                </View>
              )}
            ></FlatList>
            <View style = {{height:90}}></View>
          </View>
        );

      case "Albums":
        return (
          <View style = {{flexDirection:"column",flex:1}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data}
              renderItem={({ item }) => (
                <View style={styles.songsContainer}>
                  <View>
                    <View style={[styles.songsWrapper, { marginLeft: 20 }]}>
                      <TouchableOpacity
                        style={{ flexDirection: "row", flexWrap: "wrap" }}
                        onPress={() => navigation.navigate("SongDetail")}
                      >
                        <View>
                          <Image
                            source={item.src}
                            style={styles.img}
                            resizeMode="cover"
                          />

                          <View>
                            <Text
                              style={{
                                marginTop: 5,
                                color: "white",
                                fontSize: 15,
                                width: (WIDTH - 60) / 2,
                              }}
                            >
                              {item.name}
                            </Text>
                            <Text
                              style={{
                                marginTop: 5,
                                color: "#909090",
                                fontSize: 12,
                                width: (WIDTH - 60) / 2,
                              }}
                            >
                              {item.artist}
                            </Text>
                            <Text
                              style={{
                                marginTop: 5,
                                color: "#909090",
                                fontSize: 12,
                                width: (WIDTH - 60) / 2,
                              }}
                            >
                              {item.type} ~ {item.year}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
              horizontal={false}
              numColumns={2}
              key={2}
            ></FlatList>
            <View style = {{height:30}}></View>
          </View>
        );
      case "Playlists":
        return (
          <View  style = {{flexDirection:"column",flex:1}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data}
              renderItem={({ item }) => (
                <View style={styles.songsContainer}>
                  <View>
                    <View
                      style={[
                        styles.songsWrapper,
                        { marginLeft: 20, marginVertical: 5 },
                      ]}
                    >
                      <TouchableOpacity
                        style={{ flexDirection: "row", flexWrap: "wrap" }}
                        onPress={() => navigation.navigate("SongDetail")}
                      >
                        <View>
                          <Image
                            source={item.src}
                            style={styles.img}
                            resizeMode="cover"
                          />

                          <View>
                            <Text
                              style={{
                                marginTop: 5,
                                color: "white",
                                fontSize: 15,
                                width: (WIDTH - 60) / 2,
                              }}
                            >
                              {item.name}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
              horizontal={false}
              numColumns={2}
              key={2}
            ></FlatList>
            <View style = {{height:50}}></View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.buttonContainer}>
        <TextInput
          style={styles.buttonText}
          placeholder={"Bạn muốn nghe gì..."}
          placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
          underlineColorAndroid="transparent"
        />
        <Ionicons
          name={"search-outline"}
          size={28}
          color={"rgb(255,255,255)"}
          style={styles.buttonIconLeft}
        />
        <TouchableOpacity>
          <Ionicons
            name={"backspace"}
            size={28}
            color={"rgb(255,255,255)"}
            style={styles.buttonIconRight}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.scrollView}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[
              styles.scrollContainer,
              selectedCategory === "Songs" && styles.selectedCategory,
              { marginLeft: 20 },
            ]}
            onPress={() => setSelectedCategory("Songs")}
          >
            <Text
              style={[
                styles.note,
                selectedCategory === "Songs" && styles.selectedCategory,
              ]}
            >
              Songs
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.scrollContainer,
              selectedCategory === "Artists" && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory("Artists")}
          >
            <Text
              style={[
                styles.note,
                selectedCategory === "Artists" && styles.selectedCategory,
              ]}
            >
              Artists
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.scrollContainer,
              selectedCategory === "Albums" && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory("Albums")}
          >
            <Text
              style={[
                styles.note,
                selectedCategory === "Albums" && styles.selectedCategory,
              ]}
            >
              Albums
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.scrollContainer,
              selectedCategory === "Playlists" && styles.selectedCategory,
              { marginRight: 15 },
            ]}
            onPress={() => setSelectedCategory("Playlists")}
          >
            <Text
              style={[
                styles.note,
                selectedCategory === "Playlists" && styles.selectedCategory,
              ]}
              onPress={() => setSelectedCategory("Playlists")}
            >
              Playlists
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      {renderContent()}
      {/*  */}
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "black",
    flex: 1,
    width: null,
    height: null,
  },
  buttonContainer: {
    marginTop: 50,
  },
  buttonText: {
    width: WIDTH - 100,
    height: (40 / standardHeight) * HEIGHT,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.7)",
    borderRadius: 10,
    fontSize: 16,
    paddingLeft: (45 / standardWidth) * WIDTH,
    backgroundColor: "black",
    color: "rgb(255,255,255)",
    marginHorizontal: 20,
  },
  buttonIconLeft: {
    position: "absolute",
    top: (7 / standardHeight) * HEIGHT,
    left: (30 / standardWidth) * WIDTH,
  },
  buttonIconRight: {
    position: "absolute",
    top: (-33 / standardHeight) * HEIGHT,
    right: (75 / standardWidth) * WIDTH,
  },
  cancelButton: {
    position: "absolute",
    top: (-30 / standardHeight) * HEIGHT,
    right: (10 / standardWidth) * WIDTH,
    color: "rgb(255,255,255)",
    fontSize: 15,
  },
  note: {
    alignSelf: "flex-start",
    color: "white",
  },
  scrollView: {
    height: (70 / standardHeight) * HEIGHT,
  },
  scrollContainer: {
    backgroundColor: "#242424",
    height: (40 / standardHeight) * HEIGHT,
    alignSelf: "flex-start",
    marginTop: 20,
    borderRadius: 20,
    marginHorizontal: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    overflow: "hidden",
  },
  selectedCategory: {
    backgroundColor: "rgba(221,114,158,1)",
    color: "black",
  },
  songsContainer: {
    flex: 1,
    width: WIDTH,
    backgroundColor: "#151515",
  },
  songsWrapper: {
    flexDirection: "row",
  },
  songs: {
    height: (70 / standardHeight) * HEIGHT,
    flexDirection: "row",
    width: WIDTH - 40,
  },
  songOption: {
    color: "#616161",
    fontSize: 30,
    marginTop: 20,
  },
  typeOption: {
    color: "#616161",
    fontSize: 30,
    marginTop: 35,
  },
  songImage: {
    height: (50 / standardHeight) * HEIGHT,
    width: (50 / standardWidth) * WIDTH,
    margin: 20,
  },
  songTitle: {
    marginTop: 25,
    fontSize: 18,
    color: "white",
  },
  songType: {
    marginTop: 0,
    color: "#616161",
  },
  img: {
    width: (WIDTH - 60) / 2,
    height: (WIDTH - 60) / 2,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 10,
  },
});
