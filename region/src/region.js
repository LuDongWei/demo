//省市区 联动
var $ = require("jquery"),
    Events = require("anima-events"),
    View = require("./region-view.js"),
    Model = require("./region-model.js"),
    Areas = require("./areas.js"); 

var Region = function(options){
    var self = this;
    Events.mixTo(self); 

    self.opt = $.extend(Region.defaults,options||{});
    
    self.view = new  View({
    	 target : Region.defaults.target
    })
    
    self.model = new Model({
         source : Region.defaults.source||Areas 
    }) 
    
    // 给对象添加事件回调函数
   
    // self.view.on("123",self.onShowSelect)

    self.model.on("loaded",self.onDataLoaded,self);
    
};

Region.prototype.init = function(seletedIds) {
	   var self = this;
       
       if(!seletedIds){
          seletedIds = [null,null,null]; 
       }

       self.view.init();    

       var provinceId = Region.regionState.province["selectedId"] || 1,
           cityId =  Region.regionState.city["selectedId"] || null,
           districtId = Region.regionState.district["selectedId"] || null;


       self.model.fetch(provinceId,"province");
       if(cityId){
          self.model.fetch(cityId,"city"); 
       }
       if(districtId){
          self.model.fetch(districtId,"district");
       }
};

Region.prototype.onDataLoaded = function(type,parentID,list){
       var self = this;

       var simpleList = [];
       var seletedId = parseInt(Region.regionState[type].selectedId,10)
       
       for (var i = 0; i < list.length; i++) {
           var isSelected = list[i].id === seletedId;

           var item = {
           	   parentId : list[i].parent_id,
           	   postCode : list[i].id,
           	   name : list[i].name,
           	   selected : isSelected    
           }        	    
       	   simpleList.push(item)
       };

       console.log(123);
       
       console.log(self)
      
       self.view.render(type,simpleList)    
}


Region.defaults = {
	   source : null,
	   target : ".region",
	   outputValue : ["input_province","input_city","input_district"],
	   outputId : ["input_provinceId","input_cityId","input_districtId"]
}

Region.regionState = {
       "province" : {
       	   parentId : 1,
       	   selectedId : null
       },
       "city" : {
           parentId : null,
       	   selectedId : null
       },
       "district" : {
           parentId : null,
       	   selectedId : null
       }   
}


module.exports =  Region;






