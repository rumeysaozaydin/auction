import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import AuctionList from "./app/screens/AuctionList";
import AuctionPage from "./app/screens/AuctionPage";



const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auction List"> 
        <Stack.Screen name="Auction List" component={AuctionList} />
        <Stack.Screen name="Auction Page" component={AuctionPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

