import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { Dimensions, Image, TouchableOpacity } from "react-native";
import { View, Text, ScrollView, FlatList } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Ionicons } from "@expo/vector-icons";
import { axiosInstance } from "../constants/Axios";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserContext from "../contexts/UserContext";

export default function HomeScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "GentiumBookBasic-Italic": require("./../../assets/fonts/GentiumBookBasic-Italic.ttf"),
    "Open-san": require("./../../assets/fonts/Montserrat-Bold.ttf"),
  });

  const [songData, setSongData] = useState("");
  const { username } = useContext(UserContext);
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
        const response = await axiosInstance.get("/musics/detailplaylist/SBEED799");
        setSuyTitle(response.data.data.title);
        setSuyData(response.data.data.song.items);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    async function fetchData3() {
      try {
        const response = await axiosInstance.get("/musics/detailplaylist/6707CZ08");
        setData2Title(response.data.data.title);
        setData2(response.data.data.song.items);
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
            Hello, {username}
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
            <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => navigation.navigate("SongDetail", {s_id: item.encodeId })}>
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
            <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => navigation.navigate("SongDetail", {s_id: item.encodeId })}>
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
