import { ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,
    GET_POST_COMMENT_REQUEST,
    GET_POST_COMMENT_FAILURE,
    GET_POST_COMMENT_SUCCESS
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
