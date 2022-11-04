const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const phieunhapSchema = new Schema({
    manhanvien: {
        type: Schema.Types.ObjectId,
        ref: 'thongtintaikhoans',
        require: true
    },
    macungcap: {
        type: Schema.Types.ObjectId,
        ref: 'nhacungcaps',
        require: true
    }, 
    chitiet: [{
        masach: {
            type: Schema.Types.ObjectId,
            ref: 'sachs',
            require: true
        },
        soluong: {
            type: Number,
            require: true
        }, 
        dongia: {
            type: Number,
            require: true
        },
        thanhtien: {
            type: Number,
            require: true
        }
    }],
    trangthai: {
        type: String,
        default: "Not processed",
        enum: ["Not processed", "Processing", "Cancel", "Shipping", "Finish"]
    }, 
    tongtien: {
        type: Number,
        require: true
    },
    ngaynhap: {
        type: Date,
        default: Date.now,
        require: true
    }

});

module.exports = mongoose.model("phieunhaps", phieunhapSchema);