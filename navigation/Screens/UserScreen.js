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
} from "react-native";
import logo from "/MobileApp/img/logo.png";
import { Ionicons } from "react-native-vector-icons";

const { width: WIDTH } = Dimensions.get("window");

export default function UserScreen({ navigator }) {
  const [showPass, setShowPass] = useState(false);
  const [press, setPress] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPass(!showPass);
    setPress(!press);
  };

  return (
    <View style={styles.backgroundContainer}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.logoText}>Memusy</Text>
      </View>
      <View style={styles.background}>
        <Text style={styles.logtext}>Sign up</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputUsername}
            placeholder={"Username"}
            placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
            underlineColorAndroid="transparent"
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

            <TouchableOpacity style={styles.btnLogin}>
              <Text style={styles.text}>Login</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.toSignUpContainer}>
            <Text style={styles.new}>New to Memusy?</Text>
            <Text style={styles.toSignUp}> Join now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
    marginTop: 30,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  logoContainer: {
    marginTop: 50,
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
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
    fontSize: 30,
    marginTop: 60,
    marginBottom: 40,
    fontWeight: "bold",
    alignSelf: "center",
    color: "rgba(0,0,0,0.7)",
  },
  inputContainer: {
    marginTop: 0,
  },
  inputUsername: {
    width: WIDTH - 55,
    height: 70,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: "rgba(221,114,158,1)",
    color: "rgba(255,255,255,0.7)",
    marginHorizontal: 25,
  },

  inputPassword: {
    width: WIDTH - 55,
    height: 70,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: "rgba(221,114,158,1)",
    color: "rgba(255,255,255,0.7)",
    marginHorizontal: 25,
  },

  inputIcon: {
    position: "absolute",
    top: 20,
    left: 37,
  },
  btnEye: {
    position: "absolute",
    top: 20,
    right: 37,
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
    height: 70,
    borderRadius: 40,
    backgroundColor: "rgba(123,133,201,255)",
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 220,
    position: "absolute",
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
