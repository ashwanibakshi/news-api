var con = require('../config/conn');

module.exports={

    getAllMyPost(id){
        return new Promise((resolve,reject)=>
        con.getConnection((err,connection)=>{
            if(err){
                reject(err);
            }
            connection.query('select * from news where uid =?',(id),(err,data)=>{
            if(err){
                reject(err);
            }
            else if(data.length){
                resolve(data);
            }
            });
            connection.release();
        })
        )} ,

    addMyPost(pdata){
        return new Promise((resolve,reject)=>{
        con.getConnection((err,connection)=>{
            if(err){
                reject(err);
            }
            else{
                pdata.uid = parseInt(pdata.uid);
        connection.query('insert into news set ?',(pdata),(err,data)=>{
                    if(err)
                    {
                        console.log('adpost',pdata);
                        reject(err);
                    }
                    else
                    {
                        resolve(data);  
                    }
            });
            }
            connection.release();
        });     
        });
    } ,

    delMyPost(id,uid){
        return new Promise((resolve,reject)=>{
        con.getConnection((err,connection)=>{
            if(err){
                reject(err);
            }
            else{
            connection.query('delete from news where id=? and uid=?',[id,uid],(err,data)=>{
            if(err){
                reject(err);
            }
            else if(data.affectedRows)
            {
                resolve('News Article Deleted');
            }
            else{
                reject('News Article Not Deleted');
            }
            });
            }
            connection.release();
        });
        });
    },
    
    editMyPost(id,uid){
        return new Promise((resolve,reject)=>{
        con.getConnection((err,connection)=>{
            if(err)
            {
                reject(err);
            }
            else{
            connection.query('select * from news where id=? and uid=?',[id,uid],(err,data)=>{
                if(err){
                    reject(err);
                }
                else if(data.length){
                    resolve(data);
                }
                else{
                    reject('No Data Found');
                }
            });
            }
            connection.release();
        });
        });
    },

    updateMyPost(pdata){
    return new Promise((resolve,reject)=>{
    con.getConnection((err,connection)=>{
        if(err){
        reject(err);
        }
        else{
        connection.query('update news set ? where id=? and uid=?',[pdata,pdata.id,pdata.uid],(err,data)=>{
            if(err)
            {
            reject(err);
            }
            else if(data.changedRows){
            resolve('News Article Updated');
            }
            else{
                reject('News Article Not Updated'); 
            }
        });
        }
        connection.release();
      });
     });    
    },

    saveDraft(pdata){
    return new Promise((reject,resolve)=>{
        con.getConnection((err,connection)=>{
            if(err){
                reject(err);
            }
            else{
        if(pdata.sid)
        {
            connection.query('update draft set ? where sid=?',[pdata,parseInt(pdata.sid)],(err,data)=>{
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(data);
            }
            });
        }
        else{
            connection.query('insert into draft set ?',[pdata],(err,data)=>{
                if(err)
                {
                reject(err);
                }
                else
                {
                    resolve(data);
                }
            });
          }
        }
        connection.release();
        });
      });
    },

    getSaveDraft(sid,uid){
        return new Promise((resolve,reject)=>{
            con.getConnection((err,connection)=>{
            if(err)
            {
                reject(err);
            }
            else
            {
            connection.query('select * from draft where sid=? and uid=?',[parseInt(sid),parseInt(uid)],(err,data)=>{
                if(err)
                {
                    reject(err);
                }
                else{
                    resolve(data)
                }
            });
            }
            connection.release();
            });
        });
    },
    getProfile(id){
        return new Promise((resolve,reject)=>{
            con.getConnection((err,connection)=>{
                if(err){
                    console.log(err);
                    reject(err);
                }
                else
                {
                connection.query('select * from user where id=?',[parseInt(id)],(err,data)=>{
                if(err)
                {
                    console.log(err);
                    reject(err);
                }
                else
                {
                    resolve(data);
                }

                });
                }
                connection.release();
            });
        });
    },

    updateProfile(data){
    return new Promise((resolve,reject)=>{
        con.getConnection((err,connection)=>{
        if(err)
        {
            reject(err);
        }
        else
        {
            connection.query('update user set ? where id=?',[data,data.id],(err,data)=>{
                if(err){
                    reject(err.sql);
                }
                else if(data.changedRows)
                {
                resolve('profile updated');
                }
                else {
                    reject('profile not updated');
                }
            });
        }
        connection.release(); 
            });
        });
    },

    showAllPost(){
        return new Promise((resolve,reject)=>{
        con.getConnection((err,connection)=>{
            if(err)
            {
            reject(err);
            }
            else
            {
        connection.query('select * from news',(err,data)=>{
            if(err){
                reject(err);
            }
            else
            {
                resolve(data);
            }
            });
            }
            connection.release();
           });
        });
    },

    showAllUser(){
        return new Promise((resolve,reject)=>{
        con.getConnection((err,connection)=>{
            if(err){
                reject(err);
            }
            else{
            connection.query('select * from user',(err,data)=>{
                if(err)
                {
                    reject(err);
                }
                else
                {
                    resolve(data);
                }
            });
            }
            connection.release();
        });
        });
    },

    blockUser(id){
    return new Promise((resolve,reject)=>{
        con.getConnection((err,connection)=>{
            if(err){
                reject(err);
            }
            else
            {
                let block = 'blocked'.replace(/'/g,'');
            connection.query('update from user set status=? where id=?',[block,parseInt(id)],(err,data)=>{
                if(err)
                {
                    reject(err);
                }
                else {
                    resolve(data);
                }
             });
            }
            connection.release();
        });
     });
    },

    verifyPost(id,uid,verify){
        return new Promise((resolve,reject)=>{
        con.getConnection((err,connection)=>{
            if(err)
            {
                reject(err);
            }
            else{
                let stats = verify.replace(/'/g,'');
                console.log(verify);
        connection.query('update news set status=? where uid=? and id=?',[stats.replace(/'/g,''), parseInt(uid),parseInt(id)],(err,data)=>{
                if(err)
                {
                    reject(err);
                }
                else
                {
                    resolve(data);
                }
            });
        }
        connection.release();
        });
      });
    }

    }