import { UserModel } from "../Models/User.Models.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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
export default UserRegistration;