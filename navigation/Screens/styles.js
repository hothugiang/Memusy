import { StyleSheet, Dimensions } from "react-native";
const window = Dimensions.get("window");



export default StyleSheet.create({
  container: {
    backgroundColor: "#4c69a5",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 50,
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginVertical: 5,
    // paddingVertical: 5,
    // paddingHorizontal: 15,
    width: window.width - 30,
  },
  logo: {
    height: IMAGE_HEIGHT,
    resizeMode: "contain",
    marginBottom: 20,
    padding: 10,
    marginTop: 20,
  },
  register: {
    marginBottom: 20,
    width: window.width - 100,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    backgroundColor: "#ffae",
  },
  inputIcon: {
    position: "absolute",
    top: 20,
    left: 37,
  },
});
