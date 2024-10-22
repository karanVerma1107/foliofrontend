

import { GET_USER_POST_REQUEST,
    GET_USER_POST_SUCCESS,
    GET_USER_POST_FAILURE
 } from '../constants/Postconstant.js'        


const initialState = {
    loading: false,
    posts: [],
    error: null,
  };
  
  export const userPostReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_USER_POST_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case GET_USER_POST_SUCCESS:
        return {
          ...state,
          loading: false,
          posts: action.payload, // Assuming payload contains the posts
        };
      case GET_USER_POST_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload, // Assuming payload contains the error message
        };
      default:
        return state;
    }
  };