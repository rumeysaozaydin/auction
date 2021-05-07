
import axios from 'axios';
import React from 'react';
import { StyleSheet, View, Button, Image, Text, Dimensions, TouchableOpacity} from 'react-native';
import { ScreenContainer } from 'react-native-screens';
import { FilledButton } from '../components/FilledButton';
import { Heading } from '../components/Heading';
import { Input } from '../components/Input';
import { BASE_URL } from '../config/index';
import { AuthContext } from '../context/AuthContext';
import * as ImagePicker from 'expo-image-picker';
import { FlatList } from 'react-native-gesture-handler';
import { useRequest } from '../hooks/useRequest';
//import {Picker} from '@react-native-picker/picker';
import {shade1, shade2, shade3, shade4, shade5, shadeTrans, shadeNotTrans} from "../config/color"
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';


const screenWidth =Math.round(Dimensions.get('window').width) 


const UploadScreen = ({navigation}) => {

    var categoryNames = new Map();
    categoryNames.set("Tümü", "");
    categoryNames.set("Elektronik", 'ELECTRONIC');
    categoryNames.set("Oyun", 'GAME');
    categoryNames.set("Ev", "HOME");
    categoryNames.set("Araç", 'VEHICLES');
    categoryNames.set("Spor", 'SPORTOUTDOOR');
    categoryNames.set("Kıyafet", "FASHION");
    categoryNames.set("Bebek", 'BABY');
    categoryNames.set("Kitap", 'FILMBOOKMUSIC');
    categoryNames.set("Diğer", 'OTHERS');

    var daysItem = []
    for (var i =0; i<16; i++){
        var a = {label: (i + ''), value: (i + '')}
        daysItem.push(a);
    }

    var hoursItem = []
    for (var i =0; i<23; i++){
        var a = {label: (i + ''), value: (i + '')}
        hoursItem.push(a);
    } 

    var minutesItem = []
    for (var i =0; i<59; i++){
        var a = {label: (i + ''), value: (i + '')}
        minutesItem.push(a);
    } 

    const {
        user
    } = React.useContext(AuthContext);

    if(!user){
        return <View></View>
    }

    const id = user.id;

    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [initialPrice, setInitialPrice] = React.useState("");
    const [duration, setDuration] = React.useState('');
    const [imageUris, setImageUris] = React.useState([]);
    const [category, setCategory] = React.useState(null);
    const [days, setDays] = React.useState('0');
    const [ hours, setHours] = React.useState('0');
    const [ minutes, setMinutes] = React.useState('0');

    const reset = () => {
        setTitle("");
        setDescription('');
        setInitialPrice('');
        setDuration('');
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
        <View style={styles.container}>
           
            <Input
                style={styles.input}
                placeholder={'Ürün İsmi'}
                value={title}
                onChangeText={setTitle}
            />
            <Input
                style={styles.input}
                placeholder={'Açıklama'}
                value={description}
                onChangeText={setDescription}
            />
            <Input
                style={styles.input}
                placeholder={'Başlangıç Fiyatı'}
                value={initialPrice}
                onChangeText={setInitialPrice}
            />

            <DropDownPicker
                items={[
                    {label: 'Elektronik', value: 'ELECTRONIC'},
                    {label: "Oyun", value:'GAME'},
                    {label: 'Ev', value: 'HOME'},
                    {label: "Araç", value:'VEHICLES'},
                    {label: 'Spor', value: 'SPORTOUTDOOR'},
                    {label: "Kıyafet", value:'FASHION'},
                    {label: 'Bebek', value: 'BABY'},
                    {label: "Kitap", value:'FILMBOOKMUSIC'},
                    {label: 'Diğer', value: 'OTHERS'},
                ]}
                placeholder="Kategori"
                defaultIndex={0}
                placeholderStyle={{color: shade4}}
                style={styles.input}
                labelStyle={{color: shade5}}
                containerStyle={{height: 80, width: '90%'}}
                dropDownStyle={{backgroundColor: shadeNotTrans, color:shade1}}
                onChangeItem={item => setCategory(item.value)}
            />

            <View style={{flexDirection:'row', width:'90%', justifyContent:'space-between'}}>
                
                <DropDownPicker
                    items={daysItem}
                    placeholder="Gün"
                    defaultIndex={0}
                    placeholderStyle={{color: shade4}}
                    style={styles.input}
                    labelStyle={{color: shade5}}
                    containerStyle={{height: 80, width: '30%'}}
                    dropDownStyle={{backgroundColor: shadeNotTrans, color:shade1}}
                    onChangeItem={item => setDays(item.value)}
                />

                <DropDownPicker
                    items={hoursItem}
                    placeholder="Saat"
                    defaultIndex={0}
                    placeholderStyle={{color: shade4}}
                    style={[styles.input] }
                    labelStyle={{color: shade5}}
                    containerStyle={{height: 80, width: '30%'}}
                    dropDownStyle={{backgroundColor: shadeNotTrans, color:shade1}}
                    onChangeItem={item => setHours(item.value)}
                />

                <DropDownPicker
                    items={minutesItem}
                    placeholder="Dakika"
                    defaultIndex={0}
                    placeholderStyle={{color: shade4}}
                    style={styles.input}
                    labelStyle={{color: shade5}}
                    containerStyle={{height: 80, width: '30%'}}
                    dropDownStyle={{backgroundColor: shadeNotTrans, color:shade1}}
                    onChangeItem={item => setMinutes(item.value)}
                />
            </View>

            <View style={{marginLeft: 20, marginTop: 30,flexDirection:'row', alignItems:'center'}}>
                <TouchableOpacity onPress={pickImage}>
                    <Icon name={'add-photo-alternate'} size={45} color={shade5} />
                </TouchableOpacity>

                <FlatList 
                    horizontal= {true}
                    showsHorizontalScrollIndicator= {false}
                    contentContainerStyle={{alignItems: 'center'}}
                    style={{ height: 60, marginLeft: 10}}
                    data={imageUris}
                    keyExtractor={(data) => data}
                    renderItem={({item}) => {
                        return (
                            <Image 
                                source={{ uri: item }} 
                                style={{ width: 50, height: 50, marginRight: 10 }}
                            />
                        )
                    }}
                />
            </View>
           

            {/* <Button style={{marginTop: 5}}color={shade5} title="Fotoğraf Yükle" onPress={pickImage} /> */}
            
           

            <FilledButton
                title={'Yükle'}
                style={styles.loginButton}
                onPress={async () => {
                    const newAuction =
                    {
                        "description": description,
                        "initialPrice": initialPrice,
                        "sellerID": id,
                        "title": title,
                        "auctionCategory": category

                    }
                    useRequest('POST', `/auctions?duration=${(parseInt(days) * 86400) + (parseInt(hours) * 3600) + (parseInt(minutes) * 60)}`, user.token, 
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
        backgroundColor: shade1
    },
    title: {
        marginBottom: 20,
    },
    input: {
        marginVertical: 8,
        backgroundColor: shadeTrans,
        color: shade5
    },
    loginButton: {
        marginVertical: 30,
    },
});

export default UploadScreen;