
const cloudinary = require("cloudinary").v2 



//cloud name
//cloud api-key,
//cloud secret key

require("dotenv").config();

const cloudinaryConnect = ()=>{
     cloudinary.config(
        {
            cloud_name:process.env.CLOUD_NAME,
            api_key:process.env.CLOUD_API_KEY,
            api_secret:process.env.CLOUD_SECRET_KEY,
            secure:true
        }
     )
}

module.exports = cloudinaryConnect;