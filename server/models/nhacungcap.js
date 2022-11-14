const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nhacungcapSchema = new Schema({
    tenncc: {
        type: String,
        required: true,
    },

    diachi: {
        type: String
    },

    sdt: {
        type: String
    },
    email:{
        type: String
    },
    id: {
        type: Number,
        required: true,
        unique: true
    }

})

module.exports = mongoose.model('nhacungcaps', nhacungcapSchema);