function Rounter(){
	this.container = null;
	this.cache = [];
	this.pathIndex = [];
    //将url/callback 以key/value形式储存在cache内
    this.addRouter = function (path, resource, componet) {
    	if(typeof(componet) != "object"){
    		mui.toast("componet必需是对象.");
    		return false;
    	}
    	if(this.pathIndex.indexOf(path) != -1){
    		throw new Error("Path have been exists!");
    	}
        var _router = {"path":path, "resource":resource, "componet":componet};
        this.cache.push(_router);
        this.pathIndex.push(path);
    };
}
//匹配hash对应的回调函数,并触发
Rounter.prototype.trigger = function (hash) {
    var cache = this.cache;
    var container = this.container;
    var index = this.pathIndex.indexOf(hash);
    //console.log("trigger:"+cache[index].resource,cache[index].componet);
    if(index != -1){
    	if(cache[index].resource && cache[index].resource != ""){
    		$.ajax({
        		url: cache[index].resource,
        		type:'get',
        		dataType:'html',
        		success:function(response){
        			container.html(response);
					try{
						if(cache[index].componet)
        					cache[index].componet.init();
        				//routerChange(index);
					}catch(e){
						//throw new Error("加载模块时发生错误", e);
						//throw new Error(e);
						throw new Error(e.message);
					}
        		},
        		error:function(){
        			mui.toast("加载失败！请检查网络或地址是否有误.");
        		}
        	});
    	}else{
    		if(cache[index].componet)
        		cache[index].componet.init();
    	}
    }
};

//初始化 添加监听浏览器hashchange 以及dom loaded函数
Rounter.prototype.init = function () {
	var cache = this.cache;
	var pathIndex = this.pathIndex;
	if(cache.length > 0){
		for(var i=0; i<cache.length; i++){
			var _router = cache[i];
			pathIndex.push(_router.path);
		}
	}
	var _this = this,hash='';
	if(window.location.hash !== ''){
		hash= location.hash.slice(1);
	    _this.trigger(hash);
	}
	window.addEventListener('hashchange', function () {
        hash = location.hash.slice(1);
        _this.trigger(hash);
    });
    window.localStorage.setItem('hash',hash);
};
 
define(['jquery','mui'], function($, mui){
    var rounter = new Rounter();
    
    window.router = {
		render:function(e){
			rounter.container = (typeof(e) == "string" ? $("#"+e) : $(e));
		},
		addRouter:function(path, resource, componet){
			rounter.addRouter(path, resource, componet);
		},
		mapper:function(mappings){
			rounter.cache = mappings;
		},
		go:function(path){
			window.location.hash=path;
		},
		getPage:function(hash){
			var index = rounter.pathIndex.indexOf(hash);
			return rounter.cache[index].componet;
		},
		init:function(){
			rounter.init();
		}
	};
	
	return window.router;
});