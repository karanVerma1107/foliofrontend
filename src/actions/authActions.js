import { SEND_LOGIN_OTP_REQUEST, 
    SEND_LOGIN_OTP_SUCCESS,
     SEND_LOGIN_OTP_FAIL,
      GET_LOGIN_REQUEST,
       GET_LOGIN_SUCCESS,
        GET_LOGIN_FAIL, 
        GET_USERSELF_REQUEST,
         GET_USERSELF_SUCCESS,
         GET_FRESH_SIGNUP_OTP_REQUEST,
         GET_FRESH_SIGNUP_OTP_SUCCESS,
         GET_FRESH_SIGNUP_OTP_FAILURE ,
         GET_FRESH_SIGNUP_SUCCESS,
         GET_FRESH_SIGNUP_REQUEST,
         GET_FRESH_SIGNUP_FAILURE
        } from "../constants/authConstants";


        
import axios from 'axios';

//send login otp
export const sendloginotp = (Email)=>async(dispatch)=>{
    try {

        dispatch({type: SEND_LOGIN_OTP_REQUEST});

        const config = {headers: {'Content-Type' : 'application/json'}}
        console.log("email isisis :", Email);
        const response = await axios.post('/api/v1/loginOtp', {Email}, config);

        dispatch({type: SEND_LOGIN_OTP_SUCCESS,
            payload:{
                message:response.data.message
            }
        });
        
    } catch (error) {
let errormess
if(error.response && error.response.data){
    errormess = error.response.data.message || 'something went wrong'
}else{
    errormess = error.message
}

        dispatch({type: SEND_LOGIN_OTP_FAIL,
            payload: errormess
        })
    }
}



// get logined by verifying otp
export const logined = (Email, otp)=>async(dispatch)=>{
    try {
        dispatch({type: GET_LOGIN_REQUEST});
        const config = {headers: {'Content-Type' : 'application/json'}};

        const response = await axios.post('/api/v1//login', {Email, otp}, config);


        dispatch({type: GET_LOGIN_SUCCESS,
            payload:{
                message:response.data.message,
                user: response.data.User
            }
        });
 
        
    } catch (error) {
        let errormess
if(error.response && error.response.data){
    errormess = error.response.data.message || 'something went wrong'
}else{
    errormess = error.message
}

        dispatch({type: GET_LOGIN_FAIL,
            payload: errormess
        })
    }
} 


//get logined userdetails
export const userdetailsfetch = ()=>async(dispatch)=>{
    try {
        dispatch({type: GET_USERSELF_REQUEST});

        const response = await axios.get('/api/v1/me');

        dispatch({type: GET_USERSELF_SUCCESS,
            payload:{
                followerscount: response.data.followerscount,
                followingCount: response.data.followingCount,
                User: response.data.User
            }
        })

    } catch (error) {
        let errormess
        if(error.response && error.response.data){
            errormess = error.response.data.message || 'something went wrong'
        }else{
            errormess = error.message
        }
        
                dispatch({type: GET_LOGIN_FAIL,
                    payload: errormess
                })
    }
}


//get signup otp
export const getsignupotp = ( usedata )=>async(dispatch)=>{
    try {
        dispatch({type: GET_FRESH_SIGNUP_OTP_REQUEST});
        const config = {headers: {'Content-Type' : 'application/json'}};

        const response = await axios.post('/api/v1/sendOTP',usedata, config);

        dispatch({type: GET_FRESH_SIGNUP_OTP_SUCCESS,
            payload:{
                message: response.data.message
            }
        });

        console.log("function runned")
    } catch (error) {
        let errormess
        if(error.response && error.response.data){
            errormess = error.response.data.message || 'something went wrong'
        }else{
            errormess = error.message
        }
        
                dispatch({type: GET_FRESH_SIGNUP_OTP_FAILURE,
                    payload: errormess
                })
    }
}


// get fresh signup  success
export const freshsignup = (Email, otp)=>async(dispatch)=>{
try {
    dispatch({type: GET_FRESH_SIGNUP_REQUEST});
    const config = {headers: {'Content-Type' : 'application/json'}};
    const response = await axios.post("/api/v1/verifysignUpOtp", {Email,otp}, config);

    dispatch({type: GET_FRESH_SIGNUP_SUCCESS,
        payload:{
            message: response.data.message
        }
        
    });
    

    
} catch (error) {
    let errormess
    if(error.response && error.response.data){
        errormess = error.response.data.message || 'something went wrong'
    }else{
        errormess = error.message
    }
    
            dispatch({type: GET_FRESH_SIGNUP_FAILURE,
                payload: errormess
            })
}
}