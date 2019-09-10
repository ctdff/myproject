define(["jquery","cache","common","mui"],function($,Cache,common,mui){
	var workList = {
		bindClick:function(){
			$(".mui-scroll ul li").click(function(){
				console.log("点击进入该地块种植信息");
			})
		}
	};
	
	return {
		init:function(){
			console.log("初始化列表");
			mui(".mui-slider").slider();//滑动效果
			//workList.bindClick();
		}
	}
});