const express = require("express");

const route = express.Router();


//user signUp and login ---->

const {signUp} = require("../Controller/userController/signUp");
const {logIn} = require("../Controller/userController/logIn");

//auth

const {authorization} = require("../MiddleWare/auth");

//post ---->

//create->
const {postCreate} = require("../Controller/instaPostController/postCreate");

//khud ki posts dekhne ke liye --->
const{getAllPost} = require("../Controller/instaPostController/postRead");


//like and Unlike --->

const {likePost,unlikePost,getLikeandUnlike} = require("../Controller/LikeController/likeCreate");

//comments ----->

const{getAllComments} = require("../Controller/CommentController/commentRead");

const{commentCreate} = require("../Controller/CommentController/commentCreate");

const{deleteComment} = require("../Controller/CommentController/commentDelete");

route.post("/sign",signUp);
route.post("/login",logIn);

route.post("/postcreate",authorization,postCreate);
route.get("/myposts",authorization,getAllPost);

//like ***********
route.get("/getlikes/:id",authorization,getLikeandUnlike);
route.post("/like/:id",authorization,likePost);

route.delete("/unlike/:id",authorization,unlikePost)

//comments***********
route.get("/comments/:id",authorization,getAllComments);
route.post("/sendComment/:id",authorization,commentCreate);
route.delete("/deletecomment/:id",authorization,deleteComment)


module.exports = route;