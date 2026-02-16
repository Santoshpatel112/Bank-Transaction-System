import express from 'express';
import { UserRegistration, UserLogin } from '../Controllers/auth.Controller.js';
const router=express.Router();

router.post("/register",UserRegistration)
router.post("/login",UserLogin)
export default router;