const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const User = require('../db').User;
const AuthToken = require('../db').AuthToken;

passport.serializeUser(function(user,done){
    done(null,user.id);
});

passport.deserializeUser(function(userKey,done){
    User.findByPk(userKey).then((user)=>
    {
        done(null,user);
    }).catch((err)=>
    {
        done(err);
    });
});

passport.use(new LocalStrategy(function(email,password,done){
    User.findOne(
        {
            where:{
                email:email,
                password:password
            }
        }).then((user)=>
        {
            if(!user)
            {
                return done(null,false,{message:'Email or Password didn\'t match'});
            }
            else if(user.typeOfUser!="admin"){
                return done(null,false,{message:'User is not authorized to access this page !'});
            }

            return done(null,user);
        }).catch((err)=>{
            return done(err);
        })
}));

passport.use(new BearerStrategy(function(token,done)
{   
    console.log(token)
    AuthToken.findOne({
        where:{
            token:token
        },
        include:[User]
    }).then((token)=>
    {
        if(!token)
            return done(null,false,{message:'No such Token found'});

        done(null,token.User);
    }).catch((err)=>{
        return done(err);
    })
}))

module.exports = passport;