import { combineReducers } from 'redux'
import formulaReducer from './formulaReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
    formulas: formulaReducer,
    auth: authReducer,
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer;