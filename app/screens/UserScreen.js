import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button , Image} from 'react-native';

function UserScreen({navigation, route}) {
    const { user } = route.params;
    return (
        <Text>Welcome to User Screen {user.email}</Text>
    )
}

export default UserScreen;