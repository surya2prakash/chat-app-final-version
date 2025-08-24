
let Comment = require("../../Model/commentModel");

let Post = require("../../Model/postModel");


exports.deleteComment = async(req,res) =>{
      try{
          
        const userId = req.user.id;

        const postId = req.params.id;

        if(!postId)
        {
            return res.status(400).json({
                success:false,
                message:"Post Id required"
            });
        };

        //post find karo --->

        const isPost = await Post.findById(postId);
        if(!isPost)
        {
            return res.status(404).json({
                success:false,
                message:"Post Not Found."
            });
        };

        //check karo 

        const commentDelete = await Comment.findOneAndDelete({postId,commentbyUserId:userId});

        if(!commentDelete)
        {
            return res.status(404).json({
                success:false,
                message:"No comment Found"
            });
        };

        await Post.findByIdAndUpdate(postId,{$inc:{commentCount:-1}},{new:true});

        return res.status(200).json({
            success:true,
            message:"Comment Delete successfully .."
        })

      }catch(err){
         console.error(err);

         return res.status(500).json({
            success:false,
            message:"Problem While deleting the Comment."
         })
      }
}