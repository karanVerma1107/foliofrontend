import React, { useEffect, useState } from 'react';
import './post.css';
import Carousel from 'react-material-ui-carousel';
import { FaStar } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { likedislike } from '../actions/postsaction';
import { useAlert } from 'react-alert';
import { userdetailsfetch } from '../actions/authActions';

const Post = ({ post }) => {
    const { loading, message, error } = useSelector(state => state.like);
    const { User, isAuthenticated } = useSelector(state => state.me);
    const [like, setLike] = useState(false);
    const alert = useAlert();
    const dispatch = useDispatch();

    const handleLike = () => {
        if (isAuthenticated) {
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

    useEffect(() => {
        dispatch(userdetailsfetch());
    }, [dispatch]);


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

            <div className='like-comm'>
                <div className='like'>
                    <FaStar onClick={handleLike} className={`like-icon ${like ? 'liked' : ''}`} />
                </div>
                <h2>{post.stars}</h2>
            </div>

            <div className='post-date'>
            <p>{formatDateTime(post.createdAt)}</p>
            </div>
        </div>
    );
}

export default Post;
