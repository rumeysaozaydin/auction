import React from 'react';
import { SliderComponent, StyleSheet, Text, View } from 'react-native';
import AuctionList from "../components/AuctionList";
import { TextButton } from '../components/TextButton';
import { AuthContext } from '../context/AuthContext';
import { useRequest } from '../hooks/useRequest';

const FavoritesScreen = ({navigation}) => {

    const {
      user,
    } = React.useContext(AuthContext);
    
    const [list, setList] = React.useState([]);
    const [favorites, setFavorites] = React.useState([]);
    const [whichList, setWhichList] = React.useState('favorilerim');

    const refresh = (listName) => {
        let endpoint = `/favorites/${user.id}`
        if(listName == 'ilanlarim'){
            endpoint = `/auctions/seller/${user.id}`
        }
        else if(listName == 'teklifVerdiklerim'){
            endpoint = `/favorites/${user.id}`
        }
        else if(listName == 'kazandiklarim'){
            endpoint = `/favorites/${user.id}`
        }
        useRequest('GET', endpoint, user.token, {setState:setList});
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
      <View style={styles.container}>
        
        <TextButton
          title={'Refresh'}
          onPress={refresh}
        />
        <View style={styles.tab}>
          <TextButton style={styles.button}
            title={'Favorilerim'}
            onPress={ () => {
                setWhichList('Favorilerim');
                refresh('favorilerim');
            }}
          />
          <TextButton style={styles.button}
            title={'Ilanlarim' }
            onPress={ () => {
                setWhichList('Ilanlarım');
                refresh('ilanlarim');
            }}
          />
          <TextButton style={styles.button}
            title={'Teklif Verdiklerim' }
            onPress={ () => {
                setWhichList('Teklif Verdiklerim');
                refresh('teklifVerdiklerim');
            }}
          />
          <TextButton style={styles.button}
            title={'Kazandiklarim' }
            onPress={ () => {
                setWhichList('Kazandıklarım');
                refresh('kazandiklarim');
            }}
          />
        </View>
        
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 18,
            fontWeight: 'bold',
            color: '#333',
          }}>
          {whichList}
        </Text>
        <AuctionList 
          navigation={navigation} 
          auctions={list}
          favoriteIds={favorites.map(favorites=>favorites.id)}
          addFav={(auction) => addFav(auction)}
          deleteFav={(auction) => deleteFav(auction)}
        />
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    flexDirection: "column",
    alignItems: 'center',
  },
  tab: {
    //flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  button: {
    flex:1
  }
});

export default FavoritesScreen;