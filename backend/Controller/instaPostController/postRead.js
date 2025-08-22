
const Post = require("../../Model/postModel");


exports.getSingle = async(req,res) =>{
    try{

        //post id 
         
        const postId = req.params.id;

        //user id

        const userId = req.user.id;

        if(!postId)
        {
            return res.status(400).json({
                success:false,
                message:"Post Id not found."
            });
        };

        //ager yhan tak aaye to post find kro -->

        const findPost = await Post.findOne({_id:postId,userId});

        if(!findPost)
        {
            return res.status(404).json({
                success:false,
                message:"Post Not Found."
            });
        };

        //mil gya hai to send kar do -->

        return res.status(200).json({
            success:true,
            message:"Post Found.",
            post:findPost
        });

    }catch(err){
        console.error(err.message);
        return res.status(500).json({
            success:false,
            message:"Problem While Geting Post"
        });

    };
};



exports.getAllPost = async(req,res) =>{
    try{
      
        //userId ---->
        const userId = req.user.id;


       //sare post find kro ----->
        const findAllPost = await Post.find({userId});

        if(!findAllPost)
        {
            return res.status(404).json({
                success:false,
                message:"Posts Not Found."
            });
        };

        return res.status(200).json({
            success:true,
            message:"All Post Found ..",
            post:findAllPost

        });

    }catch(err){
        console.error(err.message);
        return res.status(500).json({
            success:false,
            message:"Problem While getting All Task"
        });

    };
}