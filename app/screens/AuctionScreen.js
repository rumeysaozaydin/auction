
import axios from 'axios';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, ScrollView, Animated, Dimensions, RefreshControl} from 'react-native';
import CountDown from 'react-native-countdown-component';
import BidList from '../components/BidList';
import { FilledButton } from '../components/FilledButton';
import { Input } from '../components/Input';
import { TextButton } from '../components/TextButton';
import { BASE_URL } from '../config/index';
import { AuthContext } from '../context/AuthContext';
import { useRequest } from '../hooks/useRequest';
import  AuctionDetail  from '../components/AuctionDetail';
import react from 'react';
import { showMessage, hideMessage } from "react-native-flash-message";
import {shade1, shade2, shade3, shade4, shade5, textColor} from "../config/color"
import { TextInput } from 'react-native-gesture-handler';
import BidCard from "../components/BidCard";
import { now } from 'moment';
import { set } from 'react-native-reanimated';

const imageScreenHeight = Math.round(Dimensions.get('window').height);

//import { ScrollView } from 'react-native-gesture-handler';

const AuctionScreen = ({route,navigation}) => {
    const { auctionId, initIsFavorite, imageUris } = route.params;
  //  const imageScreenHeight = Math.round(Dimensions.get('window').height);
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
    const [newBid, setNewBid] = React.useState('')
    const [allBids, setAllBids] = React.useState([])
    const [showBids, setShowBids] = React.useState(false);
    const [delivered, setDelivered] = React.useState(false);
    const [refreshing, setRefreshing] = React.useState(false);

    
    const refresh = () => {
        console.log('inside refresh auction screen')
        setRefreshing(true)
        useRequest('GET',`/auctions/${auctionId}`, user.token, {setState:setData}); 
        useRequest('GET',`/auctions/${auctionId}/bids`, user.token, {setState:setAllBids})
        setRefreshing(false)
    }

    React.useEffect(() => {
        refresh()
    }, []);

    React.useEffect(() => {
        if(data.sellerID){
            useRequest('GET',`/users/${data.sellerID}`, user.token, {setState:setSeller}); 
        }
    }, [data]);

    let Bidcards = allBids.map((bid) => {
        return (
          <BidCard
            key = {(bid.id).toString()}
            data= {bid}
            navigation={navigation}
          />
        );
    
    }).reverse();

    const renderActiveData = () => {
        if(data.status == 'ACTIVE'){
            console.log("still active")
            if((user.id  && data.sellerID && user.id == data.sellerID)){
                return (<View>
                    <FilledButton
                        style={{alignSelf: 'center', height: 50, marginVertical: 10}}
                        title={'Sonlandır'}
                        onPress={ () => {
                            console.log("end auc")
                            useRequest('GET', `/auctions/${auctionId}/end`, user.token)
                            setTimeout(() => {  console.log("settimeout"); refresh() }, 1000);
                        }}
                    />
                </View>)
            }
            else{
                return (
                    <View>
                
                    <View style={{flexDirection: 'row', marginHorizontal: 15, height: 50, marginVertical: 10}}>
                        <Input 
                            placeholder={'Yeni Teklif'}
                            value={newBid}
                            onChangeText={setNewBid}
                            style={{backgroundColor: shade3, flex: 6,padding:0, textAlign:'center', color: textColor}}
                        />
                        
                        <FilledButton
                            style={{flex:2, marginLeft: 10 }}
                            title={'Teklif Ver'}
                            onPress={async () => {
                                    // if(newBid == ''){
                                    //     showMessage({
                                    //         message:'Lütfen bir tutar giriniz',
                                    //         type: "danger",
                                    //     });
                                    // }
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
                    </View>
                    
                    </View>
                    )
            }
        }
    }
    
    return (
        <ScrollView 
            style={{paddingTop:imageScreenHeight * 0.06, flex:1, backgroundColor:shade1}}
            refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={refresh}
                />
            }
        >
           
            <AuctionDetail
                auction={data}
                seller={seller}
                initIsFavorite={initIsFavorite}
                imageUris={imageUris}
                navigation={navigation}
                refresh={refresh}
            />
            
            {renderActiveData()}

            {(user.id  && data.highestBidOwner && data.status == 'EXPIRED_SOLD' && user.id == data.highestBidOwner && !delivered) ?
                    (<View>
                        <FilledButton
                            style={{alignSelf: 'center', height: 50, marginVertical: 10}}
                            title={'Teslim Aldım'}
                            onPress={ () => {
                                useRequest('GET',`/auctions/${auctionId}/approveDelivery`,user.token)
                                showMessage({
                                    message:'Teslimatı başarıyla onayladınız',
                                    type: "success",
                                });
                                setDelivered(true);
                            }}
                        />
                    </View>):
                    (<View></View>)
            }

            <View style={styles.bidContainer}>
                <TextButton 
                    textStyle={{color:textColor, fontSize: 15, textDecorationLine:'underline'}} 
                    
                    title={'Önceki Teklifleri ' + (showBids ? 'Gizle' : 'Göster')}
                    onPress={() => {
                        setShowBids(!showBids)
                    }}
                    /> 
                
                {showBids ? Bidcards
                : <View></View>}
                
            </View>
            
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    text:{
        fontSize: 15,
        color: shade5
    },
    bidContainer:{
        alignItems: 'center',
        marginBottom: imageScreenHeight * 0.1
    }
});
export default AuctionScreen;


