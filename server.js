import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

import ConnectDb from './config/db.js';
const app=express();
const PORT=process.env.PORT ||3000;

ConnectDb();
app.get('/',(req,res)=>{
    res.send("MahaShivratri Ki Hardik Subhkamanye | 🌸Har Har Mahadev🌸");
})

app.listen(PORT,()=>{
    console.log(`Server is Listning on ${PORT}`);
})