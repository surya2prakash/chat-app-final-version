   import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import PostCard from './PostCard';
   
   export default function PostList() {

    const [posts,setPosts] = useState([]);
    


       async function getMyAllPost()
          {

            let token = localStorage.getItem("token");
            try{
              
              
                const response = await axios.get("http://localhost:5000/v1/myposts",{
                    headers:{
                        "Authorization":`Bearer ${token}`
                    }
                });

                    let result = await response.data;
                  toast.success(result?.message);
                 setPosts(response?.data?.post);
                 


            }catch(err){
              if(err?.response?.data)
              {
                 toast.error(err.response?.data?.message)
              }else{
                toast.error("NetWork Error !!");
              }

            }

          }

    useEffect(()=>{
       

          getMyAllPost();
    },[]);
     return (
       <div>
               {
                
                 posts.length === 0 ?(<p>No Post</p>):(posts.map((post)=>(<PostCard key={post._id} post={post} />))) 
               }
       </div>
     )
   }
   