const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const thongtintaikhoanSchema = new Schema({
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

    

})

module.exports = mongoose.model('thongtintaikhoans', thongtintaikhoanSchema);