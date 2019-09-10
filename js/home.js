define(["jquery","cache","common","mui"],function($,Cache,common,mui){
	var home = {
		bindClick:function(){
			$(".mui-scroll ul li").click(function(){
				console.log("点击进入该地块种植信息");
				router.go("#/workList")
			})
		}
	};
	
	return {
		init:function(){
			console.log("初始化首页");
			mui(".mui-slider").slider();//滑动效果
			home.bindClick();
		}
	}
});