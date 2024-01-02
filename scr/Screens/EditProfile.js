import React, { useContext } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native";
const { width: WIDTH } = Dimensions.get("window");
const { height: HEIGHT } = Dimensions.get("window");
import UserContext from "../contexts/UserContext";
const standardWidth = 360;
const standardHeight = 800;


export default function EditProfileScreen({ navigation }) {
    const { username, email } = useContext(UserContext);

    return (
        <View style={styles.headcontainer} >
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="close-outline" style={{ fontSize: 35, color: 'white' }}></Ionicons>
                </TouchableOpacity>
                <Text style={styles.textheader}>Edit Profile</Text>
                <TouchableOpacity
                    onPress={() => {
                        Alert.alert("Thông báo", "Thay đổi thông tin thành công!");
                        navigation.goBack();
                    }}
                >
                    <Ionicons name="checkmark" style={{ fontSize: 35, color: 'white' }}></Ionicons>
                </TouchableOpacity>
            </View>
            <View style={{ padding: 20, alignItems: 'center' }}>
                <Image
                    source={require("../../assets/img/cho.jpg")}
                    style={styles.img} />
            </View>
            <View style={{ marginLeft: WIDTH / 15, marginRight: WIDTH / 15 }}>
                <View style={{ padding: 10 }}>
                    <Text style={{ opacity: 0.5, fontSize: 18, color: 'white' }}>Name</Text>
                    <TextInput
                        placeholder="Name"
                        defaultValue={username}
                        style={styles.Info}
                    />
                </View>
                <View style={{ padding: 10 }}>
                    <Text style={{ opacity: 0.5, fontSize: 18, color: "white" }}>Email</Text>
                    <TextInput
                        placeholder="Email"
                        defaultValue={email}
                        style={styles.Info}
                    />
                </View>
            </View>
        </View>
       

    );

}
const styles = {
    headcontainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,

    },
    textheader: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    },
    img: {
        width: 80,
        height: 80,
        borderRadius: 100
    },
    textchange: {
        color: '#3493D9',
    },
    Info: {
        marginTop: 5,
        fontSize: 16,
        borderBottomWidth: 1,
        borderColor: 'white',
        color: 'white'
    }
};
