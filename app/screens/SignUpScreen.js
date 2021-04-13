import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { ScreenContainer } from 'react-native-screens';
import {AuthContext} from '../context/AuthContext';
import {FilledButton} from '../components/FilledButton';
import {Input} from '../components/Input';
import {TextButton} from '../components/TextButton';
import {Heading} from '../components/Heading';
import { Loading } from '../components/Loading';

const SignUpScreen = (props) => {

    const [username, setUsername] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [loading, setLoading] = React.useState(false);


    const {auth : {signUp}} = React.useContext(AuthContext);
    // const signUp = async () => {

    //     var myHeaders = new Headers();
    //     myHeaders.append("Content-Type", "application/json");

    //     var raw = JSON.stringify({"username":username,"password":password});

    //     var requestOptions = {
    //     method: 'POST',
    //     headers: myHeaders,
    //     body: raw,
    //     redirect: 'follow'
    //     };

    //     fetch("http://localhost:8080/register", requestOptions)
    //     .then(response => response.json())
    //     .then(result =>  alert(result.username + " registered successfully.") ) 
    //     .catch(error =>  alert( JSON.stringify( "Could not register ") )) ;

    // }

    return (
        <ScreenContainer style={styles.container}>
            <Heading style={styles.title}>Sign Up</Heading>
            <Input
                style={styles.input}
                placeholder={'Username'}
                value={username}
                onChangeText={setUsername}
            />
            <Input
                style={styles.input}
                placeholder={'Password'}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <FilledButton
                title={'Sign Up'}
                style={styles.loginButton}
                onPress={async () => {
                    await signUp();
                }}
            />
            <TextButton
                title={'You Already Have an Account? Sign In' }
                onPress={() => {
                    props.navigation.navigate("SignIn")
                }}
            />
            <Loading loading={loading}/>
            
        </ScreenContainer>
    );
    
    
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 120,
        alignItems: 'center',
    },
    title: {
        marginBottom: 48,
    },
    input: {
        marginVertical: 8,
    },
    loginButton: {
        marginVertical: 32,
    },
});

export default SignUpScreen;