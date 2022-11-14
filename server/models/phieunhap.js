const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const phieunhapSchema = new Schema({
    nhacungcap: {
        type: Schema.Types.ObjectId,
        ref: 'nhacungcaps',
        required: true
    },

    nguoiquanly: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },

    chitiet: [{
        sach: {
            type: Schema.ObjectId,
            require: true,
            ref: 'sachs'
        },

        soluong: {
            type: Number,
            default: 1
        },

        dongia: {
            type: Number,
            default: 1
        },

        thanhtien: {
            type: Number,
            default: 1
        }
    }],

    trangthai: {
        type: Boolean,
        default: false
    },

    tongtien: {
        type: Number,
        default:1
    },

    ngaynhap:{
        type: Date,
        default: Date.now()
    },
    id: {
        type: Number,
        required: true,
        unique: true
    }


})

module.exports = mongoose.model('phieunhaps', phieunhapSchema);