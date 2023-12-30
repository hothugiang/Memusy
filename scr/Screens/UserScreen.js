import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Dimensions,TouchableOpacity} from 'react-native';
import { Button } from 'react-native-elements';
import TokenContext from '../contexts/TokenContext';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { axiosInstance } from '../constants/Axios';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width: WIDTH } = Dimensions.get("window");
const { height: HEIGHT } = Dimensions.get("window");
const standardWidth = 360;
const standardHeight = 800;
export default function UserScreen({ navigation }) {

  const [username , setUsername] = useState("");
  
  const [fontsLoaded] = useFonts({
    'GentiumBookBasic-Italic': require('./../../assets/fonts/GentiumBookBasic-Italic.ttf'),
    'Open-san': require('./../../assets/fonts/Montserrat-Bold.ttf')
  });
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
    async function loadData() {
      const username = await AsyncStorage.getItem('username');
      if (!username) {
        navigation.navigate("Login");
      }
      setUsername(username);
    }
    loadData();
  })
  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  const logOut = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        navigation.navigate("Login");
      }
      const response = await axiosInstance.get('/users/logout', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // Xử lý khi logout thành công, ví dụ: chuyển hướng đến màn hình đăng nhập
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("username");
        await AsyncStorage.removeItem("email");
        navigation.navigate('Login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ marginTop: Platform.OS === "ios" ? 24 : 0 }}>
        <Ionicons name='ios-arrow-back' size={24} color='#5257DF'></Ionicons>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <View style={styles.profileImage}>
          <Image source={require("../../assets/img/cho.jpg")} style={styles.image} resizeMode="center"></Image>
        </View>
        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.name}>{username}</Text>
          <Text style={styles.follow}>Followers 5 | Following 20</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity style={styles.edit1} onPress={() => navigation.navigate("EditProfile")}>
          <Text style={styles.edit2}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.edit3} onPress={logOut}>
          <Text style={styles.edit2}>Logout</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ marginLeft: 20, color: "white", fontFamily: "Open-san", fontSize: 20, marginBottom: 10 }}>Thư viện</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        <View style={styles.imgWrapper}>
          <View style={styles.img}>
            <Text style={styles.imgText}>PlayList</Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Favorite")}> 
          <View style={styles.imgWrapper}>
            <View style={styles.img}>
              <Text style={styles.imgText}>Favorite</Text>
            </View>
          </View>
        </TouchableOpacity>


        <View style={styles.imgWrapper}>
          <View style={styles.img}>
            <Text style={styles.imgText}>Album</Text>
          </View>
        </View>

        <View style={styles.imgWrapper}>
          <View style={styles.img}>
            <Text style={styles.imgText}>Nghệ sĩ</Text>
          </View>
        </View>
      </View>
      <View style={{ height: 60 }}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    overflow: 'hidden',
    marginLeft: 20
  },
  image: {
    flex: 1,
    borderRadius: 100,
    width: undefined,
    height: undefined
  },
  name: {
    color: 'white',
    marginLeft: 30,
    marginTop: 15,
    fontSize: 20
  },
  follow: {
    color: 'gray',
    fontSize: 17,
    marginTop: 5,
    marginLeft: 30,
  },
  edit1: {
    marginLeft: 25,
    marginTop: 15,
    marginBottom: 15,
    height: 40,
    width: 80,
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  edit2: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15
  },
  edit3: {
    marginLeft: 10,
    marginTop: 15,
    height: 40,
    width: 80,
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  buttonBackground: {
    backgroundColor: "black",
    borderColor: 'white',
    borderColor: 'white'
  },
  imgWrapper: {
    width: WIDTH / 2 - 15,
    height: 80,
    borderRadius: 10,
    borderColor: "black",
    marginLeft: 10,
    marginTop: 10,
    overflow: "hidden", // Hide any overflow content
    backgroundColor: '#2F2D38'
  },
  imgText: {
    marginLeft: 10,
    marginTop: 10,
    fontWeight: "bold",
    flex: 1,
    fontSize: 20,
    color: "white",
  },
  img: {
    width: WIDTH / 2 - 15,
    height: (100 / standardHeight) * HEIGHT,
  },
})