import React from 'react';
import {Text, View,  Image } from 'react-native';

export const customPopup = ({appTitle, timeText, title, body }) => (
    <View style={{backgroundColor:timeText, borderWidth:1, borderColor:"#D8D8D8", shadowColor: "#000000", borderRadius: 10, margin: 10}}>
      <View style={{flexDirection: "row", borderBottomWidth:1, borderColor: "#D8D8D8", backgroundColor:"white"}}>
        <Image style={{height:20, width:20, margin:3, marginLeft:6}} source={require('../../assets/gavel.jpeg')}/>
        <Text style={{marginLeft:20, fontSize:15, alignSelf:"center"}}>{appTitle}</Text>
      </View>
      <View style={{justifyContent:'space-around', height:80}}>
        <Text>{body}</Text>
      </View>
      
    </View>
);

export const showPopUp = (color, title, description, time) => {
    this.popup.show({
      onPress: function() {console.log('Pressed')},
      appIconSource: require('../../assets/gavel.jpeg'),
      appTitle: 'Bidit',
      timeText: color, //used as color
      title: title,
      body: description,
      slideOutTime: time
    });
  }