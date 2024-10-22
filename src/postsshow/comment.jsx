
import React, { useState } from 'react';
import './comment.css'; // Import the new CSS file for comments
import { FaStar } from 'react-icons/fa6';
import { getreplyAction, likeComment, replyToComment } from '../actions/CommentAction';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
///import { ADDcommAction } from '../actions/CommentAction'; 
import Reply from './Reply';
import UnifiedInput from './UniInput';

const Comment = ({ comment, Isauth, post }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    // Use the likes and loading states from the Redux store
    const { likes, loading, error } = useSelector(state => state.Likecom);

    
const {loadingss, replies=[]} = useSelector(state => state.getReply);

    const [like, setLiked] = useState(false);
    const [replyContent, setReplyContent] = useState("");

    const toggleLike = () => {
        setLiked(prev => !prev);
        comment.stars = like ? comment.stars - 1 : comment.stars + 1;
    };


    const handleLikeClick = async () => {
        if(Isauth){
            dispatch(likeComment(comment._id));
            toggleLike();
        }else{
            alert.show("login to access this resource");
        }
    };

   
 const [showReplyInput, setShowReplyInput] = useState(false);

    const handleReplyClick = () => {
        setReplyContent(`/${comment.user_name.userName} `); 
        dispatch(getreplyAction(comment._id));
        setShowReplyInput(prev => !prev); // Toggle reply input visibility

    };

    const handleAddReply = (content) => {
         dispatch(replyToComment(comment._id, content)).then(()=>{
            setTimeout(()=>{
                dispatch(getreplyAction(comment._id))
            }, 1000)
         })
        setShowReplyInput(false); // Hide the reply input after submitting
        setReplyContent('')
    };
    
    const handleInputChange = (value) => {
        setReplyContent(value); // Update the reply content based on user input
    };



    const renderCaption = (caption) => {
        const mentionRegex = /\/(\w+)/g; // Regex to match /username format
        const parts = caption.split(mentionRegex); // Split the caption by mentions

        return parts.map((part, index) => {
            // If the part matches the mention regex, return a link
            if (index % 2 === 1) {
                return (
                    <a key={index} href={`/${part}`} style={{ color: 'blue', textDecoration: 'none' }} target='_blank'>
                        {`/${part}`}
                    </a>
                );
            }
            // Otherwise, return the normal text
            return part;
        });
    };




    return (<>


        <div className="comment-card">
            <div className="user-details">
                <img src={comment.user_name.display_pic} className="user-img" alt="User" />
                <h3><a href={`/${comment.user_name.userName}`} style={{textDecoration:"none", color:"black"}}>{comment.user_name.userName}</a></h3>
            </div>
            <p className="comment-content">{renderCaption(comment.content)}</p>
            <div className="like-comm" onClick={handleLikeClick} style={{ cursor: 'pointer' }}>
                <FaStar className="like-icon" />
                <span className="like-number">{comment.stars}</span>
            </div>
            <div style={{ color: 'orangered', cursor: 'pointer', marginTop: '1vmax', fontSize:'1.1vmax' }} onClick={handleReplyClick}>
                    {comment.replies.length} Replies
                   
 </div>
             {/* Conditionally render the UnifiedInput component */}
 {showReplyInput && (<div className='inp'>
                    <UnifiedInput 
                        onChange={handleInputChange}
                        value = {replyContent}
                        onSubmit={handleAddReply} // Pass the handleAddReply function to UnifiedInput
                        placeholder="Write your reply..." // Add a placeholder for user guidance
                        
                    />
                    </div>
                )}


  {/* Loading state for replies */}
  {showReplyInput && loadingss ? (
                    <p className="loading-message">Loading replies...</p>
                ) : (
                    showReplyInput && replies.length > 0 && (
                        <div className="replies">
                            {replies.map(reply => (
                                <Reply key={reply._id} reply={reply} Isauth={Isauth} comment = {comment}/> // Ensure Reply component handles rendering of each reply
                            ))}
                        </div>
                    )
                )}


            <div className="post-date">
                <p>{new Date(comment.createdAt).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                })}</p>
            </div>
            {error && <p className="error-message">{error}</p>} {/* Display error if present */}
        </div>
        </>
    );
};

export default Comment;
