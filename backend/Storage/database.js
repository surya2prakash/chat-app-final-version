
const mongoose = require("mongoose");

require("dotenv").config();

const database = ()=>{

    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true

    }).then(()=>{
        console.log("Data-Base connected ..")
    })
    .catch((err)=>{
          console.error(err.message);
          process.exit(1);
    })

};

module.exports = database;