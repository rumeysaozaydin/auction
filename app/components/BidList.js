import React from 'react';
import { FlatList } from 'react-native';
import BidCard from "../components/BidCard";

const BidList = ({navigation , data}) => {
    let Bidcards = data.map((bid) => {
        return (
          <BidCard
            key = {(bid.id).toString()}
            data= {bid}
            navigation={navigation}
          />
        );
    
    });

    return({Bidcards});
    // return(
    //     <FlatList 
    //         style={{maxHeight: 70}}
    //         data={data}
    //         keyExtractor={(data) => data.id.toString()}
    //         renderItem={({item}) => {
    //             return (
    //                 <BidCard 
    //                     navigation={navigation} 
    //                     data={item}
    //                 />
    //             )
    //         }}
    //     />
    // );
}
export default BidList;