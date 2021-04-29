import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Text, View, Button, Platform } from 'react-native';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from "./app/context/AuthContext";
import { useAuth } from './app/hooks/useAuth';
import AuctionScreen from "./app/screens/AuctionScreen";
import FavoritesScreen from "./app/screens/FavoritesScreen";
import HomeScreen from "./app/screens/HomeScreen";
import ProfileScreen from "./app/screens/ProfileScreen";
import SignInScreen from "./app/screens/SignInScreen";
import SignUpScreen from "./app/screens/SignUpScreen";
import UploadScreen from "./app/screens/UploadScreen";
import UserScreen from "./app/screens/UserScreen";
import PayScreen from "./app/screens/PayScreen";
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import FlashMessage from "react-native-flash-message";

const AuthStack = createStackNavigator();
const Stack = createStackNavigator();
const Tabs = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator(); 
const UploadStack = createStackNavigator();
const FavoritesStack = createStackNavigator();
const RootStack = createStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const HomeStackScreen = () => (
  <HomeStack.Navigator headerMode="none">
    <HomeStack.Screen name="Home" component={HomeScreen}/>
    <HomeStack.Screen name="Auction" component={AuctionScreen}/>
    <HomeStack.Screen name="User" component={UserScreen}/>
    <HomeStack.Screen name="Pay" component={PayScreen}/>
  </HomeStack.Navigator>
)

const ProfileStackScreen = () => (
  <ProfileStack.Navigator headerMode="none">
    <ProfileStack.Screen name="Profile" component={ProfileScreen}/>
  </ProfileStack.Navigator>
)

const UploadStackScreen = () => (
  <UploadStack.Navigator headerMode="none">
    <UploadStack.Screen name="Upload" component={UploadScreen}/>
    <UploadStack.Screen name="Auction" component={AuctionScreen}/>
    <UploadStack.Screen name="User" component={UserScreen}/>
    <UploadStack.Screen name="Pay" component={PayScreen}/>
  </UploadStack.Navigator>
)

const FavoritesStackScreen = () => (
  <FavoritesStack.Navigator headerMode="none">
    <FavoritesStack.Screen name="Favorites" component={FavoritesScreen}/>
    <FavoritesStack.Screen name="Auction" component={AuctionScreen}/>
    <FavoritesStack.Screen name="User" component={UserScreen}/>
    <FavoritesStack.Screen name="Pay" component={PayScreen}/>
  </FavoritesStack.Navigator>
)

const TabsScreen = () => (
  <Tabs.Navigator headerMode="none" >
    <Tabs.Screen 
    name="Home" 
    component={HomeStackScreen}
    options={{
      tabBarLabel: 'Anasayfa',
      tabBarColor: '#6B9080',
      tabBarIcon: ({ color }) => (
        <Icon name="ios-home" color={color} size={26} />
      ),
    }}
    />
    <Tabs.Screen 
    name="Upload"
    component={UploadStackScreen}
    options={{
      tabBarLabel: 'Ürün Yükleme',
      tabBarColor: '#6B9080',
      tabBarIcon: ({ color }) => (
        <Icon name="add-outline" color={color} size={26} />
      ),
    }}
    />
    <Tabs.Screen 
    name="Favorites" 
    component={FavoritesStackScreen}
    options={{
      tabBarLabel: 'Listelerim',
      tabBarColor: '#6B9080',
      tabBarIcon: ({ color }) => (
        <Icon name="heart-outline" color={color} size={26} />
      ),
    }}
    />
    <Tabs.Screen 
    name="Profile" 
    component={ProfileStackScreen}
    options={{
      tabBarLabel: 'Profil',
      tabBarColor: '#6B9080',
      tabBarIcon: ({ color }) => (
        <Icon name="ios-person" color={color} size={26} />
      ),
    }}
    />
  </Tabs.Navigator>
)

const AuthStackScreen = () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen 
      name="SignIn" 
      component={SignInScreen} 
      options={{title: 'Sign In' }}
      // initialParams={{"updateToken": updateToken}}
      />
    <AuthStack.Screen 
      name="SignUp" 
      component={SignUpScreen} 
      options={{title: 'Sign Up' }}
      />
  </AuthStack.Navigator>
)

const RootStackScreen = ({state}) => (
  <RootStack.Navigator headerMode="none">
    {state.user ? (
      <RootStack.Screen name="App" component={TabsScreen}></RootStack.Screen>
    ) : (
      <RootStack.Screen name="Auth" component={AuthStackScreen}></RootStack.Screen>
    )
  }
  </RootStack.Navigator>
)

export default function App() {
  
  const {auth, state} = useAuth();

  return (
    <AuthContext.Provider value={ {auth , user: state.user} }>
      <NavigationContainer>
        <RootStackScreen state={state}></RootStackScreen>
      </NavigationContainer>
      <FlashMessage position="top" floating={true} />
    </AuthContext.Provider>
  );
}

