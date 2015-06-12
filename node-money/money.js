var express = require('express');
var money = express();

var MoneyModel = require('./moneyModel.js');

//注册用户
money.get('/user',function (req, res, next) {
  res.send('hello world');	
  console.log(1)
})

money.post('/user2',function (req, res, next) {
  console.log(2)
})

//登陆账号

//保存数据

//提取数据

//修改数据


money.listen(3000);