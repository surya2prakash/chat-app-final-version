import axios from 'axios';
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

//mujhe chahiye most like photos




export default function Explore() {


  const token = localStorage.getItem("token");
  useEffect(()=>{

    async function fetchPosts(){
        try{

           const response = await axios.get("http://localhost:5000/v1/explore/posts",{
              headers:{
                "Authorization":`Bearer ${token}`
              }
           });

           console.log(response?.data);

        }catch(err){
            if(err?.response?.data)
            {
                toast.error(err?.response?.data?.message);
            }else{
                 toast.error("Network Problem");
                 console.error(err.message);
            }
        }
    }
     fetchPosts();
},[token])
  return (
    <div>
        <div>
         
        </div>
       
    </div>
  )
}
