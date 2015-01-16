var $ = require("jquery"),
    Events = require("anima-events");

var view = function(options){
    var self = this;
    Events.mixTo(self);      
    
	  self.types = ["province", "city", "district"];
    
    self.defaultText = {
         "province" : "请选择省份...",
         "city" : "请选择城市...",
         "district" : "请选择县区..."  
    }
    
    self.opt = options;
} 


view.prototype.init = function(){    
    var self = this;
    
    self.dom = $("<div class='rg-selects'></div>");

    for (var i = 0; i < self.types.length; i++) {
      	
      var html = '<select class="rg-item rg-'+self.types[i]+'" data-type="'+self.types[i]+'" >'+
	               '<option>'+self.defaultText[self.types[i]]+'</option>'+
                 '</select>';
      
      self.dom.append(html); 
    };
      

    self.dom.on("change","select",function(){
    	   var val = $(this).val().split("|");

         var item = {
             parentId : val[0],
             postCode : val[1],
             name : val[2],
             type : val[3]
         }
         
         self.trigger("selected",item); 
    })
   
    $(self.opt.target).html(self.dom);
}

view.prototype.reset = function(resetClass){
     var self = this;
     
     for (var i = 0; i < resetClass.length; i++) {
         var html = '<option>'+self.defaultText[resetClass[i]]+'</option>';
         
         $(".rg-"+resetClass[i]).html(html); 
         
     };
}

view.prototype.render = function(type,simpleList){
    var self = this;
    var html = '';

    for (var i = 0; i < simpleList.length; i++) {
         html = html + '<option '+( simpleList[i].selected ? 'selected' : '' ) +'  value="'+simpleList[i].parentId+'|'+simpleList[i].postCode+'|'+simpleList[i].name+'|'+type+'">'+simpleList[i].name+'</option>'
    };
  
    
    $(".rg-"+type).append(html)
}

module.exports = view;