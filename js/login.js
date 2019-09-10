define(["jquery","cache","common","mui"],function($,Cache,common,mui){
	var removeCache = function(){
		Cache.remove("validParam");
		Cache.remove("userInfo");
	}
	
	var isAbledClick = true;
	var openId = "";
	
	var loginIn = {
		initImgHeight:function(){
			var height = $(document.body).height();
			$("div.p-login").css({height:height});
		},
		
		loginFun:function(isFirst,loginName,password){
			if(isAbledClick){
				isAbledClick = false;
				try{
					openId = window.location.search.split('=')[1];//"o_iOn0xUO4yrKAPzyjvCnC6sUD7E";//  //o_iOn01erks9Meu3rCRvyggxPGJc
					var paramData = {'openId':openId};
					if(!isFirst) paramData = $.extend({}, paramData, {
						'loginName':loginName,
						'password':password
					});
					
					$.ajax({
						url:'/wechat/login',
						type:'GET',
						data: paramData,
						success:function(resp){
							if(resp.status==200){
								var resultData = resp.data;
								var loginUserId = resultData.id;
								var epId  = resultData.epId;
								var userName = resultData.userName;
								var authToken = resultData.userToken.replace(/\+/g,"%2B")
								var effectiveDate = resultData.effectiveDate;
								
								removeCache();
								Cache.set("validParam", {'loginUserId':loginUserId,'authToken':authToken});
								Cache.set("userInfo", {'epId':epId,'epName':resultData.epName,
								'baseId':resultData.baseId,'baseName':resultData.baseName,
								'baseNo':resultData.baseNo,'userName':userName,'effectiveDate':effectiveDate});
								
								var item_jQs = $('.e.item','footer');
								var nscz_jQ = $('.e.nscz','footer');
								item_jQs.removeClass('active');
								nscz_jQ.addClass('active');
								
								$("footer").show();
								window.location.hash = "/nscz-operate-type";
								
							}else if(resp.status==301 && !isFirst){
								mui.toast('用户名或密码不正确，请重新输入',{ duration:3500, type:'div' });
							}else if(resp.status==302 && isFirst){ // 302 请登录
								console.log("请登录");
							}else{ // 500 或者其他
								mui.toast('登录接口异常',{ duration:3500, type:'div' });
							}
							isAbledClick = true;
						},error:function(e,res,obj){
							isAbledClick = true;
							console.log("登录接口异常，具体信息:",e);
							mui.toast('请求登录接口超时，请重新登录',{ duration:3500, type:'div' });
						}
					});
				}
				catch(err) {
					isAbledClick = true;
					console.log("登录接口异常，具体信息: ",err);
					mui.toast('请求登录接口异常',{ duration:3500, type:'div' });
				}
		
			}
		},
	};
	
	return {
		init:function(){
			removeCache();
			loginIn.initImgHeight();
			$("footer").hide();
			loginIn.loginFun(true);
			
			$('.e.login','.p-login').click(function(){
				var userName_jQ = $('#userName');
				var passWord_jQ = $('#passWord');
				passWord_jQ.removeClass('word-red');
			    userName_jQ.removeClass('word-red');
				var userName = userName_jQ.val();
				var passWord = passWord_jQ.val();
				if(userName=="" || passWord==""){
					if(userName==""){
						userName_jQ.addClass('word-red');
					}else{
						passWord_jQ.addClass('word-red');
					}
					mui.toast('请填写所有必填字段',{ duration:'long', type:'div' });
				}else{
					loginIn.loginFun(false,userName,passWord);
				}
			});
		}
	}
});