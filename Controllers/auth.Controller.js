import { UserModel } from "../Models/User.Models";
import bcrypt from 'bcrypt';
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
        const Exitinguser=await UserModel.find(email);
        if(Exitinguser){
             return res.json({message :'User Alreday Exit'},{sucess:false},{status:400})
        }
        const hashPassword= await bcrypt.hash(password,10);
        const User=UserModel.create({
            name,
            email,
            password :hashPassword
        })
     } catch (error) {
        
     }
}