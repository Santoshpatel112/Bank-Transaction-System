import mongoose from "mongoose";

const TransctionSchema=new mongoose.Schema({
    // two account
    fromAccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"account",
        required:[true,'Transction must be associated with account'],
        index:true
    },
    toAccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"account",
        required:[true,'Transction must be associated with account'],
        index:true
    },
    status:{
        type:String,
        enum:{
            values:["Pending","Completed","Rejected","Reverse"],
            message:"Status can be Completed pending or Rejected"
        },
        default:"Pending"
    },
    ammount:{
        type:Number,
        required:[true,'Ammount is required for creating a Trnsction'],
        min:[0,"Ammount can't be Negative"]
    },
    IdempotencyKey:{
        type :String,
        required:[true,"Idempotency key is required for creating Transction"],
        index:true,
        unique:true
    }
},{timestamps:true})

const TransctionModel=mongoose.model("TransctionModel",TransctionSchema)