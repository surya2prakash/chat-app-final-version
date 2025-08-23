
const mongoose = require("mongoose");

const Following = require("../../Model/followingModel");

const Follower = require("../../Model/followerModel");



exports.following = async(req,res) =>{

    try{

        //transection ka use karunga kyonki mujhe do model me ek sath create krna hai 
        //ager ek bhi model failed hota hai to me chahta hun ki baher nikal jaun --->

        const session = await mongoose.startSession();

            session.startTransaction();

        const userId = req.user.id;
         
        //jisko follow krna chahte ho usko leke aao
        const wantToFollow = req.body._id;

        if(!wantToFollow)
        {
           await  session.abortTransaction();
             session.endSession();

            res.status(404).json({
                success:false,
                message:"follower id not found."
            });
        };


        //khud ko follow nhi kar skate -->

        if(userId === wantToFollow)
        {    
           await session.abortTransaction();
               session.endSession();
            return res.status(400).json({
                success:false,
                message:"Self follow Not allowed"
            })
        }


        //ager mil gai hai to ----> check kro kahin pahle se to follow nhi kiya hai 

        const isAlreadyFollow = await Following.findOne({userId,followingId:wantToFollow},null,{session});

        if(isAlreadyFollow)
        {    
           await  session.abortTransaction();
           session.endSession();
            return res.status(409).json({
                success:false,
                message:"You already Follow this user ."
            });
        };
    
        

        //ager nhi follow kar rhe ho to follow kr lo 

        const letsfollow = new Following({
              userId,
              followingId:wantToFollow,
        });

        await letsfollow.save({session});

        const letsfollower = new Follower({
            userId:wantToFollow,
            followerId:userId

        })
         await letsfollower.save({session});

        await  session.commitTransaction();
        session.endSession();

        return res.status(201).json({
            success:true,
            message:"Following Successfully."
        })

        

    }catch(err)
    {
       await session.abortTransaction();
       session.endSession();
        console.error(err.message);

        return res.status(500).json({
            success:false,
            message:"Problem While Following."
        })
    }
}