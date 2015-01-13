// $(document).ready(function(){

// })


//2f - slider
$("#pageSlider").bxSlider({
  mode:'fade',
  auto: true,
  pager: false,
  controls: false
});

//3f - scenes

$("#scenesList").find("li").on('mouseover',function(){

		$("#f3Text").hide();

		$(this).stop().animate({"width":"40%"},400,function(){
		   isMove = true;
		});

		$(this).find(".scene-content").addClass("selected");

		$("#scenesList li").not(this).stop().animate({"width":"20%"},395);
		$("#scenesList li").not(this).find(".scene-content").removeClass("selected"); 
	    
})


$("#scenesList").on('mouseleave',function(){
	  $("#scenesList li").stop().animate({"width":"25%"},400,function(){
           $("#f3Text").show(); 
	  });
	  $("#scenesList li").find(".scene-content").removeClass("selected"); 
})

