const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taikhoanSchema = new Schema({
    tentk: {
        type: String,
        required: true,
        unique: true
    },

    matkhau: {
        type: String,
        require: true
    },

    quyen: {
        type: Number,
        default:0
    },

    thongtintaikhoan: {
        type: Schema.Types.ObjectId,
        ref: 'thongtintaikhoans'
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('taikhoans', UserSchema);