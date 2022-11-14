const nhacungcap = require('../models/nhacungcap');
const phieunhap = require('../models/phieunhap');

const nhacungcapController = {
    create: async(req,res) => {
        const{ tenncc, diachi, sdt, email} = req.body;
        if(!tenncc)
        return res.status(400).json({success: false, message: 'tenncc is required'});
        try{
            var id = 1;
            const maxncc = await nhacungcap.findOne().sort({id: -1}).limit(1);
            if(maxncc) id = maxncc.id + 1;
            const newnhacungcap = new nhacungcap({
                tenncc,
                diachi,
                sdt,
                email,
                id
            })
            await newnhacungcap.save();
            res.json({success: true, message: 'create successfully!!!', data: newnhacungcap});
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },
    
    find: async(req, res) => {
        try{
            const posts = await nhacungcap.find();
            res.status(200).json({success: true,data: posts});
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },

    findId: async(req, res) => {
        try{
            const posts = await nhacungcap.findById(req.params.id);
            res.status(200).json({success: true,data: posts});
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },

    update: async(req,res)=>{
        const{ tenncc, diachi, sdt,email} = req.body;
    
        if(!tenncc)
        return res.status(400).json({success:false, message: 'tenncc is required'});
        try{
            let updatednhacungcap = {
                tenncc,
                diachi,
                sdt,
                email
            }
    
            const nhacungcapUpdateCondition = {_id: req.params.id};
            updatednhacungcap = await nhacungcap.findByIdAndUpdate(nhacungcapUpdateCondition, updatednhacungcap, {new: true});
            
            if(!updatednhacungcap)
            return res.status(401).json({success: false, message:'not found'});
    
            res.status(200).json({success: true, message: 'update successfully!!!', data: updatednhacungcap});
    
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },

    delete :  async(req,res)=>{
        try{
            const pn = await phieunhap.findOne({nhacungcap: req.params.id});
            if(pn)
            return res.status(400).json({success: true, message: 'nhacungcap have relationship with the other'});
            const nhacungcapDeleteCondition = {_id: req.params.id};
            deletednhacungcap = await nhacungcap.findByIdAndDelete(nhacungcapDeleteCondition);
            
            if(!deletednhacungcap)
            return res.status(401).json({success: false, message:'not found'});
    
            res.json({success: true, message: 'delete successfully!!!'});
    
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    }
    

}


module.exports = nhacungcapController