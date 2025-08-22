

const Post = require("../../Model/postModel");

const cloudinary = require("cloudinary").v2



function isSupported(fileType,supportType)
{   
     if(supportType.includes(fileType))
     {
        return true;
     }else{
        return false;
     }
}

async function uploadFile(imageFile,folder,resource_type="auto",quality)
  {
    const option ={
        folder,resource_type:resource_type
    };

    if(quality)
    {
        option.quality=quality;
    };

    let result = await cloudinary.uploader.upload(imageFile.tempFilePath,option);

    return result;

  }



exports.postCreate = async(req,res)=>{
    try{
           
        //jiska account hai uski Id
         const userId = req.user.id;
          
         //caption likh do -->
         const {caption} = req.body;

         
          //image le aao
         const imageFile = req.files.imageFile;

         

         //dono me se koi bhi ek ho to chle ga --->

         if(!caption  && !imageFile)
         {
            //tab error throw kr do --->
            return res.status(400).json({
                success:false,
                message:"Select atleast one field.."
            });
         };

         //file type kon si allow krwana chahte ho--->

         const supportType = ["jpg","png","jpeg"];

         //file type kon si hai usko nikal lo --->

         const fileType = imageFile.name.split(".")[1].toLowerCase();

          //check kro supported hai bhi ya nhi 

          if(!isSupported(fileType,supportType))
          {
               return res.status(401).json({
                success:false,
                message:"File type Not supported.."
               }) ;  
          };

          //yhan tak sahi hai matlab file type supported hai ab upload ka kaam start karo
           
          
         

           const  response = await uploadFile(imageFile,"image");

         if(!response)
         {
            return res.status(500).json({
                success:false,
                message:"Problem While uploading the file."
            });
         };
         
         //ager upload ho gya hai to data base send karo -->

         const newPost = new Post({
            userId,
            caption,
            imageUrl:response.secure_url,
            imagePublicUrl:response.public_id
         })

         await newPost.save();

         return res.status(200).json({
            success:true,
            message:"Post Created."
         })


    }catch(err){
        console.error(err.message);
        return res.status(500).json({
            success:false,
            message:"Problem while createing post"
        })

    }
}