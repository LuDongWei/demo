define(function(require,exports,moudle){
      var $=require("jquery")
      var Handlebars = require('handlebars');
      require("idtabs")($)
      var dataAll=[];
      var data_number=0;

      var templateall=[];
      var template_number=0; 


      function mbbdata(a,b){
         this.name_=a;
         this.data_=b;
      }

      function mbbtemplate(a,b,c,d,e){
         this.name_=a;
         this.style_=b;
         this.head_=c;
         this.template_=d;
         this.remark_=e;
      }

      //参数
      var sortSize=174;       //图片尺寸
      var isOffSale=true;     //是否完全显示
      var itemSku=null;       //填入sku
      var inputType="sku";    //填入sku
      var jsondata=null;      //进行修改data

      //块
      $(".template_choose_option").idTabs();
      $(".data_input_option").idTabs();
      

      //模板部分
      //初始化已经保存模板
      $(function(){
         try {
            templateall = JSON.parse(localStorage["templateAll"])
            } catch (err) {
              return
         }
		 var html='<option value ="null" elected="selected">使用已保存模板-O(∩_∩)O</option>';
		 for (var i = 0; i < templateall.length; i++) {
		 var name=templateall[i].name_;
		 html=html+'<option value ="'+i+'">'+name+'</option>';
		 };
		 $("#template_data").html(html); 
      })

      //模板保存
      $("#template_save").on("click",function(){
           var name=prompt("请输入模板名字","");
           if(name){template_save(name)}else{alert("请输入数据名字")} 
      })

      var template_save=function(name){
         var style=$("#template_style").val();
         var head=$("#template_handlebars_head").val();
         var handlebars=$("#template_handlebars").val();
         var remark=$("#template_remark").val();

         if(style==""||handlebars==""||head==""){
           alert("请确保模板数据存在")
           return
         }
      
         //存储保存数据
         var mbbtemplate_=new mbbtemplate(name,style,head,handlebars,remark);
         var dataArray=[];
         for (var i = 0; i < templateall.length; i++) {
             dataArray.push(templateall[i])
         };
         dataArray.push(mbbtemplate_);
         localStorage["templateAll"]=JSON.stringify(dataArray);
      }

      //选择模板
      $("#template_data").on("change",function(){
        var dataIndex=Number($(this).val())
        var ro=/[1-9]\d*|0/;  //正整数(包括0)
        if(ro.test(dataIndex)){
          var style=templateall[dataIndex].style_;
          var head=templateall[dataIndex].head_; 
          var handlebars=templateall[dataIndex].template_
          var remark=templateall[dataIndex].remark_
          $("#template_style").val(style);
          $("#template_handlebars_head").val(head);
          $("#template_handlebars").val(handlebars);
          $("#template_remark").val(remark);
        } 
     })


      //运用模板
      var  templatedata=function(data){
           var data_ = {useGood_list: data}
           var style=$("#template_style").val();
           var head=$("#template_handlebars_head").val();
           var handlebars=$("#template_handlebars").val();

           if(style==""||handlebars==""||head==""){
           alert("请确保模板数据存在")
           return
           }

           $("#handlebars_style").html(style);
           $("#handlebars_list").html("{{#useGood_list}}"+handlebars+"{{/useGood_list}}");
           $(".template_show").html(head);
           
          

           var template = Handlebars.compile($("#handlebars_list").html());
           $(".template_show").children().html(template(data_))
      }

      //生成Html
      $("#out_html_button").on("click",function(){
          $("#out_html").val($(".template_show").html())
          return false
      })
      

      //输入数据
      //点击inputType="data"初始化
      $(".data_input_option").find("a").each(function(){
         $(this).on("click",function(){
             inputType=$(this).data("type");
             if(inputType=="data"){
                jsondata=null
                try {
                dataAll = JSON.parse(localStorage["dataAll"])
                } catch (err) {
                  return
                }
                var html='<option value ="null" elected="selected">使用已保存数据-O(∩_∩)O</option>';
                for (var i = 0; i < dataAll.length; i++) {
                var name=dataAll[i].name_;
                html=html+'<option value ="'+i+'">'+name+'</option>';
                };
                $("#data_select").html(html); 
             }
         })
     })

     //开始获取数据
	 $("#goods_show").on("click", function() {
         if(inputType!="sku"){
            inputData()
         }else{
            inputSku()
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
      templatedata(jsondata)       
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
                templatedata(jsondata)
	          }
	       });
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

     //字符的截取
     Handlebars.registerHelper('cutout', function(text) {
        text = Handlebars.Utils.escapeExpression(text);

        var result = text.substring(0, 12);

        return new Handlebars.SafeString(result);
     })

     //打折信息
     Handlebars.registerHelper('discount', function(promotionP,marketP,decimals) {
        marketP = Handlebars.Utils.escapeExpression(marketP);
        promotionP = Handlebars.Utils.escapeExpression(promotionP);
        decimals = Handlebars.Utils.escapeExpression(decimals);
   
        var   result=promotionP? String(promotionP/ marketP * 10, 10).substring(0, 3) : String(data[i].sale_price / marketP * 10).substring(0, (decimals+2))
               
        return new Handlebars.SafeString(result);
     })



     //截取系类信息 [麦包包(M Plus)]微笑天使系列手提单肩斜挎包 薄荷绿
     //--->>微笑天使系列
     Handlebars.registerHelper('cutSeries', function(name) {
        name = Handlebars.Utils.escapeExpression(name);
        var  result="奢华低调系列";

        if(name.indexOf("系列")<0){
             
        }else{
          //截取
          result=name.split("]")[1].split("系列")[0]+"系列";
        }
        
        return new Handlebars.SafeString(result);
     })
     


})