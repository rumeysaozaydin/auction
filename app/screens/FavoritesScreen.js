import React from 'react';
import { SliderComponent, StyleSheet, Text, View } from 'react-native';
import AuctionList from "../components/AuctionList";
import { TextButton } from '../components/TextButton';
import { AuthContext } from '../context/AuthContext';
import { useRequest } from '../hooks/useRequest';
import {shade1, shade2, shade3, shade4, shade5} from "../config/color"

const FavoritesScreen = ({navigation}) => {

    const {
      user,
    } = React.useContext(AuthContext);

    if(!user){
      return <View></View>
    }
    
    const [list, setList] = React.useState([]);
    const [favorites, setFavorites] = React.useState([]);
    const [whichList, setWhichList] = React.useState('Favorilerim');
    const [refreshing, setRefreshing] = React.useState(false);

    const refresh = () => {
      setRefreshing(true);
      let endpoint = `/favorites/${user.id}`
      if(whichList == 'Ilanlarım'){
          endpoint = `/auctions/seller/${user.id}`
      }
      else if(whichList == 'Teklif Verdiklerim'){
          endpoint = `/auctions/bidOwner/${user.id}`
      }
      else if(whichList == 'Kazandıklarım'){
          endpoint = `/auctions/won/${user.id}`
      }
      useRequest('GET', endpoint, user.token, {setState:setList});
      useRequest('GET', `/favorites/${user.id}`, user.token, {setState:setFavorites});
      setRefreshing(false);
    }

    React.useEffect(() => {
      refresh()
    }, [whichList]);

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
      
        <View style={styles.tab}>
          <TextButton style={styles.button}
            title={'Favoriler'}
            onPress={ () => {
                setWhichList('Favorilerim');
            }}
          />
          <TextButton style={styles.button}
            title={'Ilanlar' }
            onPress={ () => {
                setWhichList('Ilanlarım');
            }}
          />
          <TextButton style={styles.button}
            title={'     Teklif Verilenler' }
            onPress={ () => {
                setWhichList('Teklif Verdiklerim');
            }}
          />
          <TextButton style={styles.button}
            title={'Kazanılanlar' }
            onPress={ () => {
                setWhichList('Kazandıklarım');
            }}
          />
        </View>
        
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 25,
            fontWeight: 'bold',
            color: '#333',
            marginVertical: 20
          }}>
          {whichList}
        </Text>
        <AuctionList 
          navigation={navigation} 
          auctions={list}
          favoriteIds={favorites.map(favorites=>favorites.id)}
          addFav={(auction) => addFav(auction)}
          deleteFav={(auction) => deleteFav(auction)}
          refreshing={refreshing}
          onRefresh={refresh}
        />
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    flex: 1,
    flexDirection: "column",
    alignItems: 'center',
    backgroundColor: shade1
  },
  tab: {
    //flex: 1,
    flexDirection: 'row',
    
    fontSize: 5
  },
  button: {
    flex:1,
    color: 'black',
    fontSize: 5,
  }
});

export default FavoritesScreen;