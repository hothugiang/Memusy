import React, { useContext } from "react";
import TokenContext from "../contexts/TokenContext";
import { View } from "react-native";
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import UserScreen from "../Screens/UserScreen";
import LoginScreen from "../Screens/LoginScreen";
import SignupScreen from "../Screens/SignupScreen";

const Stack = createNativeStackNavigator();

export default function UserScreenTab() {

  return (
    <Stack.Navigator>
      <Stack.Screen name="User" component={UserScreen} options={{headerShown: false}} />
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
      <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}
