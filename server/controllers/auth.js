const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const User = require('../models/user');
const jwt = require('jsonwebtoken');


const authController = {
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

    login : async(req,res)=>{
        const {username, password} = req.body;
        
        if(!username || !password)
        return res.status(400).json({success: false, message: 'Missing username or password'});
    
        try{
            const user = await User.findOne({ username });
            if(!user)
            return res.status(400).json({success: false, message: 'Incorrect username or password'});
            
            const passwordValid = await argon2.verify(user.password, password);
            if(!passwordValid)
            return res.status(400).json({success: false, message: 'Incorrect username or password'});
            
            //Return token
            const accessToken = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET)
            res.json({success: true, message: 'Loggin successfully', accessToken});
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'})
        }
    }

}


module.exports = authController