import React from 'react';
import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, Image,  TouchableOpacity } from 'react-native';

import { ScreenContainer } from 'react-native-screens';
import {Heading} from '../components/Heading';
import {AuthContext} from '../context/AuthContext';
import {useGet} from '../hooks/useGet';
import {useRequest} from '../hooks/useRequest';
import { usePost } from '../hooks/usePost';
import axios from 'axios';
import {BASE_URL} from '../config/index';
import { TextButton } from '../components/TextButton';
import AuctionList from "../components/AuctionList";

const FavoritesScreen = ({navigation}) => {

    const {
      auth: {signOut},
      user,
    } = React.useContext(AuthContext);
    
    const [favorites, setFavorites] = React.useState([]);

    const refresh = () => {
      useRequest('GET', `/favorites/${user.id}`, user.token, {setState:setFavorites});
    }

    React.useEffect(() => {
      refresh()
    }, []);

    return (
      <View >
        <TextButton
                title={'Refresh' }
                onPress={refresh}
        />
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 18,
            fontWeight: 'bold',
            color: '#333',
          }}>
          Favorites
        </Text>
        <AuctionList 
          navigation={navigation} 
          auctions={favorites}
          favoriteIds={favorites.map(favorites=>favorites.id)}
        />
      </View>
    );
};


const styles = StyleSheet.create({
});

export default FavoritesScreen;