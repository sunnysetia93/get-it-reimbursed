var express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors')

var app = express();
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

var api = require('./routes')
app.use('/api',api);

app.listen(8080,()=>{
    console.log('application running on port 8080')
});