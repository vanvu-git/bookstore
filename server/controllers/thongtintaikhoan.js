
const express = require('express');
const router = express.Router();
const thongtintaikhoan = require('../models/thongtintaikhoan');


const thongtintaikhoanController = {
    create: async(req,res) => {
        const{ ho,ten,sdt,email} = req.body;
        if(!ho)
        return res.status(400).json({success: false, message: 'ho is required'});
        if(!ten)
        return res.status(400).json({success: false, message: 'ten is required'});
        try{
            const newthongtintaikhoan = new thongtintaikhoan({
                ho,
                ten,
                sdt,
                email
            })
            await newthongtintaikhoan.save();
            res.json({success: true, message: 'Tạo thành công', thongtintaikhoan: newthongtintaikhoan});
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },
    
    find: async(req, res) => {
        try{
            var page = req.query.page;
            if(page){
                page = parseInt(page);
                if(page < 1){
                    page = 1;
                }
                var skipAmount = (page - 1) * 2;

                thongtintaikhoan.find()
                .skip(skipAmount)
                .limit(2)
                .then(posts=>{
                    thongtintaikhoan.countDocuments().then((total)=>{
                        var tongSoPage = Math.ceil(total / 2)
                        res.status(200).json({success: true,tongSoPage: tongSoPage,thongtintaikhoans: posts});
                    })
                    
                })
                .catch(error=>{
                    res.status(500).json({success: false, message: 'Internal server error'});
                })
            }
            else if(req.body.tentg){
                const posts = await thongtintaikhoan.findOne({tentg: new RegExp('^'+req.body.tentg+'$', "i")})
                res.status(200).json({success: true, posts});
            }else{
                const posts = await thongtintaikhoan.find();
                res.status(200).json({success: true, posts});
            }
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },

    findId: async(req, res) => {
        try{
            const posts = await thongtintaikhoan.findById(req.params.id);
            res.status(200).json({success: true, posts});
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },

    findName: async(req, res) => {
        try{
            const posts = await thongtintaikhoan.findOne({tentg: new RegExp('^'+req.body.tentg+'$', "i")})
            res.status(200).json({success: true, posts});
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server errorss'});
        }
    },

    update: async(req,res)=>{
        const{ ho, ten, sdt,email} = req.body;
    
        if(!ho)
        return res.status(400).json({success:false, message: 'ho is required'});
        if(!ten)
        return res.status(400).json({success:false, message: 'ten is required'});
        try{
            let updatedthongtintaikhoan = {
                ho,
                ten, 
                sdt,
                email
            }
    
            const thongtintaikhoanUpdateCondition = {_id: req.params.id};
            updatedthongtintaikhoan = await thongtintaikhoan.findByIdAndUpdate(thongtintaikhoanUpdateCondition, updatedthongtintaikhoan, {new: true});
            
            if(!updatedthongtintaikhoan)
            return res.status(401).json({success: false, message:'thongtintaikhoan không có'});
    
            res.json({success: true, message: 'sửa thành công', thongtintaikhoan: updatedthongtintaikhoan});
    
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'update fail'});
        }
    },

    delete :  async(req,res)=>{
        try{
           
            const thongtintaikhoanDeleteCondition = {_id: req.params.id};
            deletedthongtintaikhoan = await thongtintaikhoan.findByIdAndDelete(thongtintaikhoanDeleteCondition);
            
            if(!deletedthongtintaikhoan)
            return res.status(401).json({success: false, message:'không tìm thấy'});
    
            res.json({success: true, deletedthongtintaikhoan: deletedthongtintaikhoan});
    
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'delete fail'});
        }
    }
    

}


module.exports = thongtintaikhoanController