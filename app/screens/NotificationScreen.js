import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button , Image} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useRequest } from '../hooks/useRequest';
import NotificationList from '../components/NotificationList'
import {shade1, shade2, shade3, shade4, shade5} from "../config/color"


function NotificationScreen({navigation, route}) {

    const {
        user
    } = React.useContext(AuthContext);

    if(!user){
        return <View></View>
    }

    const [notifications, setNotifications] = React.useState([]);
    const [refreshing, setRefreshing] = React.useState(false);

    const refresh = () => {
        console.log('refresh')
        setRefreshing(true);
        useRequest('GET',`/notification/receiver/${user.id}`, user.token,{setState:setNotifications});
        setRefreshing(false);
    }

    React.useEffect(() => {
        refresh()
    }, []);

    return (
        <View style={{flex :1, paddingTop:50, backgroundColor:shade1}}>
            <NotificationList 
                refreshing={refreshing}
                onRefresh={refresh}
                navigation={navigation} 
                notifications={notifications}
            />
        </View>
        
    )
}

export default NotificationScreen;