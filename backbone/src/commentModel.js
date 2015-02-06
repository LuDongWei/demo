// 单个
var  $ = require("jquery"),
     Backbone = require("backbone"),
     _ = require("underscore"); 

var phone = Backbone.Model.extend({
    defaults : {
       name : "",  //名字 
       phone : ""  //电话	  
    },
    validate : function(attrs,options){    //检验器
       var self = this;
       console.log(attrs)
       if(attrs.name == ""){
         return '用户名不能为空'
       }

    }
});

module.exports = phone;