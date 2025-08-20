
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({

    //kon si post hai ? ------->
       postId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post",
            required:true
       },
            //kisne comment kiya hai ----->
       commentbyUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
       },
       //kya comment --->
       comment:{
          type:String,
          required:true
       },
      
  
       createdAt:{
        type:Date,
        default:Date.now
       },
       updatedAt:{
        type:Date,
        default:Date.now
       }
})

module.exports = mongoose.model("Comment",commentSchema);