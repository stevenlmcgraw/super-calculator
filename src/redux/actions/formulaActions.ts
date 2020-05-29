import axios from 'axios';
import { Dispatch } from 'react';
import { ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {Formula} from '../reducers/formulaReducer';

const LOCAL_API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:9191';
const CLOUD_API_URL = 'http://saturn-hotdog-super-calculator-backend.cfapps.io';

interface IFetchFormulas {
    readonly type: 'FETCH_FORMULAS';
    payload: any;
}

interface IFetchedFormulas {
    readonly formulaList: Formula[]
}

const apiClient = axios.create({
    baseURL: LOCAL_API_URL,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json'
    }
  });

// export const fetchFormulaList = () => {
//     return async (dispatch: Dispatch<FormulaActions>) => {
//         return 
//             await apiClient.get('/formulas')
//             .then(({ data }) => {
//                 dispatch({
//                     type: 'ON_SUCCESS',
//                     payload: data
//                 })
//                 console.log('Inside fetch')
//             })
//             .catch(error => {
//                 console.log(error.response.status)
//             })           
//     }
// }


// export const fetchFormulaList = () => {
//     return async (dispatch: Dispatch<FormulaActions>) => {
          
//             await apiClient.get('/formulas')
//             .then(({ data }) => {
//                 dispatch({
//                     type: 'FETCH_FORMULAS',
//                     payload: data
//                 })
//                 console.log('Inside fetch');
//             })
//             .catch(error => {
//                 console.log(error.response.status);
//             })           
//     }
// }

export const fetchFormulaList: 
    ActionCreator<ThunkAction<Promise<IFetchedFormulas>,
    Formula[],
    null,
    IFetchFormulas>> = () => {
    return async (dispatch: Dispatch<FormulaActions>) => {
          
            await apiClient.get('/formulas')
            .then(({ data }) => {
                dispatch({
                    type: 'FETCH_FORMULAS',
                    payload: data
                })
                console.log('Inside fetch');
            })
            .catch(error => {
                console.log(error.response.status);
            })           
    }
}

export type FormulaActions = 
| IFetchFormulas
| IFetchedFormulas