import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AuctionList from "../components/AuctionList";
import { TextButton } from '../components/TextButton';
import { AuthContext } from '../context/AuthContext';
import { useRequest } from '../hooks/useRequest';


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

    const addFav = (auction) => {
      const body = {
          userID: user.id,
          auctionID: auction.id
      }
      useRequest('POST',`/favorites`,user.token, {body:body})
      const newFavorites = [auction, ...favorites]
      setFavorites(newFavorites)
    }
  
    const deleteFav = (auction) => {
        useRequest('DELETE',`/favorites/${user.id}/${auction.id}`, user.token)
        const newFavorites = favorites.filter((item) => item.id != auction.id)
        setFavorites(newFavorites)
    }

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
          addFav={(auction) => addFav(auction)}
          deleteFav={(auction) => deleteFav(auction)}
        />
      </View>
    );
};


const styles = StyleSheet.create({
});

export default FavoritesScreen;