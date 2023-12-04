import * as React from "react";
import { useState, useEffect } from "react";

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
import { Button, Input } from "react-native-elements";
import { axiosInstance } from "../constants/Axios";
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
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState('');

  useEffect(() => {
    // Hàm này sẽ được gọi mỗi khi searchText thay đổi
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/musics/search/${searchText}`);
        setSearchResults(response.data.data.data);
        console.log(searchResults);
      } catch (error) {
        console.error('Lỗi khi tìm kiếm:', error);
      }
    };

    // Chỉ gọi fetchData nếu searchText không rỗng
    if (searchText !== '') {
      fetchData();
    } else {
      // Nếu searchText rỗng, đặt searchResults về mảng rỗng
      setSearchResults([]);
    }
  }, [searchText]); // useEffect sẽ được gọi lại mỗi khi searchText thay đổi


  const renderContent = () => {
    switch (selectedCategory) {
      case "Songs":
        return (
          <View style={[styles.songsContainer, { flex: 1 }]}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={searchResults.songs}
              renderItem={({ item }) => (
                <View style={styles.songsWrapper}>
                  <TouchableOpacity
                    style={styles.songs}
                    onPress={() => navigation.navigate("SongDetail", { s_id: item.encodeId })}
                  >
                    <Image
                      source={{ uri: item.thumbnailM }}
                      style={styles.songImage}
                      resizeMode="cover"
                    />
                    <View>
                      <Text style={styles.songTitle}>{item.title}</Text>
                      <Text style={styles.songType}>{item.artistsNames}</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={styles.songOption}>...</Text>
                  </TouchableOpacity>
                </View>
              )}
            ></FlatList>
            <View style={{ height: 60 }}></View>
          </View>
        );
      case "Artists":
        return (
          <View style={styles.songsContainer}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={searchResults.artists}
              renderItem={({ item }) => (
                <View style={styles.songsWrapper}>
                  <TouchableOpacity
                    style={styles.songs}
                    onPress={() => navigation.navigate("SongDetail")}
                  >
                    <Image
                      source={{ uri: item.thumbnailM }}
                      style={[styles.songImage, { borderRadius: 30 }]}
                      resizeMode="cover"
                    />
                    <View>
                      <Text
                        style={{ marginTop: 35, color: "white", fontSize: 18 }}
                      >
                        {item.name}{" "}
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
            <View style={{ height: 90 }}></View>
          </View>
        );

      case "Albums":
        return (
          <View style={{ flexDirection: "column", flex: 1 }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={searchResults.playlists}
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
                            source={{ uri: item.thumbnailM }}
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
                              {item.title}
                            </Text>
                            <Text
                              style={{
                                marginTop: 5,
                                color: "#909090",
                                fontSize: 12,
                                width: (WIDTH - 60) / 2,
                              }}
                            >
                              {item.artistsNames}
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
            <View style={{ height: 30 }}></View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.background}>
      <View style={{ flexDirection: 'row', marginTop: 50 }}>
        <View style = {{width: WIDTH - 60}}>
          <Input
            placeholder="Bạn muốn nghe gì..."
            leftIcon={{
              type: "search-outline",
              name: "search",
              color: "rgb(255,255,255)"
            }}
            rightIcon={{
              type: "backspace",
              name: "backspace",
              color: "rgb(255,255,255)",
            }}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            leftIconContainerStyle={styles.leftIconStyle}
            rightIconContainerStyle={styles.rightIconStyle}
            placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
            underlineColorAndroid="transparent"
            onChangeText={(text) => setSearchText(text)}
          />
        </View>
        <View style = {{marginTop:10}}>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
        </View>
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
              Albums/Playlists
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
  cancelButton: {
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
    // marginTop: 20,
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

  inputContainer: {
    width: 100
  },

  inputContainerStyle: {
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 1,
    height: 40,
  },

  inputStyle: {
    paddingLeft: 10,
    color: "white"
  },

  leftIconStyle: {
    paddingLeft: 15,
  },
  rightIconStyle: {
    paddingRight: 15,
  }
});
