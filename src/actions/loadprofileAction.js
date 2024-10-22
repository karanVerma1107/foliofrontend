import axios from "axios";
import { LOAD_USER_PROFILE_REQUEST,
    LOAD_USER_PROFILE_SUCCESS,
    LOAD_USER_PROFILE_FAILURE,
    EDIT_DP_REQUEST,
    EDIT_DP_SUCCESS,

    EDIT_DP_FAILURE,
    
 } from "../constants/userprofile";

import { OBJECT_EDIT_REQUEST,
    OBJECT_EDIT_SUCCESS,
    OBJECT_EDIT_FAILURE,
    STACK_EDIT_REQUEST,
    STACK_EDIT_SUCCESS,
    STACK_EDIT_FAILURE
 } from "../constants/editprofile";


 //load the user 
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
 

    //edit profile picture
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


//edit objects 
export  const editstkaction =  (profileData)=> async(dispatch)=>{

    try {

        dispatch({type: STACK_EDIT_REQUEST})
        const config =  { headers:{ 'Content-Type' : 'application/json'}}

        const response = await axios.patch('api/v1/updateProfile', profileData, config);

        const message = response.data.message;

        dispatch({type: STACK_EDIT_SUCCESS , payload: message})

        
    } catch (error) {
        let errormess
        if(error.response && error.response.data){
            errormess = error.response.data.message || 'something went wrong'
        }else{
            errormess = error.message
        }
        
                dispatch({type: STACK_EDIT_FAILURE,
                    payload: errormess
                })
    
        
       }
    }
   


    //edit stacks
    export  const editObjaction =  (profileData)=> async(dispatch)=>{

        try {
    
            dispatch({type: OBJECT_EDIT_REQUEST})
            const config =  { headers:{ 'Content-Type' : 'application/json'}}
    
            const response = await axios.patch('api/v1/editbj', profileData, config);
    
            const message = response.data.message;
    
            dispatch({type: OBJECT_EDIT_SUCCESS , payload: message})
    
            
        } catch (error) {
            let errormess
            if(error.response && error.response.data){
                errormess = error.response.data.message || 'something went wrong'
            }else{
                errormess = error.message
            }
            
                    dispatch({type: OBJECT_EDIT_FAILURE,
                        payload: errormess
                    })
        
            
           }
        }
       

        export const clearProfileField = async (field) => {
            try {

                const config =  { headers:{ 'Content-Type' : 'application/json'}}
                const response = await axios.delete('/api/v1/clearData', { data : {field}}, config );
                return response.data; // Return the response data
            } catch (error) {
                throw error.response.data; // Handle errors appropriately
            }
        };



        export const logout = async()=>{
            const response = await axios.post('/api/v1/logout');
            console.log(response.data);
        }