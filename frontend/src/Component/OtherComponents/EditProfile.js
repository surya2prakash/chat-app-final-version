import axios from 'axios';
import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify';

export default function EditProfile() {

     const myRef = useRef();

     //file select krna hai 
     const [selectfile,setSelectedfile] = useState({});
     const [showBtn,setshowBtn] = useState(false);
     const[imageUrl,setImageUrl] = useState(null);

     function changeHandler(event){
        //file le lo
           const file = event.target.files[0];
           if(file)
           {
              setSelectedfile(file);
             setshowBtn(true);
           }
         
     };

     function clickHandler(){
          myRef.current.click();
         
     }
      

    

     const token = localStorage.getItem("token");

     async function sendProfileImage(){
         const formData = new FormData();
         formData.append("file",selectfile);
         try{

            const response = await axios.post("http://localhost:5000/v1/profileImage",formData,{
                 headers:{
                    "Authorization":`Bearer ${token}`
                 }
            });

            

             setImageUrl(response?.data?.profileImage);
             toast.success(response?.data?.message);

         }catch(err){
             
            if(err?.response?.data)
            {
                toast.error(err?.response?.data?.message);
            }else{
                 toast.error("NetWork Error");
                 console.error(err.message);
            }
         }
     }

  return (
    <div>
        <div>
            <img src={imageUrl} alt='no' />
        </div>
        <div>
         {
            showBtn ? (
              <button onClick={sendProfileImage}>Upload Image</button>):(<button onClick={clickHandler}>Change Proifle Image</button>)
         } 
          <input type='file' ref={myRef} accept='image' onChange={changeHandler} />
          </div>
    </div>
  )
}
