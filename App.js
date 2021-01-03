import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, StatusBar, Platform, ScrollView } from 'react-native';
import AuctionCard from "./app/screens/AuctionCard"

export default function App() {
  return (
    <SafeAreaView style={styles.main}>

      <View style={styles.headerContainer}>
        <Text style={styles.header}>Auctions</Text>
      </View>

      <ScrollView style={styles.scroll} >
        <View style={{alignItems:"center"}}>
          <AuctionCard 
            uri={"https://moderndiplomacy.eu/wp-content/uploads/2019/01/rolex-oyster.jpg"} 
            name="Rolex Watch"
            entryPrice="$690"
            lastBid="$845"
            auctionDeadline="12.01.2021"
          />
          <Text></Text>
          <AuctionCard 
            uri={"https://static.keymusic.com/products/265499/XL/yamaha-psr-e463.jpg"} 
            name="Keyboard - Yamaha PSR"
            entryPrice="$170"
            lastBid="$260"
            auctionDeadline="13.01.2021"
          />
          <Text></Text>
          <AuctionCard
            uri={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2gR6EMYNpytjkjEIxXBAFCyEkjUWTV7eC2Q&usqp=CAU"} 
            name="PS4 + FIFA 2019"
            entryPrice="$260"
            lastBid="$265"
            auctionDeadline="14.01.2021"
          />
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
})
