import * as React from 'react';
import { Dimensions, Image } from 'react-native';
import { View, Text, ScrollView, FlatList} from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import DetailScreen from './DetailScreen';

export default function HomeScreen({ navigation }) {
    const [fontsLoaded] = useFonts({
        'GentiumBookBasic-Italic': require('./../../assets/fonts/GentiumBookBasic-Italic.ttf'),
        'Open-san':require('./../../assets/fonts/Montserrat-Bold.ttf')
    });
    useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();
    })
    if (!fontsLoaded) {
        return undefined;
    } else {
        SplashScreen.hideAsync();
    }

    const data = [
        {
            name: "Vùng lá me bay",
            src:require('./../../assets/img/vlmb.jpg')
            // image:'https://png.pngtree.com/png-clipart/20230825/original/pngtree-bored-character-man-working-with-laptop-vector-picture-image_8492047.png'
        },
        {
            name: "Tấm lòng son",
            src:require('./../../assets/img/tamlongson.jpg')
            // image:'https://png.pngtree.com/png-clipart/20230825/original/pngtree-bored-character-man-working-with-laptop-vector-picture-image_8492047.png'
        },
        {
            name: "Bạn đời",
            src:require('./../../assets/img/bandoi.jpg')
            // image:'https://png.pngtree.com/png-clipart/20230825/original/pngtree-bored-character-man-working-with-laptop-vector-picture-image_8492047.png'
        },
        {
            name: "Mang tiền về cho mẹ",
            src:require('./../../assets/img/mangtien.jpg')
            // image:'https://png.pngtree.com/png-clipart/20230825/original/pngtree-bored-character-man-working-with-laptop-vector-picture-image_8492047.png'
        },
        {
            name: "Đi theo bóng mặt trời",
            src:require('./../../assets/img/theobong.jpg')
            // image:'https://png.pngtree.com/png-clipart/20230825/original/pngtree-bored-character-man-working-with-laptop-vector-picture-image_8492047.png'
        },
        {
            name: "Đi về nhà",
            src:require('./../../assets/img/divenha.jpg')
            // image:'https://png.pngtree.com/png-clipart/20230825/original/pngtree-bored-character-man-working-with-laptop-vector-picture-image_8492047.png'
        },

    ];

    const data2 = [
        {
            name: "Nhạc lofy",
            src:require('./../../assets/img/lofy.jpg')
            // image:'https://png.pngtree.com/png-clipart/20230825/original/pngtree-bored-character-man-working-with-laptop-vector-picture-image_8492047.png'
        },
        {
            name: "Chill Music",
            src:require('./../../assets/img/chill.jpg')
            // image:'https://png.pngtree.com/png-clipart/20230825/original/pngtree-bored-character-man-working-with-laptop-vector-picture-image_8492047.png'
        },
        {
            name: "Nhớ về em",
            src:require('./../../assets/img/nho.jpg')
            // image:'https://png.pngtree.com/png-clipart/20230825/original/pngtree-bored-character-man-working-with-laptop-vector-picture-image_8492047.png'
        },
        {
            name: "Lạc vào trong mơ",
            src:require('./../../assets/img/lac.jpg')
            // image:'https://png.pngtree.com/png-clipart/20230825/original/pngtree-bored-character-man-working-with-laptop-vector-picture-image_8492047.png'
        },
        {
            name: "Audio",
            src:require('./../../assets/img/audio.jpg')
            // image:'https://png.pngtree.com/png-clipart/20230825/original/pngtree-bored-character-man-working-with-laptop-vector-picture-image_8492047.png'
        },
        {
            name: "Hơn cả mây trôi",
            src:require('./../../assets/img/hon.jpg')
            // image:'https://png.pngtree.com/png-clipart/20230825/original/pngtree-bored-character-man-working-with-laptop-vector-picture-image_8492047.png'
        },

    ];

    const data3 = [
        {
            name: "Những gì anh nói",
            src:require('./../../assets/img/nhung.jpg')
            // image:'https://png.pngtree.com/png-clipart/20230825/original/pngtree-bored-character-man-working-with-laptop-vector-picture-image_8492047.png'
        },
        {
            name: "4 mùa thương em",
            src:require('./../../assets/img/4mua.jpg')
            // image:'https://png.pngtree.com/png-clipart/20230825/original/pngtree-bored-character-man-working-with-laptop-vector-picture-image_8492047.png'
        },
        {
            name: "Như anh đã thấy em",
            src:require('./../../assets/img/nhu.jpg')
            // image:'https://png.pngtree.com/png-clipart/20230825/original/pngtree-bored-character-man-working-with-laptop-vector-picture-image_8492047.png'
        },
        {
            name: "Nhất trên đời",
            src:require('./../../assets/img/nhat.jpg')
            // image:'https://png.pngtree.com/png-clipart/20230825/original/pngtree-bored-character-man-working-with-laptop-vector-picture-image_8492047.png'
        },
        {
            name: "Hẹn em ở lần yêu thứ hai",
            src:require('./../../assets/img/hen.jpg')
            // image:'https://png.pngtree.com/png-clipart/20230825/original/pngtree-bored-character-man-working-with-laptop-vector-picture-image_8492047.png'
        },
        {
            name: "Tiếng pháo tiễn người đi",
            src:require('./../../assets/img/tieng.jpg')
            // image:'https://png.pngtree.com/png-clipart/20230825/original/pngtree-bored-character-man-working-with-laptop-vector-picture-image_8492047.png'
        },

    ];
    return (
        <ScrollView style={styles.container} horizontal={false}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ paddingTop: 20, paddingLeft: 20 }}>
                    <Text style={{ fontFamily: "GentiumBookBasic-Italic", fontSize: 20, color: 'white' }}>Hello MingMing,</Text>
                    <Text style={{ fontFamily: "GentiumBookBasic-Italic", fontSize: 16, color: 'gray' }}>What do you want to hear today</Text>
                </View>
                <Ionicons name="notifications" color={"#ffffff"} size={25} style={{ paddingTop:30, paddingRight: 30 }} />
            </View>
            <View style={styles.Rectangle} />
            <Text style={{color:"#ffff",fontFamily:"Open-san",fontSize:20,marginBottom:10}}>Nghe gần đây </Text>
            <ScrollView horizontal={true}>
                <FlatList
                    horizontal={true}
                    scrollEnabled={false}
                    nestedScrollEnabled={true}
                    scrollToOverflowEnabled={false}
                    data={data}
                    renderItem={({item}) =>
                        <View style={{flexDirection: "row"}}>
                            <View style={styles.content}>
                                <Image
                                    source={item.src}
                                    style={styles.img}
                                    resizeMode="cover"
                                ></Image>
                                <View style={styles.name}>
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            flexWrap: "wrap",
                                            textAlign: "left",
                                            color: "gray"
                                        }}
                                    >
                                        {item.name}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    }
                ></FlatList>
            </ScrollView>


            <Text style={{color:"#ffff",fontFamily:"Open-san",fontSize:20,marginBottom:10}}>Chill-Lofy</Text>
            <ScrollView horizontal={true}>
                <FlatList
                    horizontal={true}
                    scrollEnabled={false}
                    nestedScrollEnabled={true}
                    scrollToOverflowEnabled={false}
                    data={data2}
                    renderItem={({item}) =>
                        <View style={{flexDirection: "row"}}>
                            <View style={styles.content}>
                                <Image
                                    source={item.src}
                                    style={styles.img2}
                                    resizeMode="cover"
                                ></Image>
                                <View style={styles.name2}>
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            flexWrap: "wrap",
                                            textAlign: "left",
                                            color: "gray"
                                        }}
                                    >
                                        {item.name}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    }
                ></FlatList>
            </ScrollView>
            <Text style={{color:"#ffff",fontFamily:"Open-san",fontSize:20,marginBottom:10}}>Một chút chữa lành</Text>
            <ScrollView horizontal={true}>
                <FlatList
                    horizontal={true}
                    scrollEnabled={false}
                    nestedScrollEnabled={true}
                    scrollToOverflowEnabled={false}
                    data={data3}
                    renderItem={({item}) =>
                        <View style={{flexDirection: "row"}}>
                            <View style={styles.content}>
                                <Image
                                    source={item.src}
                                    style={styles.img3}
                                    resizeMode="cover"
                                ></Image>
                                <View style={styles.name3}>
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            flexWrap: "wrap",
                                            textAlign: "left",
                                            color: "gray"
                                        }}
                                    >
                                        {item.name}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    }
                ></FlatList>
            </ScrollView>
            
        </ScrollView>



        


    );

}

const styles = {
    container: {
        flex: 1,
        backgroundColor: 'black',
        marginBottom:50,
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
        // borderBottomRightRadius: 10,
        // borderBottomLeftRadius: 10,
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
        marginBottom: 20
    },
    content: {
        flexWrap: "wrap",
        margin: 5,
        left: 5,
        borderRadius: 12,
        justifyContent: "center",
        // alignSelf: "center",
        alignItems: "center",
    }

}