
const mongoose = require("mongoose");


const profileSchema = new mongoose.Schema({
  
      userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
     },
     fullName:{
        type:String,
        required:true
     },
     userName:{
        type:String,
        required:true
     },       
     
    totalFollowers:{
          type:Number,
          
          default:0
      },
      totalfollowing:{
         type:Number,
         
         default:0
      },
      totalPost:{
         type:Number,
         
         default:0
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

module.exports = mongoose.model("Profile",profileSchema);