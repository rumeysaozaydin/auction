import React from 'react';
import { Image, Platform, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { ScreenContainer } from 'react-native-screens';
import Swiper from 'react-native-swiper';
import AuctionList from "../components/AuctionList";
import { TextButton } from '../components/TextButton';
import { AuthContext } from '../context/AuthContext';
import { useGet } from '../hooks/useGet';
import {useRequest} from '../hooks/useRequest';

const HomeScreen = ({navigation}) => {
  const {
    auth: {signOut},
    user,
  } = React.useContext(AuthContext);

  const [auctionList, setAuctionList] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);

  const refresh = () => {
    useRequest('GET','/auctions/all', user.token,{setState:setAuctionList});
    useRequest('GET',`/favorites/${user.id}`, user.token,{setState:setFavorites});
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
        Auctions
      </Text>
      <AuctionList 
        navigation={navigation} 
        auctions={auctionList}
        favoriteIds={favorites.map(favorites=>favorites.id)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    
});

export default HomeScreen;