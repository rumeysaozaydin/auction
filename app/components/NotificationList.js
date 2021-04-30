import React from 'react';
import { FlatList, StyleSheet, Text, Dimensions, View } from 'react-native';
import NotificationCard from "../components/NotificationCard";

const NotificationList = ({navigation , notifications, refreshing, onRefresh}) => {
    return(
        <FlatList 
            style={styles.list}
            data={notifications}
            keyExtractor={(data) => data.id.toString()}
            refreshing={refreshing}
            ListEmptyComponent={<View style={styles.empty}></View>}
            onRefresh={onRefresh}
            renderItem={({item}) => {
                return (
                    <NotificationCard 
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
        width: Math.round(Dimensions.get('window').width),
    },
    empty:{
        width: Math.round(Dimensions.get('window').width),
        height: Math.round(Dimensions.get('window').width),
    }
})

export default NotificationList;