import React, { useEffect, useState } from 'react'
import './take.css'
import { useDispatch, useSelector } from 'react-redux';
import { isusernamedoit, setusername } from '../actions/setprofileAction';

const TakeUserName = () => {
let [valid, setvalid] = useState(false);
const {message, success, loading, error} = useSelector((state)=>state.isUsernameAvialable);
const[inputname , setinputname ] = useState('');
const dispatch = useDispatch();

const checkIsAvia = async(e)=>{
  e.preventDefault();
 
  setinputname(e.target.value);
  console.log("checking in")
 await dispatch(isusernamedoit(e.target.value));

  
  console.log('valid', valid)
  if(loading){
    console.log('loading hai')
  }}

const setNamehandler = (e)=>{
  e.preventDefault();
  if(valid){
console.log('set name is ', inputname);
dispatch(setusername(inputname));
  }
 // dispatch(setusername(e.target.value));
}

  useEffect(()=>{
    if(success){
      setvalid(true);
    }
    if(error){
      setvalid(false);
    }
  },[success, error]);

  
  
  return (
    <>
    <div className='working'>
<div className='info'>
  <h2>While you choose a UserName for yourself..</h2>
  <ul>
    <li>Your username must be unique to ensure that it represents only you. Avoid using common names to prevent confusion with other users.
</li>
    <li>Your username should be greater than 5 characters in length. You can use letters, numbers, and special characters to create a distinctive username.

</li> 
    <li>Your username is important as it allows others to visit your profile directly. Choose a username that reflects your identity and is easy for others to remember.
    </li>
  </ul>
  <h4>PortX is a dynamic portfolio creation platform that emphasizes networking and collaboration. Users can design resumes, upload projects, and connect with others through direct messaging. The platform allows users to find and connect with peers based on their colleges and shared interests, fostering a vibrant community dedicated to professional growth and achievement.</h4>
   </div>
<div className='input'> 
  <h3>
    Enter a Username
  </h3>
  <h4>Make sure to read all Instructions carefully.</h4>

  <input type='text' required placeholder='Enter your Username' value={inputname} onChange={checkIsAvia}/>
  {loading ?  <div className='lood'><span className="ader"></span></div>  :<> <div className='less'>  <button  className={valid? 'valid' : 'notvalid'}  onClick={setNamehandler} > Set Username </button> </div> </> }
  
  <div className='showM'>
{success ? <h5>{message}</h5>: <h5>{error}</h5>}
  </div>
</div>



    </div>
    
    </>
  )
}

export default TakeUserName