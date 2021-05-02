import React from 'react';
import { Text } from 'react-native';
import {shade1, shade2, shade3, shade4, shade5, textColor} from "../config/color"



const BidCard = ({navigation, data}) => {
    return(
        <Text style={{color:textColor, fontSize: 15}}>
            {data.price}₺
        </Text>
    )
}

export default BidCard;
