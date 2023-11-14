import React, { useContext } from "react";
import TokenContext from "../contexts/TokenContext";
import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserScreen from "../Screens/UserScreen";
import LoginScreen from "../Screens/LoginScreen";
import SignupScreen from "../Screens/SignupScreen";
import SearchScreen from "../Screens/SearchScreen";
import TrendingScreen from "../Screens/TrendingScreen";
import EditProfileScreen from "../Screens/EditProfile";
const Stack = createNativeStackNavigator();

export default function UserScreenTab() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UserScreen"
        component={UserScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ headerShown: false }}
      />

      
    </Stack.Navigator>
  );
}
