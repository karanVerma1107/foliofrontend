import { ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,
    GET_POST_COMMENT_SUCCESS,
    GET_POST_COMMENT_REQUEST,
    ADD_REPLY_REQUEST,
    ADD_REPLY_FAILURE,
    ADD_REPLY_SUCCESS,
    GET_REPLY_REQUEST,
    GET_REPLY_SUCCESS
 } from "../constants/commentAndreply";


import axios from "axios";

export const ADDcommAction = (Content, id)=> async(dispatch)=>{
    try {
        //console.log("postid and content is: ", id, Content);
        dispatch({type:ADD_COMMENT_REQUEST})

        const config = {headers: {'Content-Type' : 'application/json'}}

        const response = await axios.post(`/api/v1/makeComment/${id}`,{ Content: Content}, config);

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
        
                dispatch({type: ADD_COMMENT_FAILURE,
                    payload: errormess
                })
    
        
       }
    }

    export const ADDreplyAction = (Content, id)=> async(dispatch)=>{

        console.log('id is,' , id);
        try {
            //console.log("postid and content is: ", id, Content);
            dispatch({type:ADD_REPLY_REQUEST})
    
            const config = {headers: {'Content-Type' : 'application/json'}}
    
            const response = await axios.post(`/api/v1/replyComment/${id}`,{ Content: Content}, config);
    
            const message = response.data.message;
            const reply = response.data.reply;
    
            dispatch({type: ADD_REPLY_SUCCESS, 
                payload : {
                    message,
            
                }
            })
    
    
    
        } catch (error) {
            let errormess
            if(error.response && error.response.data){
                errormess = error.response.data.message || 'something went wrong'
            }else{
                errormess = error.message
            }
            
                    dispatch({type: ADD_REPLY_FAILURE,
                        payload: errormess
                    })
        
            
           }
        }
    
    


    export const getCommAction = (postId)=>async(dispatch)=>{
        
      //  console.log("dta runned");

        dispatch({type: GET_POST_COMMENT_REQUEST});

        const response = await axios.get(`/api/v1/getcomments/${postId}`);

        const comment = response.data.comments;

        dispatch({type: GET_POST_COMMENT_SUCCESS , payload: comment});

    }



    export const getreplyAction = (postId)=>async(dispatch)=>{
        
        //  console.log("dta runned");
  
          dispatch({type: GET_POST_COMMENT_REQUEST});
  
          const response = await axios.get(`/api/v1/getreplies/${postId}`);
  
          const comment = response.data.replies;
  
          dispatch({type: GET_POST_COMMENT_SUCCESS , payload: replies});
  
      }