var $ = require("jquery"),
    Events = require("anima-events");

var view = function(options){
    var self = this;
    Events.mixTo(self);      
    
	self.types = ["province", "city", "district"];
	self.first = ['请选择省份...', '请选择城市...', '请选择县区...'];
    
    self.opt = options;
} 



view.prototype.init = function(){    
    var self = this;
    
    self.dom = $("<div class='rg-selects'></div>");

    for (var i = 0; i < self.types.length; i++) {
      	
      var html = '<select class="rg-item rg-'+self.types[i]+'" data-type="'+self.types[i]+'" >'+
	             '<option>'+self.first[i]+'</option>'+
                 '</select>';
      
      self.dom.append(html); 
    };
      

    self.dom.on("change","select",function(){
    	 console.log($(this)) 
    })
   
    $(self.opt.target).html(self.dom);
}

view.prototype.render = function(type,simpleList){
    var self = this;

    

    console.log(type)
    console.log(simpleList)
}

module.exports = view;