import { GET_SKILLED_USER_REQUEST, GET_SKILLED_USER_SUCCESS, GET_SKILLED_USER_FAILURE } from "../constants/searchingConstant";


const initialState = {
    loading: false,
    skillusers: [],
    error: null,
  };
  
 export const skilleduserReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_SKILLED_USER_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case GET_SKILLED_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          skillusers: action.payload,
        };
      case GET_SKILLED_USER_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  