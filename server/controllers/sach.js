const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const sach = require('../models/sach');


const sachController = {
    create: async(req,res)=>{
        const{nhaxuatban,tacgia,theloai, tensach, soluong, dongia,hinhanh} = req.body;
        if(!tensach)
        return res.status(400).json({success:false, message: 'tensach is required'});
    
        try{
            const newSach = new sach({
                nhaxuatban,
                tacgia,
                theloai,
                tensach,
                soluong,
                dongia,
                hinhanh
            })
            await newSach.save();
            res.json({success: true, message: 'tạo thành công', sach: newSach});
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'tạo thất bại'});
        }
    },

    update:async(req,res)=>{
        const{nhaxuatban,tacgia,theloai, tensach, soluong, dongia,hinhanh} = req.body;
    
        if(!tensach)
        return res.status(400).json({success:false, message: 'tensach is required'});
    
        try{
            let updatedSach = {
                nhaxuatban,
                tacgia,
                theloai,
                tensach,
                soluong,
                dongia,
                hinhanh
            }
    
            const sachUpdateCondition = {_id: req.params.id};
            updatedSach = await sach.findByIdAndUpdate(sachUpdateCondition, updatedSach, {new: true});
            
            if(!updatedSach)
            return res.status(401).json({success: false, message:'cập nhật sách thất bại'});
    
            res.json({success: true, message: 'cập nhật thành công', sach: updatedSach});
    
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Cập nhật thất bại'});
        }
    },

    delete :  async(req,res)=>{
        try{
           
            const sachDeleteCondition = {_id: req.params.id};
            deletedSach = await sach.findByIdAndDelete(sachDeleteCondition);
            
            if(!deletedSach)
            return res.status(401).json({success: false, message:'Id sách không tồn tại'});
    
            res.json({success: true, post: deletedSach});
    
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'delete sách thất bại'});
        }
    },

    find: async(req, res) => {
        try{
            if(req.body.tensach){
                const query = new RegExp(req.body.tensach);
                console.log(query)
                const posts = await sach.find({tensach: {$regex: query, $options: 'i'} }).
                populate('theloai').populate('tacgia').populate('nhaxuatban');
                res.status(200).json({success: true, posts});
            }else{
                const posts = await sach.find();
                res.status(200).json({success: true, posts});
            }
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },
}

module.exports = sachController