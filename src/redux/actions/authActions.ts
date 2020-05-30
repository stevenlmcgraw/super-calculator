import axios from 'axios';
import { Dispatch } from 'react';
import { ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { LoginRequest } from '../reducers/authReducer';

//const LOCAL_API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:9191';
const CLOUD_API_URL = 'http://saturn-hotdog-super-calculator-backend.cfapps.io';

interface ILoginSubmit {
    readonly type: 'LOGIN_SUBMIT';
}

interface ILoginComplete {
    readonly type: 'LOGIN_COMPLETE';
    payload: any;
}

const apiClient = axios.create({
    baseURL: CLOUD_API_URL,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  export const postSiteUserLogin: 
  ActionCreator<ThunkAction<Promise<void>,
  LoginRequest,
  null,
  ILoginSubmit>> = (requestBody: any) => {
  return (dispatch: Dispatch<authActions>) => {
        
          return apiClient.post('/auth/login', requestBody)
          .then(({ data }) => {
              dispatch({
                  type: 'LOGIN_COMPLETE',
                  payload: data
              })
              console.log('Inside post');
          })
          .catch(error => {
              console.log('error')
              //console.log(error.response.status);
          })           
  }
}

export type authActions = 
| ILoginSubmit
| ILoginComplete