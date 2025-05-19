import express from 'express'
import { PORT ,mongoDBURL} from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js'
import cors from 'cors';
const app=express();
app.use(express.json());
// app.use(
//     cors({
//         origin:"http://localhost:3000",
//         methods:["GET","POST","PUT","DELETE"],
//         allowedHeaders:['Content-Type']
//     })
// )
app.use(cors());
app.get('/',(req,res)=>{
    return res.status(234).send("Welcome to Book Store");
})
app.use('/books',booksRoute);
mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log('App Connected to database');
        app.listen(PORT,()=>{
            console.log(`App is listening to port ${PORT}`);
        });
    })
    .catch((error)=>{
        console.log(error);
    })