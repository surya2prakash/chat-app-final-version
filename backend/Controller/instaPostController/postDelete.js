
const Post = require("../../Model/postModel");

const cloudinary = require("cloudinary").v2 


exports.deleteSingle = async(req,res) =>{
    try{
      
        //userId ----->
        const  userId = req.user.id;
     
        //post id ---->
         const postId = req.params.id;

         if(!postId)
         {
            return res.status(400).json({
                success:false,
                message:"Post Id Not Found."
            });
         };

         //post find kro 

         const isPost = await Post.findOne({_id:postId,userId});

         

         if(!isPost)
         {
            return res.status(404).json({
                success:false,
                message:"Post Not Found."
            });
         };
         //pahle cloudinary se file delete kro --> ager Public_url Hai to -->
       if(isPost.imagePublicUrl)
       {
        await cloudinary.uploader.destroy(isPost.imagePublicUrl);
       }     
        

      

         //eske baad ab post ko delete kar do --->

         await Post.findByIdAndDelete(postId);


         return res.status(200).json({
            success:true,
            message:"Post Deleted SuccessFully.."
         });




    }catch(err){
     console.error(err);

     return res.status(500).json({
        success:false,
        message:"Problem while Deleting Post.."
     });
    };
}


exports.deleteAll = async(req,res)=>{
      try{
            
        //user---->

        const userId = req.user.id;

        //sabhi post check kro---->
          
        const isPost = await Post.find({userId});

        if(!isPost)
        {
            return res.status(400).json({
                success:false,
                message:"Posts Not Found."
            });
        };

       
            
        //jis jis post me public_id hogi vo Store ho jaye gi --->

          let isPublicId = isPost.map(post => post.imagePublicUrl).filter(Boolean);

          //cloudinary se sari photos delete karo --->


          if(isPublicId.length >  0)
        {
          await cloudinary.api.delete_resources(isPublicId);

        }
        
    let isDeleted = await Post.deleteMany({userId},{new:true});

    if(!isDeleted)
    {
        return res.status(404).json({
            success:false,
            message:"Posts Not Found."
        })
    }

    return res.status(200).json({
        success:true,
        message:"All Posts Deleted.."
    })
          
      }catch(err){
        console.error(err);

        return res.status(500).json({
            success:false,
            message:"Problem While deleting All Post"
        })
      }
}