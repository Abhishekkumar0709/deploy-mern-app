const mongoose = require('mongoose');
require('dotenv').config(); 

mongoose.connect('mongodb://localhost:27017/logindb').then(()=>{
    console.log("DATABASE Connected");
}).catch((error)=>{
    console.log("Database connection failed ",error);
});
