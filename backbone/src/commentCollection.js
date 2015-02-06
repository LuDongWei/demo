// 集合
var  $ = require("jquery"),
     Backbone = require("backbone"),
     _ = require("underscore");

var phone = require("./commentModel.js")      

var phoneList = Backbone.Collection.extend({  
	model : phone,
	url : 'http://localhost:8080/address',
	initialize : function(){		
 		var self = this;
        
        //是否从服务器那边获取数据
        self.isPhonelist = false;

	},
    getPhoneList : function(callback){
        var self = this;
        self.fetch({
             success : function(Collection,resp){
                   self.isPhonelist = true;
                   callback(Collection);
             }
        })
  },
  addPhone : function(name_,phone_,callback){
     var self = this; 
     
      self.create({
        name: name_,
        phone: phone_
      }, {
        success: function() {
          callback();
        }
      })


      // self.add({
      //   name: name_,
      //   phone: phone_
      // }) 

      // console.log(self)
  },
  deletePhone :function(callback){
     var self = this;
  },
  updatePhone : function(callback){
     var self = this; 
  }
})

module.exports = phoneList;



// var LISTURL = 'http://localhost:8080/address/13';    //查看所有电话
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


// var newPhone = new phoneList();


// newPhone.bind('change',function(){
// 	 console.log(123)
// })


// newPhone.on('reset',function(){
// 	 newPhone.createAll();
// 	 newPhone.updateAll();
// 	 newPhone.deleteAll();
// })



//查询
// newPhone.fetch({
// 	success : function(Collection,resp){
// 		 console.log(Collection)
// 		 // newPhone.add({
// 		 // 	 name: "123",
// 	  //        phone: "123123"
// 		 // });

// 		 // newPhone.shift();

// 		 // //newPhone.createAll();  
// 		 // newPhone.deleteAll();
// 	}
// })

// setTimeout(function(){
//    console.log(newPhone.getIds())
//    //newPhone.trigge('reset') 
// },1000)




// newPhone.create({
// 	 	success : function(Collection,resp){
// 		 console.log(Collection)
// 	}
// })


//添加并查询
// newPhone.create({
//     name : '李某某56565ls8',
//     phone : '1215412334'
// },{
//    success : function(Collection,resp){
//    	    // console.log(Collection)
//    	    // console.log(resp)
//    	    console.log(newPhone.models)
//    }
// })


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


