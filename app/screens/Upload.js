import React from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';


function Upload({ route }) {
    return (
        <KeyboardAwareScrollView  style={styles.main}>
            <ScrollView contentContainerStyle={styles.scroll} >
                
                <View style={styles.biddingContainer}>
                    {/* <TouchableOpacity 
                        style={styles.buttonContainer} 
                        >
                        <Text style={styles.buttonText}>Bid It !</Text>
                    </TouchableOpacity> */}
                    
                    <TextInput
                        style={styles.bidInput}
                        placeholder={"Enter Name"}
                        textAlign="center"
                    />
                    
                </View>
                <View style={styles.biddingContainer}>
                    {/* <TouchableOpacity 
                        style={styles.buttonContainer} 
                        >
                        <Text style={styles.buttonText}>Bid It !</Text>
                    </TouchableOpacity> */}
                    
                   
                    <TextInput
                        style={styles.bidInput}
                        placeholder={"Description"}
                        textAlign="center"
                    />
                    
                </View>
                <View style={styles.biddingContainer}>
                    {/* <TouchableOpacity 
                        style={styles.buttonContainer} 
                        >
                        <Text style={styles.buttonText}>Bid It !</Text>
                    </TouchableOpacity> */}
                    
                    <TextInput
                        style={styles.bidInput}
                        placeholder={"Category"}
                        textAlign="center"
                    />
                    
                </View>
                <View style={styles.biddingContainer}>
                    {/* <TouchableOpacity 
                        style={styles.buttonContainer} 
                        >
                        <Text style={styles.buttonText}>Bid It !</Text>
                    </TouchableOpacity> */}
                    
                    <TouchableOpacity 
                        style={styles.buttonContainer} 
                        >
                        <Text style={styles.buttonText}>Upload Image</Text>
                    </TouchableOpacity>
                    
                </View>
            </ScrollView>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    main: {
      backgroundColor: "#ffeae8",
      flex: 1,
     
    },
    scroll:{
      alignItems: "center",
      width: "100%",
      flex: 1
    },
    header:{
        fontSize: 30,
        fontWeight: "700",
        padding: 20
    },
    image: {
        alignItems: "center",
    },
    sellerLine:{
        flexDirection: "row",
        marginTop: 10,
        width: "85%",
        alignItems: "center",

    },
    sellerText:{
        fontSize: 20,
        color: "#0b04c9",
        fontWeight: "bold",
    },
    sellerButton:{
        backgroundColor: "#f7f7f7",
        borderWidth: 1,
        marginLeft: 10,
        padding: 5,
        borderRadius: 15,
        alignItems: "center"
    },
    sellerButtonText:{
        fontSize: 20,
        margin: 5,
        fontWeight: "bold",
        color:"#0091b3"
    },
    highestBid:{
        color: "#b30000",
        alignSelf: "flex-start",
        width: "85%",
        marginLeft:"7.5%",
        marginTop:10,
        fontSize: 30,
        fontWeight: "bold",
    },
    bids:{
        color:"#4a4a4a",
        alignSelf: "flex-start",
        width: "85%",
        marginLeft:"7.5%",
        marginTop:8,
        fontSize: 16,
        fontWeight: "bold",
    },
    timeLeft: {
        color:"#0b04c9",
        marginTop:8,
        fontSize: 20,
    },
    buttonContainer:{
        backgroundColor: "#118a27",
        padding: 12,
        width: "50%", 
        borderRadius: 5,
        alignItems: "center"
    },
    buttonText:{
        color: "white",
        fontWeight: 'bold',
        fontSize: 20
    },
    biddingContainer:{
        flexDirection: "row", 
        width: "85%",
        marginTop: 15,
        marginBottom: 15
    },
    bidInput:{
        backgroundColor: "white",
        width: "70%",
        borderColor: 'gray', 
        borderWidth: 1,
        borderRadius: 5
    }
});

export default Upload;