  import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify';
  
  export default function Navbar() {


   const navigate = useNavigate();
   const [inputValue,setInputValue] = useState("");

   function changeHandler(event){
         setInputValue(event.target.value);
   }
    return (
    <nav>
      <div>
           {/* instagram logo */}
          <div>
           <Link to="#" >
              <img src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png' alt='no'/>
           </Link>
            </div>

             <div>
              <span>
                  <i className="fas fa-search"></i>
              </span>
              <input type='text' placeholder='search ' onChange={changeHandler} value={inputValue} />
             </div>

             <div>
                 <Link to='/profile'>
                    <i className="fas fa-home text-2xl text-black"></i>
                 </Link>
                 <Link to='/chat'>
                     <i className="fab fa-facebook-messenger text-2xl text-black"></i>
                 </Link>
                 <Link to='/post'>
                         <i className="far fa-plus-square text-2xl text-black"></i>
                 </Link>
                 <Link to='/explore'>
                    <i className="far fa-compass text-2xl text-black"></i>
                 </Link>
                 <Link to='/notification'>
                       <i className="far fa-heart text-2xl text-black"></i>
                 </Link>
           
           {/* profile --------> */}
          <div>
               <img src='' alt='no' />
                <Link to='/user'>
                   <i className="fas fa-user-circle w-5"></i> Profile
                </Link>

                <Link to='/save'>
                     <i className="far fa-bookmark w-5"></i> Saved
                </Link>

                <Link to='/setting'>
                   <i className="fas fa-cog w-5"></i> Settings
                </Link>

                <div></div>
                <button onClick={()=>{localStorage.removeItem("token")
                    
                     navigate('/');

                     toast.success("Log Out Successfully");
                }}>Log Out</button>
          </div>
            </div>
      </div>
      </nav>
    )
  }
  