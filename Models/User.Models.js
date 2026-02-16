import mongoose  from "mongoose";
import bcrypt, { hash } from 'bcrypt'
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required for Creating an account'],

    },
    email:{
        type:String,
        trim:true,
        lowecase:true,
        required:[true,'Email is required for Creating an Account'],
        emailRegex :[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Invalid Email Address'
        ],
        unique:[true,'Email Already Exits']
    },
    password :{
        type:String,
        required:[true,'Password is required for Creating an Account'],
        minlength:[6,'Password Should be Contain 6 Character'],
        select:false
    }
},{timestamps:true})


UserSchema.pre("save",async function(next){
    if(!this.isModified("password")){
            return next()
    }
    const hashpassword=await bcrypt.hash(this.password,10)
    this.password=hashpassword
   return next()
})

UserSchema.methods.comparePassword=async  function(password){
    return await bcrypt.compare(password,this.password);
}
export const UserModel=mongoose.model('User',UserSchema);