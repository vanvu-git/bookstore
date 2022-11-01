
const express = require('express');
const router = express.Router();
const tacgia = require('../models/tacgia');


const tacgiaController = {
    create: async(req,res) => {
        const{ tentg,diachi,sdt} = req.body;
        if(!tentg)
        return res.status(400).json({success: false, message: 'tengtg is required'});
        try{
            const newTacGia = new tacgia({
                tentg,
                diachi,
                sdt
            })
            await newTacGia.save();
            res.json({success: true, message: 'Tạo tác giả thành công', tacgia: newTacGia});
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },
    
    find: async(req, res) => {
        try{
            if(req.body.tentg){
                const posts = await tacgia.findOne({tentg: new RegExp('^'+req.body.tentg+'$', "i")})
                res.status(200).json({success: true, posts});
            }else{
                const posts = await tacgia.find();
                res.status(200).json({success: true, posts});
            }
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },

    findId: async(req, res) => {
        try{
            const posts = await tacgia.findById(req.params.id);
            res.status(200).json({success: true, posts});
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },

    findName: async(req, res) => {
        try{
            const posts = await tacgia.findOne({tentg: new RegExp('^'+req.body.tentg+'$', "i")})
            res.status(200).json({success: true, posts});
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server errorss'});
        }
    },

    update: async(req,res)=>{
        const{ tentg, diachi, sdt} = req.body;
    
        if(!tentg)
        return res.status(400).json({success:false, message: 'tentg is required'});
        try{
            let updatedTacGia = {
                tentg, 
                diachi: diachi || '', 
                sdt: sdt || 0,
            }
    
            const tacgiaUpdateCondition = {_id: req.params.id};
            updatedTacGia = await tacgia.findByIdAndUpdate(tacgiaUpdateCondition, updatedTacGia, {new: true});
            
            if(!updatedTacGia)
            return res.status(401).json({success: false, message:'tacgia không có'});
    
            res.json({success: true, message: 'sửa thành công', tacgia: updatedTacGia});
    
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'update fail'});
        }
    },

    delete :  async(req,res)=>{
        try{
           
            const tacgiaDeleteCondition = {_id: req.params.id};
            deletedTacgia = await tacgia.findByIdAndDelete(tacgiaDeleteCondition);
            
            if(!deletedTacgia)
            return res.status(401).json({success: false, message:'không tìm thấy tác giả'});
    
            res.json({success: true, deletedtacgia: deletedTacgia});
    
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'delete fail'});
        }
    }
    

}


module.exports = tacgiaController