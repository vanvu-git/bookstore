const phieunhap = require('../models/phieunhap');
const sach = require('../models/sach');

const phieunhapController = {
    create: async(req,res) => {
        const{ nhacungcap, trangthai,chitiet, tongtien} = req.body;
        if(!nhacungcap)
        return res.status(400).json({success: false, message: 'nhacungcap is required'});

        try{
            const newphieunhap = new phieunhap({
                nhacungcap,
                nguoiquanly: req.userId,
                trangthai,
                tongtien,
                chitiet
            })
            await newphieunhap.save();
            res.json({success: true, message: 'create successfully!!!', data: newphieunhap});
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },
    
    find: async(req, res) => {
        try{
            const posts = await phieunhap.find().populate({path:'nguoiquanly',select:'-password'}).populate('chitiet.sach');
            res.status(200).json({success: true,data: posts});
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },

    findId: async(req, res) => {
        try{
            const posts = await phieunhap.findById(req.params.id);
            const array = posts.chitiet;
            res.status(200).json({success: true,data: array});
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },

    // update: async(req,res)=>{
    //     const{ tenncc, diachi, sdt,email} = req.body;
    
    //     if(!tenncc)
    //     return res.status(400).json({success:false, message: 'tenncc is required'});
    //     try{
    //         let updatednhacungcap = {
    //             tenncc,
    //             diachi,
    //             sdt,
    //             email
    //         }
    
    //         const nhacungcapUpdateCondition = {_id: req.params.id};
    //         updatednhacungcap = await nhacungcap.findByIdAndUpdate(nhacungcapUpdateCondition, updatednhacungcap, {new: true});
            
    //         if(!updatednhacungcap)
    //         return res.status(401).json({success: false, message:'not found'});
    
    //         res.status(200).json({success: true, message: 'update successfully!!!', data: updatednhacungcap});
    
    //     }catch(error){
    //         console.log(error);
    //         res.status(500).json({success: false, message: 'Internal server error'});
    //     }
    // },

    // delete :  async(req,res)=>{
    //     try{
           
    //         const nhacungcapDeleteCondition = {_id: req.params.id};
    //         deletednhacungcap = await nhacungcap.findByIdAndDelete(nhacungcapDeleteCondition);
            
    //         if(!deletednhacungcap)
    //         return res.status(401).json({success: false, message:'not found'});
    
    //         res.json({success: true, message: 'delete successfully!!!'});
    
    //     }catch(error){
    //         console.log(error);
    //         res.status(500).json({success: false, message: 'Internal server error'});
    //     }
    // }
    

}


module.exports = phieunhapController