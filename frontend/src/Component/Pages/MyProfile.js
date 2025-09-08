import axios from 'axios';
import React, {  useEffect, useState } from 'react'
import { BsBookmarkStar } from "react-icons/bs";
 import { BsGrid3X3 } from "react-icons/bs";
import { toast } from 'react-toastify';
import FollowersList from '../OtherComponents/FollowersList';
import FollowingList from '../OtherComponents/FollowingList';
import {  Outlet, useNavigate } from 'react-router-dom';
import PostList from '../Post/PostList';

export default function MyProfile({imgProfile}) {


  const token = localStorage.getItem("token");
  
    const navigate = useNavigate();


     const [showFollowers,setShowfollowers] = useState(false);
     const [showfollowing,setshowfollowing] = useState(false);
    const [followers,setFollowers] = useState([]);
    const [following,setFollowing] = useState([]);

    //total followers posts and following show krne ke liye ---->

    const [showAll,setShowAll] = useState({});

    
  
  useEffect(()=>{

    async function getProfile()
    {
        try{
         

          const response = await axios.get("http://localhost:5000/v1/profile",{
             headers:{
              "Authorization":`Bearer ${token}`
             }
          })
          

          setShowAll(response?.data?.myProfile);
              

        }catch(err){
            if(err?.response?.data)
            {
               toast.error(err?.response?.data?.message);
            }else{
                toast.error("Network Error");
                console.error(err.message);
            }
        }
    }
       getProfile();
  },[token]);






          async function fetchFollowers(){
              try{
                 const response = await axios.get("http://localhost:5000/v1/followers",{
                    headers:{
                      "Authorization":`Bearer ${token}`
                    }
                 })

                 let result = await response?.data;
                   setShowfollowers(true);
                 console.log(result);
                 setFollowers(result?.yourFollowers)
              }catch(err){
                  if(err?.response?.data)
                  {
                        toast.error(err?.response?.data?.message)
                  }else{
                      console.error(err.message);
                      toast.error("Network error");
                  }
              }
          }

          
   

 

      async function fetchfollowings(){
 
      try{
          const response = await axios.get("http://localhost:5000/v1/following",{
              headers:{
                "Authorization":`Bearer ${token}`
              }
          });

          const result = await response?.data;
              setFollowing(result?.yourFollowing);
             setshowfollowing(true);
          console.log(result);
        }catch(err){
          if(err?.response?.data)
          {
            toast.error(err?.data?.message);
          }else{
              console.error(err.message);
              toast.error("Network error");
          }

        }
      }
      
  
//click hone pe backend call karo followers ke liye 
    function clickFollowerHandler(){
          fetchFollowers();
    };

    //click hone pe backend function call kro following lane ke liye
    function clickfollowingHandler(){
        fetchfollowings();
    };

   imgProfile(showAll?.profileImage?.secure);

  return (
    <div>
      <div>
           
           <p><span>{showAll?.fullName}</span> username</p>
           <img src={showAll?.profileImage?.secure} alt='no' />
      </div>
          
          <div>
            
            <button onClick={()=>{navigate("/profile/editProfile")}}>Edit Profile</button>
              <button onClick={()=>{  navigate('/profile/chat') }}>message</button>
                 <Outlet/>
          </div>
          
          <div>
                {
                  showfollowing && (<FollowingList following={following}/>)
                }
               
                <p onClick={clickfollowingHandler} ><span>{showAll?.totalfollowing}</span>Following</p>
          </div>
          <div>
                {
                   showFollowers && (<FollowersList followers={followers} />)
                }
              <p onClick={clickFollowerHandler} ><span>{showAll?.totalFollowers}</span>Followers</p>
          </div>

          <div>
               <div>
               
               <span>{showAll?.totalPost}</span>
                   userPosts
               </div>
               <div>
                <div><BsGrid3X3 />
                <div>
                  <PostList/></div></div>
                <div> <BsBookmarkStar />
                   usersavepost</div>
                
               </div>
          </div>
         
    </div>
  )
}
