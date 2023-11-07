import React, { useContext } from "react";
import TokenContext from "../contexts/TokenContext";
import { View } from "react-native";
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import HomeScreen from "../Screens/HomeScreen";
import DetailScreen from "../Screens/DetailScreen";

const Stack = createNativeStackNavigator();

export default function PlayerScreenTab() {

  return (
    <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}} />
        <Stack.Screen name="SongDetail" component={DetailScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}
