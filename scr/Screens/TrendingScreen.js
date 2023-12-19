import * as React from "react";
import { useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
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
import { Platform } from "react-native";
import kpop from "./../../assets/img/kpop.jpg";
import { BackgroundImage } from "react-native-elements/dist/config";
import { Ionicons } from "@expo/vector-icons";
import { ScreenHeight } from "react-native-elements/dist/helpers";
import { axiosInstance } from "../constants/Axios";

const Tab = createMaterialTopTabNavigator();
const { width: WIDTH } = Dimensions.get("window");
const { height: HEIGHT } = Dimensions.get("window");
const standardWidth = 360;
const standardHeight = 800;

const BottomTab = ({ navigation }) => {
  const [trendingVNData, setTrendingVNData] = useState("");
  const [trendingUSUKData, setTrendingUSUKData] = useState("");
  const [trendingKPopData, setTrendingKpopData] = useState("");
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/musics/charthome");
        setTrendingVNData(response.data.data.data.weekChart.vn.items);
        setTrendingUSUKData(response.data.data.data.weekChart.us.items);
        setTrendingKpopData(response.data.data.data.weekChart.korea.items);

        console.log("Vietnam", trendingVNData);
        console.log("Kpop", trendingKPopData);
        console.log("USUK", trendingUSUKData);
        setDataFetched(true);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm:", error);
      }
    };
    if (!dataFetched) {
      fetchData();
    }
  }, [trendingVNData]);

  const VietNam = () => {
    return (
      <View style={{ backgroundColor: "#000000" }}>
        <FlatList
          data={trendingVNData}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View style={styles.chartContainer}>
              <TouchableOpacity style={styles.chartContainer} onPress={() => navigation.navigate("SongDetail", { s_id: item.encodeId })}>
                <ImageBackground
                  source={{ uri: item.thumbnailM }}
                  blurRadius={40}
                >
                  <View style={{ flexDirection: "row", marginTop: 10, padding: "40px" }}>
                    {/* <Image
                      source={require(`../../assets/img/1.png`)}
                      style={styles.img1}
                      resizeMode="cover"
                    /> */}
                    <Text style={{
                      color: "white",
                      fontSize: 30,
                      fontWeight: "bold",
                      lineHeight: 40, // Adjust the lineHeight as needed
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 10, 
                      marginLeft:10
                    }}>{index + 1}</Text>
                    <Image
                      source={{ uri: item.thumbnailM }}
                      style={styles.img}
                      resizeMode="cover"
                    />
                    <View style={styles.songContainer}>
                      <Text style={styles.chartName}>{item.title}</Text>
                      <Text
                        style={styles.song}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {item.artistsNames}
                      </Text>
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          )}
        ></FlatList>
        <View
          height={ScreenHeight}
          style={{ backgroundColor: "#000000" }}
        ></View>
      </View>
    );
  };
  const USUK = () => {
    return (
      <View style={{ backgroundColor: "#000000" }}>
        <FlatList
          data={trendingUSUKData}
          showsVerticalScrollIndicator={false}
          renderItem={({ item,index }) => (
            <View style={styles.chartContainer}>
              <TouchableOpacity style={styles.chartContainer} onPress={() => navigation.navigate("SongDetail", { s_id: item.encodeId })}>
                <ImageBackground
                  source={{ uri: item.thumbnailM }}
                  blurRadius={40}
                >
                  <View style={{ flexDirection: "row", marginTop: 10 }}>
                    {/* <Image
                      source={require(`../../assets/img/1.png`)}
                      style={styles.img1}
                      resizeMode="cover"
                    /> */}
                    <Text style={{
                      color: "white",
                      fontSize: 30,
                      fontWeight: "bold",
                      lineHeight: 40, // Adjust the lineHeight as needed
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 10, 
                      marginLeft:10
                    }}>{index + 1}</Text>
                    <Image
                      source={{ uri: item.thumbnailM }}
                      style={styles.img}
                      resizeMode="cover"
                    />
                    <View style={styles.songContainer}>
                      <Text style={styles.chartName}>{item.title}</Text>
                      <Text
                        style={styles.song}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {item.artistsNames}
                      </Text>
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          )}
        ></FlatList>
        <View
          height={ScreenHeight}
          style={{ backgroundColor: "#000000" }}
        ></View>
      </View>
    );
  };
  const Korea = () => {
    return (
      <View style={{ backgroundColor: "#000000" }}>
        <FlatList
          data={trendingKPopData}
          showsVerticalScrollIndicator={false}
          renderItem={({ item ,index}) => (
            <View style={styles.chartContainer}>
              <TouchableOpacity style={styles.chartContainer} onPress={() => navigation.navigate("SongDetail", { s_id: item.encodeId })}>
                <ImageBackground
                  source={{ uri: item.thumbnailM }}
                  blurRadius={40}
                >
                  <View style={{ flexDirection: "row", marginTop: 10 }}>
                    {/* <Image
                      source={require(`../../assets/img/1.png`)}
                      style={styles.img1}
                      resizeMode="cover"
                    /> */}
                    <Text style={{
                      color: "white",
                      fontSize: 30,
                      fontWeight: "bold",
                      lineHeight: 40, // Adjust the lineHeight as needed
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 10, 
                      marginLeft:10
                    }}>{index + 1}</Text>
                    <Image
                      source={{ uri: item.thumbnailM }}
                      style={styles.img}
                      resizeMode="cover"
                    />
                    <View style={styles.songContainer}>
                      <Text style={styles.chartName}>{item.title}</Text>
                      <Text
                        style={styles.song}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {item.artistsNames}
                      </Text>
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          )}
        ></FlatList>
        <View
          height={ScreenHeight}
          style={{ backgroundColor: "#000000" }}
        ></View>
      </View>
    );
  };
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "white", // Màu chữ của tab đang được chọn
        tabBarInactiveTintColor: "gray", // Màu chữ của các tab không được chọn
        tabBarStyle: { backgroundColor: "black" }, // Màu nền của thanh bottom tab
        tabBarIndicatorStyle: {
          backgroundColor: "white", // Màu của thanh hoạt động
          height: 1.5,
        },
        tabBarLabelStyle: {
          fontWeight: "bold", // Chữ in đậm
          fontSize: 14, // Kích thước font chữ
        },
      }}
    >
      <Tab.Screen name="Việt Nam" component={VietNam} />
      <Tab.Screen name="Nhạc USUK" component={USUK} />
      <Tab.Screen name="Nhạc Hàn" component={Korea} />
    </Tab.Navigator>
  );
};
export default function TrendingScreen({ navigation }) {
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.text}>Trending Now</Text>
      </View>
      <BottomTab style={{ backgroundColor: "black" }} navigation={navigation} />
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
    marginTop: Platform.OS === "ios" ? 80 : 30,
    // alignItems: "flex-start",
    marginBottom: 30,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    // justifyContent: "flex-start",
    fontSize: 25,
    paddingTop: 20,
  },
  chartContainer: {
    marginTop: 5,
    height: 95,
    width: WIDTH - 50,
    borderRadius: 20,
    overflow: "hidden",
    alignSelf: "center",
  },
  img1: {
    width: 70,
    height: 70,
    marginLeft: -5,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 70,
    height: 70,
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  songContainer: {
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "column",
    top: -10,
  },
  chartName: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  song: {
    color: "white",
  },
};
