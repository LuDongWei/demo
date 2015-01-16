var region = require("region");


   var aa = new region({
     	 target : "#span_region_linkage",
		 output : {
	        "province" : {
	             outId : "#input_provinceId",
	             outNmae : "#input_province"
	        },
	        "city" : {
	             outId : "#input_cityId",
	             outNmae : "#input_city"
	        },
	        "district" : {
	             outId : "#input_districtId",
	             outNmae : "#input_district"
	        } 
	     }
     })
     
     // aa.init();

     aa.init(["220000","222400","222404"])


