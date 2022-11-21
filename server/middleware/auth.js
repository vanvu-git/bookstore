const jwt = require('jsonwebtoken');
const user = require('../models/user');


const verifyToken = async (req, res, next) => {
   
    const token = req.cookies.accessToken;

    if(!token)
    return res.status(401).json({success: false, message: 'Acess token not found'})

    try{
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const User = await user.findById(decoded.userId);
        if(!User)
        return res.status(403).json({success: false, message: 'Invalid token'});
        if(!User.trangthai)
        return res.status(403).json({success: false, message: 'forbidden'});
        req.userId = decoded.userId;
        req.quyen = User.quyen;
        next();
    }catch(error){
        console.log(error);
        return res.status(403).json({success: false, message: 'Invalid token'});
    }   
}
const verifyEmailToken = async (req, res, next) => {
    const token = req.params.token;
    if(!token)
    return res.writeHead(301, {
        Location: `http://localhost:3000/failemail`
    }).end();

    try{
        const decoded = jwt.verify(token, process.env.EMAIL_TOKEN_SECRET);
        const User = await user.findById(decoded.userId);
        if(!User)
        return res.writeHead(301, {
            Location: `http://localhost:3000/failemail`
        }).end();
        req.userId = decoded.userId;
        next();
    }catch(error){
        console.log(error);
        res.writeHead(301, {
            Location: `http://localhost:3000/failemail`
        }).end();
    }   
}
const isNhanVien = async (req, res, next) => {
    try{
        const quyen = parseInt(req.quyen);
        if(quyen > 0) next();
        else return res.status(403).json({success: false, message: 'not allow'})
    }catch(error){
        console.log(error);
        return res.status(403).json({success: false, message: 'not allow'});
    }   
}

const isAdmin = async (req, res, next) => {
    try{
        const quyen = parseInt(req.quyen);
        if(quyen >= 2) next();
        else return res.status(403).json({success: false, message: 'not allow'})
    }catch(error){
        console.log(error);
        return res.status(403).json({success: false, message: 'not allow'});
    }   
}

module.exports = {verifyToken , isNhanVien, isAdmin, verifyEmailToken};