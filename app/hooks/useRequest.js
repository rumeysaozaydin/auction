import React from 'react';
import axios from 'axios';

import {AuthContext} from '../context/AuthContext';
import {BASE_URL} from '../config/index';

export function useRequest(reqType, endpoint, token, {body, setState,callback}={}) {
    body = body || undefined
    setState = setState || undefined
    callback = callback || (() => {})

    requestFunction = undefined
    switch (reqType) {
        case 'GET':
            requestFunction = axios.get
            break;
        case 'POST':
            requestFunction = axios.post
            break;
        case 'DELETE':
            requestFunction = axios.delete
            break;
        default:
            return
    }

    let response = undefined
    if (reqType === 'POST'){
        response = requestFunction(`${BASE_URL}${endpoint}`,body, {
            headers: {
              Authorization: `bearer ${token}`
            },
        })
    }
    else {
        response = requestFunction(`${BASE_URL}${endpoint}`, {
            headers: {
              Authorization: `bearer ${token}`
            },
        })
    }
    response
      .then(({data}) => {
        console.log('THEN', reqType, endpoint)
        if(setState){
            setState(data);
        }
        callback();
      })
      .catch(function (error) {
          console.log('ERROR' , reqType, endpoint, error.message);
      });
}