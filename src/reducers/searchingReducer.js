import { GET_USER_BY_NAME_SUCCESS,
    GET_USER_BY_NAME_REQUEST,
    GET_USER_BY_NAME_FAILURE
 } from "../constants/searchingConstant";


 const initialState = {
    loading: false,
    users: [],
    error: null,
};

export const getUserByNameReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_BY_NAME_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GET_USER_BY_NAME_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload, // Assuming payload contains the array of users
            };
        case GET_USER_BY_NAME_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};