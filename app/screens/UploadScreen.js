
import axios from 'axios';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScreenContainer } from 'react-native-screens';
import { FilledButton } from '../components/FilledButton';
import { Heading } from '../components/Heading';
import { Input } from '../components/Input';
import { BASE_URL } from '../config/index';
import { AuthContext } from '../context/AuthContext';


const UploadScreen = ({navigation}) => {

    const {
        user
    } = React.useContext(AuthContext);

    if(!user){
        return <View></View>
    }

    const id = user.id;

    const [title, setTitle] = React.useState("jacket");
    const [description, setDescription] = React.useState("nice jacker");
    const [initialPrice, setInitialPrice] = React.useState("212");
    const [duration, setDuration] = React.useState('60');

    
    return (
        <ScreenContainer style={styles.container}>
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
            <FilledButton
                title={'Upload Auction'}
                style={styles.loginButton}
                onPress={async () => {
                    var endpoint = '/auctions';
                    const newAuc =
                    {
                        "description": description,
                        "initialPrice": initialPrice,
                        "sellerID": id,
                        "status": "ACTIVE",
                        "title": title
                    }
                    axios
                    .post(`${BASE_URL}${endpoint}?duration=${duration}`, newAuc, {
                        headers: {
                        Authorization: `bearer ${user.token}`
                        },
                    })
                    .then(({data}) => {
                        navigation.navigate("Auction" , { auctionId: data.id});
                    })
                    .catch(function (error) {
                        console.log(error.message);
                    });
                }}
            />
        </ScreenContainer>
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