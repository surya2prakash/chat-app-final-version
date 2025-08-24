
const Comment = require("../../Model/commentModel");

const Post = require("../../Model/postModel");


exports.commentCreate = async(req,res) =>{
      try{

           const {comment} = req.body;
           const postId = req.params.id;
           const userId = req.user.id;

           if(!comment)
           {
            return res.status(400).json({
                success:false,
                message:"Comment is required."
            });
           };

           if(!postId)
           {
               return res.status(400).json({
                success:false,
                message:"Post Id Not Found."
               });
           };

           //find karo post hai bhi yaa nhi 

           let isPost = await Post.findById(postId);
           
           if(!isPost)
           {
            //matlab post hai hi nhi -->

            return res.status(404).json({
                success:false,
                message:"Post Not Found ."
            });
           };

           //ager Post mil gai hai to  ---> comment kro

           const commentOnPost = await Comment.create({
               comment,
               postId,
               commentbyUserId:userId
           });

           await Post.findByIdAndUpdate(postId,{$inc:{commentCount:1}},{new:true});

           return res.status(201).json({
            success:true,
            message:"Comment Successfully.",
            yourComment:commentOnPost.comment
           })



      }catch(err){
            console.error(err.message);

            return res.status(500).json({
                success:false,
                message:"Problem while comment Creation."
            })

      }
}