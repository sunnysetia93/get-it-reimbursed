var Sequelize = require('sequelize')

var db = new Sequelize('expense_split','root','setia93',{
host:'localhost',
dialect:'mysql',
pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const User = db.define('Users',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:Sequelize.STRING,
    email:Sequelize.STRING,
    typeOfUser:Sequelize.STRING,
    password:Sequelize.STRING
})

const ExpenseType = db.define('ExpenseType',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:Sequelize.STRING
})

const ReimbursementStatus = db.define('ReimbursementStatus',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:Sequelize.STRING
})

const Expense = db.define('Expenses',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    date:Sequelize.STRING,
    description:Sequelize.STRING,
    totalAmount:Sequelize.INTEGER,
})

UserExpense = db.define('UserExpense', {
  });

ReimbursementStatus.hasMany(Expense)
Expense.belongsTo(ReimbursementStatus)

ExpenseType.hasMany(Expense)
Expense.belongsTo(ExpenseType)

Expense.belongsToMany(User, {
    through: UserExpense
});

User.belongsToMany(Expense, {
    through: UserExpense
});

function seed(){
    User.findOrCreate({
        where:{
            id:1,
            name:'sunny-admin',
            email:'sunnysetia93@gmail.com',
            typeOfUser:'admin',
            password:'sunny1234',
        }
    })
    User.findOrCreate({
        where:{
            id:2,
            name:'Sam',
            email:'sam@ggmail.com',
            typeOfUser:'regular',
            password:'sunny1234',
        }
    })
    User.findOrCreate({
        where:{
            id:3,
            name:'Harvey',
            email:'harvey@ggmail.com',
            typeOfUser:'regular',
            password:'sunny1234',
        }
    })

    ExpenseType.findOrCreate({
        where:{
            id:1,
            name:'Food'
        }
    })
    ExpenseType.findOrCreate({
        where:{
            id:2,
            name:'Travel'
        }
    })
    ExpenseType.findOrCreate({
        where:{
            id:3,
            name:'Accomodation'
        }
    })
    ExpenseType.findOrCreate({
        where:{
            id:4,
            name:'Repair'
        }
    })

    ReimbursementStatus.findOrCreate({
        where:{
            id:1,
            name:'Overdue'
        }
    })
    ReimbursementStatus.findOrCreate({
        where:{
            id:2,
            name:'Paid'
        }
    })
    ReimbursementStatus.findOrCreate({
        where:{
            id:3,
            name:'Approved'
        }
    })
    ReimbursementStatus.findOrCreate({
        where:{
            id:4,
            name:'Rejected'
        }
    })
}

async function dbRefresh(){
    try{
        await db.authenticate();
        await db.sync({force:false})
        await seed();
    }
    catch(err){
        console.log(err);
    }
}

dbRefresh()

module.exports = {
    User,Expense,ExpenseType,ReimbursementStatus,UserExpense
}