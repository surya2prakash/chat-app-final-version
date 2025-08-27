
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Component/User/Login';
import { useState } from 'react';
import SignUp from './Component/User/SignUp';
import Profile from './Component/Profile';
import PostCreate from './Component/Post/PostCreate';
import MessageChat from './Component/Pages/MessageChat';
import Explore from './Component/Pages/Explore';
import Notification from './Component/Pages/Notification';
import MyProfile from './Component/Pages/MyProfile';

function App() {
   
    const [isLogIn , setLogIn] = useState(false);

  return (
    <div className="App">
           <Routes>
                <Route path='/' element={<Login setLogIn={setLogIn}/>}></Route>
                <Route path='/signUp' element={<SignUp/>}></Route>
                <Route path='/profile' element={
                  
                    isLogIn ? (<Profile/>):(<Navigate to='/'/>)
                  } >
                  <Route path='post' element ={
                      isLogIn ?(<PostCreate/>):(<Navigate to="/" />) 
                  }/>
                  <Route path='chat' element = {isLogIn ?(<MessageChat/>) :(<Navigate to='/'/>)} />
                  <Route path='explore' element = {isLogIn ?(<Explore/>) :(<Navigate to='/'/>)} />
                  <Route path='notification' element = {isLogIn ?(<Notification/>) :(<Navigate to='/'/>)} />
                  <Route path='myprofile' element = {isLogIn ?(<MyProfile/>) :(<Navigate to='/'/>)} />
                  
                  </Route>
           </Routes>
    </div>
  );
};

export default App;
