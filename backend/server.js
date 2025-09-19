const express = require("express");

const cors = require("cors");

const http = require("http");

const {Server}= require("socket.io")

const fileUpload = require("express-fileupload");
const jwt = require("jsonwebtoken");

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

   const server = http.createServer(app);

   const io = new   Server(server,{
        cors:{
           origin:"",
           methods:['POST','GET','PUT','DELETE'],
           allowedHeaders:['Authorization','Content-Type'],
           credentials:true
        }
   });

   io.use((socket,next)=>{
        try{

            const authHeader = socket.handshake.headers["authorization"];
              

            if(!authHeader)
            {
               return next (new Error("Not Getting headers"))
            }
                const token = authHeader.split(" ").pop();

                if(!token)
                {
                     return next(new Error("token missing"));
                };

                //token mil gya hai to verify kro 

                const payload =  jwt.verify(token , process.env.JWT_SECRET_KEY);
                 
                //PAYLOAD KO SOCKET ME DAALO 

                socket.user = payload;

           next();
        }catch(err){
            console.error(err.message);

        }
   });

server.listen(PORT,()=>{
    console.log(`App is listen at http://localhost:${PORT}`);
});

app.get("/",(req,res)=>{
    res.send(`<h2>Instagram clone</h2>`);
})