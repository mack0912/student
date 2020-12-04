var calUtil = {
  //当前日历显示的年份
  showYear:new Date().getFullYear(),
  //当前日历显示的月份
  showMonth:new Date().getMonth()+1,
  //当前日历显示的天数
  showDays:new Date().getDate(),
  eventName:"load",
  //初始化日历
  init:function(signList,tsList){
    calUtil.setMonthAndDay();
   // console.log(calUtil.showYear,calUtil.showMonth);
    //ajax通过年月获取签到的json数据
   // var signList=[{"signDay":"10"},{"signDay":"11"},{"signDay":"12"},{"signDay":"18"}];
    //ajax通过年月获取特殊情况不用签到的json数据
   // var tsList=[{"tsDay":"1"},{"tsDay":"2"},{"tsDay":"3"},{"tsDay":"4"}];
    calUtil.draw(signList,tsList);
    calUtil.bindEnvent();
  },
  draw:function(signList,tsList){
    //绑定日历
    var str = calUtil.drawCal(calUtil.showYear,calUtil.showMonth,signList,tsList);
    $("#calendar").html(str);
    //绑定日历表头
    var calendarName=calUtil.showYear+"年"+calUtil.showMonth+"月";
    $(".calendar_month_span").html(calendarName);  
  },
  //绑定事件
  bindEnvent:function(){
    //绑定上个月事件
   /* $(".calendar_month_prev").click(function(){
      calUtil.eventName="prev";
      calUtil.init(signList,tsList);
    });*/
    //绑定下个月事件
    /*$(".calendar_month_next").click(function(){
      calUtil.eventName="next";
      calUtil.init(signList,tsList);
    });*/
  },
  //获取当前选择的年月
  setMonthAndDay:function(){
    switch(calUtil.eventName)
    {
      case "load":
        var current = new Date();
        calUtil.showYear=current.getFullYear();
        calUtil.showMonth=current.getMonth() + 1;
        break;
      case "prev":
        var nowMonth=$(".calendar_month_span").html().split("年")[1].split("月")[0];
        calUtil.showMonth=parseInt(nowMonth)-1;
        if(calUtil.showMonth==0)
        {
            calUtil.showMonth=12;
            calUtil.showYear-=1;
        }
        break;
      case "next":
        var nowMonth=$(".calendar_month_span").html().split("年")[1].split("月")[0];
        calUtil.showMonth=parseInt(nowMonth)+1;
        if(calUtil.showMonth==13)
        {
            calUtil.showMonth=1;
            calUtil.showYear+=1;
        }
        break;
    }
  },
  getDaysInmonth : function(iMonth, iYear){
   var dPrevDate = new Date(iYear, iMonth, 0);
   return dPrevDate.getDate();
  },
  
  bulidCal : function(iYear, iMonth) {
   var aMonth = new Array();
   aMonth[0] = new Array(7);
   aMonth[1] = new Array(7);
   aMonth[2] = new Array(7);
   aMonth[3] = new Array(7);
   aMonth[4] = new Array(7);
   aMonth[5] = new Array(7);
   aMonth[6] = new Array(7);
   var dCalDate = new Date(iYear, iMonth - 1, 1);
   var iDayOfFirst = dCalDate.getDay();
   if(iDayOfFirst==0){
    iDayOfFirst=7
   }
   var iDaysInMonth = calUtil.getDaysInmonth(iMonth, iYear);
   var iVarDate = 1;
   var d, w;
   aMonth[0][0] = "一";
   aMonth[0][1] = "二";
   aMonth[0][2] = "三";
   aMonth[0][3] = "四";
   aMonth[0][4] = "五";
   aMonth[0][5] = "六";
   aMonth[0][6] = "日";
   for (d = iDayOfFirst-1; d < 7; d++) {
    aMonth[1][d] = iVarDate;
    iVarDate++;
   }
   for (w = 2; w < 7; w++) {
    for (d = 0; d < 7; d++) {
     if (iVarDate <= iDaysInMonth) {
      aMonth[w][d] = iVarDate;
      iVarDate++;
     }
    }
   }
   return aMonth;
  },
  ifHasSigned : function(signList,day){
   var signed = false;
   $.each(signList,function(index,item){
    if(item.signDay == day) {
     signed = true;
     return false;
    }
   });
   return signed ;
  },
  ifTsSigned : function(tsList,day){
   var signed = false;
   $.each(tsList,function(index,item){
    if(item.tsDay == day) {
     signed = true;
     return false;
    }
   });
   return signed ;
  },
  drawCal : function(iYear, iMonth ,signList,tsList) {
   var myMonth = calUtil.bulidCal(iYear, iMonth);
   var htmls = new Array();
   htmls.push("<div class='sign_main' id='sign_layer'>");
   htmls.push("<div class='sign_succ_calendar_title'>");
   htmls.push("<div class='calendar_month_next'>下月</div>");
   htmls.push("<div class='calendar_month_prev'>上月</div>");
   htmls.push("<div class='calendar_month_span'></div>");
   htmls.push("</div>");
   htmls.push("<div class='sign' id='sign_cal'>");
   htmls.push("<table>");
   htmls.push("<tr>");
   htmls.push("<th>" + myMonth[0][0] + "</th>");
   htmls.push("<th>" + myMonth[0][1] + "</th>");
   htmls.push("<th>" + myMonth[0][2] + "</th>");
   htmls.push("<th>" + myMonth[0][3] + "</th>");
   htmls.push("<th>" + myMonth[0][4] + "</th>");
   htmls.push("<th>" + myMonth[0][5] + "</th>");
   htmls.push("<th>" + myMonth[0][6] + "</th>");
   htmls.push("</tr>");
   var d, w;
   for (w = 1; w < 7; w++) {
    htmls.push("<tr>");
    for (d = 0; d < 7; d++) {
     var ifHasSigned = calUtil.ifHasSigned(signList,myMonth[w][d]);
     var ifTsSigned = calUtil.ifTsSigned(tsList,myMonth[w][d]);
     var className="";
      if(myMonth[w][d]==new Date().getDate()&&new Date().getMonth()+1==calUtil.showMonth&&new Date().getFullYear()==calUtil.showYear){
         //当前月当前天，允许签到
         className="today";
         if(d==5||d==6){
          className='today zm';
         }else if(ifHasSigned){
            className='today on';
         }else if(ifTsSigned){
           className='today ts';
         }

       }else{
         if(d==5||d==6){
            className='zm';
         } 
         if(ifHasSigned){
            className='on';
         }
         if(ifTsSigned){
           className='ts';
         }
       }
       htmls.push("<td class='" +className+"'>" + (!isNaN(myMonth[w][d]) ? myMonth[w][d] : " ") + "</td>");
    }
    htmls.push("</tr>");
   }
   htmls.push("</table>");
   htmls.push("</div>");
   htmls.push("</div>");
   return htmls.join('');
  }
};