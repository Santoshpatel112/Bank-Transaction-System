import mongoose, { mongo } from "mongoose";

const AccountSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"Acccout  musst with Associated  with User"],
        index:true
    },
    status:{
        type :String,
        enum:{
            values:["Active","Frozen","Closed"],
            defalut:"Active",
            message :"Status can be Eigther Active Frozen or Closed"
        },
        type:String
    },
    currency:{
        type:String,
        required:[true,"Currency is Required for crreating an account"],
        default :"INR"
    },

},{timestamps:true})

AccountSchema.index({user:1,status:1});

export const AccountModel=mongoose.models("Account",AccountSchema);