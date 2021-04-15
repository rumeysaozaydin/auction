import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import {useGet} from '../hooks/useGet';

const AuctionCard = ({navigation, uri, title, highestBid, id}) => {
  
    return (
        <View style={styles.card}>
            <View style={styles.cardImgWrapper}>
                <Image
                source={{uri}}
                resizeMode="cover"
                style={styles.cardImg}
                />
            </View>
            <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardDetails}>
                Current Price : {highestBid}
                </Text>
                <IconButton style={styles.cardButton} icon={{ uri: 'https://cdn.onlinewebfonts.com/svg/img_135596.png' }} title="BidIt" 
                onPress={() => {navigation.navigate("Auction" , { productId: id});}}
                />
            </View>
            <View style = {styles.cardButtonWrapper}>
            </View>
        </View>
    
    );
}

const styles = StyleSheet.create({
    cardsWrapper: {
        marginTop: 20,
        width: '90%',
        alignSelf: 'center',
    },
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
    
    cardButton: {
        padding: 5,
        marginTop: 5,
        marginBottom: 5,
        alignSelf: 'flex-end'
    }
});


export default AuctionCard;