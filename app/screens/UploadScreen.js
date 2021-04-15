
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {usePost} from '../hooks/usePost';
import {AuthContext} from '../context/AuthContext';
import { ScreenContainer } from 'react-native-screens';
import {FilledButton} from '../components/FilledButton';
import {Input} from '../components/Input';
import {TextButton} from '../components/TextButton';
import {Heading} from '../components/Heading';
import {BASE_URL} from '../config/index';
import axios from 'axios';

const UploadScreen = () => {
    const {
        user
    } = React.useContext(AuthContext);

    const id = user.id;

    const [title, setTitle] = React.useState("jacket");
    const [description, setDescription] = React.useState("nice jacker");
    const [initialPrice, setInitialPrice] = React.useState("2123123");
    const [startingTime, setStartingTime] = React.useState("2021-04-15T19:14:15.971Z");
    const [expirationTime, setExpirationTime] = React.useState('2021-07-15T19:14:15.971Z');

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
                placeholder={'startingTime'}
                value={startingTime}
                onChangeText={setStartingTime}
            />
            <Input
                style={styles.input}
                placeholder={'expirationTime'}
                value={expirationTime}
                onChangeText={setExpirationTime}
            />
            <FilledButton
                title={'Upload Auction'}
                style={styles.loginButton}
                onPress={async () => {
                    var endpoint = '/auctions';
                    const newAuc =
                    {
                        "description": description,
                        "expirationTime": expirationTime,
                        "initialPrice": initialPrice,
                        "sellerID": id,
                        "startingTime": startingTime,
                        "status": "ACTIVE",
                        "title": title
                    }
                    axios
                    .post(`${BASE_URL}${endpoint}`, newAuc, {
                        headers: {
                        Authorization: `bearer ${user.token}`
                        },
                    })
                    .then(({data}) => {
                        console.log("INSIDE USEPOST THEN")
                    })
                    .catch(function (error) {
                        console.log("INSIDE USEPOST CATCH")
                        console.log(error.message);
                    });
                    console.log("Upload Product")
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