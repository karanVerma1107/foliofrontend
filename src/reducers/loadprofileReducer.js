import { LOAD_USER_PROFILE_REQUEST,
    LOAD_USER_PROFILE_SUCCESS,
    LOAD_USER_PROFILE_FAILURE
 } from "../constants/userprofile";




const initialState = {
    loading: false,
    User: null,
    followersCount: 0,
    followingCount:0,
    Isauth: false,
    error: null,
    success: false
}

export const loadselfReducer = (state = initialState, action) => {
switch (action.type) {
    case LOAD_USER_PROFILE_REQUEST:
        return{
            loading: true,
            error: null,
            Isauth: false,
            User:null,
            success: false
        }

    case LOAD_USER_PROFILE_SUCCESS:
        return{
            loading: false,
            error: null,
            
            followersCount: action.payload.followerscount,
            followingCount: action.payload.followingCount,
            User: action.payload.User,
            Isauth: true,
            success: true
        }    

    case LOAD_USER_PROFILE_FAILURE:
        return{
            loading: false,
            Isauth: false,
            error: action.payload,
            User:null,
            success: false
        }    
        
    

    default:
        return state
}
}