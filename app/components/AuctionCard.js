import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';


const AuctionCard = ({navigation, data, initIsFavorite, addFav, deleteFav}) => {
    const {
        user,
    } = React.useContext(AuthContext);

    const [isFavorite, setIsFavorite] = React.useState();
    React.useEffect(() => {
        setIsFavorite(initIsFavorite)
      }, [initIsFavorite]);

    return (
        <View style={styles.card}>
            {/* <View style={styles.cardImgWrapper}>
                <Image
                source={{uri}}
                resizeMode="cover"
                style={styles.cardImg}
                />
            </View> */}
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
                            // useRequest('DELETE',`/favorites/${user.id}/${data.id}`, user.token)
                            deleteFav(data)
                        }
                        else{
                            // let body = {
                            //     userID: user.id,
                            //     auctionID: data.id
                            // }
                            // useRequest('POST',`/favorites`,user.token, {body:body})
                            addFav(data)
                        }
                    }}
                    />
                    <IconButton style={styles.cardButton} icon={{ uri: 'https://cdn.onlinewebfonts.com/svg/img_135596.png' }} title="BidIt" 
                    onPress={() => {navigation.navigate("Auction" , { auctionId: data.id});}}
                    />
                </View>
                
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