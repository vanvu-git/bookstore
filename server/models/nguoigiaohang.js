const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nguoigiaohangSchema = new Schema({
    ten: {
        type: String,
        required: true,
    },

    email: {
        type: String
    },

    sdt: {
        type: String
    },

    trangthai: {
        type: Number,
        required: true,
        default: 1
    },
    id: {
        type: Number,
        required: true,
        unique: true
    }
})



module.exports = mongoose.model('nguoigiaohangs', nguoigiaohangSchema);