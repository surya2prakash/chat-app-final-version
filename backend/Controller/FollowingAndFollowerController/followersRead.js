
 const Profile = require("../../Model/profileModel");
const Follower = require("../../Model/followerModel");

exports.getFollower = async(req,res) =>{
       try{
          
        const userId = req.user.id;
         
       
        //profile nikal ke lao

        const fetchProfile = await Profile.findOne({userId:userId})



        const allfollowers = await Follower.find({userId:fetchProfile._id});

        if(!allfollowers)
        {
            return res.status(500).json({
                success:false,
                message:"No followers found"
            });
        };
          console.log(allfollowers);
        return res.status(200).json({
            success:true,
            message:"All followers",
            yourFollowers:allfollowers
        })

       }catch(err){
         console.log(err.message);
         return res.status(500).json({
             success:false,
             message:"Problem while followers"
         })
       }
}