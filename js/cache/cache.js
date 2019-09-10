/**
 * 该Cache对象，利用localStorage和sessionStorage进行缓存操作
 * 
 */
var Cache = {
	db:window.localStorage,
	timeoutitemKey:"TIMEOUTKEY",
	timeoutitemKeyIndex:"TIMEOUTKEY_IDX",
	isListener:false,
	timeoutListener:null,
	set:function(key, value, timeout){
		if(window.localStorage || window.sessionStorage){
		}else{
			throw new Error("当前浏览器不支持缓存.");
		}
		var _value = null;
		if(typeof(value) == "object"){
			_value = JSON.stringify(value);
		}else{
			_value = value;
		}
		this.db.setItem(key, _value);
		
		if(timeout){
			this._addTimeoutItem(key, timeout * 60 * 1000);
		}
	},
	
	/**
	 * 返回结果为string
	 */
	get:function(key){
		return this.db.getItem(key);
	},
	
	/**
	 * 返回结果为object
	 */
	getJSON:function(key){
		var value = this.db.getItem(key);
		if(value == null || value == ""){
			return null;
		}
		return JSON.parse(value);
	},
	
	remove:function(key){
		this.db.removeItem(key);
	},
	
	clear:function(){
		this.db.clear();
	},
	
	listener:function(){
		this._cachekeytimeoutListener();
	},
	
	_addTimeoutItem:function(key, timeout){
		var curentDate = new Date().getTime();
		var endDate = curentDate + timeout;
		var toItem = {
			key: key, expiredAt: endDate
		};
		
		var toi = this._getTimeoutItemIndex();
		var index = toi.indexOf(toItem.key);
		var toItems = this._getTimeoutItems();
		if(index == -1){
			toItems.push(toItem);
			this._setTimeoutItemIndex(toItem.key);
		}else{
			toItems[index] = toItem;
		}
		
		this.set(this.timeoutitemKey, toItems);
		if(!this.isListener){
			this._cachekeytimeoutListener();
		}
	},
	
	_getTimeoutItems:function(){
		var toItems = this.getJSON(this.timeoutitemKey);
		if(toItems == null){
			toItems = [];
		}
		return toItems;
	},
	
	_getTimeoutItemIndex:function(){
		var toiIndex = this.getJSON(this.timeoutitemKeyIndex);
		if(toiIndex == null){
			toiIndex = [];
		}
		return toiIndex;
	},
	
	_setTimeoutItemIndex:function(key){
		var toiIndex = this._getTimeoutItemIndex();
		var index = toiIndex.indexOf(key);
		if(index == -1){
			toiIndex.push(key);
			this.set(this.timeoutitemKeyIndex, toiIndex);
		}
	},
	
	_updateTimeoutItems:function(items){
		this.set(this.timeoutitemKey, items);
	},
	
	_cachekeytimeoutListener:function(){
		this.isListener = true;
		this._handleTimeoutCacheKey();
	},
	
	_handleTimeoutCacheKey:function(){
		var _this = this;
		var toItems = _this._getTimeoutItems();
		console.info("timoutitem in cache: " + JSON.stringify(toItems));
		if(toItems.length > 0){
			var curTime = new Date().getTime();
			console.info("current time: "+curTime);
			for(var i = 0; i<toItems.length;){
				var toItem = toItems[i];
				if(toItem.expiredAt <= curTime){
					console.info("remove item: "+toItem.key);
					toItems.splice(i,1);
					_this.remove(toItem.key);
				}else{
					i++;
				}
			}
			_this._updateTimeoutItems(toItems);
		}else{
			_this._stopTimeoutListener();
		}
		
		/*this.timeoutListener = setTimeout(() => {
			_this._handleTimeoutCacheKey();
		}, 60*1000);*/
	},
	
	_stopTimeoutListener:function(){
		this.isListener = false;
		clearTimeout(this.timeoutListener);
		this.timeoutListener = null;
	}
};

try{
	define(function(){
		return Cache;
	});
}catch(e){
}