import { UserModel } from "../Models/User.Models";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
/* POST api/auth/register */
export async function UserRegistration(req,res){
     try {
        const {name ,email,password} =req.body()
        if(!name || !email ||!password){
            return res.json({message :'all field Required'},{
                sucess:false
            },{
                status:400
            }
            )
        }
        // check already exit
        const Exitinguser=await UserModel.findOne(email);
        if(Exitinguser){
             return res.json({message :'User Alreday Exit'},{sucess:false},{status:400})
        }
        const hashPassword= await bcrypt.hash(password,10);
        const User=UserModel.create({
            name,
            email,
            password :hashPassword
        })
        // in the token payload and JWT Secreate
        const token=jwt.sign({UserId:User_id},process.env.JWT_Secreat ,{expiresIn:"3d"});

        res.cookies("token",token);

        return res.status(201).json({message :"User Registration SucessFully"},{
            sucess:false
        },
        {
            _id:(await User)._id,
            email :User.email,
            name:User.name
        },{
            token:token
        }
    )
     } catch (error) {
        
     }
}