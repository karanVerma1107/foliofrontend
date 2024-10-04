import React, { useEffect, useState } from 'react'
import './profile.css'
import { useDispatch, useSelector } from 'react-redux'
import { profileloader } from '../src/actions/loadprofileAction';

const Userprofile = () => {
const dispatch = useDispatch();
const{ output, Loading, success, error} = useSelector((state)=> state.displayprofile);


useEffect(()=>{
dispatch(profileloader());
},[])

  return (
    <>
    <div className='mainco'>
 <h1>i am karan vermsa</h1>
 <h3>
   something is: {output}
 </h3>
    </div>
    
    
    </>
  )
}

export default Userprofile