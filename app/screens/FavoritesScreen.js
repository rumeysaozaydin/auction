import React from 'react';
import { SliderComponent, StyleSheet, Text, View, Dimensions } from 'react-native';
import AuctionList from "../components/AuctionList";
import { TextButton } from '../components/TextButton';
import { AuthContext } from '../context/AuthContext';
import { useRequest } from '../hooks/useRequest';
import {shade1, shade2, shade3, shade4, shade5, textColor} from "../config/color"

const screenHeight = Math.round(Dimensions.get('window').width);
const pageList = [
  {index: 0, title:'Favorilerim', endpoint:'/favorites/'},
  {index: 1, title:'İlanlarım', endpoint:'/auctions/seller/'},
  {index: 2, title:'Teklif\nVerdiklerim', endpoint:'/auctions/bidOwner/'},
  {index: 3, title:'Kazandıklarım', endpoint:'/auctions/won/'}
] 
const FavoritesScreen = ({navigation}) => {

    const {
      user,
    } = React.useContext(AuthContext);

    if(!user){
      return <View></View>
    }
    
    const [list, setList] = React.useState([]);
    const [favorites, setFavorites] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(0);
    const [refreshing, setRefreshing] = React.useState(false);

    const refresh = () => {
      setRefreshing(true);
      useRequest('GET', pageList[currentPage].endpoint + user.id, user.token, {setState:setList});
      useRequest('GET', `/favorites/${user.id}`, user.token, {setState:setFavorites});
      setRefreshing(false);
    }

    React.useEffect(() => {
      refresh()
    }, [currentPage]);

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


    let buttonList = pageList.map((item) => {
      return (
        <TextButton 
            key={item.index}
            style={styles.button}
            textStyle={ currentPage == item.index ? styles.pressedText : styles.unPressedText}
            title={item.title}
            onPress={ () => {
                setCurrentPage(item.index);
            }}
          />
      );
    });

    return (
      <View style={styles.container}>
      
        <View style={styles.tab}>
          {buttonList}
        </View>
      
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
    paddingTop: screenHeight * 0.1,
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
    height: screenHeight * 0.18,
  },
  pressedText: {
    color:shade5,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    borderBottomWidth: 2,
    paddingBottom: 5,
    borderColor: shade5,
  },
  unPressedText: {
    textAlign: 'center',
    color:textColor,
    fontWeight: 'normal',
    fontSize: 12,
    fontWeight: 'bold',

  }
});

export default FavoritesScreen;