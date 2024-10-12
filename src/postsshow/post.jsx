import React, { useEffect, useState } from 'react';
import './post.css';
import Carousel from 'react-material-ui-carousel';
import { FaStar } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { likedislike } from '../actions/postsaction';
import { useAlert } from 'react-alert';
import { userdetailsfetch } from '../actions/authActions';



import { ADDcommAction, getCommAction } from '../actions/CommentAction';


const Post = React.memo(({ post, User, Isauth }) => {
    console.log("Rendering post:", post._id);
    console.log("isauth status,", Isauth)
   // const { loading, message, error } = useSelector(state => state.like);
   
    const {error, Comment, success, message, loading} = useSelector(state => state.Addcomm);
    const { comments = [], loading: Loading } = useSelector(state => state.getComm);

    const [like, setLike] = useState(false);
    const alert = useAlert();


    const [showCommentInput, setShowCommentInput] = useState(false);
    const [comment, setComment] = useState({
        "Content": ''
    });
    const [alertShown, setAlertShown] = useState(false);

    const dispatch = useDispatch();

    const handleLike = () => {
        if (Isauth) {
            dispatch(likedislike(post._id));
            toggleLike();
        } else {
            alert.error("Please log in to like the post.");
        }
    };

    const toggleLike = () => {
        setLike(!like);
        post.stars = like ? post.stars - 1 : post.stars + 1;
    };

    
    const fetchComments = () => {
        dispatch(getCommAction(post._id));
    };

    useEffect(() => {
        if (showCommentInput) {
            fetchComments(); // Fetch comments when showing the input
        }
    }, [showCommentInput, dispatch, post._id]);



    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        };
        return date.toLocaleString('en-US', options);
    };


    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };


    const handleAddComment = async () => {
        if (Isauth) {
            await dispatch(ADDcommAction(comment, post._id));
            alert.info("Adding your comment");
    
            // Fetch comments again after adding
            dispatch(getCommAction(post._id)); // Fetch all comments for this post
            setComment({ Content: '' }); // Reset comment input
        } else {
            alert.show("Login to access this resource");
        }
    };




    const [showReplyInput, setShowReplyInput] = useState(false);
    const [reply, setReply] = useState('');

    const handleReplyChange = (e) => {
        setReply(e.target.value);
    };

    const handleAddReply = () => {
        // Logic to add reply goes here
        console.log("Reply added:", reply);
        setReply('');
        setShowReplyInput(false);
    };




    useEffect(() => {
       
        
        if (error) {
            alert.error(error);
           
        }

        console.log("ok comment");

        if(success){
            fetchComments(); 
        }

        // Reset alertShown when loading changes to false
        //if (loading === false) {
          //  setAlertShown(false);
        //}

    }, [success, error,  message, alert]);



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
                    <a href={link} target="_blank" rel="noopener noreferrer"    className='gghg'>
                        {link}
                    </a>
                    {index < post.links.length - 1 && ', '} {/* Add comma except for the last link */}
                </span>
            ))}
        </p>
    </div>
)}

                
                <div className='categories'>
                    {post?.category ? post.category.map((item, index) => (
                        <span key={item} className='category'> Category: {item}{index < post.category.length - 1 && ', '}</span>
                    )) : null}


                    
                </div>
                {post.image.length > 1 ? <p className='fle'>{post.image.length} Files</p> : <p> <p className='fle'>{post.image.length} File</p> </p>}
            </div>

            {post.image && (
                <div className='product-img'>
                    <Carousel className='carousel'>
                        {post?.image.map((item) => (
                            <img
                                className='carousel-image'
                                key={item}
                                src={item}
                                alt={`slide`}
                            />
                        ))}
                    </Carousel>
                </div>
            )}

           {/* <div className='like-comm'>
                <div className='like'>
                    <FaStar onClick={handleLike} className={`like-icon ${like ? 'liked' : ''}`} />
                </div>
                <h2>{post.stars}</h2>

            </div>*/}

<div className='like-comm'>
                <div className='like'>
                    <FaStar onClick={handleLike} className={`like-icon ${like ? 'liked' : ''}`} />
                    <h2>{post.stars}</h2>
                </div>
                
                <span onClick={() => setShowCommentInput(!showCommentInput)} className='comment-toggle'>
                    {showCommentInput ? 'Hide Comments' : 'Comments'}
                </span>
            </div>

            {showCommentInput && (
    <div className='comment-section'>
        <div className='comments-list'>
            {Loading ? (
                <p>Loading comments...</p>
            ) : comments.length > 0 ? (
                comments.map(comment => (
                    <div key={comment._id} className='comment-item'>
    <div className='comuser'>
        <img src={comment.user_name.display_pic} className='comment-user-img' alt="User" />
        <h4 className='comment-username'>{comment.user_name.userName}</h4>
    </div>
    <p className='comment-text'>{comment.content}</p>

    <div className='comment-actions'>
                    <FaStar className='star-icon' /> {/* Add star icon */}
                    <span className='stars-count'>{comment.stars}</span>
                    <button className='reply-button' onClick={() => setShowReplyInput(!showReplyInput)}>
                        Replies
                    </button>
                </div>
      

                {showReplyInput && (
                <div className='reply-section'>
                    <input
                        type='text'
                        value={reply}
                        onChange={handleReplyChange}
                        placeholder='Type your reply...'
                        className='reply-input'
                    />
                    <button onClick={handleAddReply} className='add-reply-btn'>Add Reply</button>
                </div>
            )}


    <span className='comment-timestamp'>{formatDateTime(comment.createdAt)}</span>
</div>

                ))
            ) : (
                <p>No comments yet.</p>
            )}
        </div>

        <input
            type='text'
            value={comment.Content} // Ensure this matches your state structure
            onChange={handleCommentChange}
            placeholder='Type your comment...'
            className='comment-input'
        />
        <button onClick={handleAddComment} className='add-comment-btn'>Add Comment</button>
    </div>
)}



            <div className='post-date'>
            <p>{formatDateTime(post.createdAt)}</p>
            </div>
        </div>
    );
})

export default Post;
