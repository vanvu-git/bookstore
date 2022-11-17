const mongoose = new require('mongoose');
const Schema = mongoose.Schema;

const hoadonSchema = new Schema({
    makhachhang: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    }, 
   
    manhanvien: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        default: null
    }, 
    chitiet: [{
        masach: {
            type: Schema.Types.ObjectId,
            ref: 'sachs',
        },
        soluong: {
            type: Number,
            require: true,
            default: 0
        }, 
        dongia: {
            type: Number,
            require: true,
            default: 0
        },
        thanhtien: {
            type: Number,
            require: true,
            default: 0
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    }, 
    tongtien: {
        type: Number,
        require: true,
        default: 0

    }, 
    trangthai: {
        type: String,
        default: "ChuaXuLy",
        enum: ["ChuaXuLy", "DangXuLy", "DaXacNhan","Huy", "DangGiao", "HoanThanh"]
    },
    id: {
        type: Number,
        required: true,
        unique: true
    },
    
    thongtingiaohang: {
        diachi: {
            type: String,
            require: true
        },
        nguoigiao: {
            type: Schema.Types.ObjectId,
            ref: 'nguoigiaohangs'
        },
        tienship: {
            type: Number,
            require: true,
            default: 0
        }
    }

});

module.exports = mongoose.model("hoadons", hoadonSchema);