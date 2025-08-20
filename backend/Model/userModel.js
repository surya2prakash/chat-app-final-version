const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
     firstName:{
        type:String,
        required:[true,"Name is required"],
        maxLength:10,
        trim:true
     },
     lastName:{
        type:String,
        required:[true,"Name is required"],
        maxlength:18,
        trim:true

     },
     email:{
        type:String,
        required:[true,"email required"],
        unique:true,
        trim:true
     },
     password:{
        type:String,
        required:[true,"password required"],
        trim:true
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