require(["conf/config"],function(){require(["jquery","swiper","templateweb","cookie"],function(a,b,c,d){a(function(){new b(".swiper-container",{autoplay:!0,loop:!0,pagination:{el:".swiper-pagination",clickable:!0},effect:"fade",navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}})}),a(".searchinputbox").find("input").focus(function(){a(".searchinput-text1").css({display:"none"}),a(".searchinput-text2").css({display:"none"}),a(".searchinputbox").css({borderColor:"#FF6700"}),a(".icon-sousuo-box").css({borderColor:"#FF6700"})}),a(".searchinputbox").find("input").focusout(function(){0==a(".searchinputbox").find("input").val().length&&(a(".searchinput-text1").css({display:"block"}),a(".searchinput-text2").css({display:"block"})),a(".searchinputbox").css({borderColor:"#cccccc"}),a(".icon-sousuo-box").css({borderColor:"#cccccc"}),a(".search-droplist").css({display:"none"})});var e=a(".searchinputbox").find("input");e.on("input",function(){_script=document.createElement("script"),_script.src=`http://localhost:9090/proxy/search.mi.com/search/expand?keyword=${this.value}&jsonpcallback=xmsearch`,document.body.appendChild(_script)}),a(function(){a(".menu-left").find("li").hover(function(){a(".comeuplist").css({display:"block"})},function(){a(".comeuplist").css({display:"none"})})}),a(function(){a.ajax({type:"get",url:" http://localhost:9090/proxy/a.huodong.mi.com/flashsale/getslideshow",dateType:"json",success:function(b){var d=b.data.list.list;a(".flashbuygoodbox").load("http://localhost:9090/proxy/page/template/flashbuy.html",function(){var b=c("flashbuylist",{list:d,colors:["#FFAC13","#83C44E","#2196F3","#E53935","#00C0A5","#FFAC13","#83C44E","#2196F3"]});a(".flashbuygoodbox").html(b)})}})}),a(".flashbuynext").on("click",function(){1==flashbuyflag&&(flashbuyflag=2,a(".flashbuygoodbox").stop().animate({left:-992},300),a(this).removeClass("flashbuybtnactive"),a(".flashbuylast").addClass("flashbuybtnactive"))}),a(".flashbuylast").on("click",function(){2==flashbuyflag&&(flashbuyflag=1,console.log("S"),a(".flashbuygoodbox").animate({left:0},600),a(this).stop().removeClass("flashbuybtnactive"),a(".flashbuynext").addClass("flashbuybtnactive"))}),a(function(){a.ajax({type:"get",url:"http://localhost:9090/proxy/bigd.gome.com.cn/gome/rec?callback=phonecallback&boxid=box82&pid=9140074135&cid=124407418736773848&uid=76987513076&area=65010100&brid=10007234&imagesize=100&c1id=cat31665542&c3id=cat10000070&shopid=&sid=1130551063&_=1536774335066",dateType:"jsonp",success:function(b){var d=/^\w*\(/;b=b.replace(d,"").replace(/\)$/,""),b=JSON.parse(b);var e=b.lst;a(".phoneul").load("http://localhost:9090/proxy/page/template/phone.html",function(){var b=c("phonelist",{list:e});a(".phoneul").html(b)})}})}),a(function(){a.ajax({type:"get",url:"http://localhost:9090/proxy/bigd.gome.com.cn/gome/rec?callback=bigd20778&boxid=box70&pid=&area=11010200&cid=208461623236978755&currentpage=2&uid=&imagesize=160&c1n=&c3n=&brid=&shopid=&c3id=&c2id=&sid=&pagingid=0a70b91000256163330036&_=1536980037640",dateType:"jsonp",success:function(b){var d=/^\w*\(/;b=b.replace(d,"").replace(/\)$/,""),b=JSON.parse(b);var e=b.lst;a(".wiringul").load("http://localhost:9090/proxy/page/template/wiring.html",function(){var b=c("wiringlist",{list:e});a(".wiringul").html(b)})}})}),a(function(){a.ajax({type:"get",url:"http://localhost:9090/proxy/ajaxtuan.gome.com.cn/cheap/getIndexRushbuyItem?areaCode=11010000&callback=tuanbackshouye&_=153698738074",dateType:"jsonp",success:function(b){var d=/^\w*\(/;b=b.replace(d,"").replace(/\)$/,""),b=JSON.parse(b);var e=b.data.indexRushItem;a(".zhinengul").load("http://localhost:9090/proxy/page/template/zhineng.html",function(){var b=c("zhinenglist",{list:e});a(".zhinengul").html(b)})}})}),a(function(){function b(){a(".matchul").load("http://localhost:9090/proxy/page/template/match.html",function(){var b=c("matchlist",{list:phonegoods});a(".matchul").html(b)})}_script=document.createElement("script"),_script.src="http://localhost:9090/proxy/rec.www.mi.com/rec/collection?jsonpcallback=phoneaa",document.body.appendChild(_script),window.phoneaa=function(a){phonegoods=a.data,null!=phonegoods&&b()}}),a(function(){function b(){a(".partsul").load("http://localhost:9090/proxy/page/template/parts.html",function(){var b=c("partslist",{list:partsgoods});a(".partsul").html(b)})}_script=document.createElement("script"),_script.src="http://localhost:9090/proxy/rec.www.mi.com/rec/accessory?jsonpcallback=partsaa",document.body.appendChild(_script),window.partsaa=function(a){partsgoods=a.data,null!=partsgoods&&b()}}),a(function(){a.ajax({type:"get",url:"http://localhost:9090/proxy/bigd.gome.com.cn/gome/rec?callback=bigd20778&boxid=box70&pid=&area=11010200&cid=208461623236978755&currentpage=2&uid=&imagesize=160&c1n=&c3n=&brid=&shopid=&c3id=&c2id=&sid=&pagingid=0a70b91000256163330036&_=1536980037640",dateType:"jsonp",success:function(b){var d=/^\w*\(/;b=b.replace(d,"").replace(/\)$/,""),b=JSON.parse(b);var e=b.lst;a(".rimul").load("http://localhost:9090/proxy/page/template/rim.html",function(){var b=c("rimlist",{list:e});a(".rimul").html(b)})}})}),a(function(){function b(){a(".recommendul").load("http://localhost:9090/proxy/page/template/recommend.html",function(){var b=c("recommendlist",{list:recommendgoods});a(".recommendul").html(b)})}_script=document.createElement("script"),_script.src="http://localhost:9090/proxy/rec.www.mi.com/rec/guesslike?jsonpcallback=recommendaa",document.body.appendChild(_script),window.recommendaa=function(a){recommendgoods=a.data,null!=recommendgoods&&b()}}),a(".recommendnext").on("click",function(){if(4>recommendflag){recommendflag++;var b=-1240*(recommendflag-1);a(".recommendul").stop().animate({left:b},300),a(".recommendlast").addClass("recommendbtnactive")}}),a(".recommendlast").on("click",function(){if(1<recommendflag){recommendflag--;var b=-1240*(recommendflag-1);a(".recommendul").animate({left:b},600),a(".recommendnext").addClass("recommendbtnactive")}}),a(function(){new b(".content-swiper",{pagination:{el:".content-swiper-pagination",clickable:!0},effect:"fade",navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}})}),a(function(){var b=d.getCookie("true");b&&a(".top-bar-info").load("http://localhost:9090/proxy/page/template/afterlogin.html",function(){var d=c("afterloginlist",{list:b});a(".top-bar-info").html(d)})}),a(function(){a(".gotop").css({display:"none"}),a(window).scroll(function(){1e3<=a(window).scrollTop()?a(".gotop").css({display:"block"}):1e3>=a(window).scrollTop()&&a(".gotop").css({display:"none"})}),a(".gotop").click(function(){a("html,body").animate({scrollTop:0},300)})}),a(function(){var b=new Date,c=b.getHours(),d=b.getMinutes(),e=b.getSeconds(),f=2*parseInt(c/2)+2;22<=c&&(f=0),9<f?f:"0"+f,a(".times").text(f),c%=2;var g=3600*c+60*d+e,i=7200-g,c=parseInt(i/3600),d=parseInt((i-3600*c)/60),e=(i-3600*c)%60,j=setInterval(function(){0>=e&&1<=d&&(e=60,d--),0>=d&&1<=c&&(d=60),0<e&&e--,0==c&0==d&0==e&&clearInterval(j);var b=9<c?c:"0"+c,f=9<d?d:"0"+d,g=9<e?e:"0"+e;a("hour").text(b),a(".minutes").text(f),a(".second").text(g)},1e3)})})});var flashbuyflag=1,recommendflag=1,phonegoods=null,partsgoods=null,recommendgoods=null;function xmsearch(a){$(".search-droplist").html(""),0!=a.length&&$(".search-droplist").css({display:"block"}),0==a&&$(".search-droplist").css({display:"none"}),a.forEach(a=>{var b=$("<li>"),c=$("<span>"),d=$("<span>");c.addClass("search-droplist-left"),d.addClass("search-droplist-right"),c.text(a.Key);var e="\u7EA6\u6709"+a.Rst+"\u4EF6";d.text(e),c.appendTo(b),d.appendTo(b);document.getElementById("searchinput");b.css({margin:"0 10px",height:"30px","line-height":"30px"}),b.appendTo($(".search-droplist"))})}