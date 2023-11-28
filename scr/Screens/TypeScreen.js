import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity, Animated, FlatList } from 'react-native';
import { Dimensions } from 'react-native';

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
const standardWidth = 360;
const standardHeight = 800;

export default function TypeScreen({ navigation }) {
  const [scrollY] = useState(new Animated.Value(0));

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [200, 50],
    extrapolate: 'clamp',
  });

  const data = [
    // Your data here
    { name: "Vùng lá me bay", artist: "Hihi", src: require("./../../assets/img/vlmb.jpg"), year: 2022, type: "Single" },
    { name: "Tấm lòng son", artist: "Hihi", src: require("./../../assets/img/kpop.jpg"), year: 2008, type: "EP" },
    { name: "Bạn đời", artist: "g", src: require("./../../assets/img/bandoi.jpg"), year: 1989 },
    { name: "Mang tiền về cho mẹ", artist: "Hihi", src: require("./../../assets/img/mangtien.jpg"), year: 1908, type: "Single" },
    { name: "Đi theo bóng mặt trời", artist: "Hihi", src: require("./../../assets/img/theobong.jpg"), year: 2003, type: "Single" },
    { name: "Đi về nhà", artist: "Hihi", src: require("./../../assets/img/divenha.jpg"), year: 2021, type: "Single" },
    { name: "Vùng lá me bay", artist: "Hihi", src: require("./../../assets/img/vlmb.jpg"), year: 2022, type: "Single" },
    { name: "Tấm lòng son", artist: "Hihi", src: require("./../../assets/img/kpop.jpg"), year: 2008, type: "EP" },
    { name: "Bạn đời", artist: "g", src: require("./../../assets/img/bandoi.jpg"), year: 1989 },
    { name: "Mang tiền về cho mẹ", artist: "Hihi", src: require("./../../assets/img/mangtien.jpg"), year: 1908, type: "Single" },
    { name: "Đi theo bóng mặt trời", artist: "Hihi", src: require("./../../assets/img/theobong.jpg"), year: 2003, type: "Single" },
    { name: "Đi về nhà", artist: "Hihi", src: require("./../../assets/img/divenha.jpg"), year: 2021, type: "Single" },
  ];

  const renderSongItem = ({ item, index }) => (
    <View key={index} style={styles.songsWrapper}>
      <TouchableOpacity style={styles.songs} onPress={() => navigation.navigate("SongDetail")}>
        <Image source={item.src} style={styles.songImage} resizeMode="cover" />
        <View>
          <Text style={styles.songTitle}>{item.name}</Text>
          <Text style={styles.songType}>{item.artist}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.songOption}>...</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { height: headerHeight,alignContent:'space-between'}]}>
        <Text style={styles.headerText}>Thể loại</Text>
      </Animated.View>
      <FlatList
        data={data}
        renderItem={renderSongItem}
        keyExtractor={(item, index) => index.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      />
      <View style={{ height: 60,backgroundColor:"black", }}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#AACCFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
  },
  songsWrapper: {
    backgroundColor:"black",
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
});
