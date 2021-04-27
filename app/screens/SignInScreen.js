import React from 'react';
import { StyleSheet, Text, Image } from 'react-native';
import { ScreenContainer } from 'react-native-screens';
import { FilledButton } from '../components/FilledButton';
import { Heading } from '../components/Heading';
import { Input } from '../components/Input';
import { Loading } from '../components/Loading';
import { TextButton } from '../components/TextButton';
import { AuthContext } from '../context/AuthContext';
import NotificationPopup from 'react-native-push-notification-popup';
import {showPopUp, customPopup} from "../components/PopUp";

const SignInScreen = (props) => {
    
    const [username, setUsername] = React.useState('rumeysa');
    const [password, setPassword] = React.useState('ali');
    const [loading, setLoading] = React.useState(false);
    

    const { auth : {signIn}} = React.useContext(AuthContext);

    return (  
        
        <ScreenContainer style={styles.container}>
            <Heading style={styles.title}>Sign In</Heading>
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
                title={'Sign In'}
                style={styles.loginButton}
                onPress={async () => {
                    try {
                      let res = await signIn(username, password);
                      console.log( res)
                    //   showPopUp('#FFE9AF',  'My Title', res, 5000)
                      
                    } catch (e) {
                        console.log(e)
                    }
                }}
            />
            <TextButton
                title={'You Don\'t Have an account? Create one'}
                onPress={() => {
                    props.navigation.navigate("SignUp")
                }}
            />
            {/* {username == '' || password == '' ? <Text></Text> : */}
            {/* <NotificationPopup */}
                {/* ref={ref => this.popup = ref} */}
                {/* renderPopupContent={customPopup} */}
                {/* shouldChildHandleResponderStart={false/*only make it true if you put a button inside pop-up*/} 
                {/* shouldChildHandleResponderMove={false/*only make it true if you put a button inside pop-up*/}  
            {/* />} */}
        </ScreenContainer>
    );
}


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

export default SignInScreen;