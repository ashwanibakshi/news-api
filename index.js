var express         = require('express');
var bodyParser      = require('body-parser');
var http            = require('http');
var connect         = require('./config/conn');

var app =  express();

connect.getConnection((err,connection)=>{
   if(err){
       console.log('connection err',err);
   }
   else{
       console.log('connected to db');
   }
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/api/user',require('./routers/userRoute'));
app.use('/api/dash',require('./routers/dashboard'));
app.use('/api/news',require('./routers/newsRoutes'));

http.createServer(app).listen(3000,()=>console.log('server run at port '+3000));