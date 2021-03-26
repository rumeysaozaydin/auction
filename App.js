import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import 'react-native-gesture-handler';

import AuctionScreen from "./app/screens/AuctionScreen";
import MainTabScreen from "./app/screens/MainTabScreen";


const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auction List"> 
        <Stack.Screen name="BIDIT" component={MainTabScreen} />
        <Stack.Screen name="AuctionScreen" component={AuctionScreen} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

