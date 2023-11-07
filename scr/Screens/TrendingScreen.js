import * as React from "react";
<<<<<<< HEAD
import { View,Text } from "react-native";


export default function TrendingScreen({ navigator }) {
  return (
    <View>
      <Text>Trend</Text>
    </View>
  )
            
=======
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
import { Ionicons } from "react-native-vector-icons";
import { useEffect } from "react";
const { width: WIDTH } = Dimensions.get("window");
const IMAGE_HEIGHT = WIDTH / 2;
const IMAGE_HEIGHT_SMALL = WIDTH / 3;

export default function TrendingScreen({ navigator }) {
  return <Text>TrendingScreen</Text>;
>>>>>>> 98653932758f667e173812980d2c2409bcb0269e
}
