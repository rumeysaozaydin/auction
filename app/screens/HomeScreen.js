// import React, { useState } from 'react';
// import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
// import AuctionCard from "../components/AuctionCard";

// function AuctionList({navigation}) {
//   const [auctionList, setAuctionList] = useState([
//     {
//       uri: "https://moderndiplomacy.eu/wp-content/uploads/2019/01/rolex-oyster.jpg",
//       name:"Rolex Watch",
//       entryPrice:"$690",
//       bids: [720, 723, 760, 815],
//       lastBid:"$845",
//       auctionDeadline:"12.01.2021"
//     },
//     {
//       uri: "https://static.keymusic.com/products/265499/XL/yamaha-psr-e463.jpg",
//       name:"Keyboard - Yamaha PSR",
//       entryPrice:"$170",
//       bids: [180, 190, 212, 225, 245],
//       lastBid:"$260",
//       auctionDeadline:"13.01.2021"
//     },
//     {
//       uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2gR6EMYNpytjkjEIxXBAFCyEkjUWTV7eC2Q&usqp=CAU",
//       name:"PS4 + FIFA 2019",
//       entryPrice:"$260",
//       bids:[263],
//       lastBid:"$265",
//       auctionDeadline:"14.01.2021"
//     }
//   ]);

//   function addNewBid (name, bid){
//     let index = auctionList.findIndex((auction) => {
//       return auction.name === name;
//     });
//     let result = auctionList.map(function (item) {
//       return {
//           uri: item.uri,
//           name: item.name,
//           entryPrice: item.entryPrice,
//           bids: item.bids,
//           lastBid: item.lastBid,
//           auctionDeadline: item.auctionDeadline
//       }
//   })
//     result[index].bids = result[index].bids.concat([result[index].lastBid.substring(1)]);
//     result[index].lastBid = "$" + bid;
//     setAuctionList(result);
//   };


//   let auctionCards = auctionList.map((auction, index) => {
//     return (
//       <AuctionCard
//         isFavourite={false}
//         key = {index}
//         uri={auction.uri} 
//         name={auction.name} 
//         entryPrice={auction.entryPrice}
//         bids={auction.bids}
//         lastBid={auction.lastBid} 
//         auctionDeadline={auction.auctionDeadline}
//         navigator={navigation}
//         addNewBid={addNewBid}
//       />
//     );

//   });

//   return (
//   <SafeAreaView style={styles.main}>

//     <View style={styles.headerContainer}>
//       <Text style={styles.header}>Auctions</Text>
//     </View>

//     <ScrollView style={styles.scroll} >
//       <View style={{alignItems:"center"}}>
//         {auctionCards}
//       </View>
      
//     </ScrollView>

//   </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//     main: {
//       paddingTop: Platform.OS==="android" ? StatusBar.currentHeight : 0,
//       alignItems: "center",
//       backgroundColor: "#ffeae8",
//       flex: 1
//     },
//     header:{
//       fontSize: 30,
//       fontWeight: "700",
//     },
//     headerContainer: {
//       alignItems: "center",
//       width : "90%",
//       padding: 10,
//       margin:5,
//       borderBottomWidth: 1,
//       borderColor: "#8c8c8c"
//     },
//     scroll:{
//       width: "100%",
//     }
// });

// export default AuctionList;


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
    
        {/* <View style={styles.headerContainer}>
          <Text style={styles.header}>Auctions</Text>
        </View> */}

        <View style={styles.sliderContainer}>
        <Swiper
          autoplay
          horizontal={false}
          height={200}
          activeDotColor="#FF6347">
          <View style={styles.slide}>
            <Image
              source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2gR6EMYNpytjkjEIxXBAFCyEkjUWTV7eC2Q&usqp=CAU"}}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={{uri: "https://static.keymusic.com/products/265499/XL/yamaha-psr-e463.jpg"}}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={{uri: "https://moderndiplomacy.eu/wp-content/uploads/2019/01/rolex-oyster.jpg"}}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
        </Swiper>
        </View>

        <View style={styles.cardsWrapper}>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 18,
            fontWeight: 'bold',
            color: '#333',
          }}>
          Auctions
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
    sliderContainer: {
        height: 200,
        width: '90%',
        marginTop: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 8,
    },
    scroll:{
      width: "100%",
    },
    wrapper: {},

    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 8,
    },
    sliderImage: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 8,
    },
    cardsWrapper: {
        marginTop: 20,
        width: '90%',
        alignSelf: 'center',
    },
    card: {
        height: 100,
        marginVertical: 10,
        flexDirection: 'row',
        shadowColor: '#999',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    cardImgWrapper: {
        flex: 1,
    },
});

export default HomeScreen;