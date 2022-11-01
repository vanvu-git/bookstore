
const express = require('express');
const router = express.Router();
const theloai = require('../models/theloai');


const theloaiController = {
    create: async(req,res) => {
        const{ tentl} = req.body;
        if(!tentl)
        return res.status(400).json({success: false, message: 'tengtl is required'});
        try{
            const newTheLoai = new theloai({
                tentl
            })
            await newTheLoai.save();
            res.json({success: true, message: 'Tạo thể loại thành công', theloai: newTheLoai});
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },
    
    find: async(req, res) => {
        try{
            if(req.body.tentl){
                const posts = await theloai.findOne({tentl: new RegExp('^'+req.body.tentl+'$', "i")})
                res.status(200).json({success: true, posts});
            }else{
                const posts = await theloai.find();
                res.status(200).json({success: true, posts});
            }
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },

    findId: async(req, res) => {
        try{
            const posts = await theloai.findById(req.params.id);
            res.status(200).json({success: true, posts});
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },

    findName: async(req, res) => {
        try{
            const posts = await theloai.findOne({tentl: new RegExp('^'+req.body.tentl+'$', "i")})
            res.status(200).json({success: true, posts});
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server errorss'});
        }
    },

    update: async(req,res)=>{
        const{ tentl} = req.body;
    
        if(!tentl)
        return res.status(400).json({success:false, message: 'tentl is required'});
        try{
            let updatedtheloai = {
                tentl
            }
    
            const theloaiUpdateCondition = {_id: req.params.id};
            updatedtheloai = await theloai.findByIdAndUpdate(theloaiUpdateCondition, updatedtheloai, {new: true});
            
            if(!updatedtheloai)
            return res.status(401).json({success: false, message:'theloai không có'});
    
            res.json({success: true, message: 'sửa thành công', theloai: updatedtheloai});
    
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'update fail'});
        }
    },

    delete :  async(req,res)=>{
        try{
           
            const theloaiDeleteCondition = {_id: req.params.id};
            deletedtheloai = await theloai.findByIdAndDelete(theloaiDeleteCondition);
            
            if(!deletedtheloai)
            return res.status(401).json({success: false, message:'không tìm thấy tác giả'});
    
            res.json({success: true, deletedtheloai: deletedtheloai});
    
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'delete fail'});
        }
    }
    

}


module.exports = theloaiController