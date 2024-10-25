import { GET_USER_BY_NAME_REQUEST,
    GET_USER_BY_NAME_SUCCESS,
    GET_USER_BY_NAME_FAILURE, 
    GET_SKILLED_USER_REQUEST,
    GET_SKILLED_USER_SUCCESS,
    GET_SKILLED_USER_FAILURE
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


export const getUserBySkill = (skill) => async (dispatch) => {
    

    try {

        dispatch({ type: GET_SKILLED_USER_REQUEST });
        // Use GET request and include skill as a query parameter
        const response = await axios.post(`/api/v1/getuserbyskill?skill=${skill}`);
        
        console.log("response.data is,", response.data);
        dispatch({
            type: GET_SKILLED_USER_SUCCESS,
            payload: response.data.users, // Access users from the response
        });
    } catch (error) {
        console.error("Failed to fetch user:", error);
        dispatch({
            type: GET_SKILLED_USER_FAILURE,
            payload: error.response ? error.response.data.message : error.message, // Handle error messaging
        });
    }
};
