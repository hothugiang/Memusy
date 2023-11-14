import React, { useContext } from "react";
import TokenContext from "../contexts/TokenContext";
import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "../Screens/SearchScreen";
import Search from "../Screens/Search";
import TrendingScreen from "../Screens/TrendingScreen";
import DetailScreen from "../Screens/DetailScreen";
const Stack = createNativeStackNavigator();

export default function SearchScreenTab() {
  return (
    <Stack.Navigator initialRouteName="Search" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Search"
        component={Search}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
      />
      <Stack.Screen
        name="SongDetail"
        component={DetailScreen}
      />
    </Stack.Navigator>
  );
}
