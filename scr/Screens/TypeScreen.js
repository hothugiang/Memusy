import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity, Animated } from 'react-native';
import { Dimensions, ImageBackground } from 'react-native';
import React, { useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
const standardWidth = 360;
const standardHeight = 800;
const data = [
  { name: "Vùng lá me bay", artist: "Hihi", src: require("./../../assets/img/vlmb.jpg"), year: 2022, type: "Single" },
  { name: "Tấm lòng son", artist: "Hihi", src: require("./../../assets/img/kpop.jpg"), year: 2008, type: "EP" },
  { name: "Bạn đời", artist: "g", src: require("./../../assets/img/bandoi.jpg"), year: 1989 },
  { name: "Mang tiền về cho mẹ", artist: "Hihi", src: require("./../../assets/img/mangtien.jpg"), year: 1908, type: "Single" },
  { name: "Đi theo bóng mặt trời", artist: "Hihi", src: require("./../../assets/img/theobong.jpg"), year: 2003, type: "Single" },
  { name: "Đi về nhà", artist: "Hihi", src: require("./../../assets/img/divenha.jpg"), year: 2021, type: "Single" },
  { name: "Vùng lá me bay", artist: "Hihi", src: require("./../../assets/img/vlmb.jpg"), year: 2022, type: "Single" },
  { name: "Tấm lòng son", artist: "Hihi", src: require("./../../assets/img/kpop.jpg"), year: 2008, type: "EP" },
];

const TypeScreen = ({ navigate }) => {
  const scrollOfsetY = useRef(new Animated.Value(0)).current;
  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      <DynamicHeader value={scrollOfsetY} />
      <ScrollView
        style={styles.container}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{
          nativeEvent: { contentOffset: { y: scrollOfsetY } }
        }], {
          useNativeDriver: false,
        })}
      >
        <Text
          style={styles.title}
        >
          Bài Hát Nổi Bật{" "}
        </Text>
        {data.map(val => {
          return (
            <View style={styles.songsWrapper}>
              <TouchableOpacity style={styles.songs} onPress={() => navigation.navigate("SongDetail")}>
                <Image source={val.src} style={styles.songImage} resizeMode="cover" />
                <View>
                  <Text style={styles.songTitle}>{val.name}</Text>
                  <Text style={styles.songType}>{val.artist}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.songOption}>...</Text>
              </TouchableOpacity>
            </View>
          )
        })}
        <View style={{ height: 400 }}></View>
      </ScrollView>

    </View>

  )
}

const styles = StyleSheet.create({
  header: {
    left: 0,
    right: 0,
  },
  title: {
    marginTop: 25,
    marginLeft: 15,
    color: "white",
    fontFamily: "Open-san",
    fontSize: 20,
    backgroundColor: "black"
  },
  content: {
    marginTop: 20,
    marginLeft: 10,
    left: 10,
    borderRadius: 12,
    justifyContent: "center",
    // alignSelf: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  songsWrapper: {
    backgroundColor: "black",
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

  img2: {
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
  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: 'Open-san'
  },
  minHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    color: "white",
    fontSize:30,
    marginLeft:10
  },

});

export default TypeScreen;
// phần xử lý header
const Header_Max_Height = 240;
const Header_Min_Height = 50;
const Scroll_Distance = 140;
const DynamicHeader = ({ value }: any) => {
  const animatedHeaderHeight = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: 'clamp'
  });
  const animatedHeaderColor = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)'],
    extrapolate: 'clamp'
  });

  const textSize = value.interpolate({
    inputRange: [Header_Min_Height, Header_Max_Height],
    outputRange: [30, 20],
    extrapolate: 'clamp'
  });

  const textTop = value.interpolate({
    inputRange: [Header_Min_Height, Header_Max_Height],
    outputRange: [180, 5],
    extrapolate: 'clamp'
  });
  const textLeft = value.interpolate({
    inputRange: [Header_Min_Height, Header_Max_Height],
    outputRange: [20, Dimensions.get("window").width / 2 - 60],
    extrapolate: 'clamp'
  });

  return (
    <ImageBackground
      source={require('./../../assets/img/divenha.jpg')}
      resizeMode="cover"
    >
      <Animated.View style={[styles.header, { height: animatedHeaderHeight, backgroundColor: animatedHeaderColor }]}>
        <TouchableOpacity >
          <Ionicons name="chevron-back" style={styles.backIcon} />
        </TouchableOpacity>
        <Animated.View
          style={[
            {
              backgroundColor: animatedHeaderColor,
              position: 'absolute',
              bottom: 20,
              left: textLeft,
              top: textTop,
            }
          ]}
        >
          <Animated.Text style={[styles.headerText, { fontSize: textSize }]}>HeaderText</Animated.Text>
        </Animated.View>
      </Animated.View>
    </ImageBackground>
  );
};

