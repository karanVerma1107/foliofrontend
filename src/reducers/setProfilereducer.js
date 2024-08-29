import { IS_USERNAME_AVIALABLE_REQUEST, 
    IS_USERNAME_AVIALABLE_SUCCESS,
     IS_USERNAME_AVIALABLE_FAILURE, 
    IS_USERNAME_DONE_REQUEST,
IS_USERNAME_DONE_SUCCESS,
IS_USERNAME_DONE_FAILURE } from "../constants/editprofile.js";

// to verify if username is valid or not
const initial1={
loading: false,
success: false,
message: null,
error:null
}

export const isAvialablereducer = (state = initial1, action)=>{
switch (action.type) {
    case IS_USERNAME_AVIALABLE_REQUEST:
        return{
            ...state,
            message: null,
            loading: true,
            success:false,
            error:null
        }
        
      case IS_USERNAME_AVIALABLE_SUCCESS:
        return{
            ...state,
            loading:false,
            success:true,
            error:null,
            message: action.payload.entry
        }

        case IS_USERNAME_AVIALABLE_FAILURE:
            return{
                ...state,
                loading: false,
                message: null,
                success: false,
                error: action.payload
            }



    default:
        return state;
}
}


// to set the username
const initial2 = {
    Loading: false,
Success: false,
Message: null,
Error:null
}

export const setuserreducer = (state = initial2, action)=>{
switch (action.type) {
    case IS_USERNAME_DONE_REQUEST:
        return{
            ...state,
            Loading: true,
            Success: false,
            Message: null,
            error: null
        }

     case IS_USERNAME_DONE_SUCCESS:
            return{
                ...state,
                Loading: false,
                Success: true,
                Message: action.payload.message,
                error: null
            }

     case IS_USERNAME_DONE_FAILURE:
                return{
                    ...state,
                    Loading: false,
                    Success: false,
                    Message: null,
                    error: action.payload
                }
        
    

    default:
        return state;
}
}