
const Comment = require("../../Model/commentModel");

const Post = require("../../Model/postModel");


exports.getAllComments = async(req,res) =>{
      try{

          const postId = req.params.id;

          if(!postId)
          {
            return res.status(400).json({
                success:false,
                message:"Post Id required."
            });
          };

          const allcomments = await Post.findById(postId).populate("commentId").exec();

          if(!allcomments)
          {
            return res.status(404).json({
                success:false,
                message:"No Comment Found."
            });
          };

          return res.status(200).json({
             success:true,
             message:"comments fetched Successfully.",
             comments:allcomments
          })

      }catch(err){
         console.error(err);

         return res.status(500).json({
            success:false,
            message:"Problem while All Comments"
         })
      }
}