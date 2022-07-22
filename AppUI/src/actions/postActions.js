import { 
    POST_FIND_ALL, POST_CREATE, POST_DELETE, POST_CLEAN_STATE
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

export const postCreate = (bodyData) => async dispatch => {
    
    const query = {
        ...bodyData
    };

    await axios.post(webConfig.urlBaseAPI + `/api/posts`, query ,{
        headers: {
          'Content-Type': 'application/json',
        }
      })
    .then(response => {
        //console.log(response);
        
        dispatch({
            type: POST_CREATE,
            payload: response.data
        });

    }).catch(error => {
        console.log(error);

        dispatch({
            type: POST_CREATE,
            payload: null
        });

    });
}

export const postDelete = (id) => async dispatch => {
    
    await axios.delete(webConfig.urlBaseAPI + `/api/posts/${id}`, {} ,{
        headers: {
          'Content-Type': 'application/json',
        }
      })
    .then(response => {
        //console.log(response);
        
        dispatch({
            type: POST_DELETE,
            payload: response.data
        });

    }).catch(error => {
        console.log(error);

        dispatch({
            type: POST_DELETE,
            payload: null
        });

    });
}

export const postCleanState = () => async dispatch => {
    dispatch({
        type: POST_CLEAN_STATE,
        payload: null
    });
}