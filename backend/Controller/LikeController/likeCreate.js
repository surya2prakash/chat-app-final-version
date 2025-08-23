
const Post = require("../../Model/postModel");

const Like = require("../../Model/likeModel");




exports.likePostAndUnlike = async(req,res) =>{
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
             //ager already like hai to unlike kr do ---->

              //like me se postId aur user ko remove krna hai --->

              await Like.findByIdAndDelete(isAlreadyLike._id);

              //like count ko -1 karna hai 

             const unlikePost =  await Post.findByIdAndUpdate(postId,{$inc:{likeCount:-1}},{new:true});

              return res.status(200).json({
                success:true,
                message:"Post Unlike Successfully.",
                updatedLikeCount:unlikePost.likeCount
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

          return res.status(200).json({
            success:true,
            message:"Post Like successfully.",
            updatedLikeCount:postlikeCount.likeCount
          })


    }catch(err){
      console.error(err);
      return res.status(500).json({
        success:false,
        message:"Problem while Likeing the post."
      })
    }
}