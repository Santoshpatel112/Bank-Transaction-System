import { UserModel } from "../Models/User.Models.js";
import jwt from 'jsonwebtoken'

async function authmiddleware(req,res,next){
    const token =req.cookies.token || req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(404).json({message :"UnAuthorized Acess | token is missing"});
    }

        try {
            const decoded=jwt.verify(token,process.env.JWT_Secreat)
            const user= await UserModel.findById(decoded.UserId);   
            req.user=user;
            return next();
        } 
        catch(error){
            return res.status(404).json({message :"UnAuthorized Acess | token is Invalid"})
        }   
    }

    export default authmiddleware;