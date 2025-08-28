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

const {likePostAndUnlike} = require("../Controller/LikeController/likeCreate");

route.post("/sign",signUp);
route.post("/login",logIn);

route.post("/postcreate",authorization,postCreate);
route.get("/myposts",authorization,getAllPost);

route.post("/:id",authorization,likePostAndUnlike);

module.exports = route;