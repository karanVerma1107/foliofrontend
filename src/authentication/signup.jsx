import React, { useEffect, useState } from 'react'
import './signup.css'
import { freshsignup, getsignupotp, logined, sendloginotp } from '../actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import    kklt from '../picsinuse/kjjk.png'
import { IoMdArrowRoundBack } from "react-icons/io";
import {useNavigate} from 'react-router-dom';
import { profileloader } from '../actions/loadprofileAction';


const Signup = () => {
    const dispatch = useDispatch();
  
    const navigate = useNavigate();
    const {Isauth} = useSelector((state)=> state.displayprofile);
    const [login, setlogin] = useState(false);
    const[lotptog, setlotptog] = useState(false);
    
const [Name, setName] = useState('');
    const togglelogin = ()=>{
        setlogin(!login);
    }

    


    const [email, setemail] = useState('');
    const[loginotp,setloginotp] = useState('')
    const[signupotp, setsignupotp] = useState('')
    const {loading , message, error, success} = useSelector((state)=>state.loginOTP);
    const {Meess, errR,suuS,loaddinG} = useSelector((state)=>state.signupp);
    const {  Meessage, errorr, loadding, suucess,} = useSelector((state)=>state.signupotp);
    const{ Loading,
      Message,
      Success,
      Error} = useSelector((state)=>state.logined);


    const alert = useAlert();

    const handleloginotp = (e) =>{
      e.preventDefault();
      dispatch(sendloginotp(email));
      
      console.log("email is:", email);
      
    }

    const handleloginprocess = (e)=>{
e.preventDefault();
dispatch(logined(email, loginotp));
navigate("/profile")

    }

    const handlesignupotp =(e)=>{
      e.preventDefault();
const formData = new FormData();
formData.append('name', Name),
formData.append('email', email)


      dispatch(getsignupotp(formData));

     


    }

    
    const handlesignup =(e)=>{
      e.preventDefault();


      dispatch(freshsignup(email, signupotp));
        

      
    }

    useEffect(()=>{

dispatch(profileloader());

      if(success){
        alert.success(message);
        setlotptog(!lotptog);
      }else if(error){
        alert.error(error);
      }


      if(Success){
        alert.success(Message);
      }else if(Error){
        alert.error(Error);
      }



      if(suucess){
        alert.success(Meessage);
        setlotptog(!lotptog);
      }else if(errorr){
        alert.error(errorr)
      }


      if(suuS){
        console.log('abe chal nhi raha');
        alert.success(Meess);
    
        navigate('/username');
        console.log('abe chal nhi raha');
    }else if(errR){
      alert.error(errR);
    }


    },[message, error, success, dispatch,Meess, errR,suuS, Meessage, errorr, suucess, Message,
      Success,
      Error])
   

      if(Isauth){
        navigate('/profile')
      }

  

     const handlelotptog = ()=>{
setlotptog(!lotptog);
     }
  return (
  
    <>
  
    <div className='work'>

<div className='design'>
  <h2>Where Resume Meet Relationships </h2>
  <img src={kklt}/>
</div>




    {login ?  <> <div className='signupform'>

      <h1>SignUp</h1>               

      { lotptog ? <>
             
             <form onSubmit={handlesignup} className='loginotpf'>
     
     <div><h2>Email: </h2><input type='email' value={email} onChange={(e)=>setemail(e.target.value)} placeholder='Enter your email' required /></div>
     <div><h2>OTP: </h2><input type='password' value={signupotp} onChange={(e)=>setsignupotp(e.target.value)} placeholder='Enter OTP' required /></div>
     {loaddinG ?  <div className='lood'><span className="ader"></span></div>  :<> <div className='less'> <span className='logoback' onClick={handlelotptog}><IoMdArrowRoundBack/></span>  <button type='submit'  > SignUp </button> </div> </> }
     </form>
           
     </>  
             : 
     <>
     
     
     
     <form onSubmit={handlesignupotp} className='loginotpf'>
     <div><h2>Name: </h2><input type='name' value={Name} onChange={(e)=>setName(e.target.value)} placeholder='Enter your full name' required /></div>
     <div><h2>Email: </h2><input type='email' value={email} onChange={(e)=>setemail(e.target.value)} placeholder='Enter your email' required /></div>
     
     {loadding ?  <div className='lood'><span className="ader"></span></div>  :   <button type='submit'   > Send OTP </button> }
     </form>
            
           </>
     }




      <p onClick={togglelogin}> already have an account ?</p>
    </div>
   </> : 
    
    
    <><div className='loginform'>
              <h1>SignIn</h1>               

      { lotptog ? <>
             
        <form onSubmit={handleloginprocess} className='loginotpf'>

<div><h2>Email: </h2><input type='email' value={email} onChange={(e)=>setemail(e.target.value)} placeholder='Enter your email' required /></div>
<div><h2>OTP: </h2><input type='password' value={loginotp} onChange={(e)=>setloginotp(e.target.value)} placeholder='Enter OTP' required /></div>
{Loading ?  <div className='lood'><span className="ader"></span></div>  :<> <div className='less'> <span className='logoback' onClick={handlelotptog}><IoMdArrowRoundBack/></span>  <button type='submit'  > SignIn </button> </div> </> }
</form>
      
</>  
        : 
<>



<form onSubmit={handleloginotp} className='loginotp'>

<div><h2>Email: </h2><input type='email' value={email} onChange={(e)=>setemail(e.target.value)} placeholder='Enter your email' required /></div>

{loading ?  <div className='lood'><span className="ader"></span></div>  :   <button type='submit'  > Send OTP </button> }
</form>
       
      </>
}

      
       
       <p onClick={togglelogin}> Dont have an account ?</p>
    </div>
    </>}
   

    
    </div>
    
    
    
    </>

  )
}

export default Signup;