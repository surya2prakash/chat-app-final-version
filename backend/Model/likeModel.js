

const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    //post ki id --->
      postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
        required:true
      },
    //   jisne like kiya uski Id
      likePostUserId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            
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

module.exports = mongoose.model("Like",likeSchema);