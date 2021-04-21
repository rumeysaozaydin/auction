
import axios from 'axios';
import React from 'react';
import { StyleSheet, View, Button, Image } from 'react-native';
import { ScreenContainer } from 'react-native-screens';
import { FilledButton } from '../components/FilledButton';
import { Heading } from '../components/Heading';
import { Input } from '../components/Input';
import { BASE_URL } from '../config/index';
import { AuthContext } from '../context/AuthContext';
import * as ImagePicker from 'expo-image-picker';
import { FlatList } from 'react-native-gesture-handler';
import { useRequest } from '../hooks/useRequest';


const UploadScreen = ({navigation}) => {

    const {
        user
    } = React.useContext(AuthContext);

    if(!user){
        return <View></View>
    }

    const id = user.id;

    const [title, setTitle] = React.useState("jacket");
    const [description, setDescription] = React.useState("nice jacket");
    const [initialPrice, setInitialPrice] = React.useState("212");
    const [duration, setDuration] = React.useState('60000');
    const [imageUris, setImageUris] = React.useState([]);

    const reset = () => {
        setTitle("v60");
        setDescription('kahve');
        setInitialPrice('90');
        setDuration('60000');
        setImageUris([]);
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          allowsMultipleSelection: true,
          aspect: [1, 1],
          quality: 1,
        });
        if (!result.cancelled) {
            const newImages = [...imageUris,result.uri]
            setImageUris(newImages);
        } 
    }

    const getMultipartImage = (uri) => {
        // var img1 = {
        //     uri : 'file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fdemo-9aef5fb8-cd54-4b32-87cd-e6ce418f59fe/ImagePicker/2199240b-3917-42d3-bf0f-1a61c0227218.jpg',
        //     name: '2199240b-3917-42d3-bf0f-1a61c0227218.jpg',
        //     type: 'image/jpeg'
        // };
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

    const uploadImages = (auctionID) => { 
        imageUris.forEach( (uri) => {
            const data = new FormData()
            const img = getMultipartImage(uri)
            data.append('image',  img);
            useRequest('POST', `/auctions/${auctionID}/images`, user.token, {body:data})
        })
    }
    
    return (
        <View>
            <Heading style={styles.title}>Upload</Heading>
            <Input
                style={styles.input}
                placeholder={'Title'}
                value={title}
                onChangeText={setTitle}
            />
            <Input
                style={styles.input}
                placeholder={'Description'}
                value={description}
                onChangeText={setDescription}
            />
            <Input
                style={styles.input}
                placeholder={'InitialPrice'}
                value={initialPrice}
                onChangeText={setInitialPrice}
            />
            
            <Input
                style={styles.input}
                placeholder={'duration'}
                value={duration}
                onChangeText={setDuration}
            />
            <FlatList 
                horizontal= {true}
                showsHorizontalScrollIndicator= {false}
                style={{height: 60, marginLeft: 10}}
                data={imageUris}
                keyExtractor={(data) => data}
                renderItem={({item}) => {
                    return (
                        <Image 
                            source={{ uri: item }} 
                            style={{ width: 60, height: 60, marginRight: 10 }}
                        />
                    )
                }}
            />
            <Button style={{marginTop: 120}}title="Pick an image from camera roll" onPress={pickImage} />
            <FilledButton
                title={'Upload Auction'}
                style={styles.loginButton}
                onPress={async () => {
                    const newAuction =
                    {
                        "description": description,
                        "initialPrice": initialPrice,
                        "sellerID": id,
                        "title": title
                    }
                    useRequest('POST', `/auctions?duration=${duration}`, user.token, 
                        {body:newAuction, callback:(response => {
                            console.log('Auction ID', response.id)
                            uploadImages(response.id)
                            navigation.navigate("Auction" , { auctionId: response.id, initIsFavorite: false, imageUris:[...imageUris]})
                            reset()
                        })} )
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 50,
        alignItems: 'center',
    },
    title: {
        marginBottom: 20,
    },
    input: {
        marginVertical: 8,
    },
    loginButton: {
        marginVertical: 32,
    },
});

export default UploadScreen;