const nguoigiaohang = require('../models/nguoigiaohang');

const nguoigiaohangController = {
    create: async(req,res) => {
        const{ ten,email,sdt} = req.body;
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

    // update: async(req,res)=>{
    //     const{ tentg, diachi, sdt} = req.body;
    
    //     if(!tentg)
    //     return res.status(400).json({success:false, message: 'tentg is required'});
    //     try{
    //         let updatedTacGia = {
    //             tentg, 
    //             diachi,
    //             sdt
    //         }
    
    //         const tacgiaUpdateCondition = {_id: req.params.id};
    //         updatedTacGia = await tacgia.findByIdAndUpdate(tacgiaUpdateCondition, updatedTacGia, {new: true});
            
    //         if(!updatedTacGia)
    //         return res.status(401).json({success: false, message:'not found'});
    
    //         res.json({success: true, message: 'update successfully!!!', tacgia: updatedTacGia});
    
    //     }catch(error){
    //         console.log(error);
    //         res.status(500).json({success: false, message: 'Internal server error'});
    //     }
    // },

    // delete :  async(req,res)=>{
    //     try{
    //         const tacgiainsach = await sach.findOne({tacgia: req.params.id});
    //         if(tacgiainsach)
    //         return res.status(400).json({success: false, message: 'tacgia have relationship with the other'});
    //         const tacgiaDeleteCondition = {_id: req.params.id};
    //         deletedTacgia = await tacgia.findByIdAndDelete(tacgiaDeleteCondition);
            
    //         if(!deletedTacgia)
    //         return res.status(401).json({success: false, message:'not found'});
    
    //         res.json({success: true, message: 'delete successfully!!!'});
    
    //     }catch(error){
    //         console.log(error);
    //         res.status(500).json({success: false, message: 'Internal server error'});
    //     }
    // }
    

}


module.exports = nguoigiaohangController