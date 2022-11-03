const jwt = require('jsonwebtoken');

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

module.exports = verifyToken;