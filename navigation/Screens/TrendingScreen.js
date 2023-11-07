import * as React from "react";
import { useState } from "react";
import {
  Keyboard,
  Animated,
  KeyboardAvoidingView,
  View,
  Text,
  _View,
  ScrollView,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import logo from "/MobileApp/img/logo.png";
import { Ionicons } from "react-native-vector-icons";
import { useEffect } from "react";
const { width: WIDTH } = Dimensions.get("window");
const IMAGE_HEIGHT = WIDTH / 2;
const IMAGE_HEIGHT_SMALL = WIDTH / 3;

export default function TrendingScreen({ navigator }) {
  const [imageHeight] = useState(new Animated.Value(IMAGE_HEIGHT));
  const [imageMarginTop] = useState(new Animated.Value(0));

  useEffect(() => {
    const KeyboardWillShow = (event) => {
      Animated.timing(imageHeight, {
        duration: event.duration,
        toValue: IMAGE_HEIGHT_SMALL,
      }).start();
      Animated.timing(imageMarginTop, {
        duration: event.duration,
        toValue: 0,
      }).start();
    };
    const KeyboardWillHide = (event) => {
      Animated.timing(imageHeight, {
        duration: event.duration,
        toValue: IMAGE_HEIGHT,
      }).start();
      Animated.timing(imageMarginTop, {
        duration: event.duration,
        toValue: 0,
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
  }, [imageHeight, imageMarginTop]);

  const [showPass, setShowPass] = useState(false);
  const [press, setPress] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPass(!showPass);
    setPress(!press);
  };

  return (
    <KeyboardAvoidingView style={styles.backgroundContainer} behavior="padding">
      <Animated.Image
        source={logo}
        style={[
          styles.logo,
          { height: imageHeight },
          { marginTop: imageMarginTop },
        ]}
      />
      <Text style={styles.logtext}>Login</Text>

      <KeyboardAvoidingView style={styles.inputContainer}>
        <TextInput
          style={styles.inputContent}
          placeholder={"Email"}
          placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
          underlineColorAndroid="transparent"
          // onChangeText={(email) =>
          //   this.setState({

          //       emailAddress: email,
          //     })

          // }
          //value={this.state.emailAddress}
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
          ></Ionicons>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <KeyboardAvoidingView style={styles.inputContainer}>
        <TextInput
          style={styles.inputContent}
          placeholder={"Confirm Password"}
          secureTextEntry={!showPass}
          placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
          underlineColorAndroid="transparent"
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
          ></Ionicons>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <TouchableOpacity style={styles.btnsignup}>
        <Text style={styles.text}>Sign up</Text>
      </TouchableOpacity>
      <KeyboardAvoidingView>
        <TouchableOpacity style={styles.toSignUpContainer}>
          <Text style={styles.new}>New to Memusy?</Text>
          <Text style={styles.toSignUp}> Join now</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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

  logo: {
    // marginTop: 50,
    // alignItems: "center",

    // width: 150,
    height: IMAGE_HEIGHT,
    resizeMode: "contain",
    marginBottom: 10,
    marginTop: 0,
  },
  logoText: {
    color: "rgb(246,	244,	246)",
    fontSize: 20,
    fontFamily: "kinkee",
    fontWeight: "50",
    marginTop: 10,
    opacity: 0.5,
  },

  logtext: {
    fontSize: 25,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold",
    alignSelf: "center",
    color: "rgba(255,255,255,0.7)",
  },
  inputContainer: {
    marginTop: 0,
  },
  inputContent: {
    marginTop: 10,
    width: WIDTH - 55,
    height: 60,
    borderRadius: 25,
    fontSize: 14,
    paddingLeft: 45,
    backgroundColor: "rgba(221,114,158,1)",
    color: "rgba(255,255,255,0.7)",
    marginHorizontal: 25,
  },

  inputIcon: {
    position: "absolute",
    top: 25,
    left: 37,
  },
  btnEye: {
    position: "absolute",
    top: 25,
    right: 37,
  },

  btnsignup: {
    width: (WIDTH - 90) / 2,
    height: 70,
    borderRadius: 40,
    backgroundColor: "rgba(123,133,201,255)",
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  text: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
    fontWeight: "bold",
  },

  toSignUpContainer: {
    flexDirection: "row",
  },
  toSignUp: {
    marginTop: 215,
    fontWeight: "bold",
    color: "rgba(0,0,0,0.7)",
  },
  new: {
    marginTop: 215,
    marginLeft: 100,
    color: "rgba(0,0,0,0.7)",
  },
};
