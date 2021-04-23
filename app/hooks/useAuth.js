import axios from 'axios';
import React from 'react';
import { BASE_URL } from '../config';
import { createAction } from '../utils/CreateAction';



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
                axios.get(`${BASE_URL}/users/email/${username}`, {
                headers: {
                Authorization: `bearer ${data.token}`,
                }})
                .then (res => {                    
                    const user = {
                        username: res.data.email,
                        id: res.data.id,
                        token: data.token,
                    };
                    dispatch(createAction('SET_USER', user));
                })
            })
            .catch(function (error) {
            });
        },
        signOut: async () => {
            dispatch(createAction('REMOVE_USER'));
        },
        signUp: async (username, password) => {
            axios.post(`${BASE_URL}/register`, {
            username: username,
            password: password,
            })
            .then( () => {
                axios.post(`${BASE_URL}/authenticate`, {
                username: username,
                password: password,
                })
                .then ( ({data} ) => {   
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
                        const user = {
                            username: username,
                            id: res.data,
                            token: data.token,
                    };
                    dispatch(createAction('SET_USER', user));
                })
                .catch(function (error) {
                    console.log(error.response.data.message);
                });
                })
                .catch(function (error) {
                });
            })
            .catch(function (error) {
            });
        }
        }),
        [],
    );
    return {auth, state};
}