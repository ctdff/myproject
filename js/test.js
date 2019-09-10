define(["jquery","cache","common","mui"],function($,Cache,common,mui){
	var workList = {
		
	};
	
	return {
		init:function(){
			console.log("test");
			mui('.mui-scroll-wrapper').scroll();//触发滚动
			mui(".mui-slider").slider();//这句话必要
		}
	}
});