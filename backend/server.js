const express = require("express");

const cors = require("cors");

const fileUpload = require("express-fileupload");

const database = require("./Storage/database");
 const cloudinaryConnect = require("./Storage/cloudinary");
 const route = require("./Router/router");

const app = express();
app.use(express.json());
 app.use(cors({
        origin:"http://localhost:3000",
        
        methods:["GET","POST","DELETE","UPDATE"],
        allowedHeaders:["Authorization","Content-Type"],
        credentials:true,
       
    }));



// FILE UPLOAD ----->
app.use(fileUpload(
    {
        useTempFiles:true,
        tempFileDir:'/tmp/'
    }
));

// IMPORT DOTENV ------------>
require("dotenv").config();


const PORT = process.env.PORT || 8000 ;


  database();
cloudinaryConnect();

 app.use("/v1",route);

   


app.listen(PORT,()=>{
    console.log(`App is listen at http://localhost:${PORT}`);
});

app.get("/",(req,res)=>{
    res.send(`<h2>Instagram clone</h2>`);
})