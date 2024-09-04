const express = require('express');
const { signupValidation, loginValidation } = require('../Middleware/Authvalidation');
const {signup, login} = require('../Controllers/Authcontroller')
const router = express.Router(); 



router.post('/signup', signupValidation,signup);
router.post('/login', loginValidation,login);


module.exports = router;
