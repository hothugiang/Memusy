import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar
} from "react-native";
import { Button } from 'react-native-elements';
import { ScreenHeight } from 'react-native-elements/dist/helpers';

export default function Search({ navigation }) {
  return (
    <View style={{ backgroundColor: 'black', height: Dimensions.get("window").height, flexDirection: 'column' }}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style = {{alignItems:'center',marginTop:20,marginBottom:20}}>
        <Button
          title=" Bạn muốn nghe gì...                                       "
          titleStyle={styles.buttonText}
          buttonStyle={styles.buttonBackground}
          containerStyle={{ alignItems: 'flex-start' }}
          icon={{ name: 'search', type: 'font-awesome', color: 'black' }} // Add the search icon
          iconPosition="left" // Position the icon to the left of the text
        />
      </View>
      <ScrollView>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <Text style={styles.img}>2</Text>
          <Text style={styles.img}>2</Text>
          <Text style={styles.img}>2</Text>
          <Text style={styles.img}>2</Text>
          <Text style={styles.img}>2</Text>
          <Text style={styles.img}>2</Text>
          <Text style={styles.img}>2</Text>
          <Text style={styles.img}>2</Text>
          <Text style={styles.img}>2</Text>
          <Text style={styles.img}>2</Text>
          <Text style={styles.img}>2</Text>
          <Text style={styles.img}>2</Text>
          <Text style={styles.img}>2</Text>
          <Text style={styles.img}>2</Text>
          <Text style={styles.img}>2</Text>
          <Text style={styles.img}>2</Text>
          <Text style={styles.img}>2</Text>
          <Text style={styles.img}>2</Text>
          <Text style={styles.img}>2</Text>
          <Text style={styles.img}>2</Text>
          <Text style={styles.img}>2</Text>
          <Text style={styles.img}>2</Text>
          <Text style={styles.img}>2</Text>
          <Text style={styles.img}>2</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    color: 'black', // Text color
    fontSize: 16,
  },
  buttonBackground: {
    backgroundColor: 'white', // Make the background transparent
  },
  img: {
    width: Dimensions.get("window").width / 2 -15,
    height: 100,
    backgroundColor: "#ffffff",
    borderRadius:10,
    marginTop: 2,
    borderColor: "black",
    borderWidth: 1,
    marginLeft:10,
    marginTop:10
  },
};
