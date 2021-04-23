import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button , Image} from 'react-native';
import {
  Avatar,

  Caption, Title,

  TouchableRipple
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../context/AuthContext';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import {BASE_URL} from '../config/index';


function ProfileScreen({navigation}) {
  const [image, setImage] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  React.useEffect(() => {
    if(image){
      console.log(typeof(image))
      const data = new FormData()
      var img = {
        uri : 'file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fdemo-9aef5fb8-cd54-4b32-87cd-e6ce418f59fe/ImagePicker/2199240b-3917-42d3-bf0f-1a61c0227218.jpg',
        name: '2199240b-3917-42d3-bf0f-1a61c0227218.jpg',
        type: 'image/jpeg'
      };
    
      data.append('image',  img);
      const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
      }
      axios.post(`${BASE_URL}/images`,data).then((res) => {console.log(res.data)}).catch((e) => {console.log(e) })

    }
  }, [image])

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
      setImage(result.uri);
    }
  };

  

  const {
    auth: {signOut},
    user,
  } = React.useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>

    <View style={styles.userInfoSection}>
      <View style={{flexDirection: 'row', marginTop: 15}}>
        <Avatar.Image 
          source={{
            uri: 'https://api.adorable.io/avatars/80/abott@adorable.png',
          }}
          size={80}
        />
        <View style={{marginLeft: 20}}>
          <Title style={[styles.title, {
            marginTop:15,
            marginBottom: 5,
          }]}>John Doe</Title>
          <Caption style={styles.caption}>@j_doe</Caption>
        </View>
      </View>
    </View>

    <View style={styles.userInfoSection}>
      <View style={styles.row}>
        <Icon name="map-marker-radius" color="#777777" size={20}/>
        <Text style={{color:"#777777", marginLeft: 20}}>Ankara, Turkey</Text>
      </View>
      <View style={styles.row}>
        <Icon name="phone" color="#777777" size={20}/>
        <Text style={{color:"#777777", marginLeft: 20}}>+90 543 323 32 19</Text>
      </View>
      <View style={styles.row}>
        <Icon name="email" color="#777777" size={20}/>
        <Text style={{color:"#777777", marginLeft: 20}}>john_doe@email.com</Text>
      </View>
    </View>

    <View style={styles.infoBoxWrapper}>
        <View style={[styles.infoBox, {
          borderRightColor: '#dddddd',
          borderRightWidth: 1
        }]}>
          <Title>$140.50</Title>
          <Caption>Wallet</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title>12</Title>
          <Caption>Orders</Caption>
        </View>
    </View>

    <View style={styles.menuWrapper}>
      
      <TouchableRipple onPress={() => {}}>
        <View style={styles.menuItem}>
          <Icon name="credit-card" color="#FF6347" size={25}/>
          <Text style={styles.menuItemText}>Payment</Text>
        </View>
      </TouchableRipple>
      <TouchableRipple onPress={() => {}}>
        <View style={styles.menuItem}>
          <Icon name="account-check-outline" color="#FF6347" size={25}/>
          <Text style={styles.menuItemText}>Support</Text>
        </View>
      </TouchableRipple>
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
          <Icon name="settings-outline" color="#FF6347" size={25}/>
          <Text style={styles.menuItemText}>Sign Out</Text>
        </View>
      </TouchableRipple>

      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
    </View>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 60,
    alignItems: 'center',
  },
  userInfoSection: {
    paddingHorizontal: 30,
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