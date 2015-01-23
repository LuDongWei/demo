//通讯录
var  $ = require("jquery"),
     Backbone = require("backbone"),
     _ = require("underscore"); 

var LISTURL = 'http://localhost:8080/get/addressList';

var Ajax = function(url, data, callback) {
          $.ajax({
               type: "get",
               url: url,
               dataType: "jsonp",
               data: data,
               success: function(json) {
                    callback && callback(json);
               }
          })
 }

 $(function(){
 	Ajax(LISTURL,{},function(aa){
         console.log(aa)
 	}) 
 })
   