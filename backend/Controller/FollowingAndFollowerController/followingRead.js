
const Following = require("../../Model/followingModel");

exports.getfollowing = async(req,res) =>{
      try{
            
        //userId 

        const userId = req.user.id;

         const isFollowing = await Following.find({userId}); 

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
