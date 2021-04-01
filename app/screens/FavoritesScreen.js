import React from 'react';
import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, Image,  TouchableOpacity } from 'react-native';
import AuctionCard from "../components/AuctionCard";
import Swiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = ({navigation}) => {

    const auctionList = [
        {
            uri: "https://moderndiplomacy.eu/wp-content/uploads/2019/01/rolex-oyster.jpg",
            name:"Rolex Watch",
            entryPrice:"$690",
            bids: [720, 723, 760, 815],
            lastBid:"$845",
            auctionDeadline:"12.01.2021"
        },
        {
            uri: "https://static.keymusic.com/products/265499/XL/yamaha-psr-e463.jpg",
            name:"Keyboard - Yamaha PSR",
            entryPrice:"$170",
            bids: [180, 190, 212, 225, 245],
            lastBid:"$260",
            auctionDeadline:"13.01.2021"
        },
        {
            uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2gR6EMYNpytjkjEIxXBAFCyEkjUWTV7eC2Q&usqp=CAU",
            name:"PS4 + FIFA 2019",
            entryPrice:"$260",
            bids:[263],
            lastBid:"$265",
            auctionDeadline:"14.01.2021"
        }
        ];
    let auctionCards = auctionList.map((auction, index) => {
        return (
        <AuctionCard
            isFavourite={false}
            key = {index}
            uri={auction.uri} 
            name={auction.name} 
            entryPrice={auction.entryPrice}
            bids={auction.bids}
            lastBid={auction.lastBid} 
            auctionDeadline={auction.auctionDeadline}
            navigation={navigation}
        />
    );

  });

  return (
      <ScrollView style={styles.scroll}>
        <View style={styles.cardsWrapper}>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 18,
            fontWeight: 'bold',
            color: '#333',
          }}>
          Favorites
        </Text>
        <View style={{alignItems:"center"}}>
          {auctionCards}
        </View>
      </View>
        
      </ScrollView>
      );
};


const styles = StyleSheet.create({
    main: {
      paddingTop: Platform.OS==="android" ? StatusBar.currentHeight : 0,
      alignItems: "center",
      backgroundColor: "#ffffff",
      flex: 1
    },
    header:{
      fontSize: 30,
      fontWeight: "700",
    },
    headerContainer: {
      alignItems: "center",
      width : "90%",
      padding: 10,
      margin:5,
      borderBottomWidth: 1,
      borderColor: "#8c8c8c"
    },
    scroll:{
      width: "100%",
    },
    wrapper: {},
});

export default HomeScreen;