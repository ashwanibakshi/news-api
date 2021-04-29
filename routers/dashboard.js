var express     = require('express');
var dashDB      = require('../db/dashDB');

var router  = express.Router();

router.get('/newsArticles/:id',(req,res)=>{
 dashDB.getAllMyPost(req.params.id)
 .then((data)=>res.json({msg:'user all post',news:data}))
 .catch((err)=>{
     res.json({error:err})
     })
});

router.post('/addNewsArticle',(req,res)=>{
   dashDB.addMyPost(req.body)
   .then((data)=>res.json({msg:'data added'}))
   .catch((err)=>{
        res.json({error:err});
   })
});

router.get('/deleteNewsArticle/:id/:uid',(req,res)=>{
 dashDB.delMyPost(req.params.id,req.params.uid)
 .then((data)=>{
    res.json({da:data});
 })
 .catch((err)=>{
   res.json({error:err});
 })
});

router.get('/editNewsArticle/:id/:uid',(req,res)=>{
 dashDB.editMyPost(req.params.id,req.params.uid)
 .then((data)=>{
     res.json({da:data});
 })
 .catch((err)=>{
      res.json({error:err});
 })
});

//update

router.post('/editNewsArticle',(req,res)=>{
  dashDB.updateMyPost(req.body)
  .then((data)=>{
      res.json({da:data})
  })
  .catch((err)=>{
    res.json({error:err})
  })
});

router.get('/draft/:sid/:uid',(req,res)=>{
   dashDB.getSaveDraft(req.params.sid,req.params.uid)
   .then((data)=>{
     res.json({da:data});
   })
   .catch((err)=>{
      res.json({error:err});
   })
});

router.post('/draft',(req,res)=>{
   dashDB.saveDraft(req.body)
   .then((data)=>{
   res.json({da:data});
   })
   .catch((err)=>{
       res.json({error:err});
   })
});

router.get('/profile/:id',(req,res)=>{
   dashDB.getProfile(req.params.id)
   .then((data)=>{
     res.json({da:data})
   })
   .catch((err)=>{
      res.json({error:err});
   })  
});

router.post('/profile',(req,res)=>{
  dashDB.updateProfile(req.body)
  .then((data)=>{
     res.json({da:data});
  })
  .catch((err)=>{
    res.json({error:err});
  })
});

//---------------------- user route end here -------------------------//

//---------------------- admin route start --------------------------//
router.get('/showAllNewsArticles',(req,res)=>{
 dashDB.showAllPost()
 .then((data)=>{
     res.json({da:data});
 })
 .catch((err)=>{
      res.json({error:err});
 })
});

router.get('/showAllUser',(req,res)=>{
  dashDB.showAllUser()
  .then((data)=>{
  res.json({da:data})
  })
  .catch((err)=>{
     res.json({error:err}); 
  })
});

router.get('/blockUser/:id',(req,res)=>{
 dashDB.blockUser(req.params.id)
 .then((data)=>{
     res.json({da:data});
 })
.catch((err)=>{
    res.json({error:err});
 })
});

router.get('/verifyNewsArticle/:id/:uid',(req,res)=>{
   var stats ='verified';
   stats = stats.replace(/'/g,'');
 dashDB.verifyPost(req.params.id,req.params.uid,stats)
 .then((data)=>{
   res.json({da:data});
 })
 .catch((err)=>{
     res.json({error:err});
 })
});

module.exports=router;