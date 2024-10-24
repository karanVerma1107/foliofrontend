import React from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import './App.css'
import Homesidebar from './home.jsx'
import Userprofile from '../profile/Userprofile.jsx'
import Store from './store.js'
import Signup from './authentication/signup.jsx'
import Header from './header.jsx'
import Addpost from '../postoperations/Addpost.jsx'
import Posts from './postsshow/posts.jsx'
import { useSelector } from 'react-redux'
import TakeUserName from './authentication/takeUserName.jsx'
import { MentionProvider } from '../mentionLogic/useMention.jsx'
import User from './OtherUser/User.jsx'
import Notification from './Notifications/Notification.jsx'
import Editprofile from '../profile/Editprofile.jsx'
import User2 from './OtherUser/user2.jsx'

function App() {
  

  const {isAuthenticated} = useSelector((state)=>state.me)



  return (
    <>
    
     <Router>
    <Header/>
    <Homesidebar/>
    <MentionProvider>
   
      <Routes>
       
       <Route exact path='/' element={<Posts/>}/>

      <Route exact path='/signup' element={<Signup/>}/> 
      <Route exact path='/username' element={<TakeUserName/>}/> 
      <Route exact path='/profile' element={<Userprofile/>}/> 
      <Route exact path='/edit-profile' element={<Editprofile/>}/> 
      <Route exact path='/Create-Post' element={<Addpost/>}/> 
      <Route exact path='/:username' element={<User2/>}/> 
      <Route exact path='/notifications' element={<Notification/>}/> 



        
      </Routes>
      </MentionProvider>
     </Router>
     
    </>
  )
}

export default App
