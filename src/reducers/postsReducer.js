import { GET_ALL_POST_REQUEST, GET_ALL_POST_SUCCESS, GET_ALL_POSTS_FAILURE, GIVE_POST_LIKE_REQUEST, GIVE_POST_LIKE_SUCCESS, GIVE_POST_LIKE_FAILURE } from "../constants/Postconstant.js";

export const getallpostsreducer = (state={posts:[]},action)=>{
    switch (action.type) {
        case GET_ALL_POST_REQUEST:
            return{
                posts: [], 
                loading: true
            }
        case GET_ALL_POST_SUCCESS:
            return{
                loading: false,
                posts: action.payload,
                error:null
            }
        case GET_ALL_POSTS_FAILURE:
            return{
                loading: true,
                error: action.payload,
                posts:[]
            }      
            
    
        default:
            return state
    }
}


//give a like-dislike to post
const initialstatelike = {
    posts:[],
    loading: false,
    error: null
}

export const likeReducer = (state = initialstatelike, action)=>{
    switch (action.type) {
        case GIVE_POST_LIKE_SUCCESS:
            return{
                ...state,
                loading: true,
                error:null
            }
            
            case GIVE_POST_LIKE_SUCCESS:
                return{
                    ...state,
                    loading: false,
                    posts: state.posts.map(post=>{
                        if(post._id === action.payload.postId){
                            return{
                                ...post,
                                stars:post.no_peo_liked.includes(action.payload.postId) ? post.stars - 1 : post.stars + 1
                            };
                        }
                        return post;
                    }),
                    message: action.payload.message
                };

           case GIVE_POST_LIKE_FAILURE:
             return{
                ...state,
                loading: false, error: action.payload
             }     
    
        default:
            return state
    }
}