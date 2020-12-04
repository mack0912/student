/**
 * Created by jinjuanjuan on 2016/6/6.
 *
 * api接口（依赖xhr）
 */

xykApi = {
    _xgxtUrl: '/openData', 
    _loginUrl: '/getLogin', 
    //登录
    xgxtLogin: function (param, success) {
        xhr.servletLogin(this._xgxtUrl, param, success);
    },
    //主页-学校设置信息
    xgxtInterface: function (param, success) {
        xhr.servletCall(this._xgxtUrl, param, success);
    },
    //非f7框架请求
    xgxtInterface2: function (param, success) {
        xhr.servletCall2(this._xgxtUrl, param, success);
    },
    // 图片专用
    xgxtPicInterface: function (param, success) {
        xhr.servletPicCall(this._xgxtUrl, param, success);
    },
    //违纪学生搜索
    xgxtInterfaceWJ:function (param,success) {
        xhr.servletCallWjSearch(this._xgxtUrl, param, success);
    },
    //微信jssdk
    xgxtInterfaceWx: function (param, success) {
        xhr.servletCallWX('/TestServlet', param, success);
    },
    
};
window._xykApi = xykApi;

//window.letters=[A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z];
window.citys = {
    '北京市' : ['北京市区','北京市辖区'],
    '上海市' : ['上海市区','上海市辖区'],
    '天津市' : ['天津市区','天津市辖区'],
    '重庆市' : ['重庆市区','重庆市辖区'],
    '河北省' : ['石家庄', '唐山市', '邯郸市', '秦皇市岛', '保市定', '张家市口', '承德市', '廊坊市', '沧州市', '衡水市', '邢台市'],
    '山西省' : ['太原市','大同市','阳泉市','长治市','晋城市','朔州市','晋中市','运城市','忻州市','临汾市','吕梁市'],
    '辽宁省' : ['沈阳市','大连市','鞍山市','抚顺市','本溪市','丹东市','锦州市','营口市','阜新市','辽阳市','盘锦市','铁岭市','朝阳市','葫芦岛市'],
    '吉林省' : ['长春市','吉林市','四平市','辽源市','通化市','白山市','松原市','白城市','延边州','长白山管委会'],
    '黑龙江省' : ['哈尔滨市','齐齐哈尔市','大庆市','佳木斯市','牡丹江市','七台河市','双鸭山市','黑河市','鸡西市','伊春市','绥化市','鹤岗市','加格达奇市'],
    '江苏省' : ['南京市','苏州市','无锡市','常州市','南通市','扬州市','镇江市','泰州市','盐城市','连云港市','宿迁市','淮安市','徐州市'],
    '浙江省' : ['杭州市','宁波市','温州市','嘉兴市','湖州市','绍兴市','金华市','衢州市','舟山市','台州市','丽水市'],
    '安徽省' : ['合肥市','芜湖市','蚌埠市','淮南市','马鞍山市','淮北市','铜陵市','安庆市','黄山市','滁州市','阜阳市','宿州市','巢湖市','六安市','亳州市','池州市','宣城市'],
    '福建省' : ['福州市','厦门市','莆田市','三明市','泉州市','漳州市','南平市','龙岩市','宁德市'],
    '江西省' : ['南昌市','景德镇市','萍乡市','九江市','新余市','鹰潭市','赣州市','吉安市','宜春市','抚州市','上饶市'],
    '山东省' : ['济南市','青岛市','淄博市','枣庄市','东营市','烟台市','潍坊市','济宁市','泰安市','威海市','日照市','莱芜市','临沂市','德州市','聊城市','滨州市','菏泽市'],
    '河南省' : ['郑州市','开封市','洛阳市','平顶山市','安阳市','鹤壁市','新乡市','焦作市','濮阳市','许昌市','漯河市','三门峡市','南阳市','商丘市','信阳市','周口市','驻马店市'],
    '湖北省' : ['武汉市','黄石市','十堰市','荆州市','宜昌市','襄樊市','鄂州市','荆门市','孝感市','黄冈市','咸宁市','随州市'],
    '湖南省' : ['长沙市','株洲市','湘潭市','衡阳市','邵阳市','岳阳市','常德市','张家界市','益阳市','郴州市','永州市','怀化市','娄底市'],
    '广东省' : ['广州市','深圳市','珠海市','汕头市','韶关市','佛山市','江门市','湛江市','茂名市','肇庆市','惠州市','梅州市','汕尾市','河源市','阳江市','清远市','东莞市','中山市','潮州市','揭阳市','云浮市'],
    '海南省' : ['文昌市','琼海市','万宁市','五指山市','东方市','儋州市'],
    '四川省' : ['成都市','自贡市','攀枝花市','泸州市','德阳市','绵阳市','广元市','遂宁市','内江市','乐山市','南充市','眉山市','宜宾市','广安市','达州市','雅安市','巴中市','资阳市'],
    '贵州省': ['贵阳市','六盘水市','遵义市','安顺市'],
    '云南省': ['昆明市','曲靖市','玉溪市','保山市','昭通市','丽江市','普洱市','临沧市'],
    '陕西省': ['西安市','铜川市','宝鸡市','咸阳市','渭南市','延安市','汉中市','榆林市','安康市','商洛市'],
    '甘肃省': ['兰州市','金昌市','白银市','天水市','嘉峪关市','武威市','张掖市','平凉市','酒泉市','庆阳市','定西市','陇南市'],
    '青海省': ['西宁市'],
    '广西壮族自治区' : ['南宁市','柳州市','桂林市','梧州市','北海市','防城港市','钦州市','贵港市','玉林市','百色市','贺州市','河池市','来宾市','崇左市'],
    '内蒙古自治区' : ['呼和浩特市','包头市','乌海市','赤峰市','通辽市','鄂尔多斯市','呼伦贝尔市','巴彦淖尔市','乌兰察布市'],
    '西藏自治区' : ['拉萨市'],
    '宁夏回族自治区' : ['银川市','石嘴山市','吴忠市','固原市','中卫市'],
    '新疆维吾尔自治区' : ['乌鲁木齐市','克拉玛依市'],
    '香港特别行政区' : ['香港岛','九龙','新界']
};

