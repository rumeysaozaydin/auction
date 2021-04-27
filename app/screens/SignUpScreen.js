import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ScreenContainer } from 'react-native-screens';
import { FilledButton } from '../components/FilledButton';
import { Heading } from '../components/Heading';
import { Input } from '../components/Input';
import { Loading } from '../components/Loading';
import { TextButton } from '../components/TextButton';
import { AuthContext } from '../context/AuthContext';
import NotificationPopup from 'react-native-push-notification-popup';
import {showPopUp, customPopup} from "../components/PopUp";
import { showMessage, hideMessage } from "react-native-flash-message";


const SignUpScreen = (props) => {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const {auth : {signUp}} = React.useContext(AuthContext);

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
                    try {
                        let res = await signUp(username, password);
                        if(res != 'Başarılı'){
                            showMessage({
                                message: res,
                                type: "danger",
                            });
                        }
                    } catch (e) {
                        console.log(e)
                    }
                  }}
            />
            <TextButton
                title={'You Already Have an Account? Sign In' }
                onPress={() => {
                    props.navigation.navigate("SignIn")
                }}
            />
            {/* {username == '' || password == '' ? <Text></Text> :
            <NotificationPopup
                ref={ref => this.popup = ref}
                renderPopupContent={customPopup}
                shouldChildHandleResponderStart={false/*only make it true if you put a button inside pop-up
                shouldChildHandleResponderMove={false/*only make it true if you put a button inside pop-up
            />} */}
            
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