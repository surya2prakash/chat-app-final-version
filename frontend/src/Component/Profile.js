  import React  from 'react'
import Navbar from './Navbar'
import { Outlet , useLocation } from 'react-router-dom'
//import ProfileFeed from './ProfileFeed'
import PostList from './Post/PostList';
  
  export default function Profile() {

    const location = useLocation();

   const isBaseProfile = location.pathname === '/profile'
    return (
      <div >
            <Navbar/>
            {
               isBaseProfile ? (<PostList/>) : (<Outlet/>)
            }
            
{/*             
            <ProfileFeed/> */}
            
      </div>
    )
  }
  