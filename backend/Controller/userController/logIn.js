const User = require("../../Model/userModel");

const bcrypt = require("bcrypt");

const validator = require("validator");

const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.logIn =async(req,res)=>{
    try{

        const{email,password} = req.body;

        //email nhi mila to -->
        if(!email)
        {
            return res.status(400).json({
                   success:false,
                   message:"Email required ."
            })
        }
       
        //email format check kro -->
        if(!validator.isEmail(email))
          {
            return res.status(400).json({
                success:false,
                message:"Invalid email format."
            })
          };

    // gmail hai yaa nhi verify kro --->
      if(!email.endsWith("@gmail.com"))
      {
         return res.status(400).json({
            success:false,
            message:"Only gmail allowed.."
         })
      };

      //check kro password ->nhi mila to 

      if(!password)
      {
        return res.status(400).json({
            success:false,
            message:"Enter the password"
        })
      };

      //check user hai yaa nhi  --->

      const checkingUser = await User.findOne({email}).select("+password");
  
       //user  Nhi hai to --->
      if(!checkingUser)
      {
        return res.status(404).json({
            success:false,
            message:"User Not exist."
        })
      };

      //ager user hai to password verify kro

      const verifyPassword = await bcrypt.compare(password,checkingUser.password);
    
      //password verify nhi hua to --->
      if(!verifyPassword)
      {
        return res.status(401).json({
            success:false,
            message:"Wrong Password."
        })
      };

      //password verify ho gya to  hua to token create kro --->

      //payload bna lo -->
       const payload ={
           id:checkingUser._id,
           email:checkingUser.email
       }
           
       //token create kro ---> payload ,secret key ,options
      const token = jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn:'2h'});

      //token ko header me send karna hai -->
       
      res.header("Authorization",`Bearer ${token}`);
            
      //sab sahi hai to res send kro  ---->
       return res.status(200).json({
           success:true,
           message:"User Login.",
          
       })



    }catch(err){
       console.error(err.message);
       return res.status(500).json({
           success:false,
           message:"Problem while Login"
       })
    }
}