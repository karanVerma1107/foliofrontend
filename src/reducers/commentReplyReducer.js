import { ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,
    GET_POST_COMMENT_REQUEST,
    GET_POST_COMMENT_FAILURE,
    GET_POST_COMMENT_SUCCESS,
    ADD_REPLY_REQUEST,
    ADD_REPLY_FAILURE,
    ADD_REPLY_SUCCESS,
    GET_REPLY_REQUEST,
    GET_REPLY_SUCCESS
 } from "../constants/commentAndreply";

const initialState = {
    success: false,
    error: null,
    loading: false,
    message: null,

}

export const AddcommReducer = (state = initialState, action)=>{
    switch (action.type) {
        case ADD_COMMENT_REQUEST:
            return{
                loading: true,
                message: null,
                error: null,
                success: false
            }
            

        case ADD_COMMENT_SUCCESS:
            return{
                loading: false,
                message: action.payload.message,
                Comment: action.payload.comment,
                error:null,
                success:true

            }

        case ADD_COMMENT_FAILURE:
            return{
                loading: false,
                error: action.payload,
                message: null,
                success: false
            }    

        

        default:
             return state;
    }
}


export const getcommentsReducer = (state = { loading: false, comments: [] }, action) => {
    switch (action.type) {
        case GET_POST_COMMENT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_POST_COMMENT_SUCCESS:
            return {
                loading: false,
                comments: action.payload,
            };
        default:
            return state;
    }
};


const initialstate2 = {
    loadings: false,
    passed: false,
    errorr: null,
    info: null

}

export const AddreplyReducer = (state = initialstate2, action)=>{
    switch (action.type) {
        case ADD_REPLY_REQUEST:
            return {
            loadings: true,
            passed: false,
            errorr: null,
            info: null
        }
            
        case ADD_REPLY_SUCCESS:
            return{
                loadings: false,
            passed: true,
            errorr: null,
            info: action.payload.message
            }

        case ADD_COMMENT_FAILURE:
            return{
                loadings: false,
                passed: false,
                errorr: action.payload,
                info: null
            }    
    
        default:
            return state
    }
} 




export const getrepliesReducer = (state = { loadingss: false, replies: [] }, action) => {
    switch (action.type) {
        case GET_REPLY_REQUEST:
            return {
                ...state,
                loadingss: true,
            };
        case GET_REPLY_SUCCESS:
            return {
                loadingss: false,
                replies: action.payload,
            };
        default:
            return state;
    }
};