//jab user dusre ki profile pe click kre to yee comonent open hoga

import axios from 'axios';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

export default function OthersProfile() {
    
     const {id} = useParams();
     
     const navigate = useNavigate();
       async function unfollowUser(){
        try{

            const response = await axios.delete("http://localhost:5000/v1/unfollow",{
                params:{
                  "id":id
                },
                headers:{
                   "Authorization":`Bearer ${token}`
                }
            });

             
            toast.success(response?.data?.message);

        }catch(err){
            if(err?.response?.data)
            {
               toast.error(err?.response?.data?.message);
            }else{
                 toast.error("NetWork Error");
                 console.log(err.message);
            }
        }
    }
     

    const token = localStorage.getItem("token");
   
    async function followUser(){
         try{
               const response = await axios.post("http://localhost:5000/v1/follow",{},{
                params:{
                      "id":id
                },
                  headers:{
                     "Authorization":`Bearer ${token}`
                  }
               });

               toast.success( response?.data?.message);
               
         }catch(err){
            if(err?.response?.data)
            {
               toast.error(err?.response?.data?.message);
            }else{
                 toast.error("NetWork Error");
                 console.log(err.message);
            }
         }
    };

   
  return (
    <div>
            <button onClick={followUser}>Follow</button>
            <button onClick={unfollowUser}>Unfollow</button>
            <button onClick={()=>{  navigate("chat") }}>message</button>
    </div>
  )
}
