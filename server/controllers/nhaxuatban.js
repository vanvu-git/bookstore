const nhaxuatban = require('../models/nhaxuatban');
const sach = require('../models/sach');

const nhaxuatbanController = {
    create: async(req,res) => {
        const{ tennxb, diachi, sdt} = req.body;
        if(!tennxb)
        return res.status(400).json({success: false, message: 'tengtl is required'});
        try{
            var id = 1;
            const maxnxb = await nhaxuatban.findOne().sort({id: -1}).limit(1);
            if(maxnxb) id = maxnxb.id + 1;
            const newnhaxuatban = new nhaxuatban({
                tennxb,
                diachi,
                sdt,
                id
            })
            await newnhaxuatban.save();
            res.json({success: true, message: 'create successfully!!!', data: newnhaxuatban});
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },
    
    find: async(req, res) => {
        try{
            if(req.body.tennxb){
                const posts = await nhaxuatban.findOne({tennxb: new RegExp('^'+req.body.tennxb+'$', "i")})
                res.status(200).json({success: true,data: posts});
            }else{
                const posts = await nhaxuatban.find();
                res.status(200).json({success: true,data: posts});
            }
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },

    findId: async(req, res) => {
        try{
            const posts = await nhaxuatban.findById(req.params.id);
            res.status(200).json({success: true,data: posts});
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
            return res.status(401).json({success: false, message:'not found'});
    
            res.json({success: true, message: 'sửa thành công', nhaxuatban: updatednhaxuatban});
    
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },

    delete :  async(req,res)=>{
        try{
            const nhaxuatbaninsach = await sach.findOne({nhaxuatban: req.params.id});
            if(nhaxuatbaninsach)
            return res.status(400).json({success: false, message: 'nhaxuatban have relationship with the other'});
            
            const nhaxuatbanDeleteCondition = {_id: req.params.id};
            deletednhaxuatban = await nhaxuatban.findByIdAndDelete(nhaxuatbanDeleteCondition);
            
            if(!deletednhaxuatban)
            return res.status(401).json({success: false, message:'not found'});
    
            res.json({success: true, message: 'delete successfully!!!'});
    
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    }
    

}


module.exports = nhaxuatbanController