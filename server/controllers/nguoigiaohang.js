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

    // findId: async(req, res) => {
    //     try{
    //         const posts = await tacgia.findById(req.params.id);
    //         res.status(200).json({success: true,data: posts});
    //     }catch(error){
    //         console.log(error);
    //         res.status(500).json({success: false, message: 'Internal server error'});
    //     }
    // },

    // findByName: async(req, res) => {
    //     try{
    //         const query = new RegExp(req.query.tentacgia);
    //         const posts = await tacgia.findOne({tentg: {$regex: query, $options: 'i'}})
    //         res.status(200).json({success: true,data: posts});
    //     }catch(error){
    //         console.log(error);
    //         res.status(500).json({success: false, message: 'Internal server error'});
    //     }
    // },

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
    }
    

}


module.exports = nguoigiaohangController