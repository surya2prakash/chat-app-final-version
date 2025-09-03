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

const{postsforfeed} = require("../Controller/instaPostController/postRead");

const {explorePosts} = require("../Controller/instaPostController/postRead");


//like and Unlike --->

const {likePost,unlikePost,getLikeandUnlike} = require("../Controller/LikeController/likeCreate");

//comments ----->

const{getAllComments} = require("../Controller/CommentController/commentRead");

const{commentCreate} = require("../Controller/CommentController/commentCreate");

const{deleteComment} = require("../Controller/CommentController/commentDelete");

//followers and following
const {following} = require("../Controller/FollowingAndFollowerController/followingCreate");
const {getFollower } = require("../Controller/FollowingAndFollowerController/followersRead");
const {getfollowing} = require("../Controller/FollowingAndFollowerController/followingRead");
const {unFollow} = require("../Controller/FollowingAndFollowerController/followingDelete");

//profile

const {profile} = require("../Controller/userController/profile");
const {singleProfile} = require("../Controller/userController/singleUser");
const {profileUpload} = require("../Controller/userController/profileImage");

route.post("/sign",signUp);
route.post("/login",logIn);

//post ***************
route.post("/postcreate",authorization,postCreate);
route.get("/myposts",authorization,getAllPost);
route.get("/feed",authorization,postsforfeed);
route.get("/explore/posts",authorization,explorePosts);

//profileImage **********
route.post("/profileImage",authorization,profileUpload);

//like ***********
route.get("/getlikes/:id",authorization,getLikeandUnlike);
route.post("/like/:id",authorization,likePost);

route.delete("/unlike/:id",authorization,unlikePost)

//comments***********
route.get("/comments/:id",authorization,getAllComments);
route.post("/sendComment/:id",authorization,commentCreate);
route.delete("/deletecomment/:id",authorization,deleteComment)

//follower and following
route.post("/follow",authorization,following);
route.delete("/unfollow",authorization,unFollow)
route.get("/followers",authorization,getFollower);
route.get("/following",authorization,getfollowing);

//profile

route.get("/profile",authorization,profile);
route.get("/finduser",authorization,singleProfile);

module.exports = route;