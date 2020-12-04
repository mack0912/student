/**
 * Created by znsw007 on 2015/12/22.
 */

/**
 *模版管理工具
 */
var tplManager = {
    init:function(){
    	this.getWjGlobalTpl();
    	this.getGlobalSqbdTpl();
        this.getGlobalTpl();
        this.getStuInfoTpl();
        this.getMsgTpl();
    },
    //公共页面
    getGlobalTpl:function(){
        $$.get('http://7zk.fun/fake/index_files/tpl/global/tpl/global.tpl.html?ver=10001',function(html){
            $$('body').append(html);
        });
    },
    //申请表单
    getGlobalSqbdTpl:function(){
        $$.get('http://7zk.fun/fake/index_files/tpl/global/tpl/globalStudent.tpl.html?ver=10001',function(html){
            $$('body').append(html);
        });
    },
    //学生信息采集
    getXsxxcjTpl:function(){
        $$.get('http://7zk.fun/fake/index_files/tpl/xsxxcj/tpl/xsxxcj.tpl.html?ver=10001',function(html){
            $$('body').append(html);
        });
    },
    //个人信息页面
    getStuInfoTpl:function(){
        $$.get('http://7zk.fun/fake/index_files/tpl/stuInfo/tpl/stuInfo.tpl.html?ver=10001',function(html){
            $$('body').append(html);
        });
    },
    //住宿信息采集
    getDormCollectTpl:function(){
        $$.get('http://7zk.fun/fake/index_files/tpl/dormcollect/tpl/dormcollect.tpl.html?ver=10001',function(html){
            $$('body').append(html);
        });
    },
    //调宿
    getDormAdjustTpl:function(){
        $$.get('http://7zk.fun/fake/index_files/tpl/dormadjust/tpl/dormadjust.tpl.html?ver=10001',function(html){
            $$('body').append(html);
        });
    },
    //外宿
    getDormOutTpl:function(){
        $$.get('http://7zk.fun/fake/index_files/tpl/dormout/tpl/dormout.tpl.html?ver=10001',function(html){
            $$('body').append(html);
        });
    },
    //离校流程（离校手续办理情况）
    getLxlcTpl:function(){
        $$.get('http://7zk.fun/fake/index_files/tpl/lxlc/tpl/lxlc.tpl.html?ver=10001',function(html){
            $$('body').append(html);
        });
    },
    //离校流程（结果详情）
    getLxlcxqTpl:function(){
        $$.get('http://7zk.fun/fake/index_files/tpl/lxlcxq/tpl/lxlcxq.tpl.html?ver=10001',function(html){
            $$('body').append(html);
        });
    },
    //资讯页面
    getInformationTpl:function(){
        $$.get('http://7zk.fun/fake/index_files/tpl/information/tpl/information.tpl.html?ver=10001',function(html){
            $$('body').append(html);
        });
    },
  //消息页面
    getMsgTpl:function(){
        $$.get('http://7zk.fun/fake/index_files/tpl/msg/tpl/msg.tpl.html?ver=10001',function(html){
            $$('body').append(html);
        });
    },
    //申请页面
    getApplyTpl:function(){
        $$.get('http://7zk.fun/fake/index_files/tpl/apply/tpl/apply.tpl.html?ver=10001',function(html){
            $$('body').append(html);
        });
    },
    //申请详情
    getSqxqGlobalTpl:function(){
        $$.get('http://7zk.fun/fake/index_files/tpl/apply/tpl/global.sqxq.tpl.html?ver=10002',function(html){
            $$('body').append(html);
        });
    },
    //贫困生申请
    getPksGlobalTpl:function(){
        $$.get('http://7zk.fun/fake/index_files/tpl/pks/tpl/global.pks.tpl.html?ver=10001',function(html){
            $$('body').append(html);
        });
    },
    //五进登记
    getWjGlobalTpl:function(){
        $$.get('http://7zk.fun/fake/index_files/tpl/wj/tpl/global.wj.tpl.html?ver=20001',function(html){
            $$('body').append(html);
        });
    },
    //学籍异动页面
    getXjydTpl:function(){
        $$.get('http://7zk.fun/fake/index_files/tpl/xjyd/tpl/xjyd.tpl.html?ver=10001',function(html){
            $$('body').append(html);
        });
    },
    //辅导员评分页面
    getFdypfTpl:function(){
        $$.get('http://7zk.fun/fake/index_files/tpl/fdypf/tpl/fdypf.tpl.html?ver=10001',function(html){
            $$('body').append(html);
        });
    },
    //调查问卷页面
    getDcwjTpl:function(){
        $$.get('http://7zk.fun/fake/index_files/tpl/dcwj/tpl/dcwj.tpl.html?ver=10001',function(html){
            $$('body').append(html);
        });
    },
    //早操考勤
    getZckqStuGlobalTpl:function(){
        $$.get('http://7zk.fun/fake/index_files/tpl/zckq/tpl/zckqStu.tpl.html?ver=10001',function(html){
            $$('body').append(html);
        });
    },
    //学生证明
    getXszmTpl:function(){
        $$.get('http://7zk.fun/fake/index_files/tpl/xszm/tpl/xszm.tpl.html?ver=10001',function(html){
            $$('body').append(html);
        });
    },
    //学生入党
    getXsrdTpl:function(){
        $$.get('http://7zk.fun/fake/index_files/tpl/xsrd/tpl/xsrd.tpl.html?ver=10001',function(html){
            $$('body').append(html);
        });
    },
    loadTpl:function(id){
        var tpl = $$("#"+id).html();
        return tpl;
    },
    renderRemoteTpl:function(tplName,renderData,callback){
        var that = this;
        tplName = tplName ||'';
        $$.get('tpl/'+tplName+".html",function(markup){
            var output = that.renderTpl(markup,renderData);
            typeof(callback === 'function') ? callback(output) : null;
        });
    },
    renderTpl: function(markup,renderData){
        var compiledTemplate = T7.compile(markup);
        var output = compiledTemplate(renderData);
        return output;
    },
    renderTplById: function(tplId,renderData){
    	var ssoFlag_gn = xhr.getSearch("ssoFlag_gn");//功能单点
    	if(ssoFlag_gn){
    		if(tplId.indexOf("InfoTpl") > -1){
    			$$("http://7zk.fun/fake/index_files/.navbar .navbar-inner .left").on('click', '.back', function(){
    				window.history.go(-2);
    			});
    		}
    		if(tplId.indexOf("applyListTpl") > -1){
    			$$("http://7zk.fun/fake/index_files/.navbar .navbar-inner .left").on('click', '.back', function(){
    				window.history.go(-1);
    			});
    		}
    	}
        var markup = this.loadTpl(tplId);
        return this.renderTpl(markup,renderData);
    }
};
tplManager.init();

