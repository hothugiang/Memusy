import React from "react";
import {View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from "../constants/Colors";
import { StyleSheet } from "react-native";

const start = {x:0, y:0};
const end = {x:1, y:0};

const PlayButton = ({

}) => (
    <View style = {styles.container}>
        <View style = {styles.circle}>

        </View>
    </View>
)
const styles = {
    container:{
        width: 78,
        height: 78,
        justifyContent:'center',
        alignItems: "center",


    },
    circle: {
        width:50,
        height:50,
        borderRadius:50,
        backgroundColor:Colors.linearGradient1
    }
}