import React,{ useContext } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import TokenContext from '../contexts/TokenContext';
import { TouchableOpacity } from 'react-native';

export default function UserScreen({ navigation }) {
  
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text>UserScreen</Text>
        <Button
              title="Login"
              titleStyle={{ color: "white", fontSize: 30 }}
              onPress={() => navigation.navigate("Login")}
            />
      </View>
    );
}
