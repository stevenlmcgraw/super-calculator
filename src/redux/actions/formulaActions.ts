import axios from 'axios';
import { Dispatch } from 'react';
import { ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {Formula} from '../reducers/formulaReducer';

const LOCAL_API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:9191';
//const CLOUD_API_URL = 'http://saturn-hotdog-super-calculator-backend.cfapps.io';

interface IFetchFormulas {
    readonly type: 'FETCH_FORMULAS';
}

interface IFetchedFormulas {
    readonly type: 'FETCHED_FORMULAS';
    payload: any;
}

const apiClient = axios.create({
    baseURL: LOCAL_API_URL,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json'
    }
  });

export const fetchFormulaList: 
    ActionCreator<ThunkAction<Promise<void>,
    Formula[],
    null,
    IFetchFormulas>> = () => {
    return (dispatch: Dispatch<FormulaActions>) => {
          
            return apiClient.get('/formulas')
            .then(({ data }) => {
                dispatch({
                    type: 'FETCHED_FORMULAS',
                    payload: data
                })
                console.log('Inside fetch');
            })
            .catch(error => {
                console.log('error')
                //console.log(error.response.status);
            })           
    }
}

export type FormulaActions = 
| IFetchFormulas
| IFetchedFormulas
