define(["jquery","cache","common","mui"],function($,Cache,common,mui){
	var nsgl = {
		bindClick:function(){
			$(".mui-scroll ul li").click(function(){
				console.log("点击进入该地块种植信息");
			})
			$(".oprate img").click(function(){
				//获取类型
				var type = $(".mui-control-item.mui-active").attr("id");
				var text = this.name;
				console.log(type,text,this.id);
				$("#czTitle").html(text);
				//窗出框
				mui('#czPopover').popover('toggle');//show hide toggle
				
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
			console.log("初始化列表");
			mui('.mui-scroll-wrapper').scroll();//触发滚动 
			mui(".mui-slider").slider();//滑动效果
			nsgl.bindClick();
		}
	}
});