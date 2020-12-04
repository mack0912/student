/**
 * Created by znsw007 on 2015/12/17.
 */

(function(Framework7,T7,$$){
    'use strict';

    //货币格式化
    function  _currency(value){
        var f1 = value;
        var f2 = (Math.round((f1-0) * 100)) / 100;
        f2 = Math.floor(f2) == f2 ? f2 + ".00" : (Math.floor(f2 * 10) == f2 * 10) ? f2 + '0' : f2;
        f2 = String(f2);
        var r = /(\d+)(\d{3})/;
        var fs = String(f2);
        while (r.test(f2)) {
            f2 = f2.replace(r, '$1' + ',' + '$2');
        }
        return f2;
    }
    T7.registerHelper('currency',function(value){
        return _currency(value);
    });

    //审核状态格式化
    function _state(value) {
        var cla = "";
        if (value == "ING") {
            cla = "btn-shz";
        }
        if (value == "FINISH"){
            cla = "btn-shtg";
        }
        if (value == "BACK"){
            cla = "btn-bh";
        }
        return cla;
    }
    T7.registerHelper('state', function (value) {
        return _state(value);
    });

    T7.registerHelper('ztx_imgUrl', function(picUrl){
        if(picUrl.trim() == "" || picUrl == 'undefined'){
            return "img/test-photo.png"/*tpa=http://7zk.fun/fake/index_files/img/test-photo.png*/
        }
        return picUrl;
    });

    T7.registerHelper('home_espaceHtml', function(array){
        if(array && array.length>0){
            var i = array.length% 4,
                html='';
            for(var j=0;j<4-i;j++){
                html=html+'<div class="col-25 home-panel"></div>';
            }
            return html;
        }
        return "";
    });

    T7.registerHelper('sqzt_statusLine', function(data){
        if (data.submitTimeS && data.common){
            return 'line2';
        }
        return 'line1';
    });

    T7.registerHelper('sqzt_last_statusLine', function(data){
        if (data.submitTimeS && data.common){
            return 'line2';
        } else if(!data.submitTimeS && !data.common){
            return '';
        }
        return 'line1';
    });

    T7.registerHelper('sqzt_statusHtml', function(status){
        if(status == 'ING'){
            return '<div class="status-img-ing"><div></div></div>';
        }
        return '<img class="status-img" src="img/icon_sqzt_'+status.toLowerCase()+'.png">';
    });

    T7.registerHelper('toLowerCase', function (str) {
        return str.toLowerCase();
    });

    window._currency = _currency;
    window._state = _state;

    /**
     * 解决操作安卓自带后台按钮 页面弹窗无法关闭的问题
     */
//    window.addEventListener("hashchange", function(){
//        var $el = $$("#dialogWrapBox");
//        $el && $el.remove();
//        myApp.closeModal(".popover-links-point");
//    });

    /**
     * 使用f7需创建对象 设置成全局
     */
    var myApp = new Framework7({
    	animatePages:false,
        animateNavBackIcon: true,
        template7Pages: true,
        modalButtonOk:'确定',
        modalButtonCancel:'取消',
        cache:false,
        scroller:"auto",
        modalTitle:"",
        pushState:true
    });
    window.myApp = myApp;
    window.$$ = Dom7;
    window.T7 = Template7;
})(Framework7,Template7,Dom7);
