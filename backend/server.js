const express = require("express");

const app = express();

app.use(express.json());


app.use(fileUpload(
    {
        useTempFiles:true,
        tempFileDir:'/tmp/'
    }
));

require("dotenv").config();


const PORT = process.env.PORT || 8000 ;

const database = require("./Storage/database");
  database();

  const cloudinaryConnect = require("./Storage/cloudinary");

     cloudinaryConnect();
  


app.listen(PORT,()=>{
    console.log(`App is listen at http://localhost:${PORT}`);
});

app.get("/",(req,res)=>{
    res.send(`<h2>Instagram clone</h2>`)
})