/**
 * Created by lpp on 2016/12/22.
 * 各个环境部署时，检查currentMode的值是否正确
 * window.__currentMode = 0；为正式环境地址 
 * window.__currentMode = 1；为公测环境地址 
 * window.__currentMode = 2；为本地调试地址
 * SVN中上传代码时，currentMode的值固定为0，不能修改
 * servletHost:现场配置访问地址，端口
 * 所有涉及多个环境的地址，都按照以上0，1，2三种区分
 * version为整个H5的版本，引用tpl时用到
 */

window.__currentMode = 0;
window.__config = {
    servletHost: ['http://yx.gzgs.edu.cn/', 'http://zhou.17wanxiao.com/', ''][__currentMode],
    //servletHost: ['http://localhost:8080/', 'http://zhou.17wanxiao.com/', ''][__currentMode],
    servletPath: '/xgh5',
    version: '2016122200001',
    versioncode:'10326003',
    versionname:'3.2.0',
    appcode:'H5',
    date:'20180312',
};