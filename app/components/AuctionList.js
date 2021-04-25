import React from 'react';
import { FlatList, StyleSheet, Text, Dimensions, View } from 'react-native';
import AuctionCard from "../components/AuctionCard";

const AuctionList = ({navigation , auctions, favoriteIds, addFav, deleteFav, refreshing, onRefresh}) => {

    return(
        <FlatList 
            style={styles.list}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            key={2}
            // horizontal={false}
            data={auctions}
            keyExtractor={(auction) => auction.id.toString()}
            refreshing={refreshing}
            onRefresh={onRefresh}
            ListEmptyComponent={<View style={styles.empty}></View>}
            renderItem={({item}) => {
                return (
                    <AuctionCard 
                        navigation={navigation} 
                        data={item}
                        initIsFavorite={favoriteIds.includes(item.id)}
                        addFav={addFav}
                        deleteFav={deleteFav}
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
export default AuctionList;