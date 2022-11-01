
const express = require('express');
const router = express.Router();
const nhaxuatban = require('../models/nhaxuatban');


const nhaxuatbanController = {
    create: async(req,res) => {
        const{ tennxb, diachi, sdt} = req.body;
        if(!tennxb)
        return res.status(400).json({success: false, message: 'tengtl is required'});
        try{
            const newnhaxuatban = new nhaxuatban({
                tennxb,
                diachi,
                sdt
            })
            await newnhaxuatban.save();
            res.json({success: true, message: 'Tạo nhà xuất bản thành công', nhaxuatban: newnhaxuatban});
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },
    
    find: async(req, res) => {
        try{
            if(req.body.tennxb){
                const posts = await nhaxuatban.findOne({tennxb: new RegExp('^'+req.body.tennxb+'$', "i")})
                res.status(200).json({success: true, posts});
            }else{
                const posts = await nhaxuatban.find();
                res.status(200).json({success: true, posts});
            }
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },

    findId: async(req, res) => {
        try{
            const posts = await nhaxuatban.findById(req.params.id);
            res.status(200).json({success: true, posts});
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },

    update: async(req,res)=>{
        const{ tennxb, diachi, sdt} = req.body;
    
        if(!tennxb)
        return res.status(400).json({success:false, message: 'tennxb is required'});
        try{
            let updatednhaxuatban = {
                tennxb,
                diachi,
                sdt
            }
    
            const nhaxuatbanUpdateCondition = {_id: req.params.id};
            updatednhaxuatban = await nhaxuatban.findByIdAndUpdate(nhaxuatbanUpdateCondition, updatednhaxuatban, {new: true});
            
            if(!updatednhaxuatban)
            return res.status(401).json({success: false, message:'nhaxuatban không có'});
    
            res.json({success: true, message: 'sửa thành công', nhaxuatban: updatednhaxuatban});
    
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'update fail'});
        }
    },

    delete :  async(req,res)=>{
        try{
           
            const nhaxuatbanDeleteCondition = {_id: req.params.id};
            deletednhaxuatban = await nhaxuatban.findByIdAndDelete(nhaxuatbanDeleteCondition);
            
            if(!deletednhaxuatban)
            return res.status(401).json({success: false, message:'không tìm thấy tác giả'});
    
            res.json({success: true, deletednhaxuatban: deletednhaxuatban});
    
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'delete fail'});
        }
    }
    

}


module.exports = nhaxuatbanController