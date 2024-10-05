import React, { useEffect, useState } from 'react'
import './profile.css'
import pic from './pictemp.png'
import Loading from '../src/loading';
import { useDispatch, useSelector } from 'react-redux'
import { profileloader } from '../src/actions/loadprofileAction';

const Userprofile = () => {
  
  const{  loading, success, error, User, followersCount, followingCount} = useSelector((state)=> state.displayprofile);
  
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(profileloader());
    },[dispatch])

    



const [displaypic , setdisplaypic] = useState(pic);

useEffect(() => {
  if (User && User.display_pic && User.display_pic.length > 0) {
    setdisplaypic(User.display_pic);
  } else {
    setdisplaypic(pic);
  }
}, [User]); 



if(!User || loading){
  return <div className=' loadingc'><Loading/></div>
}





  return (
    <>
    <div className='mainco'>
 <div className='upper-stuff'>
     <div className='followers'>
 <h2>{followersCount}</h2>     
<h2>Follwers</h2>
     </div>
     <div className='profilepic'>
<img  className='userpic' src={displaypic} alt='user-profile' />
<h3>{User.userName}</h3>
     </div>
     <div className='following'>
     <h2>{followingCount}</h2>
<h2>Following</h2>
     </div>
 </div>


 <div className='editbloc'>
<h3> <a href='###'>Edit profile</a></h3>
<h3> <a href='###'>Posts</a></h3>


 </div>

 <div className='aboutcon'>



 </div>
 
    </div>
    
    
    </>
  )
}

export default Userprofile