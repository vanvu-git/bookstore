const sach = require('../models/sach');


const sachController = {
    create: async(req,res)=>{
        const{nhaxuatban,tacgia,theloai, tensach, soluong, dongia,hinhanh} = req.body;
        if(!tensach)
        return res.status(400).json({success:false, message: 'tensach is required'});
        
        try{
            
            const Sach = await sach.findOne({tensach});
            if(Sach)
            return res.status(400).json({success: false, message: 'tensach already have'});

            const newSach = new sach({
                nhaxuatban,
                tacgia,
                theloai,
                tensach,
                soluong,
                dongia,
                hinhanh
            })
            await newSach.save();
            res.json({success: true, message: 'create successfully!!!', data: newSach});
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },

    update:async(req,res)=>{
        const{nhaxuatban,tacgia,theloai, tensach, soluong, dongia,hinhanh} = req.body;
    
        if(!tensach)
        return res.status(400).json({success:false, message: 'tensach is required'});
    
        try{
            let updatedSach = {
                nhaxuatban,
                tacgia,
                theloai,
                tensach,
                soluong,
                dongia,
                hinhanh
            }
    
            const sachUpdateCondition = {_id: req.params.id};
            updatedSach = await sach.findByIdAndUpdate(sachUpdateCondition, updatedSach, {new: true});
            
            if(!updatedSach)
            return res.status(401).json({success: false, message:'update fail'});
    
            res.json({success: true, message: 'update successfully!!!', data: updatedSach});
    
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },

    delete :  async(req,res)=>{
        try{
           
            const sachDeleteCondition = {_id: req.params.id};
            deletedSach = await sach.findByIdAndDelete(sachDeleteCondition);
            
            if(!deletedSach)
            return res.status(401).json({success: false, message:'not found'});
    
            res.json({success: true, message: 'delete successfully!!!'});
    
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },

    find: async(req, res) => {
        try{
            var page = req.query.page;
            var limit = req.query.limit;
            if(page){
                page = parseInt(page);
                limit = parseInt(limit);
                if(page < 1){
                    page = 1;
                }
                if(limit < 1){
                    page = 10;
                }
                var skipAmount = (page - 1) * limit;

                sach.find()
                .populate('theloai')
                .populate('tacgia')
                .populate('nhaxuatban')
                .skip(skipAmount)
                .limit(limit)
                .then(posts=>{
                    sach.countDocuments().then((total)=>{
                        var tongSoPage = Math.ceil(total / 2)
                        res.status(200).json({success: true,tongSoPage: tongSoPage,data: posts});
                    })
                    
                })
                .catch(error=>{
                    res.status(500).json({success: false, message: 'Internal server error'});
                })
            }else{
                const posts = await sach.find().
                populate('theloai').populate('tacgia').populate('nhaxuatban');
                res.status(200).json({success: true, data: posts});
            }
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },

    findByIdtheloai: async(req, res) => {
        try{
            if(req.query.id){
                const posts = await sach.find({theloai: req.query.id }).
                populate('theloai').populate('tacgia').populate('nhaxuatban');
                res.status(200).json({success: true,data: posts});
            }
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },
    findById: async(req, res) => {
        try{
        
            const posts = await sach.findById(req.params.id).
            populate('theloai').populate('tacgia').populate('nhaxuatban');
            res.status(200).json({success: true,data: posts});
            
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },
    findByName: async(req, res) => {
        try{
            if(req.query.tensach){
                const query = new RegExp(req.query.tensach);
                const posts = await sach.find({tensach: {$regex: query, $options: 'i'} }).
                populate('theloai').populate('tacgia').populate('nhaxuatban');
                res.status(200).json({success: true,data: posts});
            }else{
                const posts = await sach.find().
                populate('theloai').populate('tacgia').populate('nhaxuatban');
                res.status(200).json({success: true,data: posts});
            }
        }catch(error){
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    },
}

module.exports = sachController