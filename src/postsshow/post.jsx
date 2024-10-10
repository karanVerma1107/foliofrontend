{/*import React, { useEffect, useState } from 'react'
import './post.css'
import Carousel from 'react-material-ui-carousel'
import { FaStar } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { likedislike } from '../actions/postsaction';
import { useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { userdetailsfetch } from '../actions/authActions';

const Post = ({post}) => {

const {loading, message, error} = useSelector(state=>state.like);
const {User, isAuthenticated} = useSelector((state)=>state.me)
const[like,setlike] = useState(false);
const alert = useAlert();
  const dispatch = useDispatch();
const handlelike = () =>{
  if(isAuthenticated){
  dispatch(likedislike(post._id));
  liketoggle();
  }
}



const liketoggle =()=>{
  setlike(!like);

  if(!like){
    post.stars = post.stars + 1
  }else{
    post.stars = post.stars - 1
  }
}

useEffect(()=>{
  dispatch(userdetailsfetch());

console.log('user is : ', User);
},[])



  return (

    <div className='post'>
    <div className='user-details'>
     <img src={post.user_name.display_pic}/>
     <h3>{post.user_name.userName}</h3>
    </div>

    <div className='post-caption'>
   <p> {post.caption} {isAuthenticated && <> {User.User.userName}  </>} </p>
   <div className='cat'> {post?.category ? post.category.map((item, index)=>(
    <span key={item}>{item} {index < post.category.length - 1 && ' '}</span>
   )) : null} </div>
    </div>

{post.image &&  <div className='product-img'>
<Carousel className='Carousel'>
           {post?.image && post.image?.map((item)=>(
                <img
                className='carusel-image'
                key={item}
                src={item}
                alt={` slide`}
                />
            ))}
            </Carousel>
</div> }    

<div className='like-comm'>
<div className='like'>
<FaStar onClick={handlelike} />
</div>
<h1>{post.stars}</h1>
<div className='comm'>

</div>

</div>

    
    </div>
  )
}

export default Post */}


import React, { useEffect, useState } from 'react';
import './post.css';
import Carousel from 'react-material-ui-carousel';
import { FaStar } from "react-icons/fa6";
import { profileloader } from '../actions/loadprofileAction';
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
    }else{
      alert.error("Login to access this resource")
    }

  };

  const toggleLike = () => {
    setLike(!like);
    post.stars = like ? post.stars - 1 : post.stars + 1;
  };

  useEffect(() => {
    dispatch(userdetailsfetch());
     
    console.log('user is : ', User);
  }, []);

  return (
    <div className='post'>
      <div className='user-details'>
        <img src={post.user_name.display_pic} alt="User" className='user-img' />
        <h3>{post.user_name.userName}   --</h3>
        <p>   ({isAuthenticated && <> {User.User.userName} </>})</p>
      </div>

      <div className='post-caption'>
        <p>{post.caption}  </p>
        <div className='cat'>
          {post.category && post.category.map((item, index) => (
            <span key={item}>{item}{index < post.category.length - 1 && ', '}</span>
          ))}
        </div>
      </div>

      {post.image && (
        <div className='product-img'>
          <Carousel className='Carousel'>
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
        <div className='like' onClick={handleLike} style={{ cursor: 'pointer', color: like ? 'orangered' : 'black' }}>
          <FaStar />
        </div>
        <h2 style={{ color: 'orangered' }}>{post.stars}</h2>
      </div>
    </div>
  );
};

export default Post;
