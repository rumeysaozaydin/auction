import React from 'react';
import { FlatList } from 'react-native';
import BidCard from "../components/BidCard";

const BidList = ({navigation , data}) => {

    return(
        <FlatList 
            style={{maxHeight: 50}}
            data={data}
            keyExtractor={(data) => data.id.toString()}
            renderItem={({item}) => {
                return (
                    <BidCard 
                        navigation={navigation} 
                        data={item}
                    />
                )
            }}
        />
    );
}
export default BidList;