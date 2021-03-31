import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { ScreenContainer } from 'react-native-screens';

const SignInScreen = (props) => {
    
    const [username, setUsername] = React.useState(null);
    const [password, setPassword] = React.useState(null);

    const signIn = async () => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"username":username,"password":password});

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:8080/authenticate", requestOptions)
        .then(response => response.json())
        .then(result =>  props.route.params.updateToken(result.token) ) 
        .catch(error =>  alert( JSON.stringify( 'errorAQQQ' ) )) ;
    }

    return (
        <ScreenContainer>
            <Text>Please Enter Your Username and Password</Text>
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
            <Button title="Sign In" onPress={async () => {
                await signIn();
            }} />

            <Button title="Sign Up" onPress={() => props.navigation.push("SignUp")}/>
        </ScreenContainer>
    );
}


const styles = StyleSheet.create({});

export default SignInScreen;