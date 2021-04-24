import axios from 'axios';
import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity} from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { IconButton } from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';
import {BASE_URL} from '../config/index';
import { useRequest } from '../hooks/useRequest';
import { SliderBox } from "react-native-image-slider-box";

const AuctionCard = ({navigation, data, initIsFavorite, addFav, deleteFav}) => {
    const {
        user,
    } = React.useContext(AuthContext);

    const [isFavorite, setIsFavorite] = React.useState();
    const [imageIds, setImageIds] = React.useState([]);

    React.useEffect(() => {
        setIsFavorite(initIsFavorite)
    }, [initIsFavorite]);

    React.useEffect(() => {
        useRequest('GET', `/auctions/${data.id}/images`, user.token, {setState:setImageIds})
    },[]);

    return (
        <View style={styles.container} >

            
            
            <TouchableOpacity onPress={() => { console.log("inside on pree"); navigation.navigate("Auction" , { auctionId: data.id, initIsFavorite: initIsFavorite, imageUris: imageIds.map((imageId) => `${BASE_URL}/images/${imageId}?date=` + new Date())});}}>
                    <SliderBox 
                        style={{
                            width: Math.round(Dimensions.get('window').width) - 80,
                            height: Math.round(Dimensions.get('window').width) - 80,
                            borderRadius: 20,
                        }}
                        images={imageIds.map((imageId) => `${BASE_URL}/images/${imageId}?date=` + new Date())}
                        disableOnPress = {false}
                        //onCurrentImagePressed={() => {navigation.navigate("Auction" , { auctionId: data.id, initIsFavorite: initIsFavorite, imageUris: imageIds.map((imageId) => `${BASE_URL}/images/${imageId}?date=` + new Date())});}}
                    />

                    <Image 
                        style={{
                            width: Math.round(Dimensions.get('window').width) -80,
                            height: Math.round(Dimensions.get('window').width) -80,
                            borderRadius: 20,
                            position: 'absolute'

                        }}
                        source={require('../../assets/shade.png')}
                        
                    />                
            </TouchableOpacity>
            
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.price}>£{data.highestBid}</Text>                        
            <IconButton 
                style={styles.favorite} 
                color='#CF2020'
                size={36}
                icon={ isFavorite ? 'heart' : 'heart-outline' } 
                title="BidIt" 
                onPress={() => { 
                    setIsFavorite(!isFavorite)
                    if(isFavorite){
                        deleteFav(data)
                    }
                    else{
                        addFav(data)
                    }
                }}
            />
            <Text style={styles.remainingTime}> 1 saat </Text>
        </View>
        // <View style={styles.container}>
        //      <TouchableOpacity onPress={() => { console.log("inside on pree"); navigation.navigate("Auction" , { auctionId: data.id, initIsFavorite: initIsFavorite, imageUris: imageIds.map((imageId) => `${BASE_URL}/images/${imageId}?date=` + new Date())});}}>
        //             <Image 
        //                 style={{
        //                     position: 'absolute',
        //                     width: Math.round(Dimensions.get('window').width) -50,
        //                     height: Math.round(Dimensions.get('window').width) -50,
        //                     borderRadius: 20,
        //                 }}
        //                 source={require('../../assets/shade.png')}
                        
        //             />
        //     </TouchableOpacity>
        // </View>
    );
}

const styles = StyleSheet.create({
    container:
    {
        width: Math.round(Dimensions.get('window').width) -80,
        height: Math.round(Dimensions.get('window').width) -80,
        marginHorizontal: 25,
        marginBottom: 30,
        borderRadius: 20,
    },
    title: 
    {
        position: 'absolute',
        bottom: 10,
        left:15,
        fontSize: 30,
        color: '#EAEAEA'
    },
    price: 
    {
        position: 'absolute',
        right:15,
        bottom: 10,
        fontSize: 40,
        color: '#EAEAEA'

    },
    favorite: 
    {
        position: 'absolute',
        right: 0,
        top: 0
    },
    remainingTime: 
    {
        position: 'absolute',
        top: 10,
        left: 10,
        fontSize: 20,
        color: '#EAEAEA'
    }
});


export default AuctionCard;