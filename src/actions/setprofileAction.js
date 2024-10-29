
import { IS_USERNAME_AVIALABLE_REQUEST, 
    IS_USERNAME_AVIALABLE_SUCCESS,
     IS_USERNAME_AVIALABLE_FAILURE,
    IS_USERNAME_DONE_REQUEST,
IS_USERNAME_DONE_SUCCESS,
IS_USERNAME_DONE_FAILURE } from "../constants/editprofile.js"

import { USER_CONNECT_REQ,
    USER_CONNECT_SUCCESS,
    USER_CONNECT_FAIL
 } from "../constants/connect.js";

 import axiosInstance from "../../axiosInstance.js";

import axios from "axios";

// to check if username is avaialable or not
export const isusernamedoit = (username)=>async(dispatch)=>{
    try {
        dispatch({type: IS_USERNAME_AVIALABLE_REQUEST});
        const config = {headers: {'Content-Type' : 'application/json'}}

        const respone = await axiosInstance.post('/api/v1/useravia', { username }, config);

        dispatch({type: IS_USERNAME_AVIALABLE_SUCCESS,
            payload:{
                entry: respone.data.message
            }
        });
    } catch (error) {
        let errormess
        if(error.response && error.response.data){
            errormess = error.response.data.message || 'something went wrong'
        }else{
            errormess = error.message
        }
        
                dispatch({type: IS_USERNAME_AVIALABLE_FAILURE,
                    payload: errormess
                })
    
    }
}



// to set username 
export const setusername = (username)=>async(dispatch)=>{
    try {
        dispatch({type: IS_USERNAME_DONE_REQUEST});
        const config = {headers: {'Content-Type' : 'application/json'}}

        const respone = await axiosInstance.post('/api/v1/setUserName', { username }, config);

        dispatch({type: IS_USERNAME_DONE_SUCCESS,
            payload:{
                message: respone.data.message
            }
        });
    } catch (error) {
        let errormess
        if(error.response && error.response.data){
            errormess = error.response.data.message || 'something went wrong'
        }else{
            errormess = error.message
        }
        
                dispatch({type: IS_USERNAME_DONE_FAILURE,
                    payload: errormess
                })
    
    }
}



export const ConnectUser = (username) => async (dispatch) => {
    dispatch({ type: USER_CONNECT_REQ });

    try {
    
        const response = await axiosInstance.put(`/api/v1/connect/${username}`); // Adjust the URL as necessary
        const message = response.data.message; // Destructure the data from the response

        dispatch({ type: USER_CONNECT_SUCCESS, payload: message});
    } catch (error) {
        let errormess
        if(error.response && error.response.data){
            errormess = error.response.data.message || 'something went wrong'
        }else{
            errormess = error.message
        }
        
                dispatch({type: USER_CONNECT_FAIL,
                    payload: errormess
                })
    }
};