
import {  Route, Routes } from 'react-router-dom';
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
import Protected from './Component/ProtectedRoute/Protected';

function App() {
   
    const [isLogIn , setLogIn] = useState(()=>{
        return !!localStorage.getItem("token");
    });

  return (
    <div className="App">
           <Routes>
                <Route path='/' element={<Login setLogIn={setLogIn}/>}></Route>
                <Route path='/signUp' element={<SignUp/>}></Route>
                <Route path='/profile' element={<Protected isLogIn={isLogIn}><Profile/></Protected>}
                >
                  <Route path='post' element ={
                      <PostCreate/> 
                  }/>
                  <Route path='chat' element = {<MessageChat/> } />
                  <Route path='explore' element = {<Explore/> } />
                  <Route path='notification' element = {<Notification/>} />
                  <Route path='myprofile' element = {<MyProfile/>} />
                  
                  </Route>
           </Routes>
    </div>
  );
};

export default App;
