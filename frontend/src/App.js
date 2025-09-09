
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
import OthersProfile from './Component/OtherComponents/OthersProfile';
import EditProfile from './Component/OtherComponents/EditProfile';
import Chat from './Component/Pages/Chat';

function App() {
   
    const [isLogIn , setLogIn] = useState(()=>{
        return !!localStorage.getItem("token");
    });

    const [getImageProfile,setImageProfile]=useState("");

  return (
    <div className="App">
           <Routes>
                <Route path='/' element={<Login setLogIn={setLogIn}/>}></Route>
                <Route path='/signUp' element={<SignUp/>}></Route>
                <Route path='/profile' element={<Protected isLogIn={isLogIn}><Profile profileImage={getImageProfile}/></Protected>}
                >
                  <Route path='post' element ={
                      <PostCreate/> 
                  }/>
                  <Route path='chats' element = {<MessageChat/> } />
                  <Route path='explore' element = {<Explore/> } />
                  <Route path='notification' element = {<Notification/>} />
                  <Route path='myprofile' element = {<MyProfile imgProfile={setImageProfile}/>} />
                      
                  <Route path='userProfile/:id' element={<OthersProfile/>} />
                  <Route path='editProfile' element={<EditProfile/>}/>
                  <Route path='chat' element={<Chat/>}/>
                 
                  </Route>
           </Routes>
    </div>
  );
};

export default App;
