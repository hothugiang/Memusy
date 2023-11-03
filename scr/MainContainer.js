import * as React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserScreenTab from './Tabs/UserScreenTab';
import HomeScreen from './Screens/HomeScreen';
import TrendingScreen from './Screens/TrendingScreen';
import UserScreen from './Screens/UserScreen';
import LoginScreen from './Screens/LoginScreen';
import SignupScreen from './Screens/SignupScreen';

const homeName = "Home"
const TrendingName = 'Trend';
const UserName = 'User';

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;
            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (rn === TrendingName) {
              iconName = focused ? 'trending-up' : 'trending-up-outline';
            } else if (rn === UserName) {
              iconName = focused ? 'person' : 'person-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          labelStyle: { display: 'none' },
        }}
      >
        <Tab.Screen
          name={TrendingName}
          component={TrendingScreen}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name={homeName}
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name={UserName}
          component={UserScreenTab}
          options={{
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
