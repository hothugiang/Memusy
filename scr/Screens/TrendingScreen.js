import * as React from "react";
import { useState } from "react";

import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
  ImageBackground,
  Touchable,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import UserScreenTab from "../Tabs/UserScreenTab";
import { Ionicons } from "@expo/vector-icons";

import { Button } from "react-native-elements";

import electronic from "./../../assets/img/electronic.jpg";
import remix from "./../../assets/img/remix.jpg";
import hiphop from "./../../assets/img/hiphop.jpg";
import rnb from "./../../assets/img/rnb.jpg";
import movie from "./../../assets/img/movie.jpg";
import latin from "./../../assets/img/latin.jpg";
import rock from "./../../assets/img/rock.jpg";
import acoustic from "./../../assets/img/acoustic.jpg";
import indie from "./../../assets/img/indie.jpg";
import jazz from "./../../assets/img/jazz.jpg";
import classical from "./../../assets/img/classical.jpg";
import pop from "./../../assets/img/pop.jpg";
import country from "./../../assets/img/country.jpg";
import metal from "./../../assets/img/metal.jpg";
import instrumental from "./../../assets/img/instrumental.jpg";
import blues from "./../../assets/img/blues.jpg";
import disco from "./../../assets/img/disco.jpg";
import kpop from "./../../assets/img/kpop.jpg";

const { width: WIDTH } = Dimensions.get("window");
const { height: HEIGHT } = Dimensions.get("window");
const standardWidth = 360;
const standardHeight = 800;

export default function TrendingScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState("Top");
  return (
    <Text>TrendingScreen</Text>
  )}