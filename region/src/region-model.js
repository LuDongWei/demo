var $ = require("jquery"),
    Events = require("anima-events");

var model = function(options){
    var self = this;
    Events.mixTo(self);
    
    if(options && options.source ){
       self.source =  options.source;
    }else{
       throw new Error("need region source path.");
    }

}

model.prototype.fetch = function(parentID,type){
     var self = this;
	 
     var data = self.source.getAreaChildren(parentID);
     
     if(data){
        self.trigger("loaded",type,parentID,data);     
     } 
     
}


module.exports = model;