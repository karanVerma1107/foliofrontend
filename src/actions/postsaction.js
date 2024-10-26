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


import { GET_USER_POST_REQUEST,
    GET_USER_POST_SUCCESS,
    GET_USER_POST_FAILURE
 } from '../constants/Postconstant.js'         


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












export const addApostAction = (postdata, files) => async (dispatch) => {
    try {
        console.log('Files are:', files);
        dispatch({ type: CREATE_POST_REQUEST });
        
        const completeFormData = new FormData();

        // Append post data to completeFormData
        completeFormData.append('Category', postdata.get('Category'));
        completeFormData.append('Caption', postdata.get('Caption'));
        postdata.getAll('Links').forEach(link => completeFormData.append('Links', link));

        // Append all files to the completeFormData
        files.forEach(file => completeFormData.append('Files', file));

        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const response = await axios.post('api/v1/addPost', completeFormData, config);

        const message = response.data.message;

        dispatch({ type: CREATE_POST_SUCCESS, payload: message });

    } catch (error) {
        let errormess;
        if (error.response && error.response.data) {
            errormess = error.response.data.message || 'Something went wrong';
        } else {
            errormess = error.message;
        }
        
        dispatch({ type: CREATE_POST_FAILURE, payload: errormess });
    }
};




// To get user posts with category
export const getUserPost = (id, category) => async (dispatch) => {
    try {
        dispatch({ type: GET_USER_POST_REQUEST });
        console.log("ID is", id, "Category is", category);
        
        const config = { headers: { 'Content-Type': 'application/json' } };

        // Changed to POST request
        const response = await axios.post('/api/v1/getUserPost', { id, category }, config);
        console.log('Response is', response);
        
        const posts = response.data.posts;
        console.log("Posts are", posts);

        dispatch({
            type: GET_USER_POST_SUCCESS,
            payload: posts,
        });

    } catch (error) {
        let errormess;
        if (error.response && error.response.data) {
            errormess = error.response.data.message || 'Something went wrong';
        } else {
            errormess = error.message;
        }

        dispatch({ type: GET_USER_POST_FAILURE, payload: errormess });
    }
};
