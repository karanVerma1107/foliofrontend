
{/*

import React, { useEffect, useState } from 'react';
import './post.css';
import Carousel from 'react-material-ui-carousel';
import { FaStar } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { likedislike } from '../actions/postsaction';
import { useAlert } from 'react-alert';
import { ADDcommAction, getCommAction, replyToComment, getreplyAction } from '../actions/CommentAction'; // Import replyToComment action

const Post = React.memo(({ post, User, Isauth }) => {
    const { error, success } = useSelector(state => state.Addcomm);
    const { comments = [], loading: Loading } = useSelector(state => state.getComm);
    const { loadings, successs, errorr, messages } = useSelector(state => state.addReply); // Get reply state
    const alert = useAlert();
    const [like, setLike] = useState(false);
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [commentInput, setCommentInput] = useState('');
    const [replyInput, setReplyInput] = useState({}); // Store reply inputs per comment

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
        setLike(prev => !prev);
        post.stars = like ? post.stars - 1 : post.stars + 1;
    };

    const fetchComments = () => {
        dispatch(getCommAction(post._id));
    };

    useEffect(() => {
        if (showCommentInput) {
            fetchComments();
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
        setCommentInput(e.target.value);
    };

    const handleReplyChange = (commentId, e) => {
        setReplyInput(prev => ({
            ...prev,
            [commentId]: e.target.value
        }));
    };

    const handleAddComment = async () => {
        if (Isauth) {
            const content = commentInput.trim();
            if (!content) {
                alert.error("Comment cannot be empty");
                return;
            }

            await dispatch(ADDcommAction(content, post._id));
            alert.info("Adding your comment");
            fetchComments();
        } else {
            alert.show("Login to access this resource");
        }
    };

    const handleReply = async (commentId) => {
        if (Isauth) {
            const content = replyInput[commentId]?.trim();
            if (!content) {
                alert.error("Reply cannot be empty");
                return;
            }

            await dispatch(replyToComment(commentId, content));
            alert.info("Adding your reply");
            fetchComments();
            setReplyInput(prev => ({
                ...prev,
                [commentId]: '' // Reset reply input
            }));
        } else {
            alert.show("Login to access this resource");
        }
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            setCommentInput(''); // Reset on error
        }

        if (success) {
            fetchComments(); // Fetch comments only if the add was successful
            setCommentInput(''); // Reset comment input
        }

        if (errorr) {
            alert.error(errorr);
        }

        if (successs) {
            fetchComments(); // Fetch comments if reply was successful
        }
    }, [error, alert, success, errorr, successs]);

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
                                alt={`slide`}
                            />
                        ))}
                    </Carousel>
                </div>
            )}

            <div className='like-comm'>
                <div className='like'>
                    <FaStar onClick={handleLike} className={`like-icon ${like ? 'liked' : ''}`} />
                    <h2>{post.stars}</h2>
                </div>

                <span onClick={() => setShowCommentInput(!showCommentInput)} className='comment-toggle'>
                    {showCommentInput ? 'Hide Comments' : `${post.commentla.length} Comments`}
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
                                        <FaStar className='star-icon' />
                                        <span className='stars-count'>{comment.stars}</span>
                                        <button className='reply-button' onClick={() => handleReply(comment._id)}>Reply</button>
                                        <input
                                            type='text'
                                            value={replyInput[comment._id] || ''}
                                            onChange={(e) => handleReplyChange(comment._id, e)}
                                            placeholder='Type your reply...'
                                            className='reply-input'
                                        />
                                    </div>
                                    <span className='comment-timestamp'>{formatDateTime(comment.createdAt)}</span>
                                </div>
                            ))
                        ) : (
                            <p>No comments yet.</p>
                        )}
                    </div>

                    <input
                        type='text'
                        value={commentInput}
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
});

export default Post;

*/}



