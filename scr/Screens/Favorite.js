import { Dimensions, ImageBackground } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity, Animated, FlatList } from 'react-native';
import { axiosInstance } from '../constants/Axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from 'react-native';
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
const standardWidth = 360;
const standardHeight = 800;

const Favorite = ({ navigation, route }) => {
    const {userId} = route.params;
    const scrollOfsetY = useRef(new Animated.Value(0)).current;
    const [scrollY] = useState(new Animated.Value(0));

    const handleDeleteSong = async (songId) => {
        const deleteSong = await axiosInstance.delete(`/music/deletesongfromfavorite/${userId}/${songId}`);
        const updatedSongs = songs.filter(item => item.id !== songId);
        setSongs(updatedSongs);
    };

    const [songs, setSongs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`/music/favorites/${userId}`);
                setSongs(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return (
        <View style={{ backgroundColor: "black", flex: 1 }}>
            <DynamicHeader value={scrollOfsetY} navigation={navigation} songs={songs}/>
            
            <FlatList
                data={songs}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View key={item.id} style={styles.songsWrapper}>
                        <TouchableOpacity style={styles.songs} onPress={() => navigation.navigate("SongDetail", {s_id: item.id})}>
                            <Image source={{uri: item.image.toString()}} style={styles.songImage} resizeMode="cover" />
                            <View>
                                <Text style={styles.songTitle}>{item.title}</Text>
                                <Text style={styles.songType}>{item.artist}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Ionicons name="trash" style={{
                                color: "pink",
                                marginTop: 35,
                                marginLeft: -40,
                                fontSize: 18,
                                marginRight:10
                            }}
                            onPress={() => {
                                Alert.alert("Thông báo", "Đã bỏ yêu thích!");
                                handleDeleteSong(item.id);
                            }} 
                            ></Ionicons>
                        </TouchableOpacity>
                    </View>
                )}
            />
            
            <View style={{ height: HEIGHT * 0.065 }}></View>

        </View >

    )
}

const styles = StyleSheet.create({
    header: {
        left: 0,
        right: 0,
    },
    title: {
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
        justifyContent: "space-between",
    },
    songs: {
        height: (70 / standardHeight) * HEIGHT,
        flexDirection: "row",
        width: WIDTH - 40,
    },
    songOption: {
        color: "#616161",
        fontSize: 30,
        marginTop: 15,
        marginRight: 10
    },
    songImage: {
        height: (50 / standardHeight) * HEIGHT,
        width: (50 / standardWidth) * WIDTH,
        margin: 20,
        borderRadius: 10
    },
    songTitle: {
        marginTop: 25,
        fontSize: 16,
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
        fontFamily: 'Open-san',
    },
    minHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backIcon: {
        color: "white",
        fontSize: 30,
        marginLeft: 10
    },
    edit2: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
    edit3: {
        marginTop: 30,
        height: 45,
        width: 240,
        backgroundColor: 'rgba(221,114,158,1)',
        borderWidth: 1,
        borderColor: 'pink',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
});

export default Favorite;
// phần xử lý header
const Header_Max_Height = 200;
const Header_Min_Height = 50;
const Scroll_Distance = 140;
const DynamicHeader = ({ value, navigation, songs }) => {
    const playRandomSong = () => {
        const randomIndex = Math.floor(Math.random() * songs.length);
        const randomSong = songs[randomIndex];
    
        navigation.navigate("SongDetail", { s_id: randomSong.id });
    };

    
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
        outputRange: [80, 5],
        extrapolate: 'clamp'
    });
    const textLeft = value.interpolate({
        inputRange: [Header_Min_Height, Header_Max_Height],
        outputRange: [Dimensions.get("window").width / 2 - 120, Dimensions.get("window").width / 2 - 80],
        extrapolate: 'clamp'
    });

    return (
        <ImageBackground
            source={require("../../assets/img/fa.jpg")}
            resizeMode="cover"
        >
            <Animated.View style={[styles.header, { height: animatedHeaderHeight, backgroundColor: animatedHeaderColor }]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" style={styles.backIcon} />
                </TouchableOpacity>
                <Animated.View
                    style={[
                        {
                            backgroundColor: animatedHeaderColor,
                            position: 'absolute',
                            bottom: 20,
                            left: textLeft,
                        }
                    ]}
                >
                    <Animated.Text style={[styles.headerText, { fontSize: textSize, marginLeft: 10 }]}>Bài hát yêu thích</Animated.Text>
                    <TouchableOpacity style={styles.edit3} onPress={playRandomSong}>
                        <Text style={styles.edit2}>Phát ngẫu nhiên </Text>
                    </TouchableOpacity>
                </Animated.View>
            </Animated.View>
        </ImageBackground>
    );
};

