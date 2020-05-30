import { authActions } from '../actions/authActions';

type authState = {
    accessToken: string
    tokenType: string
}

const initialState: authState = {
    accessToken: "",
    tokenType: ""
}

const authReducer = 
(state: authState = initialState, action: authActions) => {
    switch(action.type) {
        case 'LOGIN_COMPLETE':
            return {
                ...state,
                accessToken: action.payload.accessToken,
                tokenType: action.payload.tokenType
            }
        
        default:
            return state;
    }
}

export default authReducer;