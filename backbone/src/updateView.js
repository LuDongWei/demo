//更新
var  $ = require("jquery"),
     Backbone = require("backbone"),
     _ = require("underscore");

var utils = require("./utils.js");   

var updateView = Backbone.View.extend({
	template : _.template($('#phoneUpdate').html()),
	events : {
       'click #phoneUp' : 'phoneUp'
	},
    initialize : function(options){
		var self = this;

		self.render();
	},
	render : function(){
        var self = this;
        
            self.update2 = false;

            self.id = self.id || window.location.hash.split('/')[1];
        
        if(self.model.length != 0 ){
           showup(self.model);
        }else{
          self.model.getPhoneList(function(list){
               if(list.length == 0 ){
                 utils.error('无需要更新的数据'); 
               }else{ 
                 showup(list);
               }
          })
        }

        function showup(models){
           var model = models.get(self.id);	
           if(model){
           	 
           	 self.update2 = true;

             self.$el.html(self.template(model.toJSON()));
           }else{
             utils.error('找不到需要更新id'); 
           }
        }
        
        return this; 
	},
	phoneUp : function(){
        var self = this;

        var name_ = $("#changeName").val(),
            phone_ = $("#changePhone").val();  
                
		self.model.updatePhone(self.id, name_,phone_,function(){
			 utils.success('修改成功',function(){
			 	   self.trigger('update');
			 })
		});         
	}
})

module.exports = updateView;    