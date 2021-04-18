import React from 'react';
import { StyleSheet, Text, View, Button, Image, FlatList } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import AuctionCard from "../components/AuctionCard";


const AuctionList = ({navigation , auctions, favoriteIds}) => {
    
    return(
        <FlatList 
            // showsVerticalScrollIndicator={false}
            // horizontal={false}
            data={auctions}
            keyExtractor={(auction) => auction.id.toString()}
            renderItem={({item}) => {
                return (
                    <AuctionCard 
                        navigation={navigation} 
                        data={item}
                        isFavorite={favoriteIds.includes(item.id)}/>
                // <TouchableOpacity
                //     onPress={()=>navigation.navigate("Auction", {ProductId: item.id})} // The object we pass to the next page    
                // >
                //     <ResultDetail result={item}/>
                // </TouchableOpacity>);
                )
            }}
        />
    );


}
export default AuctionList;