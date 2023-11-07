import * as React from 'react';
import { Dimensions, Image, TouchableOpacity } from 'react-native';
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
            name: "Baihat",
            // image:'https://png.pngtree.com/png-clipart/20230825/original/pngtree-bored-character-man-working-with-laptop-vector-picture-image_8492047.png'
        },
        {
            name: "Baihat",
            // image:'https://png.pngtree.com/png-clipart/20230825/original/pngtree-bored-character-man-working-with-laptop-vector-picture-image_8492047.png'
        },
        {
            name: "Baihat",
            // image:'https://png.pngtree.com/png-clipart/20230825/original/pngtree-bored-character-man-working-with-laptop-vector-picture-image_8492047.png'
        },
        {
            name: "Baihat",
            // image:'https://png.pngtree.com/png-clipart/20230825/original/pngtree-bored-character-man-working-with-laptop-vector-picture-image_8492047.png'
        },
        {
            name: "Baihat",
            // image:'https://png.pngtree.com/png-clipart/20230825/original/pngtree-bored-character-man-working-with-laptop-vector-picture-image_8492047.png'
        },
        {
            name: "Baihat",
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
            <Text style={{color:"#ffff",fontFamily:"Open-san",fontSize:25,marginBottom:10}}>Bài hát như quần què</Text>
            <ScrollView horizontal={true}>
                <FlatList
                    horizontal={true}
                    scrollEnabled={false}
                    nestedScrollEnabled={true}
                    scrollToOverflowEnabled={false}
                    data={data}
                    renderItem={({ item }) =>
                    <TouchableOpacity onPress={() => navigation.navigate("SongDetail")}>
                        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                            <View style={styles.content}>
                                <Image
                                    source={require("./../../assets/img/cho.jpg")}
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
                        </TouchableOpacity>
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
    },
    img: {
        width: Dimensions.get("window").width / 3 - 13,
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
    name: {
        width: Dimensions.get("window").width / 3 - 13,
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


}