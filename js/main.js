require.config({
	baseUrl: "js/",
	paths:{
		"jquery":"jquery/jquery-1.11.1",
		"mui":"mui/mui.min",
		"router":"router/router",
		"cache":"cache/cache"
	}
});

require(["index","common","router","index","login","home","workList","nsgl","test"], function(index,common,router,index,login,home,workList,nsgl,test){
	var router_mappings = [
		{
			path:"/login", resource:"views/login.html", componet:login
		},
		{
			path:"/home", resource:"views/home.html", componet:home
		},
		{
			path:"/workList", resource:"views/workList.html", componet:workList	
		}
		,
		{
			path:"/nsgl", resource:"views/nsgl.html", componet:nsgl	
		},
		{
			path:"/test", resource:"views/test.html", componet:test	
		}
	];

	router.render("workcontent");
	router.mapper(router_mappings);
	router.init();
});