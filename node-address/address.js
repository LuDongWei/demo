var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var url = require('url');
var addressModel = require('./addressModel');
var addressApp = express();
var router = express.Router();

addressApp.use(cors());
addressApp.use(bodyParser());

var model = new addressModel(); 

// router.param('address_id',function(req,res,next,id){
// 	req.address = {
// 		id : id ,
// 		name : 'Tj'
// 	}
//     next();
// })

router.route('/*')
.all(function(req,res,next){
    console.log(req.method)
    next();
})
.get(function(req,res,next){     //查询
	if (req.method === "GET") {
        model.getAddress(function(data) { 
		  res.jsonp(data)
	    })
	}else{
        next(); 
	}
}) 
.post(function(req,res,next){     //增加
    if (req.method === "POST") {
    	
	    var name = req.body.name,
			phone = req.body.phone;

		model.addAddress(name, phone, function(data) {

			if (data) {
				res.jsonp(data)
			}

		})
	}else{
	    next(); 	
	} 
})
.put(function(req,res,next){      //更新
	 if (req.method === "PUT") {
		var pathname = req.params['0'],
			name = pathname.split("/")[0],
			phone = pathname.split("/")[1],
			id = pathname.split("/")[2];

		model.updaAddress(name, phone, id, function(data) {

			if (data) {
				res.jsonp(data)
			}
		})
	 }else{
        next(); 		
	 }  
 
})
.delete(function(req,res,next){    //删除

	if (req.method === "DELETE") {
		var id = req.params['0'];
 
		model.deleteAddress(id, function(data) {

			if (data) {
				res.jsonp(data)
			}
		})
	}else{
	  	res.jsonp({
	  		return: false
	  	})
	}

});


addressApp.use('/address', router);
addressApp.listen(8080); 





