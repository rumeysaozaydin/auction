import React from 'react';
import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, Image,  TouchableOpacity } from 'react-native';
import AuctionCard from "../components/AuctionCard";
import Swiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ScreenContainer } from 'react-native-screens';
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';
import {useGet} from '../hooks/useGet';

const HomeScreen = ({navigation}) => {

    // const [auctionList, setAuctionList]  = React.useState([
    //     {
    //         uri: "https://moderndiplomacy.eu/wp-content/uploads/2019/01/rolex-oyster.jpg",
    //         name:"Rolex Watch",
    //         entryPrice:"$690",
    //         bids: [720, 723, 760, 815],
    //         lastBid:"$845",
    //         auctionDeadline:"12.01.2021",
    //         id: '3'
    //     },
    //     {
    //         uri: "https://static.keymusic.com/products/265499/XL/yamaha-psr-e463.jpg",
    //         name:"Keyboard - Yamaha PSR",
    //         entryPrice:"$170",
    //         bids: [180, 190, 212, 225, 245],
    //         lastBid:"$260",
    //         auctionDeadline:"13.01.2021",
    //         id: '2'
    //     },
    //     {
    //         uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2gR6EMYNpytjkjEIxXBAFCyEkjUWTV7eC2Q&usqp=CAU",
    //         name:"PS4 + FIFA 2019",
    //         entryPrice:"$260",
    //         bids:[263],
    //         lastBid:"$265",
    //         auctionDeadline:"14.01.2021",
    //         id: '1'
    //     }
    //   ]
    // );
    const auctionList = useGet('/auctions/all');

  
    let auctionCards = auctionList.map((auction, index) => {
        return (
        <AuctionCard
            isFavourite={false}
            key = {index}
            //uri={auction.uri} 
            title={auction.title} 
            initialPrice={auction.initialPrice}
            //bids={auction.bids}
            highestBid={auction.highestBid} 
            expirationTime={auction.expirationTime}
            navigation={navigation}
            id={auction.id}
        />
    );

  });

  const {
    auth: {signOut},
    user,
  } = React.useContext(AuthContext);

  return (
    <ScreenContainer style={styles.container}>
      <ScrollView style={styles.scroll}>
    
      <Text>{user.username}</Text>

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
      </ScreenContainer>
      );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      paddingTop: 60,
      alignItems: 'center',
    },
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