import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground , Dimensions, FlatList, RefreshControl, Alert, Button, TouchableOpacity, ScrollView } from 'react-native';
import AuctionList from "../components/AuctionList";
import { TextButton } from '../components/TextButton';
import { AuthContext } from '../context/AuthContext';
import { useRequest } from '../hooks/useRequest';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SearchBar } from 'react-native-elements';
import {shade1, shade2, shade3, shade4, shade5, shadeTrans} from "../config/color"


//         UNSORTED,
//         BY_EXPIRATION_TIME_ASC,
//         BY_EXPIRATION_TIME_DESC,
//         BY_STARTING_TIME_ASC,
//         BY_STARTING_TIME_DESC,
//         BY_PRICE_ASC,
//         BY_PRICE_DESC
//         ?sort=UNSORTED vs
// color pallete : https://coolors.co/6b9080-a4c3b2-cce3de-eaf4f4-f6fff8
const screenWidth = Math.round(Dimensions.get('window').width)

const HomeScreen = ({navigation}) => {
  const {
    auth: {signOut},
    user,
  } = React.useContext(AuthContext);

  if(!user){
    return <View></View>
  }

  const [auctionList, setAuctionList] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [categoryName, setCategoryName] = React.useState('');

  const updateSearchText = (search) => {
    setSearch(search);
  };

  const refresh = () => {
    console.log('refresh')
    setRefreshing(true);
    if(search != ''){
      useRequest('GET',`/auctions/searchAuction/${search}`, user.token,{setState:setAuctionList});
    }
    else if( category != ''){
      useRequest('GET',`/auctions/searchCategory?category=${category}`, user.token,{setState:setAuctionList}); }  
    else{
      useRequest('GET','/auctions/all?status=ACTIVE&sort=BY_STARTING_TIME_DESC', user.token,{setState:setAuctionList});
    }
    useRequest('GET',`/favorites/${user.id}`, user.token,{setState:setFavorites});
    setRefreshing(false);
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

  const searching = () => {
    if(search != ''){
      useRequest('GET',`/auctions/searchAuction/${search}`, user.token,{setState:setAuctionList});
      setCategory('')
      setCategoryName('')
    }
    else{
      useRequest('GET','/auctions/all?status=ACTIVE&sort=BY_STARTING_TIME_DESC', user.token,{setState:setAuctionList}); }

  }

  React.useEffect(() => {
    if(category != ''){
      useRequest('GET',`/auctions/searchCategory?category=${category}`, user.token,{setState:setAuctionList});   
      setSearch('')
    }
    else{
      useRequest('GET','/auctions/all?status=ACTIVE&sort=BY_STARTING_TIME_DESC', user.token,{setState:setAuctionList});    }  
  }, [category]);

  let iconNames = ["earth", "television", "gamepad-variant-outline", "home-city-outline", "car", "basketball", "tshirt-v-outline", "baby-carriage", "bookshelf", "dots-horizontal"]
  var iconTitles = new Map();
  iconTitles.set("earth", "Tümü");
  iconTitles.set("television", 'Elektronik');
  iconTitles.set("gamepad-variant-outline", 'Oyun');
  iconTitles.set("home-city-outline", "Ev");
  iconTitles.set("car", 'Araç');
  iconTitles.set("basketball", 'Spor');
  iconTitles.set("tshirt-v-outline", "Kıyafet");
  iconTitles.set("baby-carriage", 'Bebek');
  iconTitles.set("bookshelf", 'Kitap');
  iconTitles.set("dots-horizontal", 'Diğer');

  var categoryNames = new Map();
  categoryNames.set("earth", "");
  categoryNames.set("television", 'ELECTRONIC');
  categoryNames.set("gamepad-variant-outline", 'GAME');
  categoryNames.set("home-city-outline", "HOME");
  categoryNames.set("car", 'VEHICLES');
  categoryNames.set("basketball", 'SPORTOUTDOOR');
  categoryNames.set("tshirt-v-outline", "FASHION");
  categoryNames.set("baby-carriage", 'BABY');
  categoryNames.set("bookshelf", 'FILMBOOKMUSIC');
  categoryNames.set("dots-horizontal", 'OTHERS');

//   var categoryNames = {};
//   categoryNames= {  "earth":"",
//                     "television": "ELECTRONIC",
//                     "gamepad-variant-outline": "GAME",
//                     "home-city-outline": "HOME",
//                     "car": "VEHICLES",
//                     "basketball":"SPORTOUTDOOR",
//                     "tshirt-v-outline":"FASHION",
//                     "baby-carriage": "BABY",
//                     "bookshelf": "FILMBOOKMUSIC",
//                     "dots-horizontal":"OTHERS"
// }
  return (
    <View style={styles.container}>
      {/* <ImageBackground resizeMode= "cover" source={require('../../assets/bckgrnd.jpg')} style={styles.image}> */}
      
      <View style={{marginTop: 30, marginHorizontal:10}}>
        <SearchBar
          placeholder="Ara..."
          onChangeText={updateSearchText}
          onSubmitEditing={searching}
          value={search}
          inputStyle={{backgroundColor: 'rgba(52, 52, 52, 0)', color: shade5}}
          containerStyle={{ backgroundColor: 'rgba(52, 52, 52, 0)', borderWidth: 0, borderTopWidth:0, borderBottomWidth:0}}
          placeholderTextColor={shade4}
          inputContainerStyle={{backgroundColor: shadeTrans, borderRadius: 30,borderColor: 'rgba(52, 52, 52, 0)'}}
          searchIcon={{color:shade5}}
        />
      </View>
       
        <View style= {{marginTop: 10, height: 90}}>
          <FlatList 
            horizontal= {true}
            showsHorizontalScrollIndicator= {false}
            data={iconNames}
            keyExtractor={(data) => data}
            renderItem={({item}) => {
                return (
                  <TouchableOpacity style={styles.categoryBtn}
                    onPress={() => {
                      setCategory(categoryNames.get(item))
                      setCategoryName(iconTitles.get(item))
                  }}>
                  <View style={styles.categoryIcon}>
                    <MaterialCommunityIcons name={item} size={20} color={shade5} />
                  </View>
                  <Text style={styles.categoryBtnTxt}>{iconTitles.get(item)}</Text>
                  </TouchableOpacity>
                )
            }}
          />
        </View>
        <AuctionList 
          refreshing={refreshing}
          onRefresh={refresh}
          navigation={navigation} 
          auctions={auctionList}
          favoriteIds={favorites.map(favorites=>favorites.id)}
          addFav={(auction) => addFav(auction)}
          deleteFav={(auction) => deleteFav(auction)}
        />
      {/* </ImageBackground> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    flexDirection: "column",
    alignItems: 'stretch',
    backgroundColor: shade1
    //justifyContent: 'flex-start'
  },
  image: {
    flex: 1, 
    justifyContent: "center",    
  },
  categoryBtn: {
    flex: 1,
    //alignSelf: 'center',
    height: 50,
    width: screenWidth * 0.2,
    //marginRight:5,
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 40,
    height: 40,
    backgroundColor: shade3 /* '#FF6347' */,
    borderRadius: 50,
  },
  categoryBtnTxt: {
    alignSelf: 'center',
    marginTop: 5,
    color: shade5,
    fontWeight: 'bold'

  },
});

export default HomeScreen;