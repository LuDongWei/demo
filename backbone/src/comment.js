//通讯录
var  $ = window.jQuery = window.$ = require("jquery"),
     Backbone = require("backbone"),
     _ = require("underscore");
     require("bootstrap"); 

var  CommentModel = require("./commentModel.js"),
     CommentView = require("./commentView.js"),
     EmptyView = require("./emptyView.js");  


var  commentModel = new CommentModel();

     // emptyView = new EmptyView();

var  appComment = Backbone.Router.extend({
	 routes : {
	 	'' : 'index',
        'add' : 'add',
        'delete/:id' : 'delete',
        'update/:id' : 'update' 
	 },
	 initialize : function(){
        var self = this;
        
        self.container = $("#comment-page");


	 },
	 index : function(){
        var self = this;
 
        if(!commentModel.isPhonelist){
            commentModel.getPhoneList(function(phoneList){
               if (phoneList.length) {
                  //有电话
                  var commentView = new CommentView({
                  	  model : phoneList
                  });
                  
                  self.container.empty().append(commentView.el); 
               }else{
                  //为空
                  var emptyView = new EmptyView(); 

               };
            })
        }
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







   