{/*


import React, { useEffect, useState } from 'react';
import './post.css';
import Carousel from 'react-material-ui-carousel';
import { FaStar } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { likedislike } from '../actions/postsaction';
import { useAlert } from 'react-alert';
import { ADDcommAction, getCommAction, replyToComment, getreplyAction } from '../actions/CommentAction';

const Post = React.memo(({ post, User, Isauth }) => {
    const { error, success } = useSelector(state => state.Addcomm);
    const { comments = [], loading: Loading } = useSelector(state => state.getComm);
    const { loadings, successs, errorr, messages } = useSelector(state => state.addReply);
    const {replies=[]} = useSelector(state=>state.getReply);
    const alert = useAlert();
    const [like, setLike] = useState(false);
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [commentInput, setCommentInput] = useState('');
    const [replyInput, setReplyInput] = useState({});
    const [showReplies, setShowReplies] = useState({}); // State to track which replies are visible
    const [repliesData, setRepliesData] = useState({}); // Store replies for each comment

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
        setLike(prev => !prev);
        post.stars = like ? post.stars - 1 : post.stars + 1;
    };

    const fetchComments = () => {
        dispatch(getCommAction(post._id));
    };

    useEffect(() => {
        if (showCommentInput) {
            fetchComments();
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
        setCommentInput(e.target.value);
    };

    const handleReplyChange = (commentId, e) => {
        setReplyInput(prev => ({
            ...prev,
            [commentId]: e.target.value
        }));
    };

    const handleAddComment = async () => {
        if (Isauth) {
            const content = commentInput.trim();
            if (!content) {
                alert.error("Comment cannot be empty");
                return;
            }

            await dispatch(ADDcommAction(content, post._id));
            alert.info("Adding your comment");
            fetchComments();
        } else {
            alert.show("Login to access this resource");
        }
    };

    const handleReply = async (commentId) => {
        if (Isauth) {
            const content = replyInput[commentId]?.trim();
            if (!content) {
                alert.error("Reply cannot be empty");
                return;
            }

            await dispatch(replyToComment(commentId, content));
            alert.info("Adding your reply");
            fetchComments();
            setReplyInput(prev => ({
                ...prev,
                [commentId]: '' // Reset reply input
            }));
        } else {
            alert.show("Login to access this resource");
        }
    };

    const toggleReplies = async (commentId) => {
        if (showReplies[commentId]) {
            setShowReplies(prev => ({
                ...prev,
                [commentId]: false
            }));
        } else {
            setShowReplies(prev => ({
                ...prev,
                [commentId]: true
            }));
            // Fetch replies when showing them
            const replies = await dispatch(getreplyAction(commentId));
            setRepliesData(prev => ({
                ...prev,
                [commentId]: replies // Save fetched replies
            }));
        }
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            setCommentInput(''); // Reset on error
        }

        if (success) {
            fetchComments(); // Fetch comments only if the add was successful
            setCommentInput(''); // Reset comment input
        }

        if (errorr) {
            alert.error(errorr);
        }

        if (successs) {
            fetchComments(); // Fetch comments if reply was successful
        }
    }, [error, alert, success, errorr, successs]);

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
                                alt={`slide`}
                            />
                        ))}
                    </Carousel>
                </div>
            )}

            <div className='like-comm'>
                <div className='like'>
                    <FaStar onClick={handleLike} className={`like-icon ${like ? 'liked' : ''}`} />
                    <h2>{post.stars}</h2>
                </div>

                <span onClick={() => setShowCommentInput(!showCommentInput)} className='comment-toggle'>
                    {showCommentInput ? 'Hide Comments' : `${post.commentla.length} Comments`}
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
                                        <FaStar className='star-icon' />
                                        <span className='stars-count'>{comment.stars}</span>
                                        <button className='reply-button' onClick={() => handleReply(comment._id)}>Reply</button>
                                        <input
                                            type='text'
                                            value={replyInput[comment._id] || ''}
                                            onChange={(e) => handleReplyChange(comment._id, e)}
                                            placeholder='Type your reply...'
                                            className='reply-input'
                                        />
                                        <button 
                                            className='show-replies-button' 
                                            onClick={() => toggleReplies(comment._id)}>
                                            {showReplies[comment._id] ? 'Hide Replies' : 'Show Replies'}
                                        </button>
                                    </div>
                                    <span className='comment-timestamp'>{formatDateTime(comment.createdAt)}</span>
                                    
                                    {showReplies[comment._id] && repliesData[comment._id]?.map(reply => (
                                        <div key={reply._id} className='reply-item'>
                                            <div className='comuser'>
                                                <img src={reply.user_name.display_pic} className='reply-user-img' alt="User" />
                                                <h4 className='reply-username'>{reply.user_name.userName}</h4>
                                            </div>
                                            <p className='reply-text'>{reply.content}</p>
                                            <span className='reply-timestamp'>{formatDateTime(reply.createdAt)}</span>
                                        </div>
                                    ))}
                                </div>
                            ))
                        ) : (
                            <p>No comments yet.</p>
                        )}
                    </div>

                    <input
                        type='text'
                        value={commentInput}
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
});

export default Post;
*/}



