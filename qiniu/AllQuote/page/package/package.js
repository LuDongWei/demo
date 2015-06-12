$(".package-more").each(function(){

    $(this).on("click",function(){
    	var self = $(this); 
        var isHide = self.data("more");

        self.parent().parent().parent().find(".pack-hide").toggle('slow',function(){
               
              if(isHide){
                 self.removeClass("package-top");
                 self.data("more",false);
              }else{
                 self.addClass("package-top");
                 self.data("more",true);
              }  

        });
     
    })
})

$(".package-more-info").each(function(){
     
    $(this).on("click",function(){
        var self = $(this); 
        var isHide = self.data("more"); 
    
        self.parent().parent().parent().parent().find(".pt-3").toggle('slow',function(){
               
              if(isHide){
                 self.removeClass("package-top");
                 self.data("more",false);
              }else{
                 self.addClass("package-top");
                 self.data("more",true);
              }  

        });
    }) 
})


