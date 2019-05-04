const router = require('express').Router();
const passport = require('../auth/passport');
const AuthToken = require('../db').AuthToken;
const uid2 = require('uid2');

router.post('/login',passport.authenticate('local'), async (req,res)=>{
    
    try{
        if(!req.user)
            return res.status(500).json({
                success:false,
                message:"Unauthorized User!"
            });
        
        let newToken = await AuthToken.create({
                UserId:req.user.id,
                token:uid2(20)
            })
        
        console.log(newToken);
        if(!newToken)
            return res.status(400).json({
                success:false,
                message:"Login Unsuccessful"
            })
            
        return res.status(200).json({
            success:true,
            message:"Login successful",
            data:{
                token:newToken.token
            }
        })            
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Login Unsuccessful",
            data:"Error Found"
        })
    }
});

router.use('/expense',require('./expense.js'))

router.use(passport.authenticate('bearer'));
router.use('/reimburse',require('./reimburse'));

module.exports = router
