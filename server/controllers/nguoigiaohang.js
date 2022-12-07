const nguoigiaohang = require('../models/nguoigiaohang');

const nguoigiaohangController = {
    create: async(req,res) => {
        const{ ten,email,sdt, hinhanh} = req.body;
        if(!ten)
        return res.status(400).json({success: false, message: 'ten is required'});
        const emailValidate = emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@+[a-z]+.com*$/;
        if(!emailValidate.test(email))
        return res.status(400).json({success: false, message: 'email is invalid'});
        
        try{
            const maxidNguoiGiaoHang = await nguoigiaohang.findOne().sort({id: -1}).limit(1);
            var id =1;
            if(maxidNguoiGiaoHang) id = maxidNguoiGiaoHang.id + 1;
            const newNguoiGiaoHang = new nguoigiaohang({
                ten,
                email,
                sdt,
                hinhanh,
                id
            })
            await newNguoiGiaoHang.save();
            res.json({success: true, message: 'create successfully!!!', data: newNguoiGiaoHang});
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },
    
    find: async(req, res) => {
        try{
            const posts = await nguoigiaohang.find();
            res.status(200).json({success: true, data: posts});
            
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },

    findId: async(req, res) => {
        try{
            const posts = await nguoigiaohang.findById(req.params.id);
            res.status(200).json({success: true,data: posts});
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },

    

    update: async(req,res)=>{
        const{ ten, email, sdt, hinhanh} = req.body;
    
        if(!ten)
        return res.status(400).json({success:false, message: 'ten is required'});
        try{
            let updatedNguoiGiaoHang = {
                ten, 
                email,
                sdt,
                hinhanh
            }
    
            const nguoigiaohangUpdateCondition = {_id: req.params.id};
            updatedNguoiGiaoHang = await nguoigiaohang.findByIdAndUpdate(nguoigiaohangUpdateCondition, updatedNguoiGiaoHang, {new: true});
            
            if(!updatedNguoiGiaoHang)
            return res.status(401).json({success: false, message:'not found'});
    
            res.json({success: true, message: 'update successfully!!!', tacgia: updatedNguoiGiaoHang});
    
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },

    delete :  async(req,res)=>{
        try{
            const nguoigiaohangDeleteCondition = {_id: req.params.id};
            deletedNguoiGiaoHang = await nguoigiaohang.findByIdAndDelete(nguoigiaohangDeleteCondition);
            
            if(!deletedNguoiGiaoHang)
            return res.status(401).json({success: false, message:'not found'});
    
            res.json({success: true, message: 'delete successfully!!!'});
    
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },

    lock :  async(req,res)=>{
        try{
            const ngh  = await nguoigiaohang.findById(req.params.id);
            if(!ngh)
            return res.status(400).json({success: false, message: 'nguoigiaohang not found'});
            if(ngh.trangthai == 2)
            return res.status(400).json({success: false, message: 'nguoigiaohang is in progress'});
            ngh.trangthai = 0;
            await ngh.save();
            return res.status(200).json({success: true, message: 'lock successfully!!!', data: ngh});
        }catch(error){
            console.log(error);
            return res.status(500).json({success: false, message: 'Internal server error'});
        }
    },
    unlock :  async(req,res)=>{
        try{
            const ngh  = await nguoigiaohang.findById(req.params.id);
            if(!ngh)
            return res.status(400).json({success: false, message: 'nguoigiaohang not found'});
            if(ngh.trangthai != 0)
            return res.status(400).json({success: false, message: 'nguoigiaohang is not locked'});
            ngh.trangthai = 1;
            await ngh.save();
            return res.status(200).json({success: true, message: 'unlock successfully!!!', data: ngh});
        }catch(error){
            console.log(error);
            return res.status(500).json({success: false, message: 'Internal server error'});
        }
    },
    
    changeStatus :  async(req,res)=>{
        try{
            const ngh  = await nguoigiaohang.findById(req.params.id);
            if(!ngh)
            return res.status(400).json({success: false, message: 'nguoigiaohang not found'});
            if(ngh.trangthai == 0)
            return res.status(403).json({success: false, message: 'nguoigiaohang is locked'});
            const trangthai = req.body.trangthai;
            if(!trangthai)
            return res.status(403).json({success: false, message: 'trangthai not found'});
            ngh.trangthai = trangthai;
            await ngh.save();
            return res.status(200).json({success: true, message: 'change status successfully!!!', data: ngh});
        }catch(error){
            console.log(error);
            return res.status(500).json({success: false, message: 'Internal server error'});
        }
    },
}


module.exports = nguoigiaohangController