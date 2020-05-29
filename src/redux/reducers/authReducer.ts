import { authActions } from '../actions/authActions';

export type LoginRequest = {
    accessToken: string
    tokenType: string
}

type LoginRequestState = {
    accessToken: string
    tokenType: string
}

const initialState = {
    accessToken: "",
    tokenType: ""
}

const loginRequestReducer = 
(state: LoginRequestState = initialState, action: authActions) => {
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

export default loginRequestReducer;