import React from 'react';
import axios from 'axios';
import SecureStorage from 'react-native-secure-storage';

import {BASE_URL} from '../config';
import {createAction} from '../utils/CreateAction';
import {sleep} from '../utils/sleep';


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
    
    const auth = React.useMemo(
        
        () => ({
        signIn: async (username, password) => {
            axios.post(`${BASE_URL}/authenticate`, {
            username: username,
            password: password,
            })
            .then( ({data}) => {
                console.log("signin")
                axios.get(`${BASE_URL}/users/email/${username}`, {
                headers: {
                Authorization: `bearer ${data.token}`,
                }})
                .then (res => {
                    console.log("HERE")
                    
                    const user = {
                        username: res.data.email,
                        id: res.data.id,
                        token: data.token,
                    };
                    console.log(user.token)
                    dispatch(createAction('SET_USER', user));
                })
            })
            .catch(function (error) {
                console.log(error.message);
            });
        },
        signOut: async () => {
            console.log("sign Out")
            dispatch(createAction('REMOVE_USER'));
        
        },
        signUp: async (username, password) => {
            axios.post(`${BASE_URL}/register`, {
            username: username,
            password: password,
            })
            .then( () => {
                console.log("seredar")
                axios.post(`${BASE_URL}/authenticate`, {
                username: username,
                password: password,
                })
                .then ( ({data} ) => {   
                    console.log(data.token);  
                    var postData = {
                        contactNumber: '1232423432342',
                        firstname: 'alissds',
                        imagePath: 'string',
                        lastname: 'alisfsdfs',
                        email: username,
                        password: password
                    };     
                    axios.post(`${BASE_URL}/users`, postData, {
                        headers: {
                        Authorization: `bearer ${data.token}`,
                        },
                    }).then (res => {
                        console.log(res.data);
                        const user = {
                            username: username,
                            id: res.data,
                            token: data.token,
                    };
                    //console.log(user.token)
                    dispatch(createAction('SET_USER', user));
                    console.log("4")
                })
                .catch(function (error) {
                    console.log("3")
                    console.log(error.response.data.message);
                });
                })
                .catch(function (error) {
                console.log("2")
                console.log(error.message);
                });
            })
            .catch(function (error) {
                console.log("1")
                console.log(error.message);
            });
        }
        }),
        [],
    );
    return {auth, state};
}