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

    return (
        <div className='post-card'>
            <div className='user-details'>
                <img src={post.user_name.display_pic} className='user-img' alt="User" />
                <h3>{post.user_name.userName}</h3>
            </div>

            <div className='post-caption'>
                <p>{post.caption}</p>
                <div className='categories'>
                    {post?.category ? post.category.map((item, index) => (
                        <span key={item} className='category'>{item}{index < post.category.length - 1 && ', '}</span>
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
                <p>{new Date(post.createdAt).toLocaleDateString()}</p>
            </div>
        </div>
    );
}

export default Post;
