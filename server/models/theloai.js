const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const theloaiSchema = new Schema({
    tentl: {
        type: String,
        required: true,
        unique: true
    }

})

module.exports = mongoose.model('theloais', theloaiSchema );