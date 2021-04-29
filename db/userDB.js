var connect = require('../config/conn');
var bcrypt  = require('bcrypt');


module.exports={
    register(user){
        return new Promise((resolve,reject)=>{
            connect.getConnection((err,connection)=>{
            if(err){
                reject(err);
            }
            else{
                            bcrypt.genSalt(10,(err,salt)=>{
                                if(err){
                                    reject(err);
                                }
                                else{
                                bcrypt.hash(user.password,salt,(err,hash)=>{
                                        if(err){
                                            reject(err);
                                        }
                                        else{
                                            user.password = hash;
                                        connection.query('insert into user set ?',user,(err,register)=>{
                                            if(err){
                                                reject(err);
                                            }
                                            else{
                                        resolve(register);
                                        }
                                        connection.release();
                                    });
                                    }
                                });
                                }
                            });
                        }
                        connection.release();
                });
        });
    },
    chkEmail(email){
    return new Promise((resolve,reject)=>{
        connect.getConnection((err,connection)=>{
                if(err){
                    reject(err);
                }
                else{
                connection.query('select password from user where email = ?',email,(err,data)=>{
                    if(err){
                        reject(err);
                    }
                    else if(data.length){
                        resolve(data[0]['password']);
                    }
                    else{
                        reject('user is not registerd');
                    }
                });
                }
                connection.release();
            });
        });
    },
    matchPass(password,encyPass){
    return new Promise((resolve,reject)=>{
        bcrypt.compare(password,encyPass,(err,match)=>{
            if(err){
                reject(err);
            }
            else if(match){
                resolve(match);
            }
            else{
                reject('incorrect username password');
            }
        });
    });
    },
    getUsers(){
    connect.getConnection((err,connection)=>{
        if(err){
            reject(err);
        }
        else{
            connection.query('select * from ??',user,(err,data)=>{
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
    }
    }