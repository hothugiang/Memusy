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
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";

import electronic from "./../../assets/img/electronic.jpg";
import remix from "./../../assets/img/remix.jpg";
import hiphop from "./../../assets/img/hiphop.jpg";
import rnb from "./../../assets/img/rnb.jpg";
import movie from "./../../assets/img/movie.jpg";
import kid from "./../../assets/img/kid.jpg";
import trinh from "./../../assets/img/trinh.jpg";
import rock from "./../../assets/img/rock.jpg";
import codien from "./../../assets/img/codien.jpg";
import acoustic from "./../../assets/img/acoustic.jpg";
import indie from "./../../assets/img/indie.jpg";
import jazz from "./../../assets/img/jazz.jpg";
import latin from "./../../assets/img/latin.jpg";
import classical from "./../../assets/img/classical.jpg";
import viet from "./../../assets/img/viet.jpg";
import country from "./../../assets/img/country.jpg";

import { Platform } from "react-native";

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
      <View
        style={{
          alignItems: "center",
          marginTop: Platform.OS === "ios" ? 50 : 20,
          marginBottom: 20,
        }}
      >
        <Button
          title=" Bạn muốn nghe gì...                                       "
          titleStyle={styles.buttonText}
          buttonStyle={styles.buttonBackground}
          icon={{
            name: "search",
            type: "font-awesome",
            color: "black",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
          onPress={() => navigation.navigate("SearchScreen")}
          containerStyle={styles.buttonContainer}
          iconLeft
        />
      </View>
      <ScrollView>

        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Type", {
                s_id: "IWZ9Z08B",
                title: "Dance & Electronic",
              })
            }
          >
            <View style={styles.imgWrapper}>
              <ImageBackground source={electronic} style={styles.img}>
                <Text style={styles.imgText}>Dance & Electronic</Text>
              </ImageBackground>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Type", { s_id: "IWZ9Z0BO", title: "Remix" })
            }
          >
            <View style={styles.imgWrapper}>
              <ImageBackground source={remix} style={styles.img}>
                <Text style={styles.imgText}>Remix</Text>
              </ImageBackground>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Type", {
                s_id: "IWZ9Z08C",
                title: "Hip hop",
              })
            }
          >
            <View style={styles.imgWrapper}>
              <ImageBackground source={hiphop} style={styles.img}>
                <Text style={styles.imgText}>Hip hop</Text>
              </ImageBackground>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Type", { s_id: "IWZ9Z09W", title: "R&B" })
            }
          >
            <View style={styles.imgWrapper}>
              <ImageBackground source={rnb} style={styles.img}>
                <Text style={styles.imgText}>R&B</Text>
              </ImageBackground>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Type", { s_id: "IWZ9Z0B7", title: "Nhạc Phim" })
            }
          >
            <View style={styles.imgWrapper}>
              <ImageBackground source={movie} style={styles.img}>
                <Text style={styles.imgText}>Nhạc Phim</Text>
              </ImageBackground>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Type", { s_id: "IWZ9Z090", title: "Nhạc Thiếu Nhi" })
            }
          >
            <View style={styles.imgWrapper}>
              <ImageBackground source={kid} style={styles.img}>
                <Text style={styles.imgText}>Nhạc Thiếu Nhi</Text>
              </ImageBackground>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Type", { s_id: "IWZ9Z08D", title: "Nhạc Không lời" })
            }
          >
            <View style={styles.imgWrapper}>
              <ImageBackground source={classical} style={styles.img}>
                <Text style={styles.imgText}>Nhạc Không Lời</Text>
              </ImageBackground>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Type", { s_id: "IWZ9Z08E", title: "Indie" })
            }
          >
            <View style={styles.imgWrapper}>
              <ImageBackground source={indie} style={styles.img}>
                <Text style={styles.imgText}>Indie</Text>
              </ImageBackground>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Type", { s_id: "IWZ9Z089", title: "Acoustic" })
            }
          >
            <View style={styles.imgWrapper}>
              <ImageBackground source={acoustic} style={styles.img}>
                <Text style={styles.imgText}>Acoustic</Text>
              </ImageBackground>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Type", { s_id: "IWZ9Z0AB", title: "Jazz" })
            }
          >
            <View style={styles.imgWrapper}>
              <ImageBackground source={jazz} style={styles.img}>
                <Text style={styles.imgText}>Jazz</Text>
              </ImageBackground>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Type", { s_id: "IWZ9Z0C9", title: "Nhạc cổ điển" })
            }
          >
            <View style={styles.imgWrapper}>
              <ImageBackground source={codien} style={styles.img}>
                <Text style={styles.imgText}>Nhạc cổ điển</Text>
              </ImageBackground>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Type", { s_id: "IWZ9Z08F", title: "Latin" })
            }
          >
            <View style={styles.imgWrapper}>
              <ImageBackground source={latin} style={styles.img}>
                <Text style={styles.imgText}>Latin</Text>
              </ImageBackground>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Type", { s_id: "IWZ9Z09O", title: "Rock" })
            }
          >
            <View style={styles.imgWrapper}>
              <ImageBackground source={rock} style={styles.img}>
                <Text style={styles.imgText}>Rock</Text>
              </ImageBackground>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Type", { s_id: "IWZ9Z0B0", title: "Nhạc Âu Mỹ Bất Hủ" })
            }
          >
            <View style={styles.imgWrapper}>
              <ImageBackground source={country} style={styles.img}>
                <Text style={styles.imgText}>Nhạc Âu Mỹ Bất Hủ</Text>
              </ImageBackground>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Type", { s_id: "IWZ9Z0CW", title: "Nhạc Việt Bất Hủ" })
            }
          >
            <View style={styles.imgWrapper}>
              <ImageBackground source={viet} style={styles.img}>
                <Text style={styles.imgText}>Nhạc Việt Bất Hủ</Text>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Type", { s_id: "IWZ9Z09I", title: "Nhạc Trịnh" })
            }
          >
            <View style={styles.imgWrapper}>
              <ImageBackground source={trinh} style={styles.img}>
                <Text style={styles.imgText}>Nhạc Trịnh</Text>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          {/* Add more items here */}
        </View>
        
        <View style={{ height: 100 }}></View>
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
    position: "relative",
  },
  buttonBackground: {
    backgroundColor: "white",
    width: WIDTH - 20,
    flexDirection: "row",
    justifyContent: "flex-start",
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
    marginLeft: 10,
    marginTop: 10,
    fontWeight: "bold",
    flex: 1,
    fontSize: 20,
    color: "white",
  },
  img: {
    width: WIDTH / 2 - 15,
    height: (100 / standardHeight) * HEIGHT,
  },
  buttonContainer: {
    flexDirection: "row", // Hiển thị các phần tử con theo chiều ngang
    justifyContent: "flex-start", // Căn trái
    alignItems: "center", // Căn giữa theo chiều dọc
  },
});
