const mongoose = require("mongoose");

require('dotenv').config({ path: '.env.local' });

// Your application code goes here


const dbConnect = () => {
    mongoose.connect(process.env.DB_URL,{})
    .then(()=> console.log("DB connected successfully"))
    .catch((err)=>{
        console.log(err);
        process.exit(1);
    })
}


module.exports = dbConnect;