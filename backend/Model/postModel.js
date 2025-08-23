const mongoose = require("mongoose");


const postSchema = new mongoose.Schema({
      userId:{
        //kiski post hai 
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
      },
      imageUrl:{
        type:String
        
      },
      imagePublicUrl:{
         type:String
      },
      caption:{
        type:String,
        maxLength:50
      },
      likeCount:{
        type:Number,
        default:0
      },
      commentCount:{
        type:Number,
        default:0
      },
      likeId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Like",
        
      }],
      commentId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
      }],
      createdAt:{
         type:Date,
          default:Date.now
      },
      updatedAt:{
        type:Date,
        default:Date.now
      }
});



module.exports = mongoose.model("Post",postSchema);