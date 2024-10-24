import { GET_NOTIFICATION_REQUEST,
    GET_NOTIFICATION_SUCCESS,
    GET_NOTIFICATION_FAIL
 } from "../constants/NotificationConstant";

 const initialState = {
    loading: false,
    notifications: [],
    error: null,
};

export const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_NOTIFICATION_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GET_NOTIFICATION_SUCCESS:
            return {
                ...state,
                loading: false,
                success:true,
                notifications: action.payload,
            };
        case GET_NOTIFICATION_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};