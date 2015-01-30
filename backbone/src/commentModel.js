var  $ = require("jquery"),
     Backbone = require("backbone"),
     _ = require("underscore"); 

var LISTURL = 'http://localhost:8080/address/13';    //查看所有电话
// var ADDURL = 'http://localhost:8080/post/address/name/phone';  //增加
// var DELETEEURL = 'http://localhost:8080/delete/address/id';  //删除
// var UPDATEURL = 'http://localhost:8080/patch/address/name/phone';   //更新

// var Ajax = function(url, data, callback) {
//           $.ajax({
//                type: "DELETE",
//                url: url,
//                dataType: "jsonp",
//                data: data,
//                success: function(json) {
//                     callback && callback(json);
//                }
//           })
//  }

//  $(function(){
//  	Ajax(LISTURL,{},function(aa){
//          console.log(aa)
//  	}) 
//  })

var phone = Backbone.Model.extend({
    defaults : {
       name : "",  //名字 
       phone : ""  //电话	  
    }
});

var phoneList = Backbone.Collection.extend({
	model : phone,
	url : 'http://localhost:8080/address'
})

// var models = [{
// 	id: 0,
// 	name: "121",
// 	phone: "566233"
// }, {
// 	id: 1,
// 	name: "4444",
// 	phone: "5555555",
// }, {
// 	id: 2,
// 	name: "123",
// 	phone: "123123"
// }];

// var phones = new phoneList(models)

// console.log(phones)


var newPhone = new phoneList();


//查询
// newPhone.fetch({
// 	success : function(Collection,resp){
// 		 console.log(Collection)
//          console.log(Collection.get(13))
//          console.log(Collection.get(13).get('name'))
// 	}
// })

//添加并查询
newPhone.create({
    name : '李某某',
    phone : '12356125'
},{
   success : function(Collection,resp){
        console.log(Collection.models)
   }
})


// var abc = new phone({
// 	id : 13,
// 	name : "合适的话是",
// 	phone : "12313212"
// });

// abc.destroy();

// abc.fetch({
// 	success : function(data){
// 		console.log(data)
// 		console.log(123)
// 	}
// });


