
const express = require('express');
const router = express.Router();
const taikhoan = require('../models/taikhoan');
const thongtintaikhoan = require('../models/thongtintaikhoan');


const taikhoanController = {
    register : async(req,res)=>{
        const {username, password} = req.body;
        
        if(!username || !password)
        return res.status(400).json({success: false, message: 'Missing username or password'});
    
        try{
            const user = await User.findOne({ username });
            if(user)
            return res.status(400).json({success: false, message: 'Username already taken'});
            
            const hashedPassword = await argon2.hash(password);
            const newUser = new User({username,password: hashedPassword});
            await newUser.save();
    
            //Return token
            const accessToken = jwt.sign({userId: newUser._id}, process.env.ACCESS_TOKEN_SECRET)
            res.json({success: true, message: 'User created successfully', accessToken});
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'})
            
        }
    },


}


module.exports = taikhoanController