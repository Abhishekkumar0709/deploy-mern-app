const express = require('express');
const app= express();
require('dotenv').config;
require('./Models/db');
const authrouter = require('./Routes/AuthRouter');
const ProductRouter= require('./Routes/ProductRouter');
const bodyParser = require('body-parser');
const cors = require('cors');


app.use(bodyParser.json());
app.use(cors());
app.use('/auth' , authrouter);
app.use('/products',ProductRouter);

const Port = "4040";
app.listen(Port, ()=>{
    console.log(` Server starting at ${Port}`);
})
