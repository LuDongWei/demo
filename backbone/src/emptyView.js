//为空的时候
var  $ = require("jquery"),
     Backbone = require("backbone"),
     _ = require("underscore");

var emptyView = Backbone.View.extend({
    template : _.template($('#nonePhoneList').html()),
	events : {
      'click #addPhone' : 'addPhone'
	},
	initialize : function(){
		var self = this;

		self.render();
	},
	render : function(){
        var self = this;

        self.$el.html(this.template());

        return this; 
	},
	addPhone : function(event){
		var self= this;
        
        self.trigger('addphone');  
	}
})

module.exports = emptyView;