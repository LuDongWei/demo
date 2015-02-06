//添加
var  $ = require("jquery"),
     Backbone = require("backbone"),
     _ = require("underscore");

var utils = require("./utils.js");     

var addView = Backbone.View.extend({
	template : _.template($('#phoneAdd').html()),
	events : {
       'click #phoneSave' : 'phoneSave'
	},
    initialize : function(options){
		var self = this;
		self.render();
	},
	render : function(){
        var self = this;

        self.$el.html(this.template());

        return this; 
	},
	phoneSave : function(){
        var self = this;

        var name_ = $("#inputName").val(),
            phone_ = $("#inputPhone").val();
                
		self.model.addPhone(name_,phone_,function(){
			 utils.success('保存成功',function(){
			 	   self.trigger('addphone');
			 })
		});         
	}
})

module.exports = addView;     