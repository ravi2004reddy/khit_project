import express from 'express';
import bodyParser, { urlencoded } from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv, { parse } from 'dotenv';
import Rental from './Controller/Rental';
import Customer from './Controller/Customer';
import Admin from './Controller/Admin';
import path from 'path';
import cookieParser from 'cookie-parser';



dotenv.config();



const app = express();
app.use(express.json());
app.use(cors());
app.use(urlencoded({extended:true}));
app.use('/uploads',express.static(path.join(__dirname,'uploads')));
app.use(cookieParser());



const server = async() =>{
    try{
        const db = await mongoose.connect('mongodb://localhost:27017/house');

        if(db){
            console.log('Database connected');
        app.listen(process.env.PORT || 5000 , () => {
            console.log(`Server is running on port ${process.env.PORT || 5000}`);
        }   );
        }else{
            console.log('Database not connected');
        }

    }catch(error){
        console.log('Error in server:', error);
        process.exit(1);
    }
};


app.get('/h',(req,res)=>{
    res.send('Hello World');
});

app.use('/api/rental',Rental);
app.use('/api/customer',Customer);
app.use('/api/admin',Admin);

server();

