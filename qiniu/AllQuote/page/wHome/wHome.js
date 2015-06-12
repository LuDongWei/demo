//微转运 首页
define(function(require, exports, module) {

	"use strict";

	var $ = require('jquery');
	var G=require('global');

	//轮播
	var controller = function(box, time, auto) {
		var startRun;
		var currentIndex = 0;
		var IndexLi = $(box).find('.slider').size();
		$(box).find('.lbnum a').each(function(index) {
			$(this).mouseover(function() {
				go(index);
				return false;
			});
		});
		if (auto) {

			var _self = $(box).find('.lbnum a');
			var _selfelse = $(box).find('.slider');

			loop();
		}
		_self.mouseenter(function() {
			stop();
		});

		_self.mouseleave(function() {
			stop();
			loop();
		})
		_selfelse.mouseenter(function() {
			stop();
		});

		_selfelse.mouseleave(function() {
			stop();
			loop();
		})

		function loop() {
			startRun = setInterval(function() {
				var currIndex = currentIndex + 1;

				if (currIndex >= IndexLi) {
					currentIndex = 0
				} else {
					currentIndex = currIndex;
				}

				go(currentIndex);
			}, time);
		}

		function stop() {
			clearInterval(startRun);
		}
		function go(page) {

			var navLis = $(box).find('.lbnum a');
			var mainLis = $(box).find('.slider');

			navLis.removeClass('current').eq(page).addClass('current');
			mainLis.fadeOut().eq(page).fadeIn();

			return false;
		}
	}

	//提示
    $("#topAnnunciate").on("click",".close",function(){
    	 $("#topAnnunciate").slideUp();
    })


	$(function() {
		//提示
		if($("#topAnnunciate").find(".content").length > 0 ){
           $("#topAnnunciate").slideDown(); 
		}

		//执行
        if($(".top-carousel").find(".slider").length > 1) {
            controller('.top-carousel',4000, true);
        }
        // G.initHead();
        // G.float_nav();
	})



})