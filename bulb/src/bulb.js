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
var width = $(".floor-3").width(),
    big =  width*0.4,    
    small = width*0.2;

$(window).on("resize",function(){

	width = $(".floor-3").width(),
    big =  width*0.4,    
    small = width*0.2;

})    

$("#scenesList").find("li").on('mouseover',function(){

		$("#f3Text").hide();

		$(this).stop(!0, !0).animate({"width":big},400,function(){
		   isMove = true;
		});

		$(this).find(".scene-content").addClass("selected");

		$("#scenesList li").not(this).stop(!0, !0).animate({"width":small},400);
		$("#scenesList li").not(this).find(".scene-content").removeClass("selected"); 
	    
})


$("#scenesList").on('mouseleave',function(){
	  $("#scenesList li").stop(!0, !0).animate({"width":"25%"},400,function(){
           $("#f3Text").show(); 
	  });
	  $("#scenesList li").find(".scene-content").removeClass("selected"); 
})

