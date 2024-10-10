import { CREATE_POST_SUCCESS,
    CREATE_POST_FAILURE,
    CREATE_POST_REQUEST
 } from "../constants/Postconstant";



const initialstate = {
    success:false,
    loading:false,
    error:null,
    message:null,
}

export const addApostreducer = (state =  initialstate, action )=>{
    switch (action.type) {
        case CREATE_POST_REQUEST:
            return{
                success:false,
                loading:true,
                error:null,
                message:null
            }
        case CREATE_POST_SUCCESS:
            return{
                success: true,
                message: action.payload,
                error:null,
                loading:false
            }    
        case CREATE_POST_FAILURE:
            return{
                success: false,
                message:null,
                error:action.payload,
                loading:false
            }    
    
        default:
            return state;
    }
}