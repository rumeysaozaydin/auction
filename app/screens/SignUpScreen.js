import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { ScreenContainer } from 'react-native-screens';

const SignUpScreen = (props) => {

    const [username, setUsername] = React.useState(null);
    const [password, setPassword] = React.useState(null);

    const signUp = async () => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"username":username,"password":password});

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:8080/register", requestOptions)
        .then(response => response.json())
        .then(result =>  alert(result.username + " registered successfully.") ) 
        .catch(error =>  alert( JSON.stringify( "Could not register ") )) ;

    }

    return (
        <ScreenContainer>
            <Text>Enter Your Credentials to Sign Up</Text>
            <TextInput 
                style={{backgroundColor:"#b0e7f7"}} 
                placeholder="Enter Username" 
                onChangeText={(username) => setUsername(username)}>
            </TextInput>
            <TextInput 
                style={{backgroundColor:"#ffecc2"}} 
                placeholder="Enter Password"
                onChangeText={(password) => setPassword(password)}>
            </TextInput>
            <Button title="Sign Up" onPress={async () => {
                await signUp();
            }} />
        </ScreenContainer>
    );
};



const styles = StyleSheet.create({});

export default SignUpScreen;