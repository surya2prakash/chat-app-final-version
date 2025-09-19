  import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import styles from './Navbar.module.css'

import { toast } from 'react-toastify';
import SearchBar from './OtherComponents/SearchBar';
  
  export default function Navbar({imgProfile}) {


   const navigate = useNavigate();
   
    return (
    <nav className={styles.navmain}>
      <div className={styles.navContainer}>
           {/* instagram logo */}
          <div>
           <Link to="#" >
              <img src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png' alt='no'/>
           </Link>
            </div>

             <div>
               <SearchBar/>
             </div>

             <div className={styles.otherIcons}>
                 <Link to='/profile'>
                    <i className="fas fa-home text-2xl text-black"></i>
                 </Link>
                 <Link to='chats'>
                     <i className="fab fa-facebook-messenger text-2xl text-black"></i>
                 </Link>
                 <Link to='post'>
                         <i className="far fa-plus-square text-2xl text-black"></i>
                 </Link>
                 <Link to='explore'>
                    <i className="far fa-compass text-2xl text-black"></i>
                 </Link>
                 <Link to='notification'>
                       <i className="far fa-heart text-2xl text-black"></i>
                 </Link>
           
           {/* profile --------> */}
          <div className={styles.myProfile}>
               <img src={imgProfile} alt='no' />
                <Link to='myprofile'>
                   <i className="fas fa-user-circle w-5"></i> Profile
                </Link>
                   
                

                {/* <Link to='setting'>
                   <i className="fas fa-cog w-5"></i> Settings
                </Link> */}

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
  