import axios from 'axios'
import { CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS,
    CREATE_POST_FAILURE,
    GET_ALL_POSTS_FAILURE,
     GET_ALL_POST_REQUEST,
      GET_ALL_POST_SUCCESS,
       GIVE_POST_LIKE_REQUEST,
        GIVE_POST_LIKE_FAILURE,
         GIVE_POST_LIKE_SUCCESS } from '../constants/Postconstant.js'


//get all posts
export const allpostsaction =  ()=>async(dispatch)=>{
    try {
        dispatch({type:GET_ALL_POST_REQUEST})

        const response = await axios.post('/api/v1/getAllPost');
        const posts = response.data.posts
        
        dispatch({type: GET_ALL_POST_SUCCESS, payload: posts});
    } catch (error) {
        dispatch({type: GET_ALL_POSTS_FAILURE,
            payload: error.response.data.message
        })
    }
}

//like-dislike function
export const likedislike = (postId)=>{
    return async (dispatch)=>{
        dispatch({type: GIVE_POST_LIKE_REQUEST});
        try {
            const response = await axios.post(`/api/v1/likepost/${postId}`);

            

            dispatch({
                type: GIVE_POST_LIKE_SUCCESS,
                 payload:{
                     message: response.data.message,
                 }
            });
        } catch (error) {
            console.log('error is: ', error)
            dispatch({type: GIVE_POST_LIKE_FAILURE,
                payload: error.response ? error.response.data.message : 'An error occured'
            })
        }
    }

}




//to add a post
export const addApostAction = (postdata, fileImage)=>async(dispatch)=>{
    try {
    
        dispatch({type: CREATE_POST_REQUEST});
        const config = {headers: {'Content-Type' : 'multipart/form-data'}}

        const response = await axios.post('api/v1/addPost' , postdata, fileImage, config);

        const message = response.data.message;

        dispatch({type: CREATE_POST_SUCCESS, 
            payload: message});


        
    } catch (error) {
        let errormess
        if(error.response && error.response.data){
            errormess = error.response.data.message || 'something went wrong'
        }else{
            errormess = error.message
        }
        
                dispatch({type: CREATE_POST_FAILURE,
                    payload: errormess
                })
    
        
       }
    }
