import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import PostCard from './Post/PostCard';

export default function ProfileFeed() {

   const[showAllFeed,setShowAllFeed] = useState([]||0);
   
   const token = localStorage.getItem("token");

    useEffect(()=>{
         async function getAllPost() {

            try{
                const response = await axios.get("http://localhost:5000/v1/feed",{
                     headers:{
                        "Authorization":`Bearer ${token}`
                     }
                });
                  
                setShowAllFeed(response?.data?.feedPost);
                toast.success(response?.data?.message);
                
            }catch(err){
                  if(err?.response?.data)
                  {
                     toast.error(err?.response?.data?.message);
                  }else{
                    
                     toast.error("NetWork Error");
                      console.error(err.message );
                  }
            }
           
         }

         getAllPost();
    },[token]);


  return (
    <div>
           {
             showAllFeed.map((post)=>(<PostCard key={post._id} post={post} />))
           }
    </div>
  )
}
