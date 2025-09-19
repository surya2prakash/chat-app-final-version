import React  from 'react'
import Navbar from './Navbar'
import { Outlet , useLocation } from 'react-router-dom'
import ProfileFeed from './ProfileFeed';
//import ProfileFeed from './ProfileFeed'

  
  export default function Profile({profileImage}) {

    const location = useLocation();

   const isBaseProfile = location.pathname === '/profile'
    return (
      <div >
            <Navbar imgProfile={profileImage}/>
            {
               isBaseProfile ? (<ProfileFeed/>) : (<Outlet/>)
            }
           
      </div>
    )
  }
  