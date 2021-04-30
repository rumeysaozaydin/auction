import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button , Image} from 'react-native';
import {shade1, shade2, shade3, shade4, shade5} from "../config/color"


function PayScreen({navigation, route}) {
    const { auction } = route.params;
    return (
        <Text>Welcome to Pay Screen for {auction.title}</Text>
    )
}

export default PayScreen;