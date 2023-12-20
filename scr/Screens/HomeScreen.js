import * as React from "react";
import { useState, useEffect } from "react";
import { Dimensions, Image, TouchableOpacity } from "react-native";
import { View, Text, ScrollView, FlatList } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Ionicons } from "@expo/vector-icons";
import { axiosInstance } from "../constants/Axios";
import { Platform } from "react-native";

export default function HomeScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "GentiumBookBasic-Italic": require("./../../assets/fonts/GentiumBookBasic-Italic.ttf"),
    "Open-san": require("./../../assets/fonts/Montserrat-Bold.ttf"),
  });

  const [songData, setSongData] = useState("");
  const [suyData, setSuyData] = useState("");
  const [suyTitle, setSuyTitle] = useState("");
  const [data2, setData2] = useState("");
  const [dataFetch, setDataFetch] = useState(false);
  const [data2Title, setData2Title] = useState("");

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }

    async function fetchData() {
      try {
        const response = await axiosInstance.get(
          "/musics/songsplaylist/67WIO6CF"
        );
        setSongData(response.data.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    async function fetchData2() {
      try {
        const response = await axiosInstance.get("/musics/home");
        setSuyTitle(response.data.data.data.items[4].title);
        setSuyData(response.data.data.data.items[4].items);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    async function fetchData3() {
      try {
        const response = await axiosInstance.get("/musics/home");
        setData2Title(response.data.data.data.items[3].title);
        setData2(response.data.data.data.items[3].items);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    prepare();
    if (!dataFetch) {
      fetchData();
      fetchData2();
      fetchData3();
      setDataFetch(true);
    }
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  const data3 = [
    {
      name: "Những gì anh nói",
      src: require("./../../assets/img/nhung.jpg"),
      // image:'https://png.pngtree.com/png-clipart/20230825/original/pngtree-bored-character-man-working-with-laptop-vector-picture-image_8492047.png'
    },
    {
      name: "4 mùa thương em",
      src: require("./../../assets/img/4mua.jpg"),
      // image:'https://png.pngtree.com/png-clipart/20230825/original/pngtree-bored-character-man-working-with-laptop-vector-picture-image_8492047.png'
    },
    {
      name: "Như anh đã thấy em",
      src: require("./../../assets/img/nhu.jpg"),
      // image:'https://png.pngtree.com/png-clipart/20230825/original/pngtree-bored-character-man-working-with-laptop-vector-picture-image_8492047.png'
    },
    {
      name: "Nhất trên đời",
      src: require("./../../assets/img/nhat.jpg"),
      // image:'https://png.pngtree.com/png-clipart/20230825/original/pngtree-bored-character-man-working-with-laptop-vector-picture-image_8492047.png'
    },
    {
      name: "Hẹn em ở lần yêu thứ hai",
      src: require("./../../assets/img/hen.jpg"),
      // image:'https://png.pngtree.com/png-clipart/20230825/original/pngtree-bored-character-man-working-with-laptop-vector-picture-image_8492047.png'
    },
    {
      name: "Tiếng pháo tiễn người đi",
      src: require("./../../assets/img/tieng.jpg"),
      // image:'https://png.pngtree.com/png-clipart/20230825/original/pngtree-bored-character-man-working-with-laptop-vector-picture-image_8492047.png'
    },
  ];
  return (
    <ScrollView style={styles.container} horizontal={false}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: Platform.OS === "ios" ? 30 : 0,
        }}
      >
        <View style={{ paddingTop: 20, paddingLeft: 20 }}>
          <Text
            style={{
              fontFamily: "GentiumBookBasic-Italic",
              fontSize: 20,
              color: "white",
            }}
          >
            Hello MingMing,
          </Text>
          <Text
            style={{
              fontFamily: "GentiumBookBasic-Italic",
              fontSize: 16,
              color: "gray",
            }}
          >
            What do you want to hear today
          </Text>
        </View>
        <Ionicons
          name="notifications"
          color={"#ffffff"}
          size={25}
          style={{ paddingTop: 30, paddingRight: 30 }}
        />
      </View>
      <View style={styles.Rectangle} />
      <Text
        style={{
          color: "#ffff",
          fontFamily: "Open-san",
          fontSize: 20,
          marginBottom: 10,
        }}
      >
        Nhạc mới mỗi tuần{" "}
      </Text>
      <ScrollView horizontal={true}>
        <FlatList
          horizontal={true}
          scrollEnabled={false}
          nestedScrollEnabled={true}
          scrollToOverflowEnabled={false}
          data={songData}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("SongDetail", { s_id: item.encodeId })
              }
            >
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <View style={styles.content}>
                  <Image
                    source={{ uri: item.thumbnailM }}
                    style={styles.img}
                    resizeMode="cover"
                  ></Image>
                  <View style={styles.name}>
                    <Text
                      style={{
                        fontSize: 16,
                        flexWrap: "wrap",
                        textAlign: "left",
                        color: "gray",
                      }}
                    >
                      {item.title}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        ></FlatList>
      </ScrollView>

      <Text
        style={{
          color: "#ffff",
          fontFamily: "Open-san",
          fontSize: 20,
          marginBottom: 10,
        }}
      >
        {suyTitle}
      </Text>
      <ScrollView horizontal={true}>
        <FlatList
          horizontal={true}
          scrollEnabled={false}
          nestedScrollEnabled={true}
          scrollToOverflowEnabled={false}
          data={suyData}
          renderItem={({ item }) => (
            <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => navigation.navigate("DetailPlaylist", {s_id: item.encodeId })}>
              <View style={styles.content}>
                <Image
                  source={{ uri: item.thumbnailM }}
                  style={styles.img2}
                  resizeMode="cover"
                ></Image>
                <View style={styles.name2}>
                  <Text
                    style={{
                      fontSize: 16,
                      flexWrap: "wrap",
                      textAlign: "left",
                      color: "gray",
                    }}
                  >
                    {item.title}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        ></FlatList>
      </ScrollView>
      <Text
        style={{
          color: "#ffff",
          fontFamily: "Open-san",
          fontSize: 20,
          marginBottom: 10,
        }}
      >
        {data2Title}
      </Text>
      <ScrollView horizontal={true}>
        <FlatList
          horizontal={true}
          scrollEnabled={false}
          nestedScrollEnabled={true}
          scrollToOverflowEnabled={false}
          data={data2}
          renderItem={({ item }) => (
            <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => navigation.navigate("DetailPlaylist", {s_id: item.encodeId })}>
              <View style={styles.content}>
                <Image
                  source={{ uri: item.thumbnailM }}
                  style={styles.img3}
                  resizeMode="cover"
                ></Image>
                <View style={styles.name3}>
                  <Text
                    style={{
                      fontSize: 16,
                      flexWrap: "wrap",
                      textAlign: "left",
                      color: "gray",
                    }}
                  >
                    {item.title}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        ></FlatList>
      </ScrollView>
    </ScrollView>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "black",
    marginBottom: 45,
    //marginTop: 30,
  },
  img: {
    width: Dimensions.get("window").width / 3 - 13,
    height: Dimensions.get("window").height / 6 - 2,
    backgroundColor: "#1A0938",
    // borderRadius: 10,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 2,
    borderColor: "black",
    borderWidth: 1,
  },
  name: {
    width: Dimensions.get("window").width / 3 - 13,
    height: 46,
    paddingHorizontal: 2,
    paddingVertical: 2,
    alignSelf: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
  },

  img2: {
    width: Dimensions.get("window").width / 3,
    height: Dimensions.get("window").height / 6 - 2,
    backgroundColor: "#1A0938",
    borderRadius: 20,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 2,
    borderColor: "black",
    borderWidth: 1,
  },
  name2: {
    width: Dimensions.get("window").width / 3 - 10,
    height: 46,
    paddingHorizontal: 2,
    paddingVertical: 2,
    alignSelf: "center",
    alignItems: "center",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
  },
  img3: {
    width: Dimensions.get("window").width / 3,
    height: Dimensions.get("window").height / 6 - 2,
    backgroundColor: "#1A0938",
    borderRadius: 10,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 2,
    borderColor: "black",
    borderWidth: 1,
  },
  name3: {
    width: Dimensions.get("window").width / 3 - 10,
    height: 46,
    paddingHorizontal: 2,
    paddingVertical: 2,
    alignSelf: "center",
    alignItems: "center",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
  },

  Rectangle: {
    width: Dimensions.get("window").width,
    height: 1,
    backgroundColor: "#AEB5BC",
    marginTop: 20,
    marginBottom: 20,
  },
  content: {
    flexWrap: "wrap",
    margin: 5,
    left: 5,
    borderRadius: 12,
    justifyContent: "center",
    // alignSelf: "center",
    alignItems: "center",
  },
};
