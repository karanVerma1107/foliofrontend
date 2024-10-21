import React, { useState } from 'react'
import './reply.css'
import { FaStar } from 'react-icons/fa6';
import { useAlert } from 'react-alert';
import { useDispatch } from 'react-redux';
import { likeReply } from '../actions/CommentAction';

const Reply = ({reply, Isauth}) => {
const dispatch = useDispatch();
const alert = useAlert();
    const [like, setLiked] = useState(false);

    const toggleLike = () => {
        setLiked(prev => !prev);
        reply.stars = like ? reply.stars - 1 : reply.stars + 1;
    };


    const handleLikeClick = async () => {
        if(Isauth){
            dispatch(likeReply(reply._id));
            toggleLike();
        }else{
            alert.show("login to access this resource");
        }
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