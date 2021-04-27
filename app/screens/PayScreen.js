import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button , Image} from 'react-native';

function PayScreen({navigation, route}) {
    const { auction } = route.params;
    return (
        <Text>Welcome to Pay Screen for {auction.title}</Text>
    )
}

export default PayScreen;