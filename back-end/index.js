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
app.use(
  cors({
    origin: 'https://deploy-mern-app-r0nsllyou-abhisheks-projects-26d9c136.vercel.app', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
    credentials: true, // Allow credentials such as cookies
  })
);

const Port = "4040";
app.listen(Port, ()=>{
    console.log(` Server starting at ${Port}`);
})