import React, { useEffect, useState } from 'react';
import './post.css';
import Carousel from 'react-material-ui-carousel';
import { FaStar } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { likedislike } from '../actions/postsaction';
import { useAlert } from 'react-alert';
import { ADDcommAction, getCommAction, replyToComment, getreplyAction } from '../actions/CommentAction';

const Post = React.memo(({ post, User, Isauth }) => {
    const { error, success } = useSelector(state => state.Addcomm);
    const { comments = [], loading: Loading } = useSelector(state => state.getComm);
    const { loadings, successs, errorr, messages } = useSelector(state => state.addReply);
    const { replies = [] } = useSelector(state => state.getReply);
    const alert = useAlert();
    const [like, setLike] = useState(false);
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [commentInput, setCommentInput] = useState('');
    const [replyInput, setReplyInput] = useState({});
    const [showReplies, setShowReplies] = useState({}); // State to track which replies are visible
    const [repliesData, setRepliesData] = useState({}); // Store replies for each comment

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
        setLike(prev => !prev);
        post.stars = like ? post.stars - 1 : post.stars + 1;
    };

    const fetchComments = () => {
        dispatch(getCommAction(post._id));
    };

    useEffect(() => {
        if (showCommentInput) {
            fetchComments();
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
        setCommentInput(e.target.value);
    };

    const handleReplyChange = (commentId, e) => {
        setReplyInput(prev => ({
            ...prev,
            [commentId]: e.target.value
        }));
    };

    const handleAddComment = async () => {
        if (Isauth) {
            const content = commentInput.trim();
            if (!content) {
                alert.error("Comment cannot be empty");
                return;
            }

            await dispatch(ADDcommAction(content, post._id));
            alert.info("Adding your comment");
            fetchComments();
        } else {
            alert.show("Login to access this resource");
        }
    };

    const handleReply = async (commentId) => {
        if (Isauth) {
            const content = replyInput[commentId]?.trim();
            if (!content) {
                alert.error("Reply cannot be empty");
                return;
            }

            await dispatch(replyToComment(commentId, content));
            alert.info("Adding your reply");
            fetchComments();
            setReplyInput(prev => ({
                ...prev,
                [commentId]: '' // Reset reply input
            }));
        } else {
            alert.show("Login to access this resource");
        }
    };

    const toggleReplies = async (commentId) => {
        if (showReplies[commentId]) {
            setShowReplies(prev => ({
                ...prev,
                [commentId]: false
            }));
        } else {
            setShowReplies(prev => ({
                ...prev,
                [commentId]: true
            }));
            // Fetch replies when showing them
            await dispatch(getreplyAction(commentId)); // Ensure it fetches replies
            setRepliesData(prev => ({
                ...prev,
                [commentId]: replies // Store replies for this comment
            }));
        }
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            setCommentInput(''); // Reset on error
        }

        if (success) {
            fetchComments(); // Fetch comments only if the add was successful
            setCommentInput(''); // Reset comment input
        }

        if (errorr) {
            alert.error(errorr);
        }

        if (successs) {
            fetchComments(); // Fetch comments if reply was successful
        }
    }, [error, alert, success, errorr, successs]);

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
                                alt={`slide`}
                            />
                        ))}
                    </Carousel>
                </div>
            )}

            <div className='like-comm'>
                <div className='like'>
                    <FaStar onClick={handleLike} className={`like-icon ${like ? 'liked' : ''}`} />
                    <h2>{post.stars}</h2>
                </div>

                <span onClick={() => setShowCommentInput(!showCommentInput)} className='comment-toggle'>
                    {showCommentInput ? 'Hide Comments' : `${post.commentla.length} Comments`}
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
                                        <FaStar className='star-icon' />
                                        <span className='stars-count'>{comment.stars}</span>
                                        
                                       
                                    </div>
                                    <span className='comment-timestamp'>{formatDateTime(comment.createdAt)}</span>
                                    
                                    {showReplies[comment._id] && repliesData[comment._id]?.map(reply => (
                                        <div key={reply._id} className='reply-item'>
                                            <div className='replyU'>
                                                <img src={reply.user_name.display_pic} className='reply-user-img' alt="User" />
                                                <p className='reply-username'>{reply.user_name.userName}</p>
                                            </div>
                                            <p className='reply-text'>{reply.content}</p>
                                            <span className='reply-timestamp'>{formatDateTime(reply.createdAt)}</span>
                                        </div>
                                    ))}
                                </div>
                            ))
                        ) : (
                            <p>No comments yet.</p>
                        )}
                    </div>

                    <input
                        type='text'
                        value={commentInput}
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
});

export default Post;
