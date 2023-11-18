import { View,Text } from "react-native";
import React, { Component } from 'react';
import AnimatedHeaderScrollView from "../component/Animated";

const HEADER_MIN_HEIGHT = 50;
const HEADER_MAX_HEIGHT = 200;
export default function TypeScreen({ navigator }) {
  return (
    <AnimatedHeaderScrollView/>
  )
            
}

