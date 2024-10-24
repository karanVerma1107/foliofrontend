import { GET_NOTIFICATION_REQUEST,
    GET_NOTIFICATION_SUCCESS,
    GET_NOTIFICATION_FAIL
 } from "../constants/NotificationConstant";
 import axios from "axios";

export const Getnotification = (userid)=>async (dispatch)=>{
    try {
        dispatch({type: GET_NOTIFICATION_REQUEST})

        console.log("noti user id is:", userid)

        const url = `/api/v1/notification/${userid}`;
        console.log("Fetching notifications from:", url);
        const response = await axios.get(url);
        

        const notifications = response.data.notifications

        dispatch({type: GET_NOTIFICATION_SUCCESS, payload: notifications})

    } catch (error) {
        let errormess
        if(error.response && error.response.data){
            errormess = error.response.data.message || 'something went wrong'
        }else{
            errormess = error.message
        }
        
                dispatch({type: GET_NOTIFICATION_FAIL,
                    payload: errormess
                })
    
    }
}