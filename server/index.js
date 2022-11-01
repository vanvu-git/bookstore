const express = require('express');
const mongoose = require('mongoose');
const app = express();

const connectDB = async () => {
    try{
        await mongoose.connect(`mongodb+srv://opensource:opensource@book-store.dpa4eks.mongodb.net/?retryWrites=true&w=majority`,{
           
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
app.get('/', (req,res) => res.send('hoee'));


const port = 6000;

app.listen(port,() => console.log(`Server started on port ${port}`));