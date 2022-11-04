require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const tacgiaRouter = require('./routes/tacgia');
const theloaiRouter = require('./routes/theloai');
const nhaxuatbanRouter = require('./routes/nhaxuatban');
const nhacungcapRouter = require('./routes/nhacungcap');
const sachRouter = require('./routes/sach');
const phieunhapRouter = require('./routes/phieunhap');
const hoaDonRouter = require('./routes/hoadon');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const connectDB = async () => {
    try{
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@book-store.dpa4eks.mongodb.net/?retryWrites=true&w=majority`,{     
            useNewUrlParser: true,
            useUnifiedTopology: true,       
        });
        console.log('mongodb connected');
    }catch(error){
        console.log(error.message)
        process.exit(1)
    }
}

connectDB();
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use('/api/auth', authRouter);
app.use('/api/tacgia', tacgiaRouter);
app.use('/api/theloai', theloaiRouter);
app.use('/api/nhaxuatban', nhaxuatbanRouter);
app.use('/api/nhacungcap', nhacungcapRouter);
app.use('/api/sach', sachRouter);
app.use('/api/hoadon', hoaDonRouter);
app.use('/api/phieunhap', phieunhapRouter);
const port = 6010;

app.listen(port, () => console.log(`server started on port ${port}`));


