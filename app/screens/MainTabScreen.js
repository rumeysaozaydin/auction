import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import 'react-native-gesture-handler';

import AuctionList from "./AuctionList";
import AuctionPage from "./AuctionPage";
import FavoritesList from "./FavoritesList";
import Upload from "./Upload";
import Profile from "./Profile";
//import MainTabScreen from "./app/screens/MainTabScreen";



const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function MainTabScreen() {
    return(
    <Tab.Navigator
      initialRouteName="Auction List"
      activeColor="#e91e63"
      style={{ backgroundColor: 'tomato' }}
    >
      <Tab.Screen
        name="Auction List"
        component={AuctionList}
        options={{
          tabBarLabel: 'Auctions',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Add Item"
        component={Upload}
        options={{
          tabBarLabel: 'Upload',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="plus" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites List"
        component={FavoritesList}
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="heart" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
