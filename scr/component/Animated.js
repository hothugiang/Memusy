// import React, { Component,useState, useEffect, useRef } from 'react';
// import { AppRegistry, Text, View, StyleSheet, ScrollView, Animated, Image, TouchableOpacity } from 'react-native';
// import { Dimensions } from 'react-native';

// const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
// const standardWidth = 360;
// const standardHeight = 800;

// class AnimatedHeaderScrollView extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             scrollY: new Animated.Value(0),
//         };
//     }

//     renderSongs = ({navigation}) => {
//         const data = [
//             { name: "Vùng lá me bay", artist: "Hihi", src: require("./../../assets/img/vlmb.jpg"), year: 2022, type: "Single" },
//             { name: "Tấm lòng son", artist: "Hihi", src: require("./../../assets/img/kpop.jpg"), year: 2008, type: "EP" },
//             { name: "Bạn đời", artist: "g", src: require("./../../assets/img/bandoi.jpg"), year: 1989 },
//             { name: "Mang tiền về cho mẹ", artist: "Hihi", src: require("./../../assets/img/mangtien.jpg"), year: 1908, type: "Single" },
//             { name: "Đi theo bóng mặt trời", artist: "Hihi", src: require("./../../assets/img/theobong.jpg"), year: 2003, type: "Single" },
//             { name: "Đi về nhà", artist: "Hihi", src: require("./../../assets/img/divenha.jpg"), year: 2021, type: "Single" },
//             { name: "Vùng lá me bay", artist: "Hihi", src: require("./../../assets/img/vlmb.jpg"), year: 2022, type: "Single" },
//             { name: "Tấm lòng son", artist: "Hihi", src: require("./../../assets/img/kpop.jpg"), year: 2008, type: "EP" },
//             { name: "Bạn đời", artist: "g", src: require("./../../assets/img/bandoi.jpg"), year: 1989 },
//             { name: "Mang tiền về cho mẹ", artist: "Hihi", src: require("./../../assets/img/mangtien.jpg"), year: 1908, type: "Single" },
//             { name: "Đi theo bóng mặt trời", artist: "Hihi", src: require("./../../assets/img/theobong.jpg"), year: 2003, type: "Single" },
//             { name: "Đi về nhà", artist: "Hihi", src: require("./../../assets/img/divenha.jpg"), year: 2021, type: "Single" },
//         ];

//         return data.map((item, index) => (
//             <View key={index} style={styles.songsWrapper}>
//                 <TouchableOpacity style={styles.songs} onPress={() => navigation.navigate("SongDetail")}>
//                     <Image source={item.src} style={styles.songImage} resizeMode="cover" />
//                     <View>
//                         <Text style={styles.songTitle}>{item.name}</Text>
//                         <Text style={styles.songType}>{item.artist}</Text>
//                     </View>
//                 </TouchableOpacity>
//                 <TouchableOpacity>
//                     <Text style={styles.songOption}>...</Text>
//                 </TouchableOpacity>
//             </View>
//         ));
//     };

//     render({navigation}) {
//         const headerHeight = this.state.scrollY.interpolate({
//             inputRange: [0, 150],
//             outputRange: [200, 50],
//             extrapolate: 'clamp',
//         });

//         return (
//             <View style={styles.container}>
//                 <Animated.View style={[styles.header, { height: headerHeight }]}>
//                     <Text style={styles.headerText}>Animated Header</Text>
//                 </Animated.View>
//                 <ScrollView
//                     style={styles.scrollView}
//                     onScroll={Animated.event(
//                         [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
//                         { useNativeDriver: false }
//                     )}
//                     scrollEventThrottle={16}
//                 >
//                     {this.renderSongs()}
//                     <View style={{ height: 60 }}></View>
//                 </ScrollView>
//             </View>
//         );
//     }
// }


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     header: {
//         backgroundColor: 'blue',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     headerText: {
//         color: 'white',
//         fontSize: 20,
//     },
//     scrollView: {
//         flex: 1,
//         backgroundColor:'black'
//     },
//     content: {
//         padding: 20,
//     },
//     songsContainer: {
//         flex: 1,
//         width: WIDTH,
//         backgroundColor: "#151515",
//     },
//     songsWrapper: {
//         flexDirection: "row",
//     },
//     songs: {
//         height: (70 / standardHeight) * HEIGHT,
//         flexDirection: "row",
//         width: WIDTH - 40,
//     },
//     songOption: {
//         color: "#616161",
//         fontSize: 30,
//         marginTop: 20,
//     },
//     typeOption: {
//         color: "#616161",
//         fontSize: 30,
//         marginTop: 35,
//     },
//     songImage: {
//         height: (50 / standardHeight) * HEIGHT,
//         width: (50 / standardWidth) * WIDTH,
//         margin: 20,
//     },
//     songTitle: {
//         marginTop: 25,
//         fontSize: 18,
//         color: "white",
//     },
//     songType: {
//         marginTop: 0,
//         color: "#616161",
//     },
//     img: {
//         width: (WIDTH - 60) / 2,
//         height: (WIDTH - 60) / 2,
//         justifyContent: "center",
//         alignSelf: "center",
//         alignItems: "center",
//         marginTop: 10,
//     },

//     inputContainer: {
//         width: 100
//     },

//     inputContainerStyle: {
//         borderRadius: 10,
//         borderColor: "white",
//         borderWidth: 1,
//         height: 40,
//     },

//     inputStyle: {
//         paddingLeft: 10,
//     },

//     leftIconStyle: {
//         paddingLeft: 15,
//     },
//     rightIconStyle: {
//         paddingRight: 15,
//     }
// });

// // Register the component
// AppRegistry.registerComponent('AnimatedHeaderScrollView', () => AnimatedHeaderScrollView);

// export default AnimatedHeaderScrollView;
