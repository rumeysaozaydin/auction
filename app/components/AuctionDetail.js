
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useRequest } from '../hooks/useRequest';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../config/index';
import { SliderBox } from "react-native-image-slider-box";

const AuctionDetail = ({auction,seller,initIsFavorite,imageUris}) => {

    const {
        user,
    } = React.useContext(AuthContext);

    const [isFavorite, setIsFavorite] = React.useState();

    React.useEffect(() => {
        setIsFavorite(initIsFavorite)
    }, [initIsFavorite]);

    const addFav = (auction) => {
        const body = {
            userID: user.id,
            auctionID: auction.id
        }
        useRequest('POST',`/favorites`,user.token, {body:body})
    }
    
    const deleteFav = (auction) => {
        useRequest('DELETE',`/favorites/${user.id}/${auction.id}`, user.token)
    }

    return (
        <View>
            <View>
                <IconButton 
                    icon={ isFavorite ? 'heart' : 'heart-outline' }  
                    onPress={() => { 
                        setIsFavorite(!isFavorite)
                        if(isFavorite){
                            deleteFav(auction)
                        }
                        else{
                            addFav(auction)
                        }
                    }}
                />
            </View>
            <View style={styles.container}>
                
                <View style={{flex:1}}>
                    <SliderBox
                        style={{
                            width: 200 ,
                            height: 200,
                        }}
                        images={imageUris}
                        //onCurrentImagePressed={() => {navigation.navigate("Auction" , { auctionId: data.id, initIsFavorite: initIsFavorite, auctionIds:auctionIds});}}
                        // currentImageEmitter={index => console.warn(`current pos is: ${index}`)}
                    />
                </View>
                <View style={{flex:1}}>
                    <Text>Title: {auction.title}</Text>
                    <Text>Seller: {seller.email}</Text>
                    <Text>Highest Bid: {auction.highestBid}</Text>
                    <Text>Entry Price: {auction.initialPrice}</Text> 
                    <Text>Time Left: {(new Date(auction.expirationTime) - Date.now()) / 1000} saniye </Text>
                </View>
                
                
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'flex-start'
    },
});

export default AuctionDetail;


