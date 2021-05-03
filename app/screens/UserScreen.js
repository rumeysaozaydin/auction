import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button , Image, Dimensions } from 'react-native';
import {Avatar,Caption, Title,TouchableRipple} from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';
import CommentList from "../components/CommentList";
import { useRequest } from '../hooks/useRequest';
import { Rating } from 'react-native-ratings';
import { FilledButton } from '../components/FilledButton';
import { TextButton } from '../components/TextButton';  
import { Input } from '../components/Input';
import { showMessage, hideMessage } from "react-native-flash-message";
import AuctionList from "../components/AuctionList";
import {shade1, shade2 , shade3, shade4, shade5, shadeTrans, textColor} from "../config/color"
import {BASE_URL} from '../config/index';
import Star from 'react-native-star-view';

let date = new Date()

function UserScreen({navigation, route}) {
    const {
        user
    } = React.useContext(AuthContext);

    if(!user){
        return <View></View>
    }

    const { seller } = route.params;

    const [comments, setComments] = React.useState([]);
    const [auctionList, setAuctionList] = React.useState([]);
    const [favorites, setFavorites] = React.useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [comment, setComment] = React.useState('');
    const [rating, setRating] = React.useState(3);
    const [ratingSum, setRatingSum] = React.useState(seller.ratingSum);
    const [ratingCount, setRatingCount] = React.useState(seller.ratingCount);
    const [image, setImage] = React.useState(null);
    const [visibleAuctions, setVisibleAuctions] = React.useState(false)


    const refresh = () => {
        console.log('refresh')
        setRefreshing(true);
        useRequest('GET',`/comments/seller/${seller.id}`, user.token,{setState:setComments});
        setImage(`${BASE_URL}/users/${seller.id}/image`)
        setRefreshing(false);
    }
    console.log('IMAGE', image)

    const showAuctions = () => {
        console.log('refresh')
        setRefreshing(true);
        useRequest('GET',`/auctions/seller/${seller.id}`, user.token,{setState:setAuctionList});
        useRequest('GET',`/favorites/${user.id}`, user.token,{setState:setFavorites});
        setRefreshing(false);
    }

    const addFav = (auction) => {
        const body = {
            userID: user.id,
            auctionID: auction.id
        }
        useRequest('POST',`/favorites`,user.token, {body:body})
        const newFavorites = [auction, ...favorites]
        setFavorites(newFavorites)
    }
    
    const deleteFav = (auction) => {
        useRequest('DELETE',`/favorites/${user.id}/${auction.id}`, user.token)
        const newFavorites = favorites.filter((item) => item.id != auction.id)
        setFavorites(newFavorites)
    }

    React.useEffect(() => {
        refresh()
    }, []);

    const ratingCompleted = (rating) => {
        console.log("Rating is: " + rating)
        setRating(rating)
    }

    const reset = () => {
        setComment("");
        setRating(3);
    }

    return (
        <View style={styles.container}>
            
            <View style={styles.userInfoSection}>

                <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems: 'center', marginVertical: 10, marginHorizontal: 10}}> 
                    {seller.imageID == null ? 
                        <Avatar.Image 
                        source={require('../../assets/no_image.png')}
                        size={100}
                        /> :   
                        <Avatar.Image 
                                    source={{
                                        uri:`${BASE_URL}/users/${seller.id}/image?date=` + date,
                                    }}
                                    size={100}
                        /> 
                    }
                        
                    <View> 
                        <Text style={{marginLeft: 10, fontWeight:'bold', color: shade5,fontSize: 22}}>
                            {seller.firstname == null ? '' : seller.firstname + ' '}
                            
                            {seller.lastname == null ? '' : seller.lastname}
                        </Text>

                        <Star style={styles.starStyle} score={ratingSum / ratingCount}/>
                        <Text style={{marginLeft: 12, color: shade5}}>{ratingCount} Yorum</Text>

                    </View>
                    
                </View>
                
            </View>
            
            {!visibleAuctions ? 
            (<View>
                <TextButton
                title={ 'Ilanları Gör' }
                textStyle={{fontSize:16, color: textColor}}
                onPress={() => {
                    setVisibleAuctions(true);
                    showAuctions();
                }}
                />
                <Input
                    style={styles.input}
                    placeholder={'Yorum Yaz'}
                    value={comment}
                    onChangeText={setComment}
                />
                <Rating
                    type='custom'
                    showRating={false}
                    selectedColor={shade5}
                    onFinishRating={ratingCompleted}
                    unSelectedColor={shade4}
                    ratingColor={shade5}
                    ratingBackgroundColor={shade3}
                    tintColor={shade1}
                    startingValue={3}
                    style={{ paddingVertical: 10}}
                />
                <FilledButton
                    title={'Yorum Yap'}
                    style={styles.loginButton}
                    onPress={async () => {
                        const newComment =
                        {
                            "authorID": user.id,
                            "authorName": user.username,
                            "content": comment,
                            "rating": rating,
                            "sellerID": seller.id
                        }
                        useRequest('POST', `/comments`, user.token, {body:newComment, callback: (data) => {
                            showMessage({
                                message: 'Başarıyla yorum yapıldı',
                                type: "success",
                            });
                            const newComments = [ data,...comments]
                            setComments(newComments)
                            setRatingCount(seller.ratingCount + 1)
                            setRatingSum(seller.ratingSum + rating)
                            reset()
                        }     
                        });
                        
                    }}
                />
                <CommentList 
                    refreshing={refreshing}
                    onRefresh={refresh}
                    navigation={navigation} 
                    comments={comments}
                    seller={seller}
                />
            </View>
            ):
            (<View>
                <TextButton
                    title={'Yorumları Gör'}
                    style={{paddingBottom:10}}
                    textStyle={{fontSize:16, color: textColor}}
                    onPress={() => {
                        setVisibleAuctions(false);
                    }}
                />
                <AuctionList 
                    refreshing={refreshing}
                    onRefresh={refresh}
                    navigation={navigation} 
                    auctions={auctionList}
                    favoriteIds={favorites.map(favorites=>favorites.id)}
                    addFav={(auction) => addFav(auction)}
                    deleteFav={(auction) => deleteFav(auction)}
                />
            </View>
            
            )
            }
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 40,
      flexDirection: "column",
      paddingBottom: 90,
      flex: 1,
      backgroundColor: shade1
    },
    starStyle: {
        width: 100,
        height: 20,
        marginLeft: 10,
    },
    input: {
        marginVertical: 8,
        marginHorizontal: 20,
        backgroundColor: shadeTrans
    },
    loginButton: {
        marginHorizontal: 100
    },
    userInfoSection: {
        alignItems: 'center',
        paddingHorizontal: 30,
        marginBottom: 10,
    },
});

export default UserScreen;