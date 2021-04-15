import React from 'react';
import axios from 'axios';

import {AuthContext} from '../context/AuthContext';
import {BASE_URL} from '../config/index';

export function usePost(endpoint, body, initialValue = []) {
  const { user : {token}} = React.useContext(AuthContext);
  const [data, setData] = React.useState(initialValue);
  React.useEffect(() => {
    axios
      .post(`${BASE_URL}${endpoint}`, body, {
        headers: {
          Authorization: `bearer ${token}`
        },
      })
      .then(({data}) => {
        console.log("INSIDE USEPOST THEN")

        setData(data);

        console.log(data)
      })
      .catch(function (error) {
          console.log("INSIDE USEPOST CATCH")
          console.log(error.message);
      });
  }, [token, endpoint]);
  return data;
}