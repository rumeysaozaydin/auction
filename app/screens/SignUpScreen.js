import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ScreenContainer } from 'react-native-screens';
import { FilledButton } from '../components/FilledButton';
import { Heading } from '../components/Heading';
import { Input } from '../components/Input';
import { Loading } from '../components/Loading';
import { TextButton } from '../components/TextButton';
import { AuthContext } from '../context/AuthContext';
import { showMessage, hideMessage } from "react-native-flash-message";
import {shade1, shade2, shade3, shade4, shade5, shadeTrans} from "../config/color"



const SignUpScreen = (props) => {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [firstname, setFirstname] = React.useState('');
    const [lastname, setLastname] = React.useState('');
    const [contactNumber, setContactNumber] = React.useState('');

    const {auth : {signUp}} = React.useContext(AuthContext);

    return (
        <ScreenContainer style={styles.container}>
            <Heading style={styles.title}>Kayıt Ol</Heading>
            <Input
                style={styles.input}
                placeholder={'Email'}
                value={username}
                onChangeText={setUsername}
            />
            <Input
                style={styles.input}
                placeholder={'Şifre'}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Input
                style={styles.input}
                placeholder={'Isim'}
                value={firstname}
                onChangeText={setFirstname}
            />
            <Input
                style={styles.input}
                placeholder={'Soyisim'}
                value={lastname}
                onChangeText={setLastname}
            />
            <Input
                style={styles.input}
                placeholder={'Telefon Numarası'}
                value={contactNumber}
                onChangeText={setContactNumber}
            />
            <FilledButton
                title={'Üye Ol'}
                style={styles.loginButton}
                onPress={async () => {
                    try {
                        let res = await signUp(username, password, firstname, lastname, contactNumber);
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
                title={'Zaten üyeliğin var mı? Giriş Yap!' }
                onPress={() => {
                    props.navigation.navigate("SignIn")
                }}
            />
            
        </ScreenContainer>
    );
    
    
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 60,
        alignItems: 'center',
        backgroundColor: shade1
    },
    title: {
        marginBottom: 48,
    },
    input: {
        marginVertical: 8,
        backgroundColor: shadeTrans,
        color: shade5
    },
    loginButton: {
        marginVertical: 32,
    },
});

export default SignUpScreen;