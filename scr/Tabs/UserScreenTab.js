import React, { useContext } from "react";
import TokenContext from "../contexts/TokenContext";
import { View } from "react-native";
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import UserScreen from "../Screens/UserScreen";
import LoginScreen from "../Screens/LoginScreen";
import SignupScreen from "../Screens/SignupScreen";
import EditProfileScreen from "../Screens/EditProfile";

const Stack = createNativeStackNavigator();

export default function UserScreenTab() {

  return (
    <Stack.Navigator initialRouteName="User" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="User" component={UserScreen}/>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen}/>
    </Stack.Navigator>
  );
}