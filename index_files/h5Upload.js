//学工传递过来的参数
var XH="";
var option="";
function parameter(XHS,optionS) {
	XH = XHS;
	option = optionS;
}


function upload (input) {
	var maxsize = 2 * 1024 * 1024;//超过2m进行压缩
	//是否支持
	if (typeof FileReader === 'undefined') {
		utils.alert("抱歉，你的浏览器不支持 FileReader，请使用现代浏览器操作！");
		input.setAttribute('disabled','disabled');
	}
	if(input.files && input.files[0]){
		var $sczpBox2 = $$('#sczpBox-'+option.code);
		//将照片上传到学工服务器
		var file = input.files[0],
		reader = new FileReader();
	    if(file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
	    	utils.alert('不是有效的图片文件!');
	        return;
	    }
	    reader.readAsDataURL(file);
	    reader.onload = function(e){
	    	var pic=this.result;//获取到base64的图片
	    	//大于2m图片进行压缩
	        if(pic.length >= maxsize){
	        	lrz(input.files[0], {width: 1024})  
	        	//lrz(input.files[0])  
                .then(function (rst) {
                	var params = {
           			code: '3001',
           			param: {
           				"cmd": 'pictureUpload',
           				"xh": XH,
           				"attId": option.attId,
           				"code":option.code,
           				"pic":rst.base64
           				//"type":"h5"
           				}
           			};
           			myApp.showIndicator();
           			xykApi.xgxtPicInterface(params, function(result){
           				myApp.hideIndicator();
           				if(result){
           					//将照片上传的照片回显到表单页面
           					var curHtml = '<li id="'+result.pkey+' data-pkey="'+result.pkey+'"><img src="'+pic+'" alt="" ><i class="js-delete-img" data-code="'+result.pkey+'"></i></li>';			
           					$sczpBox2.find('.sczp-items-box').append(curHtml);
           					var picNum = myApp.ls.getItem("PIC_NUM");
           					if(picNum==null||picNum==""){
           						picNum=0;
           					}else{
           						picNum=parseInt(picNum);
           					}
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
                });  
	        }else{
	        	var params = {
    			code: '3001',
    			param: {
    				"cmd": 'pictureUpload',
    				"xh": XH,
    				"attId": option.attId,
    				"code":option.code,
    				"pic":pic
    				//"type":"h5"
    				}
    			};
    			myApp.showIndicator();
    			xykApi.xgxtPicInterface(params, function(result){
    				myApp.hideIndicator();
    				if(result){
    					//将照片上传的照片回显到表单页面
    					var curHtml = '<li id="'+result.pkey+' data-pkey="'+result.pkey+'"><img src="'+pic+'" alt="" ><i class="js-delete-img" data-code="'+result.pkey+'"></i></li>';			
    					$sczpBox2.find('.sczp-items-box').append(curHtml);
    					var picNum = myApp.ls.getItem("PIC_NUM");
    					if(picNum==null||picNum==""){
    						picNum=0;
    					}else{
    						picNum=parseInt(picNum);
    					}
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
	    }
	}/*else{
		utils.alert("返回图片路径异常");
	}*/;
}