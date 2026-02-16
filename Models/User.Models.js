import mongoose  from "mongoose";

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

export const UserModel=mongoose.model('User',UserSchema);