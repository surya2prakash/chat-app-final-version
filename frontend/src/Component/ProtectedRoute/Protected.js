

import React from 'react'
import { Navigate } from 'react-router-dom'

export default function Protected({isLogIn,children}) {
  
       if(!isLogIn)
       {
          return <Navigate to='/' replace/>
       }
       return children;
  
}

