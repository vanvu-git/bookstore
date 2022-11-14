const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nhaxuatbanSchema = new Schema({
    tennxb: {
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

module.exports = mongoose.model('nhaxuatbans', nhaxuatbanSchema);