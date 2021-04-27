
import axios from 'axios';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, ScrollView, Animated} from 'react-native';
import CountDown from 'react-native-countdown-component';
import BidList from '../components/BidList';
import { FilledButton } from '../components/FilledButton';
import { Input } from '../components/Input';
import { TextButton } from '../components/TextButton';
import { BASE_URL } from '../config/index';
import { AuthContext } from '../context/AuthContext';
import { useRequest } from '../hooks/useRequest';
import  AuctionDetail  from '../components/AuctionDetail';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import react from 'react';
import NotificationPopup from 'react-native-push-notification-popup';
import {showPopUp, customPopup} from "../components/PopUp";
import { showMessage, hideMessage } from "react-native-flash-message";

//import { ScrollView } from 'react-native-gesture-handler';

const AuctionScreen = ({route,navigation}) => {
    const { auctionId, initIsFavorite, imageUris } = route.params;

    //TODO INIT IS FAV UNDEFINED
    const {
        user,
    } = React.useContext(AuthContext);

    if(!user){
        return <View></View>
    }

    console.log("AUCTION ID ", auctionId)
    const [data, setData] = React.useState({});
    const [seller, setSeller] = React.useState({});
    const [newBid, setNewBid] = React.useState('150')
    const [allBids, setAllBids] = React.useState([])
    const [dur, setDur] = React.useState(0)
    
    const refresh = () => {
        useRequest('GET',`/auctions/${auctionId}`, user.token, {setState:setData}); 
        useRequest('GET',`/auctions/${auctionId}/bids`, user.token, {setState:setAllBids})
    }

    React.useEffect(() => {
        refresh()
    }, []);

    React.useEffect(() => {
        if(data.sellerID){
            useRequest('GET',`/users/id/${data.sellerID}`, user.token, {setState:setSeller}); 
            setDur(parseInt((new Date(data.expirationTime) - Date.now()) / 1000))
        }
    }, [data]);

    const UrgeWithPleasureComponent = () => (
        <CountdownCircleTimer
          isPlaying
          duration={dur > 0 ? dur : 0}
          colors={[
            ['#004777', 0.4],
            ['#F7B801', 0.4],
            ['#A30000', 0.2],
          ]}
        >
          {({remainingTime, animatedColor }) => (
            <Animated.Text style={{ color: animatedColor }}>
              {Math.floor(remainingTime / 3600)}:{Math.floor((remainingTime % 3600) / 60)}:{remainingTime % 60}
            </Animated.Text>
          )}
        </CountdownCircleTimer>
    )

    const renderActiveData = () => {
        if(data.status == 'ACTIVE'){
            if((user.id  && data.sellerID && user.id == data.sellerID)){
                return (<View>
                    <FilledButton
                        title={'End Auction'}
                        onPress={ () => {
                            console.log("end auc")
                        }}
                    />
                </View>)
            }
            else{
                return (<View>
                    <Input 
                        placeholder={'New Bid'}
                        value={newBid}
                        onChangeText={setNewBid}
                    />
                    
                    <FilledButton
                        title={'Bid'}
                        onPress={async () => {
                            
                                axios.post(`${BASE_URL}/auctions/${auctionId}/bid`, {
                                    auctionID: auctionId,
                                    userID: user.id,
                                    price: parseInt(newBid)
                                },  
                                {
                                    headers: {
                                        Authorization: `bearer ${user.token}`
                                    },
                                }).then(() => {
                                    refresh()
                                    showMessage({
                                        message: 'Başarıyla teklif verdiniz',
                                        type: "success",
                                    });
                                }).catch((e) => {
                                    console.log('Error in bid', e)
                                    showMessage({
                                        message:e.response.data.message,
                                        type: "danger",
                                    });
                                })
                        }}
                    />
                </View>)
            }
        }
    }
    
    return (
        <View style={{paddingTop:20}}>
            <TextButton
                title={'Refresh'}
                onPress={refresh}
            />
           
            <AuctionDetail
                auction={data}
                seller={seller}
                initIsFavorite={initIsFavorite}
                imageUris={imageUris}
                navigation={navigation}
            />
            <Text>Recent Bids: </Text>
            
            <BidList
                navigation={navigation}
                data={allBids}
            />
            <Text> Here </Text>

            {dur > 0 ? <UrgeWithPleasureComponent/> : <View></View> } 
            
            {(user.id  && data.highestBidOwner && data.status == 'EXPIRED_SOLD' && user.id == data.highestBidOwner) ?
                (<View>
                    <FilledButton
                        title={'Pay'}
                        onPress={ () => {
                            navigation.navigate("Pay", {auction: data})
                        }}
                    />
                </View>):
                (<View></View>)
            }
            {renderActiveData()}
        </View>
    );
};

const styles = StyleSheet.create({
});
export default AuctionScreen;


