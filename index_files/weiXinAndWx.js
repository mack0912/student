/**
 * Created by znsw007 on 2016/9/26.(微信、玩校、支付宝)
 */
var weiXinAndWx = {
	cox:'',
	scanQRCode:'',
	getLocation:'',
	getDeviceInfo:'',
	chooseImage:'',
	uploadImage:'',
	downloadImage:'',
	showAddImages:'',
    init:function(){
        var that = this;   
        if(utils.isWeiXin()){
            that.loadJs('weixin');
        }else if(utils.isWx()){
        	that.loadJs('wanxiao');
        }else if(utils.isZfb()){
     	   	that.loadJs('zhifubao');
        };
    },
    loadJs:function(kind){
    	var that = this;
    	var script = document.createElement('script');
    	if(kind =='weixin'){
    		script.src='../../../res.wx.qq.com/open/js/jweixin-1.2.0.js'/*tpa=https://res.wx.qq.com/open/js/jweixin-1.2.0.js*/;
    		//https://res.wx.qq.com/open/js/jweixin-1.2.0.js
    		document.body.appendChild(script);
    		that.getWeixinSign();
    	}else if(kind =='wanxiao'){
    		script.src=__config.servletHost+'/xgh5/common/libs/wanxiao-js-api-v1.2.8.js';
    		document.body.appendChild(script);
    		that.scanQRCode=function(callback){
    			wanxiao.scanBarcode(function(res){
        			callback(res);
        		});
    		}
    		that.getLocation=function(callback){
    			wanxiao.getLocation(function(result){
    				if (typeof(result) == "string") {
                   	 result = JSON.parse(result);                           
                    }
                   that.cox = (result.lng + "," + result.lat);
        			callback(that.cox);
        		});
    		}
    		that.getDeviceInfo=function(callback){
    			wanxiao.getDeviceInfo(function(result){
    				if (typeof(result) == "string") {
                   	 result = JSON.parse(result);                           
                    }
        			callback(result);
        		});
    		}
    		that.uploadPic=function(jsondata,callback){
    			wanxiao.openCamera(JSON.stringify(jsondata));
                wanxiao.cameraPhotoCallBack = function(photoBase64Str) {
                	callback(photoBase64Str);
                }
    		};
    	}else if(kind =='zhifubao'){
    		script.src='../../../appx/web-view.min.js'/*tpa=https://appx/web-view.min.js*/;
    		document.body.appendChild(script);
    		//扫一扫
    		that.scanQRCode=function(callback){
    			my.postMessage({
					$type:'scan',   
					type:'qr', // qr 二维码 or bar 条形码   
					hideAlbum:true // 是否隐藏相册（不允许从相册选择图片），只能从相机扫码
				});
				my.onMessage = function(res) {
					//utils.alert(res.code);
        			callback(res.code);
				}
        	}
    		//上传照片
    		that.uploadPic=function(jsondata,callback){
    			my.chooseImage({
        		      sourceType: ['camera','album'],
        		      count: 1,
        		      success: function(res){
        		    	  var apFilePath = res.apFilePathsV2 || res.apFilePaths || [];
                          if (typeof apFilePath === 'string') {
                        	  try {
                        		  apFilePath = JSON.parse(apFilePath);
                        	  }catch(e){}
                          }
                          if (!apFilePath.length || !/^https?:/.test(apFilePath[0])) {
                            apFilePath='';
                          }
        		    	  var localIds = apFilePath;
        		    	  callback(localIds);
        		      }
        		})
    		}
    		that.showAddImages=function(localId,callback){
              	var that = this;
              	if(localId.length > 0){
              		var u = navigator.userAgent;
              	    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
              	    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
              		//追加照片
          			if(isiOS){
          				  that.convertImgToBase64(localId[0],function(base64Img){
                      		  callback(base64Img);
                      	  });
                      }else{
                    	  that.convertImgToBase64(localId[0],function(base64Img){
                    		  callback(base64Img);
                    	  });
                      }
              	 }
            }
    		that.convertImgToBase64=function(url, callback, outputFormat){
            	 var canvas = document.createElement('CANVAS'),
            	    ctx = canvas.getContext('2d'),
            	    img = new Image;
            	    img.crossOrigin = 'Anonymous';
            	    img.onload = function(){
            	    canvas.height = img.height;
            	    canvas.width = img.width;
            	    ctx.drawImage(img,0,0);
            	    var dataURL = canvas.toDataURL('image/jpeg');
            	    callback.call(this, dataURL);
            	    canvas = null; 
            	  };
            	  img.src = url;
            }
    		//定位
    		that.getLocation=function(callback){
        		//myApp.showIndicator();
        		my.getLocation({
        			success(res) {
        		        my.hideLoading();
        		        console.log(res);
        		        that.cox = (res.longitude + "," + res.latitude);
        				callback(that.cox);
        		      },
        		    fail() {
        		        my.hideLoading();
        		        my.alert({ title: '定位失败' });
        		    },
        		})
        	}
    	}
    },
    getWeixinSign: function () {
        var that = this;
        var ticketUrl =  __config.servletHost+'/weixin/Getticket.do'; // 微信公众号后台认证地址
        var url=location.href.split("#")[0];
       // alert("url:"+url)
        $$.ajax({
			url : ticketUrl,
			type : 'POST',// get
			async : true,// false是否异步
			data : {
				url : url
			},
			dataType : 'json',// 返回的数据格式类型json/xml/html/script/jsonp/text
			success : function(data) {
				 console.log('data:'+data);
		         if(data){
		        	 that.weixinConfig(data);
		         }
		         myApp.hideIndicator();	
			}
		});
    },
    weixinConfig: function (data) {
        console.log("weixin config data:"+JSON.stringify(data));
        var that = this;
            wx.config({
                debug: false,
                appId: data.appId,
                timestamp: data.timestamp,
                nonceStr: data.nonceStr,
                signature: data.signature,
                jsApiList: [
                    'getLocation',
                    'scanQRCode',
                    'chooseImage',
                    'uploadImage',
                    
                ]
            });
            wx.ready(function () {
            	that.scanQRCode=function(callback){
            		wx.scanQRCode({
                		needResult: 1,
                		desc: 'scanQRCode desc',
                		success: function (res) {
                			res = decodeURIComponent(res.resultStr);
                			callback(res);
                		}
            		});
            	}	
            	that.getLocation=function(callback){
            		myApp.showIndicator();
            		wx.getLocation({
               		 success: function (result) {
               			 if (typeof(result) == "string") {
                         	result = JSON.parse(result);   
                         }; 
                         that.cox = (result.longitude + "," + result.latitude);
                         myApp.hideIndicator();
               			 callback(that.cox);
               		   }
                   	 });
            	}
            	that.uploadPic=function(jsondata,callback){
            		 wx.chooseImage({
                         count: 1, // 默认9
                         sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                         sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                         success: function (res) {
                        	
                             var localIds = res.localIds[0];
                             //alert("localIds:"+localIds);// 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                             callback(localIds);
                         }
                      });
            	},
            	 that.showAddImages=function(localId,callback){
                 	var that = this;
                 	//alert("showAddImages");
                 	if(localId.length > 0){
                 		var u = navigator.userAgent;
                 	    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                 	    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
                 		//追加照片
             			if(isiOS){
             				//alert("localId:"+localId);
                         	wx.getLocalImgData({
                         		localId: localId, // 图片的localID
                         		success: function (res) {
                         			//alert("localData:");
                         			var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
                         			localData = localData.replace('jgp', 'jpeg');//iOS 系统里面得到的数据，类型为 image/jgp,因此需要替换一下
                         			//alert("localData:"+localData);
                         			//$lstdSczpShow.find("ul").append("<li><img id='lstdImg_"+(curLen+1)+" class='lstdImgAdd' src='"+localData+"'><i class='js-delete-img'></i></li>") 
                         			//$$('#lstdImg')&&$$('#lstdImg0').attr("src", localData);
                         			callback(localData);
                         		}
                         		
                     		});
                         }else{
                         	wx.getLocalImgData({
                         		localId: localId, // 图片的localID
                         		success: function (res) {
                         			var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
//                         			localData = localData.replace('jgp', 'jpeg');//iOS 系统里面得到的数据，类型为 image/jgp,因此需要替换一下
                         			//$lstdSczpShow.find("ul").append("<li><img id='lstdImg_"+(curLen+1)+" class='lstdImgAdd' src='"+localData+"'><i class='js-delete-img'></i></li>") 
                                                
                         			callback(localData);
                         		}
                         	});
                         	//$$('#lstdImg')&&$$('#lstdImg').attr("src", localIds);
                         }
                 		
                 		
                 	}
                 	
                 	
                 }
            });
            wx.error(function (res) {
            
            });
    },
};