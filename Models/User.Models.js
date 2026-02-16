import mongoose  from "mongoose";

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        emailRegex :/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    password :{
        type:String,
        required:true,
        max:[6,'Password must be length 6']
    }
},{timestamps:true})

export const UserModel=mongoose.model('User',UserSchema);