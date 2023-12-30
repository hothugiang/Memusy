import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native";
const { width: WIDTH } = Dimensions.get("window");
const { height: HEIGHT } = Dimensions.get("window");
const standardWidth = 360;
const standardHeight = 800;


export default function EditProfileScreen({ navigation }) {
    return (
            <View style={styles.headcontainer} >
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("User")}
                    >
                        <Ionicons name="close-outline" style={{ fontSize: 35, color: 'white' }}></Ionicons>
                    </TouchableOpacity>
                    <Text style={styles.textheader}>Edit Profile</Text>
                    <TouchableOpacity>
                        <Ionicons name="checkmark" style={{ fontSize: 35, color: 'white' }}></Ionicons>
                    </TouchableOpacity>
                </View>
                <View style={{ padding: 20, alignItems: 'center' }}>
                    <Image
                        source={require("../../assets/img/cho.jpg")}
                        style={styles.img} />
                    <Text style={styles.textchange}>
                        Change Profile Photo
                    </Text>
                </View>
                <View style={{ marginLeft: WIDTH / 15, marginRight: WIDTH / 15 }}>
                    <View style={{ padding: 10 }}>
                        <Text style={{ opacity: 0.5, fontSize: 18, color: 'white' }}>Name</Text>
                        <TextInput
                            placeholder="Name"
                            defaultValue="MingMing"
                            style={styles.Info}
                        />
                    </View>
                    <View style={{ padding: 10 }}>
                        <Text style={{ opacity: 0.5, fontSize: 18, color: "white" }}>Email</Text>
                        <TextInput
                            placeholder="Email"
                            defaultValue="minh@gmail.com"
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
