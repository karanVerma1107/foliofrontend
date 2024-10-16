import { GET_USER_BY_NAME_REQUEST,
    GET_USER_BY_NAME_SUCCESS,
    GET_USER_BY_NAME_FAILURE
 } from "../constants/searchingConstant";

 import axios from "axios";


 export const getUserByUsername = (username) => async (dispatch) => {
    dispatch({ type: GET_USER_BY_NAME_REQUEST });

    try {
        const response = await axios.get(`/api/v1/${username}`); // Replace with your actual API endpoint
        console.log("response.data is,", response.data)
        dispatch({
            type: GET_USER_BY_NAME_SUCCESS,
            payload: response.data.usersFound, // Directly use the full response data
        });
    } catch (error) {
        console.error("Failed to fetch user:", error);
        dispatch({
            type: GET_USER_BY_NAME_FAILURE,
            payload: error.message, // Dispatch error message
        });
    }
};