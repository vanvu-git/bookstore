const argon2 = require('argon2');
const User = require('../models/user');
const jwt = require('jsonwebtoken');


const userController = {
   create: async(req,res)=>{
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


    find: async(req, res) => {
        try{
            var page = req.query.page;
            var limit = req.query.limit;
            if(page){
                page = parseInt(page);
                limit = parseInt(limit);
                if(page < 1){
                    page = 1;
                }
                if(limit < 1){
                    page = 1;
                }
                var skipAmount = (page - 1) * limit;

                User.find().select('-password')
                .skip(skipAmount)
                .limit(limit)
                .then(posts=>{
                    User.countDocuments().then((total)=>{
                        var tongSoPage = Math.ceil(total / limit)
                        res.status(200).json({success: true,tongSoPage: tongSoPage,data: posts});
                    })
                    
                })
                .catch(error=>{
                    console.log(error);
                    res.status(500).json({success: false, message: 'Internal server error'});
                })
            }else{
                const posts = await User.find().select('-password');
                res.status(200).json({success: true, data: posts});
            }
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
    
            const userUpdateCondition = {_id: req.params.id};
            updatedUser = await User.findByIdAndUpdate(userUpdateCondition, updatedUser, {new: true});
            
            if(!updatedUser)
            return res.status(401).json({success: false, message:'update fail'});
    
            res.json({success: true, message: 'update successfully!!!', data: updatedUser});
    
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },
    delete :  async(req,res)=>{
        try{
           
            const userDeleteCondition = {_id: req.params.id};
            deletedUser = await User.findByIdAndDelete(userDeleteCondition);
            
            if(!deletedUser)
            return res.status(401).json({success: false, message:'not found'});
    
            res.json({success: true, message: 'delete successfully!!!'});
    
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },

}


module.exports = userController