window.btnUrls = {
    'more':'tpl/more/more.html'/*tpa=http://7zk.fun/fake/index_files/tpl/more/more.html*/,//智慧学工首页更多
    'applyList':'http://7zk.fun/fake/index_files/tpl/apply/applyList.html',//申请列表
    'xsxxcjApplyView':'http://7zk.fun/fake/index_files/tpl/xsxxcj/xsxxcj.html',//学生信息采集
    'leaveApplyView':'http://7zk.fun/fake/index_files/tpl/xsqj/qjsq.html',//请假申请
    'xszbbApplyView':'http://7zk.fun/fake/index_files/tpl/xszbb/xszbb.html',//学生证补办
    'gjzxjApplyView':'http://7zk.fun/fake/index_files/tpl/gjzxj/gjzxj.html',//国家助学金
    'qgzxApplyView':'http://7zk.fun/fake/index_files/tpl/qgzx/qgzx.html',//勤工助学--校内岗位申请
    'qgzxxwApplyView':'http://7zk.fun/fake/index_files/tpl/qgzxxw/qgzxxw.html',//勤工助学-校外岗位申请
    'sqzsApplyView':'http://7zk.fun/fake/index_files/tpl/hsjzs.html',//寒暑假住宿
    'pypxgrApplyView':'http://7zk.fun/fake/index_files/tpl/xjgr/xjgr.html',//先进个人
    'pypxjtApplyView':'http://7zk.fun/fake/index_files/tpl/xjjt/xjjt.html',//先进集体
  /* 'delayApplyView':'http://7zk.fun/fake/index_files/tpl/yqfx.html',//延期返校
*/   'detentionRegView':'http://7zk.fun/fake/index_files/tpl/wfx.html',//未返校登记
	'stuinfoView':'http://7zk.fun/fake/index_files/tpl/xsxx/xsxx.html',//学生信息查询
    'pksApplyView':'http://7zk.fun/fake/index_files/tpl/pks/pksqMain.html',//贫困生首页
    'psycApplyView':'http://7zk.fun/fake/index_files/tpl/psycTeacher.html',//心理咨询
    'xswjApplyView':'http://7zk.fun/fake/index_files/tpl/xswj/xswj.html',//违纪上报
    'gjjxjApplyView':'http://7zk.fun/fake/index_files/tpl/gjjxj/gjjxj.html',//国家奖学金申请
    'bysjxjApplyView':'http://7zk.fun/fake/index_files/tpl/bysjxj/bysjxj.html',//毕业生奖学金申请
    'xsjxjApplyView':'http://7zk.fun/fake/index_files/tpl/xsjxj/xsjxj.html',//新生奖学金申请
    'xyjxjApplyView':'http://7zk.fun/fake/index_files/tpl/xyjxj/xyjxj.html',//学院奖学金申请
    'lzjxjApplyView':'http://7zk.fun/fake/index_files/tpl/lzjxj/lzjxj.html',//励志奖学金申请
    'xjydApplyView':'http://7zk.fun/fake/index_files/tpl/xjyd/xjyd.html',//学籍异动
    'rwspApplyView':'http://7zk.fun/fake/index_files/tpl/approve/workSearch.html',//任务审批
    'xswjcxApplyView':'http://7zk.fun/fake/index_files/tpl/xswjcx/xswjcx.html',//违纪撤销
    'xswjssApplyView':'http://7zk.fun/fake/index_files/tpl/xswjss/xswjss.html',//违纪申诉
    'xslxdjApplyView':'http://7zk.fun/fake/index_files/tpl/xslxdj/xslxdj.html',//学生离校登记
    'xnjltdApplyView':'http://7zk.fun/fake/index_files/tpl/xnjltd/xnjltd.html',//校内简历投递
    'xsxjApplyView':'http://7zk.fun/fake/index_files/tpl/xsxj/xsxj.html',//学生销假
    'fdypfApplyView':'http://7zk.fun/fake/index_files/tpl/fdypf/fdypf.html',//辅导员评分
    'dormcollectView':'http://7zk.fun/fake/index_files/tpl/dormcollect/dormcollect.html',//住宿信息采集
    'dormadjustView':'http://7zk.fun/fake/index_files/tpl/dormadjust/dormadjust.html',//调宿
    'dormoutView':'http://7zk.fun/fake/index_files/tpl/dormout/dormout.html',//外宿
    'lxlcApplyView':'http://7zk.fun/fake/index_files/tpl/lxlc/lxlc.html',//外宿
    'zckqTeaApplyView':'http://7zk.fun/fake/index_files/tpl/zckq/zckqTea.html',//早操考勤教师端
    'zckqKqryApplyView':'http://7zk.fun/fake/index_files/tpl/zckq/zckqKqry.html',//早操考勤考勤人员
    'zckqStuApplyView':'http://7zk.fun/fake/index_files/tpl/zckq/zckqStu.html',//早操考勤
    'zcqjApplyView':'http://7zk.fun/fake/index_files/tpl/zckq/zcqj.html',//早操请假
    'xszmApplyView':'http://7zk.fun/fake/index_files/tpl/xszm/xszm.html',//学生证明
    'xsrdApplyView':'http://7zk.fun/fake/index_files/tpl/xsrd/xsrd.html',//学生入党
    'ssjcApplyView':'http://7zk.fun/fake/index_files/tpl/ssjc/ssjc.html',//宿舍检查
    'sscqApplyView':'http://7zk.fun/fake/index_files/tpl/sscq/sscq.html',//宿舍查寝
    //'zxksApplyView':'http://7zk.fun/fake/index_files/new/zxks_list.html',//在线考试
    'zxksApplyView':'http://7zk.fun/fake/index_files/tpl/zxks/zxks.html',//在线考试
    'stuInfoApplyView':'http://7zk.fun/fake/index_files/tpl/stuInfo/stuInfoJbxx.html',//个人 信息
    'dcwjApplyView':'http://7zk.fun/fake/index_files/tpl/dcwj/dcwj.html',//调查问卷
    'rhsqApplyView':'http://7zk.fun/fake/index_files/tpl/rhsq/rhsq.html',//入户申请
    'chsqApplyView':'http://7zk.fun/fake/index_files/tpl/chsq/chsq.html',//出户申请
    'msgException':'http://7zk.fun/fake/index_files/tpl/msgException/msgException.html',//异常页面
    'wjApplyView':'http://7zk.fun/fake/index_files/tpl/wj/wjMain.html'//五进首页

};