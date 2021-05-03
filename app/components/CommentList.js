import React from 'react';
import { FlatList, StyleSheet, Text, Dimensions, View } from 'react-native';
import CommentCard from "../components/CommentCard";

const CommentList = ({navigation , comments, refreshing, onRefresh}) => {

    console.log(comments)
    return(
        <FlatList 
            style={styles.list}
            data={comments}
            keyExtractor={(data) => data.id.toString()}
            refreshing={refreshing}
            ListEmptyComponent={<View style={styles.empty}></View>}
            onRefresh={onRefresh}
            renderItem={({item}) => {
                return (
                    <CommentCard 
                        navigation={navigation} 
                        data={item}
                    />
                )
            }}
        />
    );
}

const styles = StyleSheet.create({
    list: {
        marginTop: 5,
        marginBottom:  Math.round(Dimensions.get('window').height) * 0.1,
        width: Math.round(Dimensions.get('window').width),
        height: Math.round(Dimensions.get('window').height) * 0.4
    },
    empty:{
        width: Math.round(Dimensions.get('window').width),
        height: Math.round(Dimensions.get('window').width),
    }
})

export default CommentList;