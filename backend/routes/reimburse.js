const router = require('express').Router();
const Expense = require('../db').Expense;
const ReimbursementStatus = require('../db').ReimbursementStatus;

router.post('/',async(req,res)=>{
    
    try{

        if(req.body && req.body.expenseId && req.body.statusId){
    
            let status =  await ReimbursementStatus.findOne({
                where:{
                    id:req.body.statusId
                }
            })
            
            if(!status){
                return res.status(404).json({
                    success:false,
                    message:"status id not found"
                })
            }
    
            let expense = await Expense.findOne({
                where:{
                    id:req.body.expenseId
                }
            })
    
            if(!expense){
                return res.status(404).json({
                    success:false,
                    message:"expense id not found"
                })
            }

            expense.ReimbursementStatusId=status.id
            await expense.save();
            
            return res.status(201).json({
                success:true,
                message:"Updated",
                body:{
                    expenseId:expense.id,
                    statusId:status.id
                }
            })
        }
        else{
            return res.status(400).json({
                success:false,
                message:"request body missing required parameters"
            })
        }
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Unsuccessful",
            data:"Error Found"
        })
    }
})

module.exports = router
