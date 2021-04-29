var con  = require('../config/conn');

module.exports ={
   index(){
     return new Promise((resolve,reject)=>{
       con.getConnection((err,connection)=>{
          if(err){
              reject(err);
          }
          else{
              var status = "verified";
              connection.query('select * from news where status=?',(status),(err,data)=>{
                 if(err){
                     reject(err);
                 }
                 else{
                     resolve(data);
                 }
              });
          }
          connection.release();
       });
     });
   },
   singlePage(slug){
     return new Promise((resolve,reject)=>{
        con.getConnection((err,connection)=>{
           if(err){
             reject(err);
           }
           else{
        connection.query('select * from news where slug=?',[slug],(err,data)=>{
                if(err){
                  reject(err);
                }
                else{
                   resolve(data);
                }
            });
           }
           connection.release();
        });
     });
   },
   showByCategory(cate,stats,page,pageSize){
     stats = stats.replace(/'/g,'');
   return new Promise((resolve,reject)=>{
        con.getConnection((err,connection)=>{
           if(err){
             reject(err);
           }
           else{
             let ofset = (page-1)*pageSize;
           connection.query('select * from news where category=? and status=? limit ? offset ?',[cate,stats,pageSize,ofset],(err,data)=>{
             if(err){  
               reject(err);
             }
             else{
               resolve(data);
             }
           });
           }
           connection.release();
        });
    });    
   }
}