import * as React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
} from "react-native";
import { Button } from "react-native-elements";

export default function Search({ navigation }) {
  return (
    <View
      style={{
        backgroundColor: "black",
        height: Dimensions.get("window").height,
        flexDirection: "column",
      }}
    >
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={{ alignItems: "center", marginTop: 20, marginBottom: 20 }}>
        <Button
          title=" Bạn muốn nghe gì...                                       "
          titleStyle={styles.buttonText}
          buttonStyle={styles.buttonBackground}
          containerStyle={{ alignItems: "flex-start" }}
          icon={{ name: "search", type: "font-awesome", color: "black" }}
          iconPosition="left"
        />
      </View>
      <ScrollView>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {/* Wrap each text element with a View for consistent borderRadius */}
          <View style={styles.imgWrapper}>
            <Text style={styles.img}>2</Text>
          </View>
          <View style={styles.imgWrapper}>
            <Text style={styles.img}>2</Text>
          </View>
          <View style={styles.imgWrapper}>
            <Text style={styles.img}>2</Text>
          </View>
          <View style={styles.imgWrapper}>
            <Text style={styles.img}>2</Text>
          </View>
          <View style={styles.imgWrapper}>
            <Text style={styles.img}>2</Text>
          </View>
          <View style={styles.imgWrapper}>
            <Text style={styles.img}>2</Text>
          </View>
          <View style={styles.imgWrapper}>
            <Text style={styles.img}>2</Text>
          </View>
          <View style={styles.imgWrapper}>
            <Text style={styles.img}>2</Text>
          </View>
          <View style={styles.imgWrapper}>
            <Text style={styles.img}>2</Text>
          </View>
          <View style={styles.imgWrapper}>
            <Text style={styles.img}>2</Text>
          </View>
          <View style={styles.imgWrapper}>
            <Text style={styles.img}>2</Text>
          </View>
          <View style={styles.imgWrapper}>
            <Text style={styles.img}>2</Text>
          </View>
          <View style={styles.imgWrapper}>
            <Text style={styles.img}>2</Text>
          </View>
          <View style={styles.imgWrapper}>
            <Text style={styles.img}>2</Text>
          </View>
          <View style={styles.imgWrapper}>
            <Text style={styles.img}>2</Text>
          </View>
          <View style={styles.imgWrapper}>
            <Text style={styles.img}>2</Text>
          </View>
          <View style={styles.imgWrapper}>
            <Text style={styles.img}>2</Text>
          </View>
          <View style={styles.imgWrapper}>
            <Text style={styles.img}>2</Text>
          </View>
          <View style={styles.imgWrapper}>
            <Text style={styles.img}>2</Text>
          </View>
          <View style={styles.imgWrapper}>
            <Text style={styles.img}>2</Text>
          </View>
          <View style={styles.imgWrapper}>
            <Text style={styles.img}>2</Text>
          </View>
          <View style={styles.imgWrapper}>
            <Text style={styles.img}>2</Text>
          </View>
          {/* Add more items here */}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
  },
  buttonBackground: {
    backgroundColor: "white",
  },
  imgWrapper: {
    width: Dimensions.get("window").width / 2 - 15,
    height: 100,
    borderRadius: 10,
    borderColor: "black",
    marginLeft: 10,
    marginTop: 10,
    overflow: "hidden", // Hide any overflow content
  },
  img: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
