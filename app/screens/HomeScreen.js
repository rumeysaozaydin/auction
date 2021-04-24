import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground , Dimensions} from 'react-native';
import AuctionList from "../components/AuctionList";
import { TextButton } from '../components/TextButton';
import { AuthContext } from '../context/AuthContext';
import { useRequest } from '../hooks/useRequest';

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

  React.useEffect(() => {
    refresh()
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground resizeMode= "cover" source={require('../../assets/bckgrnd.jpg')} style={styles.image}>
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
            addFav={(auction) => addFav(auction)}
            deleteFav={(auction) => deleteFav(auction)}
          />
      </ImageBackground>
        
    </View>
      
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: 'center',
  },
  image: {
    flex: 1, 
    justifyContent: "center",    
  },
});

export default HomeScreen;