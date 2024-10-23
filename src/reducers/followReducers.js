import { GET_USER_FOLLOWERS_REQUEST,
    GET_USER_FOLLOWERS_SUCCESS,
    GET_USER_FOLLOWERS_FAILURE,
    GET_USER_FOLLOWING_REQUEST,
    GET_USER_FOLLOWING_SUCCESS,
    GET_USER_FOLLOWING_FAILURE,
 } from "../constants/userprofile";

const initialState = {
    followers: [],
    following: [],
    loadingFollowers: false,
    loadingFollowing: false,
    error: null,
};

export const userFollowReducer = (state = initialState, action) => {
    switch (action.type) {
        // Followers
        case GET_USER_FOLLOWERS_REQUEST:
            return {
                ...state,
                loadingFollowers: true,
                error: null,
            };
        case GET_USER_FOLLOWERS_SUCCESS:
            return {
                ...state,
                loadingFollowers: false,
                followers: action.payload,
            };
        case GET_USER_FOLLOWERS_FAILURE:
            return {
                ...state,
                loadingFollowers: false,
                error: action.payload.error,
            };

        // Following
        case GET_USER_FOLLOWING_REQUEST:
            return {
                ...state,
                loadingFollowing: true,
                error: null,
            };
        case GET_USER_FOLLOWING_SUCCESS:
            return {
                ...state,
                loadingFollowing: false,
                following: action.payload,
            };
        case GET_USER_FOLLOWING_FAILURE:
            return {
                ...state,
                loadingFollowing: false,
                error: action.payload.error,
            };

        default:
            return state;
    }
};


