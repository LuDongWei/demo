var express = require('express');
var addressModel = require('./addressModel');
var addressApp = express();


var model = new addressModel();
 
addressApp.listen(8080); 

//查询
addressApp.get('/get/addressList', function(req, res) {
    
	model.getAddress(function(data) {
		res.jsonp({
			addressList : data
		})
	})

})



// addressApp.use('/get/addressList',[list1,list2])

// var aabb=null;

// function list1(req, res, next){
   
//    model.getAddress(function(data){
//        console.log(data)

//        next();
//    });
  
// }

// function list2(req, res, next){
  
//   console.log(123) 
//   console.log(aabb) 

//   res.jsonp({
// 		error: 'message'
//   })

//    next();
// }

// function closeLink(req, res, next){
//    model.closeAddress();  
//    next();
// }










