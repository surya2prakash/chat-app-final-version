import React, { useState } from 'react'

import styles from './login.module.css'


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
              const response = await fetch(URL,{
                  method:"POST",
                  headers:{
                      "content-Type":"application/json"
                  },
                  body:JSON.stringify(data)
              });

              const result = await response.json();

              if(result.success)
              {
                   setLogIn(true);
                   navigate('/profile');
              }else{
                  setLogIn(false);
              }

              setValue({
            password:"",
            email:""
                });
       }catch(err){
        console.error(err.message);

       }finally{
        setLoading(false);
       }  

    }

  return (
    <div className='container'>
           
           <div className={styles.logInContainer}>
           <h2 className={styles.logoText}>Instagram</h2>
          <form className={styles.logInform} onSubmit={submitHandler}>
                  <input type='email' placeholder='username or email address' value={inputValue.email} name='email' onChange={changeHandler} />
                  <input type='password' placeholder='Password' value={inputValue.password} name='password' onChange={changeHandler}/>
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
