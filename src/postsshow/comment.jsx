
import React, { useState } from 'react';
import './comment.css'; // Import the new CSS file for comments
import { FaStar } from 'react-icons/fa6';
import { likeComment } from '../actions/CommentAction';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { ADDcommAction } from '../actions/CommentAction';
import UnifiedInput from './UniInput';

const Comment = ({ comment, Isauth, post }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    // Use the likes and loading states from the Redux store
    const { likes, loading, error } = useSelector(state => state.Likecom);
    const [like, setLiked] = useState(false);

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




    return (<>


        <div className="comment-card">
            <div className="user-details">
                <img src={comment.user_name.display_pic} className="user-img" alt="User" />
                <h3>{comment.user_name.userName}</h3>
            </div>
            <p className="comment-content">{renderCaption(comment.content)}</p>
            <div className="like-comm" onClick={handleLikeClick} style={{ cursor: 'pointer' }}>
                <FaStar className="like-icon" />
                <span className="like-number">{comment.stars}</span>
            </div>
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
