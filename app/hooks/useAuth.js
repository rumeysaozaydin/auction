import axios from 'axios';
import React from 'react';
import { BASE_URL } from '../config';
import { createAction } from '../utils/CreateAction';
import { Text, View, Button, Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

export function useAuth() {
    const [state, dispatch] = React.useReducer(
        (state, action) => {
        switch (action.type) {
            case 'SET_USER':
            return {
                ...state,
                user: {...action.payload},
            };
            case 'REMOVE_USER':
            return {
                ...state,
                user: undefined,
            };
            case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload,
            };
            default:
            return state;
        }
        },
        {
        user: undefined,
        loading: true,
        },
    );
    
    async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            console.log('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        
        console.log(token);
        } else {
        console.log('Must use physical device for Push Notifications');
        }
    
        if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
        }
        return token;
    }

    const register = async (username,password) => {
        return axios.post(`${BASE_URL}/register`, {
            username: username,
            password: password,
        })
    }

    const authenticate = async (username,password) => {
        return axios.post(`${BASE_URL}/authenticate`, {
            username: username,
            password: password,
        })
    }

    const createUser = async (username,password,firstname, lastname, contactNumber, token) => {
        let pushToken = await registerForPushNotificationsAsync()
        console.log("RES 0 " ,pushToken)
        var postData = {
            contactNumber: contactNumber,
            firstname: firstname,
            imagePath: 'string',
            lastname: lastname,
            pushToken: pushToken,
            email: username,
            password: password
        }
        return axios.post(`${BASE_URL}/users`, postData, {
            headers: {
            Authorization: `bearer ${token}`,
            },
        })
    }

    const setUserState = (username,id,token) => {
        const user = {
            username: username,
            id: id,
            token: token,
        };
        dispatch(createAction('SET_USER', user));
    }

    const getUserDetail = async (username, token) => {
        return axios.get(`${BASE_URL}/users/email/${username}`, {
            headers: {
                Authorization: `bearer ${token}`,
            }
        })
    }

    const auth = React.useMemo(
        () => ({
            signIn: async (username, password) => {
                let res = 'Başarılı';
                await authenticate(username,password).then( ({data}) => {
                    getUserDetail(username, data.token).then (res => {                    
                        setUserState(username,res.data.id, data.token)
                        res='Başarılı'
                    })
                    .catch (e => {
                        res='Böyle bir kullanıcı bulunmuyor!'
                        console.log("User Detail ERROR", e);
                    })
                })
                .catch (e => {
                    res='Email veya şifre hatalı!'
                    console.log("Auth ERROR", e);
                })
                return res
            },
            signOut: async () => {
                dispatch(createAction('REMOVE_USER'));
            },
            signUp: async (username, password, firstname, lastname, contactNumber) => {
                let res = 'Başarılı';

                await register(username,password).then( () => {
                    authenticate(username,password).then ( async  ({data}) => { 
                        createUser(username,password,firstname, lastname, contactNumber, data.token).then (res => {
                            setUserState(username,res.data,data.token)
                            res='Başarılı'
                        })
                        .catch (e => {
                            console.log("Create User ERROR", e);
                            console.log("")
                            res="Kullanıcı adı başka bir kullanıcı tarafından kullanılıyor"
                        })
                    })
                    .catch (e => {
                        console.log("Auth ERROR", e);
                        res="Kullanıcı adı başka bir kullanıcı tarafından kullanılıyor"
                    })
                })
                .catch (e => {
                    console.log("Register User ERROR", e);
                    res="Kullanıcı adı başka bir kullanıcı tarafından kullanılıyor"
                })
                return res
            }
        }),[],
    );

    return {auth, state};
}