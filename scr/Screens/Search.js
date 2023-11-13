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
} from "react-native";
import { Button } from "react-native-elements";
import * as React from 'react';

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
          onPress={() => navigation.navigator('SearchScreen')}
        />
      </View>
      <ScrollView>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {/* Wrap each text element with a View for consistent borderRadius */}
          <View style={styles.imgWrapper}>
            <ImageBackground source={electronic} style={styles.img}>
              <Text style={styles.imgText}>Dance & Electronic</Text>
            </ImageBackground>
          </View>

          <View style={styles.imgWrapper}>
            <ImageBackground source={remix} style={styles.img}>
              <Text style={styles.imgText}>Remix</Text>
            </ImageBackground>
          </View>

          <View style={styles.imgWrapper}>
            <ImageBackground source={hiphop} style={styles.img}>
              <Text style={styles.imgText}>Hip hop</Text>
            </ImageBackground>
          </View>

          <View style={styles.imgWrapper}>
            <ImageBackground source={rnb} style={styles.img}>
              <Text style={styles.imgText}>R&B</Text>
            </ImageBackground>
          </View>
          <View style={styles.imgWrapper}>
            <ImageBackground source={movie} style={styles.img}>
              <Text style={styles.imgText}>Nhạc phim</Text>
            </ImageBackground>
          </View>
          <View style={styles.imgWrapper}>
            <ImageBackground source={latin } style={styles.img}>
              <Text style={styles.imgText}>Latin</Text>
            </ImageBackground>
          </View>
          <View style={styles.imgWrapper}>
            <ImageBackground source={rock } style={styles.img}>
              <Text style={styles.imgText}>Rock</Text>
            </ImageBackground>
          </View>
          <View style={styles.imgWrapper}>
            <ImageBackground source={acoustic } style={styles.img}>
              <Text style={styles.imgText}>Folk & Acoustic</Text>
            </ImageBackground>
          </View>
          <View style={styles.imgWrapper}>
            <ImageBackground source={indie } style={styles.img}>
              <Text style={styles.imgText}>Indie</Text>
            </ImageBackground>
          </View>
          <View style={styles.imgWrapper}>
            <ImageBackground source={jazz } style={styles.img}>
              <Text style={styles.imgText}>Jazz</Text>
            </ImageBackground>
          </View>
          <View style={styles.imgWrapper}>
            <ImageBackground source={classical } style={styles.img}>
              <Text style={styles.imgText}>Classical</Text>
            </ImageBackground>
          </View>
          <View style={styles.imgWrapper}>
            <ImageBackground source={pop } style={styles.img}>
              <Text style={styles.imgText}>Pop</Text>
            </ImageBackground>
          </View>
          <View style={styles.imgWrapper}>
            <ImageBackground source={country } style={styles.img}>
              <Text style={styles.imgText}>Country</Text>
            </ImageBackground>
          </View>
          <View style={styles.imgWrapper}>
            <ImageBackground source={metal } style={styles.img}>
              <Text style={styles.imgText}>Metal</Text>
            </ImageBackground>
          </View>
          <View style={styles.imgWrapper}>
            <ImageBackground source={instrumental } style={styles.img}>
              <Text style={styles.imgText}>Instrumental</Text>
            </ImageBackground>
          </View>
          <View style={styles.imgWrapper}>
            <ImageBackground source={blues } style={styles.img}>
              <Text style={styles.imgText}>Blues</Text>
            </ImageBackground>
          </View>
          <View style={styles.imgWrapper}>
            <ImageBackground source={disco } style={styles.img}>
              <Text style={styles.imgText}>Funk & Disco</Text>
            </ImageBackground>
          </View>
          <View style={styles.imgWrapper}>
            <ImageBackground source={kpop } style={styles.img}>
              <Text style={styles.imgText}>Kpop</Text>
            </ImageBackground>
          </View>

          {/* Add more items here */}
        </View>
        <View style={{ height: 60 }}></View>
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
    width: WIDTH / 2 - 15,
    height: (100 / standardHeight) * HEIGHT,
    borderRadius: 10,
    borderColor: "black",
    marginLeft: 10,
    marginTop: 10,
    overflow: "hidden", // Hide any overflow content
  },
  imgText: {
    marginLeft:10,
    marginTop:10,
    fontWeight:"bold",
    flex: 1,
    fontSize: 20,
    color: "white",
  },
  img: {
    width: WIDTH / 2 - 15,
    height: (100 / standardHeight) * HEIGHT,
  },
});
