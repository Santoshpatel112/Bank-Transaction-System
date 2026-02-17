import { UserModel } from "../Models/User.Models.js";
import jwt from 'jsonwebtoken';
import { sendRegisterEmail } from '../services/email.service.js';
/* POST api/auth/register */
export async function UserRegistration(req,res){
     try {
        const {name ,email,password} =req.body;
        if(!name || !email ||!password){
            return res.status(400).json({
                message :'all field Required',
                success:false
            });
        }
        // check already exit
        const Exitinguser=await UserModel.findOne({email});
        if(Exitinguser){
             return res.status(400).json({message :'User Already Exists',success:false})
        }
        // Password will be hashed by the pre-save hook in the model
        const User= await UserModel.create({
            name,
            email,
            password
        })
        // in the token payload and JWT Secreate
        const token=jwt.sign({UserId:User._id},process.env.JWT_Secreat ,{expiresIn:"3d"});

        res.cookie("token",token);

        // Send welcome email
        await sendRegisterEmail(User.email, User.name);

        return res.status(201).json({
            message :"User Registration Successfully",
            success:true,
            user: {
                _id:User._id,
                email :User.email,
                name:User.name
            },
            token:token
        });
     } catch (error) {
        return res.status(500).json({message: error.message, success:false});
     }
}



export async function UserLogin(req,res){
    try {
        const {email,password}=req.body;
        const user=await UserModel.findOne({email}).select("+password");
        if(!user){
            return res.status(401).json({message:"Email or Password Invalid", success:false});
        }
        const isvalidpassword=await user.comparePassword(password);
        if(!isvalidpassword){
            return res.status(401).json({message:"Wrong Password", success:false});
        }

        const token=jwt.sign({UserId:user._id},process.env.JWT_Secreat ,{expiresIn:"3d"});

        res.cookie("token",token);

        return res.status(200).json({
            message: "Login successful",
            success: true,
            user:{
                _id:user._id,
                email:user.email,
                name:user.name
            },
            token:token
        })
    } catch (error) {
        return res.status(500).json({message: error.message, success:false})
    }
}

export default {UserRegistration ,UserLogin};