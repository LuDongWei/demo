define(function(require,exports,moudle){
      var $=require("jquery")
      require("idtabs")($)
      var dataAll=[];
      var data_number=0;

      function mbbdata(a,b){
         this.name_=a;
         this.data_=b;
      }  
      //块
      $(".data_input_option").idTabs();

      //参数
      var sortSize=174;       //图片尺寸
      var isOffSale=true;     //是否完全显示
      var itemSku=null;       //填入sku
      var inputType="sku";    //填入sku
      var jsondata=null;      //进行修改data
     
     //点击inputType="data"初始化
     $(".data_input_option").find("a").each(function(){
         $(this).on("click",function(){
             inputType=$(this).data("type");
             if(inputType=="data"){
                var dataAll=initializeData();
                var html='<option value ="null" elected="selected">使用已保存数据-O(∩_∩)O</option>';
                for (var i = 0; i < dataAll.length; i++) {
                var name=dataAll[i].name_;
                html=html+'<option value ="'+i+'">'+name+'</option>';
                };
                $("#data_select").html(html);
             }
         })
     })

     //初始化数据
     var initializeData=function(){
         jsondata=null
          try {
          dataAll = JSON.parse(localStorage["dataAll"])
          } catch (err) {
            return dataAll=[];
          }
          return  dataAll
     }   

     //开始获取数据
	   $("#data_show").on("click", function() {
         if(inputType=="sku"){
            inputSku()
         }else if(inputType=="data"){
            inputData()
         }else{
            inputPort()
         }			   
	   })

    //输入sku
    var  inputSku=function(){
      var itemSku_ = judgeSku($("#item_sku").val())
      if (itemSku_.a) {
        itemSku = itemSku_.b
      } else {
        alert(itemSku_.b)
        return
      }

      sortSize=$('#item_size').val()
      isOffSale=$('#item_state').val()

      ajaxSku()
    }

    //输入data
    var inputData=function(){
      try {
      jsondata=JSON.parse($('#item_data').val())
      } catch (err) {
        alert(err)
        return  
      }
      showData(jsondata)       
    }

    //输入port
    var inputPort=function(){
        var port=$("#item_port").val();
        if(port==""){
           alert("请输入接口")
           return
        }
        console.log(port)
        portAjax(port)
    }

    var  portAjax=function(url_){
         $.ajax({
            "url":url_,
            "type": "GET",
            "dataType":"jsonp",
            "jsonp": "jsoncallback",
            "data": {},
            "success": function(json) {
                console.log(json)
                showData(json)
            },
            "error":function(e){
                //alert(e)  
            }
         });
    }

    //选择模板
    $("#data_select").on("change",function(){
        var dataIndex=Number($(this).val())
        var ro=/[1-9]\d*|0/;  //正整数(包括0)
        if(ro.test(dataIndex)){
          jsondata=dataAll[dataIndex].data_
          $('#item_data').val(JSON.stringify(jsondata));
        } 
    })

	  //ajax数据
	  var ajaxSku=function(){
	        $.ajax({
	          "url": "http://www.mbaobao.com/ajax/sku",
	          "type": "GET",
	          "dataType": "jsonp",
	          "jsonp": "jsoncallback",
	          "data": {
	            "skus": itemSku,
	            "size": sortSize,
	            "all": isOffSale
	          },
	          "success": function(json) {
                jsondata=json
                showData(jsondata)
	          }
	       });
	   }

      //数据显示
      var showData=function(data){
          DataGrid(data)
      }


      //数据保存
      $("#data_save").on("click",function(){
         var name=prompt("请输入数据名字","");
         if(name){data_save(name)}else{alert("请输入数据名字")}
         return false;           
      })

      var data_save=function(name){
         var datas=[];
         $(".datagrid-btable").eq(1).find("tr").each(function(){
              var data={};
              $(this).find("td").each(function(){
              var key=$(this).attr("field");
              var value=$(this).find("div").text();
              data[key]=value;
              })
              datas.push(data);      
         })

         if(datas==[]||datas==""){
           alert("确保数据存在")
           return
         }
      
         //存储保存数据
         var mbbdata_=new mbbdata(name,datas);
         var dataArray=[];
         for (var i = 0; i < dataAll.length; i++) {
             dataArray.push(dataAll[i])
         };
         dataArray.push(mbbdata_);
         console.log(dataArray)
         localStorage["dataAll"]=JSON.stringify(dataArray);
      }

      //判断sku
      var judgeSku=function(sku){
     	var return_={a:true,b:sku}
        if(sku==null||sku==""){
           return_={a:false,b:"sku还没输入"}
           return return_	
        }

        if(sku.search(/[a-zA-Z]+/)!=-1){
           return_={a:false,b:"sku包含英文"}
           return return_
        }
  
        if(sku.indexOf("，")>=0){
           sku=sku.replace(/，/g, ",")
           return_={a:true,b:sku}
        }

        if(sku.indexOf("\n")>=0){
           sku=sku.replace(/\n/g, ",")
           return_={a:true,b:sku}
        }

        if(sku.indexOf("\s")>=0){
           sku=sku.replace(/\s/g, "")
           return_={a:true,b:sku}
        }

        return return_
     }


     $(function(){
        initializeData(); //初始化保存数据
     })

})