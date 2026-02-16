import express from 'express';
import UserRegistration from '../Controllers/auth.Controller.js'

const router=express.Router();

router.post("/register",UserRegistration)

export default router;