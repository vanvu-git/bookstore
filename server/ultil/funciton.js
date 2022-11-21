const User = require('../models/user');
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');

const sendMail = (newUser) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.AUTH_USER,
            pass: process.env.AUTH_PASSWORD
        }
    });
    const token = jwt.sign({
        userId: newUser._id
    }, process.env.EMAIL_TOKEN_SECRET, { expiresIn: '1m' }  
    );    
    const mailOptions = {
        from: process.env.AUTH_USER, 
        to: newUser.email, 
        subject: 'BOOKSTORE! Xác nhận email.', 
        html: `<h1 style="color: red">Xác nhận email</h1><br>
               <div>Kính gửi, ${newUser.ho +" "+ newUser.ten}!</div><br>
               <div>Chúng tôi là <b>BookStore</b>, chúng tôi vừa nhân được yêu cầu xác nhận email<br>
               của bạn vào lúc ${new Date()}</div><br>
               <div>Đây là link xác thực email của bạn:  (Vui lòng không chia sẻ với bất kì ai.) <b></b></div><br>
               <a href="http://localhost:6010/api/auth/verify/${token}">
                <button style="background-color: #f22805;
                border: none;
                color: white;
                padding: 10px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin: 4px 2px;
                cursor: pointer;
                border-radius: 12px;
                ">Verify your email!!!</button>
               </a>
               <div>Mọi thắc mắc và vấn đề có thể liên hệ với chúng tôi tại fullstackdevops.developer@gmail.com</div><br>
               <hr>
               <i>Trân thành cảm ơn đã sử dụng dịch vụ của chúng tôi</i>
        `
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
        return res.status(400).json({success: false, message: err});
        else
        console.log("send success");
    })
}

module.exports = {sendMail};