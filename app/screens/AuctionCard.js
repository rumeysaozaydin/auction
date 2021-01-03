import React from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';

function AuctionCard(props) {
    return (
        <View style = {styles.card}>
            <Image style={styles.image} source={{
                width:"80%",
                height:"50%",
                uri:props.uri}}/>
            <Text style={styles.headerStyle}>{props.name}</Text>
            <View style={{flexDirection: "row", width: "100%", margin: 5}}>
                <Text style={styles.entryPrice}>Entry Price: {props.entryPrice}</Text>
                <Text style={styles.deadline}>Auction Deadline: {props.auctionDeadline}</Text>
                <Text></Text>
            </View> 
            <View style={{flexDirection: "row", width: "100%", }}>
                <Text style={styles.highestBid}>Highest Bid: {props.lastBid}</Text>
                <TouchableOpacity style={styles.buttonContainer}>
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
    entryPrice:{
        position: "absolute",
        left: 10,
        fontSize: 15
    },
    deadline:{
        position: "absolute",
        right: 10,
        fontSize: 15
    },
    highestBid:{
        position: "absolute",
        left: 10,
        fontWeight:"bold",
        fontSize: 18
    },
    buttonContainer:{
        position: "absolute",
        right: 15,
        backgroundColor: "#118a27",
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