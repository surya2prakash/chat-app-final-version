const mongoose = require("mongoose");
const { trim } = require("validator");


const userSchema = new mongoose.Schema({
     fullName:{
        type:String,
        required:[true,"Name is required"],
       
        trim:true
     },
     userName:{
       type:String,
       required:[true,"User name required"],
       maxLength:12,
       trim:true
     },
     email:{
        type:String,
        required:[true,"email required"],
        unique:true,
        trim:true,
        lowercase:true,
     },
   //   accountType:{
   //      type:String,
   //      require:[true,"Account Type required"],
   //      enum:["Public","Private"],
        
   //   },
     gender:{
          type:String,
          required:true,
          enum:["Male","Female","Other"],
          
     },
     password:{
        type:String,
        required:[true,"password required"],
        trim:true,
        minLength:8,
        select:false
        //select false krne se password field automaticaly exclude ho jaye gi
        //jab mujhe jarrurt hogi -> login krte time to me ->const user = await User.findOne({ email }).select("+password"); to mujhe password mil jaye ga
     },
     createdAt:{
        type:Date,
        default:Date.now
     },
     updatedAt:{
        type:Date,
        default:Date.now
     }
});

module.exports = mongoose.model("User",userSchema);