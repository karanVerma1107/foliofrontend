import React, { useState } from 'react'
import './reply.css'
import { FaStar } from 'react-icons/fa6';
import { useAlert } from 'react-alert';
import { useDispatch } from 'react-redux';
import UnifiedInput from './UniInput';
import { likeReply, replyToComment, getreplyAction } from '../actions/CommentAction';

const Reply = ({reply, Isauth, comment}) => {
const dispatch = useDispatch();
const alert = useAlert();
    const [like, setLiked] = useState(false);

    const toggleLike = () => {
        setLiked(prev => !prev);
        reply.stars = like ? reply.stars - 1 : reply.stars + 1;
    };



    const [showReplyInput, setShowReplyInput] = useState(false);
    const [replyContent, setReplyContent] = useState("");


    const handleReplyClick = () => {
      setReplyContent(`/${reply.user_name.userName} `); 
      
      setShowReplyInput(prev => !prev); // Toggle reply input visibility

  };
    const handleLikeClick = async () => {
        if(Isauth){
            dispatch(likeReply(reply._id));
            toggleLike();
        }else{
            alert.show("login to access this resource");
        }
    };


    const handleInputChange = (value) => {
      setReplyContent(value); // Update the reply content based on user input
  };

  
  const handleAddReply = (content) => {
   dispatch(replyToComment(reply._id, content)).then(()=>{
    setTimeout(()=>{
        dispatch(getreplyAction(comment._id))
    }, 1000)
 })
   
   setShowReplyInput(false); // Hide the reply input after submitting
   setReplyContent('')
};


    const renderCaption = (caption) => {
        const mentionRegex = /\/(\w+)/g; // Regex to match /username format
        const parts = caption.split(mentionRegex); // Split the caption by mentions

        return parts.map((part, index) => {
            // If the part matches the mention regex, return a link
            if (index % 2 === 1) {
                return (
                    <a key={index} href={`/${part}`} style={{ color: 'blue', textDecoration: 'none' }}>
                        {`/${part}`}
                    </a>
                );
            }
            // Otherwise, return the normal text
            return part;
        });
    };


  return (
   <>
    <div className="reply-card">
      <div className="user-details">
        <img src={reply.user_name.display_pic} className="user-img" alt="User" />
        <h5>{reply.user_name.userName}</h5>
      </div>
      <p className="reply-content">{renderCaption(reply.content)}</p>
      <div className="like-comm" onClick={handleLikeClick} style={{ cursor: 'pointer' }}>
                <FaStar className="like-icon" />
                <span className="like-number">{reply.stars}</span>
            </div>


            <div style={{ color: 'orangered', cursor: 'pointer', marginTop: '1vmax', fontSize:'1.1vmax' } } onClick={handleReplyClick} >
                        Reply
                   
 </div>

 {showReplyInput && (<div className='inp'>
                    <UnifiedInput 
                        onChange={handleInputChange}
                        value = {replyContent}
                        onSubmit={handleAddReply} // Pass the handleAddReply function to UnifiedInput
                        placeholder="Write your reply..." // Add a placeholder for user guidance
                        
                    />
                    </div>
                )}

      <div className="reply-meta">
        <span className="reply-date">
          {new Date(reply.createdAt).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })}
        </span>
      </div>
    </div>
   
   </>
  )
}

export default Reply