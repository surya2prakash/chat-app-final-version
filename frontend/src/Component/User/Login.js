import React, { useState } from 'react'

import styles from './login.module.css'



import { toast } from 'react-toastify';


import {useNavigate } from 'react-router-dom';

export default function Login({setLogIn}) {
    
    const [inputValue,setValue] = useState({
            password:"",
            email:""
    });

    const [ isLoading,setLoading] = useState(false);

    const navigate = useNavigate();

    let changeHandler =(event)=>{
       //destructure kar lo -->
        const {name,value}    = event.target
        setValue((previous)=>(
            {
                ...previous,[name] :value
            }
        ))

    }

    function submitHandler(event){
        event.preventDefault();
        
        loginform(inputValue);
    }

    async function loginform(data) {
       try{
           setLoading(true);
              const response = await fetch("http://localhost:5000/v1/login",{
                  method:'POST',
                  headers:{
                    "content-Type":"application/json",
                    
                  },
                  body:JSON.stringify(data)
              })

              const result = await response.json();
             
              

              if(result.success)
              {
                 localStorage.setItem("token",result.token);
                   toast.success(result.message);
                setLogIn(true);
                navigate("/profile");
                 
              }else{
                   toast.error(result.message);
              }
                   
             
               

              setValue({
            password:"",
            email:""
                });
       }catch(err){

        console.log(err.message);
       

       }finally{
        setLoading(false);
       }  

    }

  return (
    <div className='container'>
           
           <div className={styles.logInContainer}>
           <h2 className={styles.logoText}>Instagram</h2>
          <form className={styles.logInform} onSubmit={submitHandler}>
                  <input type='email' placeholder='username or email address' value={inputValue.email} name='email' onChange={changeHandler} autoComplete='current-email' />
                  <input type='password' placeholder='Password' value={inputValue.password} name='password' onChange={changeHandler} autoComplete='current-password'/>
                  <button disabled={isLoading}>
                     {
                      isLoading ?("Login...") :( "Log in")
                      }
                </button>
          </form>

         

          <button onClick={()=> navigate('/signUp')}>Sign Up</button>

          </div>
          
    </div>
  )
}
