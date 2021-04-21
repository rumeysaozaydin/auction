
import axios from 'axios';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CountDown from 'react-native-countdown-component';
import BidList from '../components/BidList';
import { FilledButton } from '../components/FilledButton';
import { Input } from '../components/Input';
import { TextButton } from '../components/TextButton';
import { BASE_URL } from '../config/index';
import { AuthContext } from '../context/AuthContext';
import { useRequest } from '../hooks/useRequest';
import  AuctionDetail  from '../components/AuctionDetail';

const AuctionScreen = ({route,navigation}) => {
    const { auctionId, initIsFavorite, imageUris } = route.params;

    //TODO INIT IS FAV UNDEFINED
    const {
        user,
    } = React.useContext(AuthContext);

    console.log("AUCTION ID ", auctionId)
    const [data, setData] = React.useState({});
    const [seller, setSeller] = React.useState({});
    const [newBid, setNewBid] = React.useState('150')
    const [allBids, setAllBids] = React.useState([])
    
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
        }
    }, [data]);
    
    return (
        <View>
            <TextButton
                title={'Refresh'}
                onPress={refresh}
            />
            <AuctionDetail
                auction={data}
                seller={seller}
                initIsFavorite={initIsFavorite}
                imageUris={imageUris}
            />
            <Text>Recent Bids: </Text>
            <BidList
                navigation={navigation}
                data={allBids}
            />
            
            <Input 
                placeholder={'New Bid'}
                value={newBid}
                onChangeText={setNewBid}
            />
            <FilledButton
                title={'Bid'}
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
                        console.log(e)
                    }
                    }}
            />
            
        </View>
    );
};

const styles = StyleSheet.create({
});
export default AuctionScreen;


