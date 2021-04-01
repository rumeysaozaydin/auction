// import React, { useState, useReducer } from 'react';
// import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import CountDown from 'react-native-countdown-component';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

// function AuctionPage({ route }) {

//     const [newBid, setNewBid] = useState("0");

//     const [properties, setProperties] = useState({
//         bids: route.params.bids,
//         lastBid: route.params.lastBid
//     });

//     function addNewBid(newBid){
//         let newBidList = properties.bids.concat([properties.lastBid.substring(1)]);
//         let newLastBid = "$" + newBid;
//         let result = {
//             bids: newBidList,
//             lastBid: newLastBid
//         }
//         setProperties(result);
//     }

//     let bidViews = properties.bids.map((bid, index) => {
//         return (
//             <Text
//                 key={index}
//                 style={styles.bids}>
//                 ${bid}
//             </Text>
//         );
//     }).reverse();

//     return (
//         <KeyboardAwareScrollView  style={styles.main}>
//             <ScrollView contentContainerStyle={styles.scroll} >
//                 <Text style={styles.header}>{route.params.name}</Text>
//                 <Image
//                     style={styles.image}
//                     source={{
//                         width:"85%",
//                         height: Dimensions.get("screen").height * 0.2,
//                         uri: route.params.uri
//                     }}
//                 />
//                 <View style={styles.sellerLine}>
//                     <Text style={styles.sellerText}>Seller: </Text>
//                     <TouchableOpacity style={styles.sellerButton}>
//                         <Text style={styles.sellerButtonText}>Jane Doe</Text>
//                     </TouchableOpacity>
//                 </View>
//                 <Text style={styles.highestBid}>Highest Bid:  {properties.lastBid}</Text>
//                 <Text style={styles.bids}>Recent Bids:</Text>
//                 {bidViews}
//                 <Text style={styles.bids}>Entry Price: {route.params.entryPrice}</Text>
//                 <View style={styles.biddingContainer}>
//                     <TouchableOpacity 
//                         style={styles.buttonContainer}
//                         onPress={() => {
//                             route.params.addNewBid(route.params.name, newBid);
//                             addNewBid(newBid);
//                         }}
//                         >
//                         <Text style={styles.buttonText}>Bid It !</Text>
//                     </TouchableOpacity>
                    
//                     <TextInput
//                         style={styles.bidInput}
//                         placeholder={"Enter Your Bid"}
//                         textAlign="center"
//                         onChangeText={text => setNewBid(text)}
//                     />
//                 </View>
//                 <Text style={styles.timeLeft}>Time Left:</Text>
//                 <CountDown
//                     until={630000}
//                     onFinish={() => alert('finished')}
//                     size={20}
//                 />
//             </ScrollView>
//         </KeyboardAwareScrollView>
//     );
// }

// const styles = StyleSheet.create({
//     main: {
//       backgroundColor: "#ffeae8",
//       flex: 1,
//     },
//     scroll:{
//       alignItems: "center",
//       width: "100%",
//       flex: 1
//     },
//     header:{
//         fontSize: 30,
//         fontWeight: "700",
//         padding: 20
//     },
//     image: {
//         alignItems: "center",
//     },
//     sellerLine:{
//         flexDirection: "row",
//         marginTop: 10,
//         width: "85%",
//         alignItems: "center",

//     },
//     sellerText:{
//         fontSize: 20,
//         color: "#0b04c9",
//         fontWeight: "bold",
//     },
//     sellerButton:{
//         backgroundColor: "#f7f7f7",
//         borderWidth: 1,
//         marginLeft: 10,
//         padding: 5,
//         borderRadius: 15,
//         alignItems: "center"
//     },
//     sellerButtonText:{
//         fontSize: 20,
//         margin: 5,
//         fontWeight: "bold",
//         color:"#0091b3"
//     },
//     highestBid:{
//         color: "#b30000",
//         alignSelf: "flex-start",
//         width: "85%",
//         marginLeft:"7.5%",
//         marginTop:10,
//         fontSize: 30,
//         fontWeight: "bold",
//     },
//     bids:{
//         color:"#4a4a4a",
//         alignSelf: "flex-start",
//         width: "85%",
//         marginLeft:"7.5%",
//         marginTop:8,
//         fontSize: 16,
//         fontWeight: "bold",
//     },
//     timeLeft: {
//         color:"#0b04c9",
//         marginTop:8,
//         fontSize: 20,
//     },
//     buttonContainer:{
//         backgroundColor: "#118a27",
//         padding: 12,
//         width: "30%", 
//         borderRadius: 5,
//         alignItems: "center"
//     },
//     buttonText:{
//         color: "white",
//         fontWeight: 'bold',
//         fontSize: 20
//     },
//     biddingContainer:{
//         flexDirection: "row", 
//         width: "85%",
//         marginTop: 15,
//         marginBottom: 15
//     },
//     bidInput:{
//         backgroundColor: "white",
//         width: "70%",
//         borderColor: 'gray', 
//         borderWidth: 1,
//         borderRadius: 5
//     }
// });

// export default AuctionPage;

import React from 'react';
//import { StyleSheet, Text, View } from 'react-native';
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CountDown from 'react-native-countdown-component';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

const AuctionScreen = () => {

    const data = {
        uri: "https://moderndiplomacy.eu/wp-content/uploads/2019/01/rolex-oyster.jpg",
        name:"Rolex Watch",
        entryPrice:"$690",
        bids: [720, 723, 760, 815],
        lastBid:"$845",
        auctionDeadline:"12.01.2021"}
    return (
        <KeyboardAwareScrollView  style={styles.main}>
            <ScrollView contentContainerStyle={styles.scroll} >
                <Text style={styles.header}>{data.name}</Text>
                <Image
                    style={styles.image}
                    source={{
                        width:"85%",
                        height: Dimensions.get("screen").height * 0.2,
                        uri: data.uri
                    }}
                />
                <View style={styles.sellerLine}>
                    <Text style={styles.sellerText}>Seller: </Text>
                    <TouchableOpacity style={styles.sellerButton}>
                        <Text style={styles.sellerButtonText}>Jane Doe</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.highestBid}>Highest Bid:  {data.lastBid}</Text>
                <Text style={styles.bids}>Entry Price: {data.entryPrice}</Text>
                <View style={styles.biddingContainer}>
                    {/* <TouchableOpacity 
                        style={styles.buttonContainer}
                        onPress={() => {
                            route.params.addNewBid(route.params.name, newBid);
                            addNewBid(newBid);
                        }}
                        >
                        <Text style={styles.buttonText}>Bid It !</Text>
                    </TouchableOpacity> */}
                    
                    {/* <TextInput
                        style={styles.bidInput}
                        placeholder={"Enter Your Bid"}
                        textAlign="center"
                        onChangeText={text => setNewBid(text)}
                    /> */}
                </View>
                <Text style={styles.timeLeft}>Time Left:</Text>
                <CountDown
                    until={630000}
                    onFinish={() => alert('finished')}
                    size={20}
                />
            </ScrollView>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    main: {
      backgroundColor: "#ffffff",
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
        width: "30%", 
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
export default AuctionScreen;


