import authmiddleware from "../middleware/auth.middleware";
import TransctionModel from '../Models/Transcition.models';
import Ladgermodel from "../Models/ledger.model";

import { AccountModel } from "../Models/Account.Models";




/*
1.Validate Request
2.Validate Idempotency key
3.check Account Status
4.Deriver  sender balence from ladger
5.create transction pending
6.create debit ladger entry
7.create credit ladger entry
8.marks transction completed
9.commit mongodb session
10.send Email notiofication
*/

async function createTransction(req,res){
    try {
        const {fromAccount,toAccount,amount,idemopotencyKey}=req.body
        if(!fromAccount || !toAccount || !amount ||!idemopotencyKey){
            return res.status().json({
                message :"fromAccount ,toAccount,amount,Idemopatincy is must be required"
            })
        }
       const fromuserAccount=await AccountModel.findOne({
        _id:fromAccount
       })

       const touserAccount=await AccountModel.findOne({
        _id:toAccount
       })
       if(!touserAccount || !fromuserAccount){
        return res.status(400).json({
            message :"Invalid toaccount or fromAccount"
        })
       }
    } catch (error) {
        
    }
}
export default createTransction;