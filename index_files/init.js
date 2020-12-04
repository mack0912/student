(function (Framework7, $$, T7, xykApi, myApp) {

	var mainView = myApp.addView('#mainView', {
        dynamicNavbar: true,
        domCache: true
    });

    $$(document).on('pageBack', function (e) {
        if ($$('.picker-modal.modal-in').length > 0) {
            myApp.closeModal($$('.picker-modal.modal-in'));
        }
        var pageName = e.detail.page.name;
        if(pageName=="kqryQdList" || pageName=="qdSetList"){
    		zckqKqry.getZckqKqryForm("rwm");
        }
    });

    $$(document).on('pageBeforeInit', function (e) {
        var page = e.detail.page;
        pageBeforeInit(page);
    });

    $$(document).on('pageBeforeAnimation', function (e) {
        var page = e.detail.page;
        pageBeforeAnimation(page);
    });

    $$(document).on('pageAfterAnimation', function (e) {
        var page = e.detail.page;
        pageAfterAnimation(page);
    });
    //$$('div.navbar').removeClass('navbar-hidden');
    //$$('div.navbar').addClass('navbar-hidden');
    $$('div.pages').removeClass('navbar-through');
    //本地存储数据key
    var lsKey = {
        yhzzQ:"YHZZ",
        jzzzQ:"JZZZ",
        jztyQ:"JZTY",
        knlbQ:"KNLB",
    };
    //本地数据
    var localData = {
        Thzz:myApp.ls.getItem(lsKey.yhzzQ),
        Jzzz:myApp.ls.getItem(lsKey.jzzzQ),
        Jzty:myApp.ls.getItem(lsKey.jztyQ),
        Kzlb:myApp.ls.getItem(lsKey.knlbQ)
    };
    //首页
    var home = {
        init: function (opt) {
            var that = this;
            if(opt.bindEventFlag){
                weiXinAndWx.init();
            };
            var btnCode = xhr.getSearch("btnCode");//通过路径直接访问功能表单
            if (btnCode == undefined || btnCode == "" || btnCode == null) {
            	this.getIconData(opt.bindEventFlag);
            }else{
            	if ("activityApplyView" == btnCode) {
					var xhM = Base64.encode("xh="+XH);//加密
		    	 	window.location.href='http://7zk.fun/fake/index_files/new/active_index.html?'+xhM;
				}else if ("xswjApplyView" == btnCode) {
					utils.alert("你无权访问该功能");
				}else {
					checkApply.init(btnCode);
					//bridge.callHandler('setnavbar',{'navbarhidden':true}, function responseCallback() {
					//})
				};
				this.getIconData(opt.bindEventFlag);
            };
            utils.loadJs('https://appx/web-view.min.js');
        },
        /**
         * 获取图标数据
         */
        getIconData: function(bindEventFlag){
            var that = this;
            var params = {
                code: '2113',
                param: {
                    "cmd": "homeApplyView",
                    "xh": XH
                    //"type": "1"
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                if(result){
                    that.renderPanel(result,bindEventFlag,that);
                }
                myApp.hideIndicator();
            });
        },
        renderPanel: function(result,bindEventFlag,that){
        	if (bindEventFlag) {
        		$$.get('http://7zk.fun/fake/index_files/tpl/home/tpl/home.tpl.html?ver=1235',function(html){
                    $$('body').append(html);
                    var $applyOuterBox = $$("#homeBox");
                    if(result.btnList.length <= 12){
                    	var data = {
                    		btnList:result.btnList,
                    		hdxxList:result.hdxxList,
                    		sfyhd:result.sfyhd,
                            msgList:result.msgList,
                            msgNoRead:result.msgNoRead,
                            hasMore:false
                        };
                    	var homeHtml = tplManager.renderTplById('homeTpl', data);
                        $applyOuterBox.html(homeHtml);
                    } else {
                        var data = {
                        	btnList:result.btnList.slice(0,11),
                        	hdxxList:result.hdxxList,
                        	sfyhd:result.sfyhd,
                            msgList:result.msgList,
                            msgNoRead:result.msgNoRead,
                            hasMore:true
                        };
                        var homeHtml = tplManager.renderTplById('homeTpl', data);
                        $applyOuterBox.html(homeHtml);
                    }
                    $$("#gf").find("#msgNoRead").html(data.msgNoRead);//未读消息
                    if (data.msgNoRead != 0) {
                    	$$("#gf").find("#msgNoRead")[0].style.display = '';//未读消息
					}
                    
                    swiper();//主页活动图片动态样式方法
                    
                    //等待主页模板加载完毕后,在加载这个js文件
                    utils.loadJs('../common/js/new/common.min.js'/*tpa=http://7zk.fun/fake/common/js/new/common.min.js*/);
                    
                 	that.bindEventPanel();
                 	
                 	$$(".gp-home").find('.part3').on('click', 'a', function(){//绑定消息时间
                		var pkey = $$(this).find('#pkey').val();
                		if(pkey){
                            mainView.router.load({
                                url:"http://7zk.fun/fake/index_files/tpl/msg/msgDetail.html",
                                context: {
                                	pkey: pkey,
                                    cmd: "msgDetail",
                                    type: "home"
                                }
                            });
                        }/*else{
                            utils.alert("该消息暂无法查看");
                            return false;
                        }*/
                	})
                });
			}else{
				var $applyOuterBox = $$("#homeBox");
				if(result.btnList.length <= 12){
                	var data = {
                		btnList:result.btnList,
                		hdxxList:result.hdxxList,
                		sfyhd:result.sfyhd,
                        msgList:result.msgList,
                        msgNoRead:result.msgNoRead,
                        hasMore:false
                    };
                	var homeHtml = tplManager.renderTplById('homeTpl', data);
                    $applyOuterBox.html(homeHtml);
                } else {
                    var data = {
                    	btnList:result.btnList.slice(0,11),
                    	hdxxList:result.hdxxList,
                    	sfyhd:result.sfyhd,
                        msgList:result.msgList,
                        msgNoRead:result.msgNoRead,
                        hasMore:true
                    };
                    var homeHtml = tplManager.renderTplById('homeTpl', data);
                    $applyOuterBox.html(homeHtml);
                }
				$$("#gf").find("#msgNoRead").html(data.msgNoRead);//未读消息
				if (data.msgNoRead != 0) {
                	$$("#gf").find("#msgNoRead")[0].style.display = '';//未读消息
				}
				
				swiper();//主页活动图片动态样式方法
				
				$("script[src='../common/js/new/common.min.js'/*tpa=http://7zk.fun/fake/common/js/new/common.min.js*/]").remove();
				//等待主页模板加载完毕后,在加载这个js文件
				utils.loadJs('../common/js/new/common.min.js'/*tpa=http://7zk.fun/fake/common/js/new/common.min.js*/);
	            
	         	that.bindEventPanel();
	         	
	         	$$(".gp-home").find('.part3').on('click', 'a', function(){//绑定消息时间
            		var pkey = $$(this).find('#pkey').val();
            		if(pkey){
                        mainView.router.load({
                            url:"http://7zk.fun/fake/index_files/tpl/msg/msgDetail.html",
                            context: {
                            	pkey: pkey,
                                cmd: "msgDetail",
                                type: "home"
                            }
                        });
                    }else{
                        utils.alert("该消息暂无法查看");
                        return false;
                    }
            	})
			}
        },
        bindEventPanel: function(btnData){
            var $homeBox = $$('.gp-home'),that = this;
            $homeBox.find('.g-grid-c').on('click', '.g-block', function(){
                var code = $$(this).find('#code').val();
                if(code){
                	//myAppinView.router.loadPage(btnUrls[code]);
                    if(code == 'more'){
                        //跳转更多页面
                        mainView.router.loadPage(btnUrls[code]);
                    }else {
                        //Google Analytics统计
                        var name = $$(this).innerText;
                        //SaveSystemLog(customerName,'home||'+code+'',name,OPENID);
                        SaveSystemLog(customerName,'home||'+code+'',name);
                        //判断权限
                    	checkApply.init(code);
                    }
                }
            });
            $("#gf").off("click");//先解除绑定,避免重复触发
            $('#gf').on('click', '.g-block', function(){
                var code = $$(this).find('#code').val();
                var codeOld = "";
                var broLi = $('#gf').children();
				$$.each(broLi, function(index, value){
					if (value.className.indexOf("on") != -1) {
						value.className='g-block';
						codeOld = value.childNodes[1].value;
        			}
				});
                $$(this).addClass('on');
                if (code != codeOld) {//如果点击的不是已经显示的页面的图标
                	var name = $$(this).find('p').text();
                    //SaveSystemLog(customerName,'home||'+code+'',name,OPENID);
                    SaveSystemLog(customerName,'home||'+code+'',name);

                    pageBeforeFoot(code,"","","");
				}
            });
        }
    };
    
  //首页更多
    var more = {
        init: function () {
            this.getIconData();
            this.search();
        },
        getIconData: function(txt){
            var that = this;
            var params = {
                code: '2113',
                param: {
                    "cmd": "getServiceBtn",
                    "xh": XH,
                    "num": "",
                    "type": "more",
                    "btn_name": txt
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                if(result){
                	var data = {
                		btnList:result
                    };
                    that.render(data);
                    that.bindEvent();
                }
                myApp.hideIndicator();
            });
        },
        render: function(data){
            var html = tplManager.renderTplById('serviceBtnMoreTpl', data);
            $$('#moreBox').html(html);
            
            /*$("script[src='../common/js/new/common.min.js'/*tpa=http://7zk.fun/fake/common/js/new/common.min.js*/]").remove();
			//等待主页模板加载完毕后,在加载这个js文件
            utils.loadJs('../common/js/new/common.min.js'/*tpa=http://7zk.fun/fake/common/js/new/common.min.js*/);*/
        },
        search: function(){
        	var that = this;
            $$(".gp-allServices-body .g-search-box").on('keyup','input',function () {
                var txt = $$(this).val().trim();
                console.log(txt);
                that.getIconData(txt);
            });
        },
        bindEvent: function(){
            var $moreBox = $$('#moreBox');
            $moreBox.find('.g-grid-c').on('click', '.g-block', function(){
                var code = $$(this).find('#code').val();
                if(code){
                	//判断权限
                	checkApply.init(code);
                }
            });
        }
    };
    
  //权限判断
    var checkApply = {
        init: function (code) {
            this.getApply(code);
        },
        getApply: function(code){
        	var that = this;
            var params = {
                code: '2118',
                param: {
                    "cmd": 'checkApplyConditionInst',
                    "xh": XH,
                    "code": code
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    //是否允许申请，1：允许；0：未达标
                    if(result.allow=='1'){
                        //跳转流程页面
                    	if ("zxksApplyView" == code) {//在线考试
                        	var xhM = Base64.encode("xh="+XH);//加密
                        	window.location.href='http://7zk.fun/fake/index_files/new/zxks_list.html?'+xhM;
                        }else if ("xslxdjApplyView" == code) {
                    		 var params = {
       	           	             code: '20180829',
       	           	             param: {
       	           	                 "cmd": "Sffxdj"
       	           	                 
                   	             }
                   	         };
                   	         xykApi.xgxtInterface(params, function(result){
                   	             if(result){
                   	            	 if (result.jjrlx == null || result.jjrlx == "" || result.jjrlx == undefined) {
       	            	            	 utils.alert("没有要登记的节假日!");
       	            	            	 return false;
       	            	             }else{
       	            	            	mainView.router.loadPage(btnUrls[code]);
       	            	             }
                   	             }
                   	         })
                        }else if ("xswjssApplyView" == code) {
                			 var params = {
    	           	             code: '20190216',
    	           	             param: {
    	           	                 "cmd": "sfwjss",
    	           	                "xh": XH
                	             }
                	         };
                	         xykApi.xgxtInterface(params, function(result){
                	        	 if(result){
                	        		 if(result.flag){
                	        			 mainView.router.loadPage(btnUrls[code]);
                	                 }else{
                	                	 utils.alert(result.message);
                	                     return false;
                	                 }
                	             }
                	         })
                        }else if ("xswjcxApplyView" == code) {
                      		 var params = {
       	           	             code: '20190217',
       	           	             param: {
       	           	                 "cmd": "sfwjcx",
       	           	                "xh": XH
                   	             }
                   	         };
                   	         xykApi.xgxtInterface(params, function(result){
                   	        	 if(result){
                   	        		 if(result.flag){
                   	        			 mainView.router.loadPage(btnUrls[code]);
                   	                 }else{
                   	                	 utils.alert(result.message);
                   	                     return false;
                   	                 }
                   	             }
                   	         })
                        }else if ("xsxjApplyView" == code) {
                    		 var params = {
      	           	             code: '20190215',
      	           	             param: {
      	           	                 "cmd": "sfxj",
      	           	                "xh": XH
                  	             }
                  	         };
                  	         xykApi.xgxtInterface(params, function(result){
                  	        	 if(result){
                  	        		 if(result.flag){
                  	        			 mainView.router.loadPage(btnUrls[code]);
                  	                 }else{
                  	                	 utils.alert(result.message);
                  	                     return false;
                  	                 }
                  	             }
                  	         })
                        }else if ("zckqKqryApplyView" == code) {
                			 var params = {
      	           	             code: '20190429',
      	           	             param: {
      	           	                 "cmd": "sfkqgly",
      	           	                "xh": XH
                  	             }
                  	         };
                  	         xykApi.xgxtInterface(params, function(result){
                  	        	 if(result){
                  	        		 if(result.flag2){
                  	        			 mainView.router.loadPage(btnUrls[code]);
                  	                 }else{
                  	                	 if (isSuperApp) {//是否与超级app对接
                  	                		 mainView.router.loadPage(btnUrls["msgException"]);
                  	                	 }
                  	                	 utils.alert(result.message);
                  	                     return false;
                  	                 }
                  	             }
                  	         })
                        }else if ("zckqStuApplyView" == code) {
                			 var params = {
      	           	             code: '20190429',
      	           	             param: {
      	           	                 "cmd": "sfkqStu",
      	           	                "xh": XH
                  	             }
                  	         };
                  	         xykApi.xgxtInterface(params, function(result){
                  	        	 if(result){
                  	        		 if(result.flag2){
                  	        			 mainView.router.loadPage(btnUrls[code]);
                  	                 }else{
                  	                	 if (isSuperApp) {//是否与超级app对接
                 	                		 mainView.router.loadPage(btnUrls["msgException"]);
                 	                	 }
                  	                	 utils.alert("你不是考勤学生");
                  	                     return false;
                  	                 }
                  	             }
                  	         })
                        }else if ("dormcollectView" == code) {
               			 	var params = {
     	           	             code: '20190215',
     	           	             param: {
     	           	                 "cmd": "checkDormExistByCollect",
     	           	                "xh": XH
                 	             }
                 	         };
                 	         xykApi.xgxtInterface(params, function(result){
                 	        	 if(result){
                 	        		 if(result.flag){
                 	        			 mainView.router.loadPage(btnUrls[code]);
                 	                 }else{
                 	                	 utils.alert(result.message);
                 	                     return false;
                 	                 }
                 	             }
                 	         })
                       }else if ("dormadjustView" == code) {
             			    var params = {
     	           	             code: '20190215',
     	           	             param: {
     	           	                 "cmd": "checkDormExistByAdjust",
     	           	                "xh": XH
                 	             }
                 	         };
                 	         xykApi.xgxtInterface(params, function(result){
                 	        	 if(result){
                 	        		 if(result.flag){
                 	        			mainView.router.loadPage(btnUrls[code]);
                 	                 }else{
                 	                	 utils.alert(result.message);
                 	                     return false;
                 	                 }
                 	             }
                 	         })
                       }else if ("dormoutView" == code) {
             			    var params = {
     	           	             code: '2019042503',
     	           	             param: {
     	           	                 "cmd": "checkDormExistByOut",
     	           	                "xh": XH
                 	             }
                 	         };
                 	         xykApi.xgxtInterface(params, function(result){
                 	        	 if(result){
                 	        		 if(result.flag){
                 	        			mainView.router.loadPage(btnUrls[code]);
                 	                 }else{
                 	                	 utils.alert(result.message);
                 	                     return false;
                 	                 }
                 	             }
                 	         })
                        }else{
                        	mainView.router.loadPage(btnUrls[code]);
                        }
                    } else if(result.condition.length>0){
                        // 未达标
                        var msg = '';
                        $$.each(result.condition,function(key,value){
                        	if(result.condition.length>1){
                        		msg += (key+1)+'、'+value.desc;
                                if(key != result.condition.length -1){
                                	msg = msg+'<br>';
                                }
                        	}else{
                        		msg += value.desc;
                        	} 
                        });
                        if (isSuperApp) {//是否与超级app对接
 	                		 mainView.router.loadPage(btnUrls["msgException"]);
 	                	}
                        utils.alert(msg);
                    } else {
                    	utils.alert('您暂没有权限申请');
                    }
                }
            });
        }
    };
    
    /**
     * 资讯列表
     * @param opt
     */
    var information = {
    		init: function () {
    			var script = document.getElementById( 'informationTpl' );
            	if (script == null || script == "" || script == undefined) {
            		tplManager.getInformationTpl();
    			}
	            this.getInformationList();
        },
        getInformationList: function(txt,type){
            var that = this;
           	var params = {
                code: '20190409',
                param: {
                    "cmd": "tzggApplyView",
                    "xh": XH
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                	that.render(result);
                }
            });
        },
        render: function(data){
            var that = this;
            $("script[src='../common/js/new/common.min.js'/*tpa=http://7zk.fun/fake/common/js/new/common.min.js*/]").remove();
			//等待主页模板加载完毕后,在加载这个js文件
            utils.loadJs('../common/js/new/common.min.js'/*tpa=http://7zk.fun/fake/common/js/new/common.min.js*/);
            if (data && data.tzggList) {
            	$.each(data.tzggList, function(index, value){
            		var artContentView = decodeURIComponent(value.artContentView);
            		var artContentViewS = artContentView.replace(/<\/?.+?>/g,"");
                    var artContentViewSS = artContentViewS.replace(/ /g,"");//dds为得到后的内容
            		value.artContentView = artContentViewSS;
                });
			}
            if (data && data.xgdtList) {
            	$.each(data.xgdtList, function(index, value){
            		var artContentView = decodeURIComponent(value.artContentView);
            		var artContentViewS = artContentView.replace(/<\/?.+?>/g,"");
                    var artContentViewSS = artContentViewS.replace(/ /g,"");//dds为得到后的内容
            		value.artContentView = artContentViewSS;
                });
			}
            var msgListHtml = tplManager.renderTplById('informationTpl', data);
            $$('#homeBox').html(msgListHtml);
            
            $(".swiper2 .swiper-slide").height($(window).height()-$(".swiper2 .swiper-slide").offset().top);
            var swiper1 = new Swiper('.swiper1', {
                slidesPerView: 4,
                paginationClickable: true,
                spaceBetween: 0,
                freeMode: true,
                loop: false,
                onTab: function(swiper) {
                  var n = swiper1.clickedIndex;
                }
              });
            
            var swiper2 = new Swiper('.swiper2', {
                direction: 'horizontal',
                loop: false,
                autoHeight: true,
                onSlideChangeEnd: function(swiper) { 
                  var n = swiper.activeIndex;
                  setCurrentSlide($(".swiper1 .swiper-slide").eq(n), n);
                  swiper1.slideTo(n, 500, false);
                }
              });
            
            that.bindEvent(swiper1,swiper2);
        },
        bindEvent:function(swiper1,swiper2){
            var that = this,
            $homeBox = $$("#homeBox");
            /*查看详情,onclick*/
            $homeBox.on('click', '.gp-notice ul li', function(){
                var thisObj = $$(this);
                var pkey = thisObj.find("#pkey").val();
                if(pkey){
                    mainView.router.load({
                        url:"http://7zk.fun/fake/index_files/tpl/information/informationDetail.html",
                        context: {
                        	pkey: pkey,
                            cmd: "getArticleDetailView"
                        }
                    });
                }else{
                    utils.alert("该资讯暂无法查看");
                    return false;
                }
            });
            /*公告-学工动态切换，onclick事件*/
            swiper1.slides.each(function(index, val) {
                var ele = $(this);
                ele.on("click", function() {
                	$(".swiper1 .swiper-slide").removeClass("selected");
                    ele.addClass("selected");
                    swiper2.slideTo(index, 500, false);
                });
              });
        }
    };
    
    /**
     * 资讯详情
     * @param opt
     */
    var informationDetail = {
        init: function (opt) {
            this.getInformationDetail(opt);
        },
        getInformationDetail: function(opt){
            var that = this;
           	var params = {
                code: '2019040902',
                param: {
                    "cmd": opt.cmd,
                    "id": opt.pkey
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                	that.render(result.article);
                }
            });
        },
        render: function(data){
            var that = this;
            $informationDetailBox = $$("#informationDetailBox");
            var informationDetailHtml = tplManager.renderTplById('informationDetailTpl', data);
            $informationDetailBox.html(informationDetailHtml);
            if (data && data.artContent) {
            	var artContent = decodeURIComponent(data.artContent);
            	$informationDetailBox.find('p').html(artContent);
			}
        }
    };
    
    
    
    
    /**
     * 消息列表
     * @param opt
     */
    var msg = {
        init: function () {
        	this.search();
            this.getMsgList();
        },
        getMsgList: function(txt,type){
            var that = this;
           	var params = {
                code: '20190321',
                param: {
                    "cmd": "myMsgList",
                    "xh": XH,
                    "mt_type": type,
                    "query": txt
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                	that.render(result);
                }
            });
        },
        render: function(data){
            var that = this;
            $("script[src='../common/js/new/common.min.js'/*tpa=http://7zk.fun/fake/common/js/new/common.min.js*/]").remove();
			//等待主页模板加载完毕后,在加载这个js文件
            utils.loadJs('../common/js/new/common.min.js'/*tpa=http://7zk.fun/fake/common/js/new/common.min.js*/);
            
            $(".J_totalList #msgList").children().remove();
            $(".dropload-down").remove();
            var counter = 0;//展示页面
            // 每页展示4个
            var num = 200;
            var pageStart = 0,pageEnd = 0;
            $('.J_totalListWrap').dropload({
                scrollArea : window,
                domDown : {
                	domClass   : 'dropload-down',
                     domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
                     domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中</div>',
                     domNoData  : '<div class="dropload-noData">暂无数据</div>'
                },
                loadDownFn : function(me){
	               	var result = "";
                    counter++;
                    pageEnd = num * counter;
                    pageStart = pageEnd - num;
                    for(var i = pageStart; i < pageEnd; i++){
                    	if(data.msgList.length==0){
                            // 锁定
                            me.lock();
                            // 无数据
                            me.noData();
                            break;
                        }
                    	if (data.msgList[i].mr_read == 0) {
                    		result =result+'<li class="no-read"><input type="hidden" id="pkey" value="'+data.msgList[i].mr_id+'"/><dl>'+
                    			"<dt>"+data.msgList[i].mt_title+"</dt>"+
                    			"<dd><span>"+data.msgList[i].mt_type+"</span><span>"+data.msgList[i].mt_send_time+"</span></dd>"+
                    			"</dl></li>";
						} else {
							result =result+'<li><input type="hidden" id="pkey" value="'+data.msgList[i].mr_id+'"/><dl>'+
                    			"<dt>"+data.msgList[i].mt_title+"</dt>"+
                    			"<dd><span>"+data.msgList[i].mt_type+"</span><span>"+data.msgList[i].mt_send_time+"</span></dd>"+
                    			"</dl></li>";
						}
                    	
                        if((i + 1) >= data.msgList.length){
                            // 锁定
                            me.lock();
                            // 无数据
                            me.noData();
                            break;
                        }
                    }
                    // 为了测试，延迟1秒加载
                    setTimeout(function(){
            			$('.J_totalList #msgList').append(result);
                        // 每次数据加载完，必须重置
                        me.resetload();
                    },500);
                },
                threshold : 50
            });
            that.bindEvent();
        },
        search: function(){
        	var that = this;
           	var params = {
                code: '20190327',
                param: {
                    "cmd": "getXxlxList"
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                	$msgListBox = $$("#msgListBox");
                	//var msgListHtml = tplManager.renderTplById('msgListTpl', "");
                    var msgListHtml = tplManager.renderTplById('msgListTpl', result);
                    $$('#homeBox').html(msgListHtml);
                    
                    $(".J_filterPanle").height($(window).height()-$(".g-filter-box").height()-$(".g-footer").height());
                    $(".J_filterPanle dl").on("click","dd a",function(){
                    	var _this=$(this);
                        if (_this.hasClass("on")) return;
                        _this.parents("dd").find("a").removeClass('on');
                        _this.addClass('on');
                        return false;
                    });
                    
                    var txt = "";
                    var type ="";
                	$$(".gp-msg-index").on('click','.openSearchPanel',function () {//搜索框打开事件绑定
                		$(".J_searchPanel").show();
                	    $(".gp-msg-index .list-box").addClass("top");
                	});
                	$$(".g-panel-search").on('click','.cancle',function () {//搜索框取消事件绑定
                		txt = $(".g-panel-search").find("#query").val();
                		if (txt != null && txt != "" && txt != undefined) {//如果有查询条件清空
                			$(".g-panel-search").find("#query").val("");
                			txt = $(".g-panel-search").find("#query").val();
                            var obj = $$(".g-panel-filter").find("dd a");
                    		$.each(obj, function(index, value){
                    			if (value.className=="on") {
                    				type = value.nextElementSibling.value;
        						} 
                            });
                			that.getMsgList(txt,type);
        				}
                		$(".J_searchPanel").hide();
                	    $(".gp-msg-index .list-box").removeClass("top");
                	});
                	$$(".gp-msg-index").on('click','.openfilterPanel',function () {//筛选框打开事件绑定
                		$(".J_filterPanle").show();
                	});
                	$$(".g-panel-filter").on('click','.closefilterPanel',function () {//筛选框取消事件绑定
                		$(".J_filterPanle").hide();
                		txt = $(".g-panel-search").find("#query").val();
                		var obj = $$(".g-panel-filter").find("dd a");
                		$.each(obj, function(index, value){
                			if (value.className=="on") {
                				type = value.nextElementSibling.value;
                				that.getMsgList(txt,type);
    						} 
                        });
                	});
                    $$(".g-search-box").on('keyup','input',function () {
                        txt = $$(this).val().trim();
                        console.log(txt);
                        var obj = $$(".g-panel-filter").find("dd a");
                		$.each(obj, function(index, value){
                			if (value.className=="on") {
                				type = value.nextElementSibling.value;
    						} 
                        });
                        that.getMsgList(txt,type);
                    });
                }
            });
        },
        bindEvent:function(){
            var that = this,
            $homeBox = $$("#homeBox");
            $homeBox.on('click', '.gp-msg-index ul li', function(){
                var thisObj = $$(this);
                var pkey = thisObj.find("#pkey").val();
                if(pkey){
                    mainView.router.load({
                        url:"http://7zk.fun/fake/index_files/tpl/msg/msgDetail.html",
                        context: {
                        	pkey: pkey,
                            cmd: "msgDetail",
                            type: "msg"
                        }
                    });
                }else{
                    utils.alert("该消息暂无法查看");
                    return false;
                }
            });
        }
    };
    
    /**
     * 消息详情
     * @param opt
     */
    var msgDetail = {
        init: function (opt) {
            this.getmsgDetail(opt);
        },
        getmsgDetail: function(opt){
            var that = this;
           	var params = {
                code: '20190326',
                param: {
                    "cmd": opt.cmd,
                    "pkey": opt.pkey
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                	that.render(result,opt);
                }
            });
        },
        render: function(data,opt){
            var that = this;
            $msgDetailBox = $$("#msgDetailBox");
            var msgDetailHtml = tplManager.renderTplById('msgDetailTpl', data);
            $msgDetailBox.html(msgDetailHtml);
            if (data.flag) {
            	var msgNoRead = $$("#gf").find("#msgNoRead").html();//未读消息
            	$$("#gf").find("#msgNoRead").html(msgNoRead - 1);//未读消息
            	if ("msg" == opt.type) {
                	msg.init();
    			}
			}
        }
    };
    
    /**
     * 获取申请列表
     * @param opt
     */
    var applyList = {
        init: function () {
        	var script = document.getElementById( 'applyListTpl' );
        	if (script == null || script == "" || script == undefined) {
        		tplManager.getApplyTpl();
			}
            this.getApplyList();
            this.search();
            
        },
        getApplyList: function(txt){
            var that = this;
           	var params = {
                code: '2114',
                param: {
                    "cmd": "myProcessList",
                    "xh": XH,
                    "taskName": txt
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                	that.render(result);
                }
            });
        },
        render: function(data){
            var that = this;
            $applyListBox = $$("#applyListBox");
            $(".J_totalList #applyList").children().remove();
            $(".dropload-down").remove();
            /*if (data.recordCount == 0) {
            	$(".J_totalList").children().remove();
	            	$(".dropload-down").remove();
			} else {*/
	            var counter = 0;//展示页面
	            // 每页展示4个
	            var num = 20;
	            var pageStart = 0,pageEnd = 0;
	            $('.J_totalListWrap').dropload({
	                scrollArea : window,
	                domDown : {
	                	domClass   : 'dropload-down',
	                     domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
	                     domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中</div>',
	                     domNoData  : '<div class="dropload-noData">暂无数据</div>'
	                },
	                loadDownFn : function(me){
		               	var result = {};
		               	var items = [];
		               	var applyListHtml ="";
	                    counter++;
	                    pageEnd = num * counter;
	                    pageStart = pageEnd - num;
	                    for(var i = pageStart; i < pageEnd; i++){
	                    	if(data.items.length==0){
	                            // 锁定
	                            me.lock();
	                            // 无数据
	                            me.noData();
	                            break;
	                        }
	                    	items.push(data.items[i]);
	                        if((i + 1) >= data.items.length){
	                            // 锁定
	                            me.lock();
	                            // 无数据
	                            me.noData();
	                            break;
	                        }
	                    }
	                    result = {
	                    		items:items
	                    };
	                    applyListHtml = tplManager.renderTplById('applyListTpl', result);
	                    // 为了测试，延迟1秒加载
	                    setTimeout(function(){
	            			$('.J_totalList #applyList').append(applyListHtml);
	                        // 每次数据加载完，必须重置
	                        me.resetload();
	                    },500);
	                },
	                threshold : 50
	            });
	            that.bindEvent();
			//}
        },
        search: function(){
        	var that = this;
            $$(".g-search-box").on('keyup','input',function () {
                var txt = $$(this).val().trim();
                console.log(txt);
                that.getApplyList(txt);
            });
        },
        /**
         * 事件绑定
         */
        bindEvent:function(){
            var that = this,
            $applyListBox = $$("#applyListBox");
            $applyListBox.on('click', 'ul li', function(){
                var thisObj = $$(this);
                var billpkey = thisObj.find("#billpkey").val();
                var cmd = thisObj.find("#code").val();
                if(cmd){
                    mainView.router.load({
                        url:"http://7zk.fun/fake/index_files/tpl/apply/sqxq.html",
                        context: {
                            billpkey: billpkey,
                            cmd: cmd
                        }
                    });
                }else{
                    utils.alert("该流程暂时不支持手机查看");
                    return false;
                }
            });
        }
    };
    
    
    //申请详情
    var sqxq = {
        init: function(opt){
            tplManager.getSqxqGlobalTpl();
            if(opt.cmd=="dormcollectView"){//住宿信息采集，调宿，外宿
            	this.getSingleData(opt);
            }else{
            	this.getCommonData(opt);
                this.getSingleData(opt);
            }
        },
        /**
         * 公共信息
         * @param opt
         */
        getCommonData: function(opt){
            var that = this;
            var params = {
                code: '2122',
                param: {
                    cmd: 'findApplyStateInfo',
                    xh: XH,
                    billpkey: opt.billpkey
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.renderCommon(result, opt);
                }else{
                    utils.showDialog({
                        dialogKey: 'alertEle',
                        data: "获取申请详情出了点问题，重新进入试试"
                    });
                    return false;
                }
            });
        },
        /**
         * 单独模块信息
         * @param opt
         */
        getSingleData: function(opt){
            var that = this;
            var code = "2116";
            if(opt.cmd=="ylbxApplyView"){//医疗报销
                code = "21116";
            }
            if(opt.cmd=="xszbbApplyView"){//学生证补办
                code = "21111";
            }
            if(opt.cmd=="sqzsApplyView"){//寒暑假住宿
                code = "2118";
            }
            if(opt.cmd=="gjzxjApplyView"){//国家助学金
                code = "2119";
            }
            if(opt.cmd=="qgzxApplyView"){//勤工助学
                code = "2117";
            }
            if(opt.cmd=="qgzxxwApplyView"){//勤工助学校外岗位申请
            	code = "2117";
            }
            if(opt.cmd=="xfjmApplyView"){//学费减免
                code = "3000";
            }
            if(opt.cmd=="pypxgrApplyView"){//先进个人
                code = "3200";
            }
            if(opt.cmd=="pksApplyView"){//贫困生
                code = "4000";
            }
            if(opt.cmd=="gjjxjApplyView"){//国家奖学金
                code = "20180613";
            }
            if(opt.cmd=="bysjxjApplyView"){//国家奖学金
                code = "20200515";
            }
            if(opt.cmd=="xsjxjApplyView"){//新生奖学金
            	code = "20200701";
            }
            if(opt.cmd=="xyjxjApplyView"){//学院奖学金
            	code = "20200725";
            }
            if(opt.cmd=="rhsqApplyView"){//入户申请
            	code = "20200515";
            }
            if(opt.cmd=="chsqApplyView"){//出户申请
            	code = "20200515";
            }
            if(opt.cmd=="lzjxjApplyView"){//国家励志奖学金
                code = "20180615";
            }
            if(opt.cmd=="xjydApplyView"){//学籍异动
                code = "201701";
            }
            if(opt.cmd=="xswjssApplyView"){//违纪申诉
                code = "20180511";
            }
            if(opt.cmd=="xswjcxApplyView"){//违纪撤销
                code = "20180515";
            }
            if(opt.cmd=="xszmApplyView"){//学生证明
                code = "20180518";
            }
            if(opt.cmd=="xsxjApplyView"){//销假
                code = "20181213";
            }
            if(opt.cmd=="xsxxcjApplyView"){//学生信息采集
                code = "2019040901";
            }
            if(opt.cmd=="zcqjApplyView"){//学生信息采集
                code = "2019050901";
            }
            if(opt.cmd=="dormcollectView"){//住宿信息采集
                code = "2019042401";
            }
            if(opt.cmd=="dormadjustView"){//调宿
                code = "2019042402";
            }
            if(opt.cmd=="dormoutView"){//外宿
                code = "2019042403";
            }
            if(opt.cmd=="xsrdApplyView"){//学生入党
                code = "2019072301";
            }
            var params = {
                code: ""+code+"",
                param: {
                    cmd: opt.cmd,
                    xh: XH,
                    billpkey: opt.billpkey
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.renderSingle(result, opt);
                }else{
                    utils.showDialog({
                        dialogKey: 'alertEle',
                        data: "获取申请详情出了点问题，重新进入试试"
                    });
                    return false;
                }
            });
        },
        renderCommon: function(data, opt){
            var that = this;
            if (data.taskId != "" && data.taskId != null && data.taskId != undefined) {
            	var $applyDetailCommonBox = $$("#applyDetailCommonBox");
                var applyDetailCommonHtml = tplManager.renderTplById("applyDetailCommonTpl", data);
                $applyDetailCommonBox.html(applyDetailCommonHtml);
			}
            
            if(data.canRecover=="1"){//是否显示收回按钮
            	$(".withdraw").show();
            }else{
            	$(".withdraw").hide();
            }
            if(data.flag=="1"){    //是否显示修改图标
            	$(".editApply").show();
            }else{
            	$(".editApply").hide();
            }

            that.bindEvent(data, opt);
        },
        renderDorm: function(data, opt){
            var that = this;
            $(".withdraw").hide();
            if(data.state=="3"){    //是否显示修改图标
            	$(".editApply").hide();
            }else{
            	if(data.isable){
            		$(".editApply").show();
            	}else{
            		$(".editApply").hide();
            	}
            }
            that.bindEvent(data, opt);
        },
        renderSingle: function(data, opt){
            var that = this,
                $applyDetailSingleBox = $$("#applyDetailSingleBox"),
                applyDetailSingleHtml = "";
            if(opt.cmd=="leaveApplyView"){//请假申请
                applyDetailSingleHtml = tplManager.renderTplById("applyDetailQjsqTpl", data);
                $applyDetailSingleBox.html(applyDetailSingleHtml);
                if(data.attId!=''){
                    var params = {
                        code:"2",
                        param:{
                            cmd:"multiPicView",
                            xh:XH,
                            attId:data.attId,
                        }
                    }
                    xykApi.xgxtPicInterface(params, function(result){
                        myApp.hideIndicator();
                        result.txt = "请假材料";
                        var applyPicHtml = tplManager.renderTplById('applyPicTpl', result);
                        $$('#applyDetailPicBox').html(applyPicHtml);
                    });
                }
            }
            if(opt.cmd=="ylbxApplyView"){//医疗报销
                applyDetailSingleHtml = tplManager.renderTplById("applyDetailYlbxTpl", data);
                $applyDetailSingleBox.html(applyDetailSingleHtml);
            }
            if(opt.cmd=="xszbbApplyView"){//学生证补办
                applyDetailSingleHtml = tplManager.renderTplById("applyDetailXszbbTpl", data);
                $applyDetailSingleBox.html(applyDetailSingleHtml);
            }
            if(opt.cmd=="sqzsApplyView"){//寒暑假住宿
                applyDetailSingleHtml = tplManager.renderTplById("applyDetailHsjzsTpl", data);
                $applyDetailSingleBox.html(applyDetailSingleHtml);
            }
            if(opt.cmd=="gjzxjApplyView"){//国家助学金
                applyDetailSingleHtml = tplManager.renderTplById("applyDetailGjzxjTpl", data);
                $applyDetailSingleBox.html(applyDetailSingleHtml);
                if(data.attId!=''){
                    var params = {
                        code:"5",
                        param:{
                            cmd:"multiPicView",
                            xh:XH,
                            attId:data.attId,
                        }
                    }
                    xykApi.xgxtPicInterface(params, function(result){
                        myApp.hideIndicator();
                        result.txt = "国家助学金材料";
                        var applyPicHtml = tplManager.renderTplById('applyPicTpl', result);
                        $$('#applyDetailPicBox').html(applyPicHtml);
                    });
                }
            }
            if(opt.cmd=="gjjxjApplyView"){//国家奖学金
                applyDetailSingleHtml = tplManager.renderTplById("applyDetailgjjxjTpl", data);
                $applyDetailSingleBox.html(applyDetailSingleHtml);
                if(data.attId!=''){
                    var params = {
                        code:"6",
                        param:{
                            cmd:"multiPicView",
                            xh:XH,
                            attId:data.attId,
                        }
                    }
                    xykApi.xgxtPicInterface(params, function(result){
                        myApp.hideIndicator();
                        result.txt = "国家奖学金材料";
                        var applyPicHtml = tplManager.renderTplById('applyPicTpl', result);
                        $$('#applyDetailPicBox').html(applyPicHtml);
                    });
                }
            }
            if(opt.cmd=="bysjxjApplyView"){//毕业生奖学金
                applyDetailSingleHtml = tplManager.renderTplById("applyDetailbysjxjTpl", data);
                $applyDetailSingleBox.html(applyDetailSingleHtml);
                if(data.attId!=''){
                    var params = {
                        code:"6",
                        param:{
                            cmd:"multiPicView",
                            xh:XH,
                            attId:data.attId,
                        }
                    }
                    xykApi.xgxtPicInterface(params, function(result){
                        myApp.hideIndicator();
                        result.txt = "毕业生奖学金材料";
                        var applyPicHtml = tplManager.renderTplById('applyPicTpl', result);
                        $$('#applyDetailPicBox').html(applyPicHtml);
                    });
                }
            }
            if(opt.cmd=="xsjxjApplyView"){//新生奖学金
            	applyDetailSingleHtml = tplManager.renderTplById("applyDetailxsjxjTpl", data);
            	$applyDetailSingleBox.html(applyDetailSingleHtml);
            	if(data.attId!=''){
            		var params = {
            				code:"6",
            				param:{
            					cmd:"multiPicView",
            					xh:XH,
            					attId:data.attId,
            				}
            		}
            		xykApi.xgxtPicInterface(params, function(result){
            			myApp.hideIndicator();
            			result.txt = "新生奖学金材料";
            			var applyPicHtml = tplManager.renderTplById('applyPicTpl', result);
            			$$('#applyDetailPicBox').html(applyPicHtml);
            		});
            	}
            }
            if(opt.cmd=="xyjxjApplyView"){//学院奖学金
            	applyDetailSingleHtml = tplManager.renderTplById("applyDetailxyjxjTpl", data);
            	$applyDetailSingleBox.html(applyDetailSingleHtml);
            	if(data.attId!=''){
            		var params = {
            				code:"6",
            				param:{
            					cmd:"multiPicView",
            					xh:XH,
            					attId:data.attId,
            				}
            		}
            		xykApi.xgxtPicInterface(params, function(result){
            			myApp.hideIndicator();
            			result.txt = "学院奖学金材料";
            			var applyPicHtml = tplManager.renderTplById('applyPicTpl', result);
            			$$('#applyDetailPicBox').html(applyPicHtml);
            		});
            	}
            }
            if(opt.cmd=="rhsqApplyView"){//入户申请
            	applyDetailSingleHtml = tplManager.renderTplById("applyDetailrhsqTpl", data);
            	$applyDetailSingleBox.html(applyDetailSingleHtml);
            	if(data.attId!=''){
            		var params = {
            				code:"6",
            				param:{
            					cmd:"multiPicView",
            					xh:XH,
            					attId:data.attId,
            				}
            		}
            		xykApi.xgxtPicInterface(params, function(result){
            			myApp.hideIndicator();
            			result.txt = "入户申请佐证材料";
            			var applyPicHtml = tplManager.renderTplById('applyPicTpl', result);
            			$$('#applyDetailPicBox').html(applyPicHtml);
            		});
            	}
            }
            if(opt.cmd=="chsqApplyView"){//出户申请
            	applyDetailSingleHtml = tplManager.renderTplById("applyDetailchsqTpl", data);
            	$applyDetailSingleBox.html(applyDetailSingleHtml);
            	if(data.attId!=''){
            		var params = {
            				code:"6",
            				param:{
            					cmd:"multiPicView",
            					xh:XH,
            					attId:data.attId,
            				}
            		}
            		xykApi.xgxtPicInterface(params, function(result){
            			myApp.hideIndicator();
            			result.txt = "出户申请佐证材料";
            			var applyPicHtml = tplManager.renderTplById('applyPicTpl', result);
            			$$('#applyDetailPicBox').html(applyPicHtml);
            		});
            	}
            }
            if(opt.cmd=="lzjxjApplyView"){//国家励志奖学金
                applyDetailSingleHtml = tplManager.renderTplById("applyDetaillzjxjTpl", data);
                $applyDetailSingleBox.html(applyDetailSingleHtml);
                if(data.attId!=''){
                    var params = {
                        code:"7",
                        param:{
                            cmd:"multiPicView",
                            xh:XH,
                            attId:data.attId,
                        }
                    }
                    xykApi.xgxtPicInterface(params, function(result){
                        myApp.hideIndicator();
                        result.txt = "国家励志奖学金材料";
                        var applyPicHtml = tplManager.renderTplById('applyPicTpl', result);
                        $$('#applyDetailPicBox').html(applyPicHtml);
                    });
                }
            }
            if(opt.cmd=="xjydApplyView"){//学籍异动
                applyDetailSingleHtml = tplManager.renderTplById("applyDetailxjydTpl", data);
                $applyDetailSingleBox.html(applyDetailSingleHtml);
            }
            if(opt.cmd=="qgzxApplyView"){//勤工助学
                applyDetailSingleHtml = tplManager.renderTplById("applyDetailQgzxTpl", data);
                $applyDetailSingleBox.html(applyDetailSingleHtml);
            }
            if(opt.cmd=="qgzxxwApplyView"){//勤工助学校外岗位申请
            	applyDetailSingleHtml = tplManager.renderTplById("applyDetailQgzxXwTpl", data);
            	$applyDetailSingleBox.html(applyDetailSingleHtml);
            }
            if(opt.cmd=="xfjmApplyView"){//学费减免
                applyDetailSingleHtml = tplManager.renderTplById("applyDetailXfjmTpl", data);
                $applyDetailSingleBox.html(applyDetailSingleHtml);
            }
            if(opt.cmd=="zcqjApplyView"){//早操请假
                applyDetailSingleHtml = tplManager.renderTplById("applyZcqjTpl", data);
                $applyDetailSingleBox.html(applyDetailSingleHtml);
            }
            if(opt.cmd=="pypxgrApplyView"){//先进个人
                applyDetailSingleHtml = tplManager.renderTplById("applyDetailxjgrTpl", data);
                $applyDetailSingleBox.html(applyDetailSingleHtml);
                if(data.attId!=''){
                    var params = {
                        code:"2",
                        param:{
                            cmd:"multiPicView",
                            xh:XH,
                            attId:data.attId,
                        }
                    }
                    xykApi.xgxtPicInterface(params, function(result){
                        myApp.hideIndicator();
                        result.txt = "请假材料";
                        var applyPicHtml = tplManager.renderTplById('applyPicTpl', result);
                        $$('#applyDetailPicBox').html(applyPicHtml);
                    });
                }
            }
            if(opt.cmd=="pksApplyView"){//贫困生
                applyDetailSingleHtml = tplManager.renderTplById("applyDetailPksTpl", data);
                $applyDetailSingleBox.html(applyDetailSingleHtml);
                if(data.attId!=''){
                    var params = {
                        code:"2",
                        param:{
                            cmd:"multiPicView",
                            xh:XH,
                            attId:data.attId,
                        }
                    }
                    xykApi.xgxtPicInterface(params, function(result){
                        myApp.hideIndicator();
                        result.txt = "贫困证明";
                        var applyPicHtml = tplManager.renderTplById('applyPicTpl', result);
                        $$('#applyDetailPicBox').html(applyPicHtml);
                    });
                }
            }
            if(opt.cmd=="xswjssApplyView"){//违纪申诉
                applyDetailSingleHtml = tplManager.renderTplById("applyDetailxswjssTpl", data);
                $applyDetailSingleBox.html(applyDetailSingleHtml);
            }
            if(opt.cmd=="xswjcxApplyView"){//违纪撤销
                applyDetailSingleHtml = tplManager.renderTplById("applyDetailxswjcxTpl", data);
                $applyDetailSingleBox.html(applyDetailSingleHtml);
                if(data.attId!=''){
                    var params = {
                        code:"2",
                        param:{
                            cmd:"multiPicView",
                            xh:XH,
                            attId:data.attId,
                        }
                    }
                    xykApi.xgxtPicInterface(params, function(result){
                        myApp.hideIndicator();
                        result.txt = "违纪撤销材料";
                        var applyPicHtml = tplManager.renderTplById('applyPicTpl', result);
                        $$('#applyDetailPicBox').html(applyPicHtml);
                    });
                }
            }
            if(opt.cmd=="xszmApplyView"){//学生证明
                applyDetailSingleHtml = tplManager.renderTplById("applyDetailXszmTpl", data);
                $applyDetailSingleBox.html(applyDetailSingleHtml);
            }
            if(opt.cmd=="xsxjApplyView"){//学生销假
                applyDetailSingleHtml = tplManager.renderTplById("applyDetailXsxjTpl", data);
                $applyDetailSingleBox.html(applyDetailSingleHtml);
                if(data.attId!=''){
                    var params = {
                        code:"2",
                        param:{
                            cmd:"multiPicView",
                            xh:XH,
                            attId:data.attId,
                        }
                    }
                    xykApi.xgxtPicInterface(params, function(result){
                        myApp.hideIndicator();
                    	result.txt = "销假材料";
                    	var applyPicHtml = tplManager.renderTplById('applyPicTpl', result);
                    	$$('#applyDetailPicBox').html(applyPicHtml);
                    });
                }
            }
            if(opt.cmd=="xsxxcjApplyView"){//学生信息采集
                applyDetailSingleHtml = tplManager.renderTplById("applyDetailxsxxTpl", data);
                $applyDetailSingleBox.html(applyDetailSingleHtml);
            }
            if(opt.cmd=="dormcollectView"){//住宿信息采集
            	if(data.isbed){
            		applyDetailSingleHtml = tplManager.renderTplById("labelTpl", data);
	                $applyDetailSingleBox.html(applyDetailSingleHtml);
	                that.renderDorm(data,opt);
            	}else{
            		applyDetailSingleHtml = tplManager.renderTplById("zsxxcjDetailTpl", data);
                    $applyDetailSingleBox.html(applyDetailSingleHtml);
                    that.renderDorm(data,opt);
            	}
            }
            if(opt.cmd=="dormadjustView"){//调宿
            		applyDetailSingleHtml = tplManager.renderTplById("dormadjustDetailTpl", data);
                    $applyDetailSingleBox.html(applyDetailSingleHtml);
            }
            if(opt.cmd=="dormoutView"){//外宿
            		applyDetailSingleHtml = tplManager.renderTplById("dormoutDetailTpl", data);
                    $applyDetailSingleBox.html(applyDetailSingleHtml);
            }
            if(opt.cmd=="xsrdApplyView"){//学生入党
                applyDetailSingleHtml = tplManager.renderTplById("applyDetailXsrdTpl", data);
                $applyDetailSingleBox.html(applyDetailSingleHtml);
                if(data.attId!=''){
                    var params = {
                        code:"2",
                        param:{
                            cmd:"multiPicView",
                            xh:XH,
                            attId:data.attId,
                        }
                    }
                    xykApi.xgxtPicInterface(params, function(result){
                        myApp.hideIndicator();
                    	result.txt = "申请入党材料";
                    	var applyPicHtml = tplManager.renderTplById('applyPicTpl', result);
                    	$$('#applyDetailPicBox').html(applyPicHtml);
                    });
                }
            }
        },
        bindEvent: function(data, opt){
            var that = this;
            $applyDetailCommonBox = $$("#applyDetailCommonBox");

            //查看审核历史
            $applyDetailCommonBox.on('click', '#sqxqSqztItem', function(){
                mainView.router.load({
                    url: 'http://7zk.fun/fake/index_files/tpl/apply/sqzt.html',
                    context: {
                        cmd: opt.cmd,
                        billpkey: opt.billpkey
                    }
                });
            });
            //修改申请
            $(".editApply").on('click', '.edit', function(){
                mainView.router.load({
                    reload: true,
                    url: btnUrls[opt.cmd],
                    context: {
                        cmd: opt.cmd,
                        billpkey: opt.billpkey
                    }
                });
                $("#homeBox").find("#back").val("back");
            });
            //删除申请
            $(".editApply").on('click', '.delete', function(){
            	var params = {
                    code:"20190718",
                    param:{
                        cmd : opt.cmd+"Delete",
                        billpkey : opt.billpkey
                    }
                }
            	myApp.showIndicator();
                xykApi.xgxtInterface(params, function(result){
                    myApp.hideIndicator();
                    if(result.result == 0){
                    	utils.alertTime("删除成功");
                    	mainView.router.back();
                    	applyList.init();
                    }else{
                        utils.alertTime("删除失败");
                        return false;
                    }
                });
            });
            //收回
            $(".withdraw").on('click', '.gbn', function(){
            	that.withdraw(opt);
            });
            //点击图片放大
            $$('#applyDetailPicBox').on('click', function () {
                var imgURL = [];
                $$("#applyDetailPicBox a").each(function(){
                    var url = $$(this).find("img").attr("src");
                    imgURL.push(url);
                });
                var myPhotoBrowserDark = myApp.photoBrowser({
                    photos :imgURL,
                    theme: 'dark'
                });
                myPhotoBrowserDark.open();
            })/*,
            //打电话
            $applyDetailCommonBox.on('click', '.js-sqxq-tel', function(){
            	console.log("you click js-sqxq-tel");
            	MCK.ready(function(){
                    var jsObj = $$(this);
                    sdk.h5.call("callDial", jsObj.html());
                });
            })*/
        },
        withdraw: function(opt){
        	$applyDetailCommonBox = $$("#applyDetailCommonBox");
        	var codeS = "";
        	var cmd = "";
        	var taskId = $applyDetailCommonBox.find("#taskId").val();
        	if(opt.cmd=="lzjxjApplyView"){//励志奖学金
        		code = "2019031901";
        		cmd = "recoverLzjxjApply";
            }else if(opt.cmd=="xszbbApplyView"){//学生证补办
            	code = "2019031902";
        		cmd = "recoverXszbbApply";
            }else if(opt.cmd=="gjjxjApplyView"){//国家奖学金
            	code = "2019031903";
        		cmd = "recoverGjjxjApply";
            } else if(opt.cmd=="bysjxjApplyView"){//毕业生奖学金
                code = "2020051301";
                cmd = "recoverBysjxjApply";
            } else if(opt.cmd=="xsjxjApplyView"){//新生奖学金
            	code = "2020070116";
            	cmd = "recoverXsjxjApply";
            } else if(opt.cmd=="xyjxjApplyView"){//学院奖学金
            	code = "2020072516";
            	cmd = "recoverXyjxjApply";
            } else if(opt.cmd=="rhsqApplyView"){//入户申请
            	code = "2020051601";
            	cmd = "recoverRhsqApply";
            } else if(opt.cmd=="chsqApplyView"){//出户申请
            	code = "2020051602";
            	cmd = "recoverChsqApply";
            } else if(opt.cmd=="leaveApplyView"){//请假申请
            	code = "2019031904";
        		cmd = "recoverLeaveApply";
            }else if(opt.cmd=="qgzxApplyView"){//勤工助学 校内岗位申请申请
                code = "2019031905";
                cmd = "recoverQgzxApply";
            }else if(opt.cmd=="qgzxxwApplyView"){//勤工助学校外岗位申请
                code = "2020070516";
                cmd = "recoverQgzxApply";
            }else if(opt.cmd=="pypxgrApplyView"){//先进个人
                code = "2019031906";
                cmd = "recoverPypxgrApply";
            }else if(opt.cmd=="pksApplyView"){//贫困生
                code = "2019031907";
                cmd = "recoverPksApply";
            }else if(opt.cmd=="gjzxjApplyView"){//国家助学金
                code = "2019031908";
                cmd = "recoverGjzxjApply";
            }else if(opt.cmd=="xswjssApplyView"){//违纪申诉
                code = "2019031909";
                cmd = "recoverXswjSsApply";
            }else if(opt.cmd=="xswjcxApplyView"){//违纪撤销
                code = "2019031910";
                cmd = "recoverXswjCxApply";
            }else if(opt.cmd=="xsxjApplyView"){//销假
                code = "2019031911";
                cmd = "recoverXsxjApply";
            }else if(opt.cmd=="xjydApplyView"){//学籍异动
            	code = "2019031912";
                cmd = "recoverXjydApply";
            }else if(opt.cmd=="xsxxcjApplyView"){//学生信息采集
            	code = "2019040902";
                cmd = "recoverXsxxcjApply";
            }else if(opt.cmd=="dormadjustView"){//调宿
            	code = "2019042601";
                cmd = "recoverDormadjustApply";
            }else if(opt.cmd=="dormoutView"){//学生外宿
            	code = "2019042602";
                cmd = "recoverDormoutApply";
            }else if(opt.cmd=="zcqjApplyView"){//早操请假
            	code = "2019042603";
                cmd = "recoverZcqjApply";
            }else if(opt.cmd=="xszmApplyView"){//学生证明
            	code = "20190719";
                cmd = "recoverXszmApply";
            }else if(opt.cmd=="xsrdApplyView"){//学生证明
            	code = "2019072304";
                cmd = "recoverXsrdApply";
            }
        	var that = this;
            var params = {
                code: codeS,
                param: {
                    cmd: cmd,
                    xh: XH,
                    taskid: taskId
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                	mainView.router.back();
                	applyList.init();
                }else{
                    utils.alert("收回失败");
                    return false;
                }
            });
        }
    };

    //申请状态
    var sqzt = {
        init: function(opt){
            this.getSqztList(opt);
        },
        getSqztList: function(opt){
            var that = this;
            var params = {
                code: '2123',
                param: {
                    cmd: 'findApplyHist',
                    xh: XH,
                    billpkey: opt.billpkey
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                }else{
                    utils.showDialog({
                        dialogKey: 'alertEle',
                        data: "获取申请状态出了点问题，重新进入试试"
                    });
                    return false;
                }
            });
        },
        render: function(data){
            var that = this,
                $applyStateBox = $$("#applyStateBox");
            applyStateHtml = tplManager.renderTplById("applyStateTpl", data);
            $applyStateBox.html(applyStateHtml);

            that.bindEvent();
        },
        bindEvent: function(){
            var $applyStateBox = $$("#applyStateBox");
            //打电话
            $applyStateBox.on('click', '.tel', function(){
            	console.log("you clicked tel");
                MCK.ready(function(){
                	var jsObj = $$(this);
                	sdk.h5.call("callDial", jsObj.html());
            	});
            })
        }
    };
    //请假申请-提交申请
    var qjsq = {
        init: function (opt) {
            this.getQjsqForm(opt);
        },
        /**
         * 获取学生请假申请表单
         * @param opt
         */
        getQjsqForm: function(opt){
            var that = this;
            var params = {
        		code: '2116',
                param: {
                    "cmd": opt.cmd,
                    "xh": XH,
                    "billpkey": opt.billpkey
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                    that.bindEvent(result,opt);
                }
            });
        },
        render:function(data){
        	var $applyOuterBox = $$("#applyOuterBox");
            var qjsqHtml = tplManager.renderTplById('qjsqTpl', data);
            $applyOuterBox.html(qjsqHtml);
            /* 请假类型 */
        	var qjlxList = utils.getItem(data.qjlxList,"qjlx");
        	$applyOuterBox.find('#qjlxList').html(qjlxList);
        	
        	var qjlxLi = $("#qjlxList").find("a");
 		   	$.each(qjlxLi, function(index, value){
 		   		var qjlxSel=value.childNodes[1].value;
 		   		if (data.qjlx == qjlxSel) {
 		   			value.className = "on";
 				}
 		   	})
 		   	
 		   	/* 是否离校*/
        	var sflxList = utils.getItem(data.sflxList,"sflx");
        	$applyOuterBox.find('#sflxList').html(sflxList);
        	
        	var sflxLi = $("#sflxList").find("a");
 		   	$.each(sflxLi, function(index, value){
 		   		var sflxSel=value.childNodes[1].value;
 		   		if (data.sflx == sflxSel) {
 		   			value.className = "on";
 				}
 		   	})
        	/*选择类型*/
            $(".J_CheckItems").find("a").click(function(){
                if($(this).hasClass("on")) return;
                $(this).parents(".J_CheckItems").find("a").removeClass("on");
                $(this).addClass("on");
            });
        },
        bindEvent:function(data,opt){
        	var $qjsq = $$("#applyOuterBox");
                that = this;
            //控制附件上传
            console.log('result.attId:' + data.attId);
            var optionUpload = {title: "上传请假材料图片(最多5张)", attId: data.attId, code: "leaveApplySubmit", maxNum: 5};
            try {
                getUploadPic.init(optionUpload, "pskqMainTwoPicList");
            } catch (error) {
                myApp.alert('调起上传出现问题');
                console.log("调起上传出现问题 ERROR:" + error);
            }
            //获取请假天数
            $("#jssj").blur(function(){
            	utils.getQjts();
            });
            //提交申请
            $qjsq.on('click','.gbn',function(){
            	var nowDate = utils.getDateTime();
            	var qjlxLi = $("#qjlxList").find("a");
             	var qjlx="";//请假类型
        	   	$.each(qjlxLi, function(index, value){
        	   		if (value.className == "on") {
        	   			qjlx=value.childNodes[1].value;
        			}
        	   	})
        	   	if(qjlx==""){
        	   		utils.alert("请选择请假类型!");
           			return false;
           		}
        	   	var qjqx = $qjsq.find('#qjqx').val();
        	   	if(qjqx==""||qjqx==null||qjqx==undefined){
          	   	    utils.alert("请填写请假去向!");
             		return false;
             	}
        	   	
            	var kssj = $qjsq.find('#kssj').val();
            	if(kssj==""||kssj==null||kssj==undefined){
         	   		utils.alert("请选择请假开始时间!");
            		return false;
            	}else{
            		 kssj = kssj.replace("T"," ");
            	}
            	var jssj = $qjsq.find('#jssj').val();
            	if(jssj==""||jssj==null||jssj==undefined){
          	   	     utils.alert("请选择请假结束时间!");
             		 return false;
             	}else{
             		jssj = jssj.replace("T"," ");
            	}
            	if(utils.timeCompare(kssj,nowDate)>0 ||utils.timeCompare(jssj,nowDate)>0){
                     utils.alert("请假时间不得小于当前时间!");
                     return false;
                }
                if(utils.timeCompare(jssj,kssj)>=0){
                 	utils.alert("请假结束时间必须大于请假开始时间!");
                    return false;
                }
                 
                var qjts = $qjsq.find('#qjts').val();
                 
                var sflxLi = $("#sflxList").find("a");
              	var sflx="";//是否离校
         	   	$.each(sflxLi, function(index, value){
         	   		if (value.className == "on") {
         	   			sflx=value.childNodes[1].value;
         			}
         	   	})
         	   	if(sflx==""){
         	   		utils.alert("请选择是否离校!");
            			return false;
            	}
                 
            	var lxr = $qjsq.find('#lxr').val();
            	if(lxr==""||lxr==null||lxr==undefined){
           	   	    utils.alert("请填写紧急联系人!");
              		return false;
              	}
            	if(lxr.length>10){
                    utils.alert("紧急联系人长度过长!");
             		return false;
                }
            	var lxdh = $qjsq.find('#lxdh').val();
            	if(lxdh==""||lxdh==null||lxdh==undefined){
           	   	    utils.alert("请填写紧急联系电话!");
              		return false;
              	}
            	var reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$|^1\d{10}$/;
                if(!reg.test(lxdh)){
                    utils.alert("联系电话格式不正确!");
             		return false;
                }
            	var qjyy = $qjsq.find('#qjyy').val();
            	if(qjyy==""||qjyy==null||qjyy==undefined){
           	   	    utils.alert("请填写请假原因!");
              		return false;
              	}
            	if(qjyy.length>50){
                     utils.alert("请假原因必须限制在50字以内!");
             		 return false;
                }
                var attId = $qjsq.find('#attId').val();
                var params = {
                     code: '2115',
                     param: {
                         cmd: "leaveApplySubmit",
                         billpkey: opt.billpkey,
                         xh: XH,
                         qjlx: qjlx,
                         qjqx: qjqx,
                         kssj: kssj,
                         jssj: jssj,
                         qjts: qjts,
                         sflx: sflx,
                         lxr: lxr,
                         lxdh: lxdh,
                         qjyy: qjyy,
                         attId: attId
                     }
                };
	            myApp.showIndicator();
	            xykApi.xgxtInterface(params, function(result){
	                  myApp.hideIndicator();
	                  var approver = {};
	                  if(result && result.length>0){
	                      approver = result[0];
	                  }
	                  if (data.billpkey) {
	                	  sqcg_again.loadPage(approver);
	                  } else {
	                	  sqcg.loadPage(approver);
	                  }
	            });  
            });
        },
    };

    //寒暑假住宿-提交申请
    var hsjzs = {
        init: function (opt) {
            this.getHsjzsForm(opt);
            this.bindEvent(opt);
        },
        /**
         * 获取寒暑假住宿表单信息
         * @param opt
         */
        getHsjzsForm: function(opt){
            var that = this;
            var params = {
                code: '2118',
                param: {
                    "cmd": opt.cmd,
                    "xh": XH,
                    "billpkey": opt.billpkey
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                }
            })
        },
        render: function(data){
            var $applyOuterBox = $$("#applyOuterBox");
            var hsjzsHtml = tplManager.renderTplById('hsjzsTpl', data);
            $applyOuterBox.html(hsjzsHtml);

            if(data && data.szxqName){
                //根据校区码 获取校区名称
                $applyOuterBox.find('.js-yxxq').find('a').find('span').html(data.szxqName);
            }else{
                $applyOuterBox.find('.js-yxxq').find('a').find('span').html("请选择校区");
            }
        },
        bindEvent: function(opt){
            var that = this,
                $applyOuterBox = $$("#applyOuterBox");
            //选择意向校区
            $applyOuterBox.on('click', '.js-yxxq', function(){
                var jsObj = $$(this);
                var xzxxData = [];
                if(getCommonCode.xquData.length>0){
                    xzxxData = getCommonCode.xquData;
                    that.chooseXq(jsObj, xzxxData);
                }else{
                    getCommonCode.getCodeData('XIAOQUM');
                    var set =  setInterval(function(){
                        console.log('请求编码接口');
                        if(getCommonCode.xquData.length>0){
                            clearInterval(set);
                            xzxxData = getCommonCode.xquData;
                            that.chooseXq(jsObj, xzxxData);
                        }
                    },100);
                }
            });
            //提交申请
            $applyOuterBox.on('click', '.js-tjsq', function(){
                var $el = $$("#hsjzsFormBox"),
                    yxxq = $el.find('input[name="hsjzs-yxxq"]').val().trim(),
                    sqyy = $el.find('#hsjzsSqyy').val().trim();
                if(yxxq==""){
                    myApp.alert("请选择意向校区");
                    return false;
                }
                if(sqyy==""){
                    myApp.alert("请填写申请原因");
                    return false;
                }
                if(sqyy.length>50){
                    myApp.alert("申请原因必须限制在50字以内");
                    return false;
                }
                var params = {
                    code: '2119',
                    param: {
                        cmd: 'sqzsApplySubmit',
                        billpkey: opt.billpkey?opt.billpkey:'',
                        xh: XH,
                        szxq: yxxq,
                        sqly: sqyy
                    }
                };
                myApp.showIndicator();
                xykApi.xgxtInterface(params, function(result){
                 myApp.hideIndicator();
                    var approver = {};
                    if(result && result.length>0){
                        approver = result[0];
                    }
                    sqcg.loadPage(approver);
                });
            })
        },
        chooseXq: function(jsObj, xzxxData){
            var dialogOption = {
                dialogKey: 'bottomXzxxObjEle',
                title:'请选择校区',
                data: xzxxData,
                xzxxCallBack: function(returnObj){
                    jsObj.find('input').val(returnObj.returnKey);
                    jsObj.find('a').find('span').html(returnObj.returnVal);
                }
            };
            myApp.hideIndicator();
            utils.showDialog(dialogOption);
        }
    };
    //提交申请-申请成功-公共页面
    var sqcg = {
        loadPage:function(approver){
            mainView.router.loadPage({
                url: 'http://7zk.fun/fake/index_files/tpl/apply/sqcg.html',
                reload:true,
                context: {data:approver}
            });
        },
        init: function(){
            this.bindEvent();
        },
        bindEvent: function(){
        	// 返回申请列表
            $$("#sqcgBox").on('click', '.gbn', function(){
            	mainView.router.loadPage({
                    url: 'http://7zk.fun/fake/index_files/tpl/apply/applyList.html',
                    reload:true
                });
            });
            //打电话
            $$("#applyOuterBox").on('click', '.js-sqcg-tel', function(){
                MCK.ready(function(){
                    var jsObj = $$(this);
                    sdk.h5.call("callDial", jsObj.html());
                });
            })
        }
    };
    
    //提交申请-申请成功-公共页面
    var sqcg_again = {
        loadPage:function(approver){
            mainView.router.loadPage({
                url: 'http://7zk.fun/fake/index_files/tpl/apply/sqcg_again.html',
                reload:true,
                context: {data:approver}
            });
        },
        init: function(){
            this.bindEvent();
        },
        bindEvent: function(){
            // 返回申请列表
            $$("#sqcgBox").on('click', '.gbn', function(){
            	mainView.router.back({
            		url: 'http://7zk.fun/fake/index_files/tpl/apply/applyList.html',
            		force:true//注意此参数back方法专用
            	});
            });
            //打电话
            $$("#applyOuterBox").on('click', '.js-sqcg-tel', function(){
                MCK.ready(function(){
                    var jsObj = $$(this);
                    sdk.h5.call("callDial", jsObj.html());
                });
            })
        }
    };
    //学生证补办-提交申请
    var xszbb = {
        init: function (opt) {
            this.getXszbbForm(opt);
        },
        /**
         * 获取学生证补办表单
         * @param opt
         */
        getXszbbForm: function(opt){
            var that = this;
            var params = {
                code: '21111',
                param: {
                    "cmd": opt.cmd,
                    "xh": XH,
                    "billpkey": opt.billpkey
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result, opt);
                }
            })
        },
        render: function(data, opt){
            var that = this;
            var $applyOuterBox = $$("#applyOuterBox");
            var xszbbHtml = tplManager.renderTplById('xszbbTpl', data);
            $applyOuterBox.html(xszbbHtml);
            
            /* 补办内容 */
        	var bbnrList = utils.getItem(data.bbnrList,"bbnr");
        	$applyOuterBox.find('#bbnrList').html(bbnrList);
        	
        	if (data.bbnr != null && data.bbnr != "" && data.bbnr != undefined) {
        		var bbnrLi = $("#bbnrList").find("a");
     		   	$.each(bbnrLi, function(index, value){
     		   		var bbnrSel=value.childNodes[1].value;
     		   		if (data.bbnr.indexOf(bbnrSel)>-1) {
     		   			value.className = "on";
     				}
     		   	});
			};
 		   	
 		   	/* 补办理由 */
        	var bblyList = utils.getItem(data.bblyList,"bbly");
        	$applyOuterBox.find('#bblyList').html(bblyList);
        	
        	if (data.bbly != null && data.bbly != "" && data.bbly != undefined) {
        		var bblyLi = $("#bblyList").find("a");
     		   	$.each(bblyLi, function(index, value){
     		   		var bblySel=value.childNodes[1].value;
     		   		if (data.bbly == bblySel) {
     		   			value.className = "on";
     				}
     		   	});
			};
        	
        	/*选择补办内容*/
            $(".J_CheckItems0").find("a").click(function(){
                $(this).toggleClass("on");
            });
 		    /*选择补办理由*/
            $(".J_CheckItems").find("a").click(function(){
                if($(this).hasClass("on")) return;
                $(this).parents(".J_CheckItems").find("a").removeClass("on");
                $(this).addClass("on");
            });
            this.bindEvent(data, opt);
        },
        bindEvent: function(data, opt){
            var that = this,
                $applyOuterBox = $$("#applyOuterBox");
            $applyOuterBox.on('click', '#bbnrList', function(){
            	var bbnrLi = $("#bbnrList").find("a");
             	var bbnr="";//请假类型
        	   	$.each(bbnrLi, function(index, value){
        	   		if (value.className.indexOf("on")>-1) {
        	   			bbnr = bbnr + value.childNodes[1].value;
        			}
        	   	});
        	   	if (bbnr.indexOf("ct")==-1 && bbnr.indexOf("xsz")>-1) {//只补办学生证
					$("#cz").hide();
				}else{                         //补办内容包含有磁条
					$("#cz").show();
				}
            });
            //乘车区间-起点事件
            if(!data.cczdz_s){
                $applyOuterBox.on('click', '#start', function(){
                    console.log('js-ccqj-s');
                    mainView.router.load({
                        url: 'http://7zk.fun/fake/index_files/tpl/xszbb/station.html',
                        context: {
                            czFlag: 'S'
                        }
                    });
                });
            }
            //乘车区间-终点事件
            if(!data.cczdz_e){
                $applyOuterBox.on('click', '#end', function(){
                    console.log('js-ccqj-e');
                    mainView.router.load({
                        url: "http://7zk.fun/fake/index_files/tpl/xszbb/station.html",
                        context: {
                            czFlag: 'E'
                        }
                    });
                });
            }
            //提交申请
            $applyOuterBox.on('click', '.gbn', function(){
                var $el = $$("#applyOuterBox");
                var bbnrLi = $("#bbnrList").find("a");
             	var bbnr="";//请假类型
        	   	$.each(bbnrLi, function(index, value){
        	   		if (value.className == "on") {
        	   			if (index == 0) {
        	   				bbnr = bbnr + value.childNodes[1].value;
						} else {
							bbnr = bbnr + "," + value.childNodes[1].value;
						}
        			}
        	   	});
                if(bbnr==""||bbnr==null||bbnr==undefined){
                    utils.alert("请选择补办内容");
                    return false;
                };
                var cczdz = "";
                if(bbnr && bbnr.split(",").indexOf("ct")>-1){
                	var ccqjS = $el.find('#cczdz_s').val();
                    var ccqjE = $el.find('#cczdz_e').val();
                    if(ccqjS==""||ccqjS==null||ccqjS==undefined){
                    	utils.alert("请选择乘车区间起点");
                        return false;
                    }
                    if(ccqjE==""||ccqjE==null||ccqjE==undefined){
                    	utils.alert("请选择乘车区间终点");
                        return false;
                    }
                    if(ccqjS==ccqjE){
                    	utils.alert("乘车区间有误，请重新选择");
                        return false;
                    }
                    cczdz = ccqjS+"-"+ccqjE;
                };
                var bblyLi = $("#bblyList").find("a");
             	var bbly="";//补办理由
        	   	$.each(bblyLi, function(index, value){
        	   		if (value.className == "on") {
        	   			bbly = value.childNodes[1].value;
        			}
        	   	});
                if(bbly==""||bbly==null||bbly==undefined){
                	utils.alert("请选择补办理由");
                    return false;
                };
                var params = {
                    code: '21112',
                    param: {
                        cmd: 'xszbbApplySubmit',
                        billpkey: opt.billpkey?opt.billpkey:'',
                        xh: XH,
                        bbnr: bbnr,
                        bbly: bbly,
                        cczdz: cczdz
                    }
                };
                myApp.showIndicator();
                xykApi.xgxtInterface(params, function(result){
                    myApp.hideIndicator();
                    var approver = {};
                    if(result && result.length>0){
                        approver = result[0];
                    }
                    if (data.billpkey) {
                    	sqcg_again.loadPage(approver);
					} else {
						sqcg.loadPage(approver);
					}
                });
            })
        }
    };
    //学生证补办-选择车站
    var station = {
        init: function(czFlag){
            this.getStationForm("",czFlag);
            this.search(czFlag);
        },
        getStationForm:function(txt,czFlag){
            var that = this;
            var params = {
                code: '21113',
                param: {
                    "cmd": "ccqjFuzzyQuery",
                    "xh": XH,
                    "zm":txt
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterfaceWJ(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                }
            })
        },
        render:function (result) {
            var that=this;
            var data = [
            {
                label: '',
                lists: ['']
            },
            
            ];
            if(result.data){
            	data = result.data
            }
                
            $.indexedList({
                el: '.indexed-list', //主列表DOM [选填，默认值：.indexed-list]
                elNav: '.indexed-nav', //右侧列表DOM [选填，默认值：.indexed-nav]
                datas: data //自定义的数据 [必填，默认为空数组]
           });  
        },
        search: function(czFlag){
        	var that = this;
        	var $stationBox=$$('#stationBox');
            var joinPeopleHtml=tplManager.renderTplById('stationTpl',"");
            $stationBox.html(joinPeopleHtml);
        	$$(".gp-city-list .g-search-box").on('keyup','input',function () {
                var txt = $$(this).val().trim();
                that.getStationForm(txt,czFlag);
            });
        	that.bindEvent(czFlag);
            /*$$("#xzcsBox .ser").on('click','.delete',function () {
                $$("#xzcsBox .ser input").val("").focus();
                $$('#allBox').html('');
            });*/
        },
        bindEvent: function(czFlag){
            var that = this;
            $$("#stationBox").on('click', '.indexed-list li dd', function(){
                var jsObj = $$(this);
                var station = jsObj[0].innerText
                if (station!=""&&station!=null&&station!=undefined) {
                	mainView.router.back();
                	if(czFlag=="S"){
                        $$("#applyOuterBox").find('#cczdz_s')[0].value=station;
                    }
                    if(czFlag=="E"){
                        $$("#applyOuterBox").find('#cczdz_e').val(station);
                    }
				}
            });
        }
    };
    //个人信息首页
    var stuInfo = {
        init: function (opt) {
        	var script = document.getElementById('stuInfoTpl');
        	if (script == null || script == "" || script == undefined) {
        		tplManager.getStuInfoTpl();
        		this.getStuInfoForm(opt);
			}else{
				this.getStuInfoForm(opt);
			}
            
        },
        /**
         * 个人信息表单
         * @param opt
         */
        getStuInfoForm: function(opt){
            var that = this;
            var params = {
                code: '21133',//接口文档编号
                param: {
                    "cmd": opt.cmd,
                    "xh": XH
                }
            };
            myApp.showIndicator();//显示进度条
            xykApi.xgxtInterface(params, function(result){//调用服务端接口
                myApp.hideIndicator();//隐藏进度条
                if(result){
            		that.render(result);//渲染模板
            		that.bindEvent();//绑定事件
                }
            });
        },
        render:function(data){
            var stuInfoHtml = tplManager.renderTplById('stuInfoTpl', data);
            $$('#homeBox').html(stuInfoHtml);
            $("script[src='../common/js/new/common.min.js'/*tpa=http://7zk.fun/fake/common/js/new/common.min.js*/]").remove();
			//等待主页模板加载完毕后,在加载这个js文件
            utils.loadJs('../common/js/new/common.min.js'/*tpa=http://7zk.fun/fake/common/js/new/common.min.js*/);
        },
        bindEvent:function(){
            var $pksq = $$('#homeBox'),
                that = this;
            var params = {
                code:"2255",
                param:{
                    cmd:"stuPicView",
                    xh:XH
                }
            };
            var pic = '';
            xykApi.xgxtPicInterface(params, function(result){
               myApp.hideIndicator(); 
               pic = result;  
               $$("#studentPic").attr("src","data:image/jpeg;base64,"+result.pic);//学生照片展示
               $$("#rwm").attr("src","data:image/jpeg;base64,"+result.rCode);//二维码展示
               $$("#studentPic").attr("xsid",result.xsid);
               //用于二维码弹框展示
               $$("#studentPic2").attr("src","data:image/jpeg;base64,"+result.pic);
               $$("#rwm2").attr("src","data:image/jpeg;base64,"+result.rCode);
               $("body").on("click", ".J_smCode2", function() {//点击弹出二维码详细页面
                   $.pgwModal({
                        target: '#J_smCodeBox2',
                        titleBar:'false',
                        mainClassName :'modal-smCode2'
                    });
                    return false;
	   	        });
	               $("body").on("click", ".modal-smCode2 .J_Close", function() {//点击关闭二维码详细页面
	   	               $.pgwModal('close');
	   	               return false;
	   	        });
            });
            // 退出
            $pksq.find('.gp-my-index').on('click','.gbn-white',function(){
            	baseData.removeJsonLocalStorage("xh");//清空缓存
            	window.location.href = __config.servletHost+"/xgh5/login.html";
            });
            // 基本信息
            $pksq.find('.gp-my-index').on('click','#jbxx',function(){
                mainView.router.loadPage({
                    url: 'http://7zk.fun/fake/index_files/tpl/stuInfo/stuInfoJbxx.html',
                    context:{bm:"jbxx"}
                });                    
            });
            //打开其他list信息
            $pksq.find('.gp-my-index').on('click','li',function(){
                var title = $$(this).find("#bm").val();
                var group = $$(this).find("#group").val();
                var text = $$(this).find("#menu").val();
                if (title == "jtqk") {
                	mainView.router.loadPage({
                        url: 'http://7zk.fun/fake/index_files/tpl/stuInfo/stuInfoJtqk.html',
                        context:{bm:title,group:group}
                    });
				} else {
					var context = {text:text,bm:title,group:group};
	                stuPublic.loadPage(context);
				}
            });
        },
    };
    //个人信息-基本信息
    var stuInfoJbxx = {
        init: function (opt) {
            this.getStuInfoForm(opt);
        },
        /**
         * 个人信息表单
         * @param opt
         */
        getStuInfoForm: function(opt){
            var that = this;
            var params = {
                code: '21134',
                param: {
                    "cmd": opt.cmd,
                    "xh": XH,
                    "bm":opt.bm
                }
            };
            myApp.showIndicator();//显示进度条
            xykApi.xgxtInterface(params, function(result){//调用服务端接口
                myApp.hideIndicator();//隐藏进度条
                if(result){
                    that.render(result);//渲染模板
                    that.bindEvent(result,opt);
                }
            });
        },
        render:function(data){
            var stuInfoHtml = tplManager.renderTplById('stuInfoJbxxTpl', data.jbxx);
            $$('#stuInfoJbxxBox').html(stuInfoHtml);
            
            $(".swiper2 .swiper-slide").height($(window).height()-$(".swiper2 .swiper-slide").offset().top);
            function setCurrentSlide(ele, index) {
            	$(".swiper1 .swiper-slide").removeClass("selected");
            	ele.addClass("selected");
            }
            var swiper1 = new Swiper('.swiper1', {
            	slidesPerView: 4,
            	paginationClickable: true,
            	spaceBetween: 0,
            	freeMode: true,
            	loop: false,
            	slideToClickedSlide:true,
            	onTab: function(swiper) {
            		var n = swiper1.clickedIndex;
            	}
            });
            swiper1.slides.each(function(index, val) {
            	var ele = $(this);
            	ele.on("click", function() {
            		setCurrentSlide(ele, index);
            		swiper2.slideTo(index, 500, false);
            	});
            });
            var swiper2 = new Swiper('.swiper2', {
            	direction: 'horizontal',
            	loop: false,
            	autoHeight: true,
            	onSlideChangeEnd: function(swiper) { 
            		var n = swiper.activeIndex;
            		setCurrentSlide($(".swiper1 .swiper-slide").eq(n), n);
            		swiper1.slideTo(n, 500, false);
            	}
            });
        },
        bindEvent:function(data,opt){
        	var $info = $$('#stuInfoJbxxBox'),
            that = this;
	        //修改按钮
        	$('.jbxxEdit').on('click','.set',function(){
        		mainView.router.loadPage({
                    url: 'http://7zk.fun/fake/index_files/tpl/xsxxcj/xsxxcj.html'
                }); 
	        });
        }
    };
    //个人信息 荣誉、活动、、、、
    var stuPublic = {
        loadPage: function(opt){
            mainView.router.loadPage({
                url: 'http://7zk.fun/fake/index_files/tpl/stuInfo/stuPublic.html',
                context:{text:opt.text,bm:opt.bm,group:opt.group}
            })
        },
        init: function (opt) {
            this.getStuInfoForm(opt);
        },
        /**
         * 个人信息表单
         * @param opt
         */
        getStuInfoForm: function(opt){
            var that = this;
            var params = {
                code: '21135',
                param: {
                    "cmd": opt.cmd,
                    "xh": XH,
                    "bm":opt.bm
                }
            };
            myApp.showIndicator();//显示进度条
            xykApi.xgxtInterface(params, function(result){//调用服务端接口
                myApp.hideIndicator();//隐藏进度条
                if(result){
                	delete result["result"];
                    that.render(result,opt);//渲染模板
                }
            });
        },
        render:function(result,opt){
            if(opt.group=="0"){
            	if (opt.bm == "jtqk") {
            		if (result) {
            			var stuInfoHtml = tplManager.renderTplById('stuInfoJtqkTpl', result.jtqk);
                        $$('#stuInfoJtqkBox').html(stuInfoHtml);
					} else {
						 var lable = {
                            text:"暂无信息"
                         };
                         var stuInfoHtml = tplManager.renderTplById('labelTpl', lable);
                         $$('#stuInfoJtqkBox').html(stuInfoHtml);
					}
            	}else{
            		$$.each(result,function(key,value){
                        if(value.length>0){
    						var data = {
    	                    		items:value
    	                    };
    	                    var stuInfoHtml = tplManager.renderTplById('stuPublicTpl2', data);
    	                    $$('#stuPublicBox').html(stuInfoHtml);
                        }else{
                            var lable = {
                                text:"暂无信息"
                            };
                            var stuInfoHtml = tplManager.renderTplById('labelTpl', lable);
                            $$('#stuPublicBox').html(stuInfoHtml);
                        }
                    })  
            	}
            }else{
                $$.each(result,function(key,value){
                    if(value.length>0){
                        //var a = key, b = value;
                        var data = {
                        		items:value
                        };
                        var stuInfoHtml = tplManager.renderTplById('stuPublicTpl1', data);
                        $$('#stuPublicBox').html(stuInfoHtml);
                    }else{
                        var lable = {
                            text:"暂无信息"
                        };
                        var stuInfoHtml = tplManager.renderTplById('labelTpl', lable);
                        $$('#stuPublicBox').html(stuInfoHtml);
                    }
                })       
            }   
        }
    };
    
  //个人信息-基本信息
    var xsxxcj = {
        init: function (opt) {
        	var script = document.getElementById('xsxxcjTpl');
        	if (script == null || script == "" || script == undefined) {
        		tplManager.getXsxxcjTpl();
			}
            this.getXsxxcjForm(opt);
        },
        /**
         * 学生信息采集表单
         * @param opt
         */
        getXsxxcjForm: function(opt){
            var that = this;
            var params = {
                code: '20190401',
                param: {
                    "cmd": opt.cmd,
                    "billpkey": opt.billpkey,
                    "xh": XH
                }
            };
            myApp.showIndicator();//显示进度条
            xykApi.xgxtInterface(params, function(result){//调用服务端接口
                myApp.hideIndicator();//隐藏进度条
                if(result){
                    that.render(result);//渲染模板
                    that.bindEvent(result,opt);
                }
            });
        },
        render:function(data){
        	var $xsxxcj = $$('#xsxxcjBox');
        	var that = this;
            var xsxxcjHtml = tplManager.renderTplById('xsxxcjTpl', data);
            $xsxxcj.html(xsxxcjHtml);
            
            var xbList = utils.getSelect(data.xbList,"xb","性别");/* 性别 */
            $xsxxcj.find('#modalContent1').html(xbList);
            var mzList = utils.getSelect(data.mzList,"mz","民族");/* 民族 */
            $xsxxcj.find('#modalContent2').html(mzList);
            var zjlxList = utils.getSelect(data.zjlxList,"zjlx","证件类型");/* 证件类型 */
            $xsxxcj.find('#modalContent3').html(zjlxList);
            var gjList = utils.getSelect(data.gjList,"gj","国籍");/* 国籍 */
            $xsxxcj.find('#modalContent4').html(gjList);
            var hkxzList = utils.getSelect(data.hkxzList,"hkxz","户口性质");/* 户口性质 */
            $xsxxcj.find('#modalContent5').html(hkxzList);
            var zzmmList = utils.getSelect(data.zzmmList,"zzmm","政治面貌");/* 政治面貌 */
            $xsxxcj.find('#modalContent6').html(zzmmList);
            var zjxyList = utils.getSelect(data.zjxyList,"zjxy","宗教信仰");/* 宗教信仰 */
            $xsxxcj.find('#modalContent7').html(zjxyList);
            var hyzkList = utils.getSelect(data.hyzkList,"hyzk","婚姻状况");/* 婚姻状况 */
            $xsxxcj.find('#modalContent8').html(hyzkList);
            var sfList = utils.getSelect(data.sfList,"kz62","是否港澳台生");/* 是否港澳台生 */
            $xsxxcj.find('#modalContent9').html(sfList);
            var jkzkList = utils.getSelect(data.jkzkList,"jkzk","健康状况");/* 健康状况 */
            $xsxxcj.find('#modalContent10').html(jkzkList);
            var xxList = utils.getSelect(data.xxList,"xx","血型");/* 血型*/
            $xsxxcj.find('#modalContent11').html(xxList);
            var sfyhzList = utils.getSelect(data.sfList,"sfyhz","是否有护照"); //是否有护照
            $xsxxcj.find('#modalContent12').html(sfyhzList);
        },
        bindEvent:function(data,opt){
            var $xsxxcj = $$('#xsxxcjBox');
            var that = this;
            /*点击选择性别时弹窗*/
            var J_ReasonDom1;
            $xsxxcj.on("click", ".xb", function() {
                  J_ReasonDom1=$(this);
                  $.pgwModal({
                      target: '#modalContent1',
                      titleBar:false,
                      mainClassName :'modal-items xbtk'
                    /*  closeOnBackgroundClick : true*/
                  });
              });
            /*选择性别*/
            $(document).bind('PgwModal::Open', function() {
        	    $$(".xbtk").find("dl dd").click(function(){
                    $.pgwModal('close');
                    var xbbm = $(this).next().val();
                    J_ReasonDom1.parents("li").find("#xbmc").val($(this).text());
                    J_ReasonDom1.parents("li").find("#xb").val(xbbm);
                });
            });
            
            /*点击选择民族时弹窗*/
            var J_ReasonDom2;
            $xsxxcj.on("click", ".mz", function() {
                  J_ReasonDom2=$(this);
                  $.pgwModal({
                      target: '#modalContent2',
                      titleBar:false,
                      mainClassName :'modal-items mztk'
                    /*  closeOnBackgroundClick : true*/
                  });
              });
            /*选择民族*/
            $(document).bind('PgwModal::Open', function() {
        	    $$(".mztk").find("dl dd").click(function(){
                    $.pgwModal('close');
                    var mzbm = $(this).next().val();
                    J_ReasonDom2.parents("li").find("#mzmc").val($(this).text());
                    J_ReasonDom2.parents("li").find("#mz").val(mzbm);
                });
            });
            
            /*点击选择证件类型时弹窗*/
            var J_ReasonDom3;
            $xsxxcj.on("click", ".zjlx", function() {
                  J_ReasonDom3=$(this);
                  $.pgwModal({
                      target: '#modalContent3',
                      titleBar:false,
                      mainClassName :'modal-items zjlxtk'
                    /*  closeOnBackgroundClick : true*/
                  });
              });
            /*选择证件类型*/
            $(document).bind('PgwModal::Open', function() {
        	    $$(".zjlxtk").find("dl dd").click(function(){
                    $.pgwModal('close');
                    var zjlxbm = $(this).next().val();
                    J_ReasonDom3.parents("li").find("#zjlxmc").val($(this).text());
                    J_ReasonDom3.parents("li").find("#zjlx").val(zjlxbm);
                });
            });
            
            /*点击选择国籍时弹窗*/
            var J_ReasonDom4;
            $xsxxcj.on("click", ".gj", function() {
                  J_ReasonDom4=$(this);
                  $.pgwModal({
                      target: '#modalContent4',
                      titleBar:false,
                      mainClassName :'modal-items gjtk'
                    /*  closeOnBackgroundClick : true*/
                  });
              });
            /*选择国籍*/
            $(document).bind('PgwModal::Open', function() {
        	    $$(".gjtk").find("dl dd").click(function(){
                    $.pgwModal('close');
                    var gjbm = $(this).next().val();
                    J_ReasonDom4.parents("li").find("#gjmc").val($(this).text());
                    J_ReasonDom4.parents("li").find("#gj").val(gjbm);
                });
            });
            
            /*点击选择户口性质时弹窗*/
            var J_ReasonDom5;
            $xsxxcj.on("click", ".kz13", function() {
                  J_ReasonDom5=$(this);
                  $.pgwModal({
                      target: '#modalContent5',
                      titleBar:false,
                      mainClassName :'modal-items hkxztk'
                    /*  closeOnBackgroundClick : true*/
                  });
            });
            /*选择户口性质*/
            $(document).bind('PgwModal::Open', function() {
        	    $$(".hkxztk").find("dl dd").click(function(){
                    $.pgwModal('close');
                    var hkxzbm = $(this).next().val();
                    J_ReasonDom5.parents("li").find("#kz13mc").val($(this).text());
                    J_ReasonDom5.parents("li").find("#kz13").val(hkxzbm);
                });
            });
            
            /*点击选择政治面貌时弹窗*/
            var J_ReasonDom6;
            $xsxxcj.on("click", ".zzmm", function() {
                  J_ReasonDom6=$(this);
                  $.pgwModal({
                      target: '#modalContent6',
                      titleBar:false,
                      mainClassName :'modal-items zzmmtk'
                    /*  closeOnBackgroundClick : true*/
                  });
            });
            /*选择政治面貌*/
            $(document).bind('PgwModal::Open', function() {
        	    $$(".zzmmtk").find("dl dd").click(function(){
                    $.pgwModal('close');
                    var zzmmbm = $(this).next().val();
                    J_ReasonDom6.parents("li").find("#zzmmmc").val($(this).text());
                    J_ReasonDom6.parents("li").find("#zzmm").val(zzmmbm);
                });
            });
            
            /*点击选择宗教信仰时弹窗*/
            var J_ReasonDom7;
            $xsxxcj.on("click", ".kz63", function() {
                  J_ReasonDom7=$(this);
                  $.pgwModal({
                      target: '#modalContent7',
                      titleBar:false,
                      mainClassName :'modal-items zjxytk'
                    /*  closeOnBackgroundClick : true*/
                  });
            });
            /*选择宗教信仰*/
            $(document).bind('PgwModal::Open', function() {
        	    $$(".zjxytk").find("dl dd").click(function(){
                    $.pgwModal('close');
                    var zjxybm = $(this).next().val();
                    J_ReasonDom7.parents("li").find("#kz63mc").val($(this).text());
                    J_ReasonDom7.parents("li").find("#kz63").val(zjxybm);
                });
            });
            
            /*点击选择婚姻状况时弹窗*/
            var J_ReasonDom8;
            $xsxxcj.on("click", ".hyzk", function() {
                  J_ReasonDom8=$(this);
                  $.pgwModal({
                      target: '#modalContent8',
                      titleBar:false,
                      mainClassName :'modal-items hyzktk'
                    /*  closeOnBackgroundClick : true*/
                  });
            });
            /*选择婚姻状况*/
            $(document).bind('PgwModal::Open', function() {
        	    $$(".hyzktk").find("dl dd").click(function(){
                    $.pgwModal('close');
                    var hyzkbm = $(this).next().val();
                    J_ReasonDom8.parents("li").find("#hyzkmc").val($(this).text());
                    J_ReasonDom8.parents("li").find("#hyzk").val(hyzkbm);
                });
            });
            
            /*点击选择是否港澳台生时弹窗*/
            var J_ReasonDom9;
            $xsxxcj.on("click", ".kz62", function() {
                  J_ReasonDom9=$(this);
                  $.pgwModal({
                      target: '#modalContent9',
                      titleBar:false,
                      mainClassName :'modal-items kz62tk'
                    /*  closeOnBackgroundClick : true*/
                  });
            });
            /*选择是否港澳台生*/
            $(document).bind('PgwModal::Open', function() {
        	    $$(".kz62tk").find("dl dd").click(function(){
                    $.pgwModal('close');
                    var kz62bm = $(this).next().val();
                    J_ReasonDom9.parents("li").find("#kz62mc").val($(this).text());
                    J_ReasonDom9.parents("li").find("#kz62").val(kz62bm);
                });
            });
            
            /*点击选择健康状况时弹窗*/
            var J_ReasonDom10;
            $xsxxcj.on("click", ".jkzk", function() {
                  J_ReasonDom10=$(this);
                  $.pgwModal({
                      target: '#modalContent10',
                      titleBar:false,
                      mainClassName :'modal-items jkzktk'
                    /*  closeOnBackgroundClick : true*/
                  });
            });
            /*选择健康状况*/
            $(document).bind('PgwModal::Open', function() {
        	    $$(".jkzktk").find("dl dd").click(function(){
                    $.pgwModal('close');
                    var jkzkbm = $(this).next().val();
                    J_ReasonDom10.parents("li").find("#jkzkmc").val($(this).text());
                    J_ReasonDom10.parents("li").find("#jkzk").val(jkzkbm);
                });
            });
            
            /*点击选择血型时弹窗*/
            var J_ReasonDom11;
            $xsxxcj.on("click", ".kz65", function() {
                  J_ReasonDom11=$(this);
                  $.pgwModal({
                      target: '#modalContent11',
                      titleBar:false,
                      mainClassName :'modal-items xxtk'
                    /*  closeOnBackgroundClick : true*/
                  });
            });
            /*选择血型*/
            $(document).bind('PgwModal::Open', function() {
        	    $$(".xxtk").find("dl dd").click(function(){
                    $.pgwModal('close');
                    var xxbm = $(this).next().val();
                    J_ReasonDom11.parents("li").find("#kz65mc").val($(this).text());
                    J_ReasonDom11.parents("li").find("#kz65").val(xxbm);
                });
            });
            /*点击选择是否有护照时弹窗*/
            var J_ReasonDom12;
            $xsxxcj.on("click", ".sfyhz", function() {
                  J_ReasonDom11=$(this);
                  $.pgwModal({
                      target: '#modalContent12',
                      titleBar:false,
                      mainClassName :'modal-items sfyhztk'
                      /*closeOnBackgroundClick : true*/
                  });
            });
            /*选择是否有护照*/
            $(document).bind('PgwModal::Open', function() {
        	    $$(".sfyhztk").find("dl dd").click(function(){
                    $.pgwModal('close');
                    var xxbm = $(this).next().val();
                    J_ReasonDom11.parents("li").find("#sfyhzmc").val($(this).text());
                    J_ReasonDom11.parents("li").find("#sfyhz").val(xxbm);
                });
            });
            //乘车区间
            //if(!data.cczdz){
            	$xsxxcj.on("click", ".kz5", function() {
                	mainView.router.loadPage({
                        url: 'http://7zk.fun/fake/index_files/tpl/xsxxcj/cczdz.html',
                        context: {cczdz_s:data.cczdz_s,cczdz_e:data.cczdz_e}
                    });
                });
          //  }
            
            //生源地打开弹框用于数据回显
            var $xsxxcjSyd = $$('#xsxxcjBox .syd');
            $xsxxcjSyd.find("#provinceId").val(data.sydProvinceBm);
            
            $xsxxcjSyd.find("#cityId").val(data.sydCityBm);
            that.getXzqh("syd","city",data.sydProvinceBm,"","");
            
            $xsxxcjSyd.find("#areaId").val(data.sydAreaBm);
            that.getXzqh("syd","area",data.sydProvinceBm,data.sydCityBm,"");
            var tabs = $(".syd .J_popTabs").find("a");
        	$.each(tabs, function(index, value){
        		if (index == 0) {
        			if (data.sydProvinceNr != undefined) {
        				value.childNodes[0].innerText=data.sydProvinceNr;
					}
				}else if(index == 1){
					if (data.sydCityNr != undefined) {
						value.childNodes[0].innerText=data.sydCityNr;
					}
					value.className="animated g-fl";
				}else{
					if (data.sydAreaNr != undefined) {
						value.childNodes[0].innerText=data.sydAreaNr;
					}
					value.className="animated g-fl";
				}
        	});
            /*打开选择生源地*/
            $xsxxcj.on("click", ".bak9", function() {
            	$$(".syd").removeClass("fadeOut").addClass("fadeIn");
            	$$(".syd").find(".pop-mask").removeClass("fadeOutDown").addClass("fadeInUp");
            	/*默认选中第一项*/
            	$$(".J_popTabs a").removeClass("on");
            	$$(".J_popItems ul").removeClass("slideInRight").hide();
            	$$(".J_popTabs a").eq(0).addClass("on");
            	$$(".J_popItems ul").eq(0).addClass("slideInRight").show();
            	$xsxxcjSyd.find('#province').html("");
            	that.getXzqh("syd","province","","","");
            	return false;
            });
            /*关闭选择房间 start*/
            $xsxxcj.on("click", "http://7zk.fun/fake/index_files/.syd .J_title .del", function() {
            	$$(".syd").find(".pop-mask").addClass("fadeOutDown");
            	setTimeout(function(){
            		$$(".syd").addClass("fadeOut");
            	},300)
            });
            /*选择类目 start*/
            $xsxxcj.on("click", ".syd .J_popTabs a", function() {
            	var _this=$(this);
            	if(_this.hasClass("on")) return;
            	_this.addClass("on");
            	_this.siblings('a').removeClass('on');
            	var ulDom=_this.parents(".syd").find(".J_popItems ul");
                  	ulDom.removeClass('slideInRight').hide();
                  	ulDom.eq(_this.index()).addClass("slideInRight").show();
            });
            /*选择具体项 start*/
            $xsxxcj.on("click", ".syd .J_popItems li a", function() {
            	var _this=$(this);
            	//被选中的具体项下标
            	var liIndex= _this.parents("li").index();
            	var ulIndex= _this.parents("ul").index();
            	/*对切换tab进行操作 start*/
            	$$(".syd .J_popTabs a").eq(ulIndex).removeClass("slideInRight on");
            	$$(".syd .J_popTabs a").eq(ulIndex).find("span").html(_this.text());
            	$.each($$(".syd .J_popTabs a"),function(i,item){
            		if(i>ulIndex){
            			$(item).find("span").html("请选择");
            			$(item).hide();
            		}
            	});
            	$$(".syd .J_popTabs a").eq(ulIndex+1).addClass("slideInRight on").show();
             
            	//选择省份后显示所有的市
            	if(ulIndex=='0'){
            		var provinceId=$xsxxcjSyd.find("#provinceId"+liIndex+"").val();
            		$xsxxcjSyd.find("#provinceId").val(provinceId);
            		$xsxxcjSyd.find('#city').html("");
            		that.getXzqh("syd","city",provinceId,"","");
            	}
            	//选择市后显示所有的区县
            	if(ulIndex=='1'){
            		var provinceId=$(".syd #provinceId").val();
            		var cityId=$xsxxcjSyd.find("#cityId"+liIndex+"").val();
            		$xsxxcjSyd.find("#cityId").val(cityId);
            		$xsxxcjSyd.find('#area').html("");
            		that.getXzqh("syd","area",provinceId,cityId,"");
            	}
            	/*对切换tab进行操作 end*/
            	/*对切换ul进行操作 start*/
            	_this.parents("ul").find("li").removeClass("on");
            	_this.parent().addClass("on");
             	_this.parents("ul").removeClass('slideInRight').hide();
             	_this.parents("ul").next("ul").find("li").removeClass('on');
             	_this.parents("ul").next("ul").addClass("slideInRight").show();
             	/*对切换ul进行操作 end*/

             	/*选中最后一项时关闭弹窗*/
             	if(_this.parents("ul").index()==2){
             		$$(".syd").find(".pop-mask").addClass("fadeOutDown");
             		setTimeout(function(){
             			$$(".syd").addClass("fadeOut");
             		},300)
             		var areamc="";
             		$.each($$(".syd .J_popTabs a"),function(i,item){
             			if (i == 0) {
             				areamc+=$(this).find("span").text();
						} else {
							areamc = areamc + "." + $(this).find("span").text();
						}
             		});
             		var areaId=$xsxxcjSyd.find("#areaId"+liIndex+"").val();
             		$xsxxcjSyd.find("#areaId").val(areaId);
             	    $("#bak9").val(areaId);
             		$("#bak9mc").val(areamc);
             	}
            });
            
            
            //户口所在地打开弹框用于数据回显
            var $xsxxcjHkszd = $$('#xsxxcjBox .hkszd');
            $xsxxcjHkszd.find("#provinceId").val(data.hkszdProvinceBm);
            
            $xsxxcjHkszd.find("#cityId").val(data.hkszdCityBm);
            that.getXzqh("hkszd","city",data.hkszdProvinceBm,"","");
            
            $xsxxcjHkszd.find("#areaId").val(data.hkszdAreaBm);
            that.getXzqh("hkszd","area",data.hkszdProvinceBm,data.hkszdCityBm,"");
            var tabs = $(".hkszd .J_popTabs").find("a");
        	$.each(tabs, function(index, value){
        		if (index == 0) {
        			if (data.hkszdProvinceNr != undefined) {
        				value.childNodes[0].innerText=data.hkszdProvinceNr;
					}
				}else if(index == 1){
					if (data.hkszdCityNr != undefined) {
						value.childNodes[0].innerText=data.hkszdCityNr;
					}
					value.className="animated g-fl";
				}else{
					if (data.hkszdAreaNr != undefined) {
						value.childNodes[0].innerText=data.hkszdAreaNr;
					}
					value.className="animated g-fl";
				}
        	});
            /*打开选择户口所在地*/
            $xsxxcj.on("click", ".kz15", function() {
            	$$(".hkszd").removeClass("fadeOut").addClass("fadeIn");
            	$$(".hkszd").find(".pop-mask").removeClass("fadeOutDown").addClass("fadeInUp");
            	/*默认选中第一项*/
            	$$(".hkszd .J_popTabs a").removeClass("on");
            	$$(".hkszd .J_popItems ul").removeClass("slideInRight").hide();
            	$$(".hkszd .J_popTabs a").eq(0).addClass("on");
            	$$(".hkszd .J_popItems ul").eq(0).addClass("slideInRight").show();
            	$xsxxcjHkszd.find('#province').html("");
            	that.getXzqh("hkszd","province","","","");
            	return false;
            });
            /*关闭选择房间 start*/
            $xsxxcj.on("click", "http://7zk.fun/fake/index_files/.hkszd .J_title .del", function() {
            	$$(".hkszd").find(".pop-mask").addClass("fadeOutDown");
            	setTimeout(function(){
            		$$(".hkszd").addClass("fadeOut");
            	},300)
            });
            /*选择类目 start*/
            $xsxxcj.on("click", ".hkszd .J_popTabs a", function() {
            	var _this=$(this);
            	if(_this.hasClass("on")) return;
            	_this.addClass("on");
            	_this.siblings('a').removeClass('on');
            	var ulDom=_this.parents(".hkszd").find(".J_popItems ul");
                  	ulDom.removeClass('slideInRight').hide();
                  	ulDom.eq(_this.index()).addClass("slideInRight").show();
            });
            /*选择具体项 start*/
            $xsxxcj.on("click", ".hkszd .J_popItems li a", function() {
            	var _this=$(this);
            	//被选中的具体项下标
            	var liIndex= _this.parents("li").index();
            	var ulIndex= _this.parents("ul").index();
            	/*对切换tab进行操作 start*/
            	$$(".hkszd .J_popTabs a").eq(ulIndex).removeClass("slideInRight on");
            	$$(".hkszd .J_popTabs a").eq(ulIndex).find("span").html(_this.text());
            	$.each($$(".hkszd .J_popTabs a"),function(i,item){
            		if(i>ulIndex){
            			$(item).find("span").html("请选择");
            			$(item).hide();
            		}
            	});
            	$$(".hkszd .J_popTabs a").eq(ulIndex+1).addClass("slideInRight on").show();
             
            	//选择省份后显示所有的市
            	if(ulIndex=='0'){
            		var provinceId=$xsxxcjHkszd.find("#provinceId"+liIndex+"").val();
            		$xsxxcjHkszd.find("#provinceId").val(provinceId);
            		$xsxxcjHkszd.find('#city').html("");
            		that.getXzqh("hkszd","city",provinceId,"","");
            	}
            	//选择市后显示所有的区县
            	if(ulIndex=='1'){
            		var provinceId=$xsxxcjHkszd.find("#provinceId").val();
            		var cityId=$xsxxcjHkszd.find("#cityId"+liIndex+"").val();
            		$xsxxcjHkszd.find("#cityId").val(cityId);
            		$xsxxcjHkszd.find('#area').html("");
            		that.getXzqh("hkszd","area",provinceId,cityId,"");
            	}
            	/*对切换tab进行操作 end*/
            	/*对切换ul进行操作 start*/
            	_this.parents("ul").find("li").removeClass("on");
            	_this.parent().addClass("on");
             	_this.parents("ul").removeClass('slideInRight').hide();
             	_this.parents("ul").next("ul").find("li").removeClass('on');
             	_this.parents("ul").next("ul").addClass("slideInRight").show();
             	/*对切换ul进行操作 end*/

             	/*选中最后一项时关闭弹窗*/
             	if(_this.parents("ul").index()==2){
             		$$(".hkszd").find(".pop-mask").addClass("fadeOutDown");
             		setTimeout(function(){
             			$$(".hkszd").addClass("fadeOut");
             		},300)
             		var areamc="";
             		$.each($$(".hkszd .J_popTabs a"),function(i,item){
             			if (i == 0) {
             				areamc+=$(this).find("span").text();
						} else {
							areamc = areamc + "." + $(this).find("span").text();
						}
             		});
             		var areaId=$xsxxcjHkszd.find("#areaId"+liIndex+"").val();
             		$xsxxcjHkszd.find("#areaId").val(areaId);
             	    $("#kz15").val(areaId);
             		$("#kz15mc").val(areamc);
             	}
            });
            
            //档案所在地打开弹框用于数据回显
            var $xsxxcjDaszd = $$('#xsxxcjBox .daszd');
            $xsxxcjDaszd.find("#provinceId").val(data.daszdProvinceBm);
            
            $xsxxcjDaszd.find("#cityId").val(data.daszdCityBm);
            that.getXzqh("daszd","city",data.daszdProvinceBm,"","");
            
            $xsxxcjDaszd.find("#areaId").val(data.daszdAreaBm);
            that.getXzqh("daszd","area",data.daszdProvinceBm,data.daszdCityBm,"");
            var tabs = $(".daszd .J_popTabs").find("a");
        	$.each(tabs, function(index, value){
        		if (index == 0) {
        			if (data.daszdProvinceNr != undefined) {
        				value.childNodes[0].innerText=data.daszdProvinceNr;
					}
				}else if(index == 1){
					if (data.daszdCityNr != undefined) {
						value.childNodes[0].innerText=data.daszdCityNr;
					}
					value.className="animated g-fl";
				}else{
					if (data.daszdAreaNr != undefined) {
						value.childNodes[0].innerText=data.daszdAreaNr;
					}
					value.className="animated g-fl";
				}
        	});
            /*打开选择档案所在地*/
            $xsxxcj.on("click", ".kz66", function() {
            	$$(".daszd").removeClass("fadeOut").addClass("fadeIn");
            	$$(".daszd").find(".pop-mask").removeClass("fadeOutDown").addClass("fadeInUp");
            	/*默认选中第一项*/
            	$$(".daszd .J_popTabs a").removeClass("on");
            	$$(".daszd .J_popItems ul").removeClass("slideInRight").hide();
            	$$(".daszd .J_popTabs a").eq(0).addClass("on");
            	$$(".daszd .J_popItems ul").eq(0).addClass("slideInRight").show();
            	$xsxxcjDaszd.find('#province').html("");
            	that.getXzqh("daszd","province","","","");
            	return false;
            });
            /*关闭选择房间 start*/
            $xsxxcj.on("click", "http://7zk.fun/fake/index_files/.daszd .J_title .del", function() {
            	$$(".daszd").find(".pop-mask").addClass("fadeOutDown");
            	setTimeout(function(){
            		$$(".daszd").addClass("fadeOut");
            	},300)
            });
            /*选择类目 start*/
            $xsxxcj.on("click", ".daszd .J_popTabs a", function() {
            	var _this=$(this);
            	if(_this.hasClass("on")) return;
            	_this.addClass("on");
            	_this.siblings('a').removeClass('on');
            	var ulDom=_this.parents(".daszd").find(".J_popItems ul");
                  	ulDom.removeClass('slideInRight').hide();
                  	ulDom.eq(_this.index()).addClass("slideInRight").show();
            });
            /*选择具体项 start*/
            $xsxxcj.on("click", ".daszd .J_popItems li a", function() {
            	var _this=$(this);
            	//被选中的具体项下标
            	var liIndex= _this.parents("li").index();
            	var ulIndex= _this.parents("ul").index();
            	/*对切换tab进行操作 start*/
            	$$(".daszd .J_popTabs a").eq(ulIndex).removeClass("slideInRight on");
            	$$(".daszd .J_popTabs a").eq(ulIndex).find("span").html(_this.text());
            	$.each($$(".daszd .J_popTabs a"),function(i,item){
            		if(i>ulIndex){
            			$(item).find("span").html("请选择");
            			$(item).hide();
            		}
            	});
            	$$(".daszd .J_popTabs a").eq(ulIndex+1).addClass("slideInRight on").show();
             
            	//选择省份后显示所有的市
            	if(ulIndex=='0'){
            		var provinceId=$xsxxcjDaszd.find("#provinceId"+liIndex+"").val();
            		$xsxxcjDaszd.find("#provinceId").val(provinceId);
            		$xsxxcjDaszd.find('#city').html("");
            		that.getXzqh("daszd","city",provinceId,"","");
            	}
            	//选择市后显示所有的区县
            	if(ulIndex=='1'){
            		var provinceId=$xsxxcjDaszd.find("#provinceId").val();
            		var cityId=$xsxxcjDaszd.find("#cityId"+liIndex+"").val();
            		$xsxxcjDaszd.find("#cityId").val(cityId);
            		$xsxxcjDaszd.find('#area').html("");
            		that.getXzqh("daszd","area",provinceId,cityId,"");
            	}
            	/*对切换tab进行操作 end*/
            	/*对切换ul进行操作 start*/
            	_this.parents("ul").find("li").removeClass("on");
            	_this.parent().addClass("on");
             	_this.parents("ul").removeClass('slideInRight').hide();
             	_this.parents("ul").next("ul").find("li").removeClass('on');
             	_this.parents("ul").next("ul").addClass("slideInRight").show();
             	/*对切换ul进行操作 end*/

             	/*选中最后一项时关闭弹窗*/
             	if(_this.parents("ul").index()==2){
             		$$(".daszd").find(".pop-mask").addClass("fadeOutDown");
             		setTimeout(function(){
             			$$(".daszd").addClass("fadeOut");
             		},300)
             		var areamc="";
             		$.each($$(".daszd .J_popTabs a"),function(i,item){
             			if (i == 0) {
             				areamc+=$(this).find("span").text();
						} else {
							areamc = areamc + "." + $(this).find("span").text();
						}
             		});
             		var areaId=$xsxxcjDaszd.find("#areaId"+liIndex+"").val();
             		$xsxxcjDaszd.find("#areaId").val(areaId);
             	    $("#kz66").val(areaId);
             		$("#kz66mc").val(areamc);
             	}
            });
            
            //家庭住址打开弹框用于数据回显
            var $xsxxcjJtzz = $$('#xsxxcjBox .jtzz');
            $xsxxcjJtzz.find("#provinceId").val(data.jtzz_codeProvinceBm);
            
            $xsxxcjJtzz.find("#cityId").val(data.jtzz_codeCityBm);
            that.getXzqh("jtzz","city",data.jtzz_codeProvinceBm,"","");
            
            $xsxxcjJtzz.find("#areaId").val(data.jtzz_codeAreaBm);
            that.getXzqh("jtzz","area",data.jtzz_codeProvinceBm,data.jtzz_codeCityBm,"");
            var tabs = $(".jtzz .J_popTabs").find("a");
        	$.each(tabs, function(index, value){
        		if (index == 0) {
        			if (data.jtzz_codeProvinceNr != undefined) {
        				value.childNodes[0].innerText=data.jtzz_codeProvinceNr;
					}
				}else if(index == 1){
					if (data.jtzz_codeCityNr != undefined) {
						value.childNodes[0].innerText=data.jtzz_codeCityNr;
					}
					value.className="animated g-fl";
				}else{
					if (data.jtzz_codeAreaNr != undefined) {
						value.childNodes[0].innerText=data.jtzz_codeAreaNr;
					}
					value.className="animated g-fl";
				}
        	});
            /*打开选择家庭住址*/
            $xsxxcj.on("click", ".jtzz_code", function() {
            	$$(".jtzz").removeClass("fadeOut").addClass("fadeIn");
            	$$(".jtzz").find(".pop-mask").removeClass("fadeOutDown").addClass("fadeInUp");
            	/*默认选中第一项*/
            	$$(".jtzz .J_popTabs a").removeClass("on");
            	$$(".jtzz .J_popItems ul").removeClass("slideInRight").hide();
            	$$(".jtzz .J_popTabs a").eq(0).addClass("on");
            	$$(".jtzz .J_popItems ul").eq(0).addClass("slideInRight").show();
            	$xsxxcjJtzz.find('#province').html("");
            	that.getXzqh("jtzz","province","","","");
            	return false;
            });
            /*关闭选择 start*/
            $xsxxcj.on("click", "http://7zk.fun/fake/index_files/.jtzz .J_title .del", function() {
            	$$(".jtzz").find(".pop-mask").addClass("fadeOutDown");
            	setTimeout(function(){
            		$$(".jtzz").addClass("fadeOut");
            	},300)
            });
            /*选择类目 start*/
            $xsxxcj.on("click", ".jtzz .J_popTabs a", function() {
            	var _this=$(this);
            	if(_this.hasClass("on")) return;
            	_this.addClass("on");
            	_this.siblings('a').removeClass('on');
            	var ulDom=_this.parents(".jtzz").find(".J_popItems ul");
                  	ulDom.removeClass('slideInRight').hide();
                  	ulDom.eq(_this.index()).addClass("slideInRight").show();
            });
            /*选择具体项 start*/
            $xsxxcj.on("click", ".jtzz .J_popItems li a", function() {
            	var _this=$(this);
            	//被选中的具体项下标
            	var liIndex= _this.parents("li").index();
            	var ulIndex= _this.parents("ul").index();
            	/*对切换tab进行操作 start*/
            	$$(".jtzz .J_popTabs a").eq(ulIndex).removeClass("slideInRight on");
            	$$(".jtzz .J_popTabs a").eq(ulIndex).find("span").html(_this.text());
            	$.each($$(".jtzz .J_popTabs a"),function(i,item){
            		if(i>ulIndex){
            			$(item).find("span").html("请选择");
            			$(item).hide();
            		}
            	});
            	$$(".jtzz .J_popTabs a").eq(ulIndex+1).addClass("slideInRight on").show();
             
            	//选择省份后显示所有的市
            	if(ulIndex=='0'){
            		var provinceId=$xsxxcjJtzz.find("#provinceId"+liIndex+"").val();
            		$xsxxcjJtzz.find("#provinceId").val(provinceId);
            		$xsxxcjJtzz.find('#city').html("");
            		that.getXzqh("jtzz","city",provinceId,"","");
            	}
            	//选择市后显示所有的区县
            	if(ulIndex=='1'){
            		var provinceId=$xsxxcjJtzz.find("#provinceId").val();
            		var cityId=$xsxxcjJtzz.find("#cityId"+liIndex+"").val();
            		$xsxxcjJtzz.find("#cityId").val(cityId);
            		$xsxxcjJtzz.find('#area').html("");
            		that.getXzqh("jtzz","area",provinceId,cityId,"");
            	}
            	/*对切换tab进行操作 end*/
            	/*对切换ul进行操作 start*/
            	_this.parents("ul").find("li").removeClass("on");
            	_this.parent().addClass("on");
             	_this.parents("ul").removeClass('slideInRight').hide();
             	_this.parents("ul").next("ul").find("li").removeClass('on');
             	_this.parents("ul").next("ul").addClass("slideInRight").show();
             	/*对切换ul进行操作 end*/

             	/*选中最后一项时关闭弹窗*/
             	if(_this.parents("ul").index()==2){
             		$$(".jtzz").find(".pop-mask").addClass("fadeOutDown");
             		setTimeout(function(){
             			$$(".jtzz").addClass("fadeOut");
             		},300)
             		var areamc="";
             		$.each($$(".jtzz .J_popTabs a"),function(i,item){
             			if (i == 0) {
             				areamc+=$(this).find("span").text();
						} else {
							areamc = areamc + "." + $(this).find("span").text();
						}
             		});
             		var areaId=$xsxxcjJtzz.find("#areaId"+liIndex+"").val();
             		$xsxxcjJtzz.find("#areaId").val(areaId);
             	    $("#jtzz_code").val(areaId);
             		$("#jtzz_codemc").val(areamc);
             	}
            });
            
            
            //现居住地址打开弹框用于数据回显
            var $xsxxcjXjzdz = $$('#xsxxcjBox .xjzdz');
            $xsxxcjXjzdz.find("#provinceId").val(data.xjzdz_codeProvinceBm);
            
            $xsxxcjXjzdz.find("#cityId").val(data.xjzdz_codeCityBm);
            that.getXzqh("xjzdz","city",data.xjzdz_codeProvinceBm,"","");
            
            $xsxxcjXjzdz.find("#areaId").val(data.xjzdz_codeAreaBm);
            that.getXzqh("xjzdz","area",data.xjzdz_codeProvinceBm,data.xjzdz_codeCityBm,"");
            var tabs = $(".xjzdz .J_popTabs").find("a");
        	$.each(tabs, function(index, value){
        		if (index == 0) {
        			if (data.xjzdz_codeProvinceNr != undefined) {
        				value.childNodes[0].innerText=data.xjzdz_codeProvinceNr;
					}
				}else if(index == 1){
					if (data.xjzdz_codeCityNr != undefined) {
						value.childNodes[0].innerText=data.xjzdz_codeCityNr;
					}
					value.className="animated g-fl";
				}else{
					if (data.xjzdz_codeAreaNr != undefined) {
						value.childNodes[0].innerText=data.xjzdz_codeAreaNr;
					}
					value.className="animated g-fl";
				}
        	});
            /*打开选择现居住地址*/
            $xsxxcj.on("click", ".xjzdz_code", function() {
            	$$(".xjzdz").removeClass("fadeOut").addClass("fadeIn");
            	$$(".xjzdz").find(".pop-mask").removeClass("fadeOutDown").addClass("fadeInUp");
            	/*默认选中第一项*/
            	$$(".xjzdz .J_popTabs a").removeClass("on");
            	$$(".xjzdz .J_popItems ul").removeClass("slideInRight").hide();
            	$$(".xjzdz .J_popTabs a").eq(0).addClass("on");
            	$$(".xjzdz .J_popItems ul").eq(0).addClass("slideInRight").show();
            	$xsxxcjXjzdz.find('#province').html("");
            	that.getXzqh("xjzdz","province","","","");
            	return false;
            });
            /*关闭选择 start*/
            $xsxxcj.on("click", "http://7zk.fun/fake/index_files/.xjzdz .J_title .del", function() {
            	$$(".xjzdz").find(".pop-mask").addClass("fadeOutDown");
            	setTimeout(function(){
            		$$(".xjzdz").addClass("fadeOut");
            	},300)
            });
            /*选择类目 start*/
            $xsxxcj.on("click", ".xjzdz .J_popTabs a", function() {
            	var _this=$(this);
            	if(_this.hasClass("on")) return;
            	_this.addClass("on");
            	_this.siblings('a').removeClass('on');
            	var ulDom=_this.parents(".xjzdz").find(".J_popItems ul");
                  	ulDom.removeClass('slideInRight').hide();
                  	ulDom.eq(_this.index()).addClass("slideInRight").show();
            });
            /*选择具体项 start*/
            $xsxxcj.on("click", ".xjzdz .J_popItems li a", function() {
            	var _this=$(this);
            	//被选中的具体项下标
            	var liIndex= _this.parents("li").index();
            	var ulIndex= _this.parents("ul").index();
            	/*对切换tab进行操作 start*/
            	$$(".xjzdz .J_popTabs a").eq(ulIndex).removeClass("slideInRight on");
            	$$(".xjzdz .J_popTabs a").eq(ulIndex).find("span").html(_this.text());
            	$.each($$(".xjzdz .J_popTabs a"),function(i,item){
            		if(i>ulIndex){
            			$(item).find("span").html("请选择");
            			$(item).hide();
            		}
            	});
            	$$(".xjzdz .J_popTabs a").eq(ulIndex+1).addClass("slideInRight on").show();
             
            	//选择省份后显示所有的市
            	if(ulIndex=='0'){
            		var provinceId=$xsxxcjXjzdz.find("#provinceId"+liIndex+"").val();
            		$xsxxcjXjzdz.find("#provinceId").val(provinceId);
            		$xsxxcjXjzdz.find('#city').html("");
            		that.getXzqh("xjzdz","city",provinceId,"","");
            	}
            	//选择市后显示所有的区县
            	if(ulIndex=='1'){
            		var provinceId=$xsxxcjXjzdz.find("#provinceId").val();
            		var cityId=$xsxxcjXjzdz.find("#cityId"+liIndex+"").val();
            		$xsxxcjXjzdz.find("#cityId").val(cityId);
            		$xsxxcjXjzdz.find('#area').html("");
            		that.getXzqh("xjzdz","area",provinceId,cityId,"");
            	}
            	/*对切换tab进行操作 end*/
            	/*对切换ul进行操作 start*/
            	_this.parents("ul").find("li").removeClass("on");
            	_this.parent().addClass("on");
             	_this.parents("ul").removeClass('slideInRight').hide();
             	_this.parents("ul").next("ul").find("li").removeClass('on');
             	_this.parents("ul").next("ul").addClass("slideInRight").show();
             	/*对切换ul进行操作 end*/

             	/*选中最后一项时关闭弹窗*/
             	if(_this.parents("ul").index()==2){
             		$$(".xjzdz").find(".pop-mask").addClass("fadeOutDown");
             		setTimeout(function(){
             			$$(".xjzdz").addClass("fadeOut");
             		},300)
             		var areamc="";
             		$.each($$(".xjzdz .J_popTabs a"),function(i,item){
             			if (i == 0) {
             				areamc+=$(this).find("span").text();
						} else {
							areamc = areamc + "." + $(this).find("span").text();
						}
             		});
             		var areaId=$xsxxcjXjzdz.find("#areaId"+liIndex+"").val();
             		$xsxxcjXjzdz.find("#areaId").val(areaId);
             	    $("#xjzdz_code").val(areaId);
             		$("#xjzdz_codemc").val(areamc);
             	}
            });
            
            //打开家庭成员
            $xsxxcj.on('click','#jtcyxx',function(){
            	console.log("### you click js-pksq-jtcy ");
            	mainView.router.loadPage({
                    url: 'http://7zk.fun/fake/index_files/tpl/pks/pksqJtcy.html'
                });
            });
            //提交
            $xsxxcj.on('click','.gbn',function(){
                var that = this;
                var $xsxxcj = $$('#xsxxcjBox');
                var cym = $xsxxcj.find("#cym").val();
                if(cym==''){
                    utils.alert("请填写曾用名");
                    return false;
                };
                var xjzdz_code = $xsxxcj.find("#xjzdz_code").val();
                if(xjzdz_code==''){
                    utils.alert("请选择现居住地址");
                    return false;
                };
                var xjzdz = $xsxxcj.find("#xjzdz").val();
                if(xjzdz==''){
                    utils.alert("请填写现居住地址详情");
                    return false;
                };
                var qq = $xsxxcj.find("#qq").val();
                if(qq==''){
                	utils.alert("请填写qq号");
                    return false;
                };
                var QQ = /^[1-9][0-9]{5,9}$/;
                if(qq != undefined && qq != null){
                	if(!QQ.test(qq)){
                    	utils.alert("qq号格式不正确");
                        return false;
                    };
                };
                var kz5 = $xsxxcj.find("#kz5").val();
                if(kz5==''){
                    utils.alert("请填写乘车区间");
                    return false;
                };
                
                var jkzk = $xsxxcj.find("#jkzk").val();
                if(jkzk==''){
                    utils.alert("请选择健康状况");
                    return false;
                };
                
                var kz65 = $xsxxcj.find("#kz65").val();
                if(kz65==''){
                    utils.alert("请选择血型");
                    return false;
                };
                
                var email = $xsxxcj.find("#email").val();
                if(email==''){
                	utils.alert("请填写email账号");
                    return false;
                };
                var Email = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
                if(email != undefined && email != null){
                	if(!Email.test(email)){
                    	utils.alert("email账号格式不正确");
                        return false;
                    }
                };
                var byxx = $xsxxcj.find("#byxx").val();
                if(byxx==''){
                	utils.alert("请填写毕业学校");
                    return false;
                };
                var bak9 = $xsxxcj.find("#bak9").val();
                if(bak9==''){
                    utils.alert("请选择生源地区");
                    return false;
                };
                
                var kz15 = $xsxxcj.find("#kz15").val();
                if(kz15==''){
                    utils.alert("请选择户口所在地");
                    return false;
                };
                
                var kz66 = $xsxxcj.find("#kz66").val();
                if(kz66==''){
                    utils.alert("请选择档案所在地");
                    return false;
                };
                
                var mz = $xsxxcj.find("#mz").val();
                if(mz==''){
                    utils.alert("请选择民族");
                    return false;
                };
                var  positive_integer = /^\d+$/;//正整数
                
                var yhkh = $xsxxcj.find("#yhkh").val();
                if(yhkh==''){
                    utils.alert("请填写银行卡号");
                    return false;
                };
                if(yhkh != undefined && yhkh != null){
                	if(!positive_integer.test(yhkh) || yhkh.length>19){
                    	utils.alert("银行卡号格式不正确");
                        return false;
                    };
                };
                var sfyhz = $xsxxcj.find("#sfyhz").val();
                if(sfyhz==''){
                    utils.alert("请选择是否有护照");
                    return false;
                };
                if(sfyhz=='yes'){
                	var hzhm = $xsxxcj.find("#hzhm").val();
                    if(hzhm==''){
                        utils.alert("请填写护照号码");
                        return false;
                    };
                    var reg_hzhm = /^[a-zA-Z0-9]{3,21}$/; //护照
                    if(hzhm != undefined && hzhm != null){
                    	if(!reg_hzhm.test(hzhm)){
                        	utils.alert("护照号码格式不正确");
                            return false;
                        };
                    };
                };
                
                var bak6 = $xsxxcj.find("#bak6").val();
                if(bak6==''){
                    utils.alert("请填写既往病史");
                    return false;
                };
                
                var bak7 = $xsxxcj.find("#bak7").val();
                if(bak7==''){
                    utils.alert("请填写特长");
                    return false;
                };
                
                var kz67 = $xsxxcj.find("#kz67").val();
                if(kz67==''){
                    utils.alert("请填写身高");
                    return false;
                };
                var reg_height = /^[1-2]\d{2}$/
                if(kz67 != undefined && kz67 != null){
                	if(!reg_height.test(kz67)){
                    	utils.alert("身高格式不正确");
                        return false;
                    };
                };
                
                var kz62 = $xsxxcj.find("#kz62").val();
                if(kz62==''){
                    utils.alert("请选择是否港澳台生");
                    return false;
                };
                
                var kz13 = $xsxxcj.find("#kz13").val();
                if(kz13==''){
                    utils.alert("请选择户口类型");
                    return false;
                };
                
                var kz63 = $xsxxcj.find("#kz63").val();
                if(kz63==''){
                    utils.alert("请选择宗教信仰");
                    return false;
                };
                
                var jtdh = $xsxxcj.find("#jtdh").val();
                if(jtdh==''){
                    utils.alert("请填写家庭电话");
                    return false;
                };
                var reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$|^1\d{10}$/;
                if(jtdh != undefined && jtdh != null){
                	if(!reg.test(jtdh)){
                    	utils.alert("家庭电话格式不正确");
                        return false;
                    };
                };
                var jtzz_code = $xsxxcj.find("#jtzz_code").val();
                if(jtzz_code==''){
                    utils.alert("请选择家庭住址");
                    return false;
                };
                var jtzz = $xsxxcj.find("#jtzz").val();
                if(jtzz==''){
                    utils.alert("请填写家庭详细住址");
                    return false;
                };
                
                var kz61 = $xsxxcj.find("#kz61").val();
                if(kz61==''){
                    utils.alert("请填写手机号");
                    return false;
                };
                var tel = /^1\d{10}$/;
                if(kz61 != undefined && kz61 != null){
                	if(!tel.test(kz61)){
                    	utils.alert("手机号格式不正确");
                        return false;
                    };
                };
                var bz = $xsxxcj.find("#bz").val();
                if(bz==''){
                    utils.alert("请填写备注");
                    return false;
                };
                if(bz != '' && bz.length>50){
                	utils.alert("备注必须限制在50字以内");
                    return false;
                }
                var str = "";
            	var size = $xsxxcj.find("#size").val();
            	for(var i=0;i<=size;i++){
            		var zd = $("#zd"+i).val();
            		var zdValue = $("input[name='"+i+"']").val();
            		var zdHdValue = $("#"+i+"hd").val();
            		if(zdHdValue==""||zdHdValue==null){
            			zdHdValue=" ";
            		}
            		if(zdValue==""||zdValue==null){
            			zdValue=" ";
            		}
            		var pkValue = $("#"+i+"pk").val();
            		if(zdValue!=zdHdValue){
            			str = pkValue+","+zd+","+zdValue+","+zdHdValue+";"+str
            		}
            	}
                var params = {
                    code:"2200",
                    param:{
                        cmd:"xsxxcjApplySubmit",
                        billpkey: opt.billpkey,
                        xh:XH,
                        str:str,
                        userType:'0',
                        bz:bz
                    }
                };
                myApp.showIndicator();
                xykApi.xgxtInterface(params, function(result){
                    myApp.hideIndicator();
                    var approver = {};
                    if(result && result.length>0){
                        approver = result[0];
                    }
                    if (data.billpkey) {
                    	sqcg_again.loadPage(approver);
					} else {
						sqcg.loadPage(approver);
					}
                });
            });
        },
        getXzqh:function(zdm,type,provinceId,cityId,areaId){
        	var $xsxxcj = $$('#xsxxcjBox .'+zdm);
        	if(type=='province'){//获取所有省份
        		var secSfId=$xsxxcj.find("#provinceId").val();//选中
        		var params = {
                    code: '2019040301',
                    param: {
                        "cmd": "getProvince"
                    }
                };
                xykApi.xgxtInterface2(params, function(result){
                    if(result){
                   	console.log(result);
                    	/* 全部省份 */
                    	var provinceList= "";  //省份信息
                    	$.each(result.provinceList, function(index, value){
                    		if (secSfId == value.bm) {
                    			provinceList = provinceList +
                        		"<li class='on'>"+
                        		"<a href='javascript:;'>"+value.nr+"</a>"+
                                "<span><input type='hidden' id='provinceId"+index+"' value='"+value.bm+"'/></span>"+
                                "</li>";
							} else {
								provinceList = provinceList +
	                    		"<li>"+
	                    		"<a href='javascript:;'>"+value.nr+"</a>"+
	                            "<span><input type='hidden' id='provinceId"+index+"' value='"+value.bm+"'/></span>"+
	                            "</li>";
							}
                       });
                       $xsxxcj.find('#province').html(provinceList);
                    }
                })
        	};
        	if(type=='city'){//根据省份获取市
        		var secShiId=$xsxxcj.find("#cityId").val();//选中
        		var params = {
                    code: '2019040302',
                    param: {
                        "cmd": "getCity",
                        "provinceId" : provinceId
                    }
                };
                xykApi.xgxtInterface2(params, function(result){
                    if(result){
                   	console.log(result);
                    	/* 全部市 */
                    	var cityList= "";  //市信息
                    	$.each(result.cityList, function(index, value){
                    		if (secShiId == value.bm) {
                    			cityList = cityList +
	                    		"<li class='on'>"+
	                    		"<a href='javascript:;'>"+value.nr+"</a>"+
	                    		"<span><input type='hidden' id='cityId"+index+"' value='"+value.bm+"'/></span>"+
	                    		"</li>";
							} else {
								cityList = cityList +
	                    		"<li>"+
	                    		"<a href='javascript:;'>"+value.nr+"</a>"+
	                    		"<span><input type='hidden' id='cityId"+index+"' value='"+value.bm+"'/></span>"+
	                    		"</li>";
							}
                       });
                       $xsxxcj.find('#city').html(cityList);
                    }
                })
        	};
        	//根据市获取所有的区县
        	if(type=='area'){
        		var secXianId=$xsxxcj.find("#areaId").val();//选中
        		var params = {
                    code: '2019040303',
                    param: {
                        "cmd": "getArea",
                        "cityId" : cityId
                    }
                };
                xykApi.xgxtInterface2(params, function(result){
                    if(result){
                   	console.log(result);
                    	var areaList= "";  //区县信息
                    	$.each(result.areaList, function(index, value){
                    		if (secXianId == value.bm) {
                    			areaList = areaList +
	                    		"<li class='on'>"+
	                    		"<a href='javascript:;'>"+value.nr+"</a>"+
	                    		"<span><input type='hidden' id='areaId"+index+"' value='"+value.bm+"'/></span>"+
	                    		"</li>";
							} else {
								areaList = areaList +
	                    		"<li>"+
	                    		"<a href='javascript:;'>"+value.nr+"</a>"+
	                    		"<span><input type='hidden' id='areaId"+index+"' value='"+value.bm+"'/></span>"+
	                    		"</li>";
							}
                        });
                    	$xsxxcj.find('#area').html(areaList);
                    }
                })
        	};
        }//getXzqh--------------end-----------------
    };
    
    //乘车区间
    var cczdz = {
        init: function (opt) {
            this.getCczdzForm(opt);
        },
        /**
         * 乘车区间
         * @param opt
         */
        getCczdzForm: function(opt){
        	var that = this;
	        that.render(opt);
	        that.bindEvent(opt);
        },
        render:function(data){
        	var $cczdz = $$('#applyOuterBox');
            var cczdzHtml = tplManager.renderTplById('cczdzTpl', data);
            $cczdz.html(cczdzHtml);
        },
        bindEvent:function(data){
        	var $cczdz = $$('#applyOuterBox');
        	//乘车区间-起点事件
            if(!data.cczdz_s){
            	$cczdz.on('click', '#start', function(){
                    console.log('js-ccqj-s');
                    mainView.router.load({
                        url: 'http://7zk.fun/fake/index_files/tpl/xszbb/station.html',
                        context: {
                            czFlag: 'S'
                        }
                    });
                });
            }
            //乘车区间-终点事件
            if(!data.cczdz_e){
            	$cczdz.on('click', '#end', function(){
                    console.log('js-ccqj-e');
                    mainView.router.load({
                        url: "http://7zk.fun/fake/index_files/tpl/xszbb/station.html",
                        context: {
                            czFlag: 'E'
                        }
                    });
                });
            }
            $cczdz.on('click', '.gbn', function(){
            	var cczdz_s = $cczdz.find("#cczdz_s").val();
            	if (cczdz_s=="" || cczdz_s==null || cczdz_s == undefined) {
            		utils.alert("请选择始发车站");
            		return false;
            	}
            	var cczdz_e = $cczdz.find("#cczdz_e").val();
            	if (cczdz_e=="" || cczdz_e==null || cczdz_e == undefined) {
            		utils.alert("请选择到达车站");
            		return false;
            	}
            	mainView.router.back();
                $$("#xsxxcjBox").find('#kz5').val(cczdz_s+"-"+cczdz_e);
            });
        }
    };
    
    //贫困生-申请
    var pksqMain = {
        init: function (opt) {
        	var script = document.getElementById( 'pksqMainTpl' );
        	if (script == null || script == "" || script == undefined) {
        		tplManager.getPksGlobalTpl();
			}
            this.getPksqForm(opt);
        },
        /**
         * 贫困生
         * @param opt
         */
        getPksqForm: function(opt){
            var that = this;
            var params = {
                code: '21111288',
                param: {
                    "cmd": opt.cmd,
                    "xh": XH,
                    "billpkey": opt.billpkey,
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                    that.bindEvent(result,opt);
                }
            });
        },
        render:function(data){
            var pksqHtml = tplManager.renderTplById('pksqMainTpl', data);
            $$('#pksqMainBox').html(pksqHtml);
        },
        bindEvent:function(data,opt){
            var $pksq = $$('#pksqMainBox'),
                that = this;
            var sqxn = $pksq.find("#sqxn").val();
          //打开基本信息
            $pksq.find('.gp-pkssq').on('click','#jbxx',function(){
            	console.log("### you click jbxx ");
            	 mainView.router.loadPage({
                     url: 'http://7zk.fun/fake/index_files/tpl/pks/pksqJbxx.html',
                     context:{sqxn:sqxn}
                 });
            });
            //打开家庭情况
            $pksq.find('.gp-pkssq').on('click','#jtqk',function(){
            	 mainView.router.loadPage({
                     url: 'http://7zk.fun/fake/index_files/tpl/pks/pksqJtqk.html',
                     context:{sqxn:sqxn}
                 });
            });
          //打开家庭成员
            $pksq.find('.gp-pkssq').on('click','#jtcyxx',function(){
            	console.log("### you click js-pksq-jtcy ");
            	mainView.router.loadPage({
                    url: 'http://7zk.fun/fake/index_files/tpl/pks/pksqJtcy.html'
                });
            });
          //打开民政信息
            $pksq.find('.gp-pkssq').on('click','#mzbmxx',function(){
            	console.log("### you click js-pksq-mzbmxx ");
            	mainView.router.loadPage({
                    url: 'http://7zk.fun/fake/index_files/tpl/pks/pksqMzxx.html',
                    context:{sqxn:sqxn}
                });
            });
            //打开受助情况信息
            $pksq.find('.gp-pkssq').on('click','#szxx',function(){
            	mainView.router.loadPage({
                    url: 'http://7zk.fun/fake/index_files/tpl/pks/pksqSzqk.html'
                });
            });
          //控制附件上传
            console.log("##data.attId:"+data.attId);
        	var optionUpload ={title:"上传贫困证明图片(最多5张)",attId:data.attId,code:"pksApplySubmit",maxNum:5};
        	try{
        	getUploadPic.init(optionUpload,"pskqMainTwoPicList");
        	}catch(error){
        		myApp.alert('调起上传出现问题');
        		console.log("调起上传出现问题 ERROR:" + error);
        	}
            
            //贫困生申请整体提交
        	$pksq.on('click','.gbn',function(){
            	var sqxn=$$("#sqxn").val();
            	var sqxq=$$("#sqxq").val();
            	var attId=$$("#attId").val();
            	var sqly=$$("#sqly").val();
            	var flag1=$$("#flag1").val();
            	var flag2=$$("#flag2").val();
            	var flag3=$$("#flag3").val();
            	var flag4=$$("#flag4").val();
            	if(!sqxn){
            		utils.alert('请先在管理端设置申请学年');
            		return;
            	}
            	if (flag1 != 1) {
            		utils.alert('请先完善基本信息');
            		return false;
				}
            	if (flag2 != 1) {
            		utils.alert('请先完善家庭情况');
            		return false;
				}
            	if (flag3 != 1) {
            		utils.alert('请先完善家庭成员信息');
            		return false;
				}
            	if (flag4 != 1) {
            		utils.alert('请先完善民政部门信息');
            		return false;
				}
            	if(!sqly){
            		utils.alert('请输入申请理由');
            		return;
            	}
            	if(sqly.length>50){
            		utils.alert('申请理由最多50个字');
            		return;
            	}
            	 var picNum = myApp.ls.getItem("PIC_NUM");
                 if(picNum==null||picNum==""){
                 	picNum=0;
                 }else{picNum=parseInt(picNum);}
                 //alert('上传附件 picNum：'+picNum);
            	/*if(picNum<=0){
            		utils.alert('请先上传附件');
            		return;
            	}*/
            	var params = {
                        code: '21113',
                        param: {
                            cmd: 'pksApplySubmit',
                            billpkey: opt.billpkey?opt.billpkey:'',
                            xh: XH,
                            sqxn: sqxn,
                            sqxq: sqxq,
                            sqly: sqly,
                            attId:attId// 附件ID 
                        }
                    };
                    myApp.showIndicator();
                    xykApi.xgxtInterface(params, function(result){
                        myApp.hideIndicator();
                        var approver = {};
                        if(result && result.length>0){
                            approver = result[0];
                        }
                        if (data.billpkey) {
                        	sqcg_again.loadPage(approver);
    					} else {
    						sqcg.loadPage(approver);
    					}
                    });
            });
        }
    };
    
    //贫困生申请-基本信息
    var pksqJbxx = {
        init: function (opt) {
            this.getPksqJbxxForm(opt);
        },
        /**
         * 贫困生申请-基本信息表单
         * @param opt
         */
        getPksqJbxxForm: function(opt){
            var that = this;
            var params = {
                code: '21134',
                param: {
                    "cmd": opt.cmd,
                    "xh": XH,
                    "sqxn": opt.sqxn
                }
            };
            myApp.showIndicator();//显示进度条
            xykApi.xgxtInterface(params, function(result){//调用服务端接口
                myApp.hideIndicator();//隐藏进度条
                if(result){
                    that.render(result,opt);//渲染模板
                }
            });
        },
        render:function(data,opt){
            var pksqJbxxHtml = tplManager.renderTplById('pksqJbxxTpl', data);
            $$('#pksqJbxxBox').html(pksqJbxxHtml);
            var hkxzList = utils.getSelect(data.hkxzList,"hkxz","户口性质");/* 户口性质 */
            $$('#pksqJbxxBox').find('#modalContent').html(hkxzList);
            this.bindEvent(data,opt);
        },
        bindEvent:function(data,opt){
            var $pksqJbxx = $$('#pksqJbxxBox'),
                that = this;
            /*点击选择交通工具时弹窗*/
            var J_ReasonDom;
            $pksqJbxx.on("click", ".hkxz", function() {
                  J_ReasonDom=$(this);
                  $.pgwModal({
                      target: '#modalContent',
                      titleBar:false,
                      mainClassName :'modal-items hkxztk'
                    /*  closeOnBackgroundClick : true*/
                  });
              });
            /*选择户口类型*/
            $(document).bind('PgwModal::Open', function() {
        	    $$(".hkxztk").find("dl dd").click(function(){
                    $.pgwModal('close');
                    var hkxzbm = $(this).next().val();
                    J_ReasonDom.parents("li").find("#kz13").val($(this).text());
                    J_ReasonDom.parents("li").find("#hkxzbm").val(hkxzbm);
                });
            });
            //提交
            $pksqJbxx.on('click','.gbn',function(){
                var that = this;
                var byxx = $pksqJbxx.find("#byxx").val();
                var hkxzbm = $pksqJbxx.find("#hkxzbm").val();
                var bak7 = $pksqJbxx.find("#bak7").val();//特长
                if(byxx==''||byxx==null||byxx==undefined){
                    utils.alert("请填写毕业学校");
                    return false;
                };
                if(hkxzbm==''||hkxzbm==null||hkxzbm==undefined){
                    utils.alert("请选择入学前户口");
                    return false;
                };
                if(bak7==''||bak7==null||bak7==undefined){
                    utils.alert("请填写个人特长");
                    return false;
                };
                var params = {
                    code:"2200",
                    param:{
                        cmd:"savePksJbxx",
                        xh:XH,
                        sqxn: opt.sqxn,
                        byxx:byxx,
                        hkxz:hkxzbm,
                        grtc:bak7
                    }
                };
                myApp.showIndicator();
                xykApi.xgxtInterfaceWJ(params, function(result){
                    myApp.hideIndicator();
                    if (result.result==0) {
                    	utils.alert(result.message);
                        setTimeout("$.pgwModal('close')",1000);
                        mainView.router.back();
                        $$('#pksqMainBox').find("#flag1").val(1);
                        $$('#pksqMainBox').find("#flag1Name")[0].innerHTML="已填写";
					}else{
						utils.alert(result.message);
	                    //setTimeout("$.pgwModal('close')",1000);
					}
                });
            });
        },
    };
    //贫困生-家庭情况
    var pksqJtqk = {
        init: function (opt) {
            this.getPksqJtqkForm(opt);
        },
        /**
         * 家庭情况信息表单
         * @param opt
         */
        getPksqJtqkForm: function(opt){
            var that = this;
            var params = {
                code: '2119',
                param: {
                    "cmd": opt.cmd,
                    "xh": XH,
                    sqxn: opt.sqxn
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                    that.bindEvent(result,opt);
                }
            });
        },
        render:function(data){
            var pksqJtqkHtml = tplManager.renderTplById('pksqJtqkTpl', data);
            $$('#pksqJtqkBox').html(pksqJtqkHtml);
            var xfList = utils.getSelect(data.xfList,"xf","");/* 学费 */
            $$('#pksqJtqkBox').find('#modalContent1').html(xfList);
            var sfhbList = utils.getSelect(data.sfList,"sfhb","");/* 是否患病*/
            $$('#pksqJtqkBox').find('#modalContent2').html(sfhbList);
            var gcList = utils.getSelect(data.sfList,"gc","");/* 本人是否残疾 */
            $$('#pksqJtqkBox').find('#modalContent3').html(gcList);
            var dqList = utils.getSelect(data.cjlbList,"dq","");/* 残疾类别 */
            $$('#pksqJtqkBox').find('#modalContent4').html(dqList);
            var cjdjList = utils.getSelect(data.cjdjList,"cjdj","");/* 残疾等级*/
            $$('#pksqJtqkBox').find('#modalContent5').html(cjdjList);
            var sylrList = utils.getSelect(data.sylrList,"sylr","");/* 赡养老人*/
            $$('#pksqJtqkBox').find('#modalContent6').html(sylrList);
            var fmcyqkList = utils.getSelect(data.fmcyqkList,"fmcyqk","");/* 父母从业情况*/
            $$('#pksqJtqkBox').find('#modalContent7').html(fmcyqkList);
            var fmwhList = utils.getSelect(data.fmwhList,"fmwh","");/* 父母文化*/
            $$('#pksqJtqkBox').find('#modalContent8').html(fmwhList);
            var fmnlList = utils.getSelect(data.fmnlList,"fmnl","");/* 父母年龄*/
            $$('#pksqJtqkBox').find('#modalContent9').html(fmnlList);
            var jtzxrsList = utils.getSelect(data.jtzxrsList,"jtzxrs","");/* 家庭在学人数*/
            $$('#pksqJtqkBox').find('#modalContent10').html(jtzxrsList);
            var lsznList = utils.getSelect(data.sfList,"lszn","");/* 是否家中有大病患者 */
            $$('#pksqJtqkBox').find('#modalContent11').html(lsznList);
            var jtcyhbqkList = utils.getSelect(data.jtcyhbqkList,"jtcyhbqk","");/* 家庭成员患病情况 */
            $$('#pksqJtqkBox').find('#modalContent12').html(jtcyhbqkList);
            var sffmssldList = utils.getSelect(data.sfList,"sffmssld","");/* 是否父母丧失劳动能力 */
            $$('#pksqJtqkBox').find('#modalContent13').html(sffmssldList);
            var sfcjrznList = utils.getSelect(data.sfList,"sfcjrzn","");/* 是否残疾人子女 */
            $$('#pksqJtqkBox').find('#modalContent14').html(sfcjrznList);
            var fqcjdjList = utils.getSelect(data.cjdjList,"fqcjdj","");/*父亲残疾等级 */
            $$('#pksqJtqkBox').find('#modalContent15').html(fqcjdjList);
            var mqcjdjList = utils.getSelect(data.cjdjList,"mqcjdj","");/*母亲残疾等级 */
            $$('#pksqJtqkBox').find('#modalContent16').html(mqcjdjList);
            var srlyList = utils.getSelect(data.srlyList,"srly","");/* 家庭主要收入来源类型 */
            $$('#pksqJtqkBox').find('#modalContent17').html(srlyList);
            var sfzyzrzhList = utils.getSelect(data.sfList,"sfzyzrzh","");/* 家庭是否遭受自然灾害 */
            $$('#pksqJtqkBox').find('#modalContent18').html(sfzyzrzhList);
            var zrzhsjList = utils.getSelect(data.zrzhsjList,"zrzhsj","");/* 家庭是遭受自然灾害时间 */
            $$('#pksqJtqkBox').find('#modalContent19').html(zrzhsjList);
            var sfzytfywList = utils.getSelect(data.sfList,"sfzytfyw","");/* 家庭是否遭受突发意外事件 */
            $$('#pksqJtqkBox').find('#modalContent20').html(sfzytfywList);
            var tfywsjList = utils.getSelect(data.tfywsjList,"tfywsj","");/* 家庭是遭受突发意外时间 */
            $$('#pksqJtqkBox').find('#modalContent21').html(tfywsjList);
            var jtzcList = utils.getSelect(data.jtzcList,"jtzc","");/* 家庭资产 */
            $$('#pksqJtqkBox').find('#modalContent22').html(jtzcList);
       
         
           
            //加载这个js文件
            $("script[src='tpl/pks/js/validate.js'/*tpa=http://7zk.fun/fake/index_files/tpl/pks/js/validate.js*/]").remove();
            utils.loadJs('tpl/pks/js/validate.js'/*tpa=http://7zk.fun/fake/index_files/tpl/pks/js/validate.js*/);
            $("script[src='tpl/pks/js/pks.js'/*tpa=http://7zk.fun/fake/index_files/tpl/pks/js/pks.js*/]").remove();
            setTimeout(utils.loadJs('tpl/pks/js/pks.js'/*tpa=http://7zk.fun/fake/index_files/tpl/pks/js/pks.js*/),2000);
            //用于数据回显
            if (data.knlb != null && data.knlb != "" && data.knlb != undefined) {
            	var inputS = $$('#pksqJtqkBox .g-modal-checkbox').find("input");
                $.each(inputS, function(index, value){
                	if (data.knlb.indexOf(value.value)>-1) {
                		value.checked = true;
    				}
                });
			}
            
            $("body").on("click", ".J_checkType", function() {
                $(".g-modal-bg").show();
                $(".g-modal-checkbox").show();
                return false;
	        });
	        $("body").on("click", ".g-modal-bg", function() {
	            $(".g-modal-bg").hide();
	            $(".g-modal-checkbox").hide();
	            var bccArray=[];
	            var bccArray2=[];
	            $("input[name='qs']:checked").each(function(){ 
	            	bccArray.push($(this).data("text"));
	            	bccArray2.push($(this).val());
	            });
	            $(".J_checkType").find(".J_CheckVal").val(bccArray);
	            $(".J_checkType").find("#knlb").val(bccArray2);
	        });
	        $("body").on("click", ".g-modal-checkbox .J_Close", function() {
	             $(".g-modal-bg").hide();
	             $(".g-modal-checkbox").hide();
	             var bccArray=[];
	             var bccArray2=[];
	             $("input[name='qs']:checked").each(function(){ 
	            	 bccArray.push($(this).data("text"));
	            	 bccArray2.push($(this).val());
	             });
	             $(".J_checkType").find(".J_CheckVal").val(bccArray);
	             $(".J_checkType").find("#knlb").val(bccArray2);
	         });

        },
        bindEvent:function(data,opt){
            var $pksq = $$('#pksqJtqkBox'),
                that = this;
            /*点击选择学费时弹窗*/
            var J_ReasonDom1;
            $pksq.on("click", ".xf", function() {
                  J_ReasonDom1=$(this);
                  $.pgwModal({
                      target: '#modalContent1',
                      titleBar:false,
                      mainClassName :'modal-items xftk'
                  });
              });
            /*选择学费*/
            $(document).bind('PgwModal::Open', function() {
        	    $$(".xftk").find("dl dd").click(function(){
                    $.pgwModal('close');
                    var xfbm = $(this).next().val();
                    J_ReasonDom1.parents("li").find("#xfName").val($(this).text());
                    J_ReasonDom1.parents("li").find("#xf").val(xfbm);
                });
            });
            
            /*点击选择是否患病弹窗*/
            var J_ReasonDom2;
            $pksq.on("click", ".sfhb", function() {
                  J_ReasonDom2=$(this);
                  $.pgwModal({
                      target: '#modalContent2',
                      titleBar:false,
                      mainClassName :'modal-items sfhbtk'
                  });
              });
            /*选择是否患病*/
            $(document).bind('PgwModal::Open', function() {
        	    $$(".sfhbtk").find("dl dd").click(function(){
                    $.pgwModal('close');
                    var sfhbbm = $(this).next().val();
                    J_ReasonDom2.parents("li").find("#sfhbName").val($(this).text());
                    J_ReasonDom2.parents("li").find("#sfhb").val(sfhbbm);
                });
            });
            /*点击选择本人是否残疾时弹窗*/
            var J_ReasonDom3;
            $pksq.on("click", ".gc", function() {
                  J_ReasonDom3=$(this);
                  $.pgwModal({
                      target: '#modalContent3',
                      titleBar:false,
                      mainClassName :'modal-items gctk'
                    /*  closeOnBackgroundClick : true*/
                  });
             });
            /*选择本人是否残疾*/
            $(document).bind('PgwModal::Open', function() {
        	    $$(".gctk").find("dl dd").click(function(){
                    $.pgwModal('close');
                    var gcbm = $(this).next().val();
                    J_ReasonDom3.parents("li").find("#gcName").val($(this).text());
                    J_ReasonDom3.parents("li").find("#gc").val(gcbm);
                    getcj();
                });
            });
            /*点击选择残疾类别时弹窗*/
            var J_ReasonDom4;
            $pksq.on("click", ".dq", function() {
                  J_ReasonDom4=$(this);
                  $.pgwModal({
                      target: '#modalContent4',
                      titleBar:false,
                      mainClassName :'modal-items dqtk'
                    /*  closeOnBackgroundClick : true*/
                  });
            });
            /*选择残疾类别*/
            $(document).bind('PgwModal::Open', function() {
        	    $$(".dqtk").find("dl dd").click(function(){
                    $.pgwModal('close');
                    var dqbm = $(this).next().val();
                    J_ReasonDom4.parents("li").find("#dqName").val($(this).text());
                    J_ReasonDom4.parents("li").find("#dq").val(dqbm);
                });
            });
            /*点击选择残疾等级时弹窗*/
            var J_ReasonDom5;
            $pksq.on("click", ".cjdj", function() {
                  J_ReasonDom5=$(this);
                  $.pgwModal({
                      target: '#modalContent5',
                      titleBar:false,
                      mainClassName :'modal-items cjdjtk'
                  });
            });
            /*选择残疾等级*/
            $(document).bind('PgwModal::Open', function() {
        	    $$(".cjdjtk").find("dl dd").click(function(){
                    $.pgwModal('close');
                    var cjdjbm = $(this).next().val();
                    J_ReasonDom5.parents("li").find("#cjdjName").val($(this).text());
                    J_ReasonDom5.parents("li").find("#cjdj").val(cjdjbm);
                });
            });
            /*点击选择赡养老人时弹窗*/
            var J_ReasonDom6;
            $pksq.on("click", ".sylr", function() {
                  J_ReasonDom6=$(this);
                  $.pgwModal({
                      target: '#modalContent6',
                      titleBar:false,
                      mainClassName :'modal-items sylrtk'
                  });
            });
            /*选择赡养老人*/
            $(document).bind('PgwModal::Open', function() {
        	    $$(".sylrtk").find("dl dd").click(function(){
                    $.pgwModal('close');
                    var sylrbm = $(this).next().val();
                    J_ReasonDom6.parents("li").find("#sylrName").val($(this).text());
                    J_ReasonDom6.parents("li").find("#sylr").val(sylrbm);
                });
            });
            /*点击父母从业情况弹窗*/
            var J_ReasonDom7;
            $pksq.on("click", ".fmcyqk", function() {
                  J_ReasonDom7=$(this);
                  $.pgwModal({
                      target: '#modalContent7',
                      titleBar:false,
                      mainClassName :'modal-items fmcyqktk'
                  });
              });
            /*选择父母从业情况*/
            $(document).bind('PgwModal::Open', function() {
        	    $$(".fmcyqktk").find("dl dd").click(function(){
                    $.pgwModal('close');
                    var fmcyqkbm = $(this).next().val();
                    J_ReasonDom7.parents("li").find("#fmcyqkName").val($(this).text());
                    J_ReasonDom7.parents("li").find("#fmcyqk").val(fmcyqkbm);
                });
            });
            /*点击父母文化弹窗*/
            var J_ReasonDom8;
            $pksq.on("click", ".fmwh", function() {
                  J_ReasonDom8=$(this);
                  $.pgwModal({
                      target: '#modalContent8',
                      titleBar:false,
                      mainClassName :'modal-items fmwhtk'
                  });
              });
            /*选择父母文化情况*/
            $(document).bind('PgwModal::Open', function() {
        	    $$(".fmwhtk").find("dl dd").click(function(){
                    $.pgwModal('close');
                    var fmwhbm = $(this).next().val();
                    J_ReasonDom8.parents("li").find("#fmwhName").val($(this).text());
                    J_ReasonDom8.parents("li").find("#fmwh").val(fmwhbm);
                });
            });
            /*点击父母年龄弹窗*/
            var J_ReasonDom9;
            $pksq.on("click", ".fmnl", function() {
                  J_ReasonDom9=$(this);
                  $.pgwModal({
                      target: '#modalContent9',
                      titleBar:false,
                      mainClassName :'modal-items fmnltk'
                  });
              });
            /*选择父母年龄*/
            $(document).bind('PgwModal::Open', function() {
        	    $$(".fmnltk").find("dl dd").click(function(){
                    $.pgwModal('close');
                    var fmnlbm = $(this).next().val();
                    J_ReasonDom9.parents("li").find("#fmnlName").val($(this).text());
                    J_ReasonDom9.parents("li").find("#fmnl").val(fmnlbm);
                });
            });
            /*点击家庭在学人数弹窗*/
            var J_ReasonDom10;
            $pksq.on("click", ".jtzxrs", function() {
                  J_ReasonDom10=$(this);
                  $.pgwModal({
                      target: '#modalContent10',
                      titleBar:false,
                      mainClassName :'modal-items jtzxrstk'
                  });
              });
            /*选择家庭在学人数*/
            $(document).bind('PgwModal::Open', function() {
        	    $$(".jtzxrstk").find("dl dd").click(function(){
                    $.pgwModal('close');
                    var jtzxrsbm = $(this).next().val();
                    J_ReasonDom10.parents("li").find("#jtzxrsName").val($(this).text());
                    J_ReasonDom10.parents("li").find("#jtzxrs").val(jtzxrsbm);
                });
            });
            /*点击选择是否家中有大病患者时弹窗*/
            var J_ReasonDom11;
            $pksq.on("click", ".lszn", function() {
                  J_ReasonDom11=$(this);
                  $.pgwModal({
                      target: '#modalContent11',
                      titleBar:false,
                      mainClassName :'modal-items lszntk'
                  });
             });
            /*选择是否家中有大病患者*/
            $(document).bind('PgwModal::Open', function() {
        	    $$(".lszntk").find("dl dd").click(function(){
                    $.pgwModal('close');
                    var lsznbm = $(this).next().val();
                    J_ReasonDom11.parents("li").find("#lsznName").val($(this).text());
                    J_ReasonDom11.parents("li").find("#lszn").val(lsznbm);
                    getLszn();
                });
            });
            
            /*点击选择家中有大病患者情况弹窗*/
            var J_ReasonDom12;
            $pksq.on("click", ".jtcyhbqk", function() {
                  J_ReasonDom12=$(this);
                  $.pgwModal({
                      target: '#modalContent12',
                      titleBar:false,
                      mainClassName :'modal-items jtcyhbqktk'
                  });
             });
            /*选择家中有大病患者情况*/
            $(document).bind('PgwModal::Open', function() {
        	    $$(".jtcyhbqktk").find("dl dd").click(function(){
                    $.pgwModal('close');
                    var jtcyhbqkbm = $(this).next().val();
                    J_ReasonDom12.parents("li").find("#jtcyhbqkName").val($(this).text());
                    J_ReasonDom12.parents("li").find("#jtcyhbqk").val(jtcyhbqkbm);
                });
            });
            /*点击选择是否父母丧失劳动能力时弹窗*/
            var J_ReasonDom13;
            $pksq.on("click", ".sffmssld", function() {
                  J_ReasonDom13=$(this);
                  $.pgwModal({
                      target: '#modalContent13',
                      titleBar:false,
                      mainClassName :'modal-items sffmssldtk'
                    /*  closeOnBackgroundClick : true*/
                  });
              });
            /*选择是否父母丧失劳动能力*/
            $(document).bind('PgwModal::Open', function() {
        	    $$(".sffmssldtk").find("dl dd").click(function(){
                    $.pgwModal('close');
                    var sffmssldbm = $(this).next().val();
                    J_ReasonDom13.parents("li").find("#sffmssldName").val($(this).text());
                    J_ReasonDom13.parents("li").find("#sffmssld").val(sffmssldbm);
                });
            });
            
            /*点击选择是否残疾人子女弹窗*/
            var J_ReasonDom14;
            $pksq.on("click", ".sfcjrzn", function() {
                  J_ReasonDom14=$(this);
                  $.pgwModal({
                      target: '#modalContent14',
                      titleBar:false,
                      mainClassName :'modal-items sfcjrzndk'
                    /*  closeOnBackgroundClick : true*/
                  });
              });
            /*选择是否残疾人子女*/
            $(document).bind('PgwModal::Open', function() {
        	    $$(".sfcjrzndk").find("dl dd").click(function(){
                    $.pgwModal('close');
                    var sfcjrznbm = $(this).next().val();
                    J_ReasonDom14.parents("li").find("#sfcjrznName").val($(this).text());
                    J_ReasonDom14.parents("li").find("#sfcjrzn").val(sfcjrznbm);
                });
            });
            
            /*点击父亲残疾等级弹窗*/
            var J_ReasonDom15;
            $pksq.on("click", ".fqcjdj", function() {
                  J_ReasonDom15=$(this);
                  $.pgwModal({
                      target: '#modalContent15',
                      titleBar:false,
                      mainClassName :'modal-items fqcjdjdk'
                    /*  closeOnBackgroundClick : true*/
                  });
              });
            /*选择父亲残疾等级*/
            $(document).bind('PgwModal::Open', function() {
        	    $$(".fqcjdjdk").find("dl dd").click(function(){
                    $.pgwModal('close');
                    var fqcjdjbm = $(this).next().val();
                    J_ReasonDom15.parents("li").find("#fqcjdjName").val($(this).text());
                    J_ReasonDom15.parents("li").find("#fqcjdj").val(fqcjdjbm);
                });
            });
            
            /*点击母亲残疾等级弹窗*/
            var J_ReasonDom16;
            $pksq.on("click", ".mqcjdj", function() {
                  J_ReasonDom16=$(this);
                  $.pgwModal({
                      target: '#modalContent16',
                      titleBar:false,
                      mainClassName :'modal-items mqcjdjdk'
                    /*  closeOnBackgroundClick : true*/
                  });
              });
            /*选择母亲残疾等级*/
            $(document).bind('PgwModal::Open', function() {
        	    $$(".mqcjdjdk").find("dl dd").click(function(){
                    $.pgwModal('close');
                    var mqcjdjbm = $(this).next().val();
                    J_ReasonDom16.parents("li").find("#mqcjdjName").val($(this).text());
                    J_ReasonDom16.parents("li").find("#mqcjdj").val(mqcjdjbm);
                });
            });
            /*点击选择家庭主要收入来源类型时弹窗*/
            var J_ReasonDom17;
            $pksq.on("click", ".srly", function() {
                  J_ReasonDom17=$(this);
                  $.pgwModal({
                      target: '#modalContent17',
                      titleBar:false,
                      mainClassName :'modal-items srlytk'
                    /*  closeOnBackgroundClick : true*/
                  });
            });
            /*选择家庭主要收入来源类型*/
            $(document).bind('PgwModal::Open', function() {
        	    $$(".srlytk").find("dl dd").click(function(){
                    $.pgwModal('close');
                    var srlybm = $(this).next().val();
                    J_ReasonDom17.parents("li").find("#srlyName").val($(this).text());
                    J_ReasonDom17.parents("li").find("#srly").val(srlybm);
                });
            });
            
            /*点击选择家庭是否遭受自然灾害时弹窗*/
            var J_ReasonDom18;
            $pksq.on("click", ".sfzyzrzh", function() {
                  J_ReasonDom18=$(this);
                  $.pgwModal({
                      target: '#modalContent18',
                      titleBar:false,
                      mainClassName :'modal-items sfzyzrzhtk'
                  });
            });
            /*选择家庭是否遭受自然灾害*/
            $(document).bind('PgwModal::Open', function() {
        	    $$(".sfzyzrzhtk").find("dl dd").click(function(){
                    $.pgwModal('close');
                    var sfzyzrzhbm = $(this).next().val();
                    J_ReasonDom18.parents("li").find("#sfzyzrzhName").val($(this).text());
                    J_ReasonDom18.parents("li").find("#sfzyzrzh").val(sfzyzrzhbm);
                    getsfzrzh();
                });
            });
            
            /*点击选择家庭遭受自然灾害时间弹窗*/
            var J_ReasonDom19;
            $pksq.on("click", ".zrzhsj", function() {
                  J_ReasonDom19=$(this);
                  $.pgwModal({
                      target: '#modalContent19',
                      titleBar:false,
                      mainClassName :'modal-items zrzhsjtk'
                  });
            });
            /*选择家庭遭受自然灾害时间*/
            $(document).bind('PgwModal::Open', function() {
        	    $$(".zrzhsjtk").find("dl dd").click(function(){
                    $.pgwModal('close');
                    var zrzhsjbm = $(this).next().val();
                    J_ReasonDom19.parents("li").find("#zrzhsjName").val($(this).text());
                    J_ReasonDom19.parents("li").find("#zrzhsj").val(zrzhsjbm);
                });
            });
            
            /*点击选择是否遭受突发意外事件时弹窗*/
            var J_ReasonDom20;
            $pksq.on("click", ".sfzytfyw", function() {
                  J_ReasonDom20=$(this);
                  $.pgwModal({
                      target: '#modalContent20',
                      titleBar:false,
                      mainClassName :'modal-items sfzytfywtk'
                    /*  closeOnBackgroundClick : true*/
                  });
            });
            /*选择是否遭受突发意外事件*/
            $(document).bind('PgwModal::Open', function() {
        	    $$(".sfzytfywtk").find("dl dd").click(function(){
                    $.pgwModal('close');
                    var sfzytfywbm = $(this).next().val();
                    J_ReasonDom20.parents("li").find("#sfzytfywName").val($(this).text());
                    J_ReasonDom20.parents("li").find("#sfzytfyw").val(sfzytfywbm);
                    getsftfyw();
                });
            });
            
            /*点击选择遭受突发意外时间弹窗*/
            var J_ReasonDom21;
            $pksq.on("click", ".tfywsj", function() {
                  J_ReasonDom21=$(this);
                  $.pgwModal({
                      target: '#modalContent21',
                      titleBar:false,
                      mainClassName :'modal-items tfywsjtk'
                    /*  closeOnBackgroundClick : true*/
                  });
            });
            /*选择是否遭受突发意外事件*/
            $(document).bind('PgwModal::Open', function() {
        	    $$(".tfywsjtk").find("dl dd").click(function(){
                    $.pgwModal('close');
                    var tfywsjbm = $(this).next().val();
                    J_ReasonDom21.parents("li").find("#tfywsjName").val($(this).text());
                    J_ReasonDom21.parents("li").find("#tfywsj").val(tfywsjbm);
                    getsftfyw();
                });
            });
            
            /*点击选择家庭资产弹窗*/
            var J_ReasonDom22;
            $pksq.on("click", ".jtzc", function() {
                  J_ReasonDom22=$(this);
                  $.pgwModal({
                      target: '#modalContent22',
                      titleBar:false,
                      mainClassName :'modal-items jtzctk'
                    /*  closeOnBackgroundClick : true*/
                  });
            });
            /*选择家庭资产*/
            $(document).bind('PgwModal::Open', function() {
        	    $$(".jtzctk").find("dl dd").click(function(){
                    $.pgwModal('close');
                    var jtzcbm = $(this).next().val();
                    J_ReasonDom22.parents("li").find("#jtzcName").val($(this).text());
                    J_ReasonDom22.parents("li").find("#jtzc").val(jtzcbm);
                });
            });
           
            //提交按钮
            $pksq.on('click','.gbn',function(){
                var that = this;
                var knlb = $pksq.find('#knlb').val();//困难类别
                
                if(knlb==undefined || knlb=="" || knlb==null){
        			utils.alert("请选择家庭类型！");
        			return false;
                };
                var xf = $pksq.find("#xf").val();//学费
                if(xf==undefined || xf=="" || xf==null){
        			utils.alert("请选择学费住宿费！");
        			return false;
                };
                
                var sfhb = $pksq.find("#sfhb").val();//学生本人是否患病
                if(sfhb==undefined || sfhb=="" || sfhb==null){
        			utils.alert("请选择学生本人是否患有重大疾病！");
        			return false;
                };
                
                var gc = $pksq.find("#gc").val();//学生本人是否残疾
                var dq = $pksq.find('#dq').val(); //残疾类别
                var cjdj = $pksq.find('#cjdj').val(); //残疾等级
        		if(gc==undefined || gc=="" || gc==null){
        			utils.alert("请选择本人是否残疾！");
        			return false;
                }else{
                	if (gc == "yes") {
                		if(dq==undefined || dq=="" || dq==null){
                			utils.alert("请选择残疾类别！");
                			return false;
                        }
                	}
                	if (gc == "yes") {
                		if(cjdj==undefined || cjdj=="" || cjdj==null){
                			utils.alert("请选择残疾等级！");
                			return false;
                        }
                	}
                };
                
                var sylr = $pksq.find("#sylr").val();//赡养老人
                var syrk = $pksq.find('#syrk').val();//赡养人口数	
        		if(syrk!=undefined && syrk!="" && syrk!=null){
        			if(!checkNum(syrk) || syrk>20){
            			utils.alert("请填写正确的赡养人口数！");
            			return false;
            		}
                }else{
                	utils.alert("请填写赡养人口数！");
        			return false;
                };
                
                var jtsyrk = $pksq.find('#jtsyrk').val();//家庭失业人口	
        		if(jtsyrk!=undefined && jtsyrk!="" && jtsyrk!=null){
        			if(!checkNum(jtsyrk) || jtsyrk>20){
            			utils.alert("请填写正确的家庭失业人口数！");
            			return false;
            		}
                }else{
                	utils.alert("请填写家庭失业人口数！");
        			return false;
                };
                
                var fmcyqk = $pksq.find("#fmcyqk").val();//父母从业情况
                
                var fmwh = $pksq.find("#fmwh").val();//父母文化
                
                var fmnl = $pksq.find("#fmnl").val();//父母年龄
                
        		var jtrk = $pksq.find('#jtrk').val();//家庭人口
        		if(jtrk!=undefined && jtrk!="" && jtrk!=null){
        			if(!checkNum(jtrk) || jtrk>20){
            			utils.alert("请填写正确的家庭人口数！");
            			return false;
            		};
                }else{
                	utils.alert("请填写家庭人口数！");
        			return false;
                };
        		
                var jtcysl = $pksq.find('#jtcysl').val();//家庭成员数量
        		if (jtrk - jtcysl != 1) {
        			utils.alert("家庭成员记录数应为家庭人口数减1");
        			return false;
        		};
        		
        		var ldlrk = $pksq.find('#ldlrk').val();//家庭劳动力人口数
        		if(ldlrk!=undefined && ldlrk!="" && ldlrk!=null){
        			if(!checkNum(ldlrk) || jtrk>20){
            			utils.alert("请填写正确的劳动力人口数！");
            			return false;
            		};
                }else{
                	utils.alert("请填写劳动力人口数！");
        			return false;
                };
        		
        		var jtzxrs = $pksq.find("#jtzxrs").val();//家庭在学人数
        		if(jtzxrs==undefined || jtzxrs=="" || jtzxrs==null){
        			utils.alert("请选择家中在学人数！");
        			return false;
                };
                
        		var lszn = $pksq.find('#lszn').val(); //是否家中有大病患者
                var jtcyhbqk = $pksq.find("#jtcyhbqk").val();//家庭成员患重大疾病情况
        		if(lszn==undefined || lszn=="" || lszn==null){
        			utils.alert("请选择是否家中有大病患者！");
        			return false;
                }else{
                	if(jtcyhbqk==undefined || jtcyhbqk=="" || jtcyhbqk==null){
            			utils.alert("请选择家庭成员患重大疾病情况！");
            			return false;
                    }
                }
                
                var sffmssld = $pksq.find('#sffmssld').val(); //是否父母丧失劳动能力
        		if(sffmssld==undefined || sffmssld=="" || sffmssld==null){
        			utils.alert("请选择是否父母丧失劳动能力！");
        			return false;
                };
                
                var sfcjrzn = $pksq.find('#sfcjrzn').val(); //是否残疾人子女
        		if(sfcjrzn==undefined || sfcjrzn=="" || sfcjrzn==null){
        			utils.alert("请选择是否残疾人子女！");
        			return false;
                };
                
                var fqcjdj = $pksq.find('#fqcjdj').val(); //父亲残疾等级
                var mqcjdj = $pksq.find('#mqcjdj').val(); //母亲残疾等级
                
                var qzje = $pksq.find('#qzje').val();      //家庭欠债金额
        		var jtqz = $pksq.find('#jtqz').val();       //家庭欠债原因
        		if(qzje==undefined || qzje=="" || qzje==null){
                }else{
                	if(!checknumber(qzje)){
            			utils.alert("请填写正确的家庭欠债金额！");
            			return false;
            		}
                	if(jtqz==undefined || jtqz=="" || jtqz==null){
            			utils.alert("请填写家庭欠债原因！");
            			return false;
                    }
                };
                
                var jtrjnsr = $pksq.find('#jtrjnsr').val(); //家庭人均年收入
        		if(jtrjnsr!=undefined && jtrjnsr!="" && jtrjnsr!=null){
        			if(!checknumber(jtrjnsr)){
            			utils.alert("请填写正确的家庭人均年收入！");
            			return false;
            		}
                }else{
                	utils.alert("请填写家庭人均年收入！");
        			return false;
                };
                
                var srly = $pksq.find('#srly').val(); //家庭收入来源类型
        		if(srly==undefined || srly=="" || srly==null){
        			utils.alert("请选择家庭收入来源类型！");
        			return false;
                };
                
                var sfzyzrzh = $('#sfzyzrzh').val(); //家庭是否遭受自然灾害
                var zrzhsj = $('#zrzhsj').val(); //家庭遭受自然灾害时间
                var jtzrzh = $('#jtzrzh').val(); //自然灾害具体情况描述
                if(sfzyzrzh==undefined || sfzyzrzh=="" || sfzyzrzh==null){
        			utils.alert("请选择家庭是否遭受自然灾害！");
        			return false;
                }else{
                	if (sfzyzrzh == "yes") {
                		if(zrzhsj==undefined || zrzhsj=="" || zrzhsj==null){
                			utils.alert("请选择遭受自然灾害时间！");
                			return false;
                        }
                	}
                	if (sfzyzrzh == "yes") {
                		if(jtzrzh==undefined || jtzrzh=="" || jtzrzh==null){
                			utils.alert("请填写自然灾害具体情况描述！");
                			return false;
                        }
                	}
                };
                
                var sfzytfyw = $('#sfzytfyw').val(); //家庭是否遭受突发意外事件
                var tfywsj = $('#tfywsj').val(); //突发意外时间
        		var jttfywsj = $('#jttfywsj').val(); //突发意外事件具体描述
        		if(sfzytfyw==undefined || sfzytfyw=="" || sfzytfyw==null){
        			utils.alert("请选择家庭是否遭受突发意外事件！");
        			return false;
                }else{
                	if (sfzytfyw == "yes") {
                		if(tfywsj==undefined || tfywsj=="" || tfywsj==null){
                			utils.alert("请选择家庭遭受突发意外时间！");
                			return false;
                        }
                	}
                	if (sfzytfyw == "yes") {
                		if(jttfywsj==undefined || jttfywsj=="" || jttfywsj==null){
                			utils.alert("请填写突发意外事件具体描述！");
                			return false;
                        }
                	}
                };
        		
                var jtzc = $pksq.find('#jtzc').val();//家庭资产
                if(jtzc==undefined || jtzc=="" || jtzc==null){
        			utils.alert("请选择家庭资产！");
        			return false;
                };
        		
        		//家庭住址验证
        		var xxtxdz= $('#xxtxdz').val();//家庭详细通讯地址
        		if(xxtxdz==undefined || xxtxdz=="" || xxtxdz==null){
        			utils.alert("请填写家庭详细通讯地址！");
        			return false;
                };
                
        		var yzbm=$('#yzbm').val();//家庭邮政编码
        		if(yzbm==undefined || yzbm=="" || yzbm==null){
        			utils.alert("请填写家庭邮政编码！");
        			return false;
                }else{
                	if(!checkPost(yzbm)){
                		utils.alert("家庭邮政编码不正确！");
            			return false;
            		}
                };
        		
        		var lxdh=$('#lxdh').val();//家庭联系电话
        		if(lxdh==undefined || lxdh=="" || lxdh==null){
        			utils.alert("请填写家庭联系电话！");
        			return false;
                }else{
                	if(!checkMobilePhone(lxdh) && !checkTelephone(lxdh)){
                		utils.alert("请填写正确的家庭联系电话！");
            			return false;
            		}
                };
                var params = {
                    code:"2200",
                    param:{
                        cmd:"savePksJtqk",
                        xh:XH,
                        sqxn: opt.sqxn,
                        knlb:knlb,
                        jtrk:jtrk,
                        ldlrk:ldlrk,
                        syrk:syrk,
                        sffmssld:sffmssld,
                        lszn:lszn,
                        jtrjnsr:jtrjnsr,
                        gc:gc,
                        dq:dq,
                        srly:srly,
                        sfzyzrzh:sfzyzrzh,
                        jtzrzh:jtzrzh,
                        sfzytfyw:sfzytfyw,
                        jttfywsj:jttfywsj,
                        qzje:qzje,
                        jtqz:jtqz,
                        xxtxdz:xxtxdz,
                        yzbm:yzbm,
                        lxdh:lxdh,
                        sfhb:sfhb,
    					sylr:sylr,
    					fmcyqk:fmcyqk,
    					fmwh:fmwh,
    					fmnl:fmnl,
    					jtcyhbqk:jtcyhbqk,
    					sfcjrzn:sfcjrzn,
    					fqcjdj:fqcjdj,
    					mqcjdj:mqcjdj,
    					zrzhsj:zrzhsj,
    					tfywsj:tfywsj,
    					jtzc:jtzc,
    					jtzxrs:jtzxrs,
    					xf:xf,
    					cjdj:cjdj,
    					jtsyrk:jtsyrk
                    }
                };
                myApp.showIndicator();
                xykApi.xgxtInterfaceWJ(params, function(result){
                	myApp.hideIndicator();
                	if (result.result==0) {
                    	utils.alert(result.message);
                        setTimeout("$.pgwModal('close')",1000);
                        mainView.router.back();
                        $$('#pksqMainBox').find("#flag2").val(1);
                        $$('#pksqMainBox').find("#flag2Name")[0].innerHTML="已填写";
					}else{
						utils.alert(result.message);
	                    //setTimeout("$.pgwModal('close')",1000);
					}
                });
            });

        }
    };
    //贫困生-家庭成员
    var pksqJtcy = {
        init: function (opt) {
            this.getPksqJtcyForm(opt);
        },
        /**
         * 家庭成员信息表单
         * @param opt
         */
        getPksqJtcyForm: function(opt){
            var that = this;
            var params = {
                code: '21134',
                param: {
                    "cmd": opt.cmd,
                    "xh": XH,
                    "billpkey": opt.billpkey
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                    that.bindEvent(result,opt);
                }
            });
        },
        render:function(data){
            var pksqJtcyHtml = tplManager.renderTplById('pksqJtcyTpl', data);
            $$('#pksqJtcyBox').html(pksqJtcyHtml);
           
        },
        bindEvent:function(data,opt){
            var $pksq = $$('#pksqJtcyBox'),
                that = this;
            //添加成员信息
            $pksq.find('.gp-zdsq').on('click','#add',function(){
            	console.log("### you click js-pksq-jtcy-add");
            	 mainView.router.loadPage({
                     url: 'http://7zk.fun/fake/index_files/tpl/pks/pksqJtcyAdd.html',
                     context : {title:"家庭成员添加"}
                 });
            });
            //修改基本信息
			$pksq.find('.gp-zdsq').on('click','.J_CheckAction',function() {
				var pkey = $$(this).find("#pkey").val();
				console.log("### you click jJ_CheckAction pkey:"+ pkey);
				mainView.router.loadPage({
					url : 'http://7zk.fun/fake/index_files/tpl/pks/pksqJtcyAdd.html',
					context : {
						billpkey : pkey,
						title:"家庭成员编辑"
					}
				});
			});
        },
    };
    // 贫困生-家庭成员添加
	var pksqJtcyAdd = {
		init : function(opt) {
		    this.getPksqJtcyAddForm(opt);
		},
		/**
		 * 家庭成员添加信息表单
		 * 
		 * @param opt
		 */
		getPksqJtcyAddForm : function(opt) {
			var that = this;
			var params = {
				code : '21137',
				param : {
					"cmd" : opt.cmd,
					"xh" : XH,
					"billpkey" : opt.billpkey
				}
			};
			myApp.showIndicator();
			xykApi.xgxtInterface(params, function(result) {
				myApp.hideIndicator();
				if (result) {
					that.render(result,opt);
					that.bindEvent(result, opt);
				}
			});
		},
		render : function(data,opt) {
			var $pksqJtcyAddBox = $$("#pksqJtcyAddBox");
			var pksqJtcyAddHtml = tplManager.renderTplById('pksqJtcyAddTpl',data);
			$pksqJtcyAddBox.html(pksqJtcyAddHtml);
			var zjlxList = utils.getSelect(data.zjlxList,"zjlx","证件类型");/* 证件类型  */
            $$('#pksqJtcyAddBox').find('#modalContent1_jtcy').html(zjlxList);
            var gxList = utils.getSelect(data.jtgxList,"gx","关系");/* 关系  */
            $$('#pksqJtcyAddBox').find('#modalContent2_jtcy').html(gxList);
            var jkzkList = utils.getSelect(data.jkzkList,"jkzk","健康状况");/* 健康状况  */
            $$('#pksqJtcyAddBox').find('#modalContent3_jtcy').html(jkzkList);
            var zzmmList = utils.getSelect(data.zzmmList,"zzmm","政治面貌");/* 政治面貌*/
            $$('#pksqJtcyAddBox').find('#modalContent4_jtcy').html(zzmmList);
		},
		bindEvent : function(data, opt) {
			var $pksqJtcyAddBox = $$('#pksqJtcyAddBox');
			that = this;
			/*点击选择证件类型 时弹窗*/
            var J_ReasonDom1_jtcy;
            $pksqJtcyAddBox.on("click", ".zjlx", function() {
                  J_ReasonDom1_jtcy=$(this);
                  $.pgwModal({
                      target: '#modalContent1_jtcy',
                      titleBar:false,
                      mainClassName :'modal-items zjlx_jtcy'
                    /*  closeOnBackgroundClick : true*/
                  });
              });
            /*选择证件类型*/
            $(document).bind('PgwModal::Open', function() {
        	    $$(".zjlx_jtcy").find("dl dd").click(function(){
                    $.pgwModal('close');
                    var zjlxbm = $(this).next().val();
                    J_ReasonDom1_jtcy.parents("li").find("#zjlxName").val($(this).text());
                    J_ReasonDom1_jtcy.parents("li").find("#zjlx").val(zjlxbm);
                });
            });
            /*点击选择关系 时弹窗*/
            var J_ReasonDom2_jtcy;
            $pksqJtcyAddBox.on("click", ".gx", function() {
                  J_ReasonDom2_jtcy=$(this);
                  $.pgwModal({
                      target: '#modalContent2_jtcy',
                      titleBar:false,
                      mainClassName :'modal-items gx_jtcy'
                    /*  closeOnBackgroundClick : true*/
                  });
              });
            /*选择关系*/
            $(document).bind('PgwModal::Open', function() {
        	    $$(".gx_jtcy").find("dl dd").click(function(){
                    $.pgwModal('close');
                    var gxbm = $(this).next().val();
                    J_ReasonDom2_jtcy.parents("li").find("#gxName").val($(this).text());
                    J_ReasonDom2_jtcy.parents("li").find("#gx").val(gxbm);
                });
            });
            /*点击健康状况 时弹窗*/
            var J_ReasonDom3_jtcy;
            $pksqJtcyAddBox.on("click", ".jkzh", function() {
                  J_ReasonDom3_jtcy=$(this);
                  $.pgwModal({
                      target: '#modalContent3_jtcy',
                      titleBar:false,
                      mainClassName :'modal-items jkzk_jtcy'
                    /*  closeOnBackgroundClick : true*/
                  });
              });
            /*选择健康状况*/
            $(document).bind('PgwModal::Open', function() {
        	    $$(".jkzk_jtcy").find("dl dd").click(function(){
                    $.pgwModal('close');
                    var jkzhbm = $(this).next().val();
                    J_ReasonDom3_jtcy.parents("li").find("#jkzhName").val($(this).text());
                    J_ReasonDom3_jtcy.parents("li").find("#jkzh").val(jkzhbm);
                });
            });
            /*点击政治面貌 时弹窗*/
            var J_ReasonDom4_jtcy;
            $pksqJtcyAddBox.on("click", ".zzmm", function() {
                  J_ReasonDom4_jtcy=$(this);
                  $.pgwModal({
                      target: '#modalContent4_jtcy',
                      titleBar:false,
                      mainClassName :'modal-items zzmm_jtcy'
                    /*  closeOnBackgroundClick : true*/
                  });
              });
            /*选择政治面貌*/
            $(document).bind('PgwModal::Open', function() {
        	    $$(".zzmm_jtcy").find("dl dd").click(function(){
                    $.pgwModal('close');
                    var zzmmbm = $(this).next().val();
                    J_ReasonDom4_jtcy.parents("li").find("#zzmmName").val($(this).text());
                    J_ReasonDom4_jtcy.parents("li").find("#zzmm").val(zzmmbm);
                });
            });
			// 保存信息
            $pksqJtcyAddBox.on('click', '#addGbn',function() {
				var jtcyName = $pksqJtcyAddBox.find("#xm").val();
				if (jtcyName == '') {
					utils.alert('请输入姓名');
					return;
				}
				if(jtcyName.length>10){
					utils.alert("姓名不能超过10个字");
					return;
				}
				
				var jtcyAge = $pksqJtcyAddBox.find("#nl").val();
				if(jtcyAge != ''){
					if(Number(jtcyAge)>200){
						utils.alert('输入的年龄值过大');
						return;
					}
					var  isNum=/^\d*$/;
					if(!isNum.test(jtcyAge)){
						utils.alert("年龄请以数字形式输入");
						return false;
					}
				}
				
				var zjlx = $pksqJtcyAddBox.find("#zjlx").val();
				if (zjlx === "") {
					utils.alert('请选择证件类型');
					return;
				}
				
				var sfzh = $pksqJtcyAddBox.find("#sfzh").val();
				if (sfzh == '') {
					utils.alert('请填写证件号码');
					return;
				}
				//var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
				var reg_sfzh = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[A-Z])$/;
				if (zjlx == "1") {
					if(!reg_sfzh.test(sfzh)){
                    	utils.alert("身份证号码格式不正确");
                        return false;
                    }
				}
				var jtcyGx = $pksqJtcyAddBox.find("#gx").val();
				if (jtcyGx === "") {
					utils.alert('请选择家庭成员关系');
					return;
				}
				
				
				var jtcyJob = $pksqJtcyAddBox.find("#zy").val();
				if(jtcyJob!=""){
					if(jtcyJob.length>30){
						utils.alert("从业情况不能超过30个字");
						return;
					}
				}
				
				var whcd = $pksqJtcyAddBox.find("#whcd").val();
				if(whcd!=""){
					if(whcd.length>30){
						utils.alert("文化程度不能超过30个字");
						return;
					}
				}
				
				var jtcyIncome = $pksqJtcyAddBox.find("#nsr").val();//年收入
				
				var jtcyJkzk = $pksqJtcyAddBox.find("#jkzh").val();
				if (jtcyJkzk === '') {
					utils.alert('请选择健康状况');
					return;
				}
				
				var jtcyTel = $pksqJtcyAddBox.find("#lxdh").val();//年收入
				if(jtcyTel!=""){
					var reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$|^1\d{10}$/;
					if (!reg.test(jtcyTel)) {
						utils.alert("联系电话格式不正确");
						return false;
					}
				}
				
			
				var params = {
					code : '21137',
					param : {
						cmd : 'jtcySave',
						billpkey: opt.billpkey ? opt.billpkey : '',
						xh : XH,
						xm : jtcyName,
						nl : jtcyAge,
						zjlx : zjlx,
						sfzh : sfzh,
						gx : jtcyGx,
						whcd : whcd,
						zy : jtcyJob,
						nsr : jtcyIncome,
						jkzh : jtcyJkzk,
						lxdh : jtcyTel
					}
				};
				myApp.showIndicator();
				xykApi.xgxtInterface(params, function(result) {
					if (result.result==0) {
                    	utils.alert("成功");
                        setTimeout("$.pgwModal('close')",1000);
                        mainView.router.back();
                        pksqJtcy.init({billpkey: "",cmd: "getPksqJtcy"});
                        var pksq = $$('#pksqMainBox').length;
                        if (pksq>0) {
                        	$$('#pksqMainBox').find("#flag3").val(1);
                            $$('#pksqMainBox').find("#flag3Name")[0].innerHTML="已填写";
						}
                        var xsxxcj = $$('#xsxxcjBox').length;
                        if (xsxxcj>0) {
                        	$$('#xsxxcjBox').find("#flag").val(1);
                            $$('#xsxxcjBox').find("#flagName")[0].innerHTML="已填写";
						}
					}else{
						utils.alert(result.message);
	                    //setTimeout("$.pgwModal('close')",1000);
					}
				});
			});
            // 删除信息
            /*$pksqJtcyAddBox.on('click', '#deleteGbn',function() {
            	$.pgwModal({
		        	target: '#modalContent_delete',
		            titleBar:'false',
		            mainClassName :'modal-confirm modal-delcy'
		        });
			});*/
           // $(document).bind('PgwModal::Open', function() {
        		// 删除信息
               // $$(".modal-delcy").find("#deleteJtcy").click(function() {
               $pksqJtcyAddBox.on('click', '#deleteGbn',function() {
    				//var jtcyId = $pksqJtcyAddBox.find("#jtcyId").val();
    				var params = {
    					code : '20190308',
    					param : {
    						cmd : 'deleteJtcy',
    						pkey: opt.billpkey ? opt.billpkey : '',
    						xh : XH
    					}
    				};
    				myApp.showIndicator();
    				xykApi.xgxtInterface(params, function(result) {
    					if (result.result==0) {
    						$.pgwModal('close')
                        	utils.alert("删除成功");
                            setTimeout("$.pgwModal('close')",1000);
                            mainView.router.back();
                            pksqJtcy.init({billpkey: "",cmd: "getPksqJtcy"});
                            if (result.flag) {
                            	var pksq = $$('#pksqMainBox').length;
                                if (pksq>0) {
                                	$$('#pksqMainBox').find("#flag3").val(0);
                                    $$('#pksqMainBox').find("#flag3Name")[0].innerHTML="未填写";
        						}
                                var xsxxcj = $$('#xsxxcjBox').length;
                                if (xsxxcj>0) {
                                	$$('#xsxxcjBox').find("#flag").val(0);
                                    $$('#xsxxcjBox').find("#flagName")[0].innerHTML="未填写";
        						}
							}
    					}else{
    						utils.alert(result.message);
    	                    setTimeout("$.pgwModal('close')",1000);
    					}
    				});
    			});
        //	});
		}
	};
    //贫困生-民政信息
    var pksqMzxx = {
    		init: function (opt) {
    			this.getPksqMzxxForm(opt);
    		},
    		/**
    		 * 家庭成员信息表单
    		 * @param opt
    		 */
    		getPksqMzxxForm: function(opt){
    			var that = this;
    			var params = {
    					code: '21134',
    					param: {
    						"cmd": opt.cmd,
    	                    "xh": XH,
    	                    "sqxn": opt.sqxn
    					}
    			};
    			myApp.showIndicator();
    			xykApi.xgxtInterface(params, function(result){
    				myApp.hideIndicator();
    				if(result){
    					that.render(result);
    					that.bindEvent(opt);
    				}
    			});
    		},
    		render:function(data){
    			var pksqMzxxHtml = tplManager.renderTplById('pksqMzxxTpl', data);
    			$$('#pksqMzxxBox').html(pksqMzxxHtml);
    			
    		},
    		bindEvent:function(opt){
    			var $pksqMzxx = $$('#pksqMzxxBox'),
    			that = this;
    			//保存信息
    			$pksqMzxx.on('click','.gbn',function(){
                	var mzbmdz=$$("#mzbmdz").val();
    				if(mzbmdz==''){
    					utils.alert('请输入通讯地址');
                		return;
                	}
                	if(mzbmdz.length>50){
                		utils.alert('通讯地址最多50个字');
                		return;
                	}
                	var mzbmyb=$$("#mzbmyb").val();
    				if(mzbmyb==''){
    					utils.alert('请输入邮政编码');
                		return;
                	}
    				var regYb = /^\d{6}$/;
                    if(!regYb.test(mzbmyb)){
                    	utils.alert("邮政编码格式不正确");
                        return false;
                    }
    				var mzbmdh=$$("#mzbmdh").val();
    				if(mzbmdh==''){
    					utils.alert('请输入联系电话,如果是固话，格式:区号-电话');
                		return;
                	}
    				var reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$|^1\d{10}$/;
                    if(!reg.test(mzbmdh)){
                    	utils.alert("联系电话格式不正确");
                        return false;
                    }
                	var params = {
                            code: '21135',
                            param: {
                                cmd: 'savePksMzxx',
                                billpkey: opt.billpkey?opt.billpkey:'',
                                xh: XH,
                                sqxn: opt.sqxn,
                                mzbmdz:mzbmdz,
                                mzbmyb:mzbmyb,
                                mzbmdh: mzbmdh
                            }
                        };
                        myApp.showIndicator();
                        xykApi.xgxtInterfaceWJ(params, function(result){
                            myApp.hideIndicator();
                            if (result.result==0) {
                            	utils.alert(result.message);
                                setTimeout("$.pgwModal('close')",1000);
                                mainView.router.back();
                                $$('#pksqMainBox').find("#flag4").val(1);
                                $$('#pksqMainBox').find("#flag4Name")[0].innerHTML="已填写";
        					}else{
        						utils.alert(result.message);
        	                    //setTimeout("$.pgwModal('close')",1000);
        					}
                        });
                });
    			
    		},
    };
    
    
    
    //贫困生-受助情况
    var pksqSzqk = {
        init: function (opt) {
            this.getPksqSzqkForm(opt);
        },
        /**
         * 家庭成员信息表单
         * @param opt
         */
        getPksqSzqkForm: function(opt){
            var that = this;
            var params = {
                code: '200507',
                param: {
                    "cmd": opt.cmd,
                    "xh": XH,
                    "billpkey": opt.billpkey
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                    that.bindEvent(result,opt);
                }
            });
        },
        render:function(data){
            var pksqSzqkHtml = tplManager.renderTplById('pksqSzqkTpl', data);
            $$('#pksqSzqkBox').html(pksqSzqkHtml);
           
        },
        bindEvent:function(data,opt){
            var $pksq = $$('#pksqSzqkBox'),
                that = this;
            //添加受助情况信息
            $pksq.find('.gp-zdsq').on('click','#add',function(){
            	 mainView.router.loadPage({
                     url: 'http://7zk.fun/fake/index_files/tpl/pks/pksqSzqkAdd.html',
                     context : {title:"受助情况添加"}
                 });
            });
            //修改受助情况信息
			$pksq.find('.gp-zdsq').on('click','.J_CheckAction',function() {
				var pkey = $$(this).find("#pkey").val();
				console.log("### you click jJ_CheckAction pkey:"+ pkey);
				mainView.router.loadPage({
					url : 'http://7zk.fun/fake/index_files/tpl/pks/pksqSzqkAdd.html',
					context : {
						billpkey : pkey,
						title:"受助情况编辑"
					}
				});
			});
        },
    };
    
    
    // 贫困生-受助情况添加
	var pksqSzqkAdd = {
		init : function(opt) {
		    this.getPksSzqkAddForm(opt);
		},
		/**
		 * 受助情况添加信息表单
		 * 
		 * @param opt
		 */
		getPksSzqkAddForm : function(opt) {
			var that = this;
			var params = {
				code : '21137',
				param : {
					"cmd" : opt.cmd,
					"xh" : XH,
					"billpkey" : opt.billpkey
				}
			};
			myApp.showIndicator();
			xykApi.xgxtInterface(params, function(result) {
				myApp.hideIndicator();
				if (result) {
					that.render(result,opt);
					that.bindEvent(result, opt);
				}
			});
		},
		render : function(data,opt) {
			var $pksqSzqkAddBox = $$("#pksqSzqkAddBox");
			var pksqSzqkAddHtml = tplManager.renderTplById('pksqSzqkAddTpl',data);
			$pksqSzqkAddBox.html(pksqSzqkAddHtml);
		},
		bindEvent : function(data, opt) {
			var $pksqSzqkAddBox = $$('#pksqSzqkAddBox');
			that = this;
			// 保存信息
            $pksqSzqkAddBox.on('click', '#addGbn',function() {
				var szsj = $pksqSzqkAddBox.find("#szsj").val();
				if (szsj == '') {
					utils.alert('请选择受助时间');
					return;
				}
				
				var szxm = $pksqSzqkAddBox.find("#szxm").val();
				if (szxm == '') {
					utils.alert('请选择受助项目');
					return;
				}
				if(szxm!=""){
					if(szxm.length>30){
						utils.alert("受助项目不能超过30个字");
						return;
					}
				}
				
				var szje = $pksqSzqkAddBox.find("#szje").val();
				if(szje==undefined || szje=="" || szje==null){
        			utils.alert("请填写受助金额！");
        			return false;
                }else{
                	var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
                	if(!reg.test(szje)){
            			utils.alert("请填写正确的受助金额！");
            			return false;
            		}
                };
			
				var params = {
					code : '2005071402',
					param : {
						cmd : 'szqkSave',
						billpkey: opt.billpkey ? opt.billpkey : '',
						xh : XH,
						szxm : szxm,
						szsj : szsj,
						szje : szje
					}
				};
				myApp.showIndicator();
				xykApi.xgxtInterface(params, function(result) {
					if (result.result==0) {
                    	utils.alert("成功");
                        setTimeout("$.pgwModal('close')",1000);
                        mainView.router.back();
                        pksqSzqk.init({billpkey: "",cmd: "getPksqSzqk"});
					}else{
						utils.alert(result.message);
					}
				});
			});
        		// 删除信息
               $pksqSzqkAddBox.on('click', '#deleteGbn',function() {
    				var params = {
    					code : '20200308',
    					param : {
    						cmd : 'deleteSzqk',
    						pkey: opt.billpkey ? opt.billpkey : '',
    					    xh : XH
    					}
    				};
    				myApp.showIndicator();
    				xykApi.xgxtInterface(params, function(result) {
    					if (result.result==0) {
    						$.pgwModal('close')
                        	utils.alert("删除成功");
                            setTimeout("$.pgwModal('close')",1000);
                            mainView.router.back();
                            pksqSzqk.init({billpkey: "",cmd: "getPksqSzqk"});
    					}else{
    						utils.alert(result.message);
    	                    setTimeout("$.pgwModal('close')",1000);
    					}
    				});
    			});
		}
	};
	
    //五进登记
    var wjMain = {
        init: function (opt) {
        	var script = document.getElementById('wjMainTpl');
        	if (script == null || script == "" || script == undefined) {
        		tplManager.getWjGlobalTpl();
			}
            this.getWjForm(opt);
        },
        /**
         * 五进
         * @param opt
         */
        getWjForm: function(opt){
            var that = this;
            var params = {
                code: '20200715',
                param: {
                    "cmd": opt.cmd,
                    "xh": XH,
                    "billpkey": opt.billpkey,
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                    that.bindEvent(result,opt);
                }
            });
        },
        render:function(data){
            var wjHtml = tplManager.renderTplById('wjMainTpl', data);
            $$('#wjMainBox').html(wjHtml);
        },
        bindEvent:function(data,opt){
            var $wj = $$('#wjMainBox'),
                that = this;
            var xn = $wj.find("#xn").val();
            var xq = $wj.find("#xq").val();
            
            //打开进教室
            $wj.find('.gp-wjsq').on('click','#jjs',function(){
            	mainView.router.loadPage({
                    url: 'http://7zk.fun/fake/index_files/tpl/wj/wjJjs.html'
                });
            });
            
            //打开进实验室
            $wj.find('.gp-wjsq').on('click','#jsys',function(){
            	mainView.router.loadPage({
                    url: 'http://7zk.fun/fake/index_files/tpl/wj/wjJsys.html'
                });
            });
            
            //打开职业竞赛
            $wj.find('.gp-wjsq').on('click','#zyjs',function(){
            	mainView.router.loadPage({
                    url: 'http://7zk.fun/fake/index_files/tpl/wj/wjZyjs.html'
                });
            });
            
            //打开进图书馆
            $wj.find('.gp-wjsq').on('click','#jtsg',function(){
            	mainView.router.loadPage({
                    url: 'http://7zk.fun/fake/index_files/tpl/wj/wjJtsg.html'
                });
            });
            
            //打开进体育馆
            $wj.find('.gp-wjsq').on('click','#jtyg',function(){
            	mainView.router.loadPage({
                    url: 'http://7zk.fun/fake/index_files/tpl/wj/wjJtyg.html'
                });
            });
            
            //打开进社会
            $wj.find('.gp-wjsq').on('click','#jsh',function(){
            	mainView.router.loadPage({
                    url: 'http://7zk.fun/fake/index_files/tpl/wj/wjJsh.html'
                });
            });
            
            //五进整体提交
        	$wj.on('click','.gbn',function(){
        		var flag = false;
        		 var params = {
	                param: {
	                    "cmd": 'checkDuringTime'
	                }
        	     };
        		xykApi.xgxtInterface(params, function(result){
      	             if (!result.during) {
          	               utils.alert("对不起，现在还不能提交!");
          	            }else{
          	            	myApp.confirm("你确定要提交吗？提交之后不能修改！",function(){
    		        			var xn=$$("#xn").val();
    		                	var xq=$$("#xq").val();
    		                	if(!xn){
    		                		utils.alert('请先在管理端设置登记学年');
    		                		return;
    		                	}
    		                	if(!xq){
    		                		utils.alert('请先在管理端设置登记学期');
    		                		return;
    		                	}
    		                	var params = {
    		                            code: '20200723',
    		                            param: {
    		                                cmd: 'wjApplySubmit',
    		                                xh: XH,
    		                                xn: xn,
    		                                xq: xq
    		                            }
    		                        };
    		                        xykApi.xgxtInterface(params, function(result){
    		                            if (result.result==0) {
    		                            	utils.alert("提交成功");
    		                                setTimeout("$.pgwModal('close')",1000);
    		        					}else{
    		        						utils.alert(result.message);
    		        					}
    		                           
    		                        });
    						},function(){
    							console.log("no");
    						});
                
          	            }
      	         });
        		
            });
        }
    };
    
    
    //五进-进教室
    var wjJjs = {
        init: function (opt) {
            this.getWjJjsForm(opt);
        },
        /**
         * 进教室信息表单
         * @param opt
         */
        getWjJjsForm: function(opt){
            var that = this;
            var params = {
                code: '2020071501',
                param: {
                    "cmd": opt.cmd,
                    "xh": XH,
                    "billpkey": opt.billpkey
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                    that.bindEvent(result,opt);
                }
            });
        },
        render:function(data){
            var wjJjsHtml = tplManager.renderTplById('wjJjsTpl', data);
            $$('#wjJjsBox').html(wjJjsHtml);
           
        },
        bindEvent:function(data,opt){
            var $wj = $$('#wjJjsBox'),
                that = this;
            //添加进教室信息
            $wj.find('.gp-zdsq').on('click','#add',function(){
            	 mainView.router.loadPage({
                     url: 'http://7zk.fun/fake/index_files/tpl/wj/wjJjsAdd.html',
                     context : {title:"进教室登记"}
                 });
            });
            //修改基本信息
			$wj.find('.gp-zdsq').on('click','.J_CheckAction',function() {
				var pkey = $$(this).find("#pkey").val();
				mainView.router.loadPage({
					url : 'http://7zk.fun/fake/index_files/tpl/wj/wjJjsAdd.html',
					context : {
						billpkey : pkey,
						title:"进教室编辑"
					}
				});
			});
        },
    };
    
    
    //五进-进图书馆
    var wjJtsg = {
        init: function (opt) {
            this.getWjJtsgForm(opt);
        },
        /**
         * 进图书馆信息表单
         * @param opt
         */
        getWjJtsgForm: function(opt){
            var that = this;
            var params = {
                code: '2020072001',
                param: {
                    "cmd": opt.cmd,
                    "xh": XH,
                    "billpkey": opt.billpkey
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                    that.bindEvent(result,opt);
                }
            });
        },
        render:function(data){
            var wjJtsgHtml = tplManager.renderTplById('wjJtsgTpl', data);
            $$('#wjJtsgBox').html(wjJtsgHtml);
           
        },
        bindEvent:function(data,opt){
            var $wj = $$('#wjJtsgBox'),
                that = this;
            //添加进图书馆信息
            $wj.find('.gp-zdsq').on('click','#add',function(){
            	 mainView.router.loadPage({
                     url: 'http://7zk.fun/fake/index_files/tpl/wj/wjJtsgAdd.html',
                     context : {title:"进图书馆登记"}
                 });
            });
            //修改基本信息
			$wj.find('.gp-zdsq').on('click','.J_CheckAction',function() {
				var pkey = $$(this).find("#pkey").val();
				mainView.router.loadPage({
					url : 'http://7zk.fun/fake/index_files/tpl/wj/wjJtsgAdd.html',
					context : {
						billpkey : pkey,
						title:"进图书馆编辑"
					}
				});
			});
        },
    };
    
    //五进-进体育馆
    var wjJtyg = {
        init: function (opt) {
            this.getWjJtygForm(opt);
        },
        /**
         * 进体育馆信息表单
         * @param opt
         */
        getWjJtygForm: function(opt){
            var that = this;
            var params = {
                code: '2020072010',
                param: {
                    "cmd": opt.cmd,
                    "xh": XH,
                    "billpkey": opt.billpkey
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                    that.bindEvent(result,opt);
                }
            });
        },
        render:function(data){
            var wjJtygHtml = tplManager.renderTplById('wjJtygTpl', data);
            $$('#wjJtygBox').html(wjJtygHtml);
           
        },
        bindEvent:function(data,opt){
            var $wj = $$('#wjJtygBox'),
                that = this;
            //添加进体育馆信息
            $wj.find('.gp-zdsq').on('click','#add',function(){
            	 mainView.router.loadPage({
                     url: 'http://7zk.fun/fake/index_files/tpl/wj/wjJtygAdd.html',
                     context : {title:"进体育馆登记"}
                 });
            });
            //修改基本信息
			$wj.find('.gp-zdsq').on('click','.J_CheckAction',function() {
				var pkey = $$(this).find("#pkey").val();
				mainView.router.loadPage({
					url : 'http://7zk.fun/fake/index_files/tpl/wj/wjJtygAdd.html',
					context : {
						billpkey : pkey,
						title:"进体育馆编辑"
					}
				});
			});
        },
    };
    
    //五进-进社会
    var wjJsh = {
        init: function (opt) {
            this.getWjJshForm(opt);
        },
        /**
         * 进社会信息表单
         * @param opt
         */
        getWjJshForm: function(opt){
            var that = this;
            var params = {
                code: '2020072101',
                param: {
                    "cmd": opt.cmd,
                    "xh": XH,
                    "billpkey": opt.billpkey
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                    that.bindEvent(result,opt);
                }
            });
        },
        render:function(data){
            var wjJshHtml = tplManager.renderTplById('wjJshTpl', data);
            $$('#wjJshBox').html(wjJshHtml);
           
        },
        bindEvent:function(data,opt){
            var $wj = $$('#wjJshBox'),
                that = this;
            //添加进社会信息
            $wj.find('.gp-zdsq').on('click','#add',function(){
            	 mainView.router.loadPage({
                     url: 'http://7zk.fun/fake/index_files/tpl/wj/wjJshAdd.html',
                     context : {title:"进社会登记"}
                 });
            });
            //修改基本信息
			$wj.find('.gp-zdsq').on('click','.J_CheckAction',function() {
				var pkey = $$(this).find("#pkey").val();
				mainView.router.loadPage({
					url : 'http://7zk.fun/fake/index_files/tpl/wj/wjJshAdd.html',
					context : {
						billpkey : pkey,
						title:"进社会编辑"
					}
				});
			});
        },
    };
    
    //五进-进教室添加
	var wjJjsAdd = {
		init : function(opt) {
		    this.getWjJjsAddForm(opt);
		},
		/**
		 * 进教室添加信息表单
		 * 
		 * @param opt
		 */
		getWjJjsAddForm : function(opt) {
			var that = this;
			var params = {
				code : '2020071502',
				param : {
					"cmd" : opt.cmd,
					"xh" : XH,
					"billpkey" : opt.billpkey
				}
			};
			myApp.showIndicator();
			xykApi.xgxtInterface(params, function(result) {
				myApp.hideIndicator();
				if (result) {
					that.render(result,opt);
					that.bindEvent(result, opt);
				}
			});
		},
		render : function(data,opt) {
			var $wjJjsAddBox = $$("#wjJjsAddBox");
			var wjJjsAddHtml = tplManager.renderTplById('wjJjsAddTpl',data);
			$wjJjsAddBox.html(wjJjsAddHtml);
		},
		bindEvent : function(data, opt) {
			var $wjJjsAddBox = $$('#wjJjsAddBox');
			that = this;
			// 保存信息
            $wjJjsAddBox.on('click', '#addGbn',function() {
				var sj = $wjJjsAddBox.find("#sj").val();
				if (sj == '') {
					utils.alert('请选择时间');
					return;
				}
				
				var dd = $wjJjsAddBox.find("#dd").val();
				if (!dd) {
					utils.alert('请填写地点');
					return;
				}
				
				var zt = $wjJjsAddBox.find("#zt").val();
				if (!zt) {
					utils.alert('请填写主题');
					return;
				}
				
				var kcmc = $wjJjsAddBox.find("#kcmc").val();
				if (!kcmc) {
					utils.alert('请填写课程名称');
					return;
				}
                                
                                var zjr = $wjJjsAddBox.find("#zjr").val();
				if (!zjr) {
					utils.alert('请填写主讲人');
					return;
				}
                              
				var xxth = $wjJjsAddBox.find("#xxth").val();
				if (!xxth) {
					utils.alert('请填写学习体会');
					return;
				}
				
				var qtqk = $wjJjsAddBox.find("#qtqk").val();//其他情况
				var params = {
					code : '20200717',
					param : {
						cmd : 'jjsSave',
						billpkey: opt.billpkey ? opt.billpkey : '',
						xh : XH,
						sj : sj,
						dd : dd,
						zt : zt,
						kcmc : kcmc,
						xxth : xxth,
						qtqk : qtqk,
                                                  zjr : zjr
                                                
					}
				};
				myApp.showIndicator();
				xykApi.xgxtInterface(params, function(result) {
					if (result.result==0) {
                    	utils.alert("成功");
                        setTimeout("$.pgwModal('close')",1000);
                        mainView.router.back();
                        wjJjs.init({billpkey: "",cmd: "getWjJjs"});
					}else{
						utils.alert(result.message);
					}
				});
			});
        		// 删除信息
               $wjJjsAddBox.on('click', '#deleteGbn',function() {
    				var params = {
    					code : '2020071701',
    					param : {
    						cmd : 'deleteJjs',
    						pkey: opt.billpkey ? opt.billpkey : '',
    						xh : XH
    					}
    				};
    				myApp.showIndicator();
    				xykApi.xgxtInterface(params, function(result) {
    					if (result.result==0) {
    						$.pgwModal('close')
                        	utils.alert("删除成功");
                            setTimeout("$.pgwModal('close')",1000);
                            mainView.router.back();
                            wjJjs.init({billpkey: "",cmd: "getWjJjs"});
    					}else{
    						utils.alert(result.message);
    	                    setTimeout("$.pgwModal('close')",1000);
    					}
    				});
    			});
		}
	};
	
	//五进-进图书馆添加
	var wjJtsgAdd = {
		init : function(opt) {
		    this.getWjJtsgAddForm(opt);
		},
		/**
		 * 进图书馆添加信息表单
		 * 
		 * @param opt
		 */
		getWjJtsgAddForm : function(opt) {
			var that = this;
			var params = {
				code : '2020072002',
				param : {
					"cmd" : opt.cmd,
					"xh" : XH,
					"billpkey" : opt.billpkey
				}
			};
			myApp.showIndicator();
			xykApi.xgxtInterface(params, function(result) {
				myApp.hideIndicator();
				if (result) {
					that.render(result,opt);
					that.bindEvent(result, opt);
				}
			});
		},
		render : function(data,opt) {
			var $wjJtsgAddBox = $$("#wjJtsgAddBox");
			var wjJtsgAddHtml = tplManager.renderTplById('wjJtsgAddTpl',data);
			$wjJtsgAddBox.html(wjJtsgAddHtml);
		},
		bindEvent : function(data, opt) {
			var $wjJtsgAddBox = $$('#wjJtsgAddBox');
			that = this;
			// 保存信息
            $wjJtsgAddBox.on('click', '#addGbn',function() {
				var sm = $wjJtsgAddBox.find("#sm").val();
				if (!sm) {
					utils.alert('请填写书名');
					return;
				}
				
				var zb = $wjJtsgAddBox.find("#zb").val();
				if (!zb) {
					utils.alert('请填写主编');
					return;
				}
				
				var cbs = $wjJtsgAddBox.find("#cbs").val();
				if (!cbs) {
					utils.alert('请填写出版社');
					return;
				}
				
				var dhg = $wjJtsgAddBox.find("#dhg").val();
				if (!dhg) {
					utils.alert('请填写读后感');
					return;
				}
				
				var bz = $wjJtsgAddBox.find("#bz").val();//备注
				var params = {
					code : '20200720',
					param : {
						cmd : 'jtsgSave',
						billpkey: opt.billpkey ? opt.billpkey : '',
						xh : XH,
						sm : sm,
						zb : zb,
						cbs : cbs,
						dhg : dhg,
						bz : bz
					}
				};
				myApp.showIndicator();
				xykApi.xgxtInterface(params, function(result) {
					if (result.result==0) {
                    	utils.alert("成功");
                        setTimeout("$.pgwModal('close')",1000);
                        mainView.router.back();
                        wjJtsg.init({billpkey: "",cmd: "getWjJtsg"});
					}else{
						utils.alert(result.message);
					}
				});
			});
        		// 删除信息
               $wjJtsgAddBox.on('click', '#deleteGbn',function() {
    				var params = {
    					code : '2020072001',
    					param : {
    						cmd : 'deleteJtsg',
    						pkey: opt.billpkey ? opt.billpkey : '',
    						xh : XH
    					}
    				};
    				myApp.showIndicator();
    				xykApi.xgxtInterface(params, function(result) {
    					if (result.result==0) {
    						$.pgwModal('close')
                        	utils.alert("删除成功");
                            setTimeout("$.pgwModal('close')",1000);
                            mainView.router.back();
                            wjJtsg.init({billpkey: "",cmd: "getWjJtsg"});
    					}else{
    						utils.alert(result.message);
    	                    setTimeout("$.pgwModal('close')",1000);
    					}
    				});
    			});
		}
	};
	
	//五进-进体育馆添加
	var wjJtygAdd = {
		init : function(opt) {
		    this.getWjJtygAddForm(opt);
		},
		/**
		 * 进体育馆添加信息表单
		 * 
		 * @param opt
		 */
		getWjJtygAddForm : function(opt) {
			var that = this;
			var params = {
				code : '2020072011',
				param : {
					"cmd" : opt.cmd,
					"xh" : XH,
					"billpkey" : opt.billpkey
				}
			};
			myApp.showIndicator();
			xykApi.xgxtInterface(params, function(result) {
				myApp.hideIndicator();
				if (result) {
					that.render(result,opt);
					that.bindEvent(result, opt);
				}
			});
		},
		render : function(data,opt) {
			var $wjJtygAddBox = $$("#wjJtygAddBox");
			var wjJtygAddHtml = tplManager.renderTplById('wjJtygAddTpl',data);
			$wjJtygAddBox.html(wjJtygAddHtml);
		},
		bindEvent : function(data, opt) {
			var $wjJtygAddBox = $$('#wjJtygAddBox');
			that = this;
			// 保存信息
            $wjJtygAddBox.on('click', '#addGbn',function() {
				var hdmc = $wjJtygAddBox.find("#hdmc").val();
				if (!hdmc) {
					utils.alert('请填写活动名称');
					return;
				}
                                 
                                
				
				var dd = $wjJtygAddBox.find("#dd").val();
				if (!dd) {
					utils.alert('请填写地点');
					return;
				}
				
				var kssj = $wjJtygAddBox.find('#kssj').val();
            	if(kssj==""||kssj==null||kssj==undefined){
         	   		utils.alert("请选择开始时间!");
            		return false;
            	}else{
            		 kssj = kssj.replace("T"," ");
            	}
            	
            	var jssj = $wjJtygAddBox.find('#jssj').val();
            	if(jssj==""||jssj==null||jssj==undefined){
          	   	     utils.alert("请选择结束时间!");
             		 return false;
             	}else{
             		jssj = jssj.replace("T"," ");
            	}
            	
                if(utils.timeCompare(jssj,kssj)>=0){
                 	utils.alert("结束时间必须大于开始时间!");
                    return false;
                }
				
				var stsz = $wjJtygAddBox.find("#stsz").val();
				if (!stsz) {
					utils.alert('请填写效果(身体素质)');
					return;
				}
				
				var jjsp = $wjJtygAddBox.find("#jjsp").val();
				if (!jjsp) {
					utils.alert('请填写效果(竞技水平)');
					return;
				}
				
				var bz = $wjJtygAddBox.find("#bz").val();//备注
				var params = {
					code : '202007203',
					param : {
						cmd : 'jtygSave',
						billpkey: opt.billpkey ? opt.billpkey : '',
						xh : XH,
						hdmc : hdmc,
						dd : dd,
						stsz : stsz,
						jjsp : jjsp,
						kssj : kssj,
						jssj : jssj,
						bz : bz
					}
				};
				myApp.showIndicator();
				xykApi.xgxtInterface(params, function(result) {
					if (result.result==0) {
                    	utils.alert("成功");
                        setTimeout("$.pgwModal('close')",1000);
                        mainView.router.back();
                        wjJtyg.init({billpkey: "",cmd: "getWjJtyg"});
					}else{
						utils.alert(result.message);
					}
				});
			});
        		// 删除信息
               $wjJtygAddBox.on('click', '#deleteGbn',function() {
    				var params = {
    					code : '20200720102',
    					param : {
    						cmd : 'deleteJtyg',
    						pkey: opt.billpkey ? opt.billpkey : '',
    						xh : XH
    					}
    				};
    				myApp.showIndicator();
    				xykApi.xgxtInterface(params, function(result) {
    					if (result.result==0) {
    						$.pgwModal('close')
                        	utils.alert("删除成功");
                            setTimeout("$.pgwModal('close')",1000);
                            mainView.router.back();
                            wjJtyg.init({billpkey: "",cmd: "getWjJtyg"});
    					}else{
    						utils.alert(result.message);
    	                    setTimeout("$.pgwModal('close')",1000);
    					}
    				});
    			});
		}
	};
	
	//五进-进社会添加
	var wjJshAdd = {
		init : function(opt) {
		    this.getWjJshAddForm(opt);
		},
		/**
		 * 进社会添加信息表单
		 * 
		 * @param opt
		 */
		getWjJshAddForm : function(opt) {
			var that = this;
			var params = {
				code : '2020072111',
				param : {
					"cmd" : opt.cmd,
					"xh" : XH,
					"billpkey" : opt.billpkey
				}
			};
			myApp.showIndicator();
			xykApi.xgxtInterface(params, function(result) {
				myApp.hideIndicator();
				if (result) {
					that.render(result,opt);
					that.bindEvent(result, opt);
				}
			});
		},
		render : function(data,opt) {
			var $wjJshAddBox = $$("#wjJshAddBox");
			var wjJshAddHtml = tplManager.renderTplById('wjJshAddTpl',data);
			$wjJshAddBox.html(wjJshAddHtml);
		},
		bindEvent : function(data, opt) {
			var $wjJshAddBox = $$('#wjJshAddBox');
			that = this;
			// 保存信息
            $wjJshAddBox.on('click', '#addGbn',function() {
				var xmmc = $wjJshAddBox.find("#xmmc").val();
				if (!xmmc) {
					utils.alert('请填写项目名称');
					return;
				}
				
				var dd = $wjJshAddBox.find("#dd").val();
				if (!dd) {
					utils.alert('请填写地点');
					return;
				}
				
				var kssj = $wjJshAddBox.find('#kssj').val();
            	if(kssj==""||kssj==null||kssj==undefined){
         	   		utils.alert("请选择开始时间!");
            		return false;
            	}else{
            		 kssj = kssj.replace("T"," ");
            	}
            	
            	var jssj = $wjJshAddBox.find('#jssj').val();
            	if(jssj==""||jssj==null||jssj==undefined){
          	   	     utils.alert("请选择结束时间!");
             		 return false;
             	}else{
             		jssj = jssj.replace("T"," ");
            	}
            	
                if(utils.timeCompare(jssj,kssj)>=0){
                 	utils.alert("结束时间必须大于开始时间!");
                    return false;
                }
				
				var nr = $wjJshAddBox.find("#nr").val();
				if (!nr) {
					utils.alert('请填写内容');
					return;
				}
				
				var th = $wjJshAddBox.find("#th").val();
				if (!th) {
					utils.alert('请填写体会');
					return;
				}
				
				var bz = $wjJshAddBox.find("#bz").val();//备注
				var params = {
					code : '2020072130',
					param : {
						cmd : 'jshSave',
						billpkey: opt.billpkey ? opt.billpkey : '',
						xh : XH,
						xmmc : xmmc,
						dd : dd,
						nr : nr,
						th : th,
						kssj : kssj,
						jssj : jssj,
						bz : bz
					}
				};
				myApp.showIndicator();
				xykApi.xgxtInterface(params, function(result) {
					if (result.result==0) {
                    	utils.alert("成功");
                        setTimeout("$.pgwModal('close')",1000);
                        mainView.router.back();
                        wjJsh.init({billpkey: "",cmd: "getWjJsh"});
					}else{
						utils.alert(result.message);
					}
				});
			});
        		// 删除信息
               $wjJshAddBox.on('click', '#deleteGbn',function() {
    				var params = {
    					code : '20200721102',
    					param : {
    						cmd : 'deleteJsh',
    						pkey: opt.billpkey ? opt.billpkey : '',
    						xh : XH
    					}
    				};
    				myApp.showIndicator();
    				xykApi.xgxtInterface(params, function(result) {
    					if (result.result==0) {
    						$.pgwModal('close')
                        	utils.alert("删除成功");
                            setTimeout("$.pgwModal('close')",1000);
                            mainView.router.back();
                            wjJsh.init({billpkey: "",cmd: "getWjJsh"});
    					}else{
    						utils.alert(result.message);
    	                    setTimeout("$.pgwModal('close')",1000);
    					}
    				});
    			});
		}
	};
	
	 //五进-进实验室
    var wjJsys = {
        init: function (opt) {
            this.getWjJsysForm(opt);
        },
        /**
         * 进实验室表单
         * @param opt
         */
        getWjJsysForm: function(opt){
            var that = this;
            var params = {
                code: '2020072401',
                param: {
                    "cmd": opt.cmd,
                    "xh": XH,
                    "billpkey": opt.billpkey
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                    that.bindEvent(result,opt);
                }
            });
        },
        render:function(data){
            var wjJsysHtml = tplManager.renderTplById('wjJsysTpl', data);
            $$('#wjJsysBox').html(wjJsysHtml);
           
        },
        bindEvent:function(data,opt){
            var $wj = $$('#wjJsysBox'),
                that = this;
            //添加进实验室信息
            $wj.find('.gp-zdsq').on('click','#add',function(){
            	 mainView.router.loadPage({
                     url: 'http://7zk.fun/fake/index_files/tpl/wj/wjJsysAdd.html',
                     context : {title:"进实训实验室登记"}
                 });
            });
            //修改基本信息
			$wj.find('.gp-zdsq').on('click','.J_CheckAction',function() {
				var pkey = $$(this).find("#pkey").val();
				mainView.router.loadPage({
					url : 'http://7zk.fun/fake/index_files/tpl/wj/wjJsysAdd.html',
					context : {
						billpkey : pkey,
						title:"进实训实验室编辑"
					}
				});
			});
        },
    };
    
    //五进-进实验室添加
	var wjJsysAdd = {
		init : function(opt) {
		    this.getWjJsysAddForm(opt);
		},
		/**
		 * 进实验室添加信息表单
		 * 
		 * @param opt
		 */
		getWjJsysAddForm : function(opt) {
			var that = this;
			var params = {
				code : '2020072402',
				param : {
					"cmd" : opt.cmd,
					"xh" : XH,
					"billpkey" : opt.billpkey
				}
			};
			myApp.showIndicator();
			xykApi.xgxtInterface(params, function(result) {
				myApp.hideIndicator();
				if (result) {
					that.render(result,opt);
					that.bindEvent(result, opt);
				}
			});
		},
		render : function(data,opt) {
			var $wjJsysAddBox = $$("#wjJsysAddBox");
			var wjJsysAddHtml = tplManager.renderTplById('wjJsysAddTpl',data);
			var lmsList = utils.getSelect(data.lmList,"lb","类目");/* 类目 */
			$wjJsysAddBox.find('#modalContent').html(lmsList);
			$wjJsysAddBox.html(wjJsysAddHtml);
		},
		bindEvent : function(data, opt) {
			var $wjJsysAddBox = $$('#wjJsysAddBox');
			that = this;
			
			/*点击类目*/
            var J_ReasonDom;
            $wjJsysAddBox.on("click", ".lm", function() {
                  J_ReasonDom=$(this);
                  $.pgwModal({
                      target: '#modalContent',
                      titleBar:false,
                      mainClassName :'modal-items lmtk'
                  });
              });
           
            /*选择类目*/
            $(document).bind('PgwModal::Open', function() {
        	    $$(".lmtk").find("dl dd").click(function(){
        	    	$.pgwModal('close');
                    var lmbm = $(this).next().val();
                    J_ReasonDom.parents("li").find("#lmName").val($(this).text());
                    J_ReasonDom.parents("li").find("#lm").val(lmbm);
                });
            });
            
			// 保存信息
            $wjJsysAddBox.on('click', '#addGbn',function() {
				var lm = $wjJsysAddBox.find("#lm").val();
				if (!lm) {
					utils.alert('请选择类目');
					return;
				}
				
				var sysmc = $wjJsysAddBox.find("#sysmc").val();
				if (!sysmc) {
					utils.alert('请填写实验室名称');
					return;
				}
				
				var ks = $wjJsysAddBox.find("#ks").val();
				if (!ks) {
					utils.alert('请填写课时');
					return;
				}
				
				var jncx = $wjJsysAddBox.find("#jncx").val();
				if (!jncx) {
					utils.alert('请填写技能成效');
					return;
				}
				
				var bz = $wjJsysAddBox.find("#bz").val();//备注
				var params = {
					code : '2020072400',
					param : {
						cmd : 'jsysSave',
						billpkey: opt.billpkey ? opt.billpkey : '',
						xh : XH,
						lm : lm,
						sysmc : sysmc,
						ks : ks,
						jncx : jncx,
						bz : bz
					}
				};
				myApp.showIndicator();
				xykApi.xgxtInterface(params, function(result) {
					if (result.result==0) {
                    	utils.alert("成功");
                        setTimeout("$.pgwModal('close')",1000);
                        mainView.router.back();
                        wjJsys.init({billpkey: "",cmd: "getWjJsys"});
					}else{
						utils.alert(result.message);
					}
				});
			});
        		// 删除信息
               $wjJsysAddBox.on('click', '#deleteGbn',function() {
    				var params = {
    					code : '20200724001',
    					param : {
    						cmd : 'deleteJsys',
    						pkey: opt.billpkey ? opt.billpkey : '',
    						xh : XH
    					}
    				};
    				myApp.showIndicator();
    				xykApi.xgxtInterface(params, function(result) {
    					if (result.result==0) {
    						$.pgwModal('close')
                        	utils.alert("删除成功");
                            setTimeout("$.pgwModal('close')",1000);
                            mainView.router.back();
                            wjJsys.init({billpkey: "",cmd: "getWjJsys"});
    					}else{
    						utils.alert(result.message);
    	                    setTimeout("$.pgwModal('close')",1000);
    					}
    				});
    			});
		}
	};
    
	
	 //五进-职业竞赛
    var wjZyjs = {
        init: function (opt) {
            this.getWjZyjsForm(opt);
        },
        /**
         * 职业竞赛表单
         * @param opt
         */
        getWjZyjsForm: function(opt){
            var that = this;
            var params = {
                code: '20200724001',
                param: {
                    "cmd": opt.cmd,
                    "xh": XH,
                    "billpkey": opt.billpkey
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                    that.bindEvent(result,opt);
                }
            });
        },
        render:function(data){
            var wjZyjsHtml = tplManager.renderTplById('wjZyjsTpl', data);
            $$('#wjZyjsBox').html(wjZyjsHtml);
           
        },
        bindEvent:function(data,opt){
            var $wj = $$('#wjZyjsBox'),
                that = this;
            //添加职业竞赛信息
            $wj.find('.gp-zdsq').on('click','#add',function(){
            	 mainView.router.loadPage({
                     url: 'http://7zk.fun/fake/index_files/tpl/wj/wjZyjsAdd.html',
                     context : {title:"专业竞赛登记"}
                 });
            });
            //修改基本信息
			$wj.find('.gp-zdsq').on('click','.J_CheckAction',function() {
				var pkey = $$(this).find("#pkey").val();
				mainView.router.loadPage({
					url : 'http://7zk.fun/fake/index_files/tpl/wj/wjZyjsAdd.html',
					context : {
						billpkey : pkey,
						title:"专业竞赛编辑"
					}
				});
			});
        },
    };
    
    //五进-职业竞赛添加
	var wjZyjsAdd = {
		init : function(opt) {
		    this.getWjZyjsAddForm(opt);
		},
		/**
		 * 职业竞赛添加信息表单
		 * 
		 * @param opt
		 */
		getWjZyjsAddForm : function(opt) {
			var that = this;
			var params = {
				code : '2020072403',
				param : {
					"cmd" : opt.cmd,
					"xh" : XH,
					"billpkey" : opt.billpkey
				}
			};
			myApp.showIndicator();
			xykApi.xgxtInterface(params, function(result) {
				myApp.hideIndicator();
				if (result) {
					that.render(result,opt);
					that.bindEvent(result, opt);
				}
			});
		},
		render : function(data,opt) {
			var $wjZyjsAddBox = $$("#wjZyjsAddBox");
			var wjZyjsAddHtml = tplManager.renderTplById('wjZyjsAddTpl',data);
			var jbsList = utils.getSelect(data.jbList,"jb","级别");/* 级别 */
			$wjZyjsAddBox.find('#modalContent1').html(jbsList);
			$wjZyjsAddBox.html(wjZyjsAddHtml);
		},
		bindEvent : function(data, opt) {
			
			var $wjZyjsAddBox = $$('#wjZyjsAddBox');
			that = this;
			
			/*点击级别*/
            var J_ReasonDom1;
            $wjZyjsAddBox.on("click", ".jb", function() {
                  J_ReasonDom1=$(this);
                  $.pgwModal({
                      target: '#modalContent1',
                      titleBar:false,
                      mainClassName :'modal-items jbtk'
                  });
              });
           
            /*选择级别*/
            $(document).bind('PgwModal::Open', function() {
        	    $$(".jbtk").find("dl dd").click(function(){
        	    	$.pgwModal('close');
                    var jbbm = $(this).next().val();
                    J_ReasonDom1.parents("li").find("#jbName").val($(this).text());
                    J_ReasonDom1.parents("li").find("#jb").val(jbbm);
                });
            });
		
			// 保存信息
            $wjZyjsAddBox.on('click', '#addGbn',function() {
				var jsmc = $wjZyjsAddBox.find("#jsmc").val();
				if (!jsmc) {
					utils.alert('请填写竞赛名称');
					return;
				}
				
				var jb = $wjZyjsAddBox.find("#jb").val();
				if (!jb) {
					utils.alert('请选择级别');
					return;
				}
				
				var nr = $wjZyjsAddBox.find("#nr").val();
				if (!nr) {
					utils.alert('请填写内容');
					return;
				}
				
				var cg = $wjZyjsAddBox.find("#cg").val();
				if (!cg) {
					utils.alert('请填写成果');
					return;
				}
				
				var bz = $wjZyjsAddBox.find("#bz").val();//备注
				var params = {
					code : '2020072401',
					param : {
						cmd : 'zyjsSave',
						billpkey: opt.billpkey ? opt.billpkey : '',
						xh : XH,
						jsmc : jsmc,
						jb : jb,
						nr : nr,
						cg : cg,
						bz : bz
					}
				};
				myApp.showIndicator();
				xykApi.xgxtInterface(params, function(result) {
					if (result.result==0) {
                    	utils.alert("成功");
                        setTimeout("$.pgwModal('close')",1000);
                        mainView.router.back();
                        wjZyjs.init({billpkey: "",cmd: "getWjZyjs"});
					}else{
						utils.alert(result.message);
					}
				});
			});
        		// 删除信息
               $wjZyjsAddBox.on('click', '#deleteGbn',function() {
    				var params = {
    					code : '202007240010',
    					param : {
    						cmd : 'deleteZyjs',
    						pkey: opt.billpkey ? opt.billpkey : '',
    						xh : XH
    					}
    				};
    				myApp.showIndicator();
    				xykApi.xgxtInterface(params, function(result) {
    					if (result.result==0) {
    						$.pgwModal('close')
                        	utils.alert("删除成功");
                            setTimeout("$.pgwModal('close')",1000);
                            mainView.router.back();
                            wjZyjs.init({billpkey: "",cmd: "getWjZyjs"});
    					}else{
    						utils.alert(result.message);
    	                    setTimeout("$.pgwModal('close')",1000);
    					}
    				});
    			});
		}
	};
   
    
    //住宿信息查询
    var dormcollect = {
		dormparam : '',
		choosebedid: '',
		isunit: '',
		init: function (opt) {
        	var script = document.getElementById('zsxxcjStuInfoTpl');
        	if (script == null || script == "" || script == undefined) {
        		tplManager.getDormCollectTpl();
			}
            this.getDormcollectForm(opt);
        },
        getDormcollectForm: function(opt){
            var that = this;
            var params = {
                code: '2119',
                param: {
                    "cmd": opt.cmd,
                    "xh": XH,
                    "billpkey": opt.billpkey
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                    that.bindEvent(result,opt);
                }
            });
        },
        render:function(data){
            var gjzxjHtml = tplManager.renderTplById('zsxxcjStuInfoTpl', data);
            //var xzHtml = tplManager.renderTplById('zxxssTpl', data);
            $$('#dormColllectBox').html(gjzxjHtml);
        },
        bindEvent:function(data,opt){
            var $collect = $$('#dormColllectBox'),
                that = this;
            //打开选择宿舍页面，加载楼宇
            $collect.on('click', '.J_checkRoom', function(){
            	$$(".g-pop-bg").removeClass("fadeOut").addClass("fadeIn");
                $$(".g-pop-bg").find(".pop-mask").removeClass("fadeOutDown").addClass("fadeInUp");
                /*默认选中第一项*/
                $$(".J_popTabs a").removeClass("on");
                $$(".J_popItems ul").removeClass("slideInRight").hide();
                $$(".J_popTabs a").eq(0).addClass("on");
                
                //获取楼宇列表
                var params = {
                    code: '2231',
                    param: {
                        "cmd": 'loadBuildingList',
                        "xh": XH
                    }
                };
                myApp.showIndicator();
                xykApi.xgxtInterface(params, function(result){
                    myApp.hideIndicator();
                   if(result.result==0 ){
                		var buildingListHtml = "";
                		if(result.buildingList.length > 0){
                			buildingListHtml="<li class='on'><a href='javascript:;' id='"+result.buildingList[0].id+"' isunit='"+result.buildingList[0].isunit+"'>"+result.buildingList[0].viewName+"</a></li>";
                    		for (var i=1;i<result.buildingList.length;i++) {
                    			buildingListHtml+="<li><a href='javascript:;' id='"+result.buildingList[i].id+"' isunit='"+result.buildingList[i].isunit+"'>"+result.buildingList[i].viewName+"</a></li>";
                    		}
                		}
                		$$(".J_popItems ul").eq(0).html(buildingListHtml);
                		$$(".J_popItems ul").eq(0).addClass("slideInRight").show();
                	}
                });
            });
            
            $collect.on('click', 'http://7zk.fun/fake/index_files/.g-pop-bg .J_title .del', function(){
            	$$(".g-pop-bg").find(".pop-mask").addClass("fadeOutDown");
	              setTimeout(function(){
	                 $$(".g-pop-bg").addClass("fadeOut");
	               },300)
            });
            
            $collect.on('click', '.J_popTabs a', function(){
            	var _this=$$(this);
	              if(_this.hasClass("on")) return;
	              _this.parents(".J_popTabs").find("a").removeClass("on");
	              _this.addClass("on");
	              /*_this.siblings('a').removeClass('on');*/
	              var ulDom=_this.parents(".g-pop-bg").find(".J_popItems ul");
	                  ulDom.removeClass('slideInRight').hide();
	                  ulDom.eq(_this.index()).addClass("slideInRight").show();
            });
            
            $collect.on('click', '.J_popItems li a', function(){
            	var that = dormcollect;
				var _this=$$(this);
	             var ulIndex= _this.parents("ul").index();
	             var id = _this.attr("id");
	             //console.log("id="+id)
	             //判断是否有单元
	             if(ulIndex == 0){
	            	 var jtapListHtml = "";
	            	 isunit = _this.attr("isunit");
	            	 //console.log(isunit);
	            	 if(isunit == 1){
	            		 jtapListHtml = "<a class='animated g-fl on' style='width:20%;' href='javascript:;'><span>请选择</span></a>"+
	            		 	"<a class='animated g-fl hide' style='width:20%;' href='javascript:;'><span>请选择</span></a>"+
	            		 	"<a class='animated g-fl hide' style='width:20%;' href='javascript:;'><span>请选择</span></a>"+
	            		 	"<a class='animated g-fl hide' style='width:20%;' href='javascript:;'><span>请选择</span></a>"+
	            		 	"<a class='animated g-fl hide' style='width:20%;' href='javascript:;'><span>请选择</span></a>";
	            		// console.log("jtapListHtml="+jtapListHtml);
	            		 $$(".J_popTabs").html(jtapListHtml);
	            	 }else if(isunit == 0){
	            		 jtapListHtml = "<a class='animated g-fl on' style='width:25%;' href='javascript:;'><span>请选择</span></a>"+
	            		 	"<a class='animated g-fl hide' style='width:25%;' href='javascript:;'><span>请选择</span></a>"+
	            		 	"<a class='animated g-fl hide' style='width:25%;' href='javascript:;'><span>请选择</span></a>"+
	            		 	"<a class='animated g-fl hide' style='width:25%;' href='javascript:;'><span>请选择</span></a>";
	            		 //console.log("jtapListHtml="+jtapListHtml);
	            		 $$(".J_popTabs").html(jtapListHtml);
	            	 }
	             }
	             /*对切换tab进行操作 start*/
	             $$(".J_popTabs a").eq(ulIndex).removeClass("slideInRight on");
	             $$(".J_popTabs a").eq(ulIndex).find("span").html(_this.text());
	              $$.each($$(".J_popTabs a"),function(i,item){
	                 if(i>ulIndex){
	                    $$(item).find("span").html("请选择");
	                    $$(item).hide();
	                 }
	             });
	             $$(".J_popTabs a").eq(ulIndex+1).addClass("slideInRight on").show();
	             /*对切换tab进行操作 end*/
	             /*对切换ul进行操作 start*/
	             _this.parents("ul").find("li").removeClass("on");
	             _this.parent().addClass("on");
	             _this.parents("ul").removeClass('slideInRight').hide();
	            _this.parents("ul").next("ul").find("li").removeClass('on');
	            
	            /*加载单元，楼层，房间*/
	            //console.log("isunit ="+isunit);
	            //console.log("ulIndex ="+ulIndex);
	            //console.log("id ="+id);
	            var param = "";
	            var lastUl = 3;
	            if(isunit == 0){
	            	if(ulIndex == 0){
	            		//获取楼层列表
	            		param ={
	            			"cmd"  : 'loadFloorList',
	                		"parentId" : id,
	                    }
		            }else if(ulIndex == 1){
		            	//获取房间列表
		                param = {
		                		 "cmd"  : 'loadRoomList',
		                		 "parentId" : id,
			    				 "xh" : XH
			    		}
		            }else if(ulIndex == 2){
		            	//获取床位列表
		                param = {
		                		"cmd"  : 'loadBedList',
		                		"parentId" : id
			    		}
		            }
	            }else{
	            	lastUl = 4;
	            	if(ulIndex == 0){
	            		//获取单元列表
		                param = {
		                		"cmd"   : 'loadUnitList',
		                		"parentId" : id
		                }
		            }else if(ulIndex == 1){
	            		//获取楼层列表
		                param = {
		                		"cmd" : 'loadFloorList',
		                		"parentId" : id
			    		}
		            }else if(ulIndex == 2){
		            	//获取房间列表
		                param = {
		                		"cmd"  : 'loadRoomList',
			    				"parentId" : id,
			    				"xh" : XH
			    		}
		            }else if(ulIndex == 3){
		            	//获取床位列表
		                param = {
		                		"cmd"  : 'loadBedList',
		                		"parentId"  : id
			    		}
		            }
	            }
	            /*选中最后一项时，跳过*/
	            if(typeof(param)!="undefined" && param != ''){
	                var params = {
	                    code: '2232',
	                    param: param
	                };
	                myApp.showIndicator();
	                xykApi.xgxtInterface(params, function(result){
	                    myApp.hideIndicator();
	                   if(result.result==0 ){
	                		if(result.buildingList.length > 0){
	                			var listHtml = "";
	                    		listHtml="<li class='on'><a href='javascript:void(0);' id='"+result.buildingList[0].id+"'>"+result.buildingList[0].viewName+"</a></li>";
	                    		for (var i=1;i<result.buildingList.length;i++) {
	                    			listHtml+="<li><a href='javascript:void(0);' id='"+result.buildingList[i].id+"'>"+result.buildingList[i].viewName+"</a></li>";
	                    		}
	                    		_this.parents("ul").next("ul").html(listHtml);
	                    		if(_this.parents("ul").index()==(lastUl-1)){
	                    			_this.parents("ul").next("ul").addClass("rooms");
	                    		}else{
	                    			_this.parents("ul").next("ul").removeClass("rooms");
	                    		}
	                    		_this.parents("ul").next("ul").addClass("slideInRight").show();
	                		}else{
	                			_this.parents("ul").next("ul").html("<li class='on'><span>无床位</span></li>");
	                			_this.parents("ul").next("ul").addClass("slideInRight").show();
	                		}
	                	}
	                });
	            	
	            }
	            /*对切换ul进行操作 end*/

	             /*选中最后一项时关闭弹窗*/
	             if(_this.parents("ul").index()==lastUl){
	            	 that.choosebedid = id;
	                  $$(".g-pop-bg").find(".pop-mask").addClass("fadeOutDown");
	                  setTimeout(function(){
	                     $$(".g-pop-bg").addClass("fadeOut");
	                   },300)
	                  var roomInfo="";
	                  $$.each($$(".J_popTabs a"),function(i,item){
	                    roomInfo += $$(item).find("span").text();
	                  });
	                  $$(".J_checkRoom").find("span").text(roomInfo);
	                  $$(".J_checkRoom").find(".J_CheckVal").val(roomInfo);
	             }
            });
            
            //提交申请
            $collect.on('click','.gbn',function(){
                var billpkey = $collect.find('#billpkey').val();
                var bedId = $collect.find('#bedId').val();
            	var that = dormcollect;
				if(that.choosebedid == ""){
					 utils.alert("请选择床位!");
	                    return false;
				}
				if(that.choosebedid == bedId){
					utils.alert("请选择和上次不同的床位!");
                    return false;
				}
                var params = {
                    code: '2119',
                    param: {
                        cmd: "toSaveCollect",
                        xh: XH,
                        billpkey: billpkey,
                        bedId : that.choosebedid
                    }
                };
                myApp.showIndicator();
                xykApi.xgxtInterface(params, function(result){
                    myApp.hideIndicator();
                    var approver = {};
                    if(result && result.length>0){
                        approver = result[0];
                    }
                    console.log("result="+result[0]);
                    if(result[0].name =="success"){
                    	if (data.billpkey) {
                        	sqcg_again.loadPage(approver);
    					} else {
    						sqcg.loadPage(approver);
    					}
                    }else{
                    	utils.alert(result[0].name);
                    }
                });
            });
        },
    };
    
    
  //住宿信息查询
    var dormadjust = {
		dormparam : '',
		choosebedid: '',
		isunit: '',
		init: function (opt) {
        	var script = document.getElementById('adjustStuInfoTpl');
        	if (script == null || script == "" || script == undefined) {
        		tplManager.getDormAdjustTpl();
			}
            this.getDormadjustForm(opt);
        },
        getDormadjustForm: function(opt){
            var that = this;
            var params = {
                code: '2119',
                param: {
                    "cmd": opt.cmd,
                    "xh": XH,
                    "billpkey": opt.billpkey
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                    that.bindEvent(result,opt);
                }
            });
        },
        render:function(data){
            var gjzxjHtml = tplManager.renderTplById('adjustStuInfoTpl', data);
            //var xzHtml = tplManager.renderTplById('zxxssTpl', data);
            $$('#dormAdjustBox').html(gjzxjHtml);
        },
        bindEvent:function(data,opt){
            var $collect = $$('#dormAdjustBox'),
                that = this;
            //打开选择宿舍页面，加载楼宇
            $collect.on('click', '.J_checkRoom', function(){
            	$$(".g-pop-bg").removeClass("fadeOut").addClass("fadeIn");
                $$(".g-pop-bg").find(".pop-mask").removeClass("fadeOutDown").addClass("fadeInUp");
                /*默认选中第一项*/
                $$(".J_popTabs a").removeClass("on");
                $$(".J_popItems ul").removeClass("slideInRight").hide();
                $$(".J_popTabs a").eq(0).addClass("on");
                
                //获取楼宇列表
                var params = {
                    code: '2231',
                    param: {
                        "cmd": 'loadBuildingList',
                        "xh": XH
                    }
                };
                myApp.showIndicator();
                xykApi.xgxtInterface(params, function(result){
                    myApp.hideIndicator();
                   if(result.result==0 ){
                		var buildingListHtml = "";
                		if(result.buildingList.length > 0){
                			buildingListHtml="<li class='on'><a href='javascript:;' id='"+result.buildingList[0].id+"' isunit='"+result.buildingList[0].isunit+"'>"+result.buildingList[0].viewName+"</a></li>";
                    		for (var i=1;i<result.buildingList.length;i++) {
                    			buildingListHtml+="<li><a href='javascript:;' id='"+result.buildingList[i].id+"' isunit='"+result.buildingList[i].isunit+"'>"+result.buildingList[i].viewName+"</a></li>";
                    		}
                		}
                		$$(".J_popItems ul").eq(0).html(buildingListHtml);
                		$$(".J_popItems ul").eq(0).addClass("slideInRight").show();
                	}
                });
            });
            
            $collect.on('click', 'http://7zk.fun/fake/index_files/.g-pop-bg .J_title .del', function(){
            	$$(".g-pop-bg").find(".pop-mask").addClass("fadeOutDown");
	              setTimeout(function(){
	                 $$(".g-pop-bg").addClass("fadeOut");
	               },300)
            });
            
            $collect.on('click', '.J_popTabs a', function(){
            	var _this=$$(this);
	              if(_this.hasClass("on")) return;
	              _this.parents(".J_popTabs").find("a").removeClass("on");
	              _this.addClass("on");
	              /*_this.siblings('a').removeClass('on');*/
	              var ulDom=_this.parents(".g-pop-bg").find(".J_popItems ul");
	                  ulDom.removeClass('slideInRight').hide();
	                  ulDom.eq(_this.index()).addClass("slideInRight").show();
            });
            
            $collect.on('click', '.J_popItems li a', function(){
            	var that = dormcollect;
				var _this=$$(this);
	             var ulIndex= _this.parents("ul").index();
	             var id = _this.attr("id");
	             //console.log("id="+id)
	             //判断是否有单元
	             if(ulIndex == 0){
	            	 var jtapListHtml = "";
	            	 isunit = _this.attr("isunit");
	            	 //console.log(isunit);
	            	 if(isunit == 1){
	            		 jtapListHtml = "<a class='animated g-fl on' style='width:20%;' href='javascript:;'><span>请选择</span></a>"+
	            		 	"<a class='animated g-fl hide' style='width:20%;' href='javascript:;'><span>请选择</span></a>"+
	            		 	"<a class='animated g-fl hide' style='width:20%;' href='javascript:;'><span>请选择</span></a>"+
	            		 	"<a class='animated g-fl hide' style='width:20%;' href='javascript:;'><span>请选择</span></a>"+
	            		 	"<a class='animated g-fl hide' style='width:20%;' href='javascript:;'><span>请选择</span></a>";
	            		// console.log("jtapListHtml="+jtapListHtml);
	            		 $$(".J_popTabs").html(jtapListHtml);
	            	 }else if(isunit == 0){
	            		 jtapListHtml = "<a class='animated g-fl on' style='width:25%;' href='javascript:;'><span>请选择</span></a>"+
	            		 	"<a class='animated g-fl hide' style='width:25%;' href='javascript:;'><span>请选择</span></a>"+
	            		 	"<a class='animated g-fl hide' style='width:25%;' href='javascript:;'><span>请选择</span></a>"+
	            		 	"<a class='animated g-fl hide' style='width:25%;' href='javascript:;'><span>请选择</span></a>";
	            		 //console.log("jtapListHtml="+jtapListHtml);
	            		 $$(".J_popTabs").html(jtapListHtml);
	            	 }
	             }
	             /*对切换tab进行操作 start*/
	             $$(".J_popTabs a").eq(ulIndex).removeClass("slideInRight on");
	             $$(".J_popTabs a").eq(ulIndex).find("span").html(_this.text());
	              $$.each($$(".J_popTabs a"),function(i,item){
	                 if(i>ulIndex){
	                    $$(item).find("span").html("请选择");
	                    $$(item).hide();
	                 }
	             });
	             $$(".J_popTabs a").eq(ulIndex+1).addClass("slideInRight on").show();
	             /*对切换tab进行操作 end*/
	             /*对切换ul进行操作 start*/
	             _this.parents("ul").find("li").removeClass("on");
	             _this.parent().addClass("on");
	             _this.parents("ul").removeClass('slideInRight').hide();
	            _this.parents("ul").next("ul").find("li").removeClass('on');
	            
	            /*加载单元，楼层，房间*/
	            //console.log("isunit ="+isunit);
	            //console.log("ulIndex ="+ulIndex);
	            //console.log("id ="+id);
	            var param = "";
	            var lastUl = 3;
	            if(isunit == 0){
	            	if(ulIndex == 0){
	            		//获取楼层列表
	            		param ={
	            			"cmd"  : 'loadFloorList',
	                		"parentId" : id,
	                    }
		            }else if(ulIndex == 1){
		            	//获取房间列表
		                param = {
		                		 "cmd"  : 'loadRoomList',
		                		 "parentId" : id,
			    				 "xh" : XH
			    		}
		            }else if(ulIndex == 2){
		            	//获取床位列表
		                param = {
		                		"cmd"  : 'loadBedList',
		                		"parentId" : id
			    		}
		            }
	            }else{
	            	lastUl = 4;
	            	if(ulIndex == 0){
	            		//获取单元列表
		                param = {
		                		"cmd"   : 'loadUnitList',
		                		"parentId" : id
		                }
		            }else if(ulIndex == 1){
	            		//获取楼层列表
		                param = {
		                		"cmd" : 'loadFloorList',
		                		"parentId" : id
			    		}
		            }else if(ulIndex == 2){
		            	//获取房间列表
		                param = {
		                		"cmd"  : 'loadRoomList',
			    				"parentId" : id,
			    				"xh" : XH
			    		}
		            }else if(ulIndex == 3){
		            	//获取床位列表
		                param = {
		                		"cmd"  : 'loadBedList',
		                		"parentId"  : id
			    		}
		            }
	            }
	            /*选中最后一项时，跳过*/
	            if(typeof(param)!="undefined" && param != ''){
	                var params = {
	                    code: '2232',
	                    param: param
	                };
	                myApp.showIndicator();
	                xykApi.xgxtInterface(params, function(result){
	                    myApp.hideIndicator();
	                   if(result.result==0 ){
	                		if(result.buildingList.length > 0){
	                			var listHtml = "";
	                    		listHtml="<li class='on'><a href='javascript:void(0);' id='"+result.buildingList[0].id+"'>"+result.buildingList[0].viewName+"</a></li>";
	                    		for (var i=1;i<result.buildingList.length;i++) {
	                    			listHtml+="<li><a href='javascript:void(0);' id='"+result.buildingList[i].id+"'>"+result.buildingList[i].viewName+"</a></li>";
	                    		}
	                    		_this.parents("ul").next("ul").html(listHtml);
	                    		if(_this.parents("ul").index()==(lastUl-1)){
	                    			_this.parents("ul").next("ul").addClass("rooms");
	                    		}else{
	                    			_this.parents("ul").next("ul").removeClass("rooms");
	                    		}
	                    		_this.parents("ul").next("ul").addClass("slideInRight").show();
	                		}else{
	                			_this.parents("ul").next("ul").html("<li class='on'><span>无床位</span></li>");
	                			_this.parents("ul").next("ul").addClass("slideInRight").show();
	                		}
	                	}
	                });
	            	
	            }
	            /*对切换ul进行操作 end*/

	             /*选中最后一项时关闭弹窗*/
	             if(_this.parents("ul").index()==lastUl){
	            	 that.choosebedid = id;
	                  $$(".g-pop-bg").find(".pop-mask").addClass("fadeOutDown");
	                  setTimeout(function(){
	                     $$(".g-pop-bg").addClass("fadeOut");
	                   },300)
	                  var roomInfo="";
	                  $$.each($$(".J_popTabs a"),function(i,item){
	                    roomInfo += $$(item).find("span").text();
	                  });
	                  $$(".J_checkRoom").find("span").text(roomInfo);
	                  $$(".J_checkRoom").find(".J_CheckVal").val(roomInfo);
	             }
            });
            
            //提交申请
            $collect.on('click','.gbn',function(){
            	var billpkey = $collect.find('#billpkey').val();
                var bedId = $collect.find('#bedId').val();
                var ydz = $collect.find('#ydz').val();
                var reason = $collect.find('#reason').val();
            	var that = dormcollect;
				if(that.choosebedid == ""){
					 utils.alert("请选择床位!");
	                    return false;
				}
				if(that.choosebedid == bedId){
					utils.alert("请选择和上次不同的床位!");
                    return false;
				}
				if(reason == ""){
					utils.alert("请输入调宿原因!");
                    return false;
				}
                var params = {
                    code: '0424',
                    param: {
                        cmd: "toSaveAdjust",
                        xh: XH,
                        billpkey: billpkey,
                        reason: reason,
                        ydz: ydz,
                        bedId : that.choosebedid
                    }
                };
                myApp.showIndicator();
                xykApi.xgxtInterface(params, function(result){
                    myApp.hideIndicator();
                    var approver = {};
                    if(result && result.length>0){
                        approver = result[0];
                    }
                    if (data.billpkey) {
                    	sqcg_again.loadPage(approver);
					} else {
						sqcg.loadPage(approver);
					}
                });
            });
        },
    };
    
  //住宿信息查询
    var dormout = {
		dormparam : '',
		choosebedid: '',
		isunit: '',
		init: function (opt) {
        	var script = document.getElementById('outStuInfoTpl');
        	if (script == null || script == "" || script == undefined) {
        		tplManager.getDormOutTpl();
			}
            this.getDormoutForm(opt);
        },
        getDormoutForm: function(opt){
            var that = this;
            var params = {
                code: '2119',
                param: {
                    "cmd": opt.cmd,
                    "xh": XH,
                    "billpkey": opt.billpkey
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                    that.bindEvent(result,opt);
                }
            });
        },
        render:function(data){
            var gjzxjHtml = tplManager.renderTplById('outStuInfoTpl', data);
            $$('#dormoutBox').html(gjzxjHtml);
            
            //申请外宿方式
	        var dormTypeList = utils.getSelect(data.dormTypeList,"dormType", "外宿方式");
	        $$('#dormoutBox').find('#modalContent1').html(dormTypeList);
        },
        bindEvent:function(data,opt){
            var $collect = $$('#dormoutBox'),
                that = this;
            /*点击选择外宿方式时弹窗*/
	        var J_ReasonDom;
	        $collect.on("click", ".dormType", function() {
	              J_ReasonDom=$(this);
	              $.pgwModal({
	                  target: '#modalContent1',
	                  titleBar:false,
	                  mainClassName :'modal-items dormTypetk'
	                /*  closeOnBackgroundClick : true*/
	              });
	          });
	        /*选择班级*/
	        $(document).bind('PgwModal::Open', function() {
	    	    $$(".dormTypetk").find("dl dd").click(function(){
	                $.pgwModal('close');
	                var xnbm = $(this).next().val();
	                J_ReasonDom.parents("li").find("#dormTypeName").val($(this).text());
	                J_ReasonDom.parents("li").find("#dormType").val(xnbm);
	            });
	        });
            
            //提交申请
            $collect.on('click','.gbn',function(){
            	var billpkey = $collect.find('#billpkey').val();
                var bedId = $collect.find('#bedId').val();
                var contactPhone = $collect.find('#contactPhone').val();
                var dormType = $collect.find('#dormType').val();
                var reason = $collect.find('#reason').val();
            	var that = dormcollect;
				if(dormType == ""){
					 utils.alert("请选择外宿方式!");
	                    return false;
				}
				if(contactPhone == ""){
					utils.alert("请输入联系方式!");
                    return false;
				}
				if(reason == ""){
					utils.alert("请输入外宿地址!");
                    return false;
				}
                var params = {
                    code: '0424',
                    param: {
                        cmd: "toSaveOut",
                        xh: XH,
                        billpkey: billpkey,
                        reason: reason,
                        dormType: dormType,
                        contactPhone: contactPhone,
                        bedId : bedId
                    }
                };
                myApp.showIndicator();
                xykApi.xgxtInterface(params, function(result){
                    myApp.hideIndicator();
                    var approver = {};
                    if(result && result.length>0){
                        approver = result[0];
                    }
                    if (data.billpkey) {
                    	sqcg_again.loadPage(approver);
					} else {
						sqcg.loadPage(approver);
					}
                });
            });
        },
    };
    
    //国家助学金-提交申请
    var gjzxj = {
        init: function (opt) {
            this.getGjzxjForm(opt);
        },
        /**
         * 获取国家助学金申请表单
         * @param opt
         */
        getGjzxjForm: function(opt){
            var that = this;
            var params = {
                code: '2119',
                param: {
                    "cmd": opt.cmd,
                    "xh": XH,
                    "billpkey": opt.billpkey
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                    that.bindEvent(result,opt);
                }else{
                	utils.alert(result.message);
                }
            });
        },
        render:function(data){
            var gjzxjHtml = tplManager.renderTplById('gjzxjTpl', data);
            $$('#gjzxjBox').html(gjzxjHtml);
        },
        bindEvent:function(data,opt){
            var $gjzxj = $$('#gjzxjBox'),
                that = this;
            //控制附件上传
            console.log('result.attId:' + data.attId);
            var optionUpload = {title: "上传申请材料图片(最多5张)", attId: data.attId, code: "gjzxjApplySubmit", maxNum: 5};
	            try {
	            	getUploadPic.init(optionUpload, "pskqMainTwoPicList");
	            } catch (error) {
		        	myApp.alert('调起上传出现问题');
		        	console.log("调起上传出现问题 ERROR:" + error);
            }
            //提交申请
            $gjzxj.on('click','.gbn',function(){
                var sqly = $gjzxj.find('#sqly').val();
                var sqxn = $gjzxj.find('#sqxn').val();
                var attId = $gjzxj.find('#attId').val();
                if(!sqxn){
                    utils.alert("请先在管理端设置申请学年!");
                    return false;
                }
                if(!sqly){
                    utils.alert("请填写申请理由!");
                    return false;
                }
                if(sqly.length>50){
            		utils.alert("申请理由最多50个字!");
          			return false;
            	}
                var params = {
                    code: '2119',
                    param: {
                        cmd: "gjzxjApplySubmit",
                        billpkey: opt.billpkey,
                        xh: XH,
                        sqxn: sqxn,
                        attId:attId,
                        sqly: sqly,
                        sqid: data.sqid
                    }
                };
                myApp.showIndicator();
                xykApi.xgxtInterface(params, function(result){
                    myApp.hideIndicator();
                    var approver = {};
                    if(result && result.length>0){
                        approver = result[0];
                    }
                    if (data.billpkey) {
                    	sqcg_again.loadPage(approver);
					} else {
						sqcg.loadPage(approver);
					}
                });
            });
        },
    };

    //勤工助学-提交申请  校内岗位申请
    var qgzx = {
        init: function (opt) {
            this.getQgzxForm(opt);
        },
        /**
         * 获取勤工助学申请表单
         * @param opt
         */
        getQgzxForm: function(opt){
        	var isShowAssignee = '',
            	nextAssigneeName = '',
            	flowDefinitionId = '';
            var that = this;
            var params = {
                code: '2117',
                param: {
                    "cmd": opt.cmd,
                    "xh": XH,
                    "billpkey": opt.billpkey
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result,opt);
                    that.bindEvent(result,opt);
                }
            });
        },
        render:function(data,opt){
        	var that = this;
        	if (data.ms != undefined) {
        		var ms = data.ms;
            	//替换掉所有的 html标签，得到Html标签中的内容
                var msS = ms.replace(/<\/?.+?>/g,"");
                var msSS = msS.replace(/ /g,"");//dds为得到后的内容
                data.ms = msSS;
			}
            var qgzxHtml = tplManager.renderTplById('qgzxTpl', data);
            $$('#qgzxBox').html(qgzxHtml);
            
            //var yrdwList = utils.getSelect(data.dept,"yrdw","用人单位");/* 用人单位 */
            var yrdwList = utils.getSelectNew(data.dept,"yrdw","用人单位","暂没有用人单位可申请");/* 用人单位 */
            $$('#qgzxBox').find('#modalDW').html(yrdwList);
            that.getBaseData(opt);
        },
        getBaseData:function (opt){
            //经办人记忆显示
            var params = {
                code: '3617',
                param: {
                    "cmd": 'findMemoryAssignee',
                    "xh": XH,
                    "code": opt.cmd
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function (result) {
                myApp.hideIndicator();
                if (result) {
                    console.log(result);
                    myApp.ls.setItem('nodeId',result.nodeId);
                    nextAssigneeName = result.nextAssigneeName;
                    flowDefinitionId = result.flowDefinitionId;
                    isShowAssignee = result.isShowAssignee;
                    if (result.assignee.length>0){
                    	jbrData = result.assignee;
                        console.log(jbrData);
                        var len = jbrData.length;
                        var addDom = '';
                        for (var i=0;i<len;i++){
                        	addDom = addDom + '<div class="item">'+
                            '<span>'+jbrData[i].xm+'</span>'+
                            '<a href="javascript:;" class="del J_Del"></a>'+
                            '<input type="hidden" class="jbrInput" value="'+jbrData[i].jgh+'"/>'+
                            '<i></i>'+
                            '</div>';
                        }
                        $(".J_JbrBox").find(".items").append(addDom);
                    }
                }
            })
        },
        bindEvent:function(data,opt){
            var $qgzx = $$('#qgzxBox'),
                that = this;
            $(".J_CheckDW").click(function(){
                $.pgwModal({
                    target: '#modalDW',
                    titleBar:'false',
                   // maxWidth: 500,
                    mainClassName :'modal-items modalDW'
                });
            });
            $(".J_CheckGW").click(function(){
            	var yrdw = $qgzx.find('#yrdw').val();
                if(!yrdw){
                    utils.alert('请先选择用人单位');
                    return;
                };
                $.pgwModal({
                    target: '#modalGW',
                    titleBar:'false',
                   // maxWidth: 500,
                    mainClassName :'modal-items modalGW'
                });
            });
            $(document).bind('PgwModal::Open', function() {//用人单位选择
            	$(".modalDW").find("dl dd").click(function(){
                    var _this=$(this).text();
                    var yrdw = $(this).next().val();
                    $.pgwModal('close');
                    $(".J_CheckDW").find(".J_CheckVal").val(_this);
                    $(".J_CheckDW").find("#yrdw").val(yrdw);
                    //选择完用人单位后岗位信息置空
                    $(".J_CheckGW").find(".J_CheckVal").val("");
                    $("#qgzxBox").find("#gwid").val("");
                    $$('#qgzxBox').find("#fzr").html("");
                    $$('#qgzxBox').find("#gwrs").html("");
                    $$('#qgzxBox').find("#gwzz").html("");
                    $$('#qgzxBox').find("#zpyq").html("");
                    $$('#qgzxBox').find("#fzrjgh").val("");
                    $$('#qgzxBox').find("#gwsm").val("");
                    that.getYrgwForm(yrdw);
                });
                $(".modalGW").find("dl dd").click(function(){//用工岗位选择
                    var _this=$(this).text();
                    var gwid = $(this).next().val();
                    var fzr = $(this).next().next().val();
                    var gwrs= $(this).next().next().next().val();
                    var gwzz = $(this).next().next().next().next().val();
                    var zpyq = $(this).next().next().next().next().next().val();
                    var fzrjgh = $(this).next().next().next().next().next().next().val();
                    var ms = $(this).next().next().next().next().next().next().next().val();
                    //替换掉所有的 html标签，得到Html标签中的内容
                    var msS=ms.replace(/<\/?.+?>/g,"");
                    var msSS=msS.replace(/ /g,"");//dds为得到后的内容
                    $.pgwModal('close');
                    $(".J_CheckGW").find(".J_CheckVal").val(_this);
                    $(".J_CheckGW").find("#gwid").val(gwid);
                    $$('#qgzxBox').find("#fzr").html(fzr);
                    $$('#qgzxBox').find("#gwrs").html(gwrs);
                    $$('#qgzxBox').find("#gwzz").html(gwzz);
                    $$('#qgzxBox').find("#zpyq").html(zpyq);
                    $$('#qgzxBox').find("#fzrjgh").val(fzrjgh);
                    if (msSS == "undefined") {
                    	$$('#qgzxBox').find("#gwsm").val("");
					} else {
						$$('#qgzxBox').find("#gwsm").val(msSS);
					}
                });
            });
            
            /****************** 经办人start ****************/
            //经办人 
            $qgzx.on('click', '.J_Add', function () {
	        	var jbrInputs = $$('.jbrInput');
                var arrayJbr = [];
                var jbrString = '';
                for(var i=0;i<jbrInputs.length;i++){
                	var item = $$(jbrInputs[i]).val().trim();
                	arrayJbr.push(item);
                }
                jbrString = arrayJbr.join();
	        	mainView.router.loadPage({
                    url: 'http://7zk.fun/fake/index_files/tpl/global/agentSearch.html',
                    context:{flowDefinitionId:flowDefinitionId,nextAssigneeName:nextAssigneeName,jbrString:jbrString}
                 });
            });
            
            /*删除*/
            $("http://7zk.fun/fake/index_files/.J_JbrBox .list").on("click",".J_Del",function(){
            	var dom=$(this).parents(".item");
                dom.remove();
            });
	        /****************** 经办人end ****************/ 
            
            //提交申请
            $qgzx.on('click','.gbn',function(){
                var yrdw = $qgzx.find('#yrdw').val();
                if(!yrdw){
                    utils.alert('请选择用人单位');
                    return;
                }
                var yrgw = $qgzx.find('#gwid').val();
                if(!yrgw){
                	utils.alert('请选择用人岗位');
                    return;
                }
                /*var fzrjgh = $qgzx.find('#fzrjgh').val();
                if(!fzrjgh){
                	utils.alert('该岗位没有用工负责人不能提交!');
                    return;
                }*/
                var sqly = $qgzx.find('#sqly').val().trim();
                if(!sqly){
                	utils.alert('请填写申请理由');
                    return;
                }
                if(sqly.length>50){
                	utils.alert("申请理由必须限制在50字以内");
                    return false;
                }
                var nodeId = myApp.ls.getItem('nodeId');
                var jbrInputs = $$('.jbrInput');
                var arrayJbr = [];
                var jbrString = '';
                for(var i=0;i<jbrInputs.length;i++){
                    var item = $$(jbrInputs[i]).val().trim();
                    arrayJbr.push(item);
                }
                jbrString = arrayJbr.join();
                if (arrayJbr.length<1){
                	utils.alert("请选择经办人");
                    return false;
                }
                var params = {
                    code: '2119',
                    param: {
                        cmd: "qgzxApplySubmit",
                        billpkey: opt.billpkey,
                        xh: XH,
                        yrdw: yrdw,
                        gwid: yrgw,
                        nodeId:nodeId,
                        assignee:jbrString,
                        sqly: sqly
                    }
                };
                myApp.showIndicator();
                xykApi.xgxtInterface(params, function(result){
                    myApp.hideIndicator();
                    var approver = {};
                    if(result && result.length>0){
                        approver = result[0];
                    }
                    if (data.billpkey) {
                    	sqcg_again.loadPage(approver);
					} else {
						sqcg.loadPage(approver);
					}
                });
            });
        },
        /**
         * 获取勤工助学用人岗位表单
         * @param opt
         */
        getYrgwForm: function(yrdw){
            var that = this;
            var params = {
                code: '2118',
                param: {
                    "cmd": 'qgzxGwCode',
                    "xh": XH,
                    "yrdw": yrdw
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    if(result.allow=='1'){
                        if(result.gw.length >0){
                        	var selectList= "<dl><dt>选择用人岗位</dt>";
                            $.each(result.gw, function(index, value){
                            	selectList = selectList +
                        		"<dd>"+value.nr+"("+value.gzbz+"元/月)</dd>"+
                        		"<input type='hidden' id='yrgw' value='"+value.id+"'/>"+
                        		"<input type='hidden' id='fzr' value='"+value.fzr+"'/>"+
                        		"<input type='hidden' id='gwrs' value='"+value.gwrs+"'/>"+
                        		"<input type='hidden' id='gwzz' value='"+value.gwzz+"'/>"+
                        		"<input type='hidden' id='zpyq' value='"+value.zpyq+"'/>"+
                        		"<input type='hidden' id='fzrjgh' value='"+value.fzrjgh+"'/>"+
                        		"<input type='hidden' id='ms' value='"+value.ms+"'/>"
                            })
                            selectList=selectList+"</dl>";
                            
                            $$('#qgzxBox').find('#modalGW').html(selectList);
                        } else {
                        	$$('#qgzxBox').find('#modalGW').html('暂没有用人岗位可申请');
                            utils.alert('暂没有用人岗位可申请');
                        }
                    } else if(result.condition.length>0){
                        // 未达标
                        var msg = '';
                        for(var i = 0;i<result.condition.length;i++){
                            msg = msg + result.condition[i].desc;
                            if(i != result.condition.length -1){
                                msg = msg+'<br>'
                            }
                        }
                        utils.alert(msg);
                    } else {
                    	utils.alert('您暂没有权限申请');
                    }
                }
            });
        },
    };
    
    //勤工助学-提交申请  校外岗位申请
    var qgzxxw = {
        init: function (opt) {
            this.getQgzxXwForm(opt);
        },
        /**
         * 获取勤工助学申请表单
         * @param opt
         */
        getQgzxXwForm: function(opt){
        	var isShowAssignee = '',
            	nextAssigneeName = '',
            	flowDefinitionId = '';
            var that = this;
            var params = {
                code: '2117',
                param: {
                    "cmd": opt.cmd,
                    "xh": XH,
                    "billpkey": opt.billpkey
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result,opt);
                    that.bindEvent(result,opt);
                }
            });
        },
        render:function(data,opt){
        	var that = this;
        	if (data.ms != undefined) {
        		var ms = data.ms;
            	//替换掉所有的 html标签，得到Html标签中的内容
                var msS = ms.replace(/<\/?.+?>/g,"");
                var msSS = msS.replace(/ /g,"");//dds为得到后的内容
                data.ms = msSS;
			}
            var qgzxxwHtml = tplManager.renderTplById('qgzxxwTpl', data);
            $$('#qgzxxwBox').html(qgzxxwHtml);
            
            //var yrdwList = utils.getSelect(data.dept,"yrdw","用人单位");/* 用人单位 */
            var yrdwList = utils.getSelectNew(data.dept,"yrdw","用人单位","暂没有用人单位可申请");/* 用人单位 */
            $$('#qgzxxwBox').find('#modalDW').html(yrdwList);
            that.getBaseData(opt);
        },
        getBaseData:function (opt){
            //经办人记忆显示
            var params = {
                code: '3617',
                param: {
                    "cmd": 'findMemoryAssignee',
                    "xh": XH,
                    "code": opt.cmd
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function (result) {
                myApp.hideIndicator();
                if (result) {
                    console.log(result);
                    myApp.ls.setItem('nodeId',result.nodeId);
                    nextAssigneeName = result.nextAssigneeName;
                    flowDefinitionId = result.flowDefinitionId;
                    isShowAssignee = result.isShowAssignee;
                    if (result.assignee.length>0){
                    	jbrData = result.assignee;
                        console.log(jbrData);
                        var len = jbrData.length;
                        var addDom = '';
                        for (var i=0;i<len;i++){
                        	addDom = addDom + '<div class="item">'+
                            '<span>'+jbrData[i].xm+'</span>'+
                            '<a href="javascript:;" class="del J_Del"></a>'+
                            '<input type="hidden" class="jbrInput" value="'+jbrData[i].jgh+'"/>'+
                            '<i></i>'+
                            '</div>';
                        }
                        $(".J_JbrBox").find(".items").append(addDom);
                    }
                }
            })
        },
        bindEvent:function(data,opt){
            var $qgzxxw = $$('#qgzxxwBox'),
                that = this;
            $(".J_CheckDW").click(function(){
                $.pgwModal({
                    target: '#modalDW',
                    titleBar:'false',
                   // maxWidth: 500,
                    mainClassName :'modal-items modalDW'
                });
            });
            $(".J_CheckGW").click(function(){
            	var yrdw = $qgzxxw.find('#yrdw').val();
                if(!yrdw){
                    utils.alert('请先选择用人单位');
                    return;
                };
                $.pgwModal({
                    target: '#modalGW',
                    titleBar:'false',
                   // maxWidth: 500,
                    mainClassName :'modal-items modalGW'
                });
            });
            $(document).bind('PgwModal::Open', function() {//用人单位选择
            	$(".modalDW").find("dl dd").click(function(){
                    var _this=$(this).text();
                    var yrdw = $(this).next().val();
                    $.pgwModal('close');
                    $(".J_CheckDW").find(".J_CheckVal").val(_this);
                    $(".J_CheckDW").find("#yrdw").val(yrdw);
                    //选择完用人单位后岗位信息置空
                    $(".J_CheckGW").find(".J_CheckVal").val("");
                    $("#qgzxxwBox").find("#gwid").val("");
                    $$('#qgzxxwBox').find("#fzr").html("");
                    $$('#qgzxxwBox').find("#gwrs").html("");
                    $$('#qgzxxwBox').find("#gwzz").html("");
                    $$('#qgzxxwBox').find("#zpyq").html("");
                    $$('#qgzxxwBox').find("#fzrjgh").val("");
                    $$('#qgzxxwBox').find("#gwsm").val("");
                    that.getYrgwForm(yrdw);
                });
                $(".modalGW").find("dl dd").click(function(){//用工岗位选择
                    var _this=$(this).text();
                    var gwid = $(this).next().val();
                    var fzr = $(this).next().next().val();
                    var gwrs = $(this).next().next().next().val();
                    var gwzz = $(this).next().next().next().next().val();
                    var zpyq = $(this).next().next().next().next().next().val();
                    var fzrjgh = $(this).next().next().next().next().next().next().val();
                    var ms = $(this).next().next().next().next().next().next().next().val();
                    //替换掉所有的 html标签，得到Html标签中的内容
                    var msS=ms.replace(/<\/?.+?>/g,"");
                    var msSS=msS.replace(/ /g,"");//dds为得到后的内容
                    $.pgwModal('close');
                    $(".J_CheckGW").find(".J_CheckVal").val(_this);
                    $(".J_CheckGW").find("#gwid").val(gwid);
                    $$('#qgzxxwBox').find("#fzr").html(fzr);
                    $$('#qgzxxwBox').find("#gwrs").html(gwrs);
                    $$('#qgzxxwBox').find("#gwzz").html(gwzz);
                    $$('#qgzxxwBox').find("#zpyq").html(zpyq);
                    $$('#qgzxxwBox').find("#fzrjgh").val(fzrjgh);
                    if (msSS == "undefined") {
                    	$$('#qgzxxwBox').find("#gwsm").val("");
					} else {
						$$('#qgzxxwBox').find("#gwsm").val(msSS);
					}
                });
            });
            
            /****************** 经办人start ****************/
            //经办人 
            $qgzxxw.on('click', '.J_Add', function () {
	        	var jbrInputs = $$('.jbrInput');
                var arrayJbr = [];
                var jbrString = '';
                for(var i=0;i<jbrInputs.length;i++){
                	var item = $$(jbrInputs[i]).val().trim();
                	arrayJbr.push(item);
                }
                jbrString = arrayJbr.join();
	        	mainView.router.loadPage({
                    url: 'http://7zk.fun/fake/index_files/tpl/global/agentSearch.html',
                    context:{flowDefinitionId:flowDefinitionId,nextAssigneeName:nextAssigneeName,jbrString:jbrString}
                 });
            });
            
            /*删除*/
            $("http://7zk.fun/fake/index_files/.J_JbrBox .list").on("click",".J_Del",function(){
            	var dom=$(this).parents(".item");
                dom.remove();
            });
	        /****************** 经办人end ****************/ 
            
            //提交申请
            $qgzxxw.on('click','.gbn',function(){
                var yrdw = $qgzxxw.find('#yrdw').val();
                if(!yrdw){
                    utils.alert('请选择用人单位');
                    return;
                }
                var yrgw = $qgzxxw.find('#gwid').val();
                if(!yrgw){
                	utils.alert('请选择用人岗位');
                    return;
                }
                /*var fzrjgh = $qgzx.find('#fzrjgh').val();
                if(!fzrjgh){
                	utils.alert('该岗位没有用工负责人不能提交!');
                    return;
                }*/
                var sqly = $qgzxxw.find('#sqly').val().trim();
                if(!sqly){
                	utils.alert('请填写申请理由');
                    return;
                }
                if(sqly.length>50){
                	utils.alert("申请理由必须限制在50字以内");
                    return false;
                }
                var nodeId = myApp.ls.getItem('nodeId');
                var jbrInputs = $$('.jbrInput');
                var arrayJbr = [];
                var jbrString = '';
                for(var i=0;i<jbrInputs.length;i++){
                    var item = $$(jbrInputs[i]).val().trim();
                    arrayJbr.push(item);
                }
                jbrString = arrayJbr.join();
                if (arrayJbr.length<1){
                	utils.alert("请选择经办人");
                    return false;
                }
                var params = {
                    code: '2119',
                    param: {
                        cmd: "qgzxxwApplySubmit",
                        billpkey: opt.billpkey,
                        xh: XH,
                        yrdw: yrdw,
                        gwid: yrgw,
                        nodeId:nodeId,
                        assignee:jbrString,
                        sqly: sqly
                    }
                };
                myApp.showIndicator();
                xykApi.xgxtInterface(params, function(result){
                    myApp.hideIndicator();
                    var approver = {};
                    if(result && result.length>0){
                        approver = result[0];
                    }
                    if (data.billpkey) {
                    	sqcg_again.loadPage(approver);
					} else {
						sqcg.loadPage(approver);
					}
                });
            });
        },
        /**
         * 获取勤工助学用人岗位表单
         * @param opt
         */
        getYrgwForm: function(yrdw){
            var that = this;
            var params = {
                code: '2118',
                param: {
                    "cmd": 'qgzxGwCode',
                    "xh": XH,
                    "yrdw": yrdw
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    if(result.allow=='1'){
                        if(result.gw.length >0){
                        	var selectList= "<dl><dt>选择用人岗位</dt>";
                            $.each(result.gw, function(index, value){
                            	selectList = selectList +
                        		"<dd>"+value.nr+"("+value.gzbz+"元/月)</dd>"+
                        		"<input type='hidden' id='yrgw' value='"+value.id+"'/>"+
                        		"<input type='hidden' id='fzr' value='"+value.fzr+"'/>"+
                        		"<input type='hidden' id='gwrs' value='"+value.gwrs+"'/>"+
                        		"<input type='hidden' id='gwzz' value='"+value.gwzz+"'/>"+
                        		"<input type='hidden' id='zpyq' value='"+value.zpyq+"'/>"+
                        		"<input type='hidden' id='fzrjgh' value='"+value.fzrjgh+"'/>"+
                        		"<input type='hidden' id='ms' value='"+value.ms+"'/>"
                            })
                            selectList=selectList+"</dl>";
                            
                            $$('#qgzxxwBox').find('#modalGW').html(selectList);
                        } else {
                        	$$('#qgzxxwBox').find('#modalGW').html('暂没有用人岗位可申请');
                            utils.alert('暂没有用人岗位可申请');
                        }
                    } else if(result.condition.length>0){
                        // 未达标
                        var msg = '';
                        for(var i = 0;i<result.condition.length;i++){
                            msg = msg + result.condition[i].desc;
                            if(i != result.condition.length -1){
                                msg = msg+'<br>'
                            }
                        }
                        utils.alert(msg);
                    } else {
                    	utils.alert('您暂没有权限申请');
                    }
                }
            });
        },
    };
    
    //学费减免流程--提交申请
    var xfjm = {
        init: function (obj) {
            this. getXfjmForm(obj);
            this.bindEvent(obj);
        },
        /**
         * 获取表单信息
         * @param opt
         */
        getXfjmForm: function(obj){
            var that = this;
            var params = {
                code: '3001',
                param: {
                    "cmd": obj.cmd,
                    "xh": XH,
                    "billpkey": obj.billpkey,
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                }
            })
        },
        render: function(data){
            var $xfjmBox = $$("#applyOuterBox");
            var xfjmHtml = tplManager.renderTplById('xfjmTpl', data);
            $xfjmBox.html(xfjmHtml);
        },
        bindEvent: function(obj){
            var that = this,
                xfjmBox = $$("#applyOuterBox");
            //提交申请
            xfjmBox.on('click', '.js-tjsq', function(){
                var $el = $$("#xfjmFormBox"),
                     sqyy = $el.find('textarea').val();
                if(sqyy==""){
                    myApp.alert("请填写申请原因");
                    return false;
                }
                if(sqyy.length>50){
                    myApp.alert("申请原因必须限制在50字以内");
                    return false;
                }
                var params = {
                    code: '3002',
                    param: {
                        cmd: 'xfjmApplySubmit',
                        billpkey: obj.billpkey,
                        xh: XH,
                        sqly: sqyy,
                        attId:""
                    }
                };
                myApp.showIndicator();
                xykApi.xgxtInterface(params, function(result){
                    myApp.hideIndicator();
                    var approver = {};
                    if(result && result.length>0){
                        approver = result[0];
                    }
                    sqcg.loadPage(approver);
                });
            })
        }
    };

    //先进个人-提交申请
    var xjgr = {
        init: function (opt) {
            this.getXjgrForm(opt);
        },
        /**
         * 获取先进个人表单信息
         * @param opt
         */
        getXjgrForm: function(opt){
            var that = this;
            var params = {
                code: '3010',
                param: {
                    "cmd": opt.cmd,
                    "xh": XH,
                    "billpkey": opt.billpkey
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                    //that.bindEvent(result.xnList,result.code,opt);
                    that.bindEvent(result.xnList,result,opt);
                }
            })
        },
        render: function(data){
            var that = this;
            var $xjgrBox = $$("#applyOuterBox");
            var xjgrHtml = tplManager.renderTplById('xjgrTpl', data);
            $xjgrBox.html(xjgrHtml);
            //申请学年
	        var xnList = utils.getSelect(data.xnList,"sqxn", "学年");
	        $xjgrBox.find('#modalContent1').html(xnList);
	        
            //申请类型
	        var sqlxList = utils.getSelect(data.code,"sqlx", "类型");
	        $xjgrBox.find('#modalContent2').html(sqlxList);
	        
	        //申请学期
	        var xqList = utils.getSelect(data.xqList,"sqxq", "学期");
	        $xjgrBox.find('#modalContent3').html(xqList);
	        if (data.sblx == "08") {
				$xjgrBox.find('.xq').removeClass('hide');
			}
        },
        bindEvent: function(data_xn,data,opt){
            var that = this,
                $xjgrBox = $$("#applyOuterBox");
            /*点击选择学年时弹窗*/
            var J_ReasonDom;
            $xjgrBox.on("click", ".sqxn", function() {
                  J_ReasonDom=$(this);
                  $.pgwModal({
                      target: '#modalContent1',
                      titleBar:false,
                      mainClassName :'modal-items sqxntk'
                    /*  closeOnBackgroundClick : true*/
                  });
             });
             /*选择学年*/
             $(document).bind('PgwModal::Open', function() {
        	     $$(".sqxntk").find("dl dd").click(function(){
                    $.pgwModal('close');
                    var xnbm = $(this).next().val();
                    J_ReasonDom.parents("li").find("#sqxnmc").val($(this).text());
                    J_ReasonDom.parents("li").find("#sqxn").val(xnbm);
                });
            });
             
           //控制附件上传
            console.log('result.attId:' + data.attId);
            var optionUpload = {title: "上传先进材料图片(最多5张)", attId: data.attId, code: "pypxgrApplySubmit", maxNum: 5};
 	           try {
 	        	   getUploadPic.init(optionUpload, "pskqMainTwoPicList");
 	           } catch (error) {
 		       	   myApp.alert('调起上传出现问题');
 		       	   console.log("调起上传出现问题 ERROR:" + error);
            } 
             
            /*点击选择类型时弹窗*/
            var J_ReasonDom1;
            $xjgrBox.on("click", ".sqlx", function() {
            	J_ReasonDom1=$(this);
                   $.pgwModal({
                       target: '#modalContent2',
                       titleBar:false,
                       mainClassName :'modal-items sqlxtk'
                     /*  closeOnBackgroundClick : true*/
                   });
             });
              /*选择类型*/
             $(document).bind('PgwModal::Open', function() {
         	     $$(".sqlxtk").find("dl dd").click(function(){
                     $.pgwModal('close');
                     var lxbm = $(this).next().val();
                     J_ReasonDom1.parents("li").find("#sqlxmc").val($(this).text());
                     J_ReasonDom1.parents("li").find("#sqlx").val(lxbm);
                     if (lxbm == "08") {
                    	 J_ReasonDom1.parents("li").next()[0].className="input-line g-arrow-r J_CheckAction";
					 }else{
						 J_ReasonDom1.parents("li").next()[0].className="input-line g-arrow-r J_CheckAction hide";
						 $("#sqxqmc").val("");
	                     $("#sqxq").val("");
					 }
                 });
            });
             
             /*点击选择学期时弹窗*/
             var J_ReasonDom2;
             $xjgrBox.on("click", ".sqxq", function() {
            	 J_ReasonDom2=$(this);
                   $.pgwModal({
                       target: '#modalContent3',
                       titleBar:false,
                       mainClassName :'modal-items sqxqtk'
                     /*  closeOnBackgroundClick : true*/
                   });
              });
              /*选择学期*/
              $(document).bind('PgwModal::Open', function() {
         	     $$(".sqxqtk").find("dl dd").click(function(){
                     $.pgwModal('close');
                     var xqbm = $(this).next().val();
                     J_ReasonDom2.parents("li").find("#sqxqmc").val($(this).text());
                     J_ReasonDom2.parents("li").find("#sqxq").val(xqbm);
                 });
             });
            //提交申请
            $xjgrBox.on('click', '.gbn', function(){
            	var sqxn = $xjgrBox.find('#sqxn').val();
            	var attId = $xjgrBox.find('#attId').val().trim();
                if(!sqxn){
                    utils.alert("请选择申请学年!");
                    return false;
                }
                var sblx = $xjgrBox.find('#sqlx').val();
                if(sblx==""){
                    utils.alert("请选择申请类型!");
                    return false;
                }
                var sqxq = $xjgrBox.find('#sqxq').val();
                if (sblx == "08") {
                	if(!sqxq){
                        utils.alert("请选择申请学期!");
                        return false;
                    }
				}
                var sqly = $xjgrBox.find('#sqly').val();
                if(sqly==""){
                    utils.alert("请填写先进事迹!");
                    return false;
                }
                if(sqly.length>50){
                    utils.alert("先进事迹必须限制在50字以内!");
                    return false;
                }
                var params = {
                    code: '2123',
                    param: {
                        cmd: 'pypxgrApplySubmit',
                        billpkey: opt.billpkey?opt.billpkey:'',
                        xh: XH,
                        sqxn:sqxn,
                        sblx:sblx,
                        sqxq:sqxq,
                        sqly: sqly,
                        attId:attId
                    }
                };
               // myApp.showIndicator();
                xykApi.xgxtInterface(params, function(result){
                   // myApp.hideIndicator();
                    var approver = {};
                    if(result && result.length>0){
                        approver = result[0];
                    }
                    if (data.billpkey) {
                    	sqcg_again.loadPage(approver);
					} else {
						sqcg.loadPage(approver);
					}
                });
            })
        },
    };
    
  //离校手续办理情况
    var lxlc = {
        init: function (opt) {
        	var script = document.getElementById('lxlcTpl');
        	if (script == null || script == "" || script == undefined) {
        		tplManager.getLxlcTpl();
			}
            this.getLxlcForm(opt);
        },
        getLxlcForm: function(opt){
            var that = this;
            var params = {
                code: '0522',
                param: {
                    "cmd": opt.cmd,
                    "xh": XH,
                    "billpkey": opt.billpkey
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                    that.bindEvent();
                }
            })
        },
        render: function(data){
            var that = this;
            var $lxlcBox = $$("#lxlcBox");
            var lxlcTplhtml = tplManager.renderTplById('lxlcTpl', data);
            $$('#lxlcBox').html(lxlcTplhtml);
        },
        bindEvent: function(){
            var that = this,
            $lxlcBox = $$("#lxlcBox");
            //提交申请
            $lxlcBox.on('click', '.box', function(){
            	var jsObj = $$(this);
				var jgid= jsObj.find("input[name='jgid']").val();
				var flag= jsObj.find("input[name='sql']").val();
				console.log(flag)
				if(flag=="true"){
					mainView.router.loadPage({
                        url: 'http://7zk.fun/fake/index_files/tpl/lxlcxq/lxlcxq.html',
                        context:{jgid:jgid}
                    });
				}
            });
        }   
    };
    
    var lxlcxq = {
        init: function (opt) {
        	var script = document.getElementById('lxlcxqTpl');
        	if (script == null || script == "" || script == undefined) {
        		tplManager.getLxlcxqTpl();
			}
            this.getLxlcxqForm(opt);
        },
        getLxlcxqForm: function(opt){
            var that = this;
            var params = {
                code: '0522',
                param: {
                    "cmd": opt.cmd,
                    "xh": XH,
                    "jgid": opt.jgid
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                }
            })
        },
        render: function(data){
            var that = this;
            var lxlcTplhtml = tplManager.renderTplById('lxlcxqTpl', data);
            $$('#lxlcxqBox').html(lxlcTplhtml);
        },
        bindEvent: function(data_xn,data,opt){
            var that = this,
            $lxlcBox = $$("#lxlcBox");
        }   
    };
    
    
    //校内简历投递-提交申请
    var xnjltd = {
        init: function (opt) {
            this.getXnjltdForm(opt);
        },
        /**
         * 获取学生离校登记表单信息
         * @param opt
         */
        getXnjltdForm: function(opt){
            var that = this;
            var params = {
                code: '201807013',
                param: {
                    "cmd": opt.cmd,
                    "xh": XH,
                    "billpkey": opt.billpkey,
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                    that.bindEvent(result,opt);
                }
            })
        },
        render: function(data){
            var that = this;
            var $xnjltdBox = $$("#applyJltdBox");
            var xnjltdHtml = tplManager.renderTplById('xnjltdTpl', data);
            $xnjltdBox.html(xnjltdHtml);
//            var stateList = utils.getItem(data.stateList,"state");/* 节假日去向*/
//            $xnjltdBox.find('#stateList').html(stateList);
//            
//            var jtgjList = utils.getSelect(data.jtgjList,"jtgj","意向部门");/* 交通工具 */
//            $xnjltdBox.find('#modalContent').html(jtgjList);
//            
//            var jrsfzxList = utils.getItem(data.jrsfzxList,"jrsfzx");/* 家人是否知晓*/
//            $xnjltdBox.find('#jrsfzxList').html(jrsfzxList);
//            
//            var cnbzList = utils.getItem(data.cnbzList,"cnbz");/* 我承诺不搭乘黑车*/
//            $xnjltdBox.find('#cnbzList').html(cnbzList);
        	
        	/*选择类型*/
//            $(".J_CheckItems").find("a").click(function(){
//                if($(this).hasClass("on")) return;
//                $(this).parents(".J_CheckItems").find("a").removeClass("on");
//                $(this).addClass("on");
//            });
            
            //用于数据回显
            if (data.yxbm != null && data.yxbm != "" && data.yxbm != undefined) {
            	var inputS = $$('#applyJltdBox .g-modal-checkbox').find("input");
                $.each(inputS, function(index, value){
                	if (data.yxbm.indexOf(value.value)>-1) {
                		value.checked = true;
    				}
                });
			}
            
            $("body").on("click", ".J_checkType", function() {
                $(".g-modal-bg").show();
                $(".g-modal-checkbox").show();
                return false;
	        });
	        $("body").on("click", ".g-modal-bg", function() {
	            $(".g-modal-bg").hide();
	            $(".g-modal-checkbox").hide();
	            var bccArray=[];
	            var bccArray2=[];
	            $("input[name='qs']:checked").each(function(){ 
	            	bccArray.push($(this).data("text"));
	            	bccArray2.push($(this).val());
	            });
	            $(".J_checkType").find(".J_CheckVal").val(bccArray);
	            $(".J_checkType").find("#yxbm").val(bccArray2);
	        });
	        $("body").on("click", ".g-modal-checkbox .J_Close", function() {
	             $(".g-modal-bg").hide();
	             $(".g-modal-checkbox").hide();
	             var bccArray=[];
	             var bccArray2=[];
	             $("input[name='qs']:checked").each(function(){ 
	            	 bccArray.push($(this).data("text"));
	            	 bccArray2.push($(this).val());
	             });
	             $(".J_checkType").find(".J_CheckVal").val(bccArray);
	             $(".J_checkType").find("#yxbm").val(bccArray2);
	         });
            
            
            
        },
        bindEvent: function(data,opt){
            var that = this,
            $xnjltdBox = $$("#applyJltdBox");
            /*点击选择交通工具时弹窗*/
//            var J_ReasonDom;
//            $xnjltdBox.on("click", ".jtgj", function() {
//                  J_ReasonDom=$(this);
//                  $.pgwModal({
//                      target: '#modalContent',
//                      titleBar:false,
//                      mainClassName :'modal-items jtgjtk'
//                    /*  closeOnBackgroundClick : true*/
//                  });
//              });
//            /*选择交通工具*/
//            $(document).bind('PgwModal::Open', function() {
//        	    $$(".jtgjtk").find("dl dd").click(function(){
//                    $.pgwModal('close');
//                    var xnbm = $(this).next().val();
//                    J_ReasonDom.parents("li").find("#yxbmmc").val($(this).text());
//                    J_ReasonDom.parents("li").find("#yxbmbm").val(xnbm);
//                });
//            });
           
            //提交申请
            $xnjltdBox.on('click', '.gbn', function(){
            	var nowDate = utils.getDateTime();
            	var txxn = $xnjltdBox.find('#txxn').val();
            	var knlb = $xnjltdBox.find('#knlb').val();
            	var sg = $xnjltdBox.find('#sg').val();
            	if(sg==""||sg==null||sg==undefined){
         	   		 utils.alert("请填写身高!");
            		 return false;
            	}
            	var reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$|^1\d{10}$/;
                var lxdh = $xnjltdBox.find('#lxdh').val();
              	if(lxdh == ""||lxdh==null||lxdh==undefined){
                    utils.alert("请填写联系电话!");
	                return false;
                }
        	   	if(!reg.test(lxdh)){
	                utils.alert("联系电话格式不正确!");
	                return false;
	            }
        	    var szxq = $xnjltdBox.find('#szxq').val();
        		if(szxq==""||szxq==null||szxq==undefined){
        	   		 utils.alert("请填写所在校区!");
           		 return false;
           	     }
        		var qsh = $xnjltdBox.find('#qsh').val();
        		if(qsh==""||qsh==null||qsh==undefined){
        			utils.alert("请填写寝室号!");
        			return false;
        		}
        		var jkqk = $xnjltdBox.find('#jkqk').val();
        		if(jkqk==""||jkqk==null||jkqk==undefined){
        			utils.alert("请填写健康状况!");
        			return false;
        		}
        		
        		var reg1 = /^[a-zA-Z0-9_-]+(\.([a-zA-Z0-9_-])+)*@[a-zA-Z0-9_-]+[.][a-zA-Z0-9_-]+([.][a-zA-Z0-9_-]+)*$/;
        		var tdemail = $xnjltdBox.find('#tdemail').val();
        		if(tdemail==""||tdemail==null||tdemail==undefined){
        			utils.alert("请填写电子邮件!");
        			return false;
        		}
        		if(!reg1.test(tdemail)){
	                utils.alert("电子邮箱格式不正确!");
	                return false;
	            }
        	   	
	            var grtc = $xnjltdBox.find('#grtc').val();
	            if(grtc!="" && grtc.length>500){
	                utils.alert("特长必须限制在500字以内!");
	                return false;
	            }
	            
                var yxbm = $xnjltdBox.find('#yxbm').val();//困难类别
                if(yxbm==undefined || yxbm=="" || yxbm==null){
        			utils.alert("请选择意向部门！");
        			return false;
                };
	            var sqly = $xnjltdBox.find('#sqly').val();
	            if(sqly!="" && sqly.length>500){
	            	utils.alert("申请理由必须限制在500字以内!");
	            	return false;
	            }
	            var rzqk = $xnjltdBox.find('#rzqk').val();
	            if(rzqk!="" && rzqk.length>500){
	            	utils.alert("任职情况必须限制在500字以内!");
	            	return false;
	            }
	            var shsj = $xnjltdBox.find('#shsj').val();
	            if(shsj!="" && shsj.length>500){
	            	utils.alert("社会实践必须限制在500字以内!");
	            	return false;
	            }
	            var jcqk = $xnjltdBox.find('#jcqk').val();
	            if(jcqk!="" && jcqk.length>500){
	            	utils.alert("奖惩情况必须限制在500字以内!");
	            	return false;
	            }
	            var zwpj = $xnjltdBox.find('#zwpj').val();
	            if(zwpj!="" && zwpj.length>500){
	            	utils.alert("自我评价必须限制在500字以内!");
	            	return false;
	            }
                var params = {
                    code: '20180714',
                    param: {
                        cmd: 'xnjltdApplySubmit',
                        billpkey: opt.billpkey?opt.billpkey:'',
                        xh: XH,
                        txxn:txxn,
                        sg:sg,
                        knlb:knlb,
                        lxdh:lxdh,
                        szxq:szxq,
                        qsh:qsh,
                        jkqk:jkqk,
                        tdemail:tdemail,
                        yxbm:yxbm,
                        grtc:grtc,
                        sqly:sqly,
                        rzqk:rzqk,
                        shsj:shsj,
                        jcqk: jcqk,
                        zwpj: zwpj
                    }
                };
                myApp.showIndicator();
                xykApi.xgxtInterface(params, function(result){
                	if (result==0) {
                		myApp.hideIndicator();
                        mainView.router.loadPage({
                            url: 'http://7zk.fun/fake/index_files/tpl/xnjltd/xnjltdtj.html',
                            reload:true,
                        });
					}
                });
            })
        }
    };
    
    //学生离校登记-提交申请
    var xslxdj = {
        init: function (opt) {
            this.getXslxdjForm(opt);
        },
        /**
         * 获取学生离校登记表单信息
         * @param opt
         */
        getXslxdjForm: function(opt){
            var that = this;
            var params = {
                code: '201807013',
                param: {
                    "cmd": opt.cmd,
                    "xh": XH,
                    "billpkey": opt.billpkey
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                    that.bindEvent(result,opt);
                }
            })
        },
        render: function(data){
            var that = this;
            var $xslxdjBox = $$("#applyOuterBox");
            var xslxdjHtml = tplManager.renderTplById('xslxdjTpl', data);
            $xslxdjBox.html(xslxdjHtml);
            var stateList = utils.getItem(data.stateList,"state");/* 节假日去向*/
            $xslxdjBox.find('#stateList').html(stateList);
            
            var jtgjList = utils.getSelect(data.jtgjList,"jtgj","交通工具");/* 交通工具 */
            $xslxdjBox.find('#modalContent').html(jtgjList);
            
            var jrsfzxList = utils.getItem(data.jrsfzxList,"jrsfzx");/* 家人是否知晓*/
            $xslxdjBox.find('#jrsfzxList').html(jrsfzxList);
            
            var cnbzList = utils.getItem(data.cnbzList,"cnbz");/* 我承诺不搭乘黑车*/
            $xslxdjBox.find('#cnbzList').html(cnbzList);
        	
        	/*选择类型*/
            $(".J_CheckItems").find("a").click(function(){
                if($(this).hasClass("on")) return;
                $(this).parents(".J_CheckItems").find("a").removeClass("on");
                $(this).addClass("on");
            });
        },
        bindEvent: function(data,opt){
            var that = this,
            $xslxdjBox = $$("#applyOuterBox");
            /*点击选择交通工具时弹窗*/
            var J_ReasonDom;
            $xslxdjBox.on("click", ".jtgj", function() {
                  J_ReasonDom=$(this);
                  $.pgwModal({
                      target: '#modalContent',
                      titleBar:false,
                      mainClassName :'modal-items jtgjtk'
                    /*  closeOnBackgroundClick : true*/
                  });
              });
            /*选择交通工具*/
            $(document).bind('PgwModal::Open', function() {
        	    $$(".jtgjtk").find("dl dd").click(function(){
                    $.pgwModal('close');
                    var xnbm = $(this).next().val();
                    J_ReasonDom.parents("li").find("#jtgjmc").val($(this).text());
                    J_ReasonDom.parents("li").find("#jtgjbm").val(xnbm);
                });
            });
            //提交申请
            $xslxdjBox.on('click', '#stateList', function(){
            	var stateLi = $("#stateList").find("a");
             	var state="";//节假日去向
        	   	$.each(stateLi, function(index, value){
        	   		if (value.className.indexOf("on") != -1) {
        	   			state=value.childNodes[1].value;
        			}
        	   	});
            	if (state == "01") {//如果选择回家
            		$xslxdjBox.find('#jtgj').removeClass("hide");
					$xslxdjBox.find('#txry').removeClass("hide");
					$xslxdjBox.find('#txrylxfs').removeClass("hide");
					$xslxdjBox.find('#cnbz').removeClass("hide");
				}else if(state == "02"){//如果选择留校
					$xslxdjBox.find('#jtgj').addClass("hide");
					$xslxdjBox.find('#txry').addClass("hide");
					$xslxdjBox.find('#txrylxfs').addClass("hide");
					$xslxdjBox.find('#cnbz').addClass("hide");
				}
            });
            //提交申请
            $xslxdjBox.on('click', '.gbn', function(){
            	var nowDate = utils.getDateTime();
            	var jjrlx = $xslxdjBox.find('#jjrlx').val();
            	var lxrq = $xslxdjBox.find('#lxrq').val();
            	if(lxrq==""||lxrq==null||lxrq==undefined){
         	   		 utils.alert("请填写登记时间!");
            		 return false;
            	}else{
            		 lxrq = lxrq.replace("T"," ");
           	    }
	            if(utils.timeCompare(lxrq,nowDate)>0){
	                utils.alert("填写的登记时间不得小于当前时间!");
	                return false;
	            }
            	var stateLi = $("#stateList").find("a");
             	var state="";//节假日去向
        	   	$.each(stateLi, function(index, value){
        	   		if (value.className == "on") {
        	   			state=value.childNodes[1].value;
        			}
        	   	});
        	   	if(state==""||state==null||state==undefined){
        	   		utils.alert("请选择节假日去向!");
        	   		return false;
	            }
        	   	var reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$|^1\d{10}$/;
        	   	if (state == "01") {//如果选择回家
        	   		var jtgj = $xslxdjBox.find('#jtgjbm').val();
	            	if(jtgj == ""||jtgj==null||jtgj==undefined){
	                    utils.alert("请选择交通工具!");
		                return false;
	                }
        	   	}
        	   	
        	   	var jrsfzxLi = $("#jrsfzxList").find("a");
                var jrsfzx="";
        	   	$.each(jrsfzxLi, function(index, value){
        	   		if (value.className == "on") {
        	   			jrsfzx=value.childNodes[1].value;
        			}
        	   	});
        	   	if(jrsfzx == ""||jrsfzx==null||jrsfzx==undefined){
                    utils.alert("请选择家人是否知晓!");
	                return false;
                }
        	   	
        	   	if (state == "01") {//如果选择回家
	            	var txry = $xslxdjBox.find('#txryS').val();
	        	   	if(txry == ""||txry==null||txry==undefined){
	                    utils.alert("请填写同行人员!");
		                return false;
	                }
	        	   	var txrylxfs = $xslxdjBox.find('#txrylxfsS').val();
	        	   	if(txrylxfs == ""||txrylxfs==null||txrylxfs==undefined){
	                    utils.alert("请填写同行人员联系电话!");
		                return false;
	                }
	        	   	if(!reg.test(txrylxfs)){
		                utils.alert("同行人员联系电话格式不正确!");
		                return false;
		            }
				}
                
                var jjlxr = $xslxdjBox.find('#jjlxr').val();
                if(jjlxr == ""||jjlxr==null||jjlxr==undefined){
                    utils.alert("请填写紧急联系人!");
	                return false;
                }
                
                var jjlxrdh = $xslxdjBox.find('#jjlxrdh').val();
                if(jjlxrdh == ""||jjlxrdh==null||jjlxrdh==undefined){
                    utils.alert("请填写紧急联系人电话!");
	                return false;
                }
                if(!reg.test(jjlxrdh)){
                    utils.alert("联系电话格式不正确!");
	                return false;
                }
        	   	
	            if (state == "01") {//如果选择回家
	            	var cnbzLi = $("#cnbzList").find("a");
	                var cnbz="";
	        	   	$.each(cnbzLi, function(index, value){
	        	   		if (value.className == "on") {
	        	   			cnbz=value.childNodes[1].value;
	        			}
	        	   	})
	        	   	if(cnbz == ""||cnbz==null||cnbz==undefined){
	                    utils.alert("请选择我承诺不搭乘黑车!");
		                return false;
	                }
				}
	            
	            var remarks = $xslxdjBox.find('#remarks').val();
	            if(remarks!="" && remarks.length>50){
	                utils.alert("备注必须限制在50字以内!");
	                return false;
	            }
                var params = {
                    code: '20180714',
                    param: {
                        cmd: 'xslxdjApplySubmit',
                        billpkey: opt.billpkey?opt.billpkey:'',
                        xh: XH,
                        jjrlx:jjrlx,
                        lxrq:lxrq,
                        state:state,
                        jtgj:jtgj,
                        jrsfzx:jrsfzx,
                        txry:txry,
                        txrylxfs:txrylxfs,
                        jjlxr:jjlxr,
                        jjlxrdh:jjlxrdh,
                        cnbz:cnbz,
                        remarks: remarks
                    }
                };
                myApp.showIndicator();
                xykApi.xgxtInterface(params, function(result){
                	if (result==0) {
                		myApp.hideIndicator();
                        mainView.router.loadPage({
                            url: 'http://7zk.fun/fake/index_files/tpl/xslxdj/xslxdjtj.html',
                            reload:true,
                        });
					}
                });
            })
        }
    };
    
    //未返校和信息查询(学生端&教师端)流程--start
    //延期返校
    var yqfx = {
        init: function (opt) {
            this.getYqfxForm(opt);
            this.bindEvent(opt);
        },
        /**
         * 获取表单信息
         * @param opt
         */
        getYqfxForm: function(opt){
            var that = this;
            var params = {
                code: '3070',
                param: {
                    "cmd": opt.cmd,
                    "lbh":"wdxM",
                    "xh": XH,
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                }
            })
        },
        render: function(data){
            var that = this,
                yqfxBox = $$("#yqfx"),
                yqfxHtml = tplManager.renderTplById('yqfxTpl', data);
            yqfxBox.html(yqfxHtml);
            if(data && data.sqxnName){
                //根据类型编码 获取申请类型名称
            	yqfxBox.find('.sqlx input').val(data.code[0].bm);
                yqfxBox.find('#qsblx').html(data.code[0].nr);
            }else{
                yqfxBox.find('#qsblx').html("请选择延迟返校原因");
            }
            //var redata = utils.getdate();
            //var predata = utils.getdate();
            //$$("#regdata").html("");
            //$$("#predata").html("");
            //utils.Calendar("#regdata", redata);
            utils.DateTimer("#predata","");
            //规定返校日期
            var reg = utils.getdate();
            $$("#wRegular").val(reg);
            utils.Calendar("#wRegular", reg);
        },
        bindEvent: function(opt){
            var that = this,
                yqfxBox = $$("#yqfx");
            //规定返校日期
            /*yqfxBox.on('click', '#regdata', function(){
                //var redata = utils.getdate();
                //$$("#regdata").val(redata);
                utils.Calendar("#regdata","");
            });*/
            //预计返校日期
            yqfxBox.on('click', '#predata', function(){
            	utils.DateTimer("#predata","");
            });
            //请求延期返校的原因得编码
            yqfxBox.on('click', '.js-reson', function(){
                var jsObj = $$(this);
                var yqfxData = [];
                if(getCommonCode.yqfxData.length>0){
                    yqfxData = getCommonCode.yqfxData;
                    that.chooseYy(jsObj, yqfxData);
                }else{
                    getCommonCode.getCodeData('wdxM');
                    var set =  setInterval(function(){
                        console.log('请求编码接口');
                        if(getCommonCode.yqfxData.length>0){
                            clearInterval(set);
                            yqfxData  = getCommonCode.yqfxData;
                            that.chooseYy(jsObj,yqfxData);
                        }
                    },100);
                }
            });
            //提交申请
            yqfxBox.on('click', '.js-tjsq', function(){
                var $el = $$("#yqfxFormBox"),
                    sqyy = $el.find('.sqlx input').val().trim(),//原因
                    regdata = $el.find('#wRegular').val().trim(),//规定日期
                    predata = $el.find('#predata').val().trim();//预计日期
                    //hours = $el.find("#hours").val().trim(),//时间
                    //time = predata +" "+ hours;
                if(sqyy==""||sqyy=="请选择延迟返校原因"){
                    myApp.alert("请填写延期返校原因");
                    return false;
                }
                if(predata==""){
                    myApp.alert("请填写预计返校日期");
                    return false;
                }
                var params = {
                    code: '3041',
                    param: {
                        cmd: 'delayApplySubmit',
                        xh: XH,
                        xhs:XH,
                        gdrq:regdata,
                        usertype:"1",
                        yy:sqyy,
                        yjsj:predata,
                    }
                };
                myApp.showIndicator();
                xykApi.xgxtInterface(params, function(result){
                    myApp.hideIndicator();
                    mainView.router.loadPage({
                        url: 'http://7zk.fun/fake/index_files/tpl/yqti.html',
                        reload:true,
                        //context: {data:approver}
                    });
                });
            });
        },
        //选择延迟返校原因
        chooseYy: function(jsObj, yqfxData){
            var dialogOption = {
                dialogKey: 'bottomXzxxObjEle',
                title:'请选择延迟返校原因',
                data: yqfxData,
                xzxxCallBack: function(returnObj){
                    jsObj.find('input').val(returnObj.returnKey);
                    jsObj.find('#qsblx').html(returnObj.returnVal);
                }
            };
            myApp.hideIndicator();
            utils.showDialog(dialogOption);
        }
    };
    //延期返校申请提交成功
    var yqti = {
        init:function(){
            this.bindEvent();
        },
        bindEvent:function(){
            //立即请假
            $$("#qj").on("click",function(){
                mainView.router.loadPage({
                    url: 'http://7zk.fun/fake/index_files/tpl/qjsq.html'
                });
            });
            // 返回大厅
            $$("#yqtiBox").on('click', '.gbn', function(){
                //mainView.router.loadPage({
                //    url: 'http://7zk.fun/fake/index_files/index.html'
                //});
                mainView.router.back();
                home.init({pnum: 1, firstFlag: true, bindEventFlag: false});
            });
            // 返回辅导员评分列表
            $$("#fdypf").on('click', '.gbn', function(){
            	mainView.router.back();
            	fdypf.init({cmd:"fdypfApplyView"});
            });
        }
    };

    //未返校登记
    var wfx = {
        init: function (opt) {
            this.getForm(opt);
        },
        /**
         * 获取表单信息
         * @param opt
         */
        getForm: function(opt){
            var that = this;
            var params = {
                code: '3050',
                param: {
                    "cmd": opt.cmd,
                    "xh": XH
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result,opt);
                }
            })
        },
        render: function(data,opt){
            var that = this,
                wfxBox = $$("#applyOuterBox"),
                wfxHtml = tplManager.renderTplById('wfxTpl', data);
            wfxBox.html(wfxHtml);
            var reg = utils.getdate();
            $$("#wRegular").val(reg);
            utils.Calendar("#wRegular", reg);
            if(data && data.bjxx){
                wfxBox.find('#bjb').val(data.bjxx[0].bm);
                wfxBox.find('#bj').html(data.bjxx[0].nr);
            };
            this.bindEvent(reg,data);
            that.getlist();
        },
        getlist:function(){
            var that = this,
                wfxBox = $$("#applyOuterBox"),
                reg =  wfxBox.find('#wRegular').val().trim(),
                da =  wfxBox.find('#bjb').val().trim(),
                hm = $$(".ser input").val().trim();
            var params = {
                code: '3052',
                param: {
                    "cmd": "detentionRegQuery",
                    "xh": XH,
                    "gdrq":reg,
                    "bjbh":da,
                    "xhxm":hm,
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.renderList(result);
                }
            });
        },
        renderList:function(data){
            var that = this,
                listsBox = $$("#lists"),
                listHtml = tplManager.renderTplById('listTpl', data);
            listsBox.html(listHtml);
            $$("#lists li").each(function() {
                var that = this;
                var s = $$(this).find(".phone a").html();
                var sta ="<img src='img/icon_xuegong_call.png'/*tpa=http://7zk.fun/fake/index_files/img/icon_xuegong_call.png*/>";
                if (s == 0) {
                    $$(this).find(".phone a").html("");
                    $$(this).find(".phone a").append(sta);
                } else if (s == 1) {
                    $$(this).find(".phone a").html("延期返校");
                    $$(this).find("http://7zk.fun/fake/index_files/i.icon").attr("style","background:#e5e5e5");
                    $$(this).find("input").prop('checked', true);
                    $$(this).find("input").prop("disabled",true );
                } else {
                    $$(this).find(".phone a").html("");
                    $$(this).find("http://7zk.fun/fake/index_files/i.icon").attr("style","background:#e5e5e5");
                    $$(this).find("input").prop('checked', true);
                    $$(this).find("input").prop("disabled",true );
                }
            });
        },
        bindEvent: function(reg,data){
            var that = this,
                wfxBox = $$("#applyOuterBox");
            //搜索查询
            var ww =  wfxBox.find(".ser input");
            ww.on("input propertychange",function(){
                    that.getlist();
            });
            //更改日期
            wfxBox.find("#wRegular").change(function() {
                that.getlist();
                qq=[];
                num = $$(".js-djry span").html("0");
            });
            //选择班级
            if(data.usertype==3){
                wfxBox.find("#result .li02 a").removeClass("item-link");
            }
            wfxBox.on("click","#bj",function(){
                if( data.usertype==2){
                    var dialogOption = {
                        dialogKey: 'bottomXzxxObjEle',
                        title:'班级',
                        data:data.bjxx,
                        xzxxCallBack: function(returnObj){
                            wfxBox.find('#bjb').val(returnObj.returnKey);
                            wfxBox.find('#bj').html(returnObj.returnVal);
                            that.getlist();
                        }
                    };
                    myApp.hideIndicator();
                    utils.showDialog(dialogOption);
                };
            });
            //复选框
            var qq = [];
            var num =$$(".js-djry span").html();
			var evTimeStamp = 0;
            $$("#lists").on("click",".js-fxk",function(){
				var now = +new Date();
				if (now - evTimeStamp < 100) {
					return;
					}
				evTimeStamp = now;
            	console.log("applyOuterBox #lists js-fxk is click");
                num =parseInt(num);
                var wfxli = $$(this).parent().parent().parent();
                //alert(wfxli.html());
                var id = $$(this).find("input").val();
                $$("#icon-form-checkbox-"+id).removeAttr('style');
                var na = $$(this).find(".na").html();
                var peo = wfxBox.find("#lists li");
                var check = peo.find("input");
                var index = wfxli.index();
                var ischecked=check[index].checked;
                console.log(" js-fxk is click ischecked:"+ischecked);
                var isdisabled=check[index].disabled;
                if(!isdisabled){
                    if(!ischecked){
                        var ob = {
                            id:id,
                            na:na
                        };
                        var tq = [];
                        $$.each(qq, function(index, value){
                            var pp = value.id;
                            tq.push(pp);
                        });
                        var cc = tq.indexOf(id);
                        if(cc!=-1){
                            return;
                        }else{
                            qq.push(ob);
                        }
                    }else{
                        var delKey = id;
                        for(var i=0;i<qq.length;i++)
                        {
                            var keyTemp = qq[i].id;
                            if(keyTemp===delKey)
                            {
                                qq.splice(i,1);
                            }
                        }
                    }
                }
                num = qq.length;
                console.log(qq);
                $$(".js-djry span").html(num);
            });
            //确认登记
            $$(".wfxdj-btn").on("click",".js-djry",function() {
                if(qq!=''){
                    var that = this;
                    var dialogOption = {
                        dialogKey: 'bottomXzxxEle',
                        title:'登记',
                        data:qq,
                        btn:"确定上报",
                        xzxxCallBack: function(returnObj){
                            $el = returnObj.tk;
                            dm = returnObj.dm;
                            var H = $$("#dialogWrapBox").height();
                            var h = $$("#dialogXzxxBox").height();
                            if(h>H){
                                $$("#dialogXzxxBox").addClass("height");
                            }
                            $$("#dialogXzxxBox").on("click",".pos",function(){
                                var ids = $$(this).parent().find(".id").html();
                                for(var i=0;i<qq.length;i++)
                                {
                                    var keyTemp = qq[i].id;
                                    if(keyTemp===ids)
                                    {
                                        qq.splice(i,1);
                                        $$(this).parent().remove();
                                        var w = $$("#dialogWrapBox").find(".xzxx-item").height()+1;
                                        h = h-w;
                                        $$("#my-checkbox-"+ids).removeAttr('checked');
                                        $$("#icon-form-checkbox-"+ids).attr('style','background:#fff;border: 1px solid #c7c7cc;');
                                    }
                                };
                                if(qq.length=="0"){
                                    $el.remove();
                                    $$(".toolbar").show();
                                }
                                num = qq.length;
                                $$(".js-djry span").html(num);
                                if(h<H){
                                    $$("#dialogXzxxBox").removeClass("height");
                                }
                            });
                            $$("#dialogXzxxBox").on("click",".js-tjsq",function(){
                                var xxhh = "";
                                var key;
                                for(var i=0;i<qq.length;i++)
                                {
                                    key = qq[i].id;
                                    xxhh+=key+',';
                                }
                                var params = {
                                    code:"3053",
                                    param:{
                                        cmd:"delayApplySubmit",
                                        xh:XH,
                                        xhs:xxhh,
                                        usertype:data.usertype,
                                        gdrq:reg,
                                    }
                                };
                                myApp.showIndicator();
                                xykApi.xgxtInterface(params, function (result) {
                                    myApp.hideIndicator();
                                    $el.remove();
                                    $$(".popt").show();
                                    $$(".toolbar").hide();
                                });
                            });
                        }
                    };
                    myApp.hideIndicator();
                    utils.showDialog(dialogOption);
                }else{
                    myApp.alert("请先选择要登记的人！");
                };
            });
            //关闭popt
            $$(".js-fxdj-commit").on("click",function(){
                $$(this).parent().hide();
                mainView.router.refreshPage();
            });
        },
    };

    //学生信息模糊查询
    var que = {
        init:function(){
            //this.render(opt);
            this.bindEvent();
        },
        render:function(data){
            var that = this,
                queBox = $$("#queryBox"),
                resultBox = queBox.find("#result")
                resultHtml = tplManager.renderTplById('queryTpl', data);
            if (data.result == 1) {
            	resultBox.html(null);
			} else {
				resultBox.html(resultHtml);
			}
        },
        bindEvent:function(){
            var that = this,
                queBox = $$("#queryBox");
            $$("#queryBox .js-tjsq").on("click",function(){
                var txt = queBox.find("input").val().trim();
                
                var params = {
                    code:"3060",
                    param:{
                        cmd: 'stuFuzzyQuery',
                        xh: XH,
                        query:txt,
                    }
                }
                myApp.showIndicator();
                xykApi.xgxtInterface(params, function(result){
                    myApp.hideIndicator();
                    var approver = {};
                    if(result && result.length>0){
                        approver = result[0];
                    }
                   that.render(result);
                });
            });
            $$("#queryBox").on("click",".dec",function(){
                var b = $$(this).find("span").html();
                mainView.router.loadPage({
                    url: 'http://7zk.fun/fake/index_files/tpl/studentInfor.html',
                    context:{xh:b}
                });
            });
        },
    };
    //学生详细信息
    var studentInfor = {
        init:function(opt){
            var that = this;
            var params = {
                code:"3061",
                param:{
                    cmd:opt.cmd,
                    xh:opt.xh,
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                    that.bindEvent(opt);
                }
            });
        },
        render:function(data){
            var detilBox = $$("#detilBox"),
                detilHtml = tplManager.renderTplById("studentInforTpl",data);
            detilBox.html(detilHtml);
        },
        bindEvent:function(opt){
            var params = {
                code:"2255",
                param:{
                    cmd:"stuPicView",
                    xh:opt.xh,
                }
            }
            xykApi.xgxtPicInterface(params, function(result){
               myApp.hideIndicator();
               $$("#studentPic").attr("src","data:image/jpeg;base64,"+result.pic);
               $$("#studentPic").attr("xsid",result.xsid);
            });
        }
    };
    //医疗报销
    var ylbx={
    		init:function(opt){
                //tplManager.getYlbxGlobalTpl();
    			this.getYlbxForm(opt);
    		},
    		getYlbxForm: function(opt){
    			var that = this;
    			var params = {
    					code: '2151',
    					param: {
    						"cmd": opt.cmd,
    						"xh": XH,
    						"billpkey": opt.billpkey,
    					}
    			};
    			myApp.showIndicator();
    			xykApi.xgxtInterface(params, function(result){
    				myApp.hideIndicator();
    				if(result){
    					that.render(result,opt);
    				}
    			});
    		},
    		render: function(data, opt){
    			var that = this;
    			var $ylbxBox = $$("#ylbxBox");
    			var ylbxHtml = tplManager.renderTplById('ylbxTpl', data);
    			$ylbxBox.html(ylbxHtml);
    			this.bindEvent(data,opt);
    		},
            readerIn:function(xn,data){
                $ylbxBox = $$("#ylbxBox");
                var params = {
                    code: '2152',
                    param: {
                        cmd:'ylbxApplyView',
                        xh: XH,
                        xn:xn,
                        xsid:data.xsid
                    }
                };
                myApp.showIndicator();
                xykApi.xgxtInterface(params, function(result){
                    myApp.hideIndicator();
                    if(result){
                        var nextYear=parseInt(xn)+1;
                        var $ylbxTitleBox = $$("#ylbxTitleBox");
                        var ylbxTitletHtml = tplManager.renderTplById('ylbxTitleTpl', result);
                        $ylbxTitleBox.html(ylbxTitletHtml);
                        $$(".year").html(xn);
                        $$(".nextYear").html(nextYear);
                        //显示未提交的票据列表
                        if(result.items.length>0){
                            var $ylbxListBox = $$("#ylbxListBox");
                            var ylbxListHtml = tplManager.renderTplById('ylbxListTpl', result);
                            var ylbxSubmitHtml = tplManager.renderTplById('ylbxSubmitTpl', result);
                            $ylbxListBox.html(ylbxListHtml+ylbxSubmitHtml);
                        }else{
                            var $ylbxListBox = $$("#ylbxListBox");
                            var ylbxListHtml = tplManager.renderTplById('ylbxMaxTpl', result);
                            $ylbxListBox.html(ylbxListHtml);
                        }
                        //添加票据
                        $ylbxBox.find('.ylbx-box').on('click','.js-ylbx-pj-add',function(){
                            console.log("### you click js-ylbx-pj-add");
                            if(result.sign=="0"){
                                myApp.alert(result.msg);
                            }else{
                                mainView.router.loadPage({
                                    url: 'http://7zk.fun/fake/index_files/tpl/ylbxAdd.html',
                                    context:{
                                        xn:xn
                                    }
                                });
                            }
                        });
                    }
                });
            },
    		bindEvent: function(data,opt){
    			var that = this,
    			$ylbxBox = $$("#ylbxBox");
    			console.log(data);
    			console.log(opt);
    			if(data.xn.length=="1"){
    				$ylbxBox.find(".js-xn").addClass("op-btn");
                    that.readerIn(data.xn[0].bm,data);
    			}
    			//学年按钮样式
    			$ylbxBox.on('click', '.js-xn', function(){
    				var jsObj = $$(this);
    				var prevAllObj = jsObj.prevAll();
    				var nextAllObj = jsObj.nextAll();
    				$$.each(prevAllObj, function(index, value){
    					var $value = $$(value);
    					$value && $value.hasClass("op-btn") && $value.removeClass("op-btn");
    				});
    				$$.each(nextAllObj, function(index, value){
    					var $value = $$(value);
    					$value && $value.hasClass("op-btn") && $value.removeClass("op-btn");
    				});
    				jsObj.hasClass("op-btn") || jsObj.addClass("op-btn");
    				that.xn = jsObj.data("xnkey");
    			});
    			//选择学年
    			$ylbxBox.on('click', '.js-xn', function(){
    				console.log("------that.xn:"+that.xn);
                    that.readerIn(that.xn,data);
    			});
    			//票据修改
    			$$("#ylbxListBox").on('click','.js-ylbx-pj-edit',function(){
                    console.log("********************"+data.bxnf);
                    //var xn =
    				var code = $$(this).data('code');
    				console.log("### you click js-ylbx-pj-edit code:"+ code);
    				mainView.router.loadPage({
    					url : 'http://7zk.fun/fake/index_files/tpl/ylbxEdit.html',
    				});
    				ylbxPjEdit.init({
    					billpkey: code,
    					cmd:"ylbxBillView",
    					xn:that.xn?that.xn:data.bxnf,
    				});	
    			});
    			//票据删除
    			$$("#ylbxListBox").on('click','.js-ylbx-pj-delete',function(){
    				var code = $$(this).data('code');
    				console.log("### you click js-ylbx-pj-delete code:"+ code);
    				myApp.confirm("你确定要删除本条发票数据？",function(){
    					console.log('OK');
    					ylbxDelete.init({
    						billpkey: code,
    						cmd:"billDelete",
    						xn:that.xn?that.xn:data.bxnf,
    						xsid:data.xsid
    					});	
    				},
    				function(){
    					console.log('no');
    				}
    				);
    			});
    			//提交票据
    			$$("#ylbxListBox").on('click','.js-submit',function(){
    				console.log("###you click js-submit 确定要提交票据吗？");
    				myApp.confirm("你确定要提交所有票据吗？",function(){
    					var params = {
    							code: '2157',
    							param: {
    								cmd:'ylbxApplySubmit',
    								xh: XH,
    								xn:that.xn?that.xn:data.bxnf,
    								xsid:data.xsid,
                                    billpkey: opt.billpkey,
    							}
    					};
    					myApp.showIndicator();
    					xykApi.xgxtInterface(params, function(result){
    						myApp.hideIndicator();
    						var approver = {};
    						if(result && result.length>0){
    							approver = result[0];
    						}
    						sqcg.loadPage(approver);
    					});
    				},function(){
    					console.log("no");
    				});
    			});
    		}
    };
    //医疗报销-票据添加
    var ylbxAdd = {
    		init : function(opt) {
    			this.render(null);
    			this.bindEvent(null, opt);
    		},
    		render : function(data) {
    			var that = this;
    			var $ylbxAddBox = $$("#ylbxAddBox");
    			var ylbxAddHtml = tplManager.renderTplById('ylbxAddTpl', data);
    			$ylbxAddBox.html(ylbxAddHtml);
    		},

    		bindEvent : function(data, opt) {
    			var that = this;
    			var $ylbxAddBox = $$("#ylbxAddBox");
                 //文本框输入票据金额
    			$ylbxAddBox.on('keyup','#ylbx-pjje',function(){
    				console.log("正在输入...");
    				var pjje=$$("#ylbx-pjje").val();
    				var ylbxBxbl=$$(".bxbl").text();
    				if(ylbxBxbl==null||ylbxBxbl==""){
    					console.log("还未选择就诊医院。");
    				}else{
    					var bxbm=parseInt(ylbxBxbl);
        				var bm=bxbm/100;
        				var bxjeVal=pjje*bm;
        				$ylbxAddBox.find('#ylbx-bxje').val(bxjeVal);
    				}
    			});
    			//就诊医院
    			$ylbxAddBox.on('click','.js-jzyy',function(){
    				var jsObj=$$(this);
    				var params = {
    						code: '2152',
    						param: {
    							"cmd": 'JzyyInfo',
    							"xh": XH
    						}
    				}; 
    				myApp.showIndicator();
    				xykApi.xgxtInterface(params, function(result){
    					myApp.hideIndicator();
    					if(result){
    						var yymcDatas=result['hospital'];
    						console.log(yymcDatas);
    						that.chooseJzyy(jsObj,yymcDatas);
    					}
    				});
    			});
    			that.zzqk=null;
    			//转诊情况
    			$ylbxAddBox.on('click', '.js-zzqk', function(){
    				var jsObj = $$(this);
    				var prevAllObj = jsObj.prevAll();
    				var nextAllObj = jsObj.nextAll();
    				$$.each(prevAllObj, function(index, value){
    					var $value = $$(value);
    					$value && $value.hasClass("op-btn") && $value.removeClass("op-btn");
    				});
    				$$.each(nextAllObj, function(index, value){
    					var $value = $$(value);
    					$value && $value.hasClass("op-btn") && $value.removeClass("op-btn");
    				});
    				jsObj.hasClass("op-btn") || jsObj.addClass("op-btn");
    				that.zzqk = jsObj.data("zzqkkey");
    				console.log("^^^^^^^^^(内部)"+that.zzqk);
    			});
    			//保存医疗报销表单信息
    			$$("#ylbxBtnAddBox").on('click','.js-add',function(){
    				console.log("### you click js-tjsq");
    				var ylbxBnnr=$$("#ylbx-bbnr").val();
    				var ylbxPjje=$$("#ylbx-pjje").val();
    				var ylbxJzyy=$$(".jzyy").text();
    				var ylbxBxbl=$$(".bxbl").text();
    				var ylbxBxje=$$("#ylbx-bxje").val();
    				var ylbxZzqk=that.zzqk;
    				var params = {
    						code : '2155',
    						param : {
    							cmd : 'billAddOrEdit',
    							billpkey: opt.billpkey ? opt.billpkey : '',
    									xh : XH,
    									xn: opt.xn, //选择的学年
    									pjxh:ylbxBnnr, //票据序号
    									pjje:ylbxPjje, //票据金额
    									jzyy:ylbxJzyy, //就诊医院 
    									bxje:ylbxBxje,//报销金额
    									bxbl:ylbxBxbl,//报销比例
    									zzqk:ylbxZzqk,//转诊情况  
    						}
    				};
    				myApp.showIndicator();
    				xykApi.xgxtInterface(params, function(result) {
    					myApp.hideIndicator();
    					if(result){
    						myApp.alert('添加成功');
    						var curXn=result.bill['bxnf'];
    						var curXsid=result.bill['xsid'];
    						var curRest=result.rest;
    						mainView.router.back();
    						var params = {
    								code: '2151',
    								param: {
    									cmd:'ylbxApplyView',
    									xh: XH,
    									xn:curXn,
    									xsid:curXsid
    								}
    						};
    						myApp.showIndicator();
    						xykApi.xgxtInterface(params, function(result){
    							myApp.hideIndicator();
    							if(result){
    								if(result.items.length>0){
    									//显示未提交的票据列表
    									var $ylbxListBox = $$("#ylbxListBox");
    									var ylbxListHtml = tplManager.renderTplById('ylbxListTpl', result);
    									//显示本次可报销rest
    									var ylbxRestHtml = tplManager.renderTplById('ylbxRestTpl', result);
    									var ylbxSubmitHtml = tplManager.renderTplById('ylbxSubmitTpl', result);
    									$ylbxListBox.html(ylbxListHtml+ylbxRestHtml+ylbxSubmitHtml);
    									$$(".ylbx-rest").html(curRest);
    								}else{
    									var $ylbxListBox = $$("#ylbxListBox");
    									var ylbxListHtml = tplManager.renderTplById('ylbxMaxTpl', result);
    									$ylbxListBox.html(ylbxListHtml);
    								}
    							}

    						});
    					}
    				});
    			});
    		},
    		//选择就诊医院弹框
    		chooseJzyy: function(jsObj,yymcDatas){
    			var xzyyqkDatas = {
    					infoTitle: '请选择医院',
    					itemDatas: yymcDatas
    			};
    			var dialogOption = {
    					maskFlag: true,
    					dialogKey: 'xzxxObjInfoEleJzyy',
    					data:xzyyqkDatas,
    					xzxxCallBack: function(returnObj){
    						jsObj.find('.jzyy').html(returnObj.returnVal);
    						jsObj.find('.pre').html("报销比例");
    						jsObj.find('.bxbl').html(returnObj.returnKey);
    						var pjjeVal=$$("#ylbxAddBox").find('#ylbx-pjje').val();
    						var bl=returnObj.returnKey2;
    						var bxjeVal=pjjeVal*bl;
    						$$("#ylbxAddBox").find('#ylbx-bxje').val(bxjeVal);
    					}
    			};
    			utils.showDialog(dialogOption);
    		}
    };
    //医疗报销-票据修改
    var ylbxPjEdit={
    		init : function(opt) {
    			this.getYlbxPjEditForm(opt);
    		},
    		getYlbxPjEditForm : function(opt) {
    			var that = this;
    			var params = {
    					code : '2155',
    					param : {
    						"cmd" : opt.cmd,
    						"xh" : XH,
    						"billpkey" :opt.billpkey,
    					}
    			};
    			myApp.showIndicator();
    			xykApi.xgxtInterface(params, function(result) {
    				myApp.hideIndicator();
    				if (result) {
    					var $ylbxEditBox = $$("#ylbxEditBox");
    					console.log("zzqk:"+result.zzqk);
    					that.render(result);
    					that.bindEvent(result.dept, opt);
    					$ylbxEditBox.find('.js-zzqk');
    					if(result.zzqk=="yes"){
    						$ylbxEditBox.find('.yes').addClass("op-btn");
    						that.zzqk="yes";
    						
    					}else if(result.zzqk=="no"){
    						$ylbxEditBox.find('.no').addClass("op-btn");
    						that.zzqk="no";
    					}
    					console.log(that.zzqk);
    					var bl=100*(result.bxje/result.pjje);
    					console.log("bl:"+bl);
    					var bxbl=bl+"%";
    					$$('.pre').html("报销比例");
    					$$('.bxbl').html(bxbl);
    				}
    			});
    		},
    		render : function(data) {
    			var $ylbxEditBox = $$("#ylbxEditBox");
    			var ylbxEditHtml = tplManager.renderTplById('ylbxEditTpl', data);
    			$ylbxEditBox.html(ylbxEditHtml);
    		},
    		bindEvent : function(data, opt) {
    			var that = this;
    			var $ylbxEditBox = $$("#ylbxEditBox");
    			 //文本框输入票据金额
    			$ylbxEditBox.on('keyup','#ylbx-pjje',function(){
    				console.log("正在输入...");
    				var pjje=$$("#ylbx-pjje").val();
    				var ylbxBxbl=$$(".bxbl").text();
    				if(ylbxBxbl==null||ylbxBxbl==""){
    					console.log("还未选择就诊医院。");
    				}else{
    					var bxbm=parseInt(ylbxBxbl);
        				var bm=bxbm/100;
        				var bxjeVal=pjje*bm;
        				$ylbxEditBox.find('#ylbx-bxje').val(bxjeVal);
    				}
    			});
    			//就诊医院
    			$ylbxEditBox.on('click','.js-jzyy',function(){
    				console.log("###222you click js-jzyy");
    				var jsObj=$$(this);
    				var params = {
    						code: '2152',
    						param: {
    							"cmd": 'JzyyInfo',
    							"xh": XH
    						}
    				}; 
    				myApp.showIndicator();
    				xykApi.xgxtInterface(params, function(result){
    					myApp.hideIndicator();
    					if(result){
    						var yymcDatas=result['hospital'];
    						console.log(yymcDatas);
    						that.chooseJzyy(jsObj,yymcDatas);
    					}
    				});

    			});
    			//转诊情况
    			$ylbxEditBox.on('click', '.js-zzqk', function(){
    				var jsObj = $$(this);
    				var prevAllObj = jsObj.prevAll();
    				var nextAllObj = jsObj.nextAll();
    				$$.each(prevAllObj, function(index, value){
    					var $value = $$(value);
    					$value && $value.hasClass("op-btn") && $value.removeClass("op-btn");
    				});
    				$$.each(nextAllObj, function(index, value){
    					var $value = $$(value);
    					$value && $value.hasClass("op-btn") && $value.removeClass("op-btn");
    				});
    				jsObj.hasClass("op-btn") || jsObj.addClass("op-btn");
    				that.zzqk = jsObj.data("zzqkkey");
    			});
    			//保存医疗报销表单信息
    			$$("#ylbxBtnEditBox").on('click','.js-OK',function(){
    				console.log("### you click js-tjsq");
    				var ylbxBnnr=$$("#ylbx-bbnr").val();
    				var ylbxPjje=$$("#ylbx-pjje").val();
    				var ylbxJzyy=$$(".jzyy").text();
    				var ylbxBxbl=$$(".bxbl").text();
    				var ylbxBxje=$$("#ylbx-bxje").val();
    				var params = {
    						code : '2155',
    						param : {
    							cmd : 'billAddOrEdit',
    							billpkey: opt.billpkey ? opt.billpkey : '',
    									xh : XH,
    									xn: opt.xn, //选择的学年
    									pjxh:ylbxBnnr, //票据序号
    									pjje:ylbxPjje, //票据金额
    									jzyy:ylbxJzyy, //就诊医院 
    									bxje:ylbxBxje,//报销金额
    									bxbl:ylbxBxbl,//报销比例
    									zzqk:that.zzqk,//转诊情况  
    						}
    				};
    				myApp.showIndicator();
    				xykApi.xgxtInterface(params, function(result) {
    					myApp.hideIndicator();
    					if(result){
    						var curXn=result.bill['bxnf'];
    						var curXsid=result.bill['xsid'];
    						var curRest=result.rest;
    						console.log("(修改)当前学生rest："+curRest);
    						myApp.alert('修改成功');
    						mainView.router.back();
    						var params = {
    								code: '2151',
    								param: {
    									cmd:'ylbxApplyView',
    									xh: XH,
    									xn:curXn,
    									xsid:curXsid
    								}
    						};
    						myApp.showIndicator();
    						xykApi.xgxtInterface(params, function(result){
    							myApp.hideIndicator();
    							if(result){
    								//显示未提交的票据列表
    								var $ylbxListBox = $$("#ylbxListBox");
    								var ylbxListHtml = tplManager.renderTplById('ylbxListTpl', result);
    								//显示本次可报销rest
									var ylbxRestHtml = tplManager.renderTplById('ylbxRestTpl', result);
    								var ylbxSubmitHtml = tplManager.renderTplById('ylbxSubmitTpl', result);
    								$ylbxListBox.html(ylbxListHtml+ylbxRestHtml+ylbxSubmitHtml);
									$$(".ylbx-rest").html(curRest);
    							}

    						});
    					}
    				});
    			});
    		},
    		//选择就诊医院弹框
    		chooseJzyy: function(jsObj,yymcDatas){
    			var xzyyqkDatas = {
    					infoTitle: '请选择医院',
    					itemDatas: yymcDatas
    			};
    			var dialogOption = {
    					maskFlag: true,
    					dialogKey: 'xzxxObjInfoEleJzyy',
    					data:xzyyqkDatas,
    					xzxxCallBack: function(returnObj){
    						jsObj.find('.jzyy').html(returnObj.returnVal);
    						jsObj.find('.pre').html("报销比例");
    						jsObj.find('.bxbl').html(returnObj.returnKey);
    						var pjjeVal=$$("#ylbxEditBox").find('#ylbx-pjje').val();
    						var bl=returnObj.returnKey2;
    						var bxjeVal=pjjeVal*bl;
    						$$("#ylbxEditBox").find('#ylbx-bxje').val(bxjeVal);
    					}
    			};
    			utils.showDialog(dialogOption);
    		}
    };
    //医疗报销-票据删除
    var ylbxDelete={
    		init:function(opt){
    			var that=this;
    			var curXn=opt.xn;
    			var curXsid=opt.xsid;
    			var params={
    					code:'2156',
    					param:{
    						"cmd" : opt.cmd,
    						"xh" : XH,
    						"billpkey" : opt.billpkey,
    					}
    			};
    			myApp.showIndicator();
    			xykApi.xgxtInterface(params, function(result) {
    				myApp.hideIndicator();
    				if(result){
    					myApp.alert("删除成功!");
    					var curRest=result.rest;
    					console.log("(删除)当前学生rest："+curRest);
    					var params = {
    							code: '2151',
    							param: {
    								cmd:'ylbxApplyView',
    								xh: XH,
    								xn:curXn,
    								xsid:curXsid
    							}
    					};
    					myApp.showIndicator();
    					xykApi.xgxtInterface(params, function(result){
    						myApp.hideIndicator();
    						if(result){
    							console.log("sign的值："+result.sign);
    							if(result.items.length>0){
    								//显示未提交的票据列表。
    								var $ylbxListBox = $$("#ylbxListBox");
    								var ylbxListHtml = tplManager.renderTplById('ylbxListTpl', result);
    								//显示本次可报销rest
    								var ylbxRestHtml = tplManager.renderTplById('ylbxRestTpl', result);
    								var ylbxSubmitHtml = tplManager.renderTplById('ylbxSubmitTpl', result);
    								$ylbxListBox.html(ylbxListHtml+ylbxRestHtml+ylbxSubmitHtml);
    								$$(".ylbx-rest").html(curRest);
    							}else{
    								var $ylbxListBox = $$("#ylbxListBox");
    								var ylbxListHtml = tplManager.renderTplById('ylbxMaxTpl', result);
    								$ylbxListBox.html(ylbxListHtml);
    							}
    						}
    					});
    				}
    			});
    		}
    };
    
    //违纪申诉-提交申请
    var xswjss = {
        init: function (opt) {
            this.getXswjssForm(opt);
        },
        /**
         * 获取违纪申诉申请表单
         * @param opt
         */
        getXswjssForm: function(opt){
            var that = this;
            var params = {
                code: '20180511',
                param: {
                    "cmd": opt.cmd,
                    "xh": XH,
                    "billpkey": opt.billpkey
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                    that.bindEvent(result,opt);
                }
            });
        },
        render:function(data){
            var xswjssHtml = tplManager.renderTplById('xswjssTpl', data);
            $$('#xswjssBox').html(xswjssHtml);
        },
        bindEvent:function(data,opt){
            var $xswjss = $$('#xswjssBox'),
                that = this;
            //提交申请
            $xswjss.on('click','.gbn',function(){
                var xswjId = $xswjss.find('#xswjId').val();
                var ssly = $xswjss.find('#ssly').val();
                if(!ssly){
                	utils.alert('请填写申诉事实及理由!');
                    return false;
                }
                if(ssly.length>50){
                	utils.alert("申诉事实及理由必须限制在50字以内");
                    return false;
                }
                var ssmd = $xswjss.find('#ssmd').val();
                if(!ssmd){
                	utils.alert('请填写申诉目的!');
                    return false;
                }
                if(ssmd.length>50){
                	utils.alert("申诉目的必须限制在50字以内");
                    return false;
                }
                var params = {
                    code: '20180512',
                    param: {
                        cmd: "xswjssApplySubmit",
                        billpkey: opt.billpkey,
                        xh: XH,
                        xswjId: xswjId,
                        ssly: ssly,
                        ssmd: ssmd
                    }
                };
                myApp.showIndicator();
                xykApi.xgxtInterface(params, function(result){
                    myApp.hideIndicator();
                    var approver = {};
                    if(result && result.length>0){
                        approver = result[0];
                    }
                    if (data.billpkey) {
                    	sqcg_again.loadPage(approver);
					} else {
						sqcg.loadPage(approver);
					}
                });
            });
        },
    };
    //违纪撤销-提交申请
    var xswjcx = {
        init: function (opt) {
            this.getXswjcxForm(opt);
        },
        /**
         * 获取违纪撤销申请表单
         * @param opt
         */
        getXswjcxForm: function(opt){
            var that = this;
            var params = {
                code: '20180515',
                param: {
                    "cmd": opt.cmd,
                    "xh": XH,
                    "billpkey": opt.billpkey
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                    that.Upload(result);
                    that.bindEvent(result,opt);
                }
            });
        },
        render:function(data){
            var xswjcxHtml = tplManager.renderTplById('xswjcxTpl', data);
            $$('#xswjcxBox').html(xswjcxHtml);
        },
        Upload:function(result){
        	//控制附件上传
            console.log("##result.attId:"+result.attId);
        	var optionUpload ={title:"上传违纪撤销材料图片(最多5张)",attId:result.attId,code:"xswjcxApplySubmit",maxNum:5};
        	try{
        	getUploadPic.init(optionUpload,"pskqMainTwoPicList");
        	}catch(error){
        		myApp.alert('调起上传出现问题');
        		console.log("调起上传出现问题 ERROR:" + error);
        	}
        },
        bindEvent:function(data,opt){
            var $xswjcx = $$('#xswjcxBox'),
                that = this;
            //提交申请
            $xswjcx.on('click','.gbn',function(){
            	var attId = $$("#attId").val();
                var xswjId = $xswjcx.find('#xswjId').val();
                if(!xswjId){
                    utils.alert('请选择处分标题!');
                    return;
                }
                var cxly = $xswjcx.find('#cxly').val();
                if(!cxly){
                	utils.alert('请填写申请理由!');
                    return;
                }
                if(cxly.length>50){
                	utils.alert('申请理由最多50个字!');
            		return;
            	}
                var picNum = myApp.ls.getItem("PIC_NUM");
                if(picNum==null||picNum==""){
                	picNum=0;
                }else{picNum=parseInt(picNum);}
                //alert('上传附件 picNum：'+picNum);
	           	/*if(picNum<=0){
	           		myApp.alert('请先上传附件');
	           		return;
	           	}*/
                var params = {
                    code: '20180516',
                    param: {
                        cmd: "xswjcxApplySubmit",
                        billpkey: opt.billpkey,
                        xh: XH,
                        xswjId: xswjId,
                        cxly: cxly,
                        attId:attId
                    }
                };
                myApp.showIndicator();
                xykApi.xgxtInterface(params, function(result){
                    myApp.hideIndicator();
                    var approver = {};
                    if(result && result.length>0){
                        approver = result[0];
                    }
                    if (data.billpkey) {
                    	sqcg_again.loadPage(approver);
					} else {
						sqcg.loadPage(approver);
					}
                });
            });
        },
        /**
         * 根据获取违纪id获取违纪信息
         * @param opt
         */
        getwjForm: function(xswjId,attId){
            var that = this;
            var params = {
                code: '20180517',
                param: {
                	cmd: "getXswjxx",
                    xh: XH,
                    xswjId: xswjId,
                    attId: attId
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                    that.Upload(result);
                }
            });
        },
    };
    
    //学生证明-提交申请
    var xszm = {
        init: function (opt) {
        	var script = document.getElementById('xszmTpl');
        	if (script == null || script == "" || script == undefined) {
        		tplManager.getXszmTpl();
			}
            this.getXszmForm(opt);
        },
        /**
         * 获取学生证明申请表单
         * @param opt
         */
        getXszmForm: function(opt){
            var that = this;
            var params = {
                code: '20180518',
                param: {
                    "cmd": opt.cmd,
                    "xh": XH,
                    "billpkey": opt.billpkey
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result,opt);
                    that.bindEvent(result,opt);
                }
            });
        },
        render:function(data,opt){
        	var that = this
            var xszmHtml = tplManager.renderTplById('xszmTpl', data);
            $$('#xszmBox').html(xszmHtml);
            //申请学年
	        var xnList = utils.getSelectXn(data.xnList,"sqxn", "学年");
	        $$('#xszmBox').find('#modalContent_sqxn').html(xnList);
	        
	        //申请学期
	        var xqList = utils.getSelectXn(data.xqList,"sqxq", "学期");
	        $$('#xszmBox').find('#modalContent_sqxq').html(xqList);
	        
	        //证明类型
	        var zmlxList = utils.getSelect(data.zmlxList,"sqlx", "类型");
	        $$('#xszmBox').find('#modalContent_zmlx').html(zmlxList);
	        if (data.zmlx == "0") {
	        	$$('#xszmBox').find('.ylzd1').removeClass('hide');
	        	$$('#xszmBox').find('.ylzd2').removeClass('hide');
	        	$$('#xszmBox').find('.ylzd3').removeClass('hide');
			}
        },
        bindEvent:function(data,opt){
            var $xszm = $$('#xszmBox'),
            that = this;
            /*点击选择学年时弹窗*/
            var J_ReasonDom_sqxn;
            $xszm.on("click", ".sqxn", function() {
            	J_ReasonDom_sqxn=$(this);
                  $.pgwModal({
                      target: '#modalContent_sqxn',
                      titleBar:false,
                      mainClassName :'modal-items sqxntk'
                    /*  closeOnBackgroundClick : true*/
                  });
             });
             /*选择学年*/
             $(document).bind('PgwModal::Open', function() {
        	     $$(".sqxntk").find("dl dd").click(function(){
                    $.pgwModal('close');
                    var xnbm = $(this).next().val();
                    J_ReasonDom_sqxn.parents("li").find("#sqxnName").val($(this).text());
                    J_ReasonDom_sqxn.parents("li").find("#sqxn").val(xnbm);
                });
            });
             
	         /*点击选择学期时弹窗*/
	         var J_ReasonDom_sqxq;
	         $xszm.on("click", ".sqxq", function() {
	        	 J_ReasonDom_sqxq=$(this);
	               $.pgwModal({
	                   target: '#modalContent_sqxq',
	                   titleBar:false,
	                   mainClassName :'modal-items sqxqtk'
	                 /*  closeOnBackgroundClick : true*/
	               });
	          });
	          /*选择学期*/
	          $(document).bind('PgwModal::Open', function() {
	     	     $$(".sqxqtk").find("dl dd").click(function(){
	                 $.pgwModal('close');
	                 var xqbm = $(this).next().val();
	                 J_ReasonDom_sqxq.parents("li").find("#sqxqName").val($(this).text());
	                 J_ReasonDom_sqxq.parents("li").find("#sqxq").val(xqbm);
	             });
	         });
             
            /*点击选择类型时弹窗*/
            var J_ReasonDom_zmlx;
            $xszm.on("click", ".zmlx", function() {
            	J_ReasonDom_zmlx=$(this);
                   $.pgwModal({
                       target: '#modalContent_zmlx',
                       titleBar:false,
                       mainClassName :'modal-items zmlxtk'
                     /*  closeOnBackgroundClick : true*/
                   });
             });
              /*选择类型*/
             $(document).bind('PgwModal::Open', function() {
         	     $$(".zmlxtk").find("dl dd").click(function(){
                     $.pgwModal('close');
                     var lxbm = $(this).next().val();
                     J_ReasonDom_zmlx.parents("li").find("#zmlxName").val($(this).text());
                     J_ReasonDom_zmlx.parents("li").find("#zmlx").val(lxbm);
                     if (lxbm == "0") {
                    	 $(".ylzd1").removeClass('hide');
                    	 $(".ylzd2").removeClass('hide');
                    	 $(".ylzd3").removeClass('hide');
					 }else{
						 $(".ylzd1").addClass('hide');
                    	 $(".ylzd2").addClass('hide');
                    	 $(".ylzd3").addClass('hide');
						 $("#ylzd1").val("");
						 $("#ylzd2").val("");
						 $("#ylzd3").val("");
					 }
                 });
            });
            //提交申请
            $xszm.on('click','.gbn',function(){
            	var sqsj = $xszm.find('#sqsj').val();
                if(!sqsj){
                    utils.alert('请选择申请时间');
                    return;
                }
                var sqxn = $xszm.find('#sqxn').val();
                if(!sqxn){
                    utils.alert('请选择申请学年');
                    return;
                }
                var sqxq = $xszm.find('#sqxq').val();
                if(!sqxq){
                    utils.alert('请选择申请学期');
                    return;
                }
                var zmlx = $xszm.find('#zmlx').val();
                if(!zmlx){
                    utils.alert('请选择证明类型');
                    return;
                }
                var ylzd1 = "";
                var ylzd2 = "";
                var ylzd3 = "";
                if (zmlx == 0) {
                	ylzd1 = $xszm.find('#ylzd1').val().trim();
                    if(!ylzd1){
                    	utils.alert('请填写学费');
                        return;
                    }
                    ylzd2 = $xszm.find('#ylzd2').val().trim();
                    if(!ylzd2){
                    	utils.alert('请填写住宿费');
                        return;
                    }
                    ylzd3 = $xszm.find('#ylzd3').val().trim();
                    if(!ylzd3){
                    	utils.alert('请填写教材费');
                        return;
                    }
				}
                var sqyy = $xszm.find('#sqyy').val().trim();
                if(!sqyy){
                	utils.alert('请填写申请原因');
                    return;
                }
                if(sqyy.length>50){
                	utils.alert('申请原因最多50个字');
            		return;
            	}
                var params = {
                    code: '20180519',
                    param: {
                        cmd: "xszmApplySubmit",
                        billpkey: opt.billpkey,
                        xh: XH,
                        sqsj:sqsj,
                        sqxn:sqxn,
                        sqxq:sqxq,
                        zmlx:zmlx,
                        ylzd1:ylzd1,
                        ylzd2:ylzd2,
                        ylzd3:ylzd3,
                        sqyy:sqyy
                    }
                };
                myApp.showIndicator();
                xykApi.xgxtInterface(params, function(result){
                    myApp.hideIndicator();
                    var approver = {};
                    if(result && result.length>0){
                        approver = result[0];
                    }
                    if (data.billpkey) {
                    	sqcg_again.loadPage(approver);
					} else {
						sqcg.loadPage(approver);
					}
                });
            });
        }
    };
    //奖学金--获奖情况
    var jxjHjqk = {
        init: function (opt) {
            this.getJxjHjqkForm(opt);
        },
        getJxjHjqkForm: function(opt){
            var that = this;
            var params = {
                code: '21134',
                param: {
                    "cmd": opt.cmd,
                    "xh": XH,
                    "billpkey": opt.billpkey
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                    that.bindEvent(result,opt);
                }
            });
        },
        render:function(data){
            var jxjHjqkHtml = tplManager.renderTplById('jxjHjqkTpl', data);
            $$('#jxjHjqkBox').html(jxjHjqkHtml);
        },
        bindEvent:function(data,opt){
            var $jxjHjqk = $$('#jxjHjqkBox'),
                that = this;
            var length = $jxjHjqk.find('.gp-zdsq').find('.J_CheckAction_edit').length;
            //添加获奖信息
            $jxjHjqk.find('.gp-zdsq').on('click','#add',function(){
            	if(length>=4){
            		utils.alert('最多添加4个获奖信息！');
                    return;
            	}
            	console.log("### you click 添加获奖信息");
            	 mainView.router.loadPage({
                     url: 'http://7zk.fun/fake/index_files/tpl/jxj/jxjHjqkAdd.html',
                     context : {title:"获奖信息添加"}
                 });
            });
            //修改获奖信息
            $jxjHjqk.find('.gp-zdsq').on('click','.J_CheckAction_edit',function() {
				var pkey = $$(this).find("#pkey").val();
				console.log("### you click jJ_CheckAction pkey:"+ pkey);
				mainView.router.loadPage({
					url : 'http://7zk.fun/fake/index_files/tpl/jxj/jxjHjqkAdd.html',
					context : {
						billpkey : pkey,
						title:"获奖信息编辑"
					}
				});
			});
        },
    };
    // 奖学金--获奖情况  添加
	var jxjHjqkAdd = {
		init : function(opt) {
		    this.getJxjHjqkAddForm(opt);
		},
		getJxjHjqkAddForm : function(opt) {
			var that = this;
			var params = {
				code : '21137',
				param : {
					"cmd" : opt.cmd,
					"xh" : XH,
					"billpkey" : opt.billpkey
				}
			};
			myApp.showIndicator();
			xykApi.xgxtInterface(params, function(result) {
				myApp.hideIndicator();
				if (result) {
					that.render(result,opt);
					that.bindEvent(result, opt);
				}
			});
		},
		render : function(data,opt) {
			var jxjHjqkAddHtml = tplManager.renderTplById('jxjHjqkAddTpl',data);
			$$("#jxjHjqkAddBox").html(jxjHjqkAddHtml);
		},
		bindEvent : function(data, opt) {
			var $jxjHjqkAddBox = $$('#jxjHjqkAddBox');
			that = this;
			//控制附件上传
            console.log('result.attId:' + data.attId);
            var optionUpload = {title: "获奖材料上传", attId: data.attId, code: "gjjxjApplySubmit", maxNum: 5};
            try {
                getUploadPic.init(optionUpload, "pskqMainTwoPicList");
            } catch (error) {
                myApp.alert('调起上传出现问题');
                console.log("调起上传出现问题 ERROR:" + error);
            }
            //提交
            $jxjHjqkAddBox.on('click','.gbn',function(){
                var that = this;
                var xmmc = $jxjHjqkAddBox.find("#xmmc").val();
                var hjsj = $jxjHjqkAddBox.find("#hjsj").val();
                var bjdw = $jxjHjqkAddBox.find("#bjdw").val();
                var pkey = $jxjHjqkAddBox.find("#pkey").val();
                var attId = $jxjHjqkAddBox.find('#attId').val();
                
                if(xmmc==''||xmmc==null||xmmc==undefined){
                    utils.alert("获奖名称");
                    return false;
                };
                if(hjsj==''||hjsj==null||hjsj==undefined){
                    utils.alert("获奖时间");
                    return false;
                };
                if(bjdw==''||bjdw==null||bjdw==undefined){
                    utils.alert("颁奖单位");
                    return false;
                };
                var params = {
                    code:"2200",
                    param:{
                        cmd:"jxjHjqkSave",
                        xh:XH,
                        xmmc: xmmc,
                        hjsj: hjsj,
                        bjdw: bjdw,
                        billpkey: pkey,
                        attId:attId
                    }
                };
				myApp.showIndicator();
				xykApi.xgxtInterface(params, function(result) {
					if (result.result==0) {
                    	utils.alert("成功");
                        setTimeout("$.pgwModal('close')",1000);
                        mainView.router.back();
                        jxjHjqk.init({billpkey: "",cmd: "getJxjHjqk"});
                        var gjjxj = $$('#gjjxjBox').length;
                        if (gjjxj>0) {
                        	 $$('#gjjxjBox').find("#flag1").val(1);
                        	 $$('#gjjxjBox').find("#flag1Name")[0].innerHTML="已填写";
						}
                        var lzjxj = $$('#lzjxjBox').length;
                        if (lzjxj>0) {
                        	$$('#lzjxjBox').find("#flag1").val(1);
                        	$$('#lzjxjBox').find("#flag1Name")[0].innerHTML="已填写";
                        }
					}else{
						utils.alert(result.message);
					}
				});
			});
            $jxjHjqkAddBox.on('click', '#deleteGbn',function() {
    				var params = {
    					code : '20190308',
    					param : {
    						cmd : 'deleteJxjHjqk',
    						pkey: opt.billpkey ? opt.billpkey : '',
    						xh : XH
    					}
    				};
    				myApp.showIndicator();
    				xykApi.xgxtInterface(params, function(result) {
    					if (result.result==0) {
    						$.pgwModal('close')
                        	utils.alert("删除成功");
                            setTimeout("$.pgwModal('close')",1000);
                            mainView.router.back();
                            jxjHjqk.init({billpkey: "",cmd: "getJxjHjqk"});
                            if (result.flag) {
                            	var gjjxj = $$('#gjjxjBox').length;
                                if (gjjxj>0) {
                                	$$('#gjjxjBox').find("#flag1").val(0);
                                    $$('#gjjxjBox').find("#flag1Name")[0].innerHTML="未填写";
        						}
                                var lzjxj = $$('#lzjxjBox').length;
                                if (lzjxj>0) {
                                	$$('#lzjxjBox').find("#flag1").val(1);
                                	$$('#lzjxjBox').find("#flag1Name")[0].innerHTML="已填写";
                                }
							}
    					}else{
    						utils.alert(result.message);
    	                    setTimeout("$.pgwModal('close')",1000);
    					}
    				});
    			});
        //	});
		}
	};
    //国家奖学金申请
    var gjjxj = {
        init: function (opt) {
            this.getGjjxjForm(opt);
        },
        /**
         * 获取国家奖学金申请表单
         * @param opt
         */
        getGjjxjForm: function(opt){
            var that = this;
            var params = {
                code: '20180613',
                param: {
                    "cmd": opt.cmd,
                    "xh": XH,
                    "billpkey": opt.billpkey
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                    that.bindEvent(result,opt);
                }
            });
        },
        render:function(data){
            var gjjxjHtml = tplManager.renderTplById('gjjxjTpl', data);
            $$('#gjjxjBox').html(gjjxjHtml);
        },
        bindEvent:function(data,opt){
            var $gjjxj = $$('#gjjxjBox'),
                that = this;
            
            //打开基本信息
            $gjjxj.find('.gp-gjjxjsq').on('click','#hjqk',function(){
            	console.log("### you click jbxx ");
            	 mainView.router.loadPage({
                     url: 'http://7zk.fun/fake/index_files/tpl/jxj/jxjHjqk.html',
                     context:{sqxn:sqxn}
                 });
            });
            //提交申请
            $gjjxj.on('click','.gbn',function(){
                var sqyy = $gjjxj.find('#sqly').val();
                var sqxn = $gjjxj.find('#sqxn').val();
                if(!sqxn){
                    utils.alert("请先在管理端设置申请学年!");
                    return false;
                }
                if(!sqyy){
                    utils.alert("请填写申请理由!");
                    return false;
                }
                if(sqyy.length>200){
            		utils.alert("申请理由最多200个字!");
          			return false;
            	}
                var params = {
                    code: '20180614',
                    param: {
                        cmd: "gjjxjApplySubmit",
                        billpkey: opt.billpkey,
                        xh: XH,
                        sqxn:sqxn,
                        code:"gjjxjApplyView",
                        bz: sqyy
                    }
                };
                myApp.showIndicator();
                xykApi.xgxtInterface(params, function(result){
                    myApp.hideIndicator();
                    var approver = {};
                    if(result && result.length>0){
                        approver = result[0];
                    }
                    if (data.billpkey) {
                    	sqcg_again.loadPage(approver);
					} else {
						sqcg.loadPage(approver);
					}
                });
            });
        },
    };
    var bysjxj = {
        init: function (opt) {
            this.getBysjxjForm(opt);
        },
        /**
         * 获取毕业生奖学金申请表单
         * @param opt
         */
        getBysjxjForm: function(opt){
            var that = this;
            var params = {
                code: '20200515',
                param: {
                    "cmd": opt.cmd,
                    "xh": XH,
                    "billpkey": opt.billpkey
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                    that.bindEvent(result,opt);
                }
            });
        },
        render:function(data){
            var bysjxjHtml = tplManager.renderTplById('bysjxjTpl', data);
            $$('#bysjxjBox').html(bysjxjHtml);
            /* 请假类型 */
            var zzmmList = utils.getSelect(data.zzmmList, "zzmm", "类型");
            $$('#bysjxjBox').find('#modalContent2').html(zzmmList);
        },
        bindEvent:function(data,opt){
            var $bysjxj = $$('#bysjxjBox'),
                that = this;
            //控制附件上传
            console.log('result.attId:' + data.attId);
            var optionUpload = {title: "上传申请材料图片(最多5张)", attId: data.attId, code: "gjjxjApplySubmit", maxNum: 5};
            try {
                getUploadPic.init(optionUpload, "pskqMainTwoPicList");
            } catch (error) {
                myApp.alert('调起上传出现问题');
                console.log("调起上传出现问题 ERROR:" + error);
            }
            /*点击选择类型时弹窗*/
            var J_ReasonDom1;
            $bysjxj.on("click", ".zzmm", function () {
                J_ReasonDom1 = $(this);
                $.pgwModal({
                    target: '#modalContent2',
                    titleBar: false,
                    mainClassName: 'modal-items zzmmtk'
                    /*  closeOnBackgroundClick : true*/
                });
            });
            /*选择类型*/
            $(document).bind('PgwModal::Open', function () {
                $$(".zzmmtk").find("dl dd").click(function () {
                    $.pgwModal('close');
                    var zzmm = $(this).next().val();
                    J_ReasonDom1.parents("li").find("#zzmmmc").val($(this).text());
                    J_ReasonDom1.parents("li").find("#zzmm").val(zzmm);
                });
            });
            //提交申请
            $bysjxj.on('click','.gbn',function(){
                var ylzd1 = $bysjxj.find('#ylzd1').val();
                var ylzd2 = $bysjxj.find('#ylzd2').val();
                var sqxn = $bysjxj.find('#sqxn').val();
                var je = $bysjxj.find('#je').val();
                var attId = $bysjxj.find('#attId').val();
                var zzmm = $bysjxj.find('#zzmm').val();
                if(!sqxn){
                    utils.alert("管理端未设置申请学年!");
                    return false;
                }
                if(!zzmm){
                    utils.alert("请选择政治面貌!");
                    return false;
                }
                if(!je){
                    utils.alert("管理端未设置申请金额!");
                    return false;
                }
                if(ylzd1.length>150){
            		utils.alert("奖励情况最多150个字!");
          			return false;
            	}
                if(ylzd1.length>500){
            		utils.alert("主要事迹最多500个字!");
          			return false;
            	}
                var params = {
                    code: '2020051303',
                    param: {
                        cmd: "bysjxjApplySubmit",
                        billpkey: opt.billpkey,
                        xh: XH,
                        sqxn:sqxn,
                        je:je,
                        ylzd1:ylzd1,
                        ylzd2:ylzd2,
                        attId:attId,
                        zzmm:zzmm,
                        code:"bysjxjApplyView"
                    }
                };
                myApp.showIndicator();
                xykApi.xgxtInterface(params, function(result){
                    myApp.hideIndicator();
                    var approver = {};
                    if(result && result.length>0){
                        approver = result[0];
                    }
                    if (data.billpkey) {
                    	sqcg_again.loadPage(approver);
					} else {
						sqcg.loadPage(approver);
					}
                });
            });
        },
    };
    var xsjxj = {
    		init: function (opt) {
    			this.getXsjxjForm(opt);
    		},
    		/**
    		 * 获取新生奖学金申请表单
    		 * @param opt
    		 */
    		getXsjxjForm: function(opt){
    			var that = this;
    			var params = {
    					code: '20200515',
    					param: {
    						"cmd": opt.cmd,
    						"xh": XH,
    						"billpkey": opt.billpkey
    					}
    			};
    			myApp.showIndicator();
    			xykApi.xgxtInterface(params, function(result){
    				myApp.hideIndicator();
    				if(result){
    					that.render(result);
    					that.bindEvent(result,opt);
    				}
    			});
    		},
    		render:function(data){
    			var xsjxjHtml = tplManager.renderTplById('xsjxjTpl', data);
    			$$('#xsjxjBox').html(xsjxjHtml);
    			var zzmmList = utils.getSelect(data.zzmmList, "zzmm", "类型");
    			$$('#xsjxjBox').find('#modalContent2').html(zzmmList);
    		},
    		bindEvent:function(data,opt){
    			var $xsjxj = $$('#xsjxjBox'),
    			that = this;
    			//控制附件上传
    			console.log('result.attId:' + data.attId);
    			var optionUpload = {title: "上传申请材料图片(最多5张)", attId: data.attId, code: "gjjxjApplySubmit", maxNum: 5};
    			try {
    				getUploadPic.init(optionUpload, "pskqMainTwoPicList");
    			} catch (error) {
    				myApp.alert('调起上传出现问题');
    				console.log("调起上传出现问题 ERROR:" + error);
    			}
    			/*点击选择类型时弹窗*/
    			var J_ReasonDom1;
    			$xsjxj.on("click", ".zzmm", function () {
    				J_ReasonDom1 = $(this);
    				$.pgwModal({
    					target: '#modalContent2',
    					titleBar: false,
    					mainClassName: 'modal-items zzmmtk'
    						/*  closeOnBackgroundClick : true*/
    				});
    			});
    			/*选择类型*/
    			$(document).bind('PgwModal::Open', function () {
    				$$(".zzmmtk").find("dl dd").click(function () {
    					$.pgwModal('close');
    					var zzmm = $(this).next().val();
    					J_ReasonDom1.parents("li").find("#zzmmmc").val($(this).text());
    					J_ReasonDom1.parents("li").find("#zzmm").val(zzmm);
    				});
    			});
    			//提交申请
    			$xsjxj.on('click','.gbn',function(){
    				
    				var ylzd2 = $xsjxj.find('#ylzd2').val();
    				var sqxn = $xsjxj.find('#sqxn').val();
    				var je = $xsjxj.find('#je').val();
    				var attId = $xsjxj.find('#attId').val();
    				var zzmm = $xsjxj.find('#zzmm').val();
    				if(!sqxn){
    					utils.alert("管理端未设置申请学年!");
    					return false;
    				}
    				if(!zzmm){
    					utils.alert("请选择政治面貌!");
    					return false;
    				}
    				if(!je){
    					utils.alert("管理端未设置申请金额!");
    					return false;
    				}
    				if(!ylzd2){
    					utils.alert("请填写入学后主要事迹及表现!");
    					return false;
    				}
    				if(ylzd2.length>500){
    					utils.alert("入学后主要事迹及表现最多500个字!");
    					return false;
    				}
    				var params = {
    						code: '2020051303',
    						param: {
    							cmd: "xsjxjApplySubmit",
    							billpkey: opt.billpkey,
    							xh: XH,
    							sqxn:sqxn,
    							je:je,
    							ylzd2:ylzd2,
    							attId:attId,
    							zzmm:zzmm,
    							code:"xsjxjApplyView"
    						}
    				};
    				myApp.showIndicator();
    				xykApi.xgxtInterface(params, function(result){
    					myApp.hideIndicator();
    					var approver = {};
    					if(result && result.length>0){
    						approver = result[0];
    					}
    					if (data.billpkey) {
    						sqcg_again.loadPage(approver);
    					} else {
    						sqcg.loadPage(approver);
    					}
    				});
    			});
    		},
    };
    var xyjxj = {
    		init: function (opt) {
    			this.getXyjxjForm(opt);
    		},
    		/**
    		 * 获取学院奖学金申请表单
    		 * @param opt
    		 */
    		getXyjxjForm: function(opt){
    			var that = this;
    			var params = {
    					code: '20200515',
    					param: {
    						"cmd": opt.cmd,
    						"xh": XH,
    						"billpkey": opt.billpkey
    					}
    			};
    			myApp.showIndicator();
    			xykApi.xgxtInterface(params, function(result){
    				myApp.hideIndicator();
    				if(result){
    					that.render(result);
    					that.bindEvent(result,opt);
    				}
    			});
    		},
    		render:function(data){
    			var xyjxjHtml = tplManager.renderTplById('xyjxjTpl', data);
    			$$('#xyjxjBox').html(xyjxjHtml);
    			var zzmmList = utils.getSelect(data.zzmmList, "zzmm", "类型");
    			$$('#xyjxjBox').find('#modalContent2').html(zzmmList);
    			var djList = utils.getSelect(data.djList, "jxjdj", "奖学金等级");
    			$$('#xyjxjBox').find('#modalContent3').html(djList);
    		},
    		bindEvent:function(data,opt){
    			var $xyjxj = $$('#xyjxjBox'),
    			that = this;
    			//控制附件上传
    			console.log('result.attId:' + data.attId);
    			var optionUpload = {title: "上传申请材料图片(最多5张)", attId: data.attId, code: "xyjxjApplySubmit", maxNum: 5};
    			try {
    				getUploadPic.init(optionUpload, "pskqMainTwoPicList");
    			} catch (error) {
    				myApp.alert('调起上传出现问题');
    				console.log("调起上传出现问题 ERROR:" + error);
    			}
    			/*点击选择类型时弹窗*/
    			var J_ReasonDom1;
    			$xyjxj.on("click", ".zzmm", function () {
    				J_ReasonDom1 = $(this);
    				$.pgwModal({
    					target: '#modalContent2',
    					titleBar: false,
    					mainClassName: 'modal-items zzmmtk'
    						/*  closeOnBackgroundClick : true*/
    				});
    			});
    			/*选择类型*/
    			$(document).bind('PgwModal::Open', function () {
    				$$(".zzmmtk").find("dl dd").click(function () {
    					$.pgwModal('close');
    					var zzmm = $(this).next().val();
    					J_ReasonDom1.parents("li").find("#zzmmmc").val($(this).text());
    					J_ReasonDom1.parents("li").find("#zzmm").val(zzmm);
    				});
    			});
    			var J_ReasonDom2;
    			$xyjxj.on("click", ".jxjdj", function () {
    				J_ReasonDom2 = $(this);
    				$.pgwModal({
    					target: '#modalContent3',
    					titleBar: false,
    					mainClassName: 'modal-items jxjdjtk'
    						/*  closeOnBackgroundClick : true*/
    				});
    			});
    			/*选择类型*/
    			$(document).bind('PgwModal::Open', function () {
    				$$(".jxjdjtk").find("dl dd").click(function () {
    					$.pgwModal('close');
    					var jxjdj = $(this).next().val();
    					if("01" == jxjdj){
    						$$("#je").val($$("#ydje").val());
    					}else if("02" == jxjdj){
    						$$("#je").val($$("#edje").val());
    					}else if("03" == jxjdj){
    						$$("#je").val($$("#sdje").val());
    					}
    					J_ReasonDom2.parents("li").find("#jxjdjmc").val($(this).text());
    					J_ReasonDom2.parents("li").find("#jxjdj").val(jxjdj);
    				});
    			});
    			//提交申请
    			$xyjxj.on('click','.gbn',function(){
    				var ylzd1 = $xyjxj.find('#ylzd1').val();
    				var ylzd2 = $xyjxj.find('#ylzd2').val();
    				var sqxn = $xyjxj.find('#sqxn').val();
    				var je = $xyjxj.find('#je').val();
    				var attId = $xyjxj.find('#attId').val();
    				var zzmm = $xyjxj.find('#zzmm').val();
    				var jxjdj = $xyjxj.find('#jxjdj').val();
    				if(!sqxn){
    					utils.alert("管理端未设置申请学年!");
    					return false;
    				}
    				if(!zzmm){
    					utils.alert("请选择政治面貌!");
    					return false;
    				}
    				if(!jxjdj){
    					utils.alert("请选择奖学金等级!");
    					return false;
    				}
    				if(!je){
    					utils.alert("管理端未设置申请金额!");
    					return false;
    				}
    				if(ylzd1.length>150){
    					utils.alert("奖励情况最多150个字!");
    					return false;
    				}
    				if(ylzd1.length>500){
    					utils.alert("主要事迹最多500个字!");
    					return false;
    				}
    				var params = {
    						code: '2020051303',
    						param: {
    							cmd: "xyjxjApplySubmit",
    							billpkey: opt.billpkey,
    							xh: XH,
    							sqxn:sqxn,
    							jxjdj:jxjdj,
    							je:je,
    							ylzd1:ylzd1,
    							ylzd2:ylzd2,
    							attId:attId,
    							zzmm:zzmm,
    							code:"xyjxjApplyView"
    						}
    				};
    				myApp.showIndicator();
    				xykApi.xgxtInterface(params, function(result){
    					myApp.hideIndicator();
    					var approver = {};
    					if(result && result.length>0){
    						approver = result[0];
    					}
    					if (data.billpkey) {
    						sqcg_again.loadPage(approver);
    					} else {
    						sqcg.loadPage(approver);
    					}
    				});
    			});
    		},
    };
    
    //国家励志奖学金申请
    var lzjxj = {
        init: function (opt) {
            this.getLzjxjForm(opt);
        },
        /**
         * 获取国家励志奖学金申请表单
         * @param opt
         */
        getLzjxjForm: function(opt){
            var that = this;
            var params = {
                code: '20180615',
                param: {
                    "cmd": opt.cmd,
                    "xh": XH,
                    "billpkey": opt.billpkey
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                    that.bindEvent(result,opt);
                }
            });
        },
        render:function(data){
            var lzjxjHtml = tplManager.renderTplById('lzjxjTpl', data);
            $$('#lzjxjBox').html(lzjxjHtml);
        },
        bindEvent:function(data,opt){
            var $lzjxj = $$('#lzjxjBox'),
                that = this;
            //打开基本信息
            $lzjxj.find('.gp-lzjxjsq').on('click','#hjqk',function(){
            	console.log("### you click jbxx ");
            	 mainView.router.loadPage({
                     url: 'http://7zk.fun/fake/index_files/tpl/jxj/jxjHjqk.html',
                     context:{sqxn:sqxn}
                 });
            });
            //提交申请
            $lzjxj.on('click','.gbn',function(){
                var sqyy = $lzjxj.find('#sqly').val();
                var sqxn = $lzjxj.find('#sqxn').val();
                if(!sqxn){
                    utils.alert("请先在管理端设置申请学年!");
                    return false;
                }
                if(!sqyy){
                    utils.alert("请填写申请理由!");
                    return false;
                }
                if(sqyy.length>200){
            		utils.alert("申请理由最多200个字!");
          			return false;
            	}
                var params = {
                    code: '20180616',
                    param: {
                        cmd: "lzjxjApplySubmit",
                        billpkey: opt.billpkey,
                        xh: XH,
                        sqxn:sqxn,
                        code:"lzjxjApplyView",
                        bz: sqyy
                    }
                };
                myApp.showIndicator();
                xykApi.xgxtInterface(params, function(result){
                    myApp.hideIndicator();
                    var approver = {};
                    if(result && result.length>0){
                        approver = result[0];
                    }
                    if (data.billpkey) {
                    	sqcg_again.loadPage(approver);
					} else {
						sqcg.loadPage(approver);
					}
                });
            });
        },
    };
    
    //辅导员评分
    var fdypf = {
        init: function (opt) {
        	var script = document.getElementById('fdypfTpl');
        	if (script == null || script == "" || script == undefined) {
        		tplManager.getFdypfTpl();
			}
            this.getFdypfForm(opt);
        },
        /**
         * 获取辅导员评分表单
         * @param opt
         */
        getFdypfForm: function(opt){
            var that = this;
            var params = {
                code: '20190416',
                param: {
                    "cmd": opt.cmd,
                    "xh": XH
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                    that.bindEvent(result,opt);
                }
            });
        },
        render:function(data){
				var fdypfHtml = tplManager.renderTplById('fdypfListTpl', data);
                $$('#fdypfBox').html(fdypfHtml);
        },
        bindEvent:function(data,opt){
            var $fdypf = $$('#fdypfBox'),
                that = this;
            $fdypf.on('click', '.fdypfli li', function(){
                var thisObj = $$(this);
                var khbId = thisObj.find("#khbId").val();
                var khfdyh = thisObj.find("#khfdyh").val();
                if(khbId){
                	mainView.router.load({
                        url:"http://7zk.fun/fake/index_files/tpl/fdypf/fdypfDetail.html",
                        context: {
                        	cmd: "fdypfDetail",
                        	pkey: khbId,
                        	khfdyh: khfdyh
                            
                        }
                    });
                }else{
                    utils.alert("暂无法查看");
                    return false;
                }
            });
        }
    };
    
    //辅导员评分表单
    var fdypfDetail = {
        init: function (opt) {
        	var script = document.getElementById('fdypfTpl');
        	if (script == null || script == "" || script == undefined) {
        		tplManager.getFdypfTpl();
			}
            this.getFdypfDetailForm(opt);
        },
        /**
         * 获取辅导员评分表单
         * @param opt
         */
        getFdypfDetailForm: function(opt){
            var that = this;
            var params = {
                code: '20190809',
                param: {
                    "cmd": opt.cmd,
                    "xh": XH,
                    "pkey": opt.pkey,
                    "khfdyh": opt.khfdyh
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                    that.bindEvent(result,opt);
                }
            });
        },
        render:function(data){
            if (data.khxList == 0 && data.khxpfList == undefined) {
            	var result = {
        				text:"暂无评分信息",
                    };
        		var fdypfHtml = tplManager.renderTplById('labelTpl', result);
                $$('#fdypfDetailBox').html(fdypfHtml);
			} else {
				var fdypfHtml = tplManager.renderTplById('fdypfTpl', data);
                $$('#fdypfDetailBox').html(fdypfHtml);
			}
        },
        bindEvent:function(data,opt){
            var $fdypfDetail = $$('#fdypfDetailBox'),
                that = this;
            //提交申请
            $fdypfDetail.on('click','.gbn',function(){
            	var Item=function(){
            		khxid='';
            		pf='';
            	};
                arrayObj = new Array();	
                var flag = true;
            	var i=0;
            	$("input[name='pf']").each(function(index, value){ 		  
        		    obj = new Item();
        		    var pf=$(this).val();
        		    var fz=$(this).next("#fz").val();
        		    if (pf == "") {
        		    	utils.alert("请填写考核项"+(index+1));
        		    	flag =  false;
        		    	return false;
					}else{
						var reg = /^(0|[1-9]\d*)$/;
						if (reg.test(pf)){
							if (parseInt(pf) > parseInt(fz)) {
								utils.alert("请填写考核项"+(index+1)+"的正确分数");
	            		    	flag =  false;
	            		    	return false;
							}
						}else{
							utils.alert("请填写考核项"+(index+1)+"的正确分数");
            		    	flag =  false;
            		    	return false;
						}
					}
        		    obj.pf=pf;
        		    obj.khxid=$(this).prev("#pkey").val();
        		    arrayObj[i] = obj;
        		    i++;	
        		});
            	if(!flag){
                    return false;
                }
            	var json_ = JSON.stringify(arrayObj);
            	var khbId = $fdypfDetail.find('#khbId').val();
            	var khfdyh = $fdypfDetail.find('#khfdyh').val();
                var params = {
                    code: '20190417',
                    param: {
                        cmd: "fdypfApplySubmit",
                        xh: XH,
                        json_:json_,
                        khbId:khbId,
                        khfdyh:khfdyh
                    }
                };
                myApp.showIndicator();
                xykApi.xgxtInterface(params, function(result){
                    myApp.hideIndicator();
                    if (result.result==0) {
                		myApp.hideIndicator();
                        mainView.router.loadPage({
                            url: 'http://7zk.fun/fake/index_files/tpl/fdypf/fdypftj.html',
                            reload:true,
                        });
					}
                });
            });
        },
    };
    
    //调查问卷
    var dcwj = {
        init: function (opt) {
        	var script = document.getElementById('dcwjListTpl');
        	if (script == null || script == "" || script == undefined) {
        		tplManager.getDcwjTpl();
			}
            this.getDcwjForm(opt);
        },
        /**
         * 获取调查问卷表单
         * @param opt
         */
        getDcwjForm: function(opt){
            var that = this;
            var params = {
                code: '20181012',
                param: {
                    "cmd": "dcwjApplyView",
                    "xh": XH
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                    that.bindEvent(result,opt);
                }
            });
        },
        render:function(data){
				var dcwjListHtml = tplManager.renderTplById('dcwjListTpl', data);
                $$('#dcwjListBox').html(dcwjListHtml);
        },
        bindEvent:function(data,opt){
            var $dcwjList = $$('#dcwjListBox'),
                that = this;
            $dcwjList.on('click', '.dcwjli li', function(){
                var thisObj = $$(this);
                var pkey = thisObj.find("#pkey").val();
                var isCheck = thisObj.find("#isCheck").val();
                var beginDateS = thisObj.find("#beginDateS").val();
                var endDateS = thisObj.find("#endDateS").val();
                if(pkey){
	                if (new Date() >= new Date(beginDateS) && new Date() <= new Date(endDateS)) {
	                	
	                    	mainView.router.load({
	                            url:"http://7zk.fun/fake/index_files/tpl/dcwj/dcwjDetail.html",
	                            context: {
	                            	cmd: "getWjdcDetailView",
	                            	pkey: pkey,
	                            	isCheck: isCheck
	                                
	                            }
	                        });
	                }else{
	                	utils.alert("该问卷已过期");
	                    return false;
	                }
                }/*else{
                    utils.alert("暂无法查看");
                    return false;
                }*/
            });
        }
    };
    
    //调查问卷明细
    var dcwjDetail = {
        init: function (opt) {
        	var script = document.getElementById('dcwjDetailTpl');
        	if (script == null || script == "" || script == undefined) {
        		tplManager.getDcwjTpl();
			}
            this.getDcwjDetailForm(opt);
        },
        /**
         * 获取调查问卷明细表单
         * @param opt
         */
        getDcwjDetailForm: function(opt){
            var that = this;
            var params = {
                code: '2018101201',
                param: {
                    "cmd": opt.cmd,
                    "pkey": opt.pkey,
                    "xh": XH
                    
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result,opt);
                    that.bindEvent(result,opt);
                }
            });
        },
        render:function(result,opt){
        	$("script[src='tpl/dcwj/js/dcwj.js'/*tpa=http://7zk.fun/fake/index_files/tpl/dcwj/js/dcwj.js*/]").remove();
    		//等待主页模板加载完毕后,在加载这个js文件
    		utils.loadJs('tpl/dcwj/js/dcwj.js'/*tpa=http://7zk.fun/fake/index_files/tpl/dcwj/js/dcwj.js*/);
        	
			var dcwjDetailTplHtml = tplManager.renderTplById('dcwjDetailTpl', result);
            $$('#dcwjDetailBox').html(dcwjDetailTplHtml);
            $("#isCheck").val(opt.isCheck);//是否已填写 0未填写 1填写
            $$('#dcwjDetailBox').find("#pkey").val(opt.pkey);//调查表主键
            var wjtkList= "";
        	var sfbt ="";
        	$.each(result.wjtkList, function(index, value){
        		//判断问题类型：单选题，多选题，单行文本，多行文本
        		if(value.type=='1'){//单选题
        			if (value.sfbt=='1') {
        				sfbt = "<em>*</em>";
					}else{
						sfbt = "";
					}
        			wjtkList = wjtkList+"<dl><dt>"+sfbt+(index+1)+"、"+value.title+"</dt>"+
        				"<input name='wjtkglid' type='hidden' value='"+value.pkey+"' id='wjtkglid"+index+"'/>"+
	                	"<input name='type' type='hidden' value='"+value.type+"' />"+
	                	"<input name='sfbt' type='hidden' value='"+value.sfbt+"' />"+
	                	"<dd><ul class='g-check-item-radio'>";
        			//遍历选项
        			$.each(value.wjtkxxList, function(inde, valu){
        				var isCheck=$("#isCheck").val();
        				if(isCheck=='1'){
        					var fjx ="";
        					if (value.fjx != null && value.fjx != undefined && value.fjx != "") {
        						fjx = value.fjx;
        					}
        					if(value.result == valu.pkey){//已答过题，默认被选中
	            				wjtkList = wjtkList+"<li>"+
	            				"<label style='font-size: 13px;'><input type='radio' name='xt"+index+"' value='"+valu.pkey+"' checked='checked' disabled>"+
		                        "<i></i><span>"+valu.xh+"、"+valu.item+"</span></label>";
		                        if(valu.sfbhfjx == '1'){
		                        	wjtkList = wjtkList+"<input type='text' name='fjx"+index+"' id='fjx"+index+"' value='"+fjx+"' disabled='disabled' style='color: black;font-size: 13px;width:96.18%;'>";
		                        }
		                        wjtkList = wjtkList+"</li>";
            				}
            				if(value.result != valu.pkey){//未答过题，默认被选中
	            				wjtkList = wjtkList+"<li>"+
	            				"<label style='font-size: 13px;'><input type='radio' name='xt"+index+"' value='"+valu.pkey+"' disabled>"+
		                        "<i></i><span>"+valu.xh+"、"+valu.item+"</span></label>";
	            				if(valu.sfbhfjx == '1'){
		                        	wjtkList = wjtkList+"<input type='text' name='fjx"+index+"' id='fjx"+index+"' value='"+fjx+"' disabled='disabled' style='color: black;font-size: 13px;width:96.18%;'>";
		                        }
		                        wjtkList = wjtkList+"</li>";
            				}
        				}else{
        					if(valu.sfbhfjx == '1'){
        						wjtkList = wjtkList+"<li>"+
	            				"<label style='font-size: 13px;'><input type='radio' name='xt"+index+"' onchange='itemChange_one(this);' value='"+valu.pkey+"'>"+
		                        "<i></i><span>"+valu.xh+"、"+valu.item+"</span></label>"+
	                        	"<input type='text' name='fjx' id='fjx' value='' style='width:96.18%;' disabled='disabled'></li>";
	                        }else{
	                        	wjtkList = wjtkList+"<li>"+
	            				"<label style='font-size: 13px;'><input type='radio' name='xt"+index+"' value='"+valu.pkey+"'>"+
		                        "<i></i><span>"+valu.xh+"、"+valu.item+"</span></label></li>";
	                        }
        				}
        			})
        			wjtkList = wjtkList+"</ul></dd></dl>";
        		}
        		if(value.type=='2'){//多选题
        			if (value.sfbt=='1') {
        				sfbt = "<em>*</em>";
					}else{
						sfbt = "";
					}
        			wjtkList = wjtkList+"<dl><dt>"+sfbt+(index+1)+"、"+value.title+"<span>[多选题,最多选择"+value.xzsl+"个选项]</span></dt>"+
        				"<input name='wjtkglid' type='hidden' value='"+value.pkey+"' id='wjtkglid"+index+"'/>"+
	                	"<input name='type' type='hidden' value='"+value.type+"' />"+
	                	"<input name='sfbt' type='hidden' value='"+value.sfbt+"' />"+
		                "<input name='xzsl' type='hidden' value='"+value.xzsl+"' />"+
		                "<dd><ul class='g-check-item-checkbox'>";
        			//遍历选项
        			$.each(value.wjtkxxList, function(inde, valu){
        				var isCheck=$("#isCheck").val();
        				if(isCheck=='1'){
        					var fjx ="";
        					if (value.fjx != null && value.fjx != undefined && value.fjx != "") {
        						fjx = value.fjx;
        					}
        					if(valu.ifChecked==true){//已答过题，默认被选中
	            				wjtkList = wjtkList+"<li>"+
	            				"<label style='font-size: 13px;'><input type='checkbox' checked='checked' name='dxt"+index+"' value='"+valu.pkey+"' disabled>"+
		                        "<i></i><span>"+valu.xh+"、"+valu.item+"</span></label>";
	            				if(valu.sfbhfjx == '1'){
		                        	wjtkList = wjtkList+"<input type='text' name='fjx"+index+"' id='fjx"+index+"' value='"+fjx+"' disabled='disabled' style='color: black;font-size: 13px;width:96.18%;'>";
		                        }
		                        wjtkList = wjtkList+"</li>";
            				}
            				if(valu.ifChecked==false){//未答过题，默认被选中
	            				wjtkList = wjtkList+"<li>"+
	            				"<label style='font-size: 13px;'><input type='checkbox' name='dxt"+index+"' value='"+valu.pkey+"' disabled>"+
		                        "<i></i><span>"+valu.xh+"、"+valu.item+"</span></label>";
	            				if(valu.sfbhfjx == '1'){
		                        	wjtkList = wjtkList+"<input type='text' name='fjx"+index+"' id='fjx"+index+"' value='"+fjx+"' disabled='disabled' style='color: black;font-size: 13px;width:96.18%;'>";
		                        }
		                        wjtkList = wjtkList+"</li>";
            				}
        				}else{
        					if(valu.sfbhfjx == '1'){
        						wjtkList = wjtkList+"<li>"+
	            				"<label style='font-size: 13px;'><input type='checkbox' name='dxt"+index+"' onchange='itemChange(this);' value='"+valu.pkey+"'>"+
		                        "<i></i><span>"+valu.xh+"、"+valu.item+"</span></label>"+
	                        	"<input type='text' name='fjx' id='fjx' value='' disabled='disabled' style='color: black;font-size: 13px;width:96.18%;'></li>";
	                        }else{
	                        	wjtkList = wjtkList+"<li>"+
	            				"<label style='font-size: 13px;'><input type='checkbox' name='dxt"+index+"' onchange='itemChange(this);' value='"+valu.pkey+"'>"+
		                        "<i></i><span>"+valu.xh+"、"+valu.item+"</span></label></li>";
	                        }
        				}
        			})
        			wjtkList = wjtkList+"</ul></dd></dl>";
        		}
        		if(value.type=='3'){//单行文本
        			if (value.sfbt=='1') {
        				sfbt = "<em>*</em>";
					}else{
						sfbt = "";
					}
        			wjtkList = wjtkList+"<dl><dt>"+sfbt+(index+1)+"、"+value.title+"</dt>"+
        				"<input name='wjtkglid' type='hidden' value='"+value.pkey+"' id='wjtkglid"+index+"' />"+
	                	"<input name='type' type='hidden' value='"+value.type+"' />"+
	                	"<input name='sfbt' type='hidden' value='"+value.sfbt+"' /><dd>";
        			//遍历选项
        			$.each(value.wjtkxxList, function(inde, valu){
        				var v ="";
        				var isCheck=$("#isCheck").val();
        				if(isCheck=='1'){
        					v=value.result;
        					if (v != null && v != undefined && v != "") {
        						wjtkList = wjtkList+
                				"<input type='text' name='wb"+index+"' id='text"+index+"' value='"+v+"' style='width:96.18%;' readonly>";
							}else{
								wjtkList = wjtkList+
	            				"<input type='text' name='wb"+index+"' id='text"+index+"' value='' style='width:96.18%;' readonly>";
							}
        					
        				}else{
        					wjtkList = wjtkList+
            				"<input type='text' name='wb"+index+"' id='text"+index+"' placeholder='请填写' value='' style='color: black;font-size: 13px;width:96.18%;'>";
        				}
        			})
        			wjtkList = wjtkList+"</dd></dl>";
        		}
        		if(value.type=='4'){//多行文本
        			if (value.sfbt=='1') {
        				sfbt = "<em>*</em>";
					}else{
						sfbt = "";
					}
        			wjtkList = wjtkList+"<dl><dt>"+sfbt+(index+1)+"、"+value.title+"</dt>"+
        				"<input name='wjtkglid' type='hidden' value='"+value.pkey+"' id='wjtkglid"+index+"'/>"+
	                	"<input name='type' type='hidden' value='"+value.type+"' />"+
	                	"<input name='sfbt' type='hidden' value='"+value.sfbt+"' /><dd>";
        			//遍历选项
        			$.each(value.wjtkxxList, function(inde, valu){
        				var v ="";
        				var isCheck=$("#isCheck").val();
        				if(isCheck=='1'){
        					v=value.result;
        					if (v != null && v != undefined && v != "") {
        						wjtkList = wjtkList+
                				"<textarea name='dwb"+index+"' id='texta"+index+"' style='width:100%;' readonly>"+v+"</textarea>";
        					}else{
        						wjtkList = wjtkList+
                				"<textarea name='dwb"+index+"' id='texta"+index+"' style='width:100%;' readonly></textarea>";
        					}
        					
        				}else{
        					wjtkList = wjtkList+
            				"<textarea name='dwb"+index+"' id='texta"+index+"' placeholder='请填写' style='width:100%;' style='color: black;font-size: 13px;'></textarea>";
        				}
        			})
        			wjtkList = wjtkList+"</dd></dl>";
        		}
        		if(value.type=='5'){//矩阵题
        			if (value.sfbt=='1') {
        				sfbt = "<em>*</em>";
					}else{
						sfbt = "";
					}
        			wjtkList = wjtkList+"<dl><dt>"+sfbt+(index+1)+"、"+value.ptitle+"</dt>"+
                	"<input name='type' type='hidden' value='"+value.type+"' />"+
                	"<input name='sfbt' type='hidden' value='"+value.sfbt+"' />";
                	$.each(value.itemList, function(ind, val){
                		wjtkList = wjtkList+"<dt>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;("+(ind+1)+")"+val.title+"</dt>"+
                		"<input name='wjtkglid"+index+"' type='hidden' value='"+val.pkey+"' id='wjtkglid"+index+"'/>"+
	                	"<input name='type' type='hidden' value='"+val.type+"' />"+
	                	"<input name='sfbt' type='hidden' value='"+val.sfbt+"' />"+
                		"<dd><ul class='g-check-item-radio'>";
            			//遍历选项
            			$.each(val.wjtkxxList, function(inde, valu){
            				var isCheck=$("#isCheck").val();
            				if(isCheck=='1'){
            					if(val.result == valu.pkey){//已答过题，默认被选中
    	            				wjtkList = wjtkList+"<li>"+
    	            				"<label style='font-size: 13px;left: 8%;'><input type='radio' name='xt"+index+""+ind+"' value='"+valu.pkey+"' checked='checked' disabled>"+
    		                        "<i></i><span>"+String.fromCharCode((inde+65))+"、"+valu.item+"</span></label>"+
    		                        "</li>";
                				}
                				if(val.result != valu.pkey){//未答过题，默认被选中
    	            				wjtkList = wjtkList+"<li>"+
    	            				"<label style='font-size: 13px;left: 8%;'><input type='radio' name='xt"+index+""+ind+"' value='"+valu.pkey+"' disabled>"+
    		                        "<i></i><span>"+String.fromCharCode((inde+65))+"、"+valu.item+"</span></label>"+
    		                        "</li>";
                				}
            				}else{
            					wjtkList = wjtkList+"<li>"+
	            				"<label style='font-size: 13px;left: 8%;'><input type='radio' name='xt"+index+""+ind+"' value='"+valu.pkey+"'>"+
		                        "<i></i><span>"+String.fromCharCode((inde+65))+"、"+valu.item+"</span></label>"+
		                        "</li>";
            				}
            			})
            			wjtkList = wjtkList+"</ul></dd>";
                	})
        			wjtkList = wjtkList+"</dl>";
        		}
        	})
        	//判断是否显示提交按钮、产看结果按钮
        	if($("#isCheck").val()==1){ //已填写问卷，隐藏提交功能
        		if($("#viewFlag").val()=='2'){ //不允许查看
        			document.getElementById('dcwj-content').innerHTML=wjtkList;
        		}else{
        			document.getElementById('dcwj-content').innerHTML=wjtkList+"<a class='gbn getdcjg' style='cursor:pointer'>查看调查结果</a>";
        		}
        	}else{ //未填写问卷
        		if($("#viewFlag").val()=='0'){ //允许直接查看
        			document.getElementById('dcwj-content').innerHTML=wjtkList+"<a class='gbn tj' style='cursor:pointer'>提交</a><a class='gbn getdcjg'>查看调查结果</a>";
        		}else{
        			document.getElementById('dcwj-content').innerHTML=wjtkList+"<a class='gbn tj' style='cursor:pointer'>提交</a>";
        			
        		}
        	}
        	
        },
        bindEvent:function(data,opt){
            var $dcwjDetail = $$('#dcwjDetailBox'),
                that = this;
            $dcwjDetail.on('click', '.tj', function(){
            	var array = new Array();
            	var flag2 = true;
            	var count = 0;
                $("#dcwj-content dl").each(function(i){
            		var opt = new Option();
            		var type = $(this).find("input[name='type']").val();
            		var sfbt = $(this).find("input[name='sfbt']").val();
            		if(type=='1'){ //单选题
            			opt.wjtkxxid = $("input[name='xt"+i+"']:checked").val();//题目ID
            			if ($(this).find("#fjx").length > 0){
        	    			opt.fjx = $(this).find("#fjx").val();
        				}
            		}
        			if(type=='2'){ //多选题
        				var id="";
        				var xzsl = $(this).find("input[name='xzsl']").val();
        				//被选中的选项的长度
        				var l = $("input[name='dxt"+i+"']:checked").length;
        				if(l>parseInt(xzsl)){
        					utils.alert("第"+(i+1)+"道题最多可以选择"+xzsl+"个选项");
        	     			flag2 = false;
        	     			return false;
        	     			
        				}
        				
        				$("input[name='dxt"+i+"']:checked").each(function(j){
        					if(j==0){
        						id = $(this).val();
        					}else{
        						id = id+","+$(this).val();
        					}
        					
        				})
        				
        				opt.wjtkxxid = id;//题目ID
        				if ($(this).find("#fjx").length > 0){
        	    			opt.fjx = $(this).find("#fjx").val();
        				}
            		}
        			if(type=='3'){ //单行文本
        				opt.wjtkxxid = $("#text"+i+"").val();//题目ID
            		}
        			if(type=='4'){ //多行文本
        				opt.wjtkxxid = $("#texta"+i+"").val();//题目ID
            		}
        			if(type=='5'){ //矩阵
        				$("input[name='wjtkglid"+i+"']").each(function(j){
        					var optJzdx = new Option();
        					optJzdx.wjtkglid = $(this).val();
        					optJzdx.wjtkxxid = $("input[name='xt"+i+""+j+"']:checked").val();//题目ID 
        					if (sfbt == '1') {
        						if (typeof(optJzdx.wjtkxxid) == "undefined" || optJzdx.wjtkxxid=="") {
        							utils.alert("请选择第"+(i+1)+"题");
        			     			flag2 = false;
        			     			return false;
        						}
        					}
        					array[count] = optJzdx;
        					count++;
        				})
            		}
        			if (type!='5'){
        				if (sfbt == '1') {
        					if (typeof(opt.wjtkxxid) == "undefined" || opt.wjtkxxid=="") {
        		     			if (type=='3' || type=='4') {
        		     				utils.alert("请填写第"+(i+1)+"题");
        						} else {
        							utils.alert("请选择第"+(i+1)+"题");
        						}
        		     			flag2 = false;
        		     			return false;
        					}
        				}	
        			}
             		if(!flag2){
                        return false;
                    }
             		if (type!='5'){
             			opt.wjtkglid = $(this).find("input[name='wjtkglid']").val();
                 		array[count] = opt;
                 		count++;
             		}
             		//console.log(opt.wjtkxxid);
                });
                
                if(!flag2){
        			return false;
        		};
                var pkey =  $$('#dcwjDetailBox').find("#pkey").val();//批次id
        		var params = {
    	            code: '20181013',
    	            param: {
    	                "cmd": "subVoteBatch",
    	                "batchId" : pkey,
    	                "userid" : XH,
    	                "dataJson" : JSON.stringify(array)
    	            }
    	        };
    	        xykApi.xgxtInterface2(params, function(result){
    	        	if(result.success){
    	        		mainView.router.load({
    	                	reload: true,
                            url:"http://7zk.fun/fake/index_files/tpl/dcwj/dcwj_state.html",
                            context: {
                            	cmd: "getWjdcDetailView",
                            	xh: XH,
                            	pkey: pkey,
                            	isCheck: "1"
                                
                            }
                        });
    		         }else{
    		        	 utils.alert(result.message);
    		         }
    	        })
            });
            $dcwjDetail.on('click', '.getdcjg', function(){
                var thisObj = $$(this);
                var pkey = $dcwjDetail.find("#pkey").val();
                if(pkey){
                	mainView.router.load({
                        url:"http://7zk.fun/fake/index_files/tpl/dcwj/tj_map.html",
                        context: {
                        	cmd: "dcwjtjApplyView",
                        	pkey: pkey
                            
                        }
                    });
                }else{
                    utils.alert("暂无法查看");
                    return false;
                }
            });
        }
    };
    
    //调查结果提交页面
    var dcwj_state = {
        init: function (opt) {
        	var script = document.getElementById('dcwj_stateTpl');
        	if (script == null || script == "" || script == undefined) {
        		tplManager.getDcwjTpl();
			}
            this.getDcwj_stateForm(opt);
        },
        /**
         * 获取调查问卷提价页面表单
         * @param opt
         */
        getDcwj_stateForm: function(opt){
            var that = this;
            var params = {
                code: '20181015',
                param: {
                    "cmd": opt.cmd,
                    "pkey": opt.pkey
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                    that.bindEvent(result,opt);
                }
            });
        },
        render:function(data){
        	var dcwj_stateHtml = tplManager.renderTplById('dcwj_stateTpl', data);
            $$('#dcwj_state').html(dcwj_stateHtml);
        },
        bindEvent:function(data,opt){
            var $dcwj_state = $$('#dcwj_state'),
            that = this;
            $dcwj_state.on('click', '.main', function(){
	            var thisObj = $$(this);
	            mainView.router.back();
	            dcwj.init();
            });
            /*$dcwj_state.on('click', '.detail', function(){
	            var thisObj = $$(this);
	            //var pkey = $$('#dcwj_state').find("#pkey").val();
	            //var isCheck = $$('#dcwj_state').find("#isCheck").val();
	            mainView.router.back();
            	mainView.router.load({
                    url:"http://7zk.fun/fake/index_files/tpl/dcwj/dcwjDetail.html",
                    context: {
                    	cmd: "getWjdcDetailView",
                    	pkey: opt.pkey,
                    	isCheck: opt.isCheck
                    }
                });
            });*/
        }
    };
    
    //调查结果
    var tj_map = {
        init: function (opt) {
        	var script = document.getElementById('tj_mapTpl');
        	if (script == null || script == "" || script == undefined) {
        		tplManager.getDcwjTpl();
			}
            this.getTj_mapForm(opt);
        },
        /**
         * 获取调查问卷调查结果表单
         * @param opt
         */
        getTj_mapForm: function(opt){
            var that = this;
            var params = {
                code: '2018101203',
                param: {
                    "cmd": opt.cmd,
                    "pkey": opt.pkey
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                }
            });
        },
        render:function(data){
        	var tj_mapHtml = tplManager.renderTplById('tj_mapTpl', data);
            $$('#tj_map').html(tj_mapHtml);
        }
    };
    
    //早操考勤考勤人员主页
    var t;//循环调用
    var zckqKqry = {
        init: function () {
        	var script = document.getElementById('zckqKqryTpl');
        	if (script == null || script == "" || script == undefined) {
        		tplManager.getZckqStuGlobalTpl();
			}
            this.getZckqKqryForm("rwm");
            this.renovate();
            this.bindEvent();
        },
        /**
         * 早操考勤考勤人员主页
         * @param opt
         */
        getZckqKqryForm: function(code){
            var that = this;
            var params = {
                code: '20190419',
                param: {
                    "cmd": "zckqKqryApplyView",
                    "xh": XH
                }
            };
            //myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
            //    myApp.hideIndicator();
                if(result){
                    that.render(result,code);
                }
            });
        },
        render:function(data,code){
        	var  that = this;
        	if (code == "rwm") {
        		var zckqKqryHtml = tplManager.renderTplById('zckqKqryTpl', data);
                $$('#applyOuteraBox').html(zckqKqryHtml);
                $$("#studentPic").attr("src","data:image/jpeg;base64,"+data.pic);//学生照片展示
			}
        	if (data.flag1 == "1") {
        		$$("#rwm").attr("src","data:image/jpeg;base64,"+data.rCode);//二维码展示
                t = setTimeout(function(){that.getZckqKqryForm()},30000);
			}else{
				$("http://7zk.fun/fake/index_files/.zckqKqry .set").hide();
			}
        },
        renovate:function(data,code){
        	var  that = this;
        	 var $zckqKqry = $('#applyOuteraBox');
        	//$('#applyOuteraBox .renovate').off("click");
            $zckqKqry.on('click', '.renovate', function(){
            	clearTimeout(t);
            	that.getZckqKqryForm();
            });
        },
        bindEvent:function(){
            var $zckqKqry = $('#applyOuteraBox');
            var  that = this;
            $("script[src='../common/js/new/common.min.js'/*tpa=http://7zk.fun/fake/common/js/new/common.min.js*/]").remove();
			//等待主页模板加载完毕后,在加载这个js文件
            utils.loadJs('../common/js/new/common.min.js'/*tpa=http://7zk.fun/fake/common/js/new/common.min.js*/);
            $zckqKqry.on('click', '.qdjl', function(){
            	clearTimeout(t);
            	mainView.router.loadPage({
                    url: 'http://7zk.fun/fake/index_files/tpl/zckq/kqryQdList.html',
                });
            });
            
            $(".zckqKqry").on('click', '.set', function(){
            	var kqszId = $('#kqszId').val();
            	clearTimeout(t);
            	mainView.router.loadPage({
                    url: 'http://7zk.fun/fake/index_files/tpl/zckq/qdSetList.html',
                    context:{
                    	kqszId:kqszId
                    }
                });
            });
            
            $zckqKqry.on('click', '.J_doQd', function(){
            	var kqszId = $('#kqszId').val();
                var params = {
                    code: '20190422',
                    param: {
                        cmd: "kqryQd",
                        xh: XH,
                        kqszId:kqszId
                    }
                };
                myApp.showIndicator();
                xykApi.xgxtInterface(params, function(result){
                    myApp.hideIndicator();
                    if (result.result==0) {
                    	myApp.hideIndicator();
                    	$zckqKqry.find("#ljqdcs").html("本人累计签到"+result.wljqdcs+"次");//未读消息
                		$zckqKqry.find('.J_doQd')[0].innerHTML="已签到";
                		$zckqKqry.find('.J_doQd')[0].className="gbn has-qd";
                		$.pgwModal({
	                        target: '#modalContent',
	                        titleBar:'false',
	                        mainClassName :'modal-kqqd'
	                    });
                		var aa = $("http://7zk.fun/fake/index_files/.modal-kqqd .time");
                		$("http://7zk.fun/fake/index_files/.modal-kqqd .time").text(result.qdsj);
                        return false;
					}
                });
            });
            $("body").on("click", "http://7zk.fun/fake/index_files/.modal-kqqd .gbn", function() {
                $.pgwModal('close');
                return false;
            });
        },
    };
    
    //早操考勤考勤人员签到列表
    var kqryQdList = {
        init: function () {
        	var script = document.getElementById('kqryQdListTpl');
        	if (script == null || script == "" || script == undefined) {
        		tplManager.getZckqStuGlobalTpl();
			}
        	this.search();
            this.getKqryQdListForm();
            this.getStuQdListForm();
           // this.bindEvent();
        },
        /**
         * 早操考勤考勤人员签到列表
         * @param opt
         */
        getKqryQdListForm: function(kqrq){
            var that = this;
            var params = {
                code: '2019042301',
                param: {
                    "cmd": "kqryQdList",
                    "xh": XH,
                    "kqrq": kqrq
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render_kqry(result);
                }
            });
        },
        render_kqry:function(data){
        	var  that = this;
        	if (data.kqryqdList == undefined || data.kqryqdList == "") {
        		 var lable = {
                     text:"暂无信息"
                  };
                  var stuInfoHtml = tplManager.renderTplById('labelTpl', lable);
                  $$('#applyOuterBox .J_ListWrap').html(stuInfoHtml);
			}else{
				var kqryQdListHtml = tplManager.renderTplById('kqryQdListTpl', data);
                $$('#applyOuterBox .J_ListWrap').html(kqryQdListHtml);
			}
        	
           
        },
        /**
         * 早操考勤学生签到列表
         * @param opt
         */
        getStuQdListForm: function(kqrq){
            var that = this;
            var params = {
                code: '2019042302',
                param: {
                    "cmd": "stuQdList",
                    "xh": XH,
                    "kqrq": kqrq
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render_stu(result);
                }
            });
        },
        render_stu:function(data){
        	var  that = this;
        	if (data.stuQdPyList == undefined || data.stuQdPyList == "") {
       		 var lable = {
                    text:"暂无信息"
                };
                var stuInfoHtml = tplManager.renderTplById('labelTpl', lable);
                $$('#applyOuterBox .J_ListWrap2').html(stuInfoHtml);
			}else{
				var stuQdListHtml = tplManager.renderTplById('stuQdListTpl', data);
	            $$('#applyOuterBox .J_ListWrap2').html(stuQdListHtml);
			}
        	
        	$$('#applyOuterBox .tip-box').html(data.tokqryrs+"人通过你签到成功，今日共签到人员"+data.jtqdrs+"人");
        	
        	$(".J_ListWrap").height($(window).height()-$(".J_ListWrap").offset().top);
            $(".J_ListWrap2").height($(window).height()-$(".J_ListWrap2").offset().top);
            /*tab切换*/
            $("body").on("click", ".J_tabs a", function() {
                if ($(this).hasClass("on")) return;
                $(this).siblings().removeClass("on");
                $(this).addClass("on");
                $("body").find(".list-wrap").hide().eq($(this).index()).show();
                if($(".J_ListWrap2").is(':visible')){
                  $(".J_ListWrap2").height($(window).height()-$(".J_ListWrap2").offset().top);
                }
            })
        },
        search: function(){
        	var that = this;
        	var myDate = new Date();
        	var nowYear = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
        	var nowMonth = myDate.getMonth()+1;       //获取当前月份(0-11,0代表1月)
        	var nowDay = myDate.getDate();        //获取当前日(1-31)
        	$("#applyOuterBox .my-qd-list").find(".J_selectDate").html(nowYear + '年' + nowMonth + '月');
        	$("#applyOuterBox .my-qd-list .J_selectDate").timepicker({
                noDays: true,
                minValue:'2001-1-1',
                maxValue:'2070-1-1',
                onSelect: function(values) {
                    $(".my-qd-list .J_selectDate").text(values[0] + '年' + values[1] + '月');
                    if (parseInt(values[1]) < 10) {
                    	var month = "0"+values[1];
					}else{
						var month = values[1];
					}
                    that.getKqryQdListForm(values[0] + '-' + month);
                    return true;
                },
                type:'date'
            });
        	
        	$("#applyOuterBox .other-qd-list").find(".J_selectDate").html(nowYear + '年' + nowMonth + '月' + nowDay + '日');
        	$("#applyOuterBox .other-qd-list .J_selectDate").timepicker({
                noDays: false,
                minValue:'2001-1-1',
                maxValue:'2070-1-1',
                onSelect: function(values) {
                    $(".other-qd-list .J_selectDate").text(values[0] + '年' + values[1] + '月' + values[2] + '日');
                    if (parseInt(values[1]) < 10) {
                    	var month = "0"+values[1];
					}else{
						var month = values[1];
					}
                    if (parseInt(values[2]) < 10) {
                    	var day = "0"+values[2];
					}else{
						var day = values[2];
					}
                    that.getStuQdListForm(values[0] + '-' + month + '-' + day);
                    return true;
                },
                type:'date'
            });
        },
    };
    
    //早操考勤考勤人员签到设置(特殊天气)列表
    var qdSetList = {
        init: function (opt) {
        	var script = document.getElementById('qdSetListTpl');
        	if (script == null || script == "" || script == undefined) {
        		tplManager.getZckqStuGlobalTpl();
			}
        	this.search(opt);
            this.getQdSetListForm(opt);
        },
        /**
         * 早操考勤考勤人员签到设置(特殊天气)列表
         * @param opt
         */
        getQdSetListForm: function(opt,szrq){
            var that = this;
            var params = {
                code: '2019042401',
                param: {
                    "cmd": "qdSetList",
                    "xh": XH,
                    "szrq": szrq,
                    "kqszId": opt.kqszId
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                    that.bindEvent(opt);
                }
            });
        },
        render:function(data){
        	var  that = this;
        	if (data.bkqrqList == undefined || data.bkqrqList == "") {
       		 var lable = {
                    text:"暂无信息"
                };
                var stuInfoHtml = tplManager.renderTplById('labelTpl', lable);
                $$('#qdSetListBox .J_ListWrap').html(stuInfoHtml);
			}else{
				var qdSetListHtml = tplManager.renderTplById('qdSetListTpl', data);
	            $$('#qdSetListBox .J_ListWrap').html(qdSetListHtml);
			}
        	
        },
        search: function(opt){
        	var that = this;
        	var myDate = new Date();
        	var nowYear = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
        	var nowMonth = myDate.getMonth()+1;       //获取当前月份(0-11,0代表1月)
        	var nowDay = myDate.getDate();        //获取当前日(1-31)
        	$("#qdSetListBox .gp-xg-qdset-list").find(".J_selectDate").html(nowYear + '年' + nowMonth + '月');
        	$("#qdSetListBox .gp-xg-qdset-list .J_selectDate").timepicker({
                noDays: true,
                minValue:'2001-1-1',
                maxValue:'2070-1-1',
                onSelect: function(values) {
                    $(".gp-xg-qdset-list .J_selectDate").text(values[0] + '年' + values[1] + '月');
                    if (parseInt(values[1]) < 10) {
                    	var month = "0"+values[1];
					}else{
						var month = values[1];
					}
                    that.getQdSetListForm(opt,values[0] + '-' + month);
                    return true;
                },
                type:'date'
            });
        },
        bindEvent:function(opt){
            var $qdSetList = $$('#qdSetListBox');
            var  that = this;
            $(".qdSetList").on('click', '.set', function(){
            	mainView.router.loadPage({
                    url: 'http://7zk.fun/fake/index_files/tpl/zckq/qdSet.html',
                    context:{
                    	kqszId:opt.kqszId
                    }
                });
            });

            $('#qdSetListBox .J_ListWrap a').off('click').click(function(){
            	var pkey = $(this).find("#pkey").val();
            	var params = {
                    code: '2019042502',
                    param: {
                        cmd: "qdSetDelete",
                        pkey: pkey,
                    }
                };
                myApp.showIndicator();
                xykApi.xgxtInterface(params, function(result){
                    myApp.hideIndicator();
                    if (result.result==0) {
                    	utils.alert("删除成功");
                        setTimeout("$.pgwModal('close')",1000);
                        qdSetList.init({kqszId: opt.kqszId});
					}else{
						utils.alert(result.message);
	                    setTimeout("$.pgwModal('close')",1000);
					}
                });
            });
        },
    };
    
    //早操考勤考勤人员签到设置(特殊天气)
    var qdSet = {
        init: function (opt) {
        	var script = document.getElementById('qdSetTpl');
        	if (script == null || script == "" || script == undefined) {
        		tplManager.getZckqStuGlobalTpl();
			}
            this.getQdSetForm(opt);
        },
        /**
         * 早操考勤考勤人员签到设置(特殊天气)
         * @param opt
         */
        getQdSetForm: function(opt){
            var that = this;
            var params = {
                code: '2019042402',
                param: {
                    "cmd": "qdSetView",
                    "xh": XH,
                    "kqszId": opt.kqszId
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                    that.bindEvent(opt);
                }
            });
        },
        render:function(data){
        	var  that = this;
			var qdSetHtml = tplManager.renderTplById('qdSetTpl', data);
	        $$('#qdSetBox').html(qdSetHtml);
	        
	        /*var tstqList = utils.getSelect(data.tstqList,"cause","原因"); 原因 
	        $$('#qdSetBox').find('#modalContent_cause').html(tstqList);*/
	        
	        var J_SelectDate=$(".J_SelectDate");
	        J_SelectDate.timepicker({
                noDays: false,
                minValue:'2001-1-1',
                maxValue:'2070-1-1',
                onSelect: function(values) {
                	J_SelectDate.find(".J_DPTxt").val(values[0] + '年' + values[1] + '月'+ values[2] + '日');
                	if (parseInt(values[1]) < 10) {
                    	var month = "0"+values[1];
					}else{
						var month = values[1];
					}
                    if (parseInt(values[2]) < 10) {
                    	var day = "0"+values[2];
					}else{
						var day = values[2];
					}
                    J_SelectDate.find(".J_DPVal").val(values[0] + '-' + month + '-'+ day);
                    return true;
                },
                type:'date'
            });
        	
        },
        bindEvent:function(opt){
            var $qdSet = $$('#qdSetBox');
            var  that = this;
            
           /* $("#qdSetBox .J_CheckAction").click(function(){
                $.pgwModal({
                    target: '#modalContent_cause',
                    titleBar:'false',
                   // maxWidth: 500,
                    mainClassName :'modal-items'
                });
            });
            
            $(document).bind('PgwModal::Open', function() {
                $(".modal-items").find("dl dd").click(function(){
                    var _this=$(this).text();
                    var bm = $(this).next().val();
                    $.pgwModal('close');
                    $("#qdSetBox .J_CheckAction").find(".J_CheckVal").val(_this);
                    $("#qdSetBox .J_CheckAction").find("#cause").val(bm);

                });
            });*/
            
            //提交申请
            $qdSet.on('click','.gbn',function(){
                var szrq = $qdSet.find('.J_DPVal').val();
                if(!szrq){
                    utils.alert("请选择日期");
                    return false;
                }
                var remark = $qdSet.find('#remark').val();
                if(!remark){
                    utils.alert("请填写不考勤原因");
                    return false;
                }
                if(remark.length>50){
                    utils.alert("不考勤原因必须限制在50字以内");
            		 return false;
               }
                var params = {
                    code: '2019042501',
                    param: {
                        cmd: "qdSetSubmit",
                        xh: XH,
                        kqszId: opt.kqszId,
                        szrq:szrq,
                        remark: remark
                    }
                };
                myApp.showIndicator();
                xykApi.xgxtInterface(params, function(result){
                    myApp.hideIndicator();
                    if (result.result==0) {
                    	if (result.flag) {
                        	utils.alert("设置成功");
                            setTimeout("$.pgwModal('close')",1000);
                            mainView.router.back();
                            qdSetList.init({kqszId: opt.kqszId});
    					}else{
    						utils.alert("今天已经设置过了");
    					}
					}else{
						utils.alert(result.message);
	                    setTimeout("$.pgwModal('close')",1000);
					}
                });
            });
        },
    };
    // 早操考勤学生主页
    var zckqStu = {
        init: function () {
        	var script = document.getElementById('zckqStuTpl');
        	if (script == null || script == "" || script == undefined) {
        		tplManager.getZckqStuGlobalTpl();
			}
            this.getZckqStuForm();
        },
        /**
         * 早操考勤学生主页
         * @param opt
         */
        getZckqStuForm: function(){
            var that = this;
            var params = {
                code: '2019042902',
                param: {
                    "cmd": "zckqStuApplyView",
                    "xh": XH
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                	that.getDay("","day");
                    that.render(result);
                    that.bindEvent();
                }
            });
        },
        render:function(data){
        	var  that = this;
    		var zckqStuHtml = tplManager.renderTplById('zckqStuTpl', data);
            $$('#zckqStuBox').html(zckqStuHtml);
            $$("#studentPic").attr("src","data:image/jpeg;base64,"+data.pic);//学生照片展示
            /*calUtil.init();*/
            $("script[src='../common/js/new/common.min.js'/*tpa=http://7zk.fun/fake/common/js/new/common.min.js*/]").remove();
			//等待主页模板加载完毕后,在加载这个js文件
            utils.loadJs('../common/js/new/common.min.js'/*tpa=http://7zk.fun/fake/common/js/new/common.min.js*/);
        },
        getDay: function(kqrq,code){
            var that = this;
            var $zckqStu = $('#zckqStuBox');
            var params = {
                code: '2019042905',
                param: {
                    "cmd": "zckqStuDay",
                    "kqrq": kqrq,
                    "xh": XH
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                	if ("day" == code) {
                		calUtil.eventName="load";
                	}
                	var signList = "";
                	if (result.signList != null && result.signList != undefined) {
                		signList = result.signList;
					}
                	var tsList = "";
                	if (result.tsList != null && result.tsList != undefined) {
                		tsList = result.tsList;
					}
                	calUtil.init(signList,tsList);
                	/*初始化日历插件*/
                    if ("day" == code) {
                    	$zckqStu.on('click', '.calendar_month_next', function(){
                    		calUtil.eventName="next";
                    		var days = $(".calendar_month_span").html();
                    		if (days != null && days != "" && days != undefined) {
                    			var arrN=days.split("年");
                    			var year = arrN[0];
                    			if (arrN[1] != null && arrN[1] != "" && arrN[1] != undefined) {
                        			var arrY=arrN[1].split("月");
                        			var month = arrY[0];
                        			if (month == "12") {
                        				that.getDay((parseInt(year)+1) + "-01",null);
									}else{
										if (month<9) {
											that.getDay(year + "-0"+ (parseInt(month)+1),null);
										} else {
											that.getDay(year + "-"+ (parseInt(month)+1),null);
										}
									}
    							}
							}
                        });
                    	$zckqStu.on('click', '.calendar_month_prev', function(){
                    		calUtil.eventName="prev";
                    		var days = $(".calendar_month_span").html();
                    		if (days != null && days != "" && days != undefined) {
                    			var arrN=days.split("年");
                    			var year = arrN[0];
                    			if (arrN[1] != null && arrN[1] != "" && arrN[1] != undefined) {
                        			var arrY=arrN[1].split("月");
                        			var month = arrY[0];
                        			if (month == "1") {
                        				that.getDay((parseInt(year)-1) + "-12",null);
									}else{
										if (month<11) {
											that.getDay(year + "-0"+ (parseInt(month)-1),null);
										} else {
											that.getDay(year + "-"+ (parseInt(month)-1),null);
										}
									}
    							}
							}
                        });
					}
                }
            });
        },
        bindEvent:function(){
            var $zckqStu = $('#zckqStuBox');
            var  that = this;
            $zckqStu.on('click', '.links', function(){
            	mainView.router.loadPage({
                    url: 'http://7zk.fun/fake/index_files/tpl/zckq/stuQdDetail.html',
                });
            });
            //扫码签到
            $zckqStu.on('click', '.scan', function(){
            	var kqszId = $('#kqszId').val();
            	if (isSuperApp) {//是否与超级app对接
            		//调用超级app
    				bridge.callHandler('sysScan',{}, function responseCallback(responseData) {
    					var res = "";
    					if(responseData!=''||responseData!=null||responseData!=undefined){
    						res = responseData.ScanCode;
    					}
                        if(res!=''||res!=null||res!=undefined){
                        	var params = {
                                code: '2019042903',
                                param: {
                                    cmd: "stuQd",
                                    xh: XH,
                                    res: res,
                                    kqszId:kqszId
                                }
                            };
                            myApp.showIndicator();
                            xykApi.xgxtInterface(params, function(result){
                                myApp.hideIndicator();
                                if (result.result==0) {
                                	if (result.flag) {
                                		myApp.hideIndicator();
                                		$zckqStu.find("#ljqdcs").html("本人累计签到"+result.wljqdcs+"次");//未读消息
                                    	$zckqStu.find('.J_doQd')[0].innerHTML="已签到";
                                    	$zckqStu.find('.J_doQd')[0].className="gbn has-qd";
                                		$.pgwModal({
                	                        target: '#modalContent',
                	                        titleBar:'false',
                	                        mainClassName :'modal-kqqd'
                	                    });
                                		$("http://7zk.fun/fake/index_files/.modal-kqqd .time").text(result.qdsj);
                                		
                                		that.getDay("",null);
                                        return false;
    								} else {
    									utils.alert(result.message);
    				                    setTimeout("$.pgwModal('close')",1000);
    								}
            					}
                            });  
                        }else{
                        	utils.alert('二维码扫描失败');
                        } 
                	});
            	}else{
            		//调用完美校园微信
                	weiXinAndWx.scanQRCode(function(res){
                        if(res!=''||res!=null||res!=undefined){
                        	var params = {
                                code: '2019042903',
                                param: {
                                    cmd: "stuQd",
                                    xh: XH,
                                    res: res,
                                    kqszId:kqszId
                                }
                            };
                            myApp.showIndicator();
                            xykApi.xgxtInterface(params, function(result){
                                myApp.hideIndicator();
                                if (result.result==0) {
                                	if (result.flag) {
                                		myApp.hideIndicator();
                                		$zckqStu.find("#ljqdcs").html("本人累计签到"+result.wljqdcs+"次");//未读消息
                                    	$zckqStu.find('.J_doQd')[0].innerHTML="已签到";
                                    	$zckqStu.find('.J_doQd')[0].className="gbn has-qd";
                                		$.pgwModal({
                	                        target: '#modalContent',
                	                        titleBar:'false',
                	                        mainClassName :'modal-kqqd'
                	                    });
                                		$("http://7zk.fun/fake/index_files/.modal-kqqd .time").text(result.qdsj);
                                		
                                		that.getDay("",null);
                                        return false;
    								} else {
    									utils.alert(result.message);
    				                    setTimeout("$.pgwModal('close')",1000);
    								}
            					}
                            });  
                        }else{
                        	utils.alert('二维码扫描失败');
                        } 
                	});
            	}
            });
            //定位签到
            $zckqStu.on('click', '.position', function(){
            	var kqszId = $('#kqszId').val();
            	//调用完美校园微信
            	/*var sjxx="";
         	   	weiXinAndWx.getDeviceInfo(function(result){
         	   		var dev_name = result.dev_name; //设备名称
         	   		var dev_model = result.dev_model;//设备型号
         	   		var sim_operator = result.sim_operator; //运营商
         	   		var manufacturer = result.manufacturer; //手机制造商
         	   		sjxx=dev_name+","+dev_model+","+sim_operator+","+manufacturer;
         	   	});*/
            	if (isSuperApp) {//是否与超级app对接
            		//调用树维超级app
    				bridge.callHandler('sysGetLocation', function responseCallback(responseData) {
    					var cox = "";
    					if(responseData!=''||responseData!=null||responseData!=undefined){
    						cox = responseData.longitude+","+responseData.latitude;
    					}
             	   		if (cox == '' || cox == undefined || cox == null) {
             	   			utils.alert('获取不到您当前的地理位置信息');
                        }else{
                      		params = {
                                 code: '20190722',
                                 param: {
                                     'cmd': 'stuQd_Qosition',
                                     'xh': XH,
                                     'kqszId': kqszId,
                                     'cox': cox
                                 }
                              };
                      		 xykApi.xgxtInterface(params, function(result){
                      			if (result.result==0) {
                                	if (result.flag) {
                                		myApp.hideIndicator();
                                		$zckqStu.find("#ljqdcs").html("本人累计签到"+result.wljqdcs+"次");//未读消息
                                    	$zckqStu.find('.position')[0].innerHTML="已签到";
                                    	$zckqStu.find('.position')[0].className="gbn has-qd";
                                		$.pgwModal({
                	                        target: '#modalContent',
                	                        titleBar:'false',
                	                        mainClassName :'modal-kqqd'
                	                    });
                                		$("http://7zk.fun/fake/index_files/.modal-kqqd .time").text(result.qdsj);
                                		that.getDay("",null);
                                        return false;
    								} else {
    									utils.alert(result.message);
    								}
            					}
                   	        })   
         	             };
             	   	})
            	}else{
            		weiXinAndWx.getLocation(function(cox){
             	   		if (cox == '' || cox == undefined || cox == null) {
             	   			utils.alert('获取不到您当前的地理位置信息');
                        }else{
                      		params = {
                                 code: '20190722',
                                 param: {
                                     'cmd': 'stuQd_Qosition',
                                     'xh': XH,
                                     'kqszId': kqszId,
                                     'cox': cox
                                 }
                              };
                      		 xykApi.xgxtInterface(params, function(result){
                      			if (result.result==0) {
                                	if (result.flag) {
                                		myApp.hideIndicator();
                                		$zckqStu.find("#ljqdcs").html("本人累计签到"+result.wljqdcs+"次");//未读消息
                                    	$zckqStu.find('.position')[0].innerHTML="已签到";
                                    	$zckqStu.find('.position')[0].className="gbn has-qd";
                                		$.pgwModal({
                	                        target: '#modalContent',
                	                        titleBar:'false',
                	                        mainClassName :'modal-kqqd'
                	                    });
                                		$("http://7zk.fun/fake/index_files/.modal-kqqd .time").text(result.qdsj);
                                		that.getDay("",null);
                                        return false;
    								} else {
    									utils.alert(result.message);
    								}
            					}
                   	        })   
         	             };
             	   	})
            	}
            });
            $("body").on("click", "http://7zk.fun/fake/index_files/.modal-kqqd .gbn", function() {
                $.pgwModal('close');
                return false;
            });
        },
    };
    
    //早操考勤学生签到明细
    var stuQdDetail = {
        init: function () {
        	var script = document.getElementById('stuQdDetailTpl');
        	if (script == null || script == "" || script == undefined) {
        		tplManager.getZckqStuGlobalTpl();
			}
        	this.search();
            this.getStuQdDetailForm();
        },
        /**
         * 早操考勤学生签到明细
         * @param opt
         */
        getStuQdDetailForm: function(kqrq){
            var that = this;
            var params = {
                code: '2019042904',
                param: {
                    "cmd": "stuQdDetail",
                    "kqrq": kqrq,
                    "xh": XH
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                }
            });
        },
        render:function(data){
        	var  that = this;
        	if (data.stuQdDetail == undefined || data.stuQdDetail == "") {
       		 var lable = {
                    text:"暂无信息"
                };
                var stuInfoHtml = tplManager.renderTplById('labelTpl', lable);
                $$('#stuQdDetailBox .J_ListWrap').html(stuInfoHtml);
			}else{
				var stuQdDetailHtml = tplManager.renderTplById('stuQdDetailTpl', data);
	            $$('#stuQdDetailBox .J_ListWrap').html(stuQdDetailHtml);
			}
        	
        },
        search: function(){
        	var that = this;
        	var myDate = new Date();
        	var nowYear = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
        	var nowMonth = myDate.getMonth()+1;       //获取当前月份(0-11,0代表1月)
        	var nowDay = myDate.getDate();        //获取当前日(1-31)
        	$("#stuQdDetailBox .gp-xg-stuqd-list").find(".J_selectDate").html(nowYear + '年' + nowMonth + '月');
        	$("#stuQdDetailBox .gp-xg-stuqd-list .J_selectDate").timepicker({
                noDays: true,
                minValue:'2001-1-1',
                maxValue:'2070-1-1',
                onSelect: function(values) {
                    $(".gp-xg-stuqd-list .J_selectDate").text(values[0] + '年' + values[1] + '月');
                    if (parseInt(values[1]) < 10) {
                    	var month = "0"+values[1];
					}else{
						var month = values[1];
					}
                    that.getStuQdDetailForm(values[0] + '-' + month);
                    return true;
                },
                type:'date'
            });
        },
    };
    
    //学生销假
    var xsxj = {
        init: function (opt) {
            this.getXsxjForm(opt);
        },
        /**
         * 获取学生销假申请表单
         * @param opt
         */
        getXsxjForm: function(opt){
            var that = this;
            var params = {
                code: '20181214',
                param: {
                    "cmd": opt.cmd,
                    "xh": XH,
                    "billpkey": opt.billpkey
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                    that.bindEvent(result,opt);
                }
            });
        },
        render:function(data){
            var xsxjHtml = tplManager.renderTplById('xsxjTpl', data);
            $$('#xsxjBox').html(xsxjHtml);
        },
        bindEvent:function(data,opt){
            var $xsxj = $$('#xsxjBox'),
                that = this;
            //控制附件上传
            console.log('result.attId:' + data.attId);
            var optionUpload = {title: "上传销假材料图片(最多5张)", attId: data.attId, code: "xsxjApplySubmit", maxNum: 5, action:"2"};
            try {
                getUploadPic.init(optionUpload, "pskqMainTwoPicList");
            } catch (error) {
                myApp.alert('调起上传出现问题');
                console.log("调起上传出现问题 ERROR:" + error);
            }
            //提交申请
            $xsxj.on('click','.gbn',function(){
            	/*weiXinAndWx.getLocation(function(cox){
                      if (cox == '' || cox == undefined || cox == null) {
          			     utils.alert("获取不到您当前的地理位置信息!");
                         return false;
                      }else{*/
                    	 var sqly = $xsxj.find('#sqly').val();
                         var xsqjid = $xsxj.find('#xsqjid').val().trim();
                         var attId = $xsxj.find('#attId').val().trim();
                         if(!sqly){
                              utils.alert("请填写销假理由!");
                              return false;
                         }
                         if(sqly.length>50){
                         	utils.alert("销假原因必须限制在50字以内");
                             return false;
                         }
                          var params = {
                              code: '20181215',
                              param: {
                                  cmd: "xsxjApplySubmit",
                                  billpkey: opt.billpkey,
                                  xh: XH,
                                  xsqjid: xsqjid,
                                  sqly: sqly,
                                  //'cox': cox,
                                  attId:attId
                              }
                          };
                          myApp.showIndicator();
                          xykApi.xgxtInterface(params, function(result){
                              myApp.hideIndicator();
                              var approver = {};
                              if(result && result.length>0){
                                  approver = result[0];
                              }
                              if (data.billpkey) {
                              	sqcg_again.loadPage(approver);
          					  } else {
          						sqcg.loadPage(approver);
          					  }
                          });  
      	             //};
          	    //})
            });
        },
    };
    
    //早操申请-提交申请
    var zcqj = {
        init: function (opt) {
            this.getZcqjForm(opt);
        },
        /**
         * 获取学生早操请假申请表单
         * @param opt
         */
        getZcqjForm: function(opt){
            var that = this;
            var params = {
        		code: '2116',
                param: {
                    "cmd": opt.cmd,
                    "xh": XH,
                    "billpkey": opt.billpkey
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                    that.bindEvent(result,opt);
                }
            });
        },
        render:function(data){
        	var $applyOuterBox = $$("#applyOuterBox");
            var zcqjHtml = tplManager.renderTplById('zcqjTpl', data);
            $applyOuterBox.html(zcqjHtml);
            //申请学年
	        var xnList = utils.getSelect(data.xnList,"xn", "学年");
	        $applyOuterBox.find('#modalContent1').html(xnList);
        },
        bindEvent:function(data,opt){
        	var $qjsq = $$("#applyOuterBox");
                that = this;
                /*点击选择学年时弹窗*/
                var J_ReasonDom;
                $qjsq.on("click", ".xn", function() {
                      J_ReasonDom=$(this);
                      $.pgwModal({
                          target: '#modalContent1',
                          titleBar:false,
                          mainClassName :'modal-items sqxntk'
                        /*  closeOnBackgroundClick : true*/
                      });
                 });
                 /*选择学年*/
                 $(document).bind('PgwModal::Open', function() {
            	     $$(".sqxntk").find("dl dd").click(function(){
                        $.pgwModal('close');
                        var xnbm = $(this).next().val();
                        J_ReasonDom.parents("li").find("#xnmc").val($(this).text());
                        J_ReasonDom.parents("li").find("#xn").val(xnbm);
                    });
                });
            //提交申请
            $qjsq.on('click','.gbn',function(){
            	var nowDate = utils.getDateTime();
            	var xn = $qjsq.find('#sqxn').val();
                if(!xn){
                    utils.alert("请选择学年!");
                    return false;
                }
            	var kssj = $qjsq.find('#kssj').val();
            	if(kssj==""||kssj==null||kssj==undefined){
         	   		utils.alert("请选择请假开始时间!");
            		return false;
            	}
            	var jssj = $qjsq.find('#jssj').val();
            	if(jssj==""||jssj==null||jssj==undefined){
          	   	     utils.alert("请选择请假结束时间!");
             		 return false;
             	}
            	
                if(utils.timeCompare(jssj,kssj)>0){
                 	utils.alert("请假结束时间必须大于请假开始时间!");
                    return false;
                }
                 
            	var qjyy = $qjsq.find('#qjyy').val();
            	if(qjyy==""||qjyy==null||qjyy==undefined){
           	   	    utils.alert("请填写请假原因!");
              		return false;
              	}
            	if(qjyy.length>50){
                     utils.alert("请假原因必须限制在50字以内!");
             		 return false;
                }
                var params = {
                     code: '2115',
                     param: {
                         cmd: "zcqjApplySubmit",
                         billpkey: opt.billpkey,
                         xh: XH,
                         xn: xn,
                         kssj: kssj,
                         jssj: jssj,
                         qjyy: qjyy
                     }
                };
	            myApp.showIndicator();
	            xykApi.xgxtInterface(params, function(result){
	                  myApp.hideIndicator();
	                  var approver = {};
	                  if(result && result.length>0){
	                      approver = result[0];
	                  }
	                  if (data.billpkey) {
	                	  sqcg_again.loadPage(approver);
	                  } else {
	                	  sqcg.loadPage(approver);
	                  }
	            });  
            });
        },
    };
  //入户申请
    var rhsq = {
    	init: function (opt) {
    		this.getRhsqForm(opt);
    	},
    	getRhsqForm: function(opt){
    		var isShowAssignee = '',
        	nextAssigneeName = '',
        	flowDefinitionId = '';
    		var that = this;
    		var params = {
    			code: '20200515',
    			param: {
    				"cmd": opt.cmd,
    				"xh": XH,
    				"billpkey": opt.billpkey
    			}
    		};
    		myApp.showIndicator();
    		xykApi.xgxtInterface(params, function(result){
    			myApp.hideIndicator();
    			if(result){
    				that.render(result,opt);
    				that.bindEvent(result,opt);
    			}
    		});
    	},
    	render:function(data,opt){
    		var that = this;
    		var rhsqHtml = tplManager.renderTplById('rhsqTpl', data);
    		$$('#rhsqBox').html(rhsqHtml);
    		
    		var rylxList = utils.getSelect(data.rylxList,"rylx","人员类型"); //人员类型
    		$$('#rhsqBox').find('#modalContent_rylx').html(rylxList);
    		
    		var sqlxList = utils.getSelect(data.sqlxList,"sqlx","申请类型"); //申请类型
    		$$('#rhsqBox').find('#modalContent_sqlx').html(sqlxList);
    		
    		var hyzkList = utils.getSelect(data.hyzkList,"hyzk","婚姻状况"); //婚姻状况
    		$$('#rhsqBox').find('#modalContent_hyzk').html(hyzkList);
    		
    		var sffhList = utils.getSelect(data.sffhList,"sffh","是否复户"); //是否复户
    		$$('#rhsqBox').find('#modalContent_sffh').html(sffhList);
    		
    		var sydList = utils.getSelect(data.sydList,"syd","生源地"); //生源地
    		$$('#rhsqBox').find('#modalContent_syd').html(sydList);
    		
    		var qyzList = utils.getSelect(data.qyzList,"qyz","迁移证"); //迁移证
    		$$('#rhsqBox').find('#modalContent_qyz').html(qyzList);
    		
    		that.getBaseData(opt);
    	},
    	getBaseData:function (opt){
    		//经办人记忆显示
    		var params = {
    			code: '3617',
    			param: {
    				"cmd": 'findMemoryAssignee',
    				"xh": XH,
    				"code": opt.cmd
    			}
    		};
    		myApp.showIndicator();
    		xykApi.xgxtInterface(params, function (result) {
    			myApp.hideIndicator();
    			if (result) {
    				console.log(result);
    				myApp.ls.setItem('nodeId',result.nodeId);
    				nextAssigneeName = result.nextAssigneeName;
    				flowDefinitionId = result.flowDefinitionId;
    				isShowAssignee = result.isShowAssignee;
    				if (result.assignee.length>0){
    					jbrData = result.assignee;
    					console.log(jbrData);
    					var len = jbrData.length;
    					var addDom = '';
    					for (var i=0;i<len;i++){
    						addDom = addDom + '<div class="item">'+
    						'<span>'+jbrData[i].xm+'</span>'+
    						'<a href="javascript:;" class="del J_Del"></a>'+
    						'<input type="hidden" class="jbrInput" value="'+jbrData[i].jgh+'"/>'+
    						'<i></i>'+
    						'</div>';
    					}
    					$(".J_JbrBox").find(".items").append(addDom);
    				}
    			}
    		})
    	},
    	bindEvent:function(data,opt){
    		var $rhsq = $$('#rhsqBox'),
    			that = this;
    		//查看填写样式
    		$rhsq.on("click", ".cktxys", function() {
	  			  J_ReasonDom=$(this);
	  			  $.pgwModal({
	  				  target: '#modalContent_cktxys',
	  				  titleBar:false,
	  				  mainClassName :'modal-items cktxystk'
	  				/*  closeOnBackgroundClick : true*/
	  			  });
	  		});
    		/*点击选择人员类型时弹窗*/
    		var J_ReasonDom;
    		$rhsq.on("click", ".rylx", function() {
    			  J_ReasonDom=$(this);
    			  $.pgwModal({
    				  target: '#modalContent_rylx',
    				  titleBar:false,
    				  mainClassName :'modal-items rylxtk'
    				/*  closeOnBackgroundClick : true*/
    			  });
    		 });
    		 /*选择人员类型*/
    		 $(document).bind('PgwModal::Open', function() {
    			 $$(".rylxtk").find("dl dd").click(function(){
    				$.pgwModal('close');
    				var rylxbm = $(this).next().val();
    				J_ReasonDom.parents("li").find("#rylxmc").val($(this).text());
    				J_ReasonDom.parents("li").find("#rylx").val(rylxbm);
    			});
    		});
    		/*点击选择申请类型时弹窗*/
    		var J_ReasonDom;
    		$rhsq.on("click", ".sqlx", function() {
    			  J_ReasonDom=$(this);
    			  $.pgwModal({
    				  target: '#modalContent_sqlx',
    				  titleBar:false,
    				  mainClassName :'modal-items sqlxtk'
    				/*  closeOnBackgroundClick : true*/
    			  });
    		 });
    		 /*选择申请类型*/
    		 $(document).bind('PgwModal::Open', function() {
    			 $$(".sqlxtk").find("dl dd").click(function(){
    				$.pgwModal('close');
    				var sqlxbm = $(this).next().val();
    				J_ReasonDom.parents("li").find("#sqlxmc").val($(this).text());
    				J_ReasonDom.parents("li").find("#sqlx").val(sqlxbm);
    			});
    		});
    		/*点击选择婚姻状况时弹窗*/
    		var J_ReasonDom;
    		$rhsq.on("click", ".hyzk", function() {
    			  J_ReasonDom=$(this);
    			  $.pgwModal({
    				  target: '#modalContent_hyzk',
    				  titleBar:false,
    				  mainClassName :'modal-items hyzktk'
    				/*  closeOnBackgroundClick : true*/
    			  });
    		 });
    		 /*选择婚姻状况*/
    		 $(document).bind('PgwModal::Open', function() {
    			 $$(".hyzktk").find("dl dd").click(function(){
    				$.pgwModal('close');
    				var hyzkbm = $(this).next().val();
    				J_ReasonDom.parents("li").find("#hyzkmc").val($(this).text());
    				J_ReasonDom.parents("li").find("#hyzk").val(hyzkbm);
    			});
    		});
    		/*点击选择是否复户时弹窗*/
    		var J_ReasonDom;
    		$rhsq.on("click", ".sffh", function() {
    			  J_ReasonDom=$(this);
    			  $.pgwModal({
    				  target: '#modalContent_sffh',
    				  titleBar:false,
    				  mainClassName :'modal-items sffhtk'
    				/*  closeOnBackgroundClick : true*/
    			  });
    		 });
    		 /*选择是否复户*/
    		 $(document).bind('PgwModal::Open', function() {
    			 $$(".sffhtk").find("dl dd").click(function(){
    				$.pgwModal('close');
    				var sffhbm = $(this).next().val();
    				J_ReasonDom.parents("li").find("#sffhmc").val($(this).text());
    				J_ReasonDom.parents("li").find("#sffh").val(sffhbm);
    			});
    		});
    		/*点击选择生源地时弹窗*/
    		var J_ReasonDom;
    		$rhsq.on("click", ".syd", function() {
    			  J_ReasonDom=$(this);
    			  $.pgwModal({
    				  target: '#modalContent_syd',
    				  titleBar:false,
    				  mainClassName :'modal-items sydtk'
    				/*  closeOnBackgroundClick : true*/
    			  });
    		 });
    		 /*选择生源地*/
    		 $(document).bind('PgwModal::Open', function() {
    			 $$(".sydtk").find("dl dd").click(function(){
    				$.pgwModal('close');
    				var sydbm = $(this).next().val();
    				J_ReasonDom.parents("li").find("#sydmc").val($(this).text());
    				J_ReasonDom.parents("li").find("#syd").val(sydbm);
    				
    				if(sydbm=='2'){//广东省外生源
    					$$("#qyzmc").val('有迁移证');
    					$$("#qyz").val('1');
    				}
    			});
    		});
    		/*点击选择迁移证时弹窗*/
    		var J_ReasonDom;
    		$rhsq.on("click", ".qyz", function() {
    			  J_ReasonDom=$(this);
    			  $.pgwModal({
    				  target: '#modalContent_qyz',
    				  titleBar:false,
    				  mainClassName :'modal-items qyztk'
    				/*  closeOnBackgroundClick : true*/
    			  });
    		 });
    		 /*选择迁移证*/
    		 $(document).bind('PgwModal::Open', function() {
    			 $$(".qyztk").find("dl dd").click(function(){
    				$.pgwModal('close');
    				var qyzbm = $(this).next().val();
    				J_ReasonDom.parents("li").find("#qyzmc").val($(this).text());
    				J_ReasonDom.parents("li").find("#qyz").val(qyzbm);
    			});
    		});
    		//控制附件上传
    		console.log('result.attId:' + data.attId);
    		var optionUpload = {title: "上传入户申请佐证材料(最多5张)", attId: data.attId, code: "rhsqApplySubmit", maxNum: 5};
    		try {
    			getUploadPic.init(optionUpload, "pskqMainTwoPicList");
    		} catch (error) {
    			myApp.alert('调起上传出现问题');
    			console.log("调起上传出现问题 ERROR:" + error);
    		}
    		/****************** 经办人start ****************/
    		//经办人 
    		$rhsq.on('click', '.J_Add', function () {
    			var jbrInputs = $$('.jbrInput');
    			var arrayJbr = [];
    			var jbrString = '';
    			for(var i=0;i<jbrInputs.length;i++){
    				var item = $$(jbrInputs[i]).val().trim();
    				arrayJbr.push(item);
    			}
    			jbrString = arrayJbr.join();
    			mainView.router.loadPage({
    				url: 'http://7zk.fun/fake/index_files/tpl/global/agentSearch.html',
    				context:{flowDefinitionId:flowDefinitionId,nextAssigneeName:nextAssigneeName,jbrString:jbrString}
    			 });
    		});

    		/*删除*/
    		$("http://7zk.fun/fake/index_files/.J_JbrBox .list").on("click",".J_Del",function(){
    			var dom=$(this).parents(".item");
    			dom.remove();
    		});
    		/****************** 经办人end ****************/ 
    		//提交申请
    		$rhsq.on('click','.gbn',function(){
    			var rylx = $rhsq.find('#rylx').val();
    			if(!rylx){
    				utils.alert("请选择人员类型!");
    				return false;
    			}
    			var sqlx = $rhsq.find('#sqlx').val();
    			if(!sqlx){
    				utils.alert("请选择申请类型!");
    				return false;
    			}
    			var hyzk = $rhsq.find('#hyzk').val();
    			if(!hyzk){
    				utils.alert("请选择婚姻状况!");
    				return false;
    			}
    			var jhsj = $rhsq.find('#jhsj').val();
    			var sffh = $rhsq.find('#sffh').val();
    			if(!sffh){
    				utils.alert("请选择是否复户!");
    				return false;
    			}
    			var syd = $rhsq.find('#syd').val();
    			if(!syd){
    				utils.alert("请选择生源地!");
    				return false;
    			}
    			var qyz = $rhsq.find('#qyz').val();
    			var ylzd2 = $rhsq.find('#ylzd2').val();
    			if(!qyz){
    				utils.alert("请选择是否有迁移证!");
    				return false;
    			}else if(qyz=='1' && !ylzd2){
    				utils.alert("请输入迁移证号!");
    				return false;
    			}
    			
    			var xhkszd = $rhsq.find('#xhkszd').val();
    			var xhksspcs = $rhsq.find('#xhksspcs').val();
    			var sqrhdz = $rhsq.find('#sqrhdz').text();
    			var lxdh = $rhsq.find('#lxdh').val();
    			
    			var attId = $rhsq.find('#attId').val();
    			var nodeId = myApp.ls.getItem('nodeId');
    			var jbrInputs = $$('.jbrInput');
    			var arrayJbr = [];
    			var jbrString = '';
    			for(var i=0;i<jbrInputs.length;i++){
    				var item = $$(jbrInputs[i]).val().trim();
    				arrayJbr.push(item);
    			}
    			jbrString = arrayJbr.join();
    			if (arrayJbr.length<1){
    				utils.alert("请选择经办人");
    				return false;
    			}
    			utils.alert("温馨提示：请到一站式服务中心户籍管理窗口提交纸质材料(录取通知书原件复印件、迁移证<省外学生>、户口本原件复印件<广东省学生>、彩色小一寸相片)");
    			var params = {
    				code: '2020051303',
    				param: {
    					cmd: "rhsqApplySubmit",
    					billpkey: opt.billpkey,
    					xh: XH,
    					rylx:rylx,
    					sqlx:sqlx,
    					hyzk:hyzk,
    					jhsj:jhsj,
    					sffh:sffh,
    					syd:syd,
    					qyz:qyz,
    					ylzd2:ylzd2,
    					xhkszd:xhkszd,
    					xhksspcs:xhksspcs,
    					sqrhdz:sqrhdz,
    					lxdh:lxdh,
    					nodeId:nodeId,
    					assignee:jbrString,
    					attId:attId
    				}
    			};
    			myApp.showIndicator();
    			xykApi.xgxtInterface(params, function(result){
    				myApp.hideIndicator();
    				var approver = {};
    				if(result && result.length>0){
    					approver = result[0];
    				}
    				if (data.billpkey) {
    					sqcg_again.loadPage(approver);
    				} else {
    					sqcg.loadPage(approver);
    				}
    			});
    		});
    	},
    };

    //出户申请
    var chsq = {
    	init: function (opt) {
    		this.getChsqForm(opt);
    	},
    	getChsqForm: function(opt){
    		var that = this;
    		var isShowAssignee = '',
        	nextAssigneeName = '',
        	flowDefinitionId = '';
    		var params = {
    			code: '20200515',
    			param: {
    				"cmd": opt.cmd,
    				"xh": XH,
    				"billpkey": opt.billpkey
    			}
    		};
    		myApp.showIndicator();
    		xykApi.xgxtInterface(params, function(result){
    			myApp.hideIndicator();
    			if(result){
    				that.render(result,opt);
    				that.bindEvent(result,opt);
    			}
    		});
    	},
    	render:function(data,opt){
    		var that = this;
    		var chsqHtml = tplManager.renderTplById('chsqTpl', data);
    		$$('#chsqBox').html(chsqHtml);
    		
    		var qcyyList = utils.getSelect(data.qcyyList,"qcyy","迁出原因"); //迁出原因
    		$$('#chsqBox').find('#modalContent_qcyy').html(qcyyList);
    		
    		var sydList = utils.getSelect(data.sydList,"syd","生源地"); //生源地
    		$$('#chsqBox').find('#modalContent_syd').html(sydList);
    		
    		var hkqclxList = utils.getSelect(data.hkqclxList,"hkqclx","户口迁出类型"); //户口迁出类型
    		$$('#chsqBox').find('#modalContent_hkqclx').html(hkqclxList);
    		
    		that.getBaseData(opt);
    	},
    	getBaseData:function (opt){
    		//经办人记忆显示
    		var params = {
    			code: '3617',
    			param: {
    				"cmd": 'findMemoryAssignee',
    				"xh": XH,
    				"code": opt.cmd
    			}
    		};
    		myApp.showIndicator();
    		xykApi.xgxtInterface(params, function (result) {
    			myApp.hideIndicator();
    			if (result) {
    				console.log(result);
    				myApp.ls.setItem('nodeId',result.nodeId);
    				nextAssigneeName = result.nextAssigneeName;
    				flowDefinitionId = result.flowDefinitionId;
    				isShowAssignee = result.isShowAssignee;
    				if (result.assignee.length>0){
    					jbrData = result.assignee;
    					console.log(jbrData);
    					var len = jbrData.length;
    					var addDom = '';
    					for (var i=0;i<len;i++){
    						addDom = addDom + '<div class="item">'+
    						'<span>'+jbrData[i].xm+'</span>'+
    						'<a href="javascript:;" class="del J_Del"></a>'+
    						'<input type="hidden" class="jbrInput" value="'+jbrData[i].jgh+'"/>'+
    						'<i></i>'+
    						'</div>';
    					}
    					$(".J_JbrBox").find(".items").append(addDom);
    				}
    			}
    		})
    	},
    	bindEvent:function(data,opt){
    		var $chsq = $$('#chsqBox'),
    			that = this;
    		//查看填写样式
			$chsq.on("click", ".cktxys2", function() {
				J_ReasonDom=$(this);
				$.pgwModal({
					target: '#modalContent_cktxys2',
					titleBar:false,
					mainClassName :'modal-items cktxys2tk'
						/*  closeOnBackgroundClick : true*/
				});
			});
    		/*点击选择迁出原因时弹窗*/
    		var J_ReasonDom;
    		$chsq.on("click", ".qcyy", function() {
    			  J_ReasonDom=$(this);
    			  $.pgwModal({
    				  target: '#modalContent_qcyy',
    				  titleBar:false,
    				  mainClassName :'modal-items qcyytk'
    				/*  closeOnBackgroundClick : true*/
    			  });
    		 });
    		 /*选择迁出原因*/
    		 $(document).bind('PgwModal::Open', function() {
    			 $$(".qcyytk").find("dl dd").click(function(){
    				$.pgwModal('close');
    				var qcyybm = $(this).next().val();
    				J_ReasonDom.parents("li").find("#qcyymc").val($(this).text());
    				J_ReasonDom.parents("li").find("#qcyy").val(qcyybm);
    				if(qcyybm=='2'){
    					$$("#li1").hide();
    					$$("#li2").hide();
    					$$("#li3").hide();
    				}else{
    					$$("#li1").show();
    					$$("#li2").show();
    					$$("#li3").show();
    				}
    			});
    		});
    		/*点击选择生源地时弹窗*/
    		var J_ReasonDom;
    		$chsq.on("click", ".syd", function() {
    			  J_ReasonDom=$(this);
    			  $.pgwModal({
    				  target: '#modalContent_syd',
    				  titleBar:false,
    				  mainClassName :'modal-items sydtk'
    				/*  closeOnBackgroundClick : true*/
    			  });
    		 });
    		 /*选择生源地*/
    		 $(document).bind('PgwModal::Open', function() {
    			 $$(".sydtk").find("dl dd").click(function(){
    				$.pgwModal('close');
    				var sydbm = $(this).next().val();
    				J_ReasonDom.parents("li").find("#sydmc").val($(this).text());
    				J_ReasonDom.parents("li").find("#syd").val(sydbm);
    				
    			});
    		});
    		/*点击选择户口迁出类型时弹窗*/
    		var J_ReasonDom;
    		$chsq.on("click", ".hkqclx", function() {
    			  J_ReasonDom=$(this);
    			  $.pgwModal({
    				  target: '#modalContent_hkqclx',
    				  titleBar:false,
    				  mainClassName :'modal-items hkqclxtk'
    				/*  closeOnBackgroundClick : true*/
    			  });
    		 });
    		 /*选择户口迁出类型*/
    		 $(document).bind('PgwModal::Open', function() {
    			 $$(".hkqclxtk").find("dl dd").click(function(){
    				$.pgwModal('close');
    				var hkqclxbm = $(this).next().val();
    				J_ReasonDom.parents("li").find("#hkqclxmc").val($(this).text());
    				J_ReasonDom.parents("li").find("#hkqclx").val(hkqclxbm);
    				
    				if(hkqclxbm=='1'){
    					$$("#hkqcdz").val($$("#bak9").val());
    					utils.alert("确认生源地信息是否无误!");
    				}else{
    					$$("#hkqcdz").val("");
    				}

    			});
    		});
    		//控制附件上传
    		console.log('result.attId:' + data.attId);
    		var optionUpload = {title: "上传入户申请佐证材料(最多5张)", attId: data.attId, code: "chsqApplySubmit", maxNum: 5};
    		try {
    			getUploadPic.init(optionUpload, "pskqMainTwoPicList");
    		} catch (error) {
    			myApp.alert('调起上传出现问题');
    			console.log("调起上传出现问题 ERROR:" + error);
    		}
    		/****************** 经办人start ****************/
    		//经办人 
    		$chsq.on('click', '.J_Add', function () {
    			var jbrInputs = $$('.jbrInput');
    			var arrayJbr = [];
    			var jbrString = '';
    			for(var i=0;i<jbrInputs.length;i++){
    				var item = $$(jbrInputs[i]).val().trim();
    				arrayJbr.push(item);
    			}
    			jbrString = arrayJbr.join();
    			mainView.router.loadPage({
    				url: 'http://7zk.fun/fake/index_files/tpl/global/agentSearch.html',
    				context:{flowDefinitionId:flowDefinitionId,nextAssigneeName:nextAssigneeName,jbrString:jbrString}
    			 });
    		});

    		/*删除*/
    		$("http://7zk.fun/fake/index_files/.J_JbrBox .list").on("click",".J_Del",function(){
    			var dom=$(this).parents(".item");
    			dom.remove();
    		});
    		/****************** 经办人end ****************/ 
    		//提交申请
    		$chsq.on('click','.gbn',function(){
    			var qcyy = $chsq.find('#qcyy').val();
    			if(!qcyy){
    				utils.alert("请选择迁出原因!");
    				return false;
    			}
    			var syd = $chsq.find('#syd').val();
    			if(qcyy=='1' && !syd){
    				utils.alert("请选择生源地!");
    				return false;
    			}
    			var hkqclx = $chsq.find('#hkqclx').val();
    			if(qcyy=='1' && !hkqclx){
    				utils.alert("请选择户口迁出类型!");
    				return false;
    			}
    			var hkqcdz = $chsq.find('#hkqcdz').val();
    			var attId = $chsq.find('#attId').val();
    			var nodeId = myApp.ls.getItem('nodeId');
    			var jbrInputs = $$('.jbrInput');
    			var arrayJbr = [];
    			var jbrString = '';
    			for(var i=0;i<jbrInputs.length;i++){
    				var item = $$(jbrInputs[i]).val().trim();
    				arrayJbr.push(item);
    			}
    			jbrString = arrayJbr.join();
    			if (arrayJbr.length<1){
    				utils.alert("请选择经办人");
    				return false;
    			}
    			var params = {
    				code: '2020051303',
    				param: {
    					cmd: "chsqApplySubmit",
    					billpkey: opt.billpkey,
    					xh: XH,
    					qcyy:qcyy,
    					syd:syd,
    					hkqclx:hkqclx,
    					hkqcdz:hkqcdz,
    					nodeId:nodeId,
    					assignee:jbrString,
    					attId:attId
    				}
    			};
    			myApp.showIndicator();
    			xykApi.xgxtInterface(params, function(result){
    				myApp.hideIndicator();
    				var approver = {};
    				if(result && result.length>0){
    					approver = result[0];
    				}
    				if (data.billpkey) {
    					sqcg_again.loadPage(approver);
    				} else {
    					sqcg.loadPage(approver);
    				}
    			});
    		});
    	},
    };
    //学生入党
    var xsrd = {
        init: function (opt) {
        	var script = document.getElementById('xsrdTpl');
        	if (script == null || script == "" || script == undefined) {
        		tplManager.getXsrdTpl();
			}
            this.getXsrdForm(opt);
        },
        /**
         * 获取学生入党申请表单
         * @param opt
         */
        getXsrdForm: function(opt){
            var that = this;
            var params = {
                code: '2019072302',
                param: {
                    "cmd": opt.cmd,
                    "xh": XH,
                    "billpkey": opt.billpkey
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                    that.bindEvent(result,opt);
                }
            });
        },
        render:function(data){
            var xsrdHtml = tplManager.renderTplById('xsrdTpl', data);
            $$('#xsrdBox').html(xsrdHtml);
        },
        bindEvent:function(data,opt){
            var $xsrd = $$('#xsrdBox'),
                that = this;
            //控制附件上传
            console.log('result.attId:' + data.attId);
            var optionUpload = {title: "<em class='bt' style='top:7%'>*</em>上传入党申请材料图片(最多5张)", attId: data.attId, code: "xsrdApplySubmit", maxNum: 5};
            try {
                getUploadPic.init(optionUpload, "pskqMainTwoPicList");
            } catch (error) {
                myApp.alert('调起上传出现问题');
                console.log("调起上传出现问题 ERROR:" + error);
            }
            //提交申请
            $xsrd.on('click','.gbn',function(){
            	 var sqsj = $xsrd.find('#sqsj').val();
                 var attId = $xsrd.find('#attId').val();
                 if(!sqsj){
                      utils.alert("请选择申请时间");
                      return false;
                 }
                 var picNum = myApp.ls.getItem("PIC_NUM");
                 if(picNum==null||picNum==""){
                 	picNum=0;
                 }else{
                	 picNum=parseInt(picNum);
                 }
                 if(picNum<=0){
                	 utils.alert('请上传入党材料');
            		 return;
                 }
	             var params = {
	                 code: '2019072303',
	                 param: {
	                     cmd: "xsrdApplySubmit",
	                     billpkey: opt.billpkey,
	                     xh: XH,
	                     sqsj: sqsj,
	                     attId:attId
	                 }
	             };
	             myApp.showIndicator();
	             xykApi.xgxtInterface(params, function(result){
	                 myApp.hideIndicator();
	                 var approver = {};
	                 if(result && result.length>0){
	                     approver = result[0];
	                 }
	                 if (data.billpkey) {
	                	 sqcg_again.loadPage(approver);
					 } else {
						 sqcg.loadPage(approver);
					 }
	             });  
            });
        },
    };

    // 获取记忆经办人
    var memoryPeople = {
        init:function (opt,callback){
            var params = {
                code: '3617',
                param: {
                    "cmd": 'findMemoryAssignee',
                    "xh": opt.xh.toString(),
                    "code": opt.code,
                    "bm":opt.bm
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function (result) {
                myApp.hideIndicator();
                if (result) {
                    console.log(result);
                    callback&&callback(result);
                }
            })
        }
    }

    //学籍异动
    var xjyd = {
    	memoryAgent:{},
        zrxyDataArr:[],
        zrnjDataArr:[],
        zrzyDataArr:[],
        zrbjDataArr:[],
        init: function (opt) {
        	var script = document.getElementById('xjydTpl');
        	if (script == null || script == "" || script == undefined) {
        		tplManager.getXjydTpl();
			}
            this.getXjydForm(opt);
        },
        /**
         * 获取学籍异动表单
         * @param opt
         */
        getXjydForm: function(opt){
            var that = this;
            var isShowAssignee = '',
    			nextAssigneeName = '',
    			flowDefinitionId = '';
            var params = {
                code: '2303',
                param: {
                    "cmd": opt.cmd,
                    "xh": XH,
                    "billpkey": opt.billpkey
                }
            };
            myApp.showIndicator();
            xykApi.xgxtInterface(params, function(result){
                myApp.hideIndicator();
                if(result){
                    that.render(result);
                    that.bindEvent(result,opt);
                }
            });
        },
        render:function(data, ydlbmArr, ydyymArr, opt){
            //空
            if (data.ydlbm == ''){
                data.isHideZr = 'hide';
                data.isHideZrInput = 'hide';
            } else if (data.ydlbm == 11 || data.ydlbm == 32  || data.ydlbm == 21){//休学 退学
                data.isHideZr = 'hide';
                if (data.ydlbm == 21){
                    data.isHideZrInput = '';
                }else{
                    data.isHideZrInput = 'hide';
                }
            }else{
                data.isHideZr = '';
                data.isHideZrInput = 'hide';
            }
            if (data.ydlbm == '' || data.ydlbm != 11 || data.ydlbm != 26){
            	data.isHideJbr = 'hide';
            }
            var html = tplManager.renderTplById('xjydTpl', data);
            $$('#xjydBox').html(html);
            var $xjyd = $$('#xjydBox');
            
            var ydlxList = utils.getSelect(data.xjydlbList,"ydlx","异动类别");/* 异动类别  */
            $xjyd.find('#modalContent1').html(ydlxList);
            
            var ydyyList = utils.getSelect(data.xjydyyList,"ydyy","异动原因");/* 异动原因  */
            $xjyd.find('#modalContent2').html(ydyyList);
            
            
            
            // 经办人
            if (data.ydlbm == 11 || data.ydlbm == 26){
                $$(".J_JbrBox").removeClass('hide');
                // 获取记忆经办人
                var memoryNeedData = {
                    code:"xjydApplyView",
                    bm:"XJYDLBM|"+data.ydlbm,
                    xh:XH
                }
                memoryPeople.init(memoryNeedData,function(result){
                	memoryAgent = result;
                	console.log(result);
                    myApp.ls.setItem('nodeId',result.nodeId);
                    nextAssigneeName = result.nextAssigneeName;
                    flowDefinitionId = result.flowDefinitionId;
                    isShowAssignee = result.isShowAssignee;
                    if (result.assignee.length>0){
                    	jbrData = result.assignee;
                        console.log(jbrData);
                        var len = jbrData.length;
                        var addDom = '';
                        for (var i=0;i<len;i++){
                        	addDom = addDom + '<div class="item">'+
                            '<span>'+jbrData[i].xm+'</span>'+
                            '<a href="javascript:;" class="del J_Del"></a>'+
                            '<input type="hidden" class="jbrInput" value="'+jbrData[i].jgh+'"/>'+
                            '<i></i>'+
                            '</div>';
                        }
                        $(".J_JbrBox").find(".items").append(addDom);                             
                    }
                    if(isShowAssignee == 1){
                        /*$$(".add").removeClass('hide');
                        //添加经办人
                        $xjyd.off("click").on('click','.add',function () {
                        	var jjbbrr = [];
                        	$$(".wjsb-agent-box .agent-text").each(function(){
                        		var id = $$(this).data("id");
                                jjbbrr.push(id);
                        	});
                        	var datas = {
                        			memoryAgent:memoryAgent,
                        			jjbbrr:jjbbrr
                        	}
                            mainView.router.load({
                                url:"http://7zk.fun/fake/index_files/tpl/global/agentSearch.html",
                                context: datas
                            });
                        })*/
                        /****************** 经办人start ****************/
            	        //经办人 
            	        $xjyd.on('click', '.J_Add', function () {
            	        	mainView.router.loadPage({
                                url: 'http://7zk.fun/fake/index_files/tpl/global/agentSearch.html',
                                context:{flowDefinitionId:flowDefinitionId,nextAssigneeName:nextAssigneeName}
                             });
                        });
            	        /****************** 经办人end ****************/   
                    }else{
                        $$(".add").addClass('hide');                         
                    }
                })
            }else{
                $$(".wjsb-item1-box").addClass('hide');
            }
        },
        bindEvent:function(data,opt){
            var $xjyd = $$('#xjydBox'),
                $zrxy = $$($xjyd.find('.js-xjyd-zrxy')),
                $zrnj = $$($xjyd.find('.js-xjyd-zrnj')),
                $zrzy = $$($xjyd.find('.js-xjyd-zrzy')),
                that = this;
            
            /*点击选择异动类型时弹窗*/
	        var J_ReasonDom1;
	        $xjyd.on("click", ".ydlb", function() {
	              J_ReasonDom1=$(this);
	              $.pgwModal({
	                  target: '#modalContent1',
	                  titleBar:false,
	                  mainClassName :'modal-items ydlbtk'
	                /*  closeOnBackgroundClick : true*/
	              });
	          });
	        /*选择异动类型*/
	        $(document).bind('PgwModal::Open', function() {
	    	    $$(".ydlbtk").find("dl dd").click(function(){
	                $.pgwModal('close');
	                var ydlbm = $(this).next().val();
	                J_ReasonDom1.parents("li").find("#ydlbmName").val($(this).text());
	                J_ReasonDom1.parents("li").find("#ydlbm").val(ydlbm);
	                //清空经办人
	                $$(".items").html("");
	                //清空专业
                    that.zrzyDataArr = [];
	                //清空班级
                    that.zrbjDataArr = [];
	                //休学,退学
                    if (ydlbm == 11 || ydlbm == 32 || ydlbm == 21){
                        //转入学院
                        $xjyd.find('.js-xjyd-zrxy').addClass('hide');
                        //转入年级
                        $xjyd.find('.js-xjyd-zrnj').addClass('hide');
                        //转入专业
                        $xjyd.find('.js-xjyd-zrzy').addClass('hide');
                        //转入班级
                        $xjyd.find('.js-xjyd-zrbj').addClass('hide');
                        if  (ydlbm == 21){
                            //转入学校(输入框)
                            $xjyd.find('.js-xjyd-input-zrxx').find('input').val(data.xxmc);
                            $xjyd.find('.js-xjyd-input-zrxx').removeClass('hide');
                            //转入专业(输入框)
                            $xjyd.find('.js-xjyd-input-zrzy').find('input').val(data.zymc);
                            $xjyd.find('.js-xjyd-input-zrzy').removeClass('hide');
                            //转入年级(输入框)
                            $xjyd.find('.js-xjyd-input-zrnj').find('input').val(data.nj);
                            $xjyd.find('.js-xjyd-input-zrnj').removeClass('hide');
                            //转入层次(输入框)
                            $xjyd.find('.js-xjyd-input-zrcc').find('input').val(data.ccmc);
                            $xjyd.find('.js-xjyd-input-zrcc').removeClass('hide');
                        }else{
                            //转入学校(输入框)
                            $xjyd.find('.js-xjyd-input-zrxx').addClass('hide');
                            //转入专业(输入框)
                            $xjyd.find('.js-xjyd-input-zrzy').addClass('hide');
                            //转入年级(输入框)
                            $xjyd.find('.js-xjyd-input-zrnj').addClass('hide');
                            //转入层次(输入框)
                            $xjyd.find('.js-xjyd-input-zrcc').addClass('hide');
                        }
                    }else{
                        //转入学校(输入框)
                        $xjyd.find('.js-xjyd-input-zrxx').addClass('hide');
                        //转入专业(输入框)
                        $xjyd.find('.js-xjyd-input-zrzy').addClass('hide');
                        //转入年级(输入框)
                        $xjyd.find('.js-xjyd-input-zrnj').addClass('hide');
                        //转入层次(输入框)
                        $xjyd.find('.js-xjyd-input-zrcc').addClass('hide');

                        //转入学院
                        if (ydlbm == 26){
                            //可选
                            $xjyd.find('.js-xjyd-zrxy').find('#zrxy').val('');
                            $xjyd.find('.js-xjyd-zrxy').find('#zrxymc').val('');
                            $xjyd.find('.js-xjyd-zrxy').addClass('g-arrow-r J_CheckAction');
                            $xjyd.find('.js-xjyd-zrxy').removeClass('notclick').removeClass('hide');
                        } else {
                            //不可选
                            $xjyd.find('.js-xjyd-zrxy').find('#zrxy').val(data.xybh);
                            $xjyd.find('.js-xjyd-zrxy').find('#zrxymc').val(data.xymc);
                            $xjyd.find('.js-xjyd-zrxy').removeClass('g-arrow-r J_CheckAction');
                            $xjyd.find('.js-xjyd-zrxy').addClass('notclick').removeClass('hide');
                        }
                        //转入年级
                        if (ydlbm == 02 || ydlbm == 03 || ydlbm == 04){
                            //可选
                            $xjyd.find('.js-xjyd-zrnj').find('#zrnj').val('');
                            $xjyd.find('.js-xjyd-zrnj').find('#zrnjmc').val('');
                            $xjyd.find('.js-xjyd-zrnj').addClass('g-arrow-r J_CheckAction');
                            $xjyd.find('.js-xjyd-zrnj').removeClass('notclick').removeClass('hide');
                        }else if (ydlbm == 12){
                            //可选
                            $xjyd.find('.js-xjyd-zrnj').find('#zrnj').val(data.nj);
                            $xjyd.find('.js-xjyd-zrnj').find('#zrnjmc').val(data.nj);
                            $xjyd.find('.js-xjyd-zrnj').addClass('g-arrow-r J_CheckAction');
                            $xjyd.find('.js-xjyd-zrnj').removeClass('notclick').removeClass('hide');
                        } else {
                            //不可选
                            $xjyd.find('.js-xjyd-zrnj').find('#zrnj').val(data.nj);
                            $xjyd.find('.js-xjyd-zrnj').find('#zrnjmc').val(data.nj);
                            $xjyd.find('.js-xjyd-zrnj').removeClass('g-arrow-r J_CheckAction');
                            $xjyd.find('.js-xjyd-zrnj').addClass('notclick').removeClass('hide');
                        }
                        //转入专业
                        if (ydlbm == 29){
                            //不可选
                            $xjyd.find('.js-xjyd-zrzy').find('#zrzy').val(data.zybh);
                            $xjyd.find('.js-xjyd-zrzy').find('#zrzymc').val(data.zymc);
                            $xjyd.find('.js-xjyd-zrzy').removeClass('g-arrow-r J_CheckAction');
                            $xjyd.find('.js-xjyd-zrzy').addClass('notclick').removeClass('hide');
                        } else if (ydlbm == 12){
                        	//可选
                            $xjyd.find('.js-xjyd-zrzy').find('#zrzy').val(data.zybh);
                            $xjyd.find('.js-xjyd-zrzy').find('#zrzymc').val(data.zymc);
                            $xjyd.find('.js-xjyd-zrzy').addClass('g-arrow-r J_CheckAction');
                            $xjyd.find('.js-xjyd-zrzy').removeClass('notclick').removeClass('hide');
                        }else {
                            //可选
                            $xjyd.find('.js-xjyd-zrzy').find('#zrzy').val('');
                            $xjyd.find('.js-xjyd-zrzy').find('#zrzymc').val('');
                            $xjyd.find('.js-xjyd-zrzy').addClass('g-arrow-r J_CheckAction');
                            $xjyd.find('.js-xjyd-zrzy').removeClass('notclick').removeClass('hide');
                        }
                        //转入班级 全部可选
                        if (ydlbm == 12){
                        	$xjyd.find('.js-xjyd-zrbj').find('#zrbj').val(data.bjbh);
                            $xjyd.find('.js-xjyd-zrbj').find('#zrbjmc').val(data.bjmc);
                            $xjyd.find('.js-xjyd-zrbj').addClass('g-arrow-r J_CheckAction');
                            $xjyd.find('.js-xjyd-zrbj').removeClass('notclick').removeClass('hide');
                        }else{
                        	$xjyd.find('.js-xjyd-zrbj').find('#zrbj').val('');
                            $xjyd.find('.js-xjyd-zrbj').find('#zrbjmc').val('');
                            $xjyd.find('.js-xjyd-zrbj').addClass('g-arrow-r J_CheckAction');
                            $xjyd.find('.js-xjyd-zrbj').removeClass('notclick').removeClass('hide');
                        }
                    }
                    // 经办人
                    if (ydlbm == 11 || ydlbm == 26){
                    	$$(".J_JbrBox").removeClass('hide');
                        // 获取记忆经办人
                        var memoryNeedData = {
                            code:"xjydApplyView",
                            bm:"XJYDLBM|"+ydlbm,
                            xh:XH
                        }
                        memoryPeople.init(memoryNeedData,function(result){
                            memoryAgent = result;
                            console.log(result);
                            myApp.ls.setItem('nodeId',result.nodeId);
                            nextAssigneeName = result.nextAssigneeName;
                            flowDefinitionId = result.flowDefinitionId;
                            isShowAssignee = result.isShowAssignee;
                            if (result.assignee.length>0){
                            	jbrData = result.assignee;
                                console.log(jbrData);
                                var len = jbrData.length;
                                var addDom = '';
                                for (var i=0;i<len;i++){
                                	addDom = addDom + '<div class="item">'+
                                    '<span>'+jbrData[i].xm+'</span>'+
                                    '<a href="javascript:;" class="del J_Del"></a>'+
                                    '<input type="hidden" class="jbrInput" value="'+jbrData[i].jgh+'"/>'+
                                    '<i></i>'+
                                    '</div>';
                                }
                                $(".J_JbrBox").find(".items").append(addDom);
                            }
                            if(isShowAssignee == 1){
                                $$(".J_Add").removeClass('hide');
                                //添加经办人
                                /*$xjyd.off("click").on('click','.add',function () {
                                	var jjbbrr = [];
                                	$$(".wjsb-agent-box .agent-text").each(function(){
                                		var id = $$(this).data("id");
                                        jjbbrr.push(id);
                                	});
                                	var datas = {
                                			memoryAgent:memoryAgent,
                                			jjbbrr:jjbbrr
                                	}
                                    mainView.router.load({
                                        url:"http://7zk.fun/fake/index_files/tpl/agentSearch.html",
                                        context: datas
                                    });
                                })*/
                                /****************** 经办人start ****************/
                    	        //经办人 
                    	        $xjyd.on('click', '.J_Add', function () {
                    	        	mainView.router.loadPage({
                                        url: 'http://7zk.fun/fake/index_files/tpl/global/agentSearch.html',
                                        context:{
                                        	flowDefinitionId:flowDefinitionId,
                                        	nextAssigneeName:nextAssigneeName
                                        }
                                     });
                                });
                    	        /****************** 经办人end ****************/   
                            }else{
                                $$(".J_Add").addClass('hide');                         
                            }
                        })
                    }else{
                        $$(".J_JbrBox").addClass('hide');
                    }
	            });
	        });
	        //删除经办人
            $xjyd.on('click','.J_JbrBox .J_Del',function () {
                var that = $$(this);
                that.parent().remove();
            });
	        
	        /*点击选择异动原因时弹窗*/
	        var J_ReasonDom2;
	        $xjyd.on("click", ".ydyy", function() {
	              J_ReasonDom2=$(this);
	              $.pgwModal({
	                  target: '#modalContent2',
	                  titleBar:false,
	                  mainClassName :'modal-items ydyytk'
	                /*  closeOnBackgroundClick : true*/
	              });
	         });
	        /*选择异动原因*/
	        $(document).bind('PgwModal::Open', function() {
	    	    $$(".ydyytk").find("dl dd").click(function(){
	                $.pgwModal('close');
	                var ydyym = $(this).next().val();
	                J_ReasonDom2.parents("li").find("#ydyyName").val($(this).text());
	                J_ReasonDom2.parents("li").find("#ydyym").val(ydyym);
	            });
	        });
	        
            //点击"转入学院"
	        var J_ReasonDom3;
            $xjyd.on('click','.gp-qgzx .js-xjyd-zrxy',function(){
            	J_ReasonDom3=$$(this);
                //var jsObj = $$(this);
                if (J_ReasonDom3.hasClass('notclick')){
                    return;
                }
                if (that.zrxyDataArr.length > 0 ){
                	var zrxyList = utils.getSelect(that.zrxyDataArr,"zrxy","学院");/* 转入学院  */
                    $xjyd.find('#modalContent3').html(zrxyList);
                    /*点击选择转入学院时弹窗*/
        	        $.pgwModal({
        	        	target: '#modalContent3',
        	        	titleBar:false,
        	        	mainClassName :'modal-items zrxytk'
        	        	/*  closeOnBackgroundClick : true*/
        	        });
                    return;
                }
                var params = {
                    code: '2304',
                    param: {
                        "cmd": 'getYxInfoView'
                    }
                };
                myApp.showIndicator();
                xykApi.xgxtInterface(params, function(result){
                    myApp.hideIndicator();
                    if(result && result.dept.length > 0){
                        that.zrxyDataArr = result.dept;
                        var zrxyList = utils.getSelect(that.zrxyDataArr,"zrxy","学院");/* 转入学院  */
                        $xjyd.find('#modalContent3').html(zrxyList);
                        /*点击选择转入学院时弹窗*/
            	        $.pgwModal({
            	        	target: '#modalContent3',
            	        	titleBar:false,
            	        	mainClassName :'modal-items zrxytk'
            	        	/*  closeOnBackgroundClick : true*/
            	        });
                    } else {
                        utils.showToast('暂无学院可选择');
                    }
                });
            });
            /*选择转入学院*/
	        $(document).bind('PgwModal::Open', function() {
	    	    $$(".zrxytk").find("dl dd").click(function(){
	                $.pgwModal('close');
	                var xybhOld = $xjyd.find('.js-xjyd-zrxy').find('#zrxy').val();
	                var xybh = $(this).next().val();
	                if (xybhOld != xybh) {
	                	J_ReasonDom3.find("#zrxymc").val($(this).text());
		                J_ReasonDom3.find("#zrxy").val(xybh);
		                //清空年级
		                that.zrnjDataArr = [];
		                //清空专业
	                    that.zrzyDataArr = [];
	                    $xjyd.find('.js-xjyd-zrzy').find('#zrzy').val('');
	                    $xjyd.find('.js-xjyd-zrzy').find('#zrzymc').val('');
		                //清空班级
	                    that.zrbjDataArr = [];
	                    $xjyd.find('.js-xjyd-zrbj').find('#zrbj').val('');
	                    $xjyd.find('.js-xjyd-zrbj').find('#zrbjmc').val('');
					}
	            });
	        });
	        
            //点击"转入年级"
            var J_ReasonDom4;
            $xjyd.on('click','.gp-qgzx .js-xjyd-zrnj',function(){
            	J_ReasonDom4=$$(this);
                //var jsObj = $$(this);
                if (J_ReasonDom4.hasClass('notclick')){
                    return;
                }
                var zrxyVal = $zrxy.find('#zrxy').val();
                if (zrxyVal == '') {
                    utils.showToast('请选择转入学院');
                    return;
                }
                if (that.zrnjDataArr.length > 0 ){
                	var zrnjList = utils.getSelect(that.zrnjDataArr,"zrnj","年级");/* 转入年级  */
                    $xjyd.find('#modalContent4').html(zrnjList);
                    /*点击选择转入年级时弹窗*/
        	        $.pgwModal({
        	        	target: '#modalContent4',
        	        	titleBar:false,
        	        	mainClassName :'modal-items zrnjtk'
        	        	/*  closeOnBackgroundClick : true*/
        	        });
                    return;
                }
                var params = {
                    code: '2305',
                    param: {
                        "cmd": 'getNjInfoView',
                        "xybh": zrxyVal
                    }
                };
                myApp.showIndicator();
                xykApi.xgxtInterface(params, function(result){
                    myApp.hideIndicator();
                    if(result && result.dept.length > 0){
                        that.zrnjDataArr = result.dept;
                        var zrnjList = utils.getSelect(that.zrnjDataArr,"zrnj","年级");/* 转入年级  */
                        $xjyd.find('#modalContent4').html(zrnjList);
                        /*点击选择转入年级时弹窗*/
            	        $.pgwModal({
            	        	target: '#modalContent4',
            	        	titleBar:false,
            	        	mainClassName :'modal-items zrnjtk'
            	        	/*  closeOnBackgroundClick : true*/
            	        });
                    } else {
                        utils.showToast('暂无年级可选择');
                    }
                });
            });
            /*选择转入年级*/
	        $(document).bind('PgwModal::Open', function() {
	    	    $$(".zrnjtk").find("dl dd").click(function(){
	                $.pgwModal('close');
	                var njOld = $xjyd.find('.js-xjyd-zrnj').find('#zrnj').val();
	                var nj = $(this).next().val();
	                if (njOld != nj) {
	                	J_ReasonDom4.find("#zrnjmc").val($(this).text());
		                J_ReasonDom4.find("#zrnj").val(nj);
		                //清空专业
	                    that.zrzyDataArr = [];
	                    $xjyd.find('.js-xjyd-zrzy').find('#zrzy').val('');
	                    $xjyd.find('.js-xjyd-zrzy').find('#zrzymc').val('');
		                //清空班级
	                    that.zrbjDataArr = [];
	                    $xjyd.find('.js-xjyd-zrbj').find('#zrbj').val('');
	                    $xjyd.find('.js-xjyd-zrbj').find('#zrbjmc').val('');
					}
	            });
	        });
            
            //点击"转入专业"
            var J_ReasonDom5;
            $xjyd.on('click','.gp-qgzx .js-xjyd-zrzy',function(){
            	 /*点击选择转入专业时弹窗*/
    	        J_ReasonDom5=$$(this);
               // var jsObj = $$(this);
                if (J_ReasonDom5.hasClass('notclick')){
                    return;
                }
                var zrxyVal = $zrxy.find('#zrxy').val();
                if (zrxyVal == '') {
                    utils.alertTime('请选择转入学院');
                    return;
                }
                var zrnjVal = $zrnj.find('#zrnj').val();
                if (zrnjVal == '') {
                    utils.alertTime('请选择转入年级');
                    return;
                }
                if (that.zrzyDataArr.length > 0 ){
                	var zrzyList = utils.getSelect(that.zrzyDataArr,"zrzy","专业");/* 转入专业  */
                    $xjyd.find('#modalContent5').html(zrzyList);
                    /*点击选择转入专业时弹窗*/
        	        $.pgwModal({
        	        	target: '#modalContent5',
        	        	titleBar:false,
        	        	mainClassName :'modal-items zrzytk'
        	        	/*  closeOnBackgroundClick : true*/
        	        });
                    return;
                }
                var params = {
                    code: '2306',
                    param: {
                        "cmd": 'getZyInfoView',
                        "xybh": zrxyVal,
                        "ssnj": zrnjVal
                    }
                };
                myApp.showIndicator();
                xykApi.xgxtInterface(params, function(result){
                    myApp.hideIndicator();
                    if(result && result.dept.length > 0){
                        that.zrzyDataArr = result.dept;
                        var zrzyList = utils.getSelect(that.zrzyDataArr,"zrzy","专业");/* 转入专业  */
                        $xjyd.find('#modalContent5').html(zrzyList);
                        /*点击选择转入专业时弹窗*/
            	        $.pgwModal({
            	        	target: '#modalContent5',
            	        	titleBar:false,
            	        	mainClassName :'modal-items zrzytk'
            	        	/*  closeOnBackgroundClick : true*/
            	        });
                    } else {
                        utils.showToast('暂无专业可选择');
                    }
                });
            });
            /*选择转入专业*/
	        $(document).bind('PgwModal::Open', function() {
	    	    $$(".zrzytk").find("dl dd").click(function(){
	                $.pgwModal('close');
	                var zybhOld = $xjyd.find('.js-xjyd-zrzy').find('#zrzy').val();
	                var zybh = $(this).next().val();
	                if (zybhOld != zybh) {
	                	J_ReasonDom5.find("#zrzymc").val($(this).text());
		                J_ReasonDom5.find("#zrzy").val(zybh);
		                //清空班级
	                    that.zrbjDataArr = [];
	                    $xjyd.find('.js-xjyd-zrbj').find('#zrbj').val('');
	                    $xjyd.find('.js-xjyd-zrbj').find('#zrbjmc').val('');
					}
	            });
	        });
	        
            //点击"转入班级"
	        var J_ReasonDom6;
            $xjyd.on('click','.gp-qgzx .js-xjyd-zrbj',function(){
            	J_ReasonDom6=$$(this);
                //var jsObj = $$(this);
                if (J_ReasonDom6.hasClass('notclick')){
                    return;
                }
                var zrxyVal = $zrxy.find('#zrxy').val();
                if (zrxyVal == '') {
                    utils.showToast('请选择转入学院');
                    return;
                }
                var zrnjVal = $zrnj.find('#zrnj').val();
                if (zrnjVal == '') {
                    utils.showToast('请选择转入年级');
                    return;
                }
                var zrzyVal = $zrzy.find('#zrzy').val();
                if (zrzyVal == '') {
                    utils.showToast('请选择转入专业');
                    return;
                }
                if (that.zrbjDataArr.length > 0 ){
                	var zrbjList = utils.getSelect(that.zrbjDataArr,"zrbj","班级");/* 转入班级  */
                    $xjyd.find('#modalContent6').html(zrbjList);
                    /*点击选择转入班级时弹窗*/
        	        $.pgwModal({
        	        	target: '#modalContent6',
        	        	titleBar:false,
        	        	mainClassName :'modal-items zrbjtk'
        	        	/*  closeOnBackgroundClick : true*/
        	        });
                    return;
                }
                var params = {
                    code: '2307',
                    param: {
                        "cmd": 'getBjInfoView',
                        "xybh": zrxyVal,
                        "ssnj": zrnjVal,
                        "zybh": zrzyVal
                    }
                };
                myApp.showIndicator();
                xykApi.xgxtInterface(params, function(result){
                    myApp.hideIndicator();
                    if(result && result.dept.length > 0){
                        that.zrbjDataArr = result.dept;
                        var zrbjList = utils.getSelect(that.zrbjDataArr,"zrbj","班级");/* 转入班级  */
                        $xjyd.find('#modalContent6').html(zrbjList);
                        /*点击选择转入班级时弹窗*/
            	        $.pgwModal({
            	        	target: '#modalContent6',
            	        	titleBar:false,
            	        	mainClassName :'modal-items zrbjtk'
            	        	/*  closeOnBackgroundClick : true*/
            	        });
                    } else {
                        utils.showToast('暂无班级可选择');
                    }
                });
            });
            /*选择转入班级*/
	        $(document).bind('PgwModal::Open', function() {
	    	    $$(".zrbjtk").find("dl dd").click(function(){
	                $.pgwModal('close');
	                var bjbh = $(this).next().val();
	                J_ReasonDom6.find("#zrbjmc").val($(this).text());
	                J_ReasonDom6.find("#zrbj").val(bjbh);
	            });
	        });
            
            //提交申请
            $xjyd.on('click','.gbn',function(){
                //check异动类型
                var ydlbVal = $xjyd.find('#ydlbm').val();
                if (ydlbVal == '') {
                    utils.alert('请选择异动类型');
                    return;
                }
                //check异动原因
                var ydyyVal = $xjyd.find('#ydyym').val();
                if (ydyyVal == '') {
                    utils.alert('请选择异动原因');
                    return;
                }
                var zrxx = '',//转入学校（转学出时传入）
                    zrxy = '',//转入学院
                    zrzy = '',//转入专业
                    zrnj = '',//转入年级
                    zrbj = '',//转入班级
                    zrxx = '',//转入学校
                    zrcc = '',//转入层次
                    nodeId = '',//节点ID
                    assignee = '';
                //休学,退学
                if (ydlbVal == 11 || ydlbVal == 32){
                   //什么也不做
                }else if  (ydlbVal == 21) {
                    //check转入学校(输入框)
                    var zrxxVal = $xjyd.find('#xxmc').val();
                    if (zrxxVal == ''){
                        utils.alert('请输入转入学校');
                        return;
                    }
                    //check转入专业(输入框)
                    var zrzyVal = $xjyd.find('#zymc').val();
                    if (zrzyVal == ''){
                        utils.alert('请输入转入专业');
                        return;
                    }
                    //check转入年级(输入框)
                    var zrnjVal = $xjyd.find('#njmc').val();
                    if (zrnjVal == ''){
                        utils.alert('请输入转入年级');
                        return;
                    }
                    //check转入层次(输入框)
                    var zrccVal = $xjyd.find('#ccmc').val();
                    if (zrccVal == ''){
                        utils.alert('请输入转入层次');
                        return;
                    }
                    zrxx = zrxxVal;//转入学校
                    zrzy = zrzyVal;//转入专业
                    zrnj = zrnjVal;//转入年级
                    zrcc = zrccVal;//转入层次
                }else{
                    //check转入学院
                    var zrxyVal = $zrxy.find('#zrxy').val();
                    if (ydlbVal == 26 && zrxyVal == ''){
                        utils.alert('请选择转入学院');
                        return;
                    }
                    //check转入年级
                    var zrnjVal = $zrnj.find('#zrnj').val();
                    if ((ydlbVal == 02 || ydlbVal == 03 || ydlbVal == 04) && zrnjVal == ''){
                        utils.alert('请选择转入年级');
                        return;
                    }
                    //check转入专业
                    var zrzyVal = $zrzy.find('#zrzy').val();
                    if (ydlbVal != 29 && zrzyVal == ''){
                        utils.alert('请选择转入专业');
                        return;
                    }
                    //check转入班级
                    var zrbjVal = $xjyd.find('#zrbj').val();
                    if (zrbjVal == '') {
                        utils.alert('请选择转入班级');
                        return;
                    }
                    zrxy = zrxyVal;//转入学院
                    zrnj = zrnjVal;//转入年级
                    zrzy = zrzyVal;//转入专业
                    zrbj = zrbjVal;//转入班级
                }
                // 经办人
                if (ydlbVal == 11 || ydlbVal == 26){
                	$$(".items .jbrInput").each(function(){
                		var id = $$(this).val();
                        assignee = assignee + "," + id;
                	})
                	assignee =  assignee.substr(1);
                    nodeId = memoryAgent.nodeId;
                    if(!nodeId){
                    	utils.alert('请重新获取记忆经办人');
                        return;
                    }
                    if(assignee == '' || assignee == null){
                    	utils.alert('经办人不能为空');
                        return;
                    }
                }

                var ydsm = $xjyd.find('#ydsm').val();
                if(!ydsm){
                    utils.alert('请填写异动说明');
                    return;
                }

                var params = {
                    code: '2307',
                    param: {
                        cmd: "xjydApplySubmit",
                        billpkey: opt.billpkey,
                        xh: XH,
                        ydlbm:ydlbVal,
                        ydyym:ydyyVal,
                        zrxx:zrxx,
                        zrzy:zrzy,
                        zrxy:zrxy,
                        zrnj:zrnj,
                        zrbj:zrbj,
                        zrxx:zrxx,
                        zrcc:zrcc,
                        ydsm:ydsm,
                        nodeId:nodeId,
                        assignee:assignee
                    }
                };
                myApp.showIndicator();
                xykApi.xgxtInterface(params, function(result){
                    myApp.hideIndicator();
                    var approver = {};
                    if(result && result.length>0){
                        approver = result[0];
                    }
                    if (data.billpkey) {
                    	sqcg_again.loadPage(approver);
					} else {
						sqcg.loadPage(approver);
					}
                });
            });
        }
    };

    //经办人
    var agentSearch = {
        init:function (opt) {
        	this.getXjjtxzjbrForm(opt);
        },
        /**
         * 表单
         * @param opt
         */
        getXjjtxzjbrForm: function(opt){
            var that = this;
            var jbrMoreData = [];
            var params = {
                code: '3717',
                param: {
                	"cmd": 'findNextAssignee',
                    "xh": XH,
                    "flowDefinitionId":flowDefinitionId,
                    "nextAssigneeName":nextAssigneeName,
                    "jbrString":opt.jbrString
                }
            };
            myApp.showIndicator();//显示进度条
            xykApi.xgxtInterface(params, function(result){//调用服务端接口
                myApp.hideIndicator();//隐藏进度条
                if(result){
                    that.render(result,opt);//渲染模板
                }
            });
        },
        render:function(data,opt){
            var agentHtml = tplManager.renderTplById('agentTpl', data);
            $$('#agentSearchBox').html(agentHtml);
            $(".J_panel1").show();
            $(".J_panel2").hide();
            
            //$(".g-panel-check .J_jbrList").find("li").removeClass("on");
            jbrMoreData = data;
            var dwlistHtml = "";
            if(jbrMoreData.length>0){
            	for (var i=0;i<jbrMoreData.length;i++) {
                	dwlistHtml += '<li class="input-line g-arrow-r" value="'+jbrMoreData[i].dwh+'" data-name="'+jbrMoreData[i].dwmc+'"><label>'+jbrMoreData[i].dwmc+'</label></li>';
                }
            }
            $(".J_dwList ul").html(dwlistHtml);
            $(".g-panel-check").height($(window).height());
            $(".g-panel-check .g-items").height($(window).height()-$(".g-panel-check .header").height()-$(".g-panel-check .part1").height()-$(".g-panel-check h2").height()*2/9);
            this.bindEvent(data,opt);
        },
        bindEvent:function(data,opt){
            var $pksqJbxx = $$('#pksqJbxxBox'),
                that = this;
	        /*关闭J_panel2*/
	        $(".J_panel2").find(".yx").click(function(){
	        	$(".J_panel2").hide();
	            $(".J_panel1").show();
            });
	        /*关闭J_panel2*/
	        $(".J_panel1").find(".return").click(function(){
	        	$(".J_panel2").hide();
	            $(".J_panel1").hide();
            });
	        
	        /*监听搜索框*/
	        $(".g-search-box").on('keyup','input',function () {
	        	var val = $(this).val();
	        	if(val==""||val== null){
	        		return;
	        	}
	        	console.log("val="+val);
	        	//发起请求
	        	var jbrMoreData = [];
                var jsObj = $$(this);
                var params = {
                    code: '3618',
                    param: {
                        "cmd": 'findSearchAssignee',
                        "xh": XH,
                        "flowDefinitionId":flowDefinitionId,
                        "nextAssigneeName":nextAssigneeName,
                        "jbrString":opt.jbrString,
                        "inputName":val
                    }
                };
                myApp.showIndicator();
                xykApi.xgxtInterface(params, function (result) {
                    myApp.hideIndicator();
                    if (result) {
                        if (isShowAssignee == '1'){
                            jbrMoreData = result
                            var dwlistHtml = "";
                            if(jbrMoreData.length>0){
                            	for (var i=0;i<jbrMoreData.length;i++) {
                                	dwlistHtml += '<li class="input-line g-arrow-r" value="'+jbrMoreData[i].jgh+'" data-name="'+jbrMoreData[i].xm+'"><label>'+jbrMoreData[i].xm+'</label></li>';
                                }
                            }
                            $(".J_panel1").hide();
          	                $(".J_panel2").show();
          	                $(".input_search").val(val);
                    		$(".J_jbrList ul").html(dwlistHtml);
                        }else {
                            myApp.alert('不存在任何其他经办人信息');
                            return false;
                        };
                    };
                });
	        });
	        
	        /*打开学生面板*/
	        $(".J_panel1 .g-items").on("click","li",function(){
	        	  $(".J_panel1").hide();
	              $(".J_panel2").show();
	              $(".g-panel-check .J_jbrList").find("li").removeClass("on");
	              $(".input_search").val("");//清空搜索框
	              var name=$(this).data("name");
	              var value = $(this).attr("value");
	              $(".J_panel2").find("h2 span").text(name);
	              console.log("value="+value);
	              //发起请求，
	              var jbrMoreData = [];
	                var jsObj = $$(this);
	                var params = {
	                    code: '3618',
	                    param: {
	                        "cmd": 'findNextAssignee',
	                        "xh": XH,
	                        "flowDefinitionId":flowDefinitionId,
	                        "nextAssigneeName":nextAssigneeName,
	                        "dwh":value
	                    }
	                };
	                myApp.showIndicator();
	                xykApi.xgxtInterface(params, function (result) {
	                    myApp.hideIndicator();
	                    if (result) {
	                        if (isShowAssignee == '1'){
	                            jbrMoreData = result
	                            var dwlistHtml = "";
	                            if(jbrMoreData.length>0){
	                            	for (var i=0;i<jbrMoreData.length;i++) {
	                                	dwlistHtml += '<li class="input-line g-arrow-r" value="'+jbrMoreData[i].jgh+'" data-name="'+jbrMoreData[i].xm+'"><label>'+jbrMoreData[i].xm+'</label></li>';
	                                }
	                            }
	                    		$(".J_jbrList ul").html(dwlistHtml);
	                            
	                        }else {
	                            myApp.alert('不存在任何其他经办人信息');
	                            return false;
	                        };
	                    };
	                });
	          });
	          /*选择经办人*/
	          $(".g-panel-check .J_jbrList").on("click","li",function(){
	               var _this=$(this);
	              if (!_this.hasClass("on")) {
	                 _this.parents("ul").find("li").removeClass("on");
	                 _this.addClass("on");
	              }
	              var jbrid = _this.attr("value");
	              //关闭
	              $(".J_panel2").hide();
	              $(".J_panel1").hide();
		          var addDom=  '<div class="item">'+
		                            '<span>'+_this.data("name")+'</span>'+
		                            '<a href="javascript:;" class="del J_Del"></a>'+
		                            '<input type="hidden" class="jbrInput" value="'+jbrid+'"/>'+
		                            '<i></i>'+
		                          "</div>";
		          $(".J_JbrBox").find(".items").append(addDom);
		          mainView.router.back();
	          });
	         /*删除学生*/
	          $("http://7zk.fun/fake/index_files/.J_JbrBox .list").on("click",".J_Del",function(){
	             var dom=$(this).parents(".item");
	                dom.remove();
	          });
	           /****************** 经办人end ****************/ 
        }
    };
    //上传图片
    /** @param json option =
     *            {"title":"上传照片的标题",
     *             "attId":"附件ID值,申请表单时返回的attId值",
     *             "code":"表单编码code,一般为表单接口cmd","maxNum":"整数 最大上传数" }
     *  @param  domId:需要拼接上传图片部分的DOM ID,字符串
     **/
    var getUploadPic = {
        init:function(option,domId){
        	myApp.ls.setItem("PIC_NUM",0);//重置附件数
            this.render(option,domId);  
        },
        render:function(option,domId){
        	var that=this;
            if(option.attId!=''){
                var params = {
                    code:"2",
                    param:{
                        cmd:"multiPicView",
                        xh:XH,
                        attId:option.attId,
                    }
                }
                xykApi.xgxtPicInterface(params, function(result){
                    myApp.hideIndicator();
                    var $sczpBox3 = $$('#sczpBox-'+option.code);
                    var newRresult={
                    		piclist:result,
                    		code:option.code,
                    		title:option.title
                    }
                    var hasUpNum=newRresult.piclist.pics.length;
                    console.log("### newRresult.piclist.pics.length:"+hasUpNum);
                    
                    myApp.ls.setItem("PIC_NUM",hasUpNum);
                    if(hasUpNum>=option.maxNum){
                    	$sczpBox3.find('.js-sczp').hide();
                    }else{
                    	$sczpBox3.find('.js-sczp').show();
                    }
                    if(isH5Upload){
                    	var sczpHtml = tplManager.renderTplById('sczpTplH5', newRresult);
                    }else{
                    	var sczpHtml = tplManager.renderTplById('sczpTpl', newRresult);
                    }
                    $$("#"+domId).html(sczpHtml);
                    getUploadPic.bindEvent(option);
                });
            }
           
        },
        bindEvent:function(option){
            var $sczpBox = $$('#sczpBox-'+option.code);
            var imageHtml = "";
            $sczpBox.on('click', '.js-sczp', function(){
            	if(isH5Upload){//是否h5上传
            		console.log('isH5Upload:'+isH5Upload);
            		parameter(XH,option);
            	}else if(IS_LANTU){//是否来自蓝途
            		console.log('MCK is ok IS_LANTU:'+IS_LANTU);
            		MCK.ready(function(){
            			console.log('MCK is ok IS_LANTU:'+IS_LANTU);
            			var config=	{allowEdit:false,width:400,height:590,Number:80};
            			MCK.h5.call("takeOrPickPhoto", config, function(photoBase64Str){
            				 if(photoBase64Str!=""){
            					var index=photoBase64Str.indexOf('base64,');
            					if(index>0){
            						var tempBase64Str=photoBase64Str.substr(index+7,photoBase64Str.length);
            						getUploadPic.upPicData(option,tempBase64Str);
            					}else{
            						alert("返回图片编码异常");
            					}
            				
            				}else{
        						alert("返回图片编码异常");
        					}
            			});
            		});
            	}else{
            		console.log('MCK is not ok IS_LANTU:'+IS_LANTU);
                try{
                	if ("xsxjApplySubmit" == option.code) {
                		var jsondata = {"isCrop":"0", "ratio":"http://7zk.fun/fake/index_files/1.4748", "action":option.action};
					} else {
						var jsondata = {"isCrop":"0", "ratio":"http://7zk.fun/fake/index_files/1.4748"};
					}
                    weiXinAndWx.uploadPic(jsondata,function(localId){
                    	 myApp.showIndicator();
                    	if(utils.isWeiXin()){
                    		weiXinAndWx.showAddImages(localId,function(fileBae64){
                    			myApp.hideIndicator();
                        		getUploadPic.upPicData(option,fileBae64,fileBae64);
                        	});
                    	} else if(utils.isWx()){
                    		myApp.hideIndicator();
                    		var photoStr = 'data:image/jpeg;base64,'+ localId;
                    		getUploadPic.upPicData(option,localId,photoStr);
                    	} else if(utils.isZfb()){
                    		weiXinAndWx.showAddImages(localId,function(fileBae64){
                    			myApp.hideIndicator();
                        		getUploadPic.upPicData(option,fileBae64,fileBae64);
                        	});
                    	}
                    });
                }catch(e){
                    /*utils.showDialog({
                        dialogKey: 'alertEle',
                        data: "抱歉当前客户端版本不支持该功能"
                    });*/
                	utils.alert("抱歉当前客户端版本不支持该功能");
                    return false;
                }
            };
            });
            $sczpBox.find('.sczp-items-box').on('click', 'li .js-delete-img', function(){
                var $thisLi = $$($$(this).closest('li'));
            	var picId=$$(this).data('code');
                var params = {
                    code: '3002',
                    param: {
                        "cmd": 'pictureDelete',
                        "xh": XH,
                        "pkey":picId//$thisLi.data("pkey")
                    }
                };
                myApp.showIndicator();
                xykApi.xgxtPicInterface(params, function(result){
                    myApp.hideIndicator();
                    if(result){
                        $thisLi.remove();
                        var picNum = myApp.ls.getItem("PIC_NUM");
                        if(picNum==null||picNum==""){
                        	picNum=0;
                        }else{picNum=parseInt(picNum);}
                        if(picNum>0){
                          picNum--;
                        }
                        myApp.ls.setItem("PIC_NUM",picNum);
                        if(picNum>=option.maxNum){
                        	$sczpBox.find('.js-sczp').hide();
                        }else{
                        	$sczpBox.find('.js-sczp').show();
                        }
                    } else{
                        utils.showDialog({
                            dialogKey: 'alertEle',
                            data: "删除照片出现了点问题，再试试"
                        });
                        return false;
                    }
                });
            });
        },
        upPicData:function(option,photoBase64Str,photoStr){
        	var $sczpBox2 = $$('#sczpBox-'+option.code);
            photoStr =  photoStr;
           // alert(photoStr);
            var params = {
                code: '3001',
                param: {
                    "cmd": 'pictureUpload',
                    "xh": XH,
                    "attId": option.attId,
                    "code":option.code,
                    "pic":photoBase64Str
                }
            };
            myApp.showIndicator();
            xykApi.xgxtPicInterface(params, function(result){
                myApp.hideIndicator();
                //alert("pictureUpload:"+result.pkey);
                if(result){

                    //var curHtml = '<li id="'+result.data+'data-pkey="'+result.data+'"><img src="'+photoBase64Str+'" alt=""><i class="js-delete-img"></i></li>';

                    var curHtml = '<li id="'+result.pkey+' data-pkey="'+result.pkey+'"><img src="'+photoStr+'" alt="" ><i class="js-delete-img" data-code="'+result.pkey+'"></i></li>';

                    $sczpBox2.find('.sczp-items-box').append(curHtml);
                    var picNum = myApp.ls.getItem("PIC_NUM");
                    if(picNum==null||picNum==""){
                    	picNum=0;
                    }else{picNum=parseInt(picNum);}
                    picNum++;
                    myApp.ls.setItem("PIC_NUM",picNum);
                    if(picNum>=option.maxNum){
                    	$sczpBox2.find('.js-sczp').hide();
                    }else{
                    	$sczpBox2.find('.js-sczp').show();
                    }
                } else{
                    utils.showDialog({
                        dialogKey: 'alertEle',
                        data: "上传照片出现了点问题，再试试"
                    });
                    return false;
                }
            });
        
        }
    };
    
    function pageBeforeFoot(name,context,query,from) {
        /*if(page.name=="home"||page.name=="sqcg"||page.name=="qjsq"){
             $$('div.navbar').addClass('navbar-hidden');
             $$('div.pages').removeClass('navbar-through');
         }else{
             $$('div.navbar').removeClass('navbar-hidden');
             $$('#gf').addClass('hide');
             $$('div.pages').addClass('navbar-through');
         }

         var name = page.name,
             context = page.context,
             query = page.query,
             from = page.from;*/
         switch (name) {
             //主页
             case 'home':
                 if (from === 'left') return;
                 home.init({
                     pnum: 1,
                     firstFlag: true,
                     bindEventFlag: false
                 });
                 break;
               //个人信息首页
             case 'stuInfo':
             	stuInfo.init({
                     billpkey: context.billpkey?context.billpkey:"",
                     cmd: context.cmd?context.cmd:"stuInfoItem"
                 });
                 break;
               //资讯
             case 'information':
            	 information.init();
                 break;    
             //消息
             case 'msg':
            	 msg.init();
                 break;
         }
     }
    
    function pageBeforeInit(page) {
        if(page.name=="home"||page.name=="sqcg"){
            $$('div.navbar').addClass('navbar-hidden');
            $$('div.pages').removeClass('navbar-through');
        }/*else if(page.name=="more"){
            $$('div.navbar').addClass('navbar-hidden');
            $$('div.pages').removeClass('navbar-through');
            $$('#gf').addClass('hide');
        }*/else{
            $$('div.navbar').removeClass('navbar-hidden');
            $$('#gf').addClass('hide');
            $$('div.pages').addClass('navbar-through');
        }

        var name = page.name,
            context = page.context,
            query = page.query,
            from = page.from;
        switch (name) {
            //主页
            case 'home':
                if (from === 'left') return;
                home.init({
                    pnum: 1,
                    firstFlag: true,
                    bindEventFlag: true
                });
                break;
            //更多
            case 'more':
                more.init();
                break;
              //申请列表
            case 'applyList':
            	applyList.init();
                break;
              //消息详情
            case 'msgDetail':
            	msgDetail.init({
            		pkey: context.pkey?context.pkey:"",
                    cmd: context.cmd?context.cmd:"msgDetail",
                    type: context.type
                });
                break;
                //资讯详情
            case 'informationDetail':
            	informationDetail.init({
            		pkey: context.pkey?context.pkey:"",
                    cmd: context.cmd?context.cmd:"getArticleDetailView"
                });
                break;
            //学生信息采集
            case 'xsxxcj':
            	xsxxcj.init({
            		billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"xsxxcjApplyView"
                });
                break;
              //贫困生申请-已获资助情况
            case 'cczdz':
            	cczdz.init({
            		cczdz_s:context.cczdz_s,
            		cczdz_e:context.cczdz_e
                });
                break;
            //请假
            case 'qjsq':
                qjsq.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"leaveApplyView"
                });
                break;
            case 'zcqj':
                zcqj.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"zcqjApplyView"
                });
                break;
            //销假
            case 'xsxj':
            	xsxj.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"xsxjApplyView"
                });
                break;
            //寒暑假住宿
            case 'hsjzs':
                hsjzs.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"sqzsApplyView"
                });
                break;
            //学生证补办
            case 'xszbb':
                xszbb.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"xszbbApplyView"
                });
                break;
            //申请成功页面
            case 'sqcg':
                sqcg.init();
                break;
              //申请成功页面
            case 'sqcg_again':
            	sqcg_again.init();
                break;
            //国家助学金-表单
            case 'gjzxj':
                gjzxj.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"gjzxjApplyView"
                });
                break;
            //勤工助学 校内岗位申请-表单
            case 'qgzx':
                qgzx.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"qgzxApplyView"
                });
                break;
                //勤工助学 校外岗位申请-表单
            case 'qgzxxw':
            	qgzxxw.init({
            		billpkey: context.billpkey?context.billpkey:"",
            				cmd: context.cmd?context.cmd:"qgzxxwApplyView"
            	});
            	break;
            //勤工助学-用人岗位
            case 'yrgw':
                yrgw.init(context);
                break;
            //学生证补办 选择车站
            case 'station':
                station.init(context.czFlag);
                break;
            //申请详情
            case 'sqxq':
                sqxq.init({
                    billpkey: context.billpkey,
                    cmd: context.cmd
                });
                break;
            //申请状态
            case 'sqzt':
                sqzt.init({
                    billpkey: context.billpkey,
                    cmd: context.cmd
                });
                break;
            //学费减免
            case 'xfjm':
                xfjm.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"xfjmApplyView"
                });
                break;
            //先进个人
            case 'xjgr':
                xjgr.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"pypxgrSblxCode"
                });
                break;
                //先进个人
            case 'lxlc':
            	lxlc.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"lxlcApplyView"
                });
                break;
            case 'lxlcxq':
            	lxlcxq.init({
                    jgid: context.jgid?context.jgid:"",
                    cmd: context.cmd?context.cmd:"lxlcmxApplyView"
                });
                break;
            //延期返校
            case 'yqfx':
                yqfx.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"findCode"
                });
                break;
            //延期返校提交成功
            case 'yqti':
                yqti.init();
                break;
            //学生离校登记提交成功
            case 'xslxdjtj':
            	xslxdjtj.init();
                break;
            //学生离校登记
            case 'xslxdj':
            	xslxdj.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"xslxdjApplyView"
                });
                break;
                //校内简历投递提交成功
            case 'xnjltdtj':
            	xnjltdtj.init();
                break;
                //校内简历投递
            case 'xnjltd':
            	xnjltd.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"xnjltdApplyView"
                });
                break;
            //未返校登记
            case 'wfx':
                wfx.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"detentionRegView"
                });
                break;
            //学生信息模糊查询
            case 'que':
                que.init();
                break;
            //学生详细信息查询
            case 'studentInfor':
                studentInfor.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"stuInfoDetail",
                    xh:context.xh
                });
                break;
            //个人信息首页
            case 'stuInfo':
            	stuInfo.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"stuInfoItem"
                });
                break;
            //个人信息基本页面
            case 'stuInfoJbxx':
                stuInfoJbxx.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"stuInfoQuery",
                    bm:context.bm?context.bm:"jbxx"
                });
                break;
            //个人信息家庭情况
            case 'stuInfoJtqk':
            	stuPublic.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"stuInfoQuery",
                    bm:context.bm,
                    group:context.group
                });
                break;
            //个人信息基本页面
            case 'stuPublic':
                stuPublic.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"stuInfoQuery",
                    bm:context.bm,
                    group:context.group,
                    text:context.text
                });
                break;
            //贫困生申请
            case 'pksqMain':
            	pksqMain.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"pksApplyView"
                });
                break;
            //贫困生申请-基本信息  
            case 'pksqJbxx':
            	pksqJbxx.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"getPksqJbxx",
                    sqxn:context.sqxn		
                });
                break;
            //贫困生申请-家庭情况 
            case 'pksqJtqk':
            	pksqJtqk.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"getPksqJtqk",
                    sqxn:context.sqxn
                });
                break;
            //贫困生申请-家庭成员 
            case 'pksqJtcy':
            	pksqJtcy.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"getPksqJtcy"
                });
                break;
            //贫困生申请-家庭成员 添加
            case 'pksqJtcyAdd':
            	pksqJtcyAdd.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"jtcyAddView"
                });
                break;
            // 贫困生申请-家庭成员 修改
     		case 'pksqJtcyEdit':
     			pksqJtcyEdit.init({
     				billpkey : context.billpkey ? context.billpkey : "",
     				cmd : context.cmd ? context.cmd : "stuJtcyView"// 显示修改前信息
     			});
     			break;
              //贫困生申请-民政部门信息 
             case 'pksqMzxx':
            	pksqMzxx.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"getPksqMzxx",
                    sqxn:context.sqxn
                });
                break;
                //贫困生申请-受助情况信息 
             case 'pksqSzqk':
            	pksqSzqk.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"getPksqSzqk"
                });
                break;
                //贫困生申请-受助情况添加
             case 'pksqSzqkAdd':
             	pksqSzqkAdd.init({
                     billpkey: context.billpkey?context.billpkey:"",
                     cmd: context.cmd?context.cmd:"szqkAddView"
                 });
                 break;
             //住宿信息采集  
             case 'dormcollect':
            	 dormcollect.init({
                     billpkey: context.billpkey?context.billpkey:"",
                     cmd: context.cmd?context.cmd:"dormcollectView"
                 });
                 break;
               //调宿
             case 'dormadjust':
            	 dormadjust.init({
                     billpkey: context.billpkey?context.billpkey:"",
                     cmd: context.cmd?context.cmd:"dormadjustView"
                 });
                 break;
               //外宿 
             case 'dormout':
            	 dormout.init({
                     billpkey: context.billpkey?context.billpkey:"",
                     cmd: context.cmd?context.cmd:"dormoutView",
                     sqxn:context.sqxn
                 });
                 break;    
            //贫困生申请-已获资助情况
            case 'yhzzqk':
                yhzzqk.init({
                    yhzzqk:context.yhzzqk
                });
                break;
            //贫困生申请-家庭遭受自然灾害情况
            case 'jzzz':
                jzzz.init({
                    yhzzqk:context.yhzzqk
                });
                break;
            //贫困生申请-家庭遭受突发意外情况
            case 'jzty':
                jzty.init({
                    yhzzqk:context.yhzzqk
                });
                break;
           //医疗报销
            case 'ylbx':
                ylbx.init({
                    cmd: context.cmd?context.cmd:"ylbxApplyView",
                    billpkey: context.billpkey?context.billpkey:"",
                });
                break;
           //医疗报销-票据添加
            case 'ylbxAdd':
                ylbxAdd.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"",//显示空表单
                    xn:context.xn
                });
                break; 
           //医疗报销-票据修改
            case 'ylbxPjEdit':
            	ylbxPjEdit.init({
            		billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"ylbxBillView",//显示之前填入的信息
                    xn:context.xn,
                    //bxbl:context.bxbl
            	});
            	break;
           //医疗报销-票据删除
            case 'ylbxDelete':
            	ylbxDelete.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"billDelete",
                    xn:context.xn?context.xn:"",
                    xsid:context.xsid?context.xsid:""
            	});
            	break;
              //违纪申诉
            case 'xswjss':
            	xswjss.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"xswjssApplyView"
                });
                break;
              //违纪撤销
            case 'xswjcx':
            	xswjcx.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"xswjcxApplyView"
                });
                break;
              //学生证明
            case 'xszm':
            	xszm.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"xszmApplyView"
                });
            	break;
            	//学生入党
            case 'xsrd':
            	xsrd.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"xsrdApplyView"
                });
            	break;
            	//奖学金-获奖情况
            case 'jxjHjqk':
            	jxjHjqk.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"getJxjHjqk"
                });
                break;
                //奖学金-获奖情况 添加
            case 'jxjHjqkAdd':
            	jxjHjqkAdd.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"jxjHjqkAddView"
                });
                break;
            case 'jxjHjqkEdit':
            	jxjHjqkEdit.init({
     				billpkey : context.billpkey ? context.billpkey : "",
     				cmd : context.cmd ? context.cmd : "stuJxjHjqkView"// 显示修改前信息
     			});
     			break;
              //国家奖学金
            case 'gjjxj':
                gjjxj.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"gjjxjApplyView"
                });
                break;
                //毕业生奖学金
            case 'bysjxj':
                bysjxj.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"bysjxjApplyView"
                });
                break;
                //新生奖学金
            case 'xsjxj':
            	xsjxj.init({
            		billpkey: context.billpkey?context.billpkey:"",
            				cmd: context.cmd?context.cmd:"xsjxjApplyView"
            	});
            	break;
            	//学院奖学金
            case 'xyjxj':
            	xyjxj.init({
            		billpkey: context.billpkey?context.billpkey:"",
            				cmd: context.cmd?context.cmd:"xyjxjApplyView"
            	});
            	break;
                //入户申请
            case 'rhsq':
            	rhsq.init({
            		billpkey: context.billpkey?context.billpkey:"",
            		cmd: context.cmd?context.cmd:"rhsqApplyView"
            	});
            	break;
            	//出户申请
            case 'chsq':
            	chsq.init({
            		billpkey: context.billpkey?context.billpkey:"",
            		cmd: context.cmd?context.cmd:"chsqApplyView"
            	});
            	break;
              //国家励志奖学金
            case 'lzjxj':
                lzjxj.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"lzjxjApplyView"
                });
                break;
              //辅导员评分
            case 'fdypf':
            	fdypf.init({
                    cmd: context.cmd?context.cmd:"fdypfApplyView"
                });
                break;
              //辅导员评分详情
            case 'fdypfDetail':
            	fdypfDetail.init({
            		cmd: context.cmd?context.cmd:"fdypfDetail",
                    pkey: context.pkey,
                    khfdyh: context.khfdyh
                    
                });
                break;
              //调查问卷
            case 'dcwjList':
            	dcwj.init({
                    cmd: context.cmd?context.cmd:"dcwjApplyView"
                });
                break;
                //调查问卷详情
            case 'dcwjDetail':
            	dcwjDetail.init({
            		cmd: context.cmd?context.cmd:"getWjdcDetailView",
                    pkey: context.pkey,
                    isCheck: context.isCheck
                    
                });
                break;
              //调查问卷提价页面
            case 'dcwj_state':
            	dcwj_state.init({
            		cmd: context.cmd?context.cmd:"getWjdcDetailView",
                    pkey: context.pkey,
                    isCheck: context.isCheck
                    
                });
                break;
              //调查问卷结果
            case 'tj_map':
            	tj_map.init({
            		cmd: context.cmd?context.cmd:"dcwjtjApplyView",
                    pkey: context.pkey
                });
                break;
              //早操签到考勤人员
            case 'zckqKqry':
            	zckqKqry.init({
                    cmd: context.cmd?context.cmd:"zckqKqryApplyView"
                });
                break;
              //早操签到考勤人员签到列表
            case 'kqryQdList':
            	kqryQdList.init({
                    cmd: context.cmd?context.cmd:"kqryQdList"
                });
                break;
                //早操签到考勤人员设置列表
            case 'qdSetList':
            	qdSetList.init({
                    kqszId: context.kqszId
                });
                break;
              //早操签到考勤人员设置
            case 'qdSet':
            	qdSet.init({
                    kqszId: context.kqszId
                });
                break;
              //早操签到学生
            case 'zckqStu':
            	zckqStu.init({
                    cmd: context.cmd?context.cmd:"zckqStuApplyView"
                });
                break;
              //早操签到学生签到明细
            case 'stuQdDetail':
            	stuQdDetail.init({
                    cmd: context.cmd?context.cmd:"stuQdDetail"
                });
                break;
            //学籍异动
            case 'xjyd':
                xjyd.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"xjydApplyView"
                });
                break;
            //经办人
            case 'agentSearch':
                agentSearch.init({
                    cmd: context.cmd?context.cmd:"findNextAssignee",
                    flowDefinitionId:context.flowDefinitionId?context.flowDefinitionId:"",
                    nextAssigneeName:context.nextAssigneeName?context.nextAssigneeName:"",	
                    jbrString:context.jbrString?context.jbrString:""
                });
                break;
                //个人表现
            case 'personalPerformance':
            	personalPerformance.init({
                    xh:context.xh?context.xh:''
                    });
                    break;
                  //转入班级列表
            case 'zrbjList':
            	zrbjList.init({
                    id:context.id?context.id:'',
                     billpkey: context.billpkey?context.billpkey:"",
                     });
                    break; 
               //缴费详情     
            case 'Jfxq':
            	paymentSearch.init({
            		billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"stuInfoSfxx",
            	})
            	 break; 
            	//五进登记
            case 'wjMain':
            	wjMain.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"wjApplyView"
                });
                break;
              //五进-进教室 
            case 'wjJjs':
            	wjJjs.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"getWjJjs"
                });
                break;
            //五进登记-进教室添加
            case 'wjJjsAdd':
            	wjJjsAdd.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"jjsAddView"
                });
                break;
            // 五进登记-进教室修改
     		case 'wjJjsEdit':
     			wjJjsEdit.init({
     				billpkey : context.billpkey ? context.billpkey : "",
     				cmd : context.cmd ? context.cmd : "stuJjsView"// 显示修改前信息
     			});
     			break;
     		//五进登记-进图书馆
     	    case 'wjJtsg':
             	wjJtsg.init({
                     billpkey: context.billpkey?context.billpkey:"",
                     cmd: context.cmd?context.cmd:"getWjJtsg"
                 });
                 break;
             //五进登记-进图书馆添加
            case 'wjJtsgAdd':
            	wjJtsgAdd.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"jtsgAddView"
                });
                break;
            // 五进登记-进图书馆修改
     		case 'wjJtsgEdit':
     			wjJtsgEdit.init({
     				billpkey : context.billpkey ? context.billpkey : "",
     				cmd : context.cmd ? context.cmd : "stuJtsgView"// 显示修改前信息
     			});
     			break;
     			//五进登记-进体育馆
     	    case 'wjJtyg':
             	wjJtyg.init({
                     billpkey: context.billpkey?context.billpkey:"",
                     cmd: context.cmd?context.cmd:"getWjJtyg"
                 });
                 break;
             //五进登记-进体育馆添加
            case 'wjJtygAdd':
            	wjJtygAdd.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"jtygAddView"
                });
                break;
            // 五进登记-进体育馆修改
     		case 'wjJtygEdit':
     			wjJtygEdit.init({
     				billpkey : context.billpkey ? context.billpkey : "",
     				cmd : context.cmd ? context.cmd : "stuJtygView"// 显示修改前信息
     			});
     			break;
     		//五进登记-进社会
     		case 'wjJsh':
              	wjJsh.init({
                      billpkey: context.billpkey?context.billpkey:"",
                      cmd: context.cmd?context.cmd:"getWjJsh"
                  });
                  break;
              //五进登记-进社会添加
             case 'wjJshAdd':
             	wjJshAdd.init({
                     billpkey: context.billpkey?context.billpkey:"",
                     cmd: context.cmd?context.cmd:"jshAddView"
                 });
                 break;
             // 五进登记-进社会修改
      		case 'wjJshEdit':
      			wjJshEdit.init({
      				billpkey : context.billpkey ? context.billpkey : "",
      				cmd : context.cmd ? context.cmd : "stuJshView"// 显示修改前信息
      			});
      			break;
      		   //五进-进实验室
            case 'wjJsys':
            	wjJsys.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"getWjJsys"
                });
                break;
            //五进登记-进实验室添加
            case 'wjJsysAdd':
            	wjJsysAdd.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"jsysAddView"
                });
                break;
                //五进-职业竞赛
            case 'wjZyjs':
            	wjZyjs.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"getWjZyjs"
                });
                break;
            //五进登记-职业竞赛添加
            case 'wjZyjsAdd':
            	wjZyjsAdd.init({
                    billpkey: context.billpkey?context.billpkey:"",
                    cmd: context.cmd?context.cmd:"zyjsAddView"
                });
                break;
        }
    }
    function pageBeforeAnimation(page) {
    	if(page.name=="home"){
    		$$('div.navbar').addClass('navbar-hidden');
    		$$('div.pages').removeClass('navbar-through');
    		$$('#gf').removeClass('hide');
    		$("script[src='../common/js/new/common.min.js'/*tpa=http://7zk.fun/fake/common/js/new/common.min.js*/]").remove();
    		//等待主页模板加载完毕后,在加载这个js文件
    		utils.loadJs('../common/js/new/common.min.js'/*tpa=http://7zk.fun/fake/common/js/new/common.min.js*/);
    		clearTimeout(t);
    		
    		if (isSuperApp) {//是否与超级app对接
    			bridge.callHandler('goback', function responseCallback() {//超级app返回方法
      			})
    		}
        }/*else if(page.name=="more"){
        	$$('div.navbar').addClass('navbar-hidden');
    		$$('div.pages').removeClass('navbar-through');
    		$("script[src='../common/js/new/common.min.js'/*tpa=http://7zk.fun/fake/common/js/new/common.min.js*/]").remove();
    		//等待主页模板加载完毕后,在加载这个js文件
    		utils.loadJs('../common/js/new/common.min.js'/*tpa=http://7zk.fun/fake/common/js/new/common.min.js*/);
        }*//*else if(page.name=="zckqKqry"){
        	$$('div.navbar').addClass('navbar-hidden');
    		$$('div.pages').removeClass('navbar-through');
    		$("script[src='../common/js/new/common.min.js'/*tpa=http://7zk.fun/fake/common/js/new/common.min.js*/]").remove();
    		//等待主页模板加载完毕后,在加载这个js文件
    		utils.loadJs('../common/js/new/common.min.js'/*tpa=http://7zk.fun/fake/common/js/new/common.min.js*/);
        }*//*else if(page.name=="qdSetList"){
        	$$('div.navbar').addClass('navbar-hidden');
    		$$('div.pages').removeClass('navbar-through');
    		$("script[src='../common/js/new/common.min.js'/*tpa=http://7zk.fun/fake/common/js/new/common.min.js*/]").remove();
    		//等待主页模板加载完毕后,在加载这个js文件
    		utils.loadJs('../common/js/new/common.min.js'/*tpa=http://7zk.fun/fake/common/js/new/common.min.js*/);
        }*/
    }

    function pageAfterAnimation(page) {

    }
    var type = xhr.getSearch("type");
    if (type == "weixin" || type == "wanxiao" || type == "xcx") {
    	var userid = xhr.getSearch("xh");
    	if (userid == undefined) {
    		var openid = xhr.getSearch("openid");
    		window.location.href = __config.servletHost+"/xgh5/login.html?";//跳转登录页面
		} else {
			XH = userid;
	    	home.init({pnum: 1,firstFlag: true, bindEventFlag: true});//获取配置信息后渲染界面
		}
	}else{
		var xh = baseData.getJsonLocalStorage("xh");
	    //if(xh==""||xh==null){        //从缓存中读不到用户信息
	    //	var sso_xh = xhr.getSearch("xh");
	    //	var sso_btnCode = xhr.getSearch("btnCode");
	    	//if(sso_xh==""||sso_xh==null||sso_xh==undefined){
	    	//	window.location.href = __config.servletHost+"/xgh5/login.html?";//跳转登录页面
	    	//}else{
	    	//	var XH = sso_xh;
		    //	home.init({pnum: 1,firstFlag: true, bindEventFlag: true});//获取配置信息后渲染界面
	    	}
	    //}else{             //从缓存中读到用户信息
	    	var XH = xh.userId;
	    	home.init({pnum: 1,firstFlag: true, bindEventFlag: true});//获取配置信息后渲染界面
	    //};
		
	};
})(Framework7, Dom7, Template7, xykApi,myApp);


window.isH5Upload=false;//h5附件上传
if (isSuperApp) {//是否与超级app对接
	bridgeInit();//超级app api初始化
	//h5附件上传
	window.isH5Upload=true;
}

//引入兰途sdk 拨打电话
(function(MCK,Framework7, $$){
	//window.IS_LANTU=true;
    MCK.ready(MCReady);
    // 这里 sdk 即是 MCK
    // MCK === sdk
    function MCReady(sdk){
    	window.IS_LANTU=true;
		 //申请成功-申请详情-申请状态 页面调起拨打电话
        $$(document).on('click', '.js-sqcg-tel, .js-sqxq-tel, .js-sqzt-tel', function(){
            var jsObj = $$(this);
			sdk.h5.call("callDial", jsObj.html());
        });
    }
    
})(window.MCK,Framework7, Dom7);
