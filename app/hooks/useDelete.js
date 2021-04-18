import React from 'react';
import axios from 'axios';

import {AuthContext} from '../context/AuthContext';
import {BASE_URL} from '../config/index';

export function useDelete(endpoint, token, setState=undefined,callback=undefined) {
 
    axios
      .delete(`${BASE_URL}${endpoint}`, {
        headers: {
          Authorization: `bearer ${token}`
        },
      })
      .then(({data}) => {
        if(setState){
            setState(data);
        }
        if(callback){
        callback();
        }
      })
      .catch(function (error) {
          console.log("INSIDE USEDELETE CATCH")
          console.log(error.message);
      });
}