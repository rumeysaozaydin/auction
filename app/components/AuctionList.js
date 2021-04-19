import React from 'react';
import { FlatList } from 'react-native';
import AuctionCard from "../components/AuctionCard";
import { AuthContext } from '../context/AuthContext';


const AuctionList = ({navigation , auctions, favoriteIds, addFav, deleteFav}) => {
    const {
        user,
    } = React.useContext(AuthContext);

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