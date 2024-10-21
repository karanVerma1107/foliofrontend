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
    GET_REPLY_SUCCESS, DELETE_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAILURE
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



const initialState1 = {
    loading: false,
    comments: [], // Store all comments as an array
};

export const getcommentsReducer = (state = initialState1, action) => {
    switch (action.type) {
        case GET_POST_COMMENT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_POST_COMMENT_SUCCESS:
            return {
                loading: false,
                comments: action.payload || [], // Set comments directly from payload
            };
        default:
            return state;
    }
};

const initialState2 = {
    loadings: false,
    successs: false,
    errorr: null,
    messages: null,
};

export const addReplyReducer = (state = initialState2, action) => {
    switch (action.type) {
        case ADD_REPLY_REQUEST:
            return {
                ...state,
                loadings: true,
                successs: false,
                errorr: null,
                messages: null,
            };
        
        case ADD_REPLY_SUCCESS:
            return {
                ...state,
                loadings: false,
                successs: true,
                errorr: null,
                messages: action.payload.message,
            };

        case ADD_REPLY_FAILURE:
            return {
                ...state,
                loadings: false,
                successs: false,
                errorr: action.payload,
                messages: null,
            };
    
        default:
            return state;
    }
};


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




const initialState3 = {
    comments: [],
    loading: false,
    error: null,
    success: false,
};

export const DelcommentReducer = (state = initialState3, action) => {
    switch (action.type) {
        case DELETE_COMMENT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case DELETE_COMMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                comments: state.comments.filter(comment => comment._id !== action.payload.commentId), // Remove deleted comment
            };
        case DELETE_COMMENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

const initialState5 = {
    likes: 0,
    loading: false,
    error: null,
};

const initialStateComment = {
    comments: [],
    loading: false,
    error: null
};

export const commentLikeReducer = (state = initialStateComment, action) => {
    switch (action.type) {
        case 'LIKE_COMMENT_REQUEST':
            return {
                ...state,
                loading: true,
                error: null
            };

        case 'LIKE_COMMENT_SUCCESS':
            return {
                ...state,
                loading: false,
                comments: state.comments.map(comment => {
                    if (comment._id === action.payload.commentId) {
                        return {
                            ...comment,
                            stars: comment.no_of_peo_liked.includes(action.payload.userId) 
                                ? comment.stars - 1 
                                : comment.stars + 1,
                            no_of_peo_liked: comment.no_of_peo_liked.includes(action.payload.userId) 
                                ? comment.no_of_peo_liked.filter(id => id !== action.payload.userId) 
                                : [...comment.no_of_peo_liked, action.payload.userId]
                        };
                    }
                    return comment;
                }),
                message: action.payload.message
            };

        case 'LIKE_COMMENT_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
};





