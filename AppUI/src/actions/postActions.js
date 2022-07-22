import { 
    POST_FIND_ALL
} from './types';

import webConfig  from '../GlobalConfig';

import axios from 'axios';

export const postsFindAll = (name = "") => async dispatch => {
    
    const query = {};

    await axios.get(webConfig.urlBaseAPI + `/api/posts`, query ,{
        headers: {
          'Content-Type': 'application/json',
        }
      })
    .then(response => {
        //console.log(response);
        
        dispatch({
            type: POST_FIND_ALL,
            payload: response.data
        });

    }).catch(error => {
        console.log(error);

        dispatch({
            type: POST_FIND_ALL,
            payload: null
        });

    });
}