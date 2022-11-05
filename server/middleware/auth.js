const jwt = require('jsonwebtoken');
const user = require('../models/user');
const verifyToken = (req, res, next) => {
   
    const token = req.cookies.accessToken;

    if(!token)
    return res.status(401).json({success: false, message: 'Acess token not found'})

    try{
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userId = decoded.userId;
        next();
    }catch(error){
        console.log(error);
        return res.status(403).json({success: false, message: 'Invalid token'});
    }   
}

const isNhanVien = (req, res, next) => {
   
    const id = req.userId;




    try{
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userId = decoded.userId;
        next();
    }catch(error){
        console.log(error);
        return res.status(403).json({success: false, message: 'Invalid token'});
    }   
}

module.exports = {verifyToken , isNhanVien};