import axios from "axios";
import { LOAD_USER_PROFILE_REQUEST,
    LOAD_USER_PROFILE_SUCCESS,
    LOAD_USER_PROFILE_FAILURE
 } from "../constants/userprofile";

 export const profileloader = ()=>async(dispatch)=>{
    try {
        dispatch({type: LOAD_USER_PROFILE_REQUEST});

        const response = await axios.get('api/v1/me');
        

        console.log('response is: ', response);

        dispatch({type: LOAD_USER_PROFILE_SUCCESS,
            payload: response.data
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
 