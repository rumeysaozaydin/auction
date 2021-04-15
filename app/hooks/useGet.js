import React from 'react';
import axios from 'axios';

import {AuthContext} from '../context/AuthContext';
import {BASE_URL} from '../config/index';

export function useGet(endpoint, initialValue = []) {
  const { user : {token}} = React.useContext(AuthContext);
  const [data, setData] = React.useState(initialValue);
  React.useEffect(() => {
    axios
      .get(`${BASE_URL}${endpoint}`, {
        headers: {
          Authorization: `bearer ${token}`
        },
      })
      .then(({data}) => {
        console.log('ffd')

        setData(data);

        console.log(data)
      })
      .catch(function (error) {
          console.log("sfsfnsd")
          console.log(error.message);
      });
  }, [token, endpoint]);
  return data;
}