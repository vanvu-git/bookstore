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
    }

})

module.exports = mongoose.model('nhacungcaps', nhacungcapSchema);