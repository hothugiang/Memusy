import React, { useContext, useState, useEffect } from "react";
import TokenContext from "../contexts/TokenContext";
import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserScreen from "../Screens/UserScreen";
import LoginScreen from "../Screens/LoginScreen";
import SignupScreen from "../Screens/SignupScreen";
import EditProfileScreen from "../Screens/EditProfile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Favorite from "../Screens/Favorite";
import ListPlaylist from "../Screens/ListPlaylist"
import UserPlaylistDetail from "../Screens/UserPlaylistDetail";
import DetailScreen from "../Screens/DetailScreen";
const Stack = createNativeStackNavigator();

export default function UserScreenTab() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        setIsAuthenticated(!!token);
      } catch (error) {
        console.error("Lỗi khi kiểm tra xác thực:", error);
      }
    };
    checkAuthentication();
  }, []);

  return (
    <Stack.Navigator
      // initialRouteName={isAuthenticated ? "User" : "Login"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="User" component={UserScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Favorite" component={Favorite}/>
      <Stack.Screen name="Playlist" component={ListPlaylist}/>
      <Stack.Screen name="UserPlaylistDetail" component={UserPlaylistDetail}/>
      <Stack.Screen name="SongDetail" component={DetailScreen} />
    </Stack.Navigator>
  );
}
