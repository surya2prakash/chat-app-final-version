


const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.authorization = async(req,res,next)=>{
    try{
       
        //yee ek object hota hai --->
        const authHeader = req.headers["authorization"]   

        if(!authHeader)
        {
            return res.status(404).json({
                success:false,
                message:"token Missing.."
            })
        }
        const token = authHeader.split(" ")[1];

        if(!token)
        {
            return res.status(401).json({
                success:false,
                message:"Token Missing"
            });
        };

        //ager token mil gya hai to ----->

        //verify kro 

        const payload = await jwt.verify(token,process.env.JWT_SECRET_KEY);

        if(!payload)
        {
            //eska matlab token verify nhi hua hai
            return res.status(500).json({
                success:false,
                message:"token not verifyed.."
            });
        };

        //ager verify ho gya hai to ---->
        //payload ko req me send kar do -->

        req.user = payload ;

         next();

    }catch(err){
        console.error(err.message);
        return res.status(500).json({
            success:false,
            message:"Problem while Authorization"
        })
    }
}