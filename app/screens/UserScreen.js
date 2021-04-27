import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button , Image } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import CommentList from "../components/CommentList";
import { useRequest } from '../hooks/useRequest';
import { Rating } from 'react-native-ratings';
import { FilledButton } from '../components/FilledButton';
import { Input } from '../components/Input';
import { showMessage, hideMessage } from "react-native-flash-message";

function UserScreen({navigation, route}) {
    const {
        user
    } = React.useContext(AuthContext);

    if(!user){
        return <View></View>
    }

    const [comments, setComments] = React.useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [comment, setComment] = React.useState('');
    const [rating, setRating] = React.useState(0);

    const { seller } = route.params;

    const refresh = () => {
        console.log('refresh')
        setRefreshing(true);
        useRequest('GET',`/comments/seller/${seller.id}`, user.token,{setState:setComments});
        setRefreshing(false);
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
        setRating(0);
    }

    return (
        <View style={styles.container}>
            <Text>Welcome to User Screen of {seller.email}</Text>
            <Input
                style={styles.input}
                placeholder={'Comment'}
                value={comment}
                onChangeText={setComment}
            />
            <Rating
                showRating={false}
                onFinishRating={ratingCompleted}
                startingValue={3}
                style={{ paddingVertical: 10 }}
            />
            <FilledButton
                title={'Upload Comment'}
                style={styles.loginButton}
                onPress={async () => {
                    const newComment =
                    {
                        "authorID": user.id,
                        "authorName": user.username,
                        "content": comment,
                        "postingTime": "2021-04-27T20:14:59.328Z",
                        "rating": rating,
                        "sellerID": seller.id
                    }
                    await useRequest('POST', `/comments`, user.token, {body:newComment} );
                    reset()
                }}
            />
            <CommentList 
                refreshing={refreshing}
                onRefresh={refresh}
                navigation={navigation} 
                data={comments}
                seller={seller}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      marginTop: 50,
      flexDirection: "column",
      marginBottom: 20
    },
    input: {
        marginVertical: 8,
    },
    loginButton: {
        marginVertical: 32,
    },
});

export default UserScreen;