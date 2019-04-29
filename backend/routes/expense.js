var router = require('express').Router();
const ExpenseType = require('../db').ExpenseType;
const Expense = require('../db').Expense;
const ReimbursementStatus = require('../db').ReimbursementStatus;
const UserExpense = require('../db').UserExpense;
const User = require('../db').User;

router.get('/types',(req,res)=>{

    ExpenseType.findAll()
    .then(result=>{
        res.status(200).send(result);
    })
})

router.get('/all',(req,res)=>{

    Expense.findAll({
        include:[
            {model:ExpenseType},
            {model:ReimbursementStatus},
            {
                model:User
            }
        ]
    })
    .then(result=>{
        res.status(200).send(result);
    })
})

router.post('/',async (req,res)=>{

    try{

        let amountShare = req.body.amount/req.body.users.length

        let expenseType = await ExpenseType.findOne({
            where:{
                name:req.body.type
            }
        })

        if(expenseType.dataValues==null){
            return res.status(400).send("Error in expense Type")
        }
        let created = await Expense.create({
            date:req.body.date,
            description:req.body.description,
            totalAmount:req.body.amount,
            ExpenseTypeId:expenseType.dataValues.id,
            ReimbursementStatusId:1
        })

        if(created){
            
            req.body.users.forEach(async user => {
                let userId = await User.findAll({
                    where:{
                        email:user.email
                    }
                })
                if(userId==null){
                    return res.status(400).send("User not found Error");
                }
                userId = userId[0].dataValues.id
                
                let userExpenseCreated = await UserExpense.create({
                    ExpenseId:created.dataValues.id,
                    UserId:userId
                })
                
            });
            res.status(200).send({
                amountShare:amountShare
            });
        }
        else{
            return res.status(400).send("Error creating Expense")
        }
    }
    catch(e){
        console.log(e);
    }

})




module.exports = router
