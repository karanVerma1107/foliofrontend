import { GET_USER_FOLLOWERS_REQUEST,
    GET_USER_FOLLOWERS_SUCCESS,
    GET_USER_FOLLOWERS_FAILURE,
    GET_USER_FOLLOWING_REQUEST,
    GET_USER_FOLLOWING_SUCCESS,
    GET_USER_FOLLOWING_FAILURE,
 } from "../constants/userprofile";


 import axiosInstance from "../../axiosInstance";
import axios from "axios"; 

export const Getfollowers = (id)=> async(dispatch)=>{
    try {
        dispatch({type: GET_USER_FOLLOWERS_REQUEST})

       

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await axiosInstance.post('/api/v1/getfollowers',{userid: id}, config)

        const followers = response.data.followers;
        console.log("followers is:", followers)

        dispatch({type: GET_USER_FOLLOWERS_SUCCESS, payload: followers})
        
    } catch (error) {
  
        let errormess
        if(error.response && error.response.data){
            errormess = error.response.data.message || 'something went wrong'
        }else{
            errormess = error.message
        }
        
                dispatch({type: GET_USER_FOLLOWERS_FAILURE,
                    payload: errormess
                })



                console.log("error is", error);
    }
}

export const getFollowing = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_USER_FOLLOWING_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        // Use POST instead of GET
        const response = await axiosInstance.post('/api/v1/getfollowing', { userid: id }, config);

        const followings = response.data.followings;

        dispatch({ type: GET_USER_FOLLOWING_SUCCESS, payload: followings });

    } catch (error) {
        console.log('Error fetching followings:', error);
        let errormess;
        if (error.response && error.response.data) {
            errormess = error.response.data.message || 'Something went wrong';
        } else {
            errormess = error.message;
        }

        dispatch({
            type: GET_USER_FOLLOWING_FAILURE,
            payload: errormess,
        });
    }
};
