import React, {  useEffect, useState } from 'react'

import { FaRegComment } from "react-icons/fa";

import { RiShareForwardLine } from "react-icons/ri";
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
import { toast } from 'react-toastify';
import axios from 'axios';
import CommentBox from './CommentBox';

export default function PostCard({post}) {

     const[liked,setLiked] = useState(false)
    
     //ager like count mil gya to vo rakh do nhi mila to 0 ----->
   const [count,setcount] = useState(post.likeCount || 0);

  

   //comment show krne ke liye mujhe state ki need hai --->

   const [showComments,setShowComment] = useState(false);

    function likeClickhandler()
    {
       console.log("click",liked);
         if(liked)
         {
            forUnlike();
           
         }else if(liked === false){
           forLike();
           
         }
      
        
    }
   let id = post._id;
   const token = localStorage.getItem("token");

   
    async function forLike() {
        try{
             

            const response = await axios.post(`http://localhost:5000/v1/like/${id}`,{},{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            })

            let result = response?.data;
           
            //icon ka status update krne ke liye -->
            setLiked(result?.isLiked);

            //likeCount------------->
            setcount(result?.updatedLikeCount);

            toast.success("Like");
            

        }catch(err){
            if(err.response?.data)
            {
                toast.error(err?.response?.data?.message);
            }else{
                console.log(err.message);
                 toast.error("Network error")
            }

        }
        
    }


    async function forUnlike() {
        try{
             

            const response = await axios.delete(`http://localhost:5000/v1/unlike/${id}`,{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            })

            let result = response?.data;
           

            //icon ka status update krne ke liye --->
              setLiked(result?.isLiked);
              //current like count set lao
            setcount(result?.updatedUnlikeCount)

            toast.warn("Unlike");
            
            

        }catch(err){
            if(err.response?.data)
            {
                toast.error(err?.response?.data?.message);
            }else{
                console.log(err.message);
                 toast.error("Network error")
            }

        }
        
    }


    useEffect(()=>{
          async function forLike() {
        try{
             

            const response = await axios.get(`http://localhost:5000/v1/getlikes/${id}`,{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            })

            let result = response?.data;

            console.log(result);
            setcount(result?.totallikeCount);
            
                 setLiked(result?.isLiked);
           
            
                
              
            
            

        }catch(err){
            if(err.response?.data)
            {
                toast.error(err?.response?.data?.message);
            }else{
                console.log(err.message);
                 toast.error("Network error")
            }

        }
        
    }
     forLike();
    },[id,token])
     

  return (
    <div>
          <img src={post.imageUrl} alt='no' />
          <p>{post.caption}</p>

          <div>
            {
                liked ? (  <FcLike onClick={likeClickhandler}/> ):( <FcLikePlaceholder onClick={likeClickhandler}/>)
            }
            <p>{count}</p>
           </div>
           <div> 
            <div>
            <FaRegComment onClick={()=> setShowComment(prev => !prev)}/>
                {
                    showComments && <CommentBox postId={id}/>
                }
                <p>{post.commentCount}</p>
                </div>
            <RiShareForwardLine />
          </div>
    </div>
  )
}
