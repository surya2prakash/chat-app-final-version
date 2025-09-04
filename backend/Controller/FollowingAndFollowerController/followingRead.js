
const Following = require("../../Model/followingModel");
const Profile = require("../../Model/profileModel");

exports.getfollowing = async(req,res) =>{
      try{
            
        //userId 

        const userId = req.user.id;
             
        const isProfile = await Profile.findOne({userId:userId});

          if(!isProfile){
             return res.status(404).json({
               success:false,
               message:"user not found"
             })
          }

         const isFollowing = await Following.find({userId:isProfile._id}); 

         if(!isFollowing)
         {
            return res.status(500).json({
                success:false,
                message:"No following"
            })
         };

         return res.status(200).json({
            success:true,
            message:"All Following are fetched",
            youfollowing:isFollowing
         });
      }catch(err){
         console.log(err.message);
         return res.status(500).json({
            success:false,
            message:"Problem while fetching the following"
         });
      };
}
