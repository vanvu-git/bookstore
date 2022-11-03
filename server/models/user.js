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
        type: String
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

    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('users', UserSchema);