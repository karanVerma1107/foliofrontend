import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { allpostsaction } from '../actions/postsaction.js'
import './posts.css'
import Post from './post.jsx';
import Loading from '../loading.jsx';
import { MentionProvider } from '../../mentionLogic/useMention.jsx';
import useGlobalKeyListener from '../../mentionLogic/keyListener.jsx';
import MentionButton from '../../mentionLogic/mentionButton.jsx';
import { profileloader } from '../actions/loadprofileAction.js';


const Posts = () => {

  


 const dispatch = useDispatch();

   


const {posts, loading} = useSelector(state=>state.posts);
//console.log("posts are: ", posts);
const [activePostId, setActivePostId] = useState(null);


useEffect(()=>{
dispatch(profileloader());  
console.log("Fetching posts");
dispatch(allpostsaction());
},[dispatch])

const { User, Isauth } = useSelector(state => state.displayprofile);
useGlobalKeyListener();

const handlePostClick = (postId) => {
    setActivePostId(prevPostId => (prevPostId === postId ? null : postId));
};

//console.log("isauth status hereee:", Isauth)
  return (
   // <MentionProvider>
      //  {useGlobalKeyListener()}
    <div className='content'>
        {loading ? (
            <div className='load'><Loading /></div>
        ) : (
            <div className='post-container'>
                {posts && posts.map((post) => {
                    return (
                        <li key={post._id}>
                            <Post post={post} Isauth={Isauth} User={User} 
                             showComments={activePostId === post._id} 
                             onPostClick={handlePostClick}  />
                        </li>
                    );
                })}
            </div>
           
        )}
       
    </div>
//</MentionProvider>
  )
}

export default Posts