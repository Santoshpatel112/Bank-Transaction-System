import mongoose, { mongo } from "mongoose";
import Ladgermodel from "./ledger.model";
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

AccountSchema.methods.getBalance =async function(){

    const balencedata= await Ladgermodel.aggregate([
        {$match :{account :this._id}},
        {$group :{
            _id:null,
            totalDabit :{
                $sum :{
                    $cond:[
                      {$eq :["#type","Debit"]},"$amount",
                      0
                    ]
                }
            },
              totalCredet :{
                $sum :{
                    $cond:[
                      {$eq :["#type","Credit"]},"$amount",
                      0
                    ]
                }
            }

        }}
    ])
}

export const AccountModel=mongoose.model("Account",AccountSchema);