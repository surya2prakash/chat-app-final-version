import React, {  useState } from 'react'
import styles from './signUp.module.css'

export default function SignUp() {

  const [inputValue,setInputValue] = useState({
                                                  email:"",
                                                  password:"",
                                                  gender:"",
                                                  fullName:"",
                                                  userName:"",
                                                  accountType:"",
                                                     });

  

  const [isLoading,setLoading] = useState(false);

  


function changeHandler (event){
    
  //destructure kr lo  --->
       const {name,value} = event.target;
   setInputValue((prev)=>({
       ...prev,[name]:value
   }))

}

function submitHandler(event){
     event.preventDefault();

   
    signUpForm(inputValue);

};


async function signUpForm(data) {
  try{
        setLoading(true) ;

         const response = await fetch(URL,{
         method:"POST",
         headers:{
          "content-Type":"application/json"
         },
         body:JSON.stringify(data),
   
    })
    const result = await response.json();
    console.log(result);
                    setInputValue({
                                    email:"",
                                    password:"",
                                    gender:"",
                                    fullName:"",
                                    userName:"",
                                    accountType:"",
                                    });
  }catch(err){
        console.error(err.message);

  }finally{
    setLoading(false)
  }
      
  };



  return (
    <div className='SignUp'>

        <form onSubmit={submitHandler}>


              <input type='email' placeholder='email address'value={inputValue.email} onChange={changeHandler} name='email' />
              <input type='password' placeholder='Password' value={inputValue.password} onChange={changeHandler} name='password' />
              <input type='text' placeholder='Full Name' value={inputValue.fullName} onChange={changeHandler} name='fullName' />
              <input type='text' placeholder='Username' value={inputValue.userName} onChange={changeHandler} name='userName' />


              <select onChange={changeHandler} name="accountType" value={inputValue.accountType}>
                  <option value="">--Select --</option>
                  <option value="Private" >Private</option>
                  <option value="Public">Public</option>
                  
              </select>

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

  