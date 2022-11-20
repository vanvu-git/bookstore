const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        require: true
    },

    ho: {
        type: String,
        required: true
    },

    ten: {
        type: String,
        require: true
    },

    sdt: {
        type: String
    },

    email: {
        type: String,
        unique: true
    },

    quyen: {
        type: Number,
        required: true,
        default:0
    },

    ngaysinh: {
        type: Date
    },

    hinhanh: {
        type: String,
        default: "https://timeoutcomputers.com.au/wp-content/uploads/2016/12/noimage.jpg"
    },

    trangthai: {
        type: Boolean,
        require: true,
        default: false
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    emailVerified: {
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model('users', UserSchema);