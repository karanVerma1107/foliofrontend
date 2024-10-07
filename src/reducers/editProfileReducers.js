import { OBJECT_EDIT_REQUEST,
    OBJECT_EDIT_SUCCESS,
    OBJECT_EDIT_FAILURE
 } from "../constants/editprofile";



const initialstate = {
    loading: false,
    text: null,
    errorr: null,
    succes: false
}

export const editobjReducer = (state = initialstate, action)=>{
    switch (action.type) {
        case OBJECT_EDIT_REQUEST:
            return{
                loading: true,
                text: null,
                errorr: null,
                succes: false
            }
            
        case OBJECT_EDIT_SUCCESS:
            return{
                loading: false,
                text: action.payload,
                errorr: null,
                succes: true
            }    
        
        case OBJECT_EDIT_FAILURE:
            return{
                loading: false,
                text: null,
                errorr: action.payload,
                succes: false
            }
    
        default:
            return state
    }
}