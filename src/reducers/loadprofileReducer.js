import { LOAD_USER_PROFILE_REQUEST,
    LOAD_USER_PROFILE_SUCCESS,
    LOAD_USER_PROFILE_FAILURE
 } from "../constants/userprofile";




const initialState = {
    Loading: false,
    output: null,
    error: null,
    success: false
}

export const loadselfReducer = (state = initialState, action) => {
switch (action.type) {
    case LOAD_USER_PROFILE_REQUEST:
        return{
            Loading: true,
            error: null,
            output: null,
            success: false
        }

    case LOAD_USER_PROFILE_SUCCESS:
        return{
            Loading: false,
            error: null,
            output: action.payload,
            success: true
        }    

    case LOAD_USER_PROFILE_FAILURE:
        return{
            Loading: false,
            error: action.payload,
            output: null,
            success: false
        }    
        
    

    default:
        return state
}
}