import axios from 'axios'
import { GET_ALL_POSTS_FAILURE, GET_ALL_POST_REQUEST, GET_ALL_POST_SUCCESS, GIVE_POST_LIKE_REQUEST, GIVE_POST_LIKE_FAILURE, GIVE_POST_LIKE_SUCCESS } from '../constants/Postconstant.js'


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