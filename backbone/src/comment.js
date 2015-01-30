//通讯录
var  $ = window.jQuery = window.$ = require("jquery"),
     Backbone = require("backbone"),
     _ = require("underscore");
     require("bootstrap"); 

var  commentModel = require("./commentModel.js"),
     commentView = require("./commentView.js");  
     
var  appComment = Backbone.Router.extend({
	 routes : {
	 	'' : 'index',
        'add' : 'add',
        'delete/:id' : 'delete',
        'update/:id' : 'update' 
	 },
	 index : function(){
         console.log(1)
	 },
	 add : function(){
         console.log(2)
	 },
	 delete : function(id){
         console.log(id)
	 },
	 update : function(id){
         console.log(id)
	 }  
}) 


var commentRouter = new appComment();
Backbone.history.start();







   