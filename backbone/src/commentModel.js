// 单个
var  $ = require("jquery"),
     Backbone = require("backbone"),
     _ = require("underscore"); 

var phone = Backbone.Model.extend({
    urlRoot :'http://localhost:8080/address',
    defaults : {
       name : "",  //名字 
       phone : ""  //电话	  
    },
    validate : function(attrs,options){    //检验器
       var self = this;

       if(attrs.name == ""){
         return '用户名不能为空'
       }
       
       if(attrs.phone == "") {
         return '电话不能为空'
       }
    
       if(!/^[0-9]*$/.test(attrs.phone)){
         return '电话为数字组成'
       } 

    },
    parse : function(response,abc){
        var self = this;

        console.log(response)
        console.log(abc)

        var newPhone = {
            cid : self.cid,
            id : response.id,
            name : response.name,
            phone : response.phone
        }

        return newPhone

    }
});

module.exports = phone;