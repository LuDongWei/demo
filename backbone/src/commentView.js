//列表
var  $ = require("jquery"),
     Backbone = require("backbone"),
     _ = require("underscore");

var utils = require("./utils.js");         

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
        
        self.selected = null;

  		self.render(); 
	},
	render : function(){
        var self = this;
  
        var phone = { 'phone' : self.model.toJSON()};

        self.$el.html(this.template(phone));

        return this;
	},
	addPhone : function(event){
        var self= this;
        
        self.trigger('addphone');  
	},
	updatePhone : function(event){
		var self = this;
        
        if(self.selected){
           self.trigger('updatePhone',self.selected);     
        }else{
           utils.error('请选中需要更新的号码');
        }

	},
	deletePhone : function(event){
        var self = this;
       
        if(self.selected){
           self.model.deletePhone(self.selected,function(){
           	    self.$el.find(".active").remove(); 
           })           
        }else{
           utils.error('请选中需要删除的号码');
        }

	},
	clickPhone : function(event){
		var self = this;

		$(event.currentTarget).parent().find("li").removeClass('active'); 
        $(event.currentTarget).addClass('active');
        
        self.selected = $(event.currentTarget).data('id');
	}
})

module.exports = commentView;