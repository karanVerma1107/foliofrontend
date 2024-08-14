import { SEND_LOGIN_OTP_REQUEST, 
    SEND_LOGIN_OTP_SUCCESS,
     SEND_LOGIN_OTP_FAIL,
      GET_LOGIN_REQUEST, 
      GET_LOGIN_SUCCESS, 
      GET_LOGIN_FAIL, 
      GET_USERSELF_REQUEST, 
      GET_USERSELF_SUCCESS, 
      GET_USERSELF_FAILURE,
    GET_FRESH_SIGNUP_OTP_REQUEST,
    GET_FRESH_SIGNUP_OTP_SUCCESS,
    GET_FRESH_SIGNUP_OTP_FAILURE,
    GET_FRESH_SIGNUP_SUCCESS,
    GET_FRESH_SIGNUP_REQUEST,
    GET_FRESH_SIGNUP_FAILURE
 } from "../constants/authConstants";

const initialstate1 = {
    loading: false,
    message: null,
    success:false,
    error:null
}

export const loginotp = (state = initialstate1, action)=>{
    switch (action.type) {
        case SEND_LOGIN_OTP_REQUEST:
            return{
                ...state,
                success:false,
                loading: true,
                message:null,
                error:null
            }
            
        case SEND_LOGIN_OTP_SUCCESS:
            return{
                ...state,
                success:true,
                loading: false,
                message: action.payload.message,
                error:null
            }
        case SEND_LOGIN_OTP_FAIL:
            return{
                ...state,
                loading: false,
                success: false,
                error: action.payload,
                message: null
            }    
    
        default:
          return state
    }
}




const initialstate2 = {
    Loading: false,
    Message: null,
    Success:false,
    Error:null
}

export const surflogin = (state = initialstate2, action)=>{
    switch (action.type) {
        case GET_LOGIN_REQUEST:
            return{
                ...state, 
                Success: false,
                Message: null,
                Error:null,
                Loading: true
            } 

        case GET_LOGIN_SUCCESS:
            return{
                ...state,
                Success: true,
                Message: action.payload.message,
                Error: null,
                Loading: false,
                user: action.payload.user
            }    

        case GET_LOGIN_FAIL:
            return{
                ...state,
                Success:false,
                Loading: false,
                Error: action.payload,
                Message: null
            }    
    
        default:
            return state
        }
}

//get user from midleware
const initialstate3 = {
    LOading: false,
    isAuthenticated: false,
    SUccess:false,
    ERror:null
}
export const getuserdetails = (state = initialstate3, action )=>{
    switch (action.type) {
        case GET_USERSELF_REQUEST:
            return{
                ...state,
                LOading: true,
                isAuthenticated: false,
                ERror: null,
                SUccess: false
            } 

        case GET_USERSELF_SUCCESS:
            return{
                ...state,
                LOading: false,
                ERror: null,
                Success: true,
                isAuthenticated: true,
                followerscount: action.payload.followerscount,
      followingCount: action.payload.followingCount,
      User: action.payload

            }    
            
        case GET_USERSELF_FAILURE:
            return{
                ...state,
                LOading: false,
                ERror: action.payload,
                isAuthenticated: false,
                SUccess: false
            }    
    
        default:
            return state;
    }
}


//get signup otp
const initialstate4 = {
    Meessage: null,
    errorr: null,
    suucess: false,
    loadding : false
}

export const signupotp = (state = initialstate4, action)=>{
    switch (action.type) {
        case GET_FRESH_SIGNUP_OTP_REQUEST:
            return{
                ...state,
                Meessage: null,
                errorr: null,
                loadding: true,
                suucess: false,
            }

        case GET_FRESH_SIGNUP_OTP_SUCCESS:
            return{
                ...state,
                suucess: true,
                Meessage: action.payload.message,
                errorr: null,
                loadding: false
            }    
        case GET_FRESH_SIGNUP_OTP_FAILURE:
            return{
                ...state,
                Meessage: null,
                errorr: action.payload,
                loadding:false,
                suucess: false,
            }
    
        default:
            return state
    }
}

//reducer for signup
const initialstate5 = {
    Meess: null,
    errR: null,
    suuS: false,
    loaddinG : false
}

export const signup = (state = initialstate5, action)=>{
    console.log("action reciebbed")
    switch (action.type) {
        case GET_FRESH_SIGNUP_REQUEST:

            return{
                ...state,
                Meess: null,
                errR: null,
                loaddinG: true,
                suuS: false,
            }

        case GET_FRESH_SIGNUP_SUCCESS:
            console.log('signup success')
            return{
                ...state,
                suuS: true,
                Meess: action.payload.message,
                errR: null,
                loaddinG: false
            }    
        case GET_FRESH_SIGNUP_FAILURE:
            console.log('signup fail')
            return{
                ...state,
                Meess: null,
                errR: action.payload,
                loaddinG:false,
                suuS: false,
            }
    
        default:
            return state
    }
}

