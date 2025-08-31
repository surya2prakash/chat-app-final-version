import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { MdOutlineDelete } from "react-icons/md";

export default function CommentBox({postId}) {

  
  const[comment,setComment]= useState("");

  const[allcomments,setComments] = useState([]);

         const token = localStorage.getItem("token");

        
   
  //jab user comment icons pe click kre ga tab yee wala chle ga  ----->       
   useEffect(()=>{
    async function fetchAllComments()
    { 

   
         try{
           

            const response = await axios.get(`http://localhost:5000/v1/comments/${postId}`,{
                  headers:{
                     "Authorization":`Bearer ${token}`
                  }
            })

            let result = await response?.data;

             console.log(result);

            toast.success(result.message);

             setComments(result?.comments || [])
            
            
            
         }catch(err){
            if(err?.response?.data)
            {
                  toast.error(err?.response?.data?.message);
            }else{
                console.error(err);
                toast.error("NetWork Error")
            }
         }
    }

     
            fetchAllComments();
    },[postId,token])

    //change Handler for comment ---->
    function commentChangeHandler(event){
          setComment(event.target.value);
    }


    //function tab chle ga jab user comment kre aur user ko updated comment show krna hai
     async function fetchAllComments()
    { 

   
         try{
           

            const response = await axios.get(`http://localhost:5000/v1/comments/${postId}`,{
                  headers:{
                     "Authorization":`Bearer ${token}`
                  }
            })

            let result = await response?.data;

             console.log(result);

            toast.success(result.message);

             setComments(result?.comments || [])
            
            
            
         }catch(err){
            if(err?.response?.data)
            {
                  toast.error(err?.response?.data?.message);
            }else{
                console.error(err);
                toast.error("NetWork Error")
            }
         }
    }

    async function sendComment(comment,postId){
          try{
            const response = await axios.post(`http://localhost:5000/v1/sendComment/${postId}`,{comment},{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            });

            let result = await response?.data;
            
            toast.success(result?.message);
            setComment("");
            fetchAllComments();

          }catch(err){
              
            if(err?.response?.data)
            {
                  toast.error(err?.response?.data?.message);
            }else{
                console.error(err);
                toast.error("NetWork Error")
            }
          }
    }
  
    function submitHandler(event){
         event.preventDefault();

         sendComment(comment,postId);
    }

async function deleteComment(commentId){
    try{
        console.log(commentId)

        const response = await axios.delete(`http://localhost:5000/v1/deletecomment/${commentId}`,{
             headers:{
                "Authorization":`Bearer ${token}`
             }
        });

        let result = response?.data
        toast.warning(result?.message);
        fetchAllComments();

    }catch(err){
        if(err?.response?.data)
        {
            toast.error(err?.response?.data?.message)
        }else{
             toast.error("NetWork Error")
        }
    }
}      
console.log(allcomments);

  return (
    <div>
    <div>
       {
       
         allcomments.length >0 ? (allcomments.map((singleComment,index)=>(
         
            <p key={index}>{singleComment.comment} <span><MdOutlineDelete onClick={()=>{deleteComment(singleComment._id)}}/></span></p>
           
          
       )) ) :(<p>empty</p>)
        }
       <form onSubmit={submitHandler}>
        <input type='text' placeholder='comment' onChange={commentChangeHandler} value={comment} />
        <button>Comment</button>
        </form>
    </div>
    </div>
  )
}
