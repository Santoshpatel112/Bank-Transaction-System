import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRouter from './Routes/auth.Route.js'
dotenv.config();

import ConnectDb from './config/db.js';
const app=express();
const PORT=process.env.PORT ||3000;

// middleware
app.use(express.json());
app.use(cookieParser);

ConnectDb();
app.get('/',(req,res)=>{
    res.send("🌸Har Har Mahadev🌸");
})

// connectRoute

app.use("api/auth",authRouter)

app.listen(PORT,()=>{
    console.log(`Server is Listning on ${PORT}`);
})