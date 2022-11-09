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
            res.status(200).json({success: true,data: posts});
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },

    findByIdNhanVien: async(req, res) => {
        try{
            const posts = await phieunhap.find({nguoiquanly: req.params.id});
            res.status(200).json({success: true,data: posts});
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },

    update: async(req,res)=>{
        const{ nhacungcap,chitiet, tongtien} = req.body;
        if(!nhacungcap)
        return res.status(400).json({success: false, message: 'nhacungcap is required'});
        const pn = await phieunhap.findById(req.params.id).select('trangthai');
        console.log(pn.trangthai);
        if(pn.trangthai)
        return res.status(400).json({success: false, message: 'phieu nhap da xu li'});
        try{
            let updatedphieunhap = {
                nhacungcap,
                nguoiquanly: req.userId,
                tongtien,
                chitiet
            }
    
            const phieunhapUpdateCondition = {_id: req.params.id};
            updatedphieunhap = await phieunhap.findByIdAndUpdate(phieunhapUpdateCondition, updatedphieunhap, {new: true});
            
            if(!updatedphieunhap)
            return res.status(401).json({success: false, message:'not found'});
    
            res.status(200).json({success: true, message: 'update successfully!!!', data: updatedphieunhap});
    
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },

    delete :  async(req,res)=>{
        try{
           
            const phieunhapDeleteCondition = {_id: req.params.id};
            const pn = await phieunhap.findById(req.params.id).select('trangthai');
            if(!pn)
            return res.status(401).json({success: false, message:'not found'});
            if(pn.trangthai)
            return res.status(400).json({success: false, message: 'phieu nhap da xu li'});

            deletedphieunhap = await phieunhap.findByIdAndDelete(phieunhapDeleteCondition);
            res.json({success: true, message: 'delete successfully!!!'});
    
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },

    xuli :  async(req,res)=>{
        try{
            const pn = await phieunhap.findById(req.params.id);
            if(!pn)
            return res.status(400).json({success: false, message: 'khong tim thay phieu nhap'});
            if(pn.trangthai)
            return res.status(400).json({success: false, message: 'phieu nhap da xu li'});

            const chitiet = pn.chitiet;
            chitiet.map(async function(a){
                console.log(a.soluong);
                const Sach = await sach.findById(a.sach);
                const soluong = a.soluong + Sach.soluong;
                const update = { soluong: soluong };
                const filter = {_id: a.sach};
                const b = await sach.findOneAndUpdate(filter, update,{new: true});
                console.log(b);
            })
            pn.trangthai = true;
            pn.nguoiquanly = req.userId;
            await pn.save();

            res.status(200).json({success: true, message: 'update successfully!!!', data: pn});
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },
    

}


module.exports = phieunhapController