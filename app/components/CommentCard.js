import React from 'react';
import { Text, StyleSheet, View} from 'react-native';
import Star from 'react-native-star-view';


const CommentCard = ({navigation, data}) => {
    return (
        <View style={styles.card} >
            <View style={styles.cardInfo}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={styles.cardTitle}>{data.authorName}</Text>
                    <Star style={styles.starStyle} score={data.rating}/>
                </View>
                
                <Text style={styles.cardDetails}>
                {data.content}
                </Text>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    card: {
        height: 75,
        marginVertical: 10,
        flexDirection: 'row',
        shadowColor: '#999',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    count:{
        fontSize: 12,
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
        fontSize: 15,
        color: '#444',
    },
    starStyle: {
        width: 100,
        height: 20,
    }
})

export default CommentCard;
