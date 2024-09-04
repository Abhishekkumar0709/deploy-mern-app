const express = require('express');
const ensureauthenticated = require('../Middleware/Auth');


const router = express.Router(); 


router.get('/', ensureauthenticated,(req, res)=>{
    res.status(200).json([
        {
            name:"mobile",
            price:'10000'
        },
        {
            name:'tv',
            price:'20000'
        }
    ])

});


module.exports = router;
