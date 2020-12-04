/**
 * Created by jinjuanjuan on 16/6/6.
 */
var  xhr  = {
    /**
     * 获取当前url查询字符串
     */
    init: function () {
        this._search = this.getUrlParams();
    },
    /**
     * 获取url中查询的值
     * @param key
     * @returns {*}
     */
    getSearch: function (key) {
        if (!this._search) this._search = this.getUrlParams();

        if (!key){
            return this._searchArgs;
        }
        return this._search[key];
    },
    /**
     * 返回当前 URL 的查询字串
     * @returns {*}
     */
    getUrlParams: function () {
        if (this._search) {
            return this._search;
        }
        var _s = window.location.search,
            attr = {};
        _s = decodeURI(_s);
        this._searchArgs = _s;
        if (_s.indexOf("?") >= 0) {
            _s = _s.substring(1);
            _s = Base64.decode(_s);
            var arry = _s.split("&");
            for (var i = 0; i < arry.length; i++) {
                var item = arry[i];
                attr[item.split("=")[0]] = item.split("=")[1];
            }
        }
        return attr;
    },
    /**
     * 数据请求出口 servlet
     * @param params
     * @param success
     */
    servletCall: function (url, params, success) {
        var code = '';
        if (params.param) {
            code = params.code;
            params.param = JSON.stringify(params.param);
        } else {
            params.param = "{}";
        }
        var data = {
            command: 'XGXT',
            //type: TYPE,
            customercode: CUSTOMERCODE || '',
            //openid: OPENID || '',
            param: params.param || ''
        };
        console.log("请求参数：");console.log(data);
        return $$.ajax({
            url: __config.servletHost + __config.servletPath + url,
            async: true,
            method: 'POST',
            data: data,
            dataType: 'json',
            //timeout: 40 * 1000,
            beforeSend: function () {
            },
            complete: function (a,b,c,d) {
            },
            success: function (result) {
            	console.log("响应参数："); console.log(result);
                if (result) {
                    if(typeof(result)=='string'){
                        try {
                            result = JSON.parse(result);
                        } catch (error) {
                            utils.alert("ERROR:" + result);
                            myApp.hideIndicator();
                            console.log("ERROR:" + error);
                        }
                    }
                    _d = {};
                    if(result.result === 0){
                        var resultData = result.data
                        if(typeof(resultData)=='string'){
                            try {
                                _d = JSON.parse(resultData);
                            } catch (error) {
                                //myApp.alert("ERROR:" + resultData); 
                                utils.alert(resultData); 
                                setTimeout("$.pgwModal('close')",1000);
                                myApp.hideIndicator();
                                console.log("ERROR:" + error);
                            }
                        }else if(typeof(resultData)=='object'){
                            _d = resultData;
                           // _d.result = 0;
                        }
                        _d.result = result.result;
                        success(_d);
                    }else{
                    	utils.alert(result.message+"(code:"+code+")");
                        myApp.hideIndicator();
                    }
                   /* _d.result = result.result;
                    success(_d);*/
                }
            },
            error: function (xhr, status) {
            	utils.alert("服务器异常,请稍后再试(code:"+code+")");
                myApp.hideIndicator();
            }
        })
    },
    
    /**
     * 数据请求出口 servlet(非f7框架请求)
     * @param params
     * @param success
     */
    servletCall2: function (url, params, success) {
        var code = '';
        if (params.param) {
            code = params.code;
            params.param = JSON.stringify(params.param);
        } else {
            params.param = "{}";
        }
        var data = {
            command: 'XGXT',
            //type: TYPE,
            customercode: CUSTOMERCODE || '',
            //openid: OPENID || '',
            param: params.param || ''
        };
        console.log("请求参数：");console.log(data);
        return $.ajax({
            url: __config.servletHost + __config.servletPath + url,
            async: true,
            method: 'POST',
            data: data,
            dataType: 'json',
            //timeout: 40 * 1000,
            beforeSend: function () {
            },
            complete: function (a,b,c,d) {
            },
            success: function (result) {
            	console.log("响应参数："); console.log(result);
                if (result) {
                    if(typeof(result)=='string'){
                        try {
                            result = JSON.parse(result);
                        } catch (error) {
                        	utils.alert("ERROR:" + result);
                           // myApp.hideIndicator();
                            console.log("ERROR:" + error);
                        }
                    }
                    if(result.result === 0){
                        var resultData = result.data,
                            _d = {};
                        if(typeof(resultData)=='string'){
                            try {
                                _d = JSON.parse(resultData);
                            } catch (error) {
                            	utils.alert("ERROR:" + resultData);
                                //myApp.hideIndicator();
                                console.log("ERROR:" + error);
                            }
                        }else if(typeof(resultData)=='object'){
                            _d = resultData;
                           // _d.result = 0;
                        }
                        _d.result = result.result;
                        _d.message = result.message;
                        success(_d);
                    }else{
                    	utils.alert(result.message+"(code:"+code+")");
                        //myApp.hideIndicator();
                    }
                   /* _d.result = result.result;
                    _d.message = result.message;
                    success(_d);*/
                }
            },
            error: function (xhr, status) {
            	utils.alert("服务器异常,请稍后再试(code:"+code+")");
                //myApp.hideIndicator();
            }
        })
    },
    /**
     * 登录
     * @param params
     * @param success
     */
    servletLogin: function (url, params, success) {
        var code = '';
        if (params.param) {
            code = params.code;
            params.param = JSON.stringify(params.param);
        } else {
            params.param = "{}";
        }
        var data = {
            param: params.param || ''
        };
        console.log("请求参数：");console.log(data);
        return $$.ajax({
            url: __config.servletHost + __config.servletPath + url,
            async: true,
            method: 'POST',
            data: data,
            dataType: 'json',
            //timeout: 40 * 1000,
            beforeSend: function () {
            },
            complete: function (a,b,c,d) {
            },
            success: function (result) {
            	console.log("响应参数："); console.log(result);
                if (result) {
                    if(typeof(result)=='string'){
                        try {
                            result = JSON.parse(result);
                        } catch (error) {
                            myApp.alert("ERROR:" + result);
                            myApp.hideIndicator();
                            console.log("ERROR:" + error);
                        }
                    }
                   // if(result.result === 0){
                        var resultData = result.data,
                            _d = {};
                        if(typeof(resultData)=='string'){
                            try {
                                _d = JSON.parse(resultData);
                            } catch (error) {
                                myApp.alert("ERROR:" + resultData);
                                myApp.hideIndicator();
                                console.log("ERROR:" + error);
                            }
                        }else if(typeof(resultData)=='object'){
                            _d = resultData;
                            _d.result = result.result;
                            _d.message = result.message;
                        }
                        success(_d);
                    /*}else{
                        myApp.hideIndicator();
                    }*/
                }
            },
            error: function (xhr, status) {
                utils.alert("服务器异常,请稍后再试(code:"+code+")");
                myApp.hideIndicator();
            }
        })
    },
    servletCallWjSearch:function (url, params, success) {
        var code = '';
        if (params.param) {
            code = params.code;
            params.param = JSON.stringify(params.param);
        } else {
            params.param = "{}";
        }
        var data = {
            command: 'XGXT',
           // type: TYPE,
            customercode: CUSTOMERCODE || '',
            //openid: OPENID || '',
            param: params.param || ''
        };
        console.log("请求参数：");console.log(data);
        return $$.ajax({
//        	 url:url,
            url: __config.servletHost + __config.servletPath + url,
            async: true,
            method: 'POST',
            data: data,
            dataType: 'json',
            //timeout: 40 * 1000,
            beforeSend: function () {
            },
            complete: function (a,b,c,d) {
            },
            success: function (result) {
                console.log("响应参数："); console.log(result);
                if (result) {
                    if(typeof(result)=='string'){
                        try {
                            result = JSON.parse(result);
                        } catch (error) {
                            myApp.alert("ERROR:" + result);
                            myApp.hideIndicator();
                            console.log("ERROR:" + error);
                        }
                    }
                    var _d = {};
                    if(result.data != "" &&result.data !=null){
                        var resultData = result.data;
                        //if(typeof(resultData)=='string'){
                            try {
                                _d.data = resultData;
                                _d.result = result.result;
                                _d.message = result.message;
                            } catch (error) {
                                myApp.alert("ERROR:" + resultData);
                                myApp.hideIndicator();
                                console.log("ERROR:" + error);
                            }
                        /*}else if(typeof(resultData)=='object'){
                            _d.data = resultData;
                            _d.result = result.result;
                            _d.message = result.message;
                        }
*/                        
                    }else{
                    	_d.result = result.result;
                        _d.message = result.message;
                        myApp.hideIndicator();
                    }
                    success(_d);
                }
            },
            error: function (xhr, status) {
                myApp.alert("服务器异常,请稍后再试(code:"+code+")");
                myApp.hideIndicator();
            }
        })
    },
    servletCallWX:function (url, params, success) {
        var code = '';
        if (params.param) {
            code = params.code;
            params.param = JSON.stringify(params.param);
        } else {
            params.param = "{}";
        }
        var data = {
            command: 'XGXT',
            //type: TYPE,
            customercode: CUSTOMERCODE || '',
            //openid: OPENID || '',
            param: params.param || ''
        };
        console.log("请求参数：");console.log(data);
        return $$.ajax({
//        	 url:url,
            url: __config.servletHost + __config.servletPath + url,
            async: true,
            method: 'POST',
            data: data,
            dataType: 'json',
            //timeout: 40 * 1000,
            beforeSend: function () {
            },
            complete: function (a,b,c,d) {
            },
            success: function (result) {
                console.log("响应参数："); console.log(result);
                if (result) {
                    if(typeof(result)=='string'){
                        try {
                            result = JSON.parse(result);
                        } catch (error) {
                            myApp.alert("ERROR:" + result);
                            myApp.hideIndicator();
                            console.log("ERROR:" + error);
                        }
                    }
                    if(result.code === 0){
                        success(result);
                    } else {//玩校异常
                        myApp.alert(result.message+"(code:"+code+")");
                        myApp.hideIndicator();
                    }
                }
            },
            error: function (xhr, status) {
                myApp.alert("服务器异常,请稍后再试(code:"+code+")");
                myApp.hideIndicator();
            }
        })
    },

/**
     * 数据请求出口 servlet
     * @param params
     * @param success
     */
    servlet1Call: function (url, params, success) {
        var code = '';
        if (params.param) {
            code = params.code;
            params.param = JSON.stringify(params.param);
        } else {
            params.param = "{}";
        }
        var data = {
            command: 'XGXT',
            type: TYPE,
            customercode: CUSTOMERCODE || '',
            //openid: OPENID || '',
            param: params.param || ''
        };
        console.log("请求参数：");console.log(data);
        return $$.ajax({
            url:url,
//            url: __config.servletHost + __config.servletPath + url,
            async: true,
            method: 'POST',
            data: data,
            dataType: 'json',
            //timeout: 40 * 1000,
            beforeSend: function () {
            },
            complete: function (a,b,c,d) {
            },
            success: function (result) {
                 console.log("响应参数："); console.log(result);
                if (result) {
                    if(typeof(result)=='string'){
                        try {
                            result = JSON.parse(result);
                        } catch (error) {
                            myApp.alert("ERROR:" + result);
                            myApp.hideIndicator();
                            console.log("ERROR:" + error);
                        }
                    }
                    if(result.result == 0){
                        var resultBody = result.data,
                            d = {};
                        if (resultBody) {
                            if(typeof(resultBody)=='string'){
                                try {
                                    d = JSON.parse(resultBody);
                                } catch (error) {
                                    myApp.alert("ERROR:" + resultBody);
                                    myApp.hideIndicator();
                                    console.log("ERROR:" + error);
                                }
                            }else if(typeof(resultBody)=='object'){
                            	success(resultBody);
                            }
                        } else {//玩校未获取到数据
                            myApp.alert("未获取到数据(code:"+code+")");
                            myApp.hideIndicator();
                        }
                    } else {//玩校异常
                        myApp.alert(result.message_+"(code:"+code+")");
                        myApp.hideIndicator();
                    }
                }
            },
            error: function (xhr, status) {
                myApp.alert("服务器异常,请稍后再试(code:"+code+")");
                myApp.hideIndicator();
            }
        })
},
/**
 * 数据请求出口 servlet 图片专用
 * @param params
 * @param success
 */
servletPicCall: function (url, params, success) {
	var code = '';
	if (params.param) {
		code = params.code;
		params.param = JSON.stringify(params.param);
	} else {
		params.param = "{}";
	}
	var data = {
			command: 'XGXT',
			customercode: CUSTOMERCODE || '',
			param: params.param || ''
	};
	console.log("请求参数：");console.log(data);
	return $$.ajax({
		url: __config.servletHost + __config.servletPath + url,
		async: true,
		method: 'POST',
		data: data,
		dataType: 'json',
		timeout: 5* 60 * 1000,
		beforeSend: function () {
		},
		complete: function (a,b,c,d) {
		},
		success: function (result) {
        	console.log("响应参数："); console.log(result);
            if (result) {
                if(typeof(result)=='string'){
                    try {
                        result = JSON.parse(result);
                    } catch (error) {
                        myApp.alert("ERROR:" + result);
                        myApp.hideIndicator();
                        console.log("ERROR:" + error);
                    }
                }
                if(result.result === 0){
                    var resultData = result.data,
                        _d = {};
                    if(typeof(resultData)=='string'){
                        try {
                            _d = JSON.parse(resultData);
                        } catch (error) {
                            myApp.alert("ERROR:" + resultData);
                            myApp.hideIndicator();
                            console.log("ERROR:" + error);
                        }
                    }else if(typeof(resultData)=='object'){
                        _d = resultData;
                    }
                    success(_d);
                }else{
                    myApp.alert(result.message+"(code:"+code+")");
                    myApp.hideIndicator();
                }
            }
        },
		error: function (xhr, status) {
			//myApp.alert("服务器异常,请稍后再试(code:"+code+")");
			myApp.hideIndicator();
		}
	})
}
};
xhr.init();
//window.XH = xhr.getSearch("xh");
window.CUSTOMERCODE = xhr.getSearch("customerCode");
//window.OPENID = xhr.getSearch("openid");
/*window.OPENID= decodeURIComponent(xhr.getSearch("openid"));*/
/*window.TYPE = xhr.getSearch("type");*/
window.IS_LANTU = false;
var customerName = xhr.getSearch("customerName");
window.customerName= decodeURIComponent(customerName);