const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tacgiaSchema = new Schema({
    tentg: {
        type: String,
        required: true,
    },

    diachi: {
        type: String
    },

    sdt: {
        type: String
    },

    id: {
        type: Number,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('tacgias', tacgiaSchema);