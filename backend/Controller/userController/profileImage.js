//profile image upload krne ke liye 

const cloudinary = require("cloudinary").v2

const Profile = require("../../Model/profileModel");

function isSupported(supportType,fileType){
       if(supportType.includes(fileType))
       {
        return true;
       }else{
        return false;
       }
};

async function uploadImage(profileImage,folderName)

{
   
    
    try{
    let result = await cloudinary.uploader.upload(profileImage.tempFilePath,{
           resource_type:"image",
           folder:folderName,
           transformation:[
            {width:500,height:500,crop:"fill"}
           ],
           quality:"auto"
       })
       return result;
}catch(err){
      console.error(err.message);
}
       //upload kro 
       

       
};



exports.profileUpload = async(req,res)=>{
    try{

        const userId = req.user.id;

        //file ko lao  

        const profileImage = req.files.file ;

        if(!profileImage)
        {
           return res.status(404).json({
            success:false,
            message:"image not found"
           })
        };

        const supportType = ["jpg","png","jpeg"];

        //file type check kro 

        const fileType = profileImage.name.split(".").pop().toLowerCase();

        if(!isSupported(supportType,fileType))
        {
            //ager supported type nhi hai to waps ho jao 

            return res.status(500).json({
                success:false,
                message:"File type not supported."
            });
        };
      

        //check kro pahle se profile photo hai --->

        const oldPhoto = await Profile.findOne({userId:userId});

        if(oldPhoto?.profileImage?.secure && oldPhoto?.profileImage?.public)
        {
            //ager hai to cloud se delte kar do 

             await cloudinary.uploader.destroy(oldPhoto?.profileImage?.public);
        }
        

        //support kar rha hai to upload krte hain 

        const isUploaded = await uploadImage(profileImage,"profileImage")

         if(!isUploaded)
         {
            return res.status(500).json({
                success:false,
                message:"Problem while Uploading.."
            })
         }

         

         const newPhoto = await Profile.findOneAndUpdate({userId:userId},{
            profileImage:{
                secure:isUploaded.secure_url,
                public:isUploaded.public_id
            }
            
         },{new:true});

          
               return res.status(201).json({
            success:true,
            message:"Profile Uploaded",
             profileImage:newPhoto.profileImage.secure
             })
        
        

    }catch(err){
      console.error(err.message);

      return res.status(500).json({
        success:false,
        message:"Problem in Proifle Image Upload"
      })
    }
}