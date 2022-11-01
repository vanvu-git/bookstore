const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/auth');
const auth = require('../controllers/auth');

router.get('/', verifyToken, async (req,res) => {
    try{
        const user = await User.findById(req.userId).select('-password');
        if(!user)
            return res.status(400).json({success: false, message: 'User not found'});
        res.json({ success:true, user})
    }catch(error){
        console.log(error);
        res.status(500).json({success: false, message: 'Internal server error'});
    }
})

  
router.post('/register',  auth.register);

router.post('/login', auth.login);

module.exports = router;