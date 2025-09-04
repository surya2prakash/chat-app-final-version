


const Following = require("../../Model/followingModel");

const Follower = require("../../Model/followerModel");

const Profile = require("../../Model/profileModel");


exports.following = async(req,res) =>{

    try{

        //transection ka use karunga kyonki mujhe do model me ek sath create krna hai 
        //ager ek bhi model failed hota hai to me chahta hun ki baher nikal jaun --->

       


        const userId = req.user.id;
         
        //jisko follow krna chahte ho usko leke aao
        const wantToFollow = req.query.id;
       console.log(userId);
        console.log(wantToFollow);
            
        if(!wantToFollow)
        {
            res.status(404).json({
                success:false,
                message:"follower id not found."
            });
        };


        
        if(userId.toString() ===  wantToFollow.toString() )
        {    
        
            return res.status(400).json({
                success:false,
                message:"Self follow Not allowed"
            });
        };

         const myProfileId = await Profile.findOne({userId:userId});

           console.log(myProfileId);
        //ager mil gai hai to ----> check kro kahin pahle se to follow nhi kiya hai 

        const isAlreadyFollow = await Following.findOne({userId:myProfileId._id,followingId:wantToFollow});

        
        if(isAlreadyFollow)
        {    
          
            return res.status(409).json({
                success:false,
                message:"You already Follow this user ."
            });
        };

        
    
        

        //ager nhi follow kar rhe ho to follow kr lo 

        const letsfollow = new Following({
              userId:myProfileId._id,
              followingId:wantToFollow,
        });

        await letsfollow.save();

        const letsfollower = new Follower({
            userId:wantToFollow,
            followerId:myProfileId._id

        })
         await letsfollower.save();
          
         //follower hand following ko increase kar do
        //jisko follow kiya uska following increse hoga -->
          await Profile.findByIdAndUpdate(myProfileId._id,{$inc:{totalfollowing:1}},{new:true});
          //jisko follow kiye uska follower badhe ga
          await Profile.findByIdAndUpdate(wantToFollow,{$inc:{totalFollowers:1}},{new:true});
       

        return res.status(201).json({
            success:true,
            message:"Following Successfully."
        })

        

    }catch(err)
    {
    
        console.error(err.message);

        return res.status(500).json({
            success:false,
            message:"Problem While Following."
        })
    }
};