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

      /* Validate IdemopotencyKey*/ 

      const isexitingTransction=await TransctionModel.findOne({
        idemopotencyKey :idemopotencyKey
      })

      if(isexitingTransction){
        if(isexitingTransction.status==="Completed"){
            return res.status(400).json({
                message :"Transction alreday Procesed",
                transction :isexitingTransction
            })
        }

        if(isexitingTransction.status==="Pending"){
            return res.status(400).json({
                message :"Transction is still processing",
            })
        }

        if(isexitingTransction.status==="Failed"){
            return res.status(400).json({
                message :"Transction Failed",
                transction :isexitingTransction
            })
        }


        if(isexitingTransction.status==="Reverse"){
            return res.status(400).json({
                message :"Transction is Reversed Please Try Again ",
                transction :isexitingTransction
            })
        }
      }

      /*3. check account status*/

      if(touserAccount.status !=="Active" || fromuserAccount.status !=="Active"){
        return res.status(400).json({
            message :"Both account must be Active"
        })
      }

      /*4.Drive sender balence from ledger */

    const balence =await fromuserAccount.getBalance();
    if(balence<amount){
        return res.status(400).json({
            message :`Inficient Balence  avilable amount is ${balence} but requested amount is ${amount} `
        })
    }

    /*5. Create Transcition Pending */


    
    } catch (error) {
        
    }
}
export default createTransction;