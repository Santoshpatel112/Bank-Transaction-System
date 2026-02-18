import mongoose from "mongoose";

const LadgerSchema=new mongoose.Schema({
    account :{
        type:mongoose.model.Types.ObjectId,
        ref:"account",
        required:[true,"Ladger must asociated with the account"],
        index:true,
        immutable:true

    },
    amount:{
        type:Number,
        required:[true,"amount must asociated with the account"],
        immutable:true
    },
    transction :{
        type:mongoose.model.Types.ObjectId,
        ref:"transction",
        required:[true,"Ladger must asociated with the account"],
        index:true,
        immutable:true
    },
    type:{
        enum:{
            value:["Credit","Debit"],
            message:"Type can be either credited or debited"
        },
        required:[true,"Ledger type is required"],
        immutable:true
    }
})

function preventLedgerModification(next){
    throw new Error ("Ledger Entry are immutable and can not be modified or deleted");

}

LadgerSchema.pre('findOneAndUpdate',preventLedgerModification);
LadgerSchema.pre('updateOne',preventLedgerModification);
LadgerSchema.pre('deleteOne',preventLedgerModification);
LadgerSchema.pre('remove',preventLedgerModification);
LadgerSchema.pre('deleteMany',preventLedgerModification);
LadgerSchema.pre('findOneAndDelete',preventLedgerModification);
LadgerSchema.pre('findOneAndReplace',preventLedgerModification);



export const Ladgermodel=mongoose.model("LadgerModel",LadgerSchema);

export default Ladgermodel