import React, { useState } from 'react';
import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import AuctionCard from "./AuctionCard";

function AuctionList({navigation}) {
  const [auctionList, setAuctionList] = useState([
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
  ]);

  function addNewBid (name, bid){
    let index = auctionList.findIndex((auction) => {
      return auction.name === name;
    });
    let result = auctionList.map(function (item) {
      return {
          uri: item.uri,
          name: item.name,
          entryPrice: item.entryPrice,
          bids: item.bids,
          lastBid: item.lastBid,
          auctionDeadline: item.auctionDeadline
      }
  })
    result[index].bids = result[index].bids.concat([result[index].lastBid.substring(1)]);
    result[index].lastBid = "$" + bid;
    setAuctionList(result);
  };


  let auctionCards = auctionList.map((auction, index) => {
    return (
      <AuctionCard
        key = {index}
        uri={auction.uri} 
        name={auction.name} 
        entryPrice={auction.entryPrice}
        bids={auction.bids}
        lastBid={auction.lastBid} 
        auctionDeadline={auction.auctionDeadline}
        navigator={navigation}
        addNewBid={addNewBid}
      />
    );

  });

  return (
  <SafeAreaView style={styles.main}>

    <View style={styles.headerContainer}>
      <Text style={styles.header}>Auctions</Text>
    </View>

    <ScrollView style={styles.scroll} >
      <View style={{alignItems:"center"}}>
        {auctionCards}
      </View>
      
    </ScrollView>

  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    main: {
      paddingTop: Platform.OS==="android" ? StatusBar.currentHeight : 0,
      alignItems: "center",
      backgroundColor: "#ffeae8",
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
    }
});

export default AuctionList;