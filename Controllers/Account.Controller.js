import { AccountModel } from "../Models/Account.Models.js";

export async function creatAccount(req,res){
    try {
        const user=req.user;
        const account=await AccountModel.create({
            user :user_id,
        })

        return res.status(200).json({message :"Account created Sucessfully"},
            account
        )
    } catch (error) {
         return res.status(404).json({message :"Somthing Error Occerd"},
            error
        )
    }
}
export default creatAccount