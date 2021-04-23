import React from 'react';
import { StyleSheet } from 'react-native';
import { ScreenContainer } from 'react-native-screens';
import { FilledButton } from '../components/FilledButton';
import { Heading } from '../components/Heading';
import { Input } from '../components/Input';
import { Loading } from '../components/Loading';
import { TextButton } from '../components/TextButton';
import { AuthContext } from '../context/AuthContext';

const SignUpScreen = (props) => {

    const [username, setUsername] = React.useState('ali');
    const [password, setPassword] = React.useState('ali');
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
                        await signUp(username, password);
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