
//update karna hai -->

const Post = require("../../Model/postModel");


exports.postUpdate = async(req,res) =>{
    try{
        //post ki id -->
        const postId = req.params.id;

        //user Jiski post hai --->

        const userId = req.user.id;

        //user sirf caption change kar sakta hai -->

        const {caption} = req.body;


        if(!postId)
        {
            return res.status(404).json({
                success:false,
                message:"Post Id Not Found."
            });
        };

        //post ko find kro aur mil gya hai to caption ko update kar do ---->

        const updatedPost = await Post.findOneAndUpdate({_id:postId,userId},{caption:caption},{new:true});

        if(!updatedPost)
        {
            return res.status(404).json({
                success:false,
                message:"Post Not found .."
            })
        };

        return res.status(200).json({
            success:true,
            message:"Post Updated .",
            post:updatedPost
        })


    }catch(err)
    {
      console.error(err);
      return res.status(500).json({
        success:false,
        message:"Problem while updateing the post ."
      })
    }
}