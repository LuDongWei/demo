var id = "7w3pjj2rpr7bx3s4rwlu9pc28grc55d3c2igq0om12g1vax3",
   	key = "69qw1kkioiy90in16rd5k3q50lape5p4h57lnbhop37mgfqr";

    AV.initialize(id, key);

var Praisecore = AV.Object.extend("Praisecore");
var query = new AV.Query(Praisecore);


var clickNum = 0,
    savePhone = "",
    phoneList = [],
    isquery = false,
    ids = []; 


//遍历当前手机数据
function queryPhone(callback){
    if(isquery){
        if(ids.length >= 5){
          alert("你喜欢的已经够多了，不能再进行挑选了。");
        }else{    
          callback(); 
        }         
    }else{
		query.equalTo("phone", savePhone);
		query.find({
			success: function(results) {

				for (var i = 0; i < results.length; i++) {

                     var list = $("#praiseList").find("li");

                     for (var n = 0; n < list.length; n++) {

                         var id = $(list[n]).data('id');

                         if( id == results[i].get("goodId")){
			                $(list[n]).find(".love").addClass("on"); 
                            ids.push(id);
                            continue;        
		                 } 
                     	  
                     };
				};
                

                clickNum = ids.length;
                $.cookie('clickNum',clickNum, { expires: 7 });
				isquery = true;
				callback();
			},
			error: function(error) {
				alert("特殊情况，请联系商家！")
			}
		});
    }
}

//保存数据
function saveLove(){
  $("#praiseList").find("li .love").on("click", function() {
        if($(this).hasClass("on")){
            // 删除这个点赞 (等待加入)
            alert("这个已经点赞，请选择别的。");
        	return 
        }

       	var self = $(this).parent(),
	        id = self.data("id");
        
        if(clickNum == 0){
           if(savePhone == ""){
             var phone = prompt("请输入你的手机号码","");
             
             if(/^\d{11}$/.test(phone)){
               savePhone = phone; 
               $.cookie('savePhone', phone, { expires: 7 });
               queryPhone(function(){
               	  //保存数据
				  saveData(id, savePhone, self)
               });
               return 
             }else{
               alert("请填写正确的手机号码");
               return 
             } 
           }
        }

		queryPhone(function() {
		   //保存数据
		   saveData(id, savePhone, self)
		});
  })
}


// 保存数据
var isover = true;
function saveData(id,savePhone,self) {
	if (ids.length < 5) {
		if (isover) {
			isover = false;

			var praisecore = new Praisecore();
			praisecore.set("goodId", id + "");
			praisecore.set("phone", savePhone + "");

			praisecore.save(null, {
				success: function(json) {
					self.find(".love").addClass("on");
					ids.push(id);
					clickNum = ids.length;
					$.cookie('clickNum', clickNum, { expires: 7 });
					isover = true;
				},
				error: function(json) {
					isover = true;
					alert("特殊情况，请联系商家！")
				}
			})
		}
	}else{
		alert("你喜欢的已经够多了，不能再进行挑选了。");
	}
}


// 判断是否为第一次点击 记录手机号码
function judgeOne(){
	clickNum = $.cookie('clickNum') || clickNum;
	savePhone = $.cookie('savePhone') || savePhone;
   
    if(savePhone != ""){
       queryPhone(function(){
       }); 
    }
    
	if(clickNum >= 5){
      $("#praiseList").find("li a").on("click", function() { 
  	   alert("你喜欢的已经够多了，不能再进行挑选了。");
	  })
	}else{
      saveLove();   
	}
}


// 进入页面
$(function(){
    judgeOne();
})



// 数据的保存
// var praisecore = new Praisecore();
// praisecore.set("num", 1);
// praisecore.set("goodId", id);
// praisecore.set("phone", '15267124528');

// praisecore.save(null, {
// 	success: function(json) {
// 		console.log("成功！")
// 		console.log(json)
// 	},
// 	error: function(json) {
// 		console.log("失败！")
// 		console.log(json)
// 	}
// })

// 获取数据
// query.get("556c0374e4b0349d335b8c41",{
// 	success : function(Praisecore){
//         console.log(Praisecore.get('phone'))
// 	},
// 	error : function(object, error){
//         console.log(object)
//         console.log(error)
// 	}
// }) 
// query.equalTo("playerName", "Dan Stemkoski");
// query.find({
// 	success: function(results) {
// 		console.log(results)
// 		// results is an array of AV.Object.
// 	},

// 	error: function(error) {
// 		// error is an instance of AV.Error.
// 	}
// });

// 更新数据
// query.get('556c0374e4b0349d335b8c41', {
//     success: function(praisecore) {
//       praisecore.set('phone', '18368329940');
//       praisecore.save();
//       console.log(1)
//     },
//     error: function(object, error) {
//       console.log(object);
//     }
// });


// 对象计数  (会把数据叠加起来)
// query.equalTo({ "goodId" : "04", "phone":"15267124528"});
// query.count({
// 	success: function(count) {
// 		console.log(count)
// 	},
// 	error: function(error) {
// 	}
// });