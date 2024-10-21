const initialStateReply = {
    replies: [],
    loading: false,
    error: null
};

export const replyLikeReducer = (state = initialStateReply, action) => {
    switch (action.type) {
        case 'LIKE_REPLY_REQUEST':
            return {
                ...state,
                loading: true,
                error: null
            };

        case 'LIKE_REPLY_SUCCESS':
            return {
                ...state,
                loading: false,
                replies: state.replies.map(reply => {
                    if (reply._id === action.payload.replyId) {
                        return {
                            ...reply,
                            stars: reply.no_of_peo_liked.includes(action.payload.userId) 
                                ? reply.stars - 1 
                                : reply.stars + 1,
                            no_of_peo_liked: reply.no_of_peo_liked.includes(action.payload.userId) 
                                ? reply.no_of_peo_liked.filter(id => id !== action.payload.userId) 
                                : [...reply.no_of_peo_liked, action.payload.userId]
                        };
                    }
                    return reply;
                }),
                message: action.payload.message
            };

        case 'LIKE_REPLY_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
};
