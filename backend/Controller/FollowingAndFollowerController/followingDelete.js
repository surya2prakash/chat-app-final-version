 
 //unfollow krna hai
  const mongoose = require("mongoose");
 const Following = require("../../Model/followingModel");

 const Follower = require("../../Model/followerModel");
 

exports.unFollow = async(req,res) =>{
      try{

       //do jgh delete karna ess liye me mongodb ka transaction use krunga  --->
           const session = await mongoose.startSession();

            session.startTransaction();
        //userId --->

        const userId = req.user.id;

        // jisko unfollow krna hai uski Id ---->

        const wantToUnfollow = req.params.id;

        if(!wantToUnfollow)
        {  
            //ager nhi hai to transion htao ->session ko bhi end kro
           await session.abortTransaction();
            session.endSession();
            return res.status(404).json({
                success:false,
                message:"FollowerId not Found"
            });
        };

        //user khud ko unfollow bhi nhi akr sakta  --->

        if(userId === wantToUnfollow)
        {

           await session.abortTransaction();
              session.endSession();
            return res.status(400).json({
                success:false,
                message:"can't unfollow Your self."
            })
        }

          
        //check kro follow bhi akrte ho yaa nhi --->

        const isFollow = await Following.findOne({userId,followingId:wantToUnfollow},null,{session});

        if(!isFollow)
        {
           await session.abortTransaction();
            session.endSession();
            return res.status(409).json({
                success:false,
                message:"Currently You are Not Following this User."
            })
        };

       

          
        //pahle follower se remove kro 
           await Follower.findOneAndDelete({userId:wantToUnfollow,followerId:userId},{session});

        //ager follow kar rhe ho to usko htana do --->

          await Following.findByIdAndDelete(isFollow._id,{session});

          await session.commitTransaction();

          session.endSession();

        return res.status(200).json({
            success:true,
            message:"Unfollow SuccessFully."
        })

      }catch(err){

        await session.abortTransaction();
          session.endSession();
        console.error(err.message);
          
          
        return res.status(500).json({
            success:false,
            message:"Problem While UnFollow the User."
        })

      }
}