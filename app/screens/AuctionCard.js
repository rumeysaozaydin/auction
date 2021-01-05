import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function AuctionCard(props) {
    return (
        <View style = {styles.card}>
            <Image style={styles.image} source={{
                width:"80%",
                height:"50%",
                uri:props.uri}}/>
            <Text style={styles.headerStyle}>{props.name}</Text>
            <View style={styles.firstLineContainer}>
                <Text style={styles.entryPrice}>Entry Price: {props.entryPrice}</Text>
                <Text style={styles.deadline}>Auction Deadline: {props.auctionDeadline}</Text>
            </View> 
            <View style={styles.secondLineContainer}>
                <Text style={styles.highestBid}>Highest Bid: {props.lastBid}</Text>
                <TouchableOpacity 
                    style={styles.buttonContainer} 
                    >
                    <Text style={styles.buttonText}>Bid It !</Text>
                </TouchableOpacity>
            </View>
            
        </View>
        
    );
}
 
const styles = StyleSheet.create({
    card: {
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#fff6e0",
        width: "85%",
        height: 250,
        borderColor:'gray',
        borderWidth:1,
        borderRadius: 50,
    },
    image: {
        margin: 10,
        borderRadius: 10,
    },
    headerStyle:{
        fontSize: 20,
        fontWeight: "bold",
        color: "#046601"
    },
    firstLineContainer:{
        flexDirection: "row", 
        width: "100%", 
        margin: 5, 
        justifyContent:"space-between",

    }
    ,
    entryPrice:{
        marginLeft: 10,
        fontSize: 15
    },
    deadline:{
        marginRight: 10,
        fontSize: 15
    },
    secondLineContainer:{
        flexDirection: "row", 
        width: "100%",
        justifyContent:"space-between"
    },
    highestBid:{
        marginLeft: 10,
        fontWeight:"bold",
        fontSize: 18
    },
    buttonContainer:{
        backgroundColor: "#118a27",
        marginRight: 15,
        padding: 5,
        width: "30%", 
        borderRadius: 5,
        alignItems: "center"
    },
    buttonText:{
        color: "white",
        fontWeight: 'bold',
        fontSize: 15
    }
})

export default AuctionCard;