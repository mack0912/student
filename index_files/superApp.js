function setupWebViewJavascriptBridgeIOS(callback) {
		
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = '../../../__bridge_loaded__/index.htm'/*tpa=https://__bridge_loaded__/*/;
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}

function setupWebViewJavascriptBridgeAZ(callback) {
	if(window.WebViewJavascriptBridge) {
		return callback(WebViewJavascriptBridge);
	}
	if(window.WVJBCallbacks) {
		return window.WVJBCallbacks.push(callback);
	}
	window.WVJBCallbacks = [callback];
	var WVJBIframe = document.createElement('iframe');
	WVJBIframe.style.display = 'none';
	//这里最新IOS版是 https的scheme，真实环境下 需要判断iOS和Android，做下区分。
	//WVJBIframe.src = 'wvjbscheme://BRIDGE_LOADED';
	WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
	document.documentElement.appendChild(WVJBIframe);
	setTimeout(function() {
		document.documentElement.removeChild(WVJBIframe)
	}, 0);	
}


var bridge;
/*setupWebViewJavascriptBridge (function(webViewJavascriptBridge) {
	bridge = webViewJavascriptBridge;
	//alert(bridge);
});*/
/*
 * 初始化
 */
function bridgeInit(){
	var ua = navigator.userAgent;//获取判断用的对象
    var isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1 || ua.indexOf('android') > -1; //android终端
    var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	//ios 调用
	if(isiOS){
		setupWebViewJavascriptBridgeIOS (function(webViewJavascriptBridge) {
			bridge = webViewJavascriptBridge;
		});
	}
	if(isAndroid){
		//安卓调用
		setupWebViewJavascriptBridgeAZ (function(webViewJavascriptBridge) {
			bridge = webViewJavascriptBridge;
		});
	}
}



var isSuperApp = false;//是否与超级app对接
