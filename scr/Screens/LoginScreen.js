import * as React from "react";
import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  _View,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import logo from "../../assets/img/logo.png";
import { Ionicons } from "react-native-vector-icons";
import { axiosInstance } from "../constants/Axios";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

const { width: WIDTH } = Dimensions.get("window");
const { height: HEIGHT } = Dimensions.get("window");
const standardWidth = 360;
const standardHeight = 800;

export default function LoginScreen({ navigation }) {
  // const [fontsLoaded] = useFonts({
  //     kinkee: require('./../../assets/fonts/Kinkee.ttf'),
  //     KedmoteScript: require('./../../assets/fonts/KedmoteScript.ttf'),
  //   });
  // useEffect(() => {
  //     async function prepare() {
  //       await SplashScreen.preventAutoHideAsync();
  //     }
  //     prepare();
  //     if (!fontsLoaded) {
  //       return undefined;
  //     } else {
  //       SplashScreen.hideAsync();
  //     }
  //   });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [press, setPress] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPass(!showPass);
    setPress(!press);
  };

  const saveToken = async (token) => {
    try {
      await AsyncStorage.setItem("token", token);
    } catch (error) {
      console.error("Error saving token:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post("/users/login", {
        username: username,
        password: password,
      });

      if (response.status === 200) {
        // Xử lý khi đăng nhập thành công
        const token = response.data.token;
        console.log("Login successfully!");
        saveToken(token);
        const response2 = await axiosInstance.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response2.status === 200) {
          navigation.navigate("User");
        }
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.backgroundContainer}
      behavior="position"
      keyboardVerticalOffset={-300}
    >
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.logoText}>Memusy</Text>
      </View>
      <View style={styles.background} showsVerticalScrollIndicator={false}>
        <Text style={styles.logIntext}>Login</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputUsername}
            placeholder={"Username"}
            placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
            underlineColorAndroid="transparent"
            onChangeText={(text) => setUsername(text)}
          />
          <Ionicons
            name={"ios-person"}
            size={28}
            color={"rgba(255,255,255,0.7)"}
            style={styles.inputIcon}
          />
        </View>
        <View height={1} backgroundColor="rgba(236,230,221,255)"></View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputPassword}
            placeholder={"Password"}
            //secureTextEntry={this.state.s
            secureTextEntry={!showPass}
            placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
            underlineColorAndroid="transparent"
            onChangeText={(text) => setPassword(text)}
          />
          <Ionicons
            name={"lock-closed"}
            size={28}
            color={"rgba(255,255,255,0.7)"}
            style={styles.inputIcon}
          />
          <TouchableOpacity
            style={styles.btnEye}
            onPress={togglePasswordVisibility}
          >
            <Ionicons
              name={press === false ? "eye" : "eye-off"}
              size={26}
              color={"rgba(255, 255, 255, 0.7)"}
            ></Ionicons>
          </TouchableOpacity>
          <View style={styles.loginContainer}>
            <TouchableOpacity>
              <Text style={styles.forgotPass}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
              <Text style={styles.text}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.toSignUpContainer}>
            <Text style={styles.new}>New to Memusy?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={styles.toSignUp}> Join now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = {
  backgroundContainer: {
    backgroundColor: "rgb(178,170,216)",
    flex: 1,
    width: null,
    height: null,
    justifyContent: "center",
    alignItems: "center",
  },

  background: {
    backgroundColor: "rgba(236,230,221,255)",
    flex: 1,
    marginTop: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  logoContainer: {
    marginTop: 50,
    alignItems: "center",
  },
  logo: {
    width: (160 / standardWidth) * WIDTH,
    height: (160 / standardHeight) * HEIGHT,
  },
  logoText: {
    color: "rgb(246,  244,  246)",
    fontSize: 20,
    //fontFamily: "kinkee",
    fontWeight: "bold",
    marginTop: 5,
    opacity: 0.5,
  },

  logIntext: {
    fontSize: 50,
    marginTop: 30,
    marginBottom: 25,
    fontWeight: "bold",
    //fontFamily: "KedmoteScript",
    alignSelf: "center",
    color: "rgba(0,0,0,0.7)",
  },
  inputContainer: {
    marginTop: 0,
  },
  inputUsername: {
    width: WIDTH - 55,
    height: (70 / standardHeight) * HEIGHT,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    fontSize: 16,
    paddingLeft: (45 / standardWidth) * WIDTH,
    backgroundColor: "rgba(221,114,158,1)",
    color: "rgba(255,255,255,0.7)",
    marginHorizontal: 25,
  },

  inputPassword: {
    width: WIDTH - 55,
    height: (70 / standardHeight) * HEIGHT,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    fontSize: 16,
    paddingLeft: (45 / standardWidth) * WIDTH,
    backgroundColor: "rgba(221,114,158,1)",
    color: "rgba(255,255,255,0.7)",
    marginHorizontal: 25,
  },

  inputIcon: {
    position: "absolute",
    top: (20 / standardHeight) * HEIGHT,
    left: (37 / standardWidth) * WIDTH,
  },
  btnEye: {
    position: "absolute",
    top: (20 / standardHeight) * HEIGHT,
    right: (37 / standardWidth) * WIDTH,
  },

  loginContainer: {
    flexDirection: "row",
  },

  forgotPass: {
    marginTop: 56,
    marginLeft: 30,
    position: "absolute",
    fontSize: 12,
    color: "rgba(0,0,0,0.7)",
  },

  btnLogin: {
    width: (WIDTH - 90) / 2,
    height: (70 / standardHeight) * HEIGHT,
    borderRadius: 40,
    backgroundColor: "rgba(123,133,201,255)",
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 196,
    position: "absolute",
  },
  text: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
    fontWeight: "bold",
  },

  toSignUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 180,
  },
  toSignUp: {
    //marginTop: 170,
    fontWeight: "bold",
    color: "rgba(0,0,0,0.7)",
    //marginBottom: 10,
  },
  new: {
    //marginTop: 170,
    //marginLeft: 100,
    color: "rgba(0,0,0,0.7)",
    //marginBottom: 10,
  },
};
