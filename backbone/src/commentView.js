//列表
var  $ = require("jquery"),
     Backbone = require("backbone"),
     _ = require("underscore");

var commentView = Backbone.View.extend({
	template: _.template($('#phoneList').html()),
	events : {
	    'click #addPhone' : 'addPhone',
	    'click #updatePhone' : 'updatePhone',
	    'click #deletePhone' : 'deletePhone',
	    'click .phone-list li' : 'clickPhone'
	},
	initialize : function(){
		var self = this;
        
  		self.render(); 
	},
	render : function(){
        var self = this;

        self.$el.html(this.template(this.model.toJSON()));

        return this;
	},
	addPhone : function(event){
        var self= this;
        
        self.trigger('addphone');  
	},
	updatePhone : function(event){
        console.log(2) 
	},
	deletePhone : function(event){
        console.log(3)
	},
	clickPhone : function(event){
		$(event.currentTarget).parent().find("li").removeClass('active'); 
        $(event.currentTarget).addClass('active');

		// $(this).addClass('active');
		// console.log($(this).html())
	}
})

module.exports = commentView;