import React from 'react';
import { FlatList } from 'react-native';
import AuctionCard from "../components/AuctionCard";

const AuctionList = ({navigation , auctions, favoriteIds, addFav, deleteFav}) => {

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
                        initIsFavorite={favoriteIds.includes(item.id)}
                        addFav={addFav}
                        deleteFav={deleteFav}
                    />
                )
            }}
        />
    );


}
export default AuctionList;