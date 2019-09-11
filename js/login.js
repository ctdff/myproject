define(["jquery","cache","mui"],function($,Cache,mui){
	var loginIn = {
		initInfo:function(){
			var userInfo = Cache.getJSON("pms-app-user");
			console.log("初始化",userInfo);
			if(userInfo !== null){
				$("#userName").val(userInfo.username);
				$("#password").val(userInfo.password);
			}
			$("footer").hide();
		},
		bindClick:function(){
			$("#loginBtn").click(function(){
				var enabledClick = true;
				var username=$("#userName").val();
				var password = $("#password").val();
				var remember =false;
				if(username==""){
					mui.toast("请输入用户名");
					return;
				}
				if(password==""){
					mui.toast("请输入密码");
					return;
				}
				mui('.mui-btn').button('loading');
				if(enabledClick){
					enabledClick = false;
					$.ajax({
						type:"post",
						url:"/aptmp-breedingtrace/applogin",
						timeout : 10000,
						data:{'username':username,'password':password,'requestType':'app'},
						dataType:'json',
						success:function(res){
							console.log(res);
							if(res.status==1){
								mui.toast("登陆成功");
								var data = res.data;
								var user = {"username":username,"password":password,
								"tenantId":data.tenantId,"operatorId":data.operatorId, "isLogin":1,
								orgId:data.orgId};
								Cache.set("pms-app-user",user);
								setTimeout(function(){
									window.location.hash = "#/home";
								},500);
							}else{
								mui.toast((res.msg?res.msg:"")+"登录失败.");
								mui('.mui-btn').button('reset');
							}
						},
				       	complete:function(XMLHttpRequest,textStatus){
				       		console.log(textStatus);
				       		if(textStatus == 'timeout') {
				       			mui.toast("登录超时,请重试！"); 
				       		}
				   		}
					});
				}
				
			})
			
		}
	};
	
	return {
		init:function(){
			console.log("login js");
			loginIn.initInfo();
			loginIn.bindClick();
		}
	}
});

		
	
