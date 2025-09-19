import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function SearchBar() {

  const [inputValue,setInputValue] = useState("");

  

  const [name,setname]= useState({});

  const [profileId,setProfileId] = useState("");

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
   async function searchProfile(){
        try{

          const response = await axios.get("http://localhost:5000/v1/finduser",{
             params:{
               name:inputValue
             },
          
              
            headers:{
              "Authorization":`Bearer ${token}`
            }
          })

         

          
          setname(response?.data?.user);
          setProfileId(response?.data?.user?._id);
          toast.success(response?.data?.message);
         


        }catch(err){
           if(err?.response?.data)
           {
            //yee backend se error aa rha hai 
               toast.error(err?.response?.data?.message);
           }else{

               toast.error("Network Problem")
               console.log(err.message);
               
           }
        }
   }



    
    
       function changeHandler(event){
             setInputValue(event.target.value);
            
       }

       function submitHandler(event){
           event.preventDefault();
            searchProfile();
       }
  return (
    <div>
        <div className='seachIcon'>
              <span>
                  <i className="fas fa-search"></i>
              </span>
              <form onSubmit={submitHandler}>
              <input type='text' placeholder='search ' onChange={changeHandler} value={inputValue} />
              </form>
          <div onClick={()=> {navigate(`userProfile/${profileId}`)}}>
              <div>
                 {
                  name?.fullName
                 }
              </div>
              <div>
                {
                  name?.userName
                }
              </div>

              
              </div>
             </div>
    </div>
  )
}
