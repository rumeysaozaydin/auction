
import React from 'react';
//import { StyleSheet, Text, View } from 'react-native';
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CountDown from 'react-native-countdown-component';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useGet} from '../hooks/useGet';
import {FilledButton} from '../components/FilledButton';
import {AuthContext} from '../context/AuthContext';
import {Input} from '../components/Input';
import axios from 'axios';
import {BASE_URL} from '../config/index';
import { TextButton } from '../components/TextButton';

const AuctionScreen = ({route,navigation}) => {
    const { auctionId } = route.params;
    
    const {
        user,
    } = React.useContext(AuthContext);

    const [data, setData] = React.useState({});
    const [seller, setSeller] = React.useState({});
    //const data = useGet(`/auctions/${productId}`);
    
    const refresh = () => {
        useGet(`/auctions/${auctionId}`, user.token, setData);
        
    }

    React.useEffect(() => {
        refresh()
    }, []);

    React.useEffect(() => {
        if(data.sellerID){
            console.log("seller id " , data.sellerID)
            useGet(`/users/id/${data.sellerID}`, user.token, setSeller); 
        }
    }, [data]);
    
    const [newBid, setNewBid] = React.useState('60')

    return (
        <KeyboardAwareScrollView  style={styles.main}>
            <TextButton
                title={'Refresh' }
                onPress={refresh}
            />
            <ScrollView contentContainerStyle={styles.scroll} >
                <Text style={styles.header}>{data.title}</Text>
                {/* <Image
                    style={styles.image}
                    source={{
                        width:"85%",
                        height: Dimensions.get("screen").height * 0.2,
                        uri: data.uri
                    }}
                /> */}
                <View style={styles.sellerLine}>
                    <Text style={styles.sellerText}>Seller: </Text>
                    <TouchableOpacity style={styles.sellerButton}>
                        <Text style={styles.sellerButtonText}>{seller.email}</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.highestBid}>Highest Bid:  {data.highestBid}</Text>
                <Text style={styles.bids}>Entry Price: {data.initialPrice}</Text>

                <Input
                    style={styles.input}
                    placeholder={'New Bid'}
                    value={newBid}
                    onChangeText={setNewBid}
                />
                <FilledButton
                title={'Bid'}
                style={styles.loginButton}
                onPress={async () => {
                    try {
                        await axios.post(`${BASE_URL}/auctions/${auctionId}/bid`, {
                            auctionID: auctionId,
                            userID: user.id,
                            price: parseInt(newBid)
                        }).then(() => {
                            refresh()
                        })

                    } catch (e) {
                        console.log('fdnjfkkmkfldm')
                        console.log(e)
                    }
                  }}
                />
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
    input: {
        marginVertical: 8,
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
    },
    loginButton: {
        marginVertical: 32,
    },
});
export default AuctionScreen;


