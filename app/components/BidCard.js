import React from 'react';
import { Text } from 'react-native';

const BidCard = ({navigation, data}) => {
    return(
        <Text>
            ${data.price}
        </Text>
    )
}

export default BidCard;
