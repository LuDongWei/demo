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
   
    self.view.on("selected",self.onSelected,self); 

    self.model.on("loaded",self.onDataLoaded,self);
    
};

Region.prototype.init = function(seletedIds) {
	   var self = this;
       
       if(!seletedIds){
          seletedIds = [null,null,null]; 
       }

       self.view.init();

       Region.regionState.province["parentId"] = 1;
       Region.regionState.city["parentId"] = seletedIds[0] || null;
       Region.regionState.district["parentId"] = seletedIds[1] || null;

       Region.regionState.province["selectedId"] = seletedIds[0] || null;
       Region.regionState.city["selectedId"] = seletedIds[1] || null;
       Region.regionState.district["selectedId"] = seletedIds[2] || null;      


       var cityParentId =  Region.regionState.city["parentId"] || null,
           districtParentId = Region.regionState.district["parentId"] || null;


       self.model.fetch(1,"province");

       if(cityParentId){
          self.model.fetch(cityParentId,"city"); 
       }
       if(districtParentId){
          self.model.fetch(districtParentId,"district");
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
      
       self.view.render(type,simpleList)    
}

Region.prototype.onSelected = function(item){
       var self = this;

       var type = item.type;    
       
       Region.regionState[type].parentId = item.parentId; 
       Region.regionState[type].selectedId = item.parentId;

       $(Region.defaults.output[type].outId).val(item.postCode)  
       $(Region.defaults.output[type].outNmae).val(item.name) 

       if( type === "province" ){
         self.view.reset(["city","district"]);
         self.model.fetch(item.postCode,"city");  
       } 

       if( type === "city" ){
         self.view.reset(["district"]);
         self.model.fetch(item.postCode,"district");
       } 

}


Region.defaults = {
	   source : null,
	   target : ".region",
	   output : {
        "province" : {
             outId : "input_provinceId",
             outNmae : "input_province"
        },
        "city" : {
             outId : "input_cityId",
             outNmae : "input_city"
        },
        "district" : {
             outId : "input_districtId",
             outNmae : "input_district"
        } 
     }
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






