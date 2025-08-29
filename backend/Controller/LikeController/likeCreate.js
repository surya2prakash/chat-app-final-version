
const Post = require("../../Model/postModel");

const Like = require("../../Model/likeModel");






exports.likePost = async(req,res) =>{

    
    try{

      
        //userId --->
          const userId = req.user.id;

          //post Id -->

          const postId = req.params.id;
          
             
          if(!postId)
          {   
        
              return res.status(404).json({
                success:false,
                message:"Post Id Not Found."
              });
          };

          //post find kro -->

          const isPost = await Post.findById(postId);

          if(!isPost)
          {
           
            return res.status(404).json({
                success:false,
                message:"Post Not found."
            });
          };

          //check kro kahin user ne es post ko already like to nhi kiya hai --->

          const isAlreadyLike = await Like.findOne({postId,likePostUserId:userId});

          if(isAlreadyLike)
          {
            
             return res.status(409).json({
              success:true,
              message:"Already Liked."
             })
          }

          //ager post mil gai hai aur user ne like nhi kiya hai to like kro 

          const likePost = new Like({
              postId,
              likePostUserId:userId
          })

          await likePost.save();

          //ablike count ko increase karna hoga

          const postlikeCount = await Post.findByIdAndUpdate(postId,{
            $inc:{likeCount:1}
          },{new:true});

        

          return res.status(201).json({
            success:true,
            message:"Post Like successfully.",
            isLiked:true,
            updatedLikeCount:postlikeCount.likeCount
          })


    }catch(err){
      console.error(err);
     
      return res.status(500).json({
        success:false,
        message:"Problem while Like the post."
      })
    }
}


exports.unlikePost = async(req,res)=>{
     try{

        //userId --->
          const userId = req.user.id;

          //post Id -->

          const postId = req.params.id;
         

          if(!postId)
          {   
        
              return res.status(404).json({
                success:false,
                message:"Post Id Not Found."
              });
          };

          //post find kro -->

          const isPost = await Post.findById(postId);

          if(!isPost)
          {
           
            return res.status(404).json({
                success:false,
                message:"Post Not found."
            });
          };

          const alreadyUnlike =  await Like.findOne({postId,likePostUserId:userId});

          if(!alreadyUnlike)
          {
             return res.status(404).json({
              success:true,
              message:"Already Unlike"
             })
          };

          await Like.findByIdAndDelete(alreadyUnlike._id);

          const postunlikeCount = await Post.findByIdAndUpdate(postId,{
            $inc:{likeCount:-1}
          },{new:true});

          
         
          return res.status(200).json({
            success:true,
            message:"Unlike Post",
            isLiked:false,
            updatedUnlikeCount:postunlikeCount.likeCount
          })

     }catch(err){
         console.log(err.message);

         return res.status(500).json({
          success:false,
          message:"Problem while Unlike the post"
         })
     }
};

exports.getLikeandUnlike = async(req,res)=>{
       try{
         
        //userId --->
          const userId = req.user.id;

          //post Id -->

          const postId = req.params.id;
          

          if(!postId)
          {   
        
              return res.status(404).json({
                success:false,
                message:"Post Id Not Found."
              });
          };

          //post find kro -->

          const isPost = await Post.findById(postId);

          if(!isPost)
          {
           
            return res.status(404).json({
                success:false,
                message:"Post Not found."
            });
          };

          const alreadylike =  await Like.findOne({postId,likePostUserId:userId});
           

        

          return res.status(200).json({
               success:true,
               message:"Already Liked",
                isLiked:!!alreadylike,
                totallikeCount:isPost.likeCount
          })


       }catch(err){
          console.log(err.message);

          return res.status(500).json({
            success:false,
            message:"Problem while getting the like and Unlike"
          })
       }
      }