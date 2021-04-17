import React from 'react';
import axios from 'axios';

import {AuthContext} from '../context/AuthContext';
import {BASE_URL} from '../config/index';

export  function useGet(endpoint, token, setState) {
  
    axios
      .get(`${BASE_URL}${endpoint}`, {
        headers: {
          Authorization: `bearer ${token}`
        },
      })
      .then(({data}) => {
        console.log('success');
        setState(data);
      })
      .catch(function (error) {
          console.log("Use get catch")
          console.log(error.message);
      });
  
}