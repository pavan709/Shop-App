import { LOGIN, SIGNUP, AUTHENTICATE, LOGOUT, SET_DID_TRY_AL} from "../actions/auth"

const initalState = {
    token: null,
    userId: null,
    didTryAutoLogin:false,
}

export default (state = initalState, action) => {
    switch(action.type){
        case "AUTHENTICATE":
            return {
                token:action.token,
                userId: action.userId,
                didTryAutoLogin:true,
            };
        case SET_DID_TRY_AL:
            return {
                ...state,
                didTryAutoLogin:true,
            }
        case LOGOUT:
            console.log('logout reducer')
            return  {
                ...initalState,
                didTryAutoLogin:true,
            };
        default:
            return state;
    }
}