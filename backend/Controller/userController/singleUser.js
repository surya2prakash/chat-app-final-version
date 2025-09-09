
const Profile = require("../../Model/profileModel");


exports.singleProfile = async(req,res)=>{
      try{
         
        const {name} = req.query;

        
       console.log(name);

        const isUserExist =  await Profile.findOne({userName:name});

        if(!isUserExist){
             return res.status(404).json({
                success:false,
                message:"Profile Not found"
             })
        };


        //ager hai to show kr do 

        return res.status(200).json({
            success:true,
            message:"User Found",
            user:isUserExist
        })


      }catch(err){
          return res.status(500).json({
            success:false,
            message:"Problem in Single Profile Controller"
          })
      }
}