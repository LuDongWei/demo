var expect = require('expect.js');
var region = require('../src/region.js');

describe('region', function() {
  
  //测试自动生成模式 和 

  it('normal', function() {
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
     

     aa.init(["220000","222400","222404"])
   });


   it('normal-2', function() {
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
     
     aa.init();
  });

});
