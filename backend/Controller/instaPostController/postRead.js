

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


// khud ki post ---->
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


exports.postsforfeed = async(req,res) =>{
      try{
          
           
        //24 hr  se current time tak ki sari post le ke aao ---->

           let lasttwentFourhr = new Date(Date.now() - 24*60*60*1000);
           const getAllposts = await Post.find({createdAt:{$gte:lasttwentFourhr}}).sort({createdAt:-1});

           if( getAllposts.length === 0){
              // 48 hr tak ki posts lao
              let pastposts = new Date(Date.now() - 2*24*60*60*1000);
              const getAllPost = await Post.find({createdAt:{$gte:pastposts}}).sort({createdAt:-1});

                if(getAllPost.length === 0){
                     return res.status(404).json({
                       success:false,
                       message:"No Post found in last 48 hr"
                     })
                }
                
               return res.status(200).json({
                success:true,
                message:"Posts fetched",
                feedPost:getAllPost
               })
           }

        return res.status(200).json({
            success:true,
            message:"Posts fetched",
            feedPost:getAllposts
        })

      }catch(err){
          console.error(err.message);

          return res.status(500).json({
            success:false,
            message:"Problem in posts controller"
          })
      }
};

//post for explor

exports.explorePosts = async(req,res) =>{
      try{
             //posts jyada se jyda 1 months old  honi chahiye

             const postsDate = new Date();
             //abhi ki date aa gai 

             //current date se pihle 30 days ki posts
              postsDate.setDate(postsDate.getDate() - 30);
           
        const mostLikeAndComment = await Post.aggregate([


            //ussi post pe me oprations krunga jo 30 days purani hongi
              
               {
                 $match:{
                     createdAt:{
                         // 30 days se abhi tak ki post 
                         $gte:postsDate
                     }
                 }
               },
             
              {  //ek new field add ho jaye gi jisme total posts ka like aur comment add hoga
                $addFields:{
                    mostLikeAndComment :{$add:["$likeCount","$commentCount"]}
                }
            },

                {
                    $sort:{mostLikeAndComment:-1}
                },

            {
                $limit:10
            }


        ]);

        if(mostLikeAndComment.length === 0)
        {
            return res.status(404).json({
                success:false,
                message:"No Post found in last 30 days"
            })
        }
        
        return res.status(200).json({
            success:true,
            message:"Explore Posts",
            posts:mostLikeAndComment
        })

      }catch(err){
        console.error(err.message);

        return res.status(500).json({
            success:false,
            message:"Problem in explorePosts controller"
        })

      }
}