// import React from 'react';
// import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// function AuctionCard(props) {
    
//     return (
//         <View style = {styles.card}>
//             <Image style={styles.image} source={{
//                 width:"80%",
//                 height:110,
//                 uri:props.uri}}/>
//             <Text style={styles.headerStyle}>{props.name}</Text>
//             <View style={styles.firstLineContainer}>
//                 <Text style={styles.entryPrice}>Entry Price: {props.entryPrice}</Text>
//                 <Text style={styles.deadline}>Auction Deadline: {props.auctionDeadline}</Text>
//             </View> 
//             <View style={styles.secondLineContainer}>
//                 <Text style={styles.highestBid}>Highest Bid: {props.lastBid}</Text>
//                 <TouchableOpacity 
//                     style={styles.buttonContainer}
//                     onPress={() => {
//                         props.navigator.navigate("Auction Page", 
//                                                 {uri: props.uri, name: props.name, 
//                                                 entryPrice: props.entryPrice, bids: props.bids, 
//                                                 lastBid: props.lastBid, auctionDeadline: props.auctionDeadline,
//                                                 addNewBid: props.addNewBid});
//                     }}
//                     >
//                     <Text style={styles.buttonText}>Bid It !</Text>
//                 </TouchableOpacity>
//             </View>
//             <TouchableOpacity style={styles.button2Container}>
//                 <Text style={styles.buttonText}>{props.isFavourite ? "Remove from Favourites": "Add to Favourites"}</Text>
//             </TouchableOpacity>
//         </View>
        
//     );
// }
 
// const styles = StyleSheet.create({
//     card: {
//         flexDirection: "column",
//         alignItems: "center",
//         backgroundColor: "#fff6e0",
//         width: "85%",
//         height: 250,
//         borderColor:'gray',
//         borderWidth:1,
//         borderRadius: 50,
//         marginBottom: 15,
//     },
//     image: {
//         margin: 10,
//         borderRadius: 10,
//     },
//     headerStyle:{
//         fontSize: 20,
//         fontWeight: "bold",
//         color: "#046601"
//     },
//     firstLineContainer:{
//         flexDirection: "row", 
//         width: "100%", 
//         margin: 4, 
//         justifyContent:"space-between",

//     }
//     ,
//     entryPrice:{
//         marginLeft: 10,
//         fontSize: 15
//     },
//     deadline:{
//         marginRight: 10,
//         fontSize: 15
//     },
//     secondLineContainer:{
//         flexDirection: "row", 
//         width: "100%",
//         justifyContent:"space-between"
//     },
//     highestBid:{
//         marginLeft: 10,
//         fontWeight:"bold",
//         fontSize: 18
//     },
//     buttonContainer:{
//         backgroundColor: "#118a27",
//         marginRight: 15,
//         padding: 5,
//         width: "30%", 
//         borderRadius: 5,
//         alignItems: "center"
//     },
//     buttonText:{
//         color: "white",
//         fontWeight: 'bold',
//         fontSize: 15
//     },
//     button2Container:{
//         backgroundColor: "#e329d3",
//         width: "80%", 
//         borderRadius: 10,
//         alignItems: "center",
//         margin: 6,
//         padding: 2
//     },
// })

// export default AuctionCard;

import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';

const AuctionCard = ({navigation, uri, name, lastBid}) => {
    return (

        <View style={styles.card}>
            <View style={styles.cardImgWrapper}>
                <Image
                source={{uri}}
                resizeMode="cover"
                style={styles.cardImg}
                />
            </View>
            <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{name}</Text>
                <Text style={styles.cardDetails}>
                Current Price : {lastBid}
                </Text>
                <IconButton style={styles.cardButton} icon={{ uri: 'https://cdn.onlinewebfonts.com/svg/img_135596.png' }} title="BidIt" 
                onPress={() => {navigation.navigate("Auction");}}
                />
            </View>
            <View style = {styles.cardButtonWrapper}>
            </View>
        </View>
    
    );
}

const styles = StyleSheet.create({
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
    cardImg: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 8,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
    },
    cardInfo: {
        flex: 2,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: '#fff',
    },
    cardTitle: {
        fontWeight: 'bold',
    },
    cardDetails: {
        fontSize: 12,
        color: '#444',
    },
    
    cardButton: {
        padding: 5,
        marginTop: 5,
        marginBottom: 5,
        alignSelf: 'flex-end'
    }
});


export default AuctionCard;