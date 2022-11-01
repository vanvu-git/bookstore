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
    }
})

module.exports = mongoose.model('tacgias', tacgiaSchema);