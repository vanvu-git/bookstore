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

const isNhanVien = async (req, res, next) => {
    try{
        const id = req.userId;
        const User = await user.findById(id).select('quyen');
        console.log(User);
        if(User > 0) next();
        else return res.status(403).json({success: false, message: 'not allow'})
    }catch(error){
        console.log(error);
        return res.status(403).json({success: false, message: 'not allow'});
    }   
}

module.exports = {verifyToken , isNhanVien};