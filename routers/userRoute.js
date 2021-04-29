var express     = require('express');
var userDB      = require('../db/userDB');

var router = express.Router();

router.get('/getData',(req,res)=>{
   userDB.getUsers().then((data)=>{
        res.json({udata:data});
   }).catch((err)=>{
        res.json({error:err});
   });
});

router.post('/register',(req,res)=>{
 userDB.register(req.body).then((data)=>{
     res.json({udata:data,msg:'user registered'});
 })
 .catch((err)=>{
      res.json({error:err});
 });

});

router.post('/login',(req,res)=>{
    userDB.chkEmail((req.body.email)).then((data)=>{
         console.log(req.body.email,data);
         return userDB.matchPass(req.body.password,data)
    })
    .then((match)=>{
         res.json({mtch:match});
    })
    .catch((err)=>{
        res.json({error:err});
    })
});


module.exports = router; 