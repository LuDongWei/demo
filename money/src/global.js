//通用库
define(function(require, exports, module){
    
    var $ = require("jquery");

    var global = {
        
        ajax_get : function(url,data,callback){
             $.ajax({
               type : 'get',
               url : url,
               dataType : 'jsonp',
               jsonp : 'jsoncallback',
               data : data,
               success : function(json){
                  callback && callback(json);
               }	
             }) 
        },  

        ajax_post : function(url,data,callback){
        	 console.log($)
             $.ajax({
               type : 'post',
               url : url,
               dataType : 'jsonp',
               jsonp : 'jsoncallback',
               data : data,
               success : function(json){
                  callback && callback(json);
               }	
             }) 
        }  
    
    } 

    module.exports = global;
})