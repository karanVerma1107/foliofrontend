import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { allpostsaction } from '../actions/postsaction.js'
import './posts.css'
import Post from './post.jsx';
import Loading from '../loading.jsx';


const Posts = () => {

    const dispatch = useDispatch();
const {posts, loading} = useSelector(state=>state.posts);
console.log("posts are: ", posts);
useEffect(()=>{
dispatch(allpostsaction())
},[dispatch])
  return (
    <div className='content'>
   {loading ? <><div className='load'><Loading/> </div></> : <>
    <div className='post-container'>
{posts && posts.map((post)=>{
    return <li key={post._id}><Post post={post} key={post._id}/></li>
})}
    </div>
   </>}
       
     
        </div>
  )
}

export default Posts