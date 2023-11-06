import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import UserScreenTab from '../Tabs/UserScreenTab';
import { Button } from 'react-native-elements';

export default function LoginScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Text>LoginScreen</Text>
            <Button
              title="Signup"
              titleStyle={{ color: "white", fontSize: 30 }}
              onPress={() => navigation.navigate("Signup")}
            />
        </View>
    );
}