import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import 'react-native-gesture-handler';

import AuctionList from "./app/screens/AuctionList";
import AuctionPage from "./app/screens/AuctionPage";
import FavoritesList from "./app/screens/FavoritesList";
import MainTabScreen from "./app/screens/MainTabScreen";



const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auction List"> 
        <Stack.Screen name="Auction List" component={MainTabScreen} />
        <Stack.Screen name="Auction Page" component={AuctionPage} />
        <Stack.Screen name="Favorites List" component={FavoritesList} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

