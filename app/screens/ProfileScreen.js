import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button , Image, TouchableOpacity, RefreshControl, ScrollView} from 'react-native';
import {Avatar,Caption, Title,TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import {shade1, shade2, shade3, shade4, shade5} from "../config/color"
import { AuthContext } from '../context/AuthContext';
import { useRequest } from '../hooks/useRequest';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Star from 'react-native-star-view';
import { TextButton } from '../components/TextButton'
import axios from 'axios'
import {BASE_URL} from '../config/index';
// import { TouchableOpacity } from 'react-native-gesture-handler';


function ProfileScreen({navigation}) {

  const {auth: {signOut},
  user} = React.useContext(AuthContext);

  if(!user){
    return <View></View>
  }

  const [image, setImage] = React.useState('');
  const [wallet, setWallet] = React.useState(0);
  const [userInf, setUserInf] = React.useState({});
  const [refreshing, setRefreshing] = React.useState(false);


  const refresh = () => {
    setRefreshing(true)
    useRequest('GET',`/users/${user.id}/balance`, user.token, {setState:setWallet})
    useRequest('GET',`/users/${user.id}`, user.token, {setState:setUserInf})
    setRefreshing(false)
  }

  React.useEffect(() => {
    if(userInf.imageID == null){
      setImage('')
      console.log('inseide')
    }
    else{
      axios.get(`${BASE_URL}/users/${user.id}/image`).then((res) => {
        setImage(res.config.url)
      })
    }
  }, [userInf])

  React.useEffect(() => {
    refresh()
  }, []);

  const getMultipartImage = (uri) => {
    const subdir = '/ImagePicker/' 
    const name = uri.substring(uri.indexOf(subdir) + subdir.length)
    let ext = undefined
    if(name.substr(-3) == 'jpg' || name.substr(-3) == 'png'){
        ext = name.substr(-3)
    }
    else if(name.substr(-4) == 'jpeg'){
        ext = name.substr(-4)
    }
    else{
        console.log('invalid extension type for image')
    }
    var img = {
        uri: uri,
        name: name,
        type: 'image/' + ext
    }
    return img
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      allowsMultipleSelection: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {

      if(result.uri != null && result.uri != undefined && result.uri != ''){
        setImage(result.uri);
        const data = new FormData()
        const img = getMultipartImage(result.uri)
        data.append('multipartImage',  img);
        useRequest('POST', `/users/${user.id}/image`, user.token, {body:data})
      }
    }
  };


  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={{alignItems: 'center'}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
          />
      }>
      {/* <TouchableOpacity
        style={{alignSelf:'flex-start'}}
        onPress={refresh}
        >
          <Icon name={'refresh'} size={30} color={shade5} />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={pickImage} >
          {image != '' ? <Avatar.Image 
              source={{
                uri: image,
              }}
              size={150}
            /> : 
            <Avatar.Image 
            source={require('../../assets/no_image.png')}
            size={150}
          />}
        </TouchableOpacity>        
        
      
        <View style={styles.userInfoSection}>
          <View style={{alignSelf:'center'}}>
              <Title style={[styles.title, {
                marginTop:15,
                marginBottom: 5,
                color: '#343a40'
              }]}>{userInf.firstname} {userInf.lastname}</Title>

          </View>
          <View style={styles.row}>
            <Icon name="phone" color={shade5} size={20}/>
            <Text style={{color:'#343a40', marginLeft: 20}}>{userInf.contactNumber}</Text>
          </View>
          <View style={styles.row}>
            <Icon name="email" color={shade5} size={20}/>
            <Text style={{color:'#343a40', marginLeft: 20}}>{userInf.email}</Text>
          </View>
        </View>

      <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>{wallet}₺</Title>
            <Text style={{
              fontWeight: '100',
              fontSize: 13,
              color: 'black'
            }}>Cüzdan</Text>
          </View>
          <View style={styles.infoBox}>
            <Title>{userInf.ratingCount}</Title>
            <TextButton
                      title={'Yorumlar'}
                      onPress={() => {navigation.navigate("User", {seller: userInf})}}
            />
          </View>
      </View>
      <View style={styles.menuWrapper}>
        
        <TouchableRipple onPress={
            async () => {
            try {
              await signOut();
            } catch (e) {
                console.log(e)
            }
          }
        }>
          <View style={styles.menuItem}>
            <FontAwesome name="sign-out" color={shade5} size={25}/>
            <Text style={styles.menuItemText}>Çıkış Yap</Text>
          </View>
        </TouchableRipple>

      </View>
    </ScrollView>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: shade1
  },
  userInfoSection: {
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});
     
export default ProfileScreen;


// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// const ProfileScreen = () => {
//     return <Text> Profile </Text>;
// };

// const styles = StyleSheet.create({});

// export default ProfileScreen;