import React, { useState } from 'react';

import './postsss.css'
import Carousel from 'react-material-ui-carousel';
import { FaStar } from "react-icons/fa6";
import { useAlert } from 'react-alert';
import { likedislike } from '../actions/postsaction';
import { useDispatch, useSelector } from 'react-redux';
import Comment from './comment.jsx';

import { getCommAction } from '../actions/CommentAction';



const Post = React.memo(({ post, Isauth, User }) => {
    const dispatch = useDispatch();
    const {comments=[], loading}  = useSelector(state=>state.getComm)

    const [showComments, setShowComments] = useState(false);
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
            setShowComments(prev => !prev); // Toggle the comments visibility
            if (!showComments) { // Only fetch comments if they are not currently shown
                dispatch(getCommAction(post._id));
            }
        };
    
    

    return (
        <div className='post-card'>
            <div className='user-details'>
                <img src={post.user_name.display_pic} className='user-img' alt="User" />
                <h3>{post.user_name.userName}</h3>
            </div>

            <div className='post-caption'>
                <p>{post.caption}</p>

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
        </div>
    );
});

export default Post;


