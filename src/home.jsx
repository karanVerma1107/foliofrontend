import React, { useEffect, useState } from 'react'

import './home.css'
import { FaScroll } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { SiGooglemessages } from "react-icons/si";
import { MdPostAdd } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { AiFillNotification } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';


const Homesidebar = () => {

const navigate = useNavigate();



 const [activeindex, setactiveindex] = useState(0);

 
 
 const handleclick = (index, path, e)=>{
  e.preventDefault();

 setactiveindex(index);

 navigate(path);
 
  console.log('active index is: ', activeindex);
 }  

 


  return ( 
    
  <>
   <div className='sidebar'>
<ul>
  <li>
    <a href='/' className={activeindex === 0 ? '' : ''} onClick={(e)=>handleclick(0, '/', e)}><FaScroll/></a>
  </li>
  <li>
    <a href='/search' className={activeindex === 1 ? '' : ''} onClick={()=>handleclick(1)}><FaSearch/></a>
  </li>
  <li>
    <a href='/notifications' className={activeindex === 2 ? '' : ''} onClick={()=>handleclick(2 )}><AiFillNotification/></a>
  </li>
  <li>
    <a href='#)#' className={activeindex === 3 ? '' : ''} onClick={()=>handleclick(3 )}><SiGooglemessages/></a>
  </li>
  <li>
    <a href='/Create-Post' className={activeindex === 4 ? '' : ''} onClick={()=>handleclick(4)}><MdPostAdd/></a>
  </li>
  <li>
    <a href='/signup'  onClick={(e)=>handleclick(5, '/signup', e)}  className={activeindex === 5 ? '' : ''} rel='noreferrer' target="_blank"><FaUserAlt/></a>
  </li>

</ul>

   </div>



    
    </>
  )
}

export default Homesidebar