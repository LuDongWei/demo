# region

---

## 省市区联动

使用静态文件编写的省市区联动插件

## 使用

### 页面数据保存
````html
<!--数据保存与提取-->
<input type="hidden" name="province" id="input_province" value="吉林省">
<input type="hidden" name="provinceId" id="input_provinceId" value="220000">
<input type="hidden" name="city" id="input_city" value="延边朝鲜族自治州">
<input type="hidden" name="cityId" id="input_cityId" value="222400">
<input type="hidden" name="district" id="input_district" value="珲春市">
<input type="hidden" name="districtId" id="input_districtId" value="222404">
<!--数据保存与提取-->

<!--页面打印区-->
<span id="span_region_linkage" class="span_region"></span>
<!--页面打印区-->
````
### 启动
````javascript
seajs.use("region",function(region){
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
})	
````

### 默认选择
````javascript
aa.init(["220000","222400","222404"])	
````