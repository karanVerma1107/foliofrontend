import React, { useState } from 'react'
import './header.css'
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { RxCross1 } from "react-icons/rx";


const Header = () => {

const [ismenuopen, setismenuopen] = useState(false);

const toggle = ()=>{
    setismenuopen(!ismenuopen);
}

  return (
    <>
    <div className='container'>
      <h1>  PortX </h1>
      <h1 className='ham' onClick={toggle}>
     { ismenuopen ? <RxCross1/> :  <GiHamburgerMenu /> }
      </h1>

     
    </div>
    { ismenuopen &&  <div className='options'>
<ul>
    <li>
      <a href='/'>Report bug</a>  
    </li>
    <li>
        <a href='/'>About me</a>
    </li>
    <li>
        <a href='/'>copy right</a>
        
    </li>
</ul>
    </div>
}
   
 
    </>
  )
}

export default Header