import { combineReducers } from 'redux'
import formulaReducer from './formulaReducer';
import loginRequestReducer from './loginRequestReducer';

const rootReducer = combineReducers({
    formulas: formulaReducer,
    accessToken: loginRequestReducer,
    tokenType: loginRequestReducer
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer;