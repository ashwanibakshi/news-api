var express = require('express');
var newsDB  = require('../db/newsDB');

var router = express.Router();

router.get('/index',(req,res)=>{
    newsDB.index()
    .then((data)=>{
        res.json({da:data});
    })
    .catch((err)=>{
        res.json({error:err});
    })
});

router.get('/:slug',(req,res)=>{
  newsDB.singlePage(req.params.slug)
  .then((data)=>{
      res.json({da:data});
  })
  .catch((err)=>{
    res.json({error:err});
  })
});

router.get('/category/:categ',(req,res)=>{
   let page = 1;
   let pageSize = 5;
  if(req.query.page){
    page = req.query.page;
  }
  newsDB.showByCategory(req.params.categ,'verified',page,pageSize)
  .then((data)=>{
     res.json({da:data});
  })
  .catch((err)=>{
    res.json({error:err});
  })
});

module.exports = router;