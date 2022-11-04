require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const tacgiaRouter = require('./routes/tacgia');
const theloaiRouter = require('./routes/theloai');
const nhaxuatbanRouter = require('./routes/nhaxuatban');
const nhacungcapRouter = require('./routes/nhacungcap');
const sachRouter = require('./routes/sach');
<<<<<<< HEAD
const thongtintaikhoanRouter = require('./routes/thongtintaikhoan');
const hoadonRouter = require('./routes/hoadon');
=======
>>>>>>> 06203277180857fef07684dd616c86fb77620c65
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
<<<<<<< HEAD
app.use('/api/thongtintaikhoan', thongtintaikhoanRouter);
app.use('/api/hoadon', hoadonRouter);
=======
>>>>>>> 06203277180857fef07684dd616c86fb77620c65
const port = 6010;

app.listen(port, () => console.log(`server started on port ${port}`));


