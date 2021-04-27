import axios from 'axios';
import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity} from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { IconButton } from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';
import {BASE_URL} from '../config/index';
import { useRequest } from '../hooks/useRequest';
import { SliderBox } from "react-native-image-slider-box";


const marginSize = 20
const imageWidth =((Math.round(Dimensions.get('window').width) - marginSize) / 2 ) - marginSize

const AuctionCard = ({navigation, data, initIsFavorite, addFav, deleteFav}) => {
    const {
        user,
    } = React.useContext(AuthContext);

    if(!user){
        return <View></View>
    }

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
            
            {/* <TouchableOpacity 

                onPress={() => {navigation.navigate("Auction" , { auctionId: data.id, initIsFavorite: initIsFavorite, imageUris: imageIds.map((imageId) => `${BASE_URL}/images/${imageId}?date=` + new Date())});}}> */}
                    <SliderBox 
                        style={{
                            width: imageWidth,
                            height: imageWidth,
                            borderRadius: 10,
                        }}
                        circleLoop={true}
                        images={imageIds.length == 0 ? ([require('../../assets/noimage.jpg')]) : imageIds.map((imageId) => `${BASE_URL}/images/${imageId}?date=` + new Date())}
                        
                        onCurrentImagePressed={() => {navigation.navigate("Auction" , { auctionId: data.id, initIsFavorite: initIsFavorite, imageUris: imageIds.map((imageId) => `${BASE_URL}/images/${imageId}?date=` + new Date())});}}
                    />

                    {/* <Image 
                        style={{
                            width: imageWidth,
                            height: imageWidth,
                            borderRadius: 10,
                            position: 'absolute'

                        }}
                        source={require('../../assets/shade.png')}
                        
                    />                 */}
            {/* </TouchableOpacity> */}
            
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.price}>£{data.highestBid}</Text>                        
            <IconButton 
                style={styles.favorite} 
                color='#CF2020'
                size={30}
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
        
    );
}

const styles = StyleSheet.create({
    container:
    {
        width: imageWidth,
        height: imageWidth,
        marginLeft: marginSize,
        marginBottom: marginSize,
        borderRadius: 10,
    },
    title: 
    {
        position: 'absolute',
        bottom: 10,
        left:15,
        fontSize: 20,
        color: '#FFFFFF'
    },
    price: 
    {
        position: 'absolute',
        right:15,
        bottom: 10,
        fontSize: 20,
        color: '#FFFFFF'

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
        fontSize: 15,
        color: '#FFFFFF'
    }
});


export default AuctionCard;