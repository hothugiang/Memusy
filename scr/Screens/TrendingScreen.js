import * as React from "react";
import { useState } from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
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
import { Platform } from 'react-native';
import kpop from "./../../assets/img/kpop.jpg";
import { BackgroundImage } from "react-native-elements/dist/config";
import { Ionicons } from "@expo/vector-icons";
import { ScreenHeight } from "react-native-elements/dist/helpers";

const Tab = createMaterialTopTabNavigator();
const { width: WIDTH } = Dimensions.get("window");
const { height: HEIGHT } = Dimensions.get("window");
const standardWidth = 360;
const standardHeight = 800;

const BottomTab = () => {
  const data = [
    {
      imgNumber:1,
      name: "Nhạc Việt",
      src: require("./../../assets/img/vlmb.jpg"),
      rank1: "Vùng Lá Me Bay",
      rank2: "Tấm Lòng Son",
      rank3: "Bạn Đời",
    },
    {
      imgNumber:1,
      name: "Nhạc USUK",
      src: require("./../../assets/img/kpop.jpg"),
      rank1: "Seven",
      rank2: "Baddie",
      rank3: "Love Lee",
    },
    {
      imgNumber:1,
      name: "Nhạc Hàn",
      artist: "g",
      src: require("./../../assets/img/bandoi.jpg"),
      rank1: "Love Story",
      rank2: "You Broke Me First",
      rank3: "Hard To Let Go",
    },
  ];
  const VietNam = () => {
    return (
      <View style={{ backgroundColor: "#000000" }}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.chartContainer}>
              <TouchableOpacity style={styles.chartContainer}>
                <ImageBackground source={item.src} blurRadius={40}>
                  <View style={{ flexDirection: "row", marginTop:10}}>
                    <Image source={require(`../../assets/img/1.png`)} style={styles.img1} resizeMode="cover" />
                    <Image source={item.src} style={styles.img} resizeMode="cover" />
                    <View style={styles.songContainer}>
                      <Text style={styles.chartName}>{item.name}</Text>
                      <Text
                        style={styles.song}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {item.rank1}
                      </Text>
                    </View>
                  </View>
                </ImageBackground>

              </TouchableOpacity>
            </View>

          )}
        ></FlatList>
        <View height={ScreenHeight} style={{ backgroundColor: "#000000" }}></View>
      </View>
    )
  }
  const USUK = () => {
    return (
      <View style={{ backgroundColor: "#000000" }}>

      </View>
    )
  }
  const Korea = () => {
    return (
      <View style={{ backgroundColor: "#000000" }}>

      </View>
    )
  }
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'white', // Màu chữ của tab đang được chọn
        inactiveTintColor: 'gray', // Màu chữ của các tab không được chọn
        style: { backgroundColor: 'black' }, // Màu nền của thanh bottom tab
      }}
      screenOptions={({ route }) => ({
        tabBarIndicatorStyle: {
          backgroundColor: 'white', // Màu của thanh hoạt động
          height: 1.5,
        },
        tabBarLabelStyle: {
          fontWeight: 'bold', // Chữ in đậm
          fontSize: 14, // Kích thước font chữ
        },
      })}
    >
      <Tab.Screen name="Việt Nam" component={VietNam} />
      <Tab.Screen name="Nhạc USUK" component={USUK} />
      <Tab.Screen name="Nhạc Hàn" component={Korea} />
    </Tab.Navigator>
  )
}
export default function TrendingScreen({ navigation }) {
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.text}>Trending Now</Text>
      </View>
      <BottomTab style={{ backgroundColor: "black" }} />
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
    width:70,
    height:70,
    marginLeft:-5,
    alignItems: "center",
    justifyContent:"center"
  },
  img: {
    width: 70,
    height: 70,
    marginRight:20,
    marginLeft:-10,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  songContainer: {
    justifyContent:"center",
    alignSelf:"center",
    flexDirection:"column",
    top:-10
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
