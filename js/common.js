define(['mui','jquery', 'cache'], function(mui, $, cache){
	var sessionKey = "zh-app-user";
	var userInfo = cache.getJSON(sessionKey);
	var _token = "", 
		//hostIp = "http://xinjiang.project.agrisaas.com.cn/",
		hostIp = "http://10.10.202.84:8084/",
		base_zz= hostIp+ "aptmp-farmingtrace/",
		base_yz = hostIp+ "aptmp-breedingtrace/",
		base_sc = hostIp+ "aptmp-aquatictrace/",
		_requestUri = "http://xinjiang.project.agrisaas.com.cn/",
		//_requestUri = "http://10.10.202.84:8084/",//192.10.22.194:8085
		//prevImg ="http://10.10.202.67:8080/aptmp-farmingtrace/common/file/load?filePath=",
		prevImg =_requestUri+"aptmp-farmingtrace/common/file/load?filePath=",
		prevImg_sc =_requestUri+"aptmp-aquatictrace/common/file/load?filePath=",
		_loginName = "";
	if(userInfo){
		_token = userInfo.token,
		_loginName = userInfo.loginName;
	}

	
	$.ajaxSetup({
		global: true,
		timeout:10000
	});
	$(document).ajaxSend(function(evt, request, settings){
		if(settings.url.indexOf("views/")==-1){
			
			settings.url = _requestUri + settings.url;
			//request.setRequestHeader("Authorization",_token);
		}
	});
	$(document).ajaxComplete(function(XMLHttpRequest,textStatus){
		//同意跳转登录页面402:用户未登录，401token已过期
		if(textStatus.status==402){
			mui.toast(textStatus.responseText);
			window.location.href = "views/login.html";
		}else if(textStatus.status==401){
			mui.toast("用户信息已过期，请重新登录！");
			window.location.href = "views/login.html";
		}
		
	});
	return {
		sessionKey:sessionKey,
		loginUser:userInfo,
		token: _token,
		prevImg:prevImg,
		prevImg_sc:prevImg_sc,
		requestUri: _requestUri,
		loginName:_loginName,
		isLogin:function(){
			if(userInfo && userInfo.isLogin == 1){
				return true;
			}
			return false;
		},
		validParam:{"Authorization":_token,"loginNameValidate":_loginName},
		serializeJson:function(s){
			s = '{"'+ s.replace(/=/g, '":"').replace(/&/g, '","') +'"}';
			s = JSON.parse(s);
			for(var f in s){
				s[f] = decodeURIComponent(s[f]);
			}
			return s;
		},
		routerArr:["/index","/jckz","/unitMsg","/spjk","/analysis",'/video'],
		getNowFormatDate:function(){
			var date = new Date();
	        var seperator1 = "-";
	        var year = date.getFullYear();
	        var month = date.getMonth() + 1;
	        var strDate = date.getDate();
	        if (month >= 1 && month <= 9) {
	            month = "0" + month;
	        }
	        if (strDate >= 0 && strDate <= 9) {
	            strDate = "0" + strDate;
	        }
	        var currentdate = year +seperator1+ month+seperator1+strDate + " "  +date.getHours()+":"+date.getMinutes();
	        return currentdate;
		}
  	};
});