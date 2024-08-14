import React from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import './App.css'
import Homesidebar from './home.jsx'

import Store from './store.js'
import Signup from './authentication/signup.jsx'
import Header from './header.jsx'
import Posts from './postsshow/posts.jsx'
import { useSelector } from 'react-redux'
import TakeUserName from './authentication/takeUserName.jsx'

function App() {
  

  const {isAuthenticated} = useSelector((state)=>state.me)



  return (
    <>
    
     <Router>
    <Header/>
    <Homesidebar/>
    
   
      <Routes>
       
       <Route exact path='/' element={<Posts/>}/>

      <Route exact path='/signup' element={<Signup/>}/> 
      <Route exact path='/username' element={<TakeUserName/>}/> 


        
      </Routes>
     </Router>
     
    </>
  )
}

export default App
