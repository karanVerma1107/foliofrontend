import React, { useEffect, useState } from 'react';

import './postsss.css'
import Carousel from 'react-material-ui-carousel';
import { FaStar } from "react-icons/fa6";
import { useAlert } from 'react-alert';
import { likedislike, deletePost  } from '../actions/postsaction';
import { useDispatch, useSelector } from 'react-redux';
import Comment from './comment.jsx';
import MentionInput from '../../mentionLogic/mentionInput.jsx';
import { ADDcommAction, getCommAction } from '../actions/CommentAction';
import UnifiedInput from './UniInput.jsx';




const Post = React.memo(({ post, Isauth, User,  showComments, onPostClick  }) => {
    const dispatch = useDispatch();
    //const {comments=[], loading}  = useSelector(state=>state.getComm)
    const { comments = [], loading } = useSelector(state => state.getComm);

    const [commentValue, setCommentValue] = useState('');

    
    const [showMentionInput, setShowMentionInput] = useState(false); 

const {message , error, success} = useSelector(state=> state.Addcomm);
    //const [showComments, setShowComments] = useState(false);
    const {notification, mistake, goal } = useSelector(state =>state.deletePost)

    

     const alert = useAlert();
        const [like, setLiked] = useState(false);
    
        const handleLike = () => {
            if (Isauth) {
                dispatch(likedislike(post._id));
                toggleLike();
            } else {
                alert.show("Please log in to like the post.");
            }
        };
        const toggleLike = () => {
            setLiked(prev => !prev);
            post.stars = like ? post.stars - 1 : post.stars + 1;
        };
    
        const handleCommentsClick = () => {
            onPostClick(post._id); // Call the parent's click handler
        if (!showComments) {
            dispatch(getCommAction(post._id));
        }
        };
    
        const addCommentAction = () => {
            if (Isauth) {
                dispatch(ADDcommAction(commentValue, post._id)).then(() => {
                    setTimeout(() => {
                        dispatch(getCommAction(post._id)); // Fetch comments after 3 seconds
                    }, 1000);
                });
                setCommentValue('')
            } else {
                alert.show("Please log in to add a comment.");
            }
        };


        const handleInputChange = (event) => {
           const newValue = event.target.value;

           setCommentValue(newValue); // Update the input value in the parent component

           // Show mention input when typing "/"
           if (newValue.endsWith('/')) {
               setShowMentionInput(true);
           } else if (showMentionInput && !newValue.endsWith('/')) {
               setShowMentionInput(false);
           }



        };


        useEffect(()=>{
          if(success){
           
           // alert.success(message);
          }

          if(error){
            alert.error(error)
          }


          if(goal){
            alert.success(notification)
          }

          if(mistake){
            alert.error(mistake)
          }

        },[success, message, error, post._id, dispatch, alert, goal, mistake ]);



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

        
    

    return (
        <div className='post-card'>
            <div className='user-details'>
                <img src={post.user_name.display_pic} className='user-img' alt="User"  style={{width: "3vmax", height: "3vmax"}}/>
                <h3><a href={`/${post.user_name.userName}`} style={{textDecoration: "none" , color: "black" }}>{post.user_name.userName}</a></h3>
            </div>

            <div className='post-caption'>
            <p>{renderCaption(post.caption)}</p>


                {post.links && post.links.length > 0 && (
                    <div className='post-links'>
                        <h4>Links:</h4>
                        <p>
                            {post.links.map((link, index) => (
                                <span key={index}>
                                    <a href={link} target="_blank" rel="noopener noreferrer" className='gghg'>
                                        {link}
                                    </a>
                                    {index < post.links.length - 1 && ', '}
                                </span>
                            ))}
                        </p>
                    </div>
                )}

                <div className='categories'>
                    {post.category && post.category.map((item, index) => (
                        <span key={item} className='category'> Category: {item}{index < post.category.length - 1 && ', '}</span>
                    ))}
                </div>

                <p className='fle'>{post.image.length} {post.image.length > 1 ? 'Files' : 'File'}</p>
            </div>

            {post.image.length > 0 && (
                <div className='product-img'>
                    <Carousel className='carousel'>
                        {post.image.map((item) => (
                            <img
                                className='carousel-image'
                                key={item}
                                src={item}
                                alt='post image'
                            />
                        ))}
                    </Carousel>
                </div>
            )}

            <div className='like-comm'>
                <div className='like'>`
                <FaStar className={`like-icon ${Isauth && post.no_peo_liked.includes(User._id) ? 'liked' : ''}`} onClick={handleLike}/>
                    <h2>{post.stars}</h2>
                </div>
                <div className='comment' onClick={handleCommentsClick} style={{ cursor: 'pointer' }}>
                    <span>{post.commentla.length} Comments</span>
                </div>
            </div>





            {showComments && ( // Conditionally render comments based on the toggle
                <div className='comments-section'>

<div className='comment-input-container'> {/* New div for flex layout */}
<textarea
                value={commentValue}
                onChange={handleInputChange}
                placeholder="Add a comment..."
                className='comment-input'
                rows={1} // Start with a single row
                style={{ resize: 'none' , height: "2.8vmax" }} // Prevent manual resizing
                onInput={(e) => {
                    e.target.style.height = 'auto'; // Reset height
                    e.target.style.height = `${e.target.scrollHeight}px`; // Set height to scroll height
                }}
            />
            <button onClick={addCommentAction} className='add-comment-button'>Add</button>
        </div>
        {showMentionInput && (
                <MentionInput onSelect={(userName) => {
                    setCommentValue(prev => prev + userName + ' '); // Append username after '/'
                    setShowMentionInput(false); // Close mention input
                }} />
            )}



                    {loading ? (
                        <p>Loading comments...</p>
                    ) : (
                        comments.map((comment) => (
                            <Comment key={comment._id} comment={comment} Isauth = {Isauth}  user={User} post ={post}/>
                        ))
                    )}
                </div>
            )}



            <div className='post-date'>
                <p>{new Date(post.createdAt).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                })}</p>
            </div>
            {User &&    User._id === post.user_name._id && (
    <p style={{ color: 'red', fontSize: '1.3vmax', cursor: 'pointer' }} onClick={() => dispatch(deletePost(post._id))}>
        Delete
    </p>
)}
        
        </div>
    );
});

export default Post;
