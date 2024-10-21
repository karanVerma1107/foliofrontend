import { ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,
    GET_POST_COMMENT_SUCCESS,
    GET_POST_COMMENT_REQUEST,
    ADD_REPLY_REQUEST,
    ADD_REPLY_FAILURE,
    ADD_REPLY_SUCCESS,
    GET_REPLY_REQUEST,
    GET_REPLY_SUCCESS, LIKE_COMMENT_REQUEST,
    LIKE_COMMENT_SUCCESS,
    LIKE_COMMENT_FAILURE
 } from "../constants/commentAndreply";


import axios from "axios";

export const ADDcommAction = (Content, id)=> async(dispatch)=>{
    try {
        console.log("postid and content is: ", id, Content);
        dispatch({type:ADD_COMMENT_REQUEST})

        const config = {headers: {'Content-Type' : 'application/json'}}

        const response = await axios.post(`/api/v1/makeComment/${id}`,{ Content }, config);

        const message = response.data.message;
        const comment = response.data.Comment;

        dispatch({type: ADD_COMMENT_SUCCESS, 
            payload : {
                message,
                comment
            }
        })



    } catch (error) {
        let errormess
        if(error.response && error.response.data){
            errormess = error.response.data.message || 'something went wrong'
        }else{
            errormess = error.message
        }
        s
                dispatch({type: ADD_COMMENT_FAILURE,
                    payload: errormess
                })
    
        
       }}


       
       export const getCommAction = (postId) => async (dispatch) => {
           dispatch({ type: GET_POST_COMMENT_REQUEST });
       
           try {
               const { data } = await axios.get(`/api/v1/getcomments/${postId}`);
               dispatch({
                   type: GET_POST_COMMENT_SUCCESS,
                   payload: data.comments || [], // Directly use comments from response
               });
           } catch (error) {
               console.error("Failed to fetch comments:", error);
               // Optionally, you can dispatch an error action here
           }
       };
       


    export const getreplyAction = (commentId)=>async(dispatch)=>{
        
        //  console.log("dta runned");
  
          dispatch({type: GET_REPLY_REQUEST});
  
          const response = await axios.get(`/api/v1/getreplies/${commentId}`);
  
          const replies = response.data.replies;
  
          dispatch({type: GET_REPLY_SUCCESS , payload: replies});
  
      }




      export const likeComment = (commentId) => {
        return async (dispatch) => {
            dispatch({ type: LIKE_COMMENT_REQUEST });
            try {
                const response = await axios.put(`/api/v1/likeComment/${commentId}`); // Adjust the endpoint if needed
    
                dispatch({
                    type: LIKE_COMMENT_SUCCESS,
                    payload: {
                        message: response.data.message,
                        newStars: response.data.newStars // Assuming the response contains new stars count
                    }
                });
            } catch (error) {
                console.log('Error liking comment:', error);
                dispatch({
                    type: LIKE_COMMENT_FAILURE,
                    payload: error.response ? error.response.data.message : 'An error occurred'
                });
            }
        };
    };







    export const likeReply = (replyId) => {
        return async (dispatch) => {
            dispatch({ type: 'LIKE_REPLY_REQUEST' });
            try {
                const response = await axios.post(`/api/v1/like/${replyId}`); // Updated endpoint for replies
        
                dispatch({
                    type: 'LIKE_REPLY_SUCCESS',
                    payload: {
                        message: response.data.message,
                        newStars: response.data.al // Assuming the response contains the new stars count
                    }
                });
            } catch (error) {
                console.log('Error liking reply:', error);
                dispatch({
                    type: 'LIKE_REPLY_FAILURE',
                    payload: error.response ? error.response.data.message : 'An error occurred'
                });
            }
        };
    };
    























    

export const replyToComment = (id, content,) => async (dispatch) => {
    try {
        dispatch({ type: ADD_COMMENT_REQUEST });

        const config = { headers: { 'Content-Type': 'application/json' } };

        const response = await axios.post(`/api/v1/replyComment/${id}`, { id, content}, config);

        const message = response.data.message;
        const reply = response.data.newReply;

        dispatch({ 
            type: ADD_COMMENT_SUCCESS, 
            payload: { message, reply } 
        });
    } catch (error) {
        let errormess;
        if (error.response && error.response.data) {
            errormess = error.response.data.message || 'Something went wrong';
        } else {
            errormess = error.message;
        }

        dispatch({ 
            type: ADD_COMMENT_FAILURE, 
            payload: errormess 
        });
    }
};
