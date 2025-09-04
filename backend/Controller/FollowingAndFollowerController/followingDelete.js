 

 const Following = require("../../Model/followingModel");

 const Follower = require("../../Model/followerModel");
 
const Profile = require("../../Model/profileModel");
exports.unFollow = async(req,res) =>{
      try{

       //do jgh delete karna ess liye me mongodb ka transaction use krunga  --->
          
        //userId --->

        const userId = req.user.id;
        console.log(userId)

        // jisko unfollow krna hai uski Id ---->

        const wantToUnfollow = req.query.id;
          console.log(wantToUnfollow);
        if(!wantToUnfollow)
        {  
           
            return res.status(404).json({
                success:false,
                message:"FollowerId not Found"
            });
        };


         if(userId.toString() ===  wantToUnfollow.toString() )
        {    
           
            return res.status(409).json({
                success:false,
                message:"can't unfollow Your self."
            })
        }
        //user khud ko unfollow bhi nhi akr sakta  --->
     const isProfile = await Profile.findOne({userId:userId});
            
        
       
       

          
        //check kro follow bhi akrte ho yaa nhi --->

        const isFollow = await Following.findOne({userId:isProfile._id,followingId:wantToUnfollow});
        
        if(!isFollow)
        {
          
            return res.status(409).json({
                success:false,
                message:"Currently You are Not Following this User."
            })
        };

           

          await Following.findByIdAndDelete(isFollow._id);
        //pahle follower se remove kro 
           await Follower.findOneAndDelete({userId:wantToUnfollow,followerId:isProfile._id});

        //ager follow kar rhe ho to usko htana do --->

          

          //jisme follow kiya uska following decrease hoga -->
                    await Profile.findOneAndUpdate({userId:userId,totalfollowing:{$gt:0}},{$inc:{totalfollowing:-1}},{new:true});
                    //jisko follow kiye uska follower decrease ga
                    await Profile.findOneAndUpdate({userId:wantToUnfollow,totalFollowers:{$gt:0}},{$inc:{totalFollowers:-1}},{new:true});


        return res.status(200).json({
            success:true,
            message:"Unfollow SuccessFully."
        })

      }catch(err){

        
        console.error(err.message);
          
          
        return res.status(500).json({
            success:false,
            message:"Problem While UnFollow the User."
        })

      }
}