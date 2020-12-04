var baseData = {
	saveTime: 0.5, //数据缓存时的时间(单位:小时)
	xh : '', //用户信息
    setJsonLocalStorage:function(key,data){
    	var curTime = new Date().getTime();
    	data.time = curTime;
    	localStorage.setItem(key,JSON.stringify(data));
    },
    getJsonLocalStorage:function(key,exp){
    	if(arguments.length==1){
    		exp = this.saveTime*60*60*1000;  //默认过期时间
    	}
    	var data = localStorage.getItem(key);
        var dataObj = JSON.parse(data);
        if (data && (new Date().getTime() - dataObj.time)>exp) {
        	if(data){
        		return '';
        	}
        }else{
            return dataObj;
        }
    },
    removeJsonLocalStorage:function(key){
    	localStorage.removeItem(key);
    }
}