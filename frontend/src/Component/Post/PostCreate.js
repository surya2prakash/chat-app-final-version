 import axios from 'axios';
import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify';
// import styles from './postCreate.module.css'

 
 export default function PostCreate() {

  // input ->state for caption
 
  const [selectedFile,setSelectedFile] = useState("");
  const [caption,setCaption]=useState("");

  const selectFile = useRef(null);

function changeHandler(event){

  const file = event.target.files[0];

  setSelectedFile(file);

}

  function clickHandler(event){
       
      selectFile.current.click();
     
  }

  function captionChange(event)
  {
      setCaption(event.target.value);
  }
 function submitHandler(event){
      event.preventDefault();
        
       
      sendPhoto();
  }

 
  
    
  const token = localStorage.getItem("token");
  
  async function sendPhoto()
  {

    if(!selectedFile)
    {
       toast.error("please select the image");
       return;
    }
    const formData = new FormData();
  
  formData.append("file",selectedFile);
  formData.append("caption",caption);

      try{
        console.log(token);
        const response = await axios.post("http://localhost:5000/v1/postCreate",formData,{
          headers:{
            
            "Authorization" :`Bearer ${token}`,
            //"Content-Type":"multipart/form-data"
          },
        
        })
          
        let result = response.data;
        console.log(result)
        toast.success(response?.data?.message);

      }catch(err)
      {
        if(err.response.data)
        {
          toast.error(err.response?.data.message)
        }else{
          console.log(err.message)
          toast.error("Network Error");
        }
      }
  }

 
  
    
   return (
     <div>
             
         
            <button onClick={clickHandler}>Choose Files</button>
            
            <input type='file'  ref={selectFile}  onChange={changeHandler} accept='image' style={{display:'none'}} />
          
            <form onSubmit={submitHandler}>
                 <input type='text' placeholder='caption' width={100} height={100} value={caption} onChange={captionChange}/>
                 <button  >upload</button>
            </form>
     </div>
   )
 }
 
