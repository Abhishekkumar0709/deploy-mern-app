const bycrpt = require('bcrypt');
const UserModel = require('../Models/User');
const jwt = require('jsonwebtoken');
const jwtSecret ="secret-123";
const signup = async ( req, res ) =>{
    try{
        const { name,email, password } = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            return res.status(409).json({message: 'user exist kindly login', success: false});
        }
        const usermodel = new UserModel({name, email, password});
        usermodel.password = await bycrpt.hash(password,10);
        await usermodel.save();
        res.status(201).json({message:"signup succesful ", success:true});

    }
    catch(error){
        res.status(500).json({message:"Internal error  ", success:false});

    }
}


const login = async ( req, res ) =>{
    try{
        const { email, password } = req.body;
        const user = await UserModel.findOne({email});
        const errorMsg ="Authentication failed wrong email or password";
        if(!user){
            return res.status(403).json({message: errorMsg, success: false});
        }
        const isequalPassword = await bycrpt.compare(password, user.password);
        if(!isequalPassword){
            return res.status(403).json({message: errorMsg, success: false});
        }
        const jwttoken = jwt.sign(
            {email: user.email, _id:user._id},
            jwtSecret,
            {expiresIn :'24h'}

        );
   
          

        res.status(200).json(
            {message:"signup succesful ",
                 success:true,
                jwttoken,
            name:user.name});

    }
    catch(error){
        res.status(500).json({message:"Internal error  ", success:false});

    }
}
module.exports ={

    signup,
    login
}