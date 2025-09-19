import React, {  useState } from 'react'
import styles from './signUp.module.css'
import { toast } from 'react-toastify';

import {useNavigate} from 'react-router-dom'

import axios from 'axios'

export default function SignUp() {

  const [inputValue,setInputValue] = useState({
                                                  email:"",
                                                  password:"",
                                                  gender:"",
                                                  fullName:"",
                                                  userName:"",
                                                  
                                                     });

  

  const [isLoading,setLoading] = useState(false);

    const navigate = useNavigate();


function changeHandler (event){
    
  //destructure kr lo  --->
       const {name,value} = event.target;
   setInputValue((prev)=>({
       ...prev,[name]:value
   }))

}

function submitHandler(event){
     event.preventDefault();

    console.log(inputValue);   
    signUpForm(inputValue);

};


async function signUpForm(data) {
  try{
        setLoading(true) ;

        const response = await axios.post("http://localhost:5000/v1/sign",data);
   
  
    const result = response.data;
          //success hai to tost dikha do ---->
           toast.success(result.message);
        

  
                  setInputValue({
                                    email:"",
                                    password:"",
                                    gender:"",
                                    fullName:"",
                                    userName:""
                                    
                                    });

                                    navigate("/")
  }catch(err){
  if (err?.response?.data) {
     //axios --> response ka error
    toast.error(err?.response?.data?.message); 
  } else {
     //axios ka error --->
    toast.error("Something went wrong!");
  }
  }finally{
    setLoading(false)
  }
      
  };



  return (
    <div className='SignUp'>

        <form onSubmit={submitHandler}>


              <input type='email' placeholder='email address'value={inputValue.email} onChange={changeHandler} name='email' autoComplete='new-email' />
              <input type='password' placeholder='Password' value={inputValue.password} onChange={changeHandler} name='password' autoComplete='new-Password'/>
              <input type='text' placeholder='Full Name' value={inputValue.fullName} onChange={changeHandler} name='fullName' autoComplete='new-name' />
              <input type='text' placeholder='Username' value={inputValue.userName} onChange={changeHandler} name='userName' autoComplete='new-userName' />


             

            <div className={styles.radioGroup}>
              <label >
                <input type='radio' value="Male"  onChange={changeHandler} name='gender' checked={inputValue.gender === "Male"} />
                Male
              </label>
              <label>
                <input type='radio' value="Female" onChange={changeHandler} name='gender' checked={inputValue.gender ==="Female"}/>
                Female
              </label>
              <label>
                <input type='radio' value="Other" onChange={changeHandler} name='gender' checked={inputValue.gender ==="Other"}/>
                Other
              </label>
              </div>

              <button disabled={isLoading}>
                {
                 isLoading?("Signing up..." ): ("Sign Up")
                }
                </button>

        </form>

    </div>
  )
};

  