const theloai = require('../models/theloai');
const sach = require('../models/sach');

const theloaiController = {
    create: async(req,res) => {
        const{ tentl, mota} = req.body;
        if(!tentl)
        return res.status(400).json({success: false, message: 'tentl is required'});
       
        try{
            const tl = await theloai.findOne({ tentl });
            if(tl)
            return res.status(400).json({success: false, message: 'tentl already have'});
            const newTheLoai = new theloai({
                tentl,
                mota
            })
            await newTheLoai.save();
            res.json({success: true, message: 'create successfully!!!', data: newTheLoai});
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },
    
    find: async(req, res) => {
        try{
            if(req.query.tentl){
                const Theloai = await theloai.findOne({tentl: new RegExp('^'+req.query.tentl+'$', "i")})
                res.status(200).json({success: true, data: Theloai});
            }else{
                const Theloai = await theloai.find();
                res.status(200).json({success: true, data: Theloai});
            }
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },

    findId: async(req, res) => {
        try{
            const posts = await theloai.findById(req.params.id);
            res.status(200).json({success: true, data: posts});
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },

    findName: async(req, res) => {
        try{
            const posts = await theloai.findOne({tentl: new RegExp('^'+req.body.tentl+'$', "i")})
            res.status(200).json({success: true, data: posts});
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server errorss'});
        }
    },

    update: async(req,res)=>{
        const{ tentl, mota} = req.body;
    
        if(!tentl)
        return res.status(400).json({success:false, message: 'tentl is required'});
        try{
            let updatedtheloai = {
                tentl,
                mota
            }
    
            const theloaiUpdateCondition = {_id: req.params.id};
            updatedtheloai = await theloai.findByIdAndUpdate(theloaiUpdateCondition, updatedtheloai, {new: true});
            
            if(!updatedtheloai)
            return res.status(401).json({success: false, message:'theloai is not found'});
    
            res.json({success: true, message: 'update successfully!!!', data: updatedtheloai});
    
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },

    delete :  async(req,res)=>{
        try{
            const theloaiinsach = await sach.findOne({theloai: req.params.id});
            console.log(theloaiinsach);
            if(theloaiinsach)
            return res.status(400).json({success: false, message: 'theloai have relationship with the other'});
            const theloaiDeleteCondition = {_id: req.params.id};
            deletedtheloai = await theloai.findByIdAndDelete(theloaiDeleteCondition);
            
            if(!deletedtheloai)
            return res.status(401).json({success: false, message:'tacgia is not found'});
    
            res.json({success: true, message:'delete successfully!!!'});
    
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    }
    

}


module.exports = theloaiController