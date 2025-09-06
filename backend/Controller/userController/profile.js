
const Profile = require("../../Model/profileModel");


exports.profile = async(req,res) =>{
      try{

          const userId = req.user.id;

         

          const isProfile = await Profile.findOne({userId:userId});

          if(!isProfile){
              return res.status(404).json({
                success:true,
                message:"profile Not found."
              })
          }
          

          return res.status(200).json({
            success:true,
            message:"Profile fetched",
            myProfile:isProfile
          })



      }catch(err)
      {
        console.error(err.message);
        return res.status(500).json({
            success:false,
            message:"Problem in profile controller"
        })
      }
}