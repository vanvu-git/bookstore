const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const {verifyToken, isNhanVien} = require('../middleware/auth');
const auth = require('../controllers/auth');
  
router.post('/register',  auth.register);

router.post('/login', auth.login);
router.post('/forgetpassword', auth.forgetPassword);
router.get('/logout', verifyToken, auth.logout);
router.put('/changepassword', verifyToken, auth.changepassword);
module.exports = router;