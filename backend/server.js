const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const cors = require('cors');
const passport = require('./auth/passport');
const secretKey = require('./config').secretKey;

var app = express();
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
console.log(secretKey);
app.use(cookieParser(secretKey));
app.use(expressSession({
    secret:secretKey,
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());  
app.use(passport.session());

app.use('/api',require('./routes'));

app.listen(8080,()=>{
    console.log('application running on port 8080')
});