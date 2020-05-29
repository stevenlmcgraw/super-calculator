import { combineReducers } from 'redux'
import formulaReducer from './formulaReducer';

const rootReducer = combineReducers({
    formulas: formulaReducer
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer;