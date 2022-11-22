const argon2 = require('argon2');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
const { sendMail } = require('../ultil/funciton');
const ramdomPassword = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
const authController = {
     register : async(req,res)=>{
        const {username, password, repassword, ho, ten,sdt,email,ngaysinh,hinhanh} = req.body;
        
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
            
            const existEmail = await User.findOne({ email });
            if(existEmail)
            return res.status(400).json({success: false, message: 'email đã được đăng ký'});
            
            const hashedPassword = await argon2.hash(password);
            const newUser = new User({
                username,
                password: hashedPassword,
                ho,
                ten,
                sdt,
                email,
                ngaysinh,
                hinhanh
            });
            sendMail(newUser);
            await newUser.save();
            res.status(200).json({success: true, message: 'User created successfully'});
        }catch(error){  
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'})
            
        }
    },

    login : async(req,res)=>{
        var username = req.body.username;
        var Password = req.body.password;
        username = username.trim();
        Password = Password.trim();
        if(!username || !Password)
        return res.status(400).json({success: false, message: 'Missing username or password'});
    
        try{
            const user = await User.findOne({username});
            
            if(!user)
            return res.status(400).json({success: false, message: 'Incorrect username or password'});
            
            const passwordValid = await argon2.verify(user.password, Password);
            if(!passwordValid)
            return res.status(400).json({success: false, message: 'Incorrect username or password'});
            if(!user.emailVerified)
            return res.status(403).json({success: false, message: 'user do not verify email'});

            if(!user.trangthai)
            return res.status(403).json({success: false, message: 'forbidden'});
            //Return token
            const accessToken = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET)
            res.cookie("accessToken", accessToken, {httpOnly: true}).status(200)
            .json({success: true, message: 'Loggin successfully', accessToken,user: user, quyen: user.quyen});
            
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'})
        }
    },

    changepassword: async(req,res)=>{
        const {oldpassword , newpassword, repassword} = req.body;
        if(!oldpassword)
        return res.status(400).json({success: false, message: 'Missing oldpassword'});
        if(!newpassword)
        return res.status(400).json({success: false, message: 'Missing newpassword'});
        if(!repassword)
        return res.status(400).json({success: false, message: 'Missing repassword'});
        if(newpassword != repassword)
        return res.status(400).json({success: false, message: 'password and repassword not match'});
        try{
            
            const user = await User.findById(req.userId);
            
            if(!user)
            return res.status(400).json({success: false, message: 'user not exist'});
            
            const passwordValid = await argon2.verify(user.password, oldpassword);
            if(!passwordValid)
            return res.status(400).json({success: false, message: 'oldpassword not match'});

            const hashedPassword = await argon2.hash(newpassword);

            user.password = hashedPassword;
            await user.save();

            res.json({success: true, message: 'update successfully!!!'});
    
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },

    update:async(req,res)=>{
        const {ho, ten,sdt,email,ngaysinh,hinhanh} = req.body;
        
        try{
            let updatedUser = {
                ho,
                ten,
                sdt,
                email,
                ngaysinh,
                hinhanh
            }
    
            const userUpdateCondition = {_id: req.userId};
            updatedUser = await User.findByIdAndUpdate(userUpdateCondition, updatedUser, {new: true}).select('-password');
            
            if(!updatedUser)
            return res.status(401).json({success: false, message:'update fail'});
    
            res.json({success: true, message: 'update successfully!!!', data: updatedUser});
    
        }catch(error){
            console.log(error);
            return res.status(500).json({success: false, message: 'Internal server error'});
        }
    },

    logout : async(req,res)=>{
        try{
            res.clearCookie("accessToken").status(200)
            .json({success: true, message: 'Logout successfully'});
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'})
        }
    },
    forgetPassword :  async(req,res)=>{
        const {mail, username} = req.body;
        if (mail=="" || username=="") return res.status(400).json({success: false, message: 'Không được bỏ trống các trường dữ liệu.'});
        try {
        const account = await User.findOne({username: username});
        console.log(account);
        const {ho, ten, email} = account;
        if (!account){
            return res.status(400).json({success: false, message: 'Username không tồn tại'});}
        if (email != mail) {
            console.log(account);
            console.log(mail+"--"+email);
            return res.status(400).json({success: false, message: 'Email không phù hợp.'});
        }
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'fullstackdevops.developer@gmail.com',
                pass: 'wkgkaacuwkybohuf'
            }
        });
        const newPass = ramdomPassword(10);
        const mailOptions = {
            from: 'fullstackdevops.developer@gmail.com', 
            to: mail, // list of receivers
            subject: 'BOOKSTORE! Thông báo khôi phục mật khẩu.', // Subject line
            html: `<h1 style="color: red">Thông báo về việc đặt lại mật khẩu</h1><br>
                   <div>Kính gửi, ${ho +" "+ ten}!</div><br>
                   <div>Chúng tôi là <b>BookStore</b>, chúng tôi vừa nhân được yêu cầu đặt lại mật khẩu <br>
                   của bạn vào lúc ${new Date()}</div><br>
                   <div>Đây là mật khẩu mới của bạn:<b> ${newPass}</b>  (Vui lòng không chia sẻ với bất kì ai.) <b></b></div><br>
                   <div>Mọi thắc mắc và vấn đề có thể liên hệ với chúng tôi tại fullstackdevops.developer@gmail.com</div><br>
                   <hr>
                   <i>Trân thành cảm ơn đã sử dụng dịch vụ của chúng tôi</i>
            `
        };
        const hashedPassword = await argon2.hash(newPass);
        account.password = hashedPassword;
        account.save();
        transporter.sendMail(mailOptions, function (err, info) {
            if(err)
            return res.status(400).json({success: false, message: err});
            else
            return res.status(200).json({success: true, message: info});
        })
        }catch {
            return res.status(400).json({success: false, message: 'Không tìm thấy người dùng với thông tin tương ứng.'});
        }
    },

    verifyEmail : async(req,res)=>{
        try{
            const user = await User.findById(req.userId);
            if(!user)
            return res.writeHead(301, {
                Location: `http://localhost:3000/failemail`
            }).end();
            user.emailVerified = true;
            user.trangthai = true;
            await user.save();
            res.writeHead(301, {
                Location: `http://localhost:3000/login`
              }).end();
        }catch(error){
            console.log(error);
            res.writeHead(500, {
                Location: `http://localhost:3000/failemail`
            }).end();
        }
    },

    resendVerifyEmail: async(req,res)=>{
        try{
            var { username, email} = req.body;
            if(!username || !email)
            return res.status(400).json({success: false, message: 'missing username or email'});
            username = username.trim();
            email = email.trim();
            if(username == "" || email == "")
            return res.status(400).json({success: false, message: 'username or email is empty'});
            const user = await User.findOne({username, email});
            if(!user)
            return res.status(400).json({success: false, message: 'username or email is not exist'});
            if(user.emailVerified)
            return res.status(400).json({success: false, message: 'user is verified'});
            sendMail(user);
            res.status(200).json({success: true, message: 'resend email successfully!!!'});
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'})
        }
    },

}


module.exports = authController