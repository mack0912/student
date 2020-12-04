function swiper(){   //主页活动图片动态样式方法
	//setTimeout(function(){//延时加载,等待主页模板加载完毕后在加载
		var swiper = new Swiper('.swiper-container', {
	        pagination: '.swiper-pagination',
	        paginationClickable: true,
	        autoplay: 5000
	    });
 	//},2000);
}