import axios from "axios";
import { LOAD_USER_PROFILE_REQUEST,
    LOAD_USER_PROFILE_SUCCESS,
    LOAD_USER_PROFILE_FAILURE,
    EDIT_DP_REQUEST,
    EDIT_DP_SUCCESS,

    EDIT_DP_FAILURE
 } from "../constants/userprofile";

 export const profileloader = ()=>async(dispatch)=>{
    try {
        dispatch({type: LOAD_USER_PROFILE_REQUEST});

        const response = await axios.get('/api/v1/me');
        

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
 

    export const editDp = (file)=>async(dispatch)=>{
         console.log('your file is: ', file);
       try {
        dispatch({type: EDIT_DP_REQUEST})

        const config = {headers: {'Content-Type' : 'multipart/form-data'}}
        const response = await axios.post('/api/v1/setProfile', file , config);

        const message = response.data.message;

        dispatch({type: EDIT_DP_SUCCESS,
            payload: message
        });
       } catch (error) {

        let errormess
        if(error.response && error.response.data){
            errormess = error.response.data.message || 'something went wrong'
        }else{
            errormess = error.message
        }
        
                dispatch({type: EDIT_DP_FAILURE,
                    payload: errormess
                })
    
        
       }
    }