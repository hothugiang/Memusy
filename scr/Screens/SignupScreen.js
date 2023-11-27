import * as React from "react";
import { useState, useEffect } from "react";
import {
  Keyboard,
  Animated,
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import logo from "./../../assets/img/logo.png";
import { Ionicons } from "react-native-vector-icons";
import { axiosInstance } from "../constants/Axios";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const { width: WIDTH } = Dimensions.get("window");
const { height: HEIGHT } = Dimensions.get("window");
const standardWidth = 360;
const standardHeight = 800;
const IMAGE_HEIGHT = WIDTH / 2;
const IMAGE_HEIGHT_SMALL = WIDTH / 3;
const TEXT_FONTSIZE = (40 / standardHeight) * HEIGHT;
const TEXT_FONTSIZE_SMALL = (30 / standardHeight) * HEIGHT;

export default function Sign({ navigation }) {
  //   const [fontsLoaded] = useFonts({
  //     kinkee: require("./../../assets/fonts/Kinkee.otf"),
  //     KedmoteScript: require("./../../assets/fonts/KedmoteScript.otf"),
  //   });
  //   useEffect(() => {
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

  const [imageHeight] = useState(new Animated.Value(IMAGE_HEIGHT));
  const [textFontSize] = useState(new Animated.Value(TEXT_FONTSIZE));

  useEffect(() => {
    const KeyboardWillShow = (event) => {
      Animated.timing(imageHeight, {
        duration: event.duration,
        toValue: IMAGE_HEIGHT_SMALL,
      }).start();
      Animated.timing(textFontSize, {
        duration: event.duration,
        toValue: TEXT_FONTSIZE_SMALL,
      }).start();
    };

    const KeyboardWillHide = (event) => {
      Animated.timing(imageHeight, {
        duration: event.duration,
        toValue: IMAGE_HEIGHT,
      }).start();
      Animated.timing(textFontSize, {
        duration: event.duration,
        toValue: TEXT_FONTSIZE,
      }).start();
    };

    const KeyboardWillShowSub = Keyboard.addListener(
      "keyboardWillShow",
      KeyboardWillShow
    );

    const KeyboardWillHideSub = Keyboard.addListener(
      "keyboardWillHide",
      KeyboardWillHide
    );

    return () => {
      KeyboardWillShowSub.remove();
      KeyboardWillHideSub.remove();
    };
  }, [imageHeight, textFontSize]);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [press, setPress] = useState(false);

  const handleSignup = async () => {
    try {
      // Kiểm tra xác nhận mật khẩu
      if (password !== confirmPassword) {
        console.error("Password and Confirm Password do not match");
        return;
      }

      // Thực hiện yêu cầu đăng ký API
      const userData = {
        username: username,
        email: email,
        password: password,
      };

      console.log(userData);

      // Gọi API đăng ký ở đây, ví dụ:
      const response = await axiosInstance.post("/users/register", userData);

      // Xử lý kết quả từ API
      if (response.status === 201) {
        console.log("Signup successful");
        navigation.navigate("Login"); // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
      } else {
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPass(!showPass);
    setPress(!press);
  };

  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    console.log("username: ", username);
    console.log("password: ", password);
    console.log("confirmpass: ", confirmPassword);

    if (password !== confirmPassword) {
      showAlert("Passwords don't match", false, "Login");
      return;
    }

    setLoading(true);
    console.log("oke 1")
    try {
      const response = await fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });
    
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeUsername = (input) => {
    setUsername(input);
  };

  const onChangePassword = (input) => {
    setPassword(input);
  };

  const onChangeConfirmPassword = (input) => {
    setConfirmPassword(input);
  };

  const onChangeEmail = (input) => {
    setEmail(input);
  };

  return (
    <KeyboardAvoidingView
      style={styles.backgroundContainer}
      behavior="padding"
      keyboardVerticalOffset={-WIDTH / 2.5} // Set the offset to move the view up
    >
      {loading}
      <Animated.Image
        source={logo}
        style={[styles.logo, { height: imageHeight }]}
      />
      <Animated.Text style={[styles.logtext, { fontSize: textFontSize }]}>
        Sign up
      </Animated.Text>

      <KeyboardAvoidingView style={styles.inputContainer}>
        <TextInput
          style={styles.inputContent}
          placeholder={"Email"}
          placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
          underlineColorAndroid="transparent"
          onChangeText={(text) => setEmail(text)}
        />
        <Ionicons
          name={"mail"}
          size={24}
          color={"rgba(255,255,255,0.7)"}
          style={styles.inputIcon}
        />
      </KeyboardAvoidingView>

      <KeyboardAvoidingView style={styles.inputContainer}>
        <TextInput
          style={styles.inputContent}
          placeholder={"Username"}
          placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
          underlineColorAndroid="transparent"
          onChangeText={(text) => setUsername(text)}
        />
        <Ionicons
          name={"ios-person"}
          size={24}
          color={"rgba(255,255,255,0.7)"}
          style={styles.inputIcon}
        />
      </KeyboardAvoidingView>

      <KeyboardAvoidingView style={styles.inputContainer}>
        <TextInput
          style={styles.inputContent}
          placeholder={"Password"}
          secureTextEntry={!showPass}
          placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
          underlineColorAndroid="transparent"
          onChangeText={(text) => setPassword(text)}
        />
        <Ionicons
          name={"lock-closed"}
          size={24}
          color={"rgba(255,255,255,0.7)"}
          style={styles.inputIcon}
        />
        <TouchableOpacity
          style={styles.btnEye}
          onPress={togglePasswordVisibility}
        >
          <Ionicons
            name={press === false ? "eye" : "eye-off"}
            size={24}
            color={"rgba(255, 255, 255, 0.7)"}
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <KeyboardAvoidingView style={styles.inputContainer}>
        <TextInput
          style={styles.inputContent}
          placeholder={"Confirm Password"}
          secureTextEntry={!showPass}
          placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
          underlineColorAndroid="transparent"
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <Ionicons
          name={"lock-closed"}
          size={24}
          color={"rgba(255,255,255,0.7)"}
          style={styles.inputIcon}
        />
        <TouchableOpacity
          style={styles.btnEye}
          onPress={togglePasswordVisibility}
        >
          <Ionicons
            name={press === false ? "eye" : "eye-off"}
            size={24}
            color={"rgba(255, 255, 255, 0.7)"}
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <View>
        <TouchableOpacity style={styles.btnsignup} onPress={handleSignup}>
          <Text style={styles.text}>Sign up</Text>
        </TouchableOpacity>
        <View style={styles.toLogInContainer}>
          <Text style={styles.new}>Already have an account?</Text>
          <TouchableOpacity>
            <Text
              style={styles.toLogIn}
              onPress={() => navigation.navigate("Login")}
            >
              {" "}
              Log in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = {
  backgroundContainer: {
    backgroundColor: "rgb(178,170,216)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: IMAGE_HEIGHT,
    resizeMode: "contain",
    //marginTop: (1 / standardHeight) * HEIGHT,
  },
  logtext: {
    fontSize: 40,
    //marginTop: (5 / standardHeight) * HEIGHT,
    //marginBottom: (2 / standardHeight) * HEIGHT,
    fontWeight: "bold",
    //fontFamily: "KedmoteScript",
    alignSelf: "center",
    color: "rgba(255,255,255,0.7)",
  },
  inputContainer: {
    marginTop: 10,
  },
  inputContent: {
    marginTop: 5,
    width: WIDTH - 55,
    height: (60 / standardHeight) * HEIGHT,
    borderRadius: 25,
    fontSize: 14,
    paddingLeft: (45 / standardWidth) * WIDTH,
    backgroundColor: "rgba(221,114,158,1)",
    color: "rgba(255,255,255,0.7)",
    marginHorizontal: 25,
  },
  inputIcon: {
    position: "absolute",
    top: (25 / standardHeight) * HEIGHT,
    left: (37 / standardWidth) * WIDTH,
  },
  btnEye: {
    position: "absolute",
    top: (25 / standardHeight) * HEIGHT,
    right: (37 / standardWidth) * WIDTH,
  },
  btnsignup: {
    width: (WIDTH - 90) / 2,
    height: (65 / standardHeight) * HEIGHT,
    borderRadius: 40,
    backgroundColor: "rgba(123,133,201,255)",
    marginTop: 20,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  text: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
    fontWeight: "bold",
  },
  toLogInContainer: {
    flexDirection: "row",
  },
  toLogIn: {
    fontWeight: "bold",
    color: "rgba(0,0,0,0.7)",
    //marginTop: (5 / standardHeight) * HEIGHT,
  },
  new: {
    color: "rgba(0,0,0,0.7)",
    //marginTop: (15 / standardHeight) * HEIGHT,
  },
};
