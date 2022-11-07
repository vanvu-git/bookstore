const argon2 = require('argon2');
const User = require('../models/user');
const jwt = require('jsonwebtoken');


const authController = {
     register : async(req,res)=>{
        const {username, password, repassword, ho, ten,sdt,email,quyen,ngaysinh,hinhanh} = req.body;
        
        if(!username || !password)
        return res.status(400).json({success: false, message: 'Missing username or password'});

        if(!ho || !ten)
        return res.status(400).json({success: false, message: 'ho ten is required'});

        if (password != repassword)
        return res.status(400).json({success: false, message: 'Password và Repassword không giống nhau.'});
        const gmailValidate = emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@gmail.com*$/;
        if (!gmailValidate.test(email)) 
        return res.status(400).json({success: false, message: 'Email không hợp lệ.'});
    
        try{
            const user = await User.findOne({ username });
            if(user)
            return res.status(400).json({success: false, message: 'username đã tồn tại'});
            
            const hashedPassword = await argon2.hash(password);
            const newUser = new User({
                username,
                password: hashedPassword,
                ho,
                ten,
                sdt,
                email,
                quyen,
                ngaysinh,
                hinhanh
            });
            await newUser.save();
    
            //Return token
            const accessToken = jwt.sign({userId: newUser._id, quyen: newUser.quyen}, process.env.ACCESS_TOKEN_SECRET)
            res.status(200).json({success: true, message: 'User created successfully', accessToken});
        }catch(error){  
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'})
            
        }
    },

    login : async(req,res)=>{
        const username = req.body.username;
        const Password = req.body.password;
        
        if(!username || !Password)
        return res.status(400).json({success: false, message: 'Missing username or password'});
    
        try{
            const user = await User.findOne({username});
            console.log(username);
            console.log(user);
            if(!user)
            return res.status(400).json({success: false, message: 'Incorrect username or password'});
            
            const passwordValid = await argon2.verify(user.password, Password);
            if(!passwordValid)
            return res.status(400).json({success: false, message: 'Incorrect username or password'});
            
            //Return token
            const accessToken = jwt.sign({userId: user._id, quyen: user.quyen}, process.env.ACCESS_TOKEN_SECRET)
            const {password,quyen, ...thongtin} = user._doc;
            res.cookie("accessToken", accessToken, {httpOnly: true}).status(200)
            .json({success: true, message: 'Loggin successfully', accessToken,user: {...thongtin},quyen});
            
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'})
        }
    }

}


module.exports = authController