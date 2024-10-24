import { USER_CONNECT_REQ,
    USER_CONNECT_SUCCESS,
    USER_CONNECT_FAIL
 } from "../constants/connect";

 const initialState = {
    loading: false,
    error: null,
    message: null, // Store the success message
};

export const connectReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_CONNECT_REQ:
            return {
                ...state,
                loading: true,
                error: null,
                message: null, // Clear message on new request
            };
        case USER_CONNECT_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload, // Store the success message
            };
        case USER_CONNECT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload, // Set the error message
                message: null, // Clear message on error
            };
        default:
            return state;
    }
};