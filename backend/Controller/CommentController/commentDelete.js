
let Comment = require("../../Model/commentModel");

let Post = require("../../Model/postModel");


exports.deleteComment = async(req,res) =>{
      try{
          
        const userId = req.user.id;

        
        const commentId = req.params.id;

        console.log(commentId);

        if(!commentId)
        {
            return res.status(400).json({
                success:false,
                message:"comment Id required"
            });
        };

        //post find karo --->

        const isComment = await Comment.findById(commentId);
        if(!isComment)
        {
            return res.status(404).json({
                success:false,
                message:"Comment Not Found."
            });
        };

        //check karo 

        const commentDelete = await Comment.findOneAndDelete({_id:commentId,commentbyUserId:userId});

        

       await Post.findByIdAndUpdate(isComment.postId,{$inc:{commentCount:-1}},{new:true});

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