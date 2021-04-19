import React from 'react';
import { StyleSheet } from 'react-native';
import { ScreenContainer } from 'react-native-screens';
import { FilledButton } from '../components/FilledButton';
import { Heading } from '../components/Heading';
import { Input } from '../components/Input';
import { Loading } from '../components/Loading';
import { TextButton } from '../components/TextButton';
import { AuthContext } from '../context/AuthContext';

const SignInScreen = (props) => {
    
    const [username, setUsername] = React.useState('serdar');
    const [password, setPassword] = React.useState('ali');
    const [loading, setLoading] = React.useState(false);
    

    const { auth : {signIn}} = React.useContext(AuthContext);
    // const signIn = async () => {

    //     var myHeaders = new Headers();
    //     myHeaders.append("Content-Type", "application/json");

    //     var raw = JSON.stringify({"username":username,"password":password});

    //     var requestOptions = {
    //     method: 'POST',
    //     headers: myHeaders,
    //     body: raw,
    //     redirect: 'follow'
    //     };

    //     fetch("http://localhost:8080/authenticate", requestOptions)
    //     .then(response => response.json())
    //     .then(result =>  props.route.params.updateToken(result.token) ) 
    //     .catch(error =>  alert( JSON.stringify( 'errorAQQQ' ) )) ;
    // }

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
                      await signIn(username, password);
                    } catch (e) {
                        console.log('fdnjfkkmkfldm')
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
            <Loading loading={loading}/>
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