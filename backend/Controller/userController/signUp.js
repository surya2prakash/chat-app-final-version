
const validator = require("validator");

const bcrypt = require("bcrypt");

const User = require("../../Model/userModel");


exports.signUp=async(req,res)=>{
     try{



      const {firstName,lastName,email,password,confirmPassword,gender} = req.body;
            
          if(!firstName || !lastName)
          {
            return res.status(400).json({
                success:false,
                message:"Enter Name .."
            });
          };

          if(!email)
          {
            return res.status(400).json({
                success:false,
                message:"Email required.."
            });
          }
           if(!validator.isEmail(email))
          {
            return res.status(400).json({
                success:false,
                message:"Invalid Email format."
            })
          }
           if(!email.endsWith("@gmail.com"))
             {
                return res.status(400).json({
                    success:false,
                    message:"Only Gmail is allowed."
                });
             };

          if(!password || !confirmPassword)
          {
             return res.status(400).json({
                success:false,
                message:"Password required.."
             });
          }
           if(password !== confirmPassword)
                   {
                     return res.status(400).json({
                        success:false,
                        message:"Password Not Match"
                     });
                   }
                    if(password.length < 8 || confirmPassword.length < 8)
                   {
                      return res.status(400).json({
                        success:false,
                        message:"Password Must be greater then 8 length"
                      })
                   }
                    if(!validator.isStrongPassword(password,{minLength:8,minLowercase:1,minUppercase:1,minSymbols:1,minNumbers:1}))
                       {
                           return res.status(400).json({
                            success:false,
                            message:"Password must be include upperCase,lowerCase,number & symbol"
                           })
                       }

          if(!gender)
          {
             return res.status(400).json({
                success:false,
                message:"Select the gender.."
             });
          };

          //check kar lo kahin pahle se user account create nhi kiya hai --->
           
          const checkUser = await User.findOne({email});

          if(checkUser)
          {
            return res.status(400).json({
                success:false,
                message:"Email already registered.."
            })
          }

          
     //password ko hash kar do ---->

     const hashPassword = await bcrypt.hash(password,10);

       if(!hashPassword)
         {
              return res.status(400).json({
                success:false,
                message:"Unable to hash the password"
              });
         };
        
         const newUser = await User.create({
              firstName,
              lastName,
              email,
              password:hashPassword,
              gender,
         })
           
        

         return res.status(201).json({
            success:true,
            message:"Account Created .",
            user:newUser
         })

     }catch(err)
     {
        console.error(err.message);
        return res.status(500).json({
            success:false,
            message:"signUp problem"
        })

     }


}