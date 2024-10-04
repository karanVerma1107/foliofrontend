import axios from "axios";
import { LOAD_USER_PROFILE_REQUEST,
    LOAD_USER_PROFILE_SUCCESS,
    LOAD_USER_PROFILE_FAILURE
 } from "../constants/userprofile";

 export const profileloader = ()=>async(dispatch)=>{
    try {
        dispatch({type: LOAD_USER_PROFILE_REQUEST});

        const response = await axios.get('/me');
        const data =  response.data.User;

        console.log(`data for profile is:`, data);

        dispatch({type: LOAD_USER_PROFILE_SUCCESS,
            payload: data
        })
    } catch (error) {
        let errormess
        if(error.response && error.response.data){
            errormess = error.response.data.message || 'something went wrong'
        }else{
            errormess = error.message
        }
        
                dispatch({type: LOAD_USER_PROFILE_FAILURE,
                    payload: errormess
                })
    
    }
    }
 