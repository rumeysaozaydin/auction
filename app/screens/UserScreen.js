import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button , Image } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import CommentList from "../components/CommentList";
import { useRequest } from '../hooks/useRequest';
import { Rating } from 'react-native-ratings';
import { FilledButton } from '../components/FilledButton';
import { TextButton } from '../components/TextButton';  
import { Input } from '../components/Input';
import { showMessage, hideMessage } from "react-native-flash-message";
import AuctionList from "../components/AuctionList";
import {shade1, shade2 , shade3, shade4, shade5} from "../config/color"


function UserScreen({navigation, route}) {
    const {
        user
    } = React.useContext(AuthContext);

    if(!user){
        return <View></View>
    }

    const [comments, setComments] = React.useState([]);
    const [auctionList, setAuctionList] = React.useState([]);
    const [favorites, setFavorites] = React.useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [comment, setComment] = React.useState('');
    const [rating, setRating] = React.useState(3);
    const [visibleAuctions, setVisibleAuctions] = React.useState(false)

    const { seller } = route.params;

    const refresh = () => {
        console.log('refresh')
        setRefreshing(true);
        useRequest('GET',`/comments/seller/${seller.id}`, user.token,{setState:setComments});
        setRefreshing(false);
    }

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
            <Text>Welcome to User Screen of {seller.email}</Text>
            
            {!visibleAuctions ? 
            (<View>
                <TextButton
                title={ 'See Auctions' }
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
                    showRating={false}
                    onFinishRating={ratingCompleted}
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
                    title={'See Comments'}
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
      paddingTop: 60,
      flexDirection: "column",
      paddingBottom: 60,
      flex: 1,
      backgroundColor: shade1
    },
    input: {
        marginVertical: 8,
        backgroundColor: shade3
    },
    loginButton: {
        marginVertical: 32,
    },
});

export default UserScreen;