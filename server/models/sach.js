const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({

    nhaxuatban: {
        type: Schema.Types.ObjectId,
        ref: 'nhaxuatbans'
    },

    tacgia: {
        type: Schema.Types.ObjectId,
        ref: 'tacgias'
    },

    theloai: {
        type: Schema.Types.ObjectId,
        ref: 'theloais'
    },

    tensach:{
        type: String,
        required: true,
        unique: true
    },

    soluong: {
        type: Number,
        required: true,
        default: 0
    },

    dongia: {
        type: Number,
        required: true,
        default: 0
    },

    hinhanh: {
        type: String,
        default: 'https://timeoutcomputers.com.au/wp-content/uploads/2016/12/noimage.jpg'
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('sachs', BookSchema);