define(["jquery","cache","common","mui"],function($,Cache,common,mui){
	var home = {
		bindClick:function(){
			$(".mui-scroll ul li").click(function(){
				console.log("点击进入该地块种植信息");
				router.go("#/workList")
			});
			$("footer ul li").unbind("click");
			$("footer ul li").click(function(){
				var url = $(this).data("u");
				$(this).addClass("active").siblings().removeClass("active");
				router.go(url);
			})
		}
	};
	
	return {
		init:function(){
			console.log("初始化首页");
			$('footer').show();
			mui(".mui-slider").slider();//滑动效果
			home.bindClick();
		}
	}
});