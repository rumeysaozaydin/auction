import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import 'react-native-gesture-handler';

//import MainTabScreen from "./app/screens/MainTabScreen";
import SignInScreen from "./app/screens/SignInScreen";
import SignUpScreen from "./app/screens/SignUpScreen";
import HomeScreen from "./app/screens/HomeScreen";
import FavoritesScreen from "./app/screens/FavoritesScreen";
import UploadScreen from "./app/screens/UploadScreen";
import ProfileScreen from "./app/screens/ProfileScreen";
import AuctionScreen from "./app/screens/AuctionScreen";

const AuthStack = createStackNavigator();
const Stack = createStackNavigator();
const Tabs = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator(); 
const UploadStack = createStackNavigator();
const FavoritesStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={HomeScreen}/>
    <HomeStack.Screen name="Auction" component={AuctionScreen}/>
  </HomeStack.Navigator>
)

const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={ProfileScreen}/>
  </ProfileStack.Navigator>
)

const UploadStackScreen = () => (
  <UploadStack.Navigator>
    <UploadStack.Screen name="Upload" component={UploadScreen}/>
  </UploadStack.Navigator>
)

const FavoritesStackScreen = () => (
  <FavoritesStack.Navigator>
    <FavoritesStack.Screen name="Favorites" component={FavoritesScreen}/>
    <FavoritesStack.Screen name="Auction" component={AuctionScreen}/>
  </FavoritesStack.Navigator>
)



export default function App() {

  const [userToken, setUserToken] = React.useState(null);

  let updateToken = (token) => {
    setUserToken(token);
    console.log(token);
  }

  return (
    <NavigationContainer>
    {userToken ? (
      <Tabs.Navigator>
        <Tabs.Screen 
        name="Home" 
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
        />
        <Tabs.Screen 
        name="Upload"
        component={UploadStackScreen}
        options={{
          tabBarLabel: 'Upload',
          tabBarColor: '#1f65ff',
          tabBarIcon: ({ color }) => (
            <Icon name="add-outline" color={color} size={26} />
          ),
        }}
        />
        <Tabs.Screen 
        name="Favorites" 
        component={FavoritesStackScreen}
        options={{
          tabBarLabel: 'Favorites',
          tabBarColor: '#d02860',
          tabBarIcon: ({ color }) => (
            <Icon name="heart-outline" color={color} size={26} />
          ),
        }}
        />
        <Tabs.Screen 
        name="Profile" 
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#694fad',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
        />
      </Tabs.Navigator>) : 
      
      (<AuthStack.Navigator>
        <AuthStack.Screen 
          name="SignIn" 
          component={SignInScreen} 
          options={{title: 'Sign In' }}
          initialParams={{"updateToken": updateToken}}
          />
        <AuthStack.Screen 
          name="SignUp" 
          component={SignUpScreen} 
          options={{title: 'Sign Up' }}
          />
      </AuthStack.Navigator>)}
    </NavigationContainer>
  );
}

