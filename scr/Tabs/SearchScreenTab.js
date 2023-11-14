<<<<<<< HEAD
import React, { useContext } from "react";
import TokenContext from "../contexts/TokenContext";
import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "../Screens/SearchScreen";
import Search from "../Screens/Search";
import TrendingScreen from "../Screens/TrendingScreen";
import DetailScreen from "../Screens/DetailScreen";
const Stack = createNativeStackNavigator();

export default function UserScreenTab() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SongDetail"
        component={DetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
=======
// import React, { useContext } from "react";
// import TokenContext from "../contexts/TokenContext";
// import { View } from "react-native";
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Search from "../Screens/Search";
// import SearchScreen from "../Screens/SearchScreen";

// const Stack = createNativeStackNavigator();

// export default function SearchScreenTab() {

//   return (
//     <Stack.Navigator>
//         <Stack.Screen name="Search" component={Search} options={{headerShown: false}} />
//         <Stack.Screen name="SearchScreen" component={SearchScreen} options={{headerShown: false}} />
//     </Stack.Navigator>
//   );
// }
>>>>>>> d42bff21c910f582f387969c208ad3fc934f4eaa
