const hoadon = require('../models/hoadon.js');
const sach = require('../models/sach.js');
var mongoose = require('mongoose');

const hoadonRouter = {
    create: async(req, res, next) => {
        const {makhachhang, chitiet, tongtien, thongtingiaohang} =  req.body;
        if (!chitiet || !chitiet.length) {
            return res.status(400).json({success: false, message: "Hóa đơn không được rỗng"});
        } 
        const isStock = await checkStock(chitiet);
        if (isStock == false) {
            return res.status(400).json({success: false, message: "Không đủ số lượng"});
        }
        
        try {
            var id = 1;
            const lastHd = await hoadon.findOne().sort({id: -1}).limit(1);
            if (lastHd) id+=lastHd.id;
            const newHoaDon = new hoadon({makhachhang: makhachhang, chitiet: chitiet, tongtien: tongtien, id: id, thongtingiaohang: thongtingiaohang});
            await newHoaDon.save();      
            return res.json({success: true, message: 'Tạo hóa đơn thành công', hoadon: newHoaDon});
        } catch (error) {
            console.log(error);
            return res.status(500).json({success: false, message: 'Internal server error'});
        }
    },
    getById: async(req, res, next) => {
        try {
            const hd = await hoadon.findById(req.params.id).populate('makhachhang', "ho ten sdt email").populate('manhanvien', "ho ten sdt email").populate('thongtingiaohang.nguoigiao').populate('chitiet.masach');
            res.status(200).json({success: true, hd});
    
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Không tìm thấy hóa đơn.'});
        }
    },
    getAll: async(req, res, next) => {
        try {
            const hd = await hoadon.find().populate('makhachhang', "ho ten sdt email").populate('manhanvien', "ho ten sdt email").populate('thongtingiaohang.nguoigiao').populate('chitiet.masach');
            res.status(200).json({success: true, hd});
    
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Không tìm thấy hóa đơn.'});
        }
    },
    getByTrangThai: async(req, res, next) => {
        try {
            const hoadons = await hoadon.find({trangthai: req.params.status}).populate('makhachhang', "ho ten sdt email").populate('manhanvien', "ho ten sdt email").populate('thongtingiaohang.nguoigiao').populate('chitiet.masach');
            res.status(200).json({success: true, hoadons});
    
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Không tìm thấy hóa đơn.'});
        }
    },
    getByNgay: async(req, res, next) => {
        try {
            let ngayBatDau =  new Date(req.params.startdate);
            let ngayKetThuc = new Date(req.params.enddate);
            if (ngayBatDau > ngayKetThuc) {
                return res.status(400).json({success: false, message: "Tham số 'startdate' và 'enddate' không phù hợp."});
            }
            const hoadons = await hoadon.find({createdAt: {$gte: ngayBatDau , $lte: ngayKetThuc}}).populate('makhachhang', "ho ten sdt email").populate('manhanvien', "ho ten sdt email").populate('thongtingiaohang.nguoigiao').populate('chitiet.masach');;
            res.status(200).json({success: true, hoadons});
    
        } catch (error) {
            console.log(error);
            res.status(400).json({success: false, message: 'Không tìm thấy hóa đơn.'});
        }
    }, 
    getByKhach: async(req, res, next) => {
        try {
            const hoadons = await hoadon.find({makhachhang: req.params.id}).populate('makhachhang', "ho ten sdt email").populate('manhanvien', "ho ten sdt email").populate('chitiet.masach').populate('thongtingiaohang.nguoigiao');
            res.status(200).json({success: true, hoadons});
    
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Không tìm thấy hóa đơn.'});
        }
    },
    getByNhanVien: async(req, res, next) => {
        try {
            const hoadons = await hoadon.find({manhanvien: req.params.id}).populate('makhachhang', "ho ten sdt email").populate('manhanvien', "ho ten sdt email").populate('thongtingiaohang.nguoigiao').populate('chitiet.masach');;
            res.status(200).json({success: true, hoadons});
    
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Không tìm thấy hóa đơn.'});
        }
    },
    getAmountByMonth: async(req, res, next) => {
        const currentYear = new Date().getFullYear();
        const currentMonth = Number(req.params.month);
        var startStr = null; 
        if (currentMonth <= 9) {
            startStr = currentYear + '-0'+currentMonth + '-01';
        } else {
            startStr = currentYear + '-'+currentMonth + '-01';
        }
        const startDate = new Date(startStr);
        var endStr = null;
        if (currentMonth != 12) {
            if (currentMonth < 9) {
                endStr = currentYear + '-0'+ (currentMonth+1) + '-01';
            } else {
                endStr = currentYear + '-'+ (currentMonth+1) + '-01';
            } 
        } else {
            endStr = (currentYear+1) + '-01-01';
        }
        const endDate = new Date(endStr);
       
        try {
            const amount = await hoadon.find({createdAt: {$gte: startDate, $lt: endDate}}).count();
           
            res.status(200).json({success: true, amount: amount});
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Không tìm thấy hóa đơn.'});
        }
    },
    getLatest5Invoice: async(req, res, next) => {
        try {
            const hd = await hoadon.find().sort({createdAt:-1}).limit(5).populate('makhachhang', "ho ten sdt email").populate('manhanvien', "ho ten sdt email").populate('thongtingiaohang.nguoigiao').populate('chitiet.masach');

            res.status(200).json({success: true, hd});
    
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Không tìm thấy hóa đơn.'});
        }
    },
    updateTrangThai: async(req, res, next) => {
        try {
            const beforeHoaDon = await hoadon.findById(req.params.id);
            if (!beforeHoaDon || beforeHoaDon.trangthai == "Huy" || beforeHoaDon.trangthai == "HoanThanh")
            {
                return res.status(401).json({success: false, message:'Cập nhật trạng thái hóa đơn thất bại do hóa đơn đã bị hủy hoặc đã hoàn thành.'});   
            }
           
            const updateHoaDon = await hoadon.findByIdAndUpdate(req.params.id, {$set: {trangthai: req.params.status, manhanvien: req.params.manhanvien}}, {new: true,  runValidators: true});
            if (!updateHoaDon) {
                return res.status(401).json({success: false, message:'Cập nhật trạng thái hóa đơn thất bại'});
            }
            if (req.params.status == "DaXacNhan" && (beforeHoaDon.trangthai == "ChuaXuLy" || beforeHoaDon.trangthai == "DangXuLy" )) {
                const updateQty = await updateStock(updateHoaDon.chitiet);
                if (updateQty == false) {
                    return res.status(400).json({success: false, message: "Không đủ số lượng"});
                }
            }
            if (req.params.status == "Huy" && beforeHoaDon.trangthai != "ChuaXuLy" && beforeHoaDon.trangthai != "DangXuLy"  ) {
              await updateStock(updateHoaDon.chitiet, "cong");
               
            }
            res.json({success: true, message: 'Cập nhật trạng thái hóa đơn thành công', hoadon: updateHoaDon});
        }  catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Cập nhật trạng thái hóa đơn thất bại'});
        }
    }, 
    huyDon: async(req, res, next) => {
        try {
            const findHoaDon = await hoadon.findById(req.params.id);
            if (!findHoaDon || findHoaDon.trangthai == "DaXacNhan" || findHoaDon.trangthai == "DangGiao" || findHoaDon.trangthai == "Huy" || findHoaDon.trangthai == "HoanThanh")
            {
                return res.status(401).json({success: false, message:'Hủy đơn thất bại do hóa đơn đã được xử lý.'});   
            }
            const updateHoaDon = await hoadon.findByIdAndUpdate(req.params.id, {$set: {trangthai: "Huy"}}, {new: true});
            if (!updateHoaDon) {
                return res.status(401).json({success: false, message:'Hủy đơn thất bại'});
            }
            res.json({success: true, message: 'Hủy đơn thành công', hoadon: updateHoaDon});
        }  catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Hủy đơn thất bại'});
        }
    }, 
    delete: async(req, res, next) => {
        try {
            try {
                mongoose.Types.ObjectId(req.params.id);
             } catch (error) {
                 return res.status(500).json({success: false, message: 'Tham số không phù hợp'});
             }
            const deleteHoaDon = await hoadon.findByIdAndDelete(req.params.id);
            res.json({success: true, message: 'Xóa hóa đơn thành công', hoadon: deleteHoaDon});
        }catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Xóa đơn thành công'});
        }
    }, 
    updateNguoiGiao: async(req, res, next) => {
        const {shiper} = req.body;
        if(!shiper)
        return res.status(400).json({success: false, message: 'Người giao là bắt buộc'});
        try {
           const existhHoaDon = await hoadon.findOne({_id: req.params.id});
           if(!existhHoaDon)
           return res.status(400).json({success: false, message: 'Hóa đơn không tồn tại'});
           const {nguoigiao, ...other} = existhHoaDon.thongtingiaohang;
           const updateHoaDon =  await hoadon.findByIdAndUpdate(req.params.id, {$set: {thongtingiaohang:{nguoigiao: shiper, ...other}}}, {new: true}).populate('makhachhang', "ho ten sdt email").populate('manhanvien', "ho ten sdt email").populate('thongtingiaohang.nguoigiao').populate('chitiet.masach');
           res.json({success: true, message: 'Update đơn thành công', hoadon: updateHoaDon});
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Cập nhật người giao hàng thất bại'});
        }
    }

}

async function updateStock(chitiet, option = "tru") {
    for(var element = 0; element < chitiet.length; element++) {
        var book = await sach.findById(chitiet[element].masach);
        if (option == "tru") {
            book.soluong -= chitiet[element].soluong;
        } else {
            if (option == "cong") {
                book.soluong += chitiet[element].soluong;
            }
        } 
        if (book.soluong < 0) {
            return false;
        } 
        await book.save();
    }
    return true;
    
}
async function checkStock(chitiet) {
    for(var element = 0; element < chitiet.length; element++) {
        var book = await sach.findById(chitiet[element].masach);
        if ( chitiet[element].soluong > book.soluong) {
            return false;
        } 
        return true;
    }
    
}

module.exports = hoadonRouter;


