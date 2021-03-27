import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { ScreenContainer } from 'react-native-screens';

const SignInScreen = ({navigation}) => {
    return (
        <ScreenContainer>
            <Text>Sign In Screen</Text>
            <Button title="Sign In" onPress={() => alert("todo")}/>
            <Button title="Sign Up" onPress={() => navigation.push("SignUp")}/>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({});

export default SignInScreen;