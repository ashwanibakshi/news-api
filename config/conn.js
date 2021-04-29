var mySql = require('mysql');

var con = mySql.createPool({
  host:'localhost',
  port:'3306',
  database:'udemo',
  user:'root',
  password:'root'
});

module.exports = con;