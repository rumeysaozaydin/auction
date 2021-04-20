import axios from 'axios';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IconButton } from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';
import {BASE_URL} from '../config/index';
import { useRequest } from '../hooks/useRequest';


const AuctionCard = ({navigation, data, initIsFavorite, addFav, deleteFav}) => {
    const {
        user,
    } = React.useContext(AuthContext);

    const [isFavorite, setIsFavorite] = React.useState();
    const [images, setImages] = React.useState([]);

    React.useEffect(() => {
        setIsFavorite(initIsFavorite)
    }, [initIsFavorite]);

    React.useEffect(() => {
        useRequest('GET', `/auctions/${data.id}/images`, user.token, {setState:setImages})
    },[]);


    return (
        <View style={styles.card} >
                <View style={styles.cardImgWrapper}>
                    <TouchableOpacity onPress={() => {navigation.navigate("Auction" , { auctionId: data.id, initIsFavorite: initIsFavorite});}}>
                        <Image
                        source={{uri:`${BASE_URL}/images/${images.length > 0 ? images[0] : 1}`}}
                        resizeMode="cover"
                        style={styles.cardImg}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>{data.title}</Text>
                    <Text style={styles.cardDetails}>
                    Current Price : {data.highestBid}
                    </Text>
                    <View style={styles.buttonHolder}>
                        
                        <IconButton style={styles.favButton} icon={ isFavorite ? 'heart' : 'heart-outline' } title="BidIt" 
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
                    </View>
                </View>
            </View>
    
    );
}

const styles = StyleSheet.create({
    card: {
        height: 100,
        marginVertical: 10,
        flexDirection: 'row',
        shadowColor: '#999',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    cardImgWrapper: {
        flex: 1,
    },
    cardImg: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 8,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
    },
    cardInfo: {
        flex: 2,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: '#fff',
    },
    cardTitle: {
        fontWeight: 'bold',
    },
    cardDetails: {
        fontSize: 12,
        color: '#444',
    },
    favButton: {
        padding: 5,
        marginTop: 5,
        marginBottom: 5,
        alignSelf: 'flex-start'
    },
    buttonHolder: {
        flexDirection: 'row'
    }
});


export default AuctionCard;