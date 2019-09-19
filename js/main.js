require.config({
	baseUrl: "js/",
	paths:{
		"jquery":"jquery/jquery-1.11.1",
		"mui":"mui/mui",
		"pullcommon":"mui/mui.pullToRefresh",
		// "pullmaterial":"mui/mui.pullToRefresh.material",
		"router":"router/router",
		"cache":"cache/cache"
	}
});

require(["index","common","router","index","login","home","workList","nsgl","mine","test","xtgl","about","details","resetpassword","farmworkmanage"], function(index,common,router,index,login,home,workList,nsgl,mine,test,xtgl,about,details,resetpassword,farmworkmanage){
	var router_mappings = [
		{
			path:"/", resource:"views/login.html", componet:login
		},
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
			path:"/mine", resource:"views/test.html", componet:mine	
		},
		{
			path:"/xtgl", resource:"views/xtgl.html", componet:xtgl	
		},
		{
			path:"/about", resource:"views/about.html", componet:about	
		},
		{
			path:"/details", resource:"views/details.html", componet:details	
		},
		{
			path:"/resetpassword", resource:"views/resetpassword.html", componet:resetpassword	
		},
		{
			path:"/farmworkmanage", resource:"views/farmworkmanage.html", componet:farmworkmanage
		}
	];

	router.render("workcontent");
	router.mapper(router_mappings);
	router.init();
	//是否登录？
	if(!common.isLogin()){
		router.go("/login");
		return false;
	}else{
		console.log(router);
		//router.go("/home");
	}
});