
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
            res.json({success: true, message: 'create successfully!!!', data: newTacGia});
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

                tacgia.find()
                .skip(skipAmount)
                .limit(2)
                .then(posts=>{
                    tacgia.countDocuments().then((total)=>{
                        var tongSoPage = Math.ceil(total / 2)
                        res.status(200).json({success: true,tongSoPage: tongSoPage,data: posts});
                    })
                    
                })
                .catch(error=>{
                    res.status(500).json({success: false, message: 'Internal server error'});
                })
            }
            else{
                const posts = await tacgia.find();
                res.status(200).json({success: true, data: posts});
            }
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },

    findId: async(req, res) => {
        try{
            const posts = await tacgia.findById(req.params.id);
            res.status(200).json({success: true,data: posts});
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },

    findByName: async(req, res) => {
        try{
            const query = new RegExp(req.query.tentacgia);
            const posts = await tacgia.findOne({tentg: {$regex: query, $options: 'i'}})
            res.status(200).json({success: true,data: posts});
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
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
                sdt: sdt || '',
            }
    
            const tacgiaUpdateCondition = {_id: req.params.id};
            updatedTacGia = await tacgia.findByIdAndUpdate(tacgiaUpdateCondition, updatedTacGia, {new: true});
            
            if(!updatedTacGia)
            return res.status(401).json({success: false, message:'not found'});
    
            res.json({success: true, message: 'update successfully!!!', tacgia: updatedTacGia});
    
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },

    delete :  async(req,res)=>{
        try{
           
            const tacgiaDeleteCondition = {_id: req.params.id};
            deletedTacgia = await tacgia.findByIdAndDelete(tacgiaDeleteCondition);
            
            if(!deletedTacgia)
            return res.status(401).json({success: false, message:'not found'});
    
            res.json({success: true, message: 'delete successfully!!!'});
    
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    }
    

}


module.exports = tacgiaController