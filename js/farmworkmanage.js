define(["jquery","cache","common","mui"],function($,Cache,common,mui){
	var farmworkmanage = {
		bindClick:function(){
			$(".mui-scroll ul li").click(function(){
				console.log("点击进入该地块种植信息");
				router.go("#/workList")
			});
			$("footer ul li").unbind("click");
			$("footer ul li").click(function(){
				var url = $(this).data("u");
				console.log(url);
				$(this).addClass("active").siblings().removeClass("active");
				router.go(url);
			})
		}
	};
	
	return {
		init:function(){
			console.log("初始化农事管理首页");
			$('footer').show();
			mui(".mui-slider").slider();//滑动效果
			farmworkmanage.bindClick();
		}
	}
});