
import React from 'react';
import { StyleSheet, Text, View, Dimensions, Animated} from 'react-native';
import {Avatar,Caption, Title,TouchableRipple} from 'react-native-paper';
import { IconButton } from 'react-native-paper';
import { useRequest } from '../hooks/useRequest';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../config/index';
import { SliderBox } from "react-native-image-slider-box";
import {shade1, shade2, shade3, shade4, shade5, textColor} from "../config/color"
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

import { TextButton } from './TextButton'

let date = new Date()
const AuctionDetail = ({auction,seller,initIsFavorite,imageUris,navigation,refresh}) => {
    
    const {
        user,
    } = React.useContext(AuthContext);

    if(!user){
        return <View></View>
    }

    const imageWidth =((Math.round(Dimensions.get('window').width)))
    const [isFavorite, setIsFavorite] = React.useState();
    const [dur, setDur] = React.useState(0)
    const [init, setInit] = React.useState(0)
    
    React.useEffect(() => {
        setInit(parseInt((new Date(auction.expirationTime) - Date.now()) / 1000))
        setDur(parseInt((new Date(auction.expirationTime) - new Date(auction.startingTime)) / 1000))
        console.log(dur)
    }, [auction])
    

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

    const UrgeWithPleasureComponent = () => (
        <CountdownCircleTimer
          onComplete={() => {
            // do your stuff here
            setTimeout(() => {  console.log("settimeout"); refresh() }, 5000);
          }}
          size={70}
          strokeWidth={5}
          trailColor={'rgba(0,0,0,0.2)'}
          isPlaying
          duration={dur > 0 ? dur : 0}
          initialRemainingTime={init > 0 ? init : 0}
          colors={[
            [shade4, 0.9],
            [shade3, 0.11],
            ['#A30000', 0.1],
          ]}
        >
          {({remainingTime, animatedColor }) => (
            (Math.floor(remainingTime/86400) <= 0) ?
            (
                (Math.floor((remainingTime % 86400 )/ 3600) <= 0) ? 
                (
                
                (Math.floor((remainingTime % 3600) / 60) <= 0) ? 
                (<Animated.Text style={{ color: animatedColor }}>
                    {remainingTime % 60} Sn
                </Animated.Text>) :
                (
                    <Animated.Text style={{ color: animatedColor }}>
                    {Math.floor((remainingTime % 3600) / 60)} Dk
                    </Animated.Text>
                )
                ):
                (<Animated.Text style={{ color: animatedColor }}>
                    {Math.floor((remainingTime % 86400 )/ 3600)} Saat
                </Animated.Text>)
            ):
            (
                <Animated.Text style={{ color: animatedColor }}>
                    {Math.floor(remainingTime / 86400)} Gün
                </Animated.Text>
            )
            
          )}
        </CountdownCircleTimer>
    )

    return (
        <View>
            <View>
                <SliderBox
                    style={{
                        width: imageWidth ,
                        height: imageWidth,
                    }}
                    circleLoop={true}
                    images={imageUris.length == 0 ? ([require('../../assets/no_image.png')]) : imageUris}
                    //onCurrentImagePressed={() => {navigation.navigate("Auction" , { auctionId: data.id, initIsFavorite: initIsFavorite, auctionIds:auctionIds});}}
                    // currentImageEmitter={index => console.warn(`current pos is: ${index}`)}
                />
                <IconButton 
                style={styles.favorite}
                color={shade5}
                size={30}
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
                <Text style={styles.title}> {auction.title}</Text>
                
                <View style={styles.price}>
                    <Text style={styles.text}> <Text style={{fontSize:24, fontWeight:'normal'}}>{auction.initialPrice}₺ /</Text> {auction.highestBid}₺</Text>
                </View>

                <View style={styles.remaining}>
                {init > 0 ? <UrgeWithPleasureComponent/> : <View></View> } 
                </View>
            </View>
            
            <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems: 'center', marginVertical: 10, marginHorizontal: 10}}> 
                {seller.imageID == null ? 
                    <Avatar.Image 
                    source={require('../../assets/no_image.png')}
                    size={50}
                    /> :   
                    <Avatar.Image 
                                source={{
                                    uri:`${BASE_URL}/users/${seller.id}/image?date=` + date,
                                }}
                                size={50}
                    /> 
                }
                <TextButton
                    style={{marginLeft:10}}
                    textStyle={{fontWeight:'bold', color: shade5,fontSize: 22}}
                    title={seller.firstname == null ? '' : (seller.firstname + ' ' + (seller.lastname ==null ? '' : ((seller.lastname).charAt(0).toUpperCase() + '.')))}
                    onPress={() => {navigation.navigate("User", {seller: seller})}}
                />
            </View>
            
            <View style={styles.card}>

                <Text style={{fontSize:15, color:textColor, lineHeight: 20}}>{auction.description}</Text>
                
            </View>

        
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        //flexDirection: 'row',
        //alignItems: 'stretch',
        //justifyContent: 'flex-start'
    },
    card: {
        
        // height: 40,
        marginHorizontal: 15,
        // justifyContent: 'center',
        // alignItems: 'center',
        // flexDirection: 'row',
        // backgroundColor: shade3,
        // borderRadius: 10
    },
    title: 
    {
        position: 'absolute',
        bottom: 10,
        left:15,
        fontSize: 24,
        color: shade1
    },
    price: 
    {
        position: 'absolute',
        right:15,
        bottom: 10,
        fontSize: 20,
        color: shade1
    },
    text:{
        fontSize: 30,
        color: shade1,
        fontWeight: 'bold'
    },
    favorite: 
    {
        position: 'absolute',
        right: 10,
        top:10,
        backgroundColor: shade1 /* '#FF6347' */,
        borderRadius: 50,
        width: 40,
        height: 40,
    },
    remaining: 
    {
        position: 'absolute',
        top: 10,
        left: 10,
        fontSize: 15,
        color: shade1
    }
});

export default AuctionDetail;


