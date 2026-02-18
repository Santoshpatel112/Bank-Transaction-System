import express from 'express'
import createTransction from "../Controllers/Transction.Controller"
import authmiddleware from '../middleware/auth.middleware';

const router=express.Router();

router.post("/",createTransction,authmiddleware)



export default router;