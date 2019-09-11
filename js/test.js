define(["jquery","cache","common","mui"],function($,Cache,common,mui){
	var workList = {
		
	};
	
	return {
		init:function(){
			console.log("test");
			mui('.mui-scroll-wrapper').scroll();//触发滚动
			mui(".mui-slider").slider();//这句话必要
			$("footer ul li").unbind("click");
			$("footer ul li").click(function(){
				var url = $(this).data("u");
				$(this).addClass("active").siblings().removeClass("active");
				router.go(url);
			})
		}
	}
});