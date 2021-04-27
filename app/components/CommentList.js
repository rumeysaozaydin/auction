import React from 'react';
import { FlatList, StyleSheet, Text, Dimensions, View } from 'react-native';
import CommentCard from "../components/CommentCard";

const CommentList = ({navigation , data, refreshing, onRefresh}) => {

    return(
        <FlatList 
            data={data}
            keyExtractor={(data) => data.id.toString()}
            refreshing={refreshing}
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
export default CommentList;