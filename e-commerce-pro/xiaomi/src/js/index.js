//先加载config配置文件
require(["conf/config"], function () {
    //再加载各个模块
    require(["jquery", "swiper", "templateweb", "cookie"], function ($, Swiper, template, cookie) {
        //轮播图插件
        $(function () {
            var mySwiper = new Swiper('.swiper-container', {
                autoplay: true, //可选选项，自动滑动
                loop: true,
                // 如果需要分页器
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                //切换方式
                effect: 'fade',
                // 如果需要前进后退按钮
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            })
        })
        //搜索框板块焦点消失
        $(".searchinputbox").find("input").focus(function () {
            $(".searchinput-text1").css({
                display: "none"
            });
            $(".searchinput-text2").css({
                display: "none"
            })
            $(".searchinputbox").css({
                borderColor: "#FF6700",
            })
            $(".icon-sousuo-box").css({
                borderColor: "#FF6700",
            })

        })
        //搜索框板失去焦点块出现
        $(".searchinputbox").find("input").focusout(function () {
            if ($(".searchinputbox").find("input").val().length == 0) {
                $(".searchinput-text1").css({
                    display: "block"
                });
                $(".searchinput-text2").css({
                    display: "block"
                })
            }
            $(".searchinputbox").css({
                borderColor: "#cccccc",
            })
            $(".icon-sousuo-box").css({
                borderColor: "#cccccc",
            })
            $(".search-droplist").css({
                display: "none"
            })
        })
        //处理搜索数据

        var $Oinput = $(".searchinputbox").find("input");
        $Oinput.on("input", function () {
            _script = document.createElement("script");
            _script.src = `http://localhost:9090/proxy/search.mi.com/search/expand?keyword=${this.value}&jsonpcallback=xmsearch`;
            document.body.appendChild(_script);
        })
        //左侧菜单
        $(function(){
            $(".menu-left").find("li").hover(function(){
                $(".comeuplist").css({
                    display:"block"
                })
            },function(){
                $(".comeuplist").css({
                    display:"none"
                })
            })
        })
        // 小米闪购模块数据处理
        $(function () {
            $.ajax({
                type: "get",
                url: " http://localhost:9090/proxy/a.huodong.mi.com/flashsale/getslideshow",
                dateType: "json",
                success: function (data) {
                    var goods = data.data.list.list;
                    $(".flashbuygoodbox").load("http://localhost:9090/proxy/page/template/flashbuy.html", function () {
                        //上变框颜色列表
                        var colors=["#FFAC13","#83C44E","#2196F3","#E53935","#00C0A5","#FFAC13","#83C44E","#2196F3"];
                        var tempstr = template("flashbuylist", {
                            list: goods,
                            colors:colors
                        });
                        $(".flashbuygoodbox").html(tempstr);
                    })
                }
            })
        });
        //闪购按钮滑动
        //当向右切换时
        $(".flashbuynext").on("click", function () {
            if (flashbuyflag == 1) {
                flashbuyflag = 2;
                $(".flashbuygoodbox").stop().animate({
                    left: -992,
                }, 300)
                $(this).removeClass("flashbuybtnactive");
                $(".flashbuylast").addClass("flashbuybtnactive");
            }
        })
        //当向左切换时
        $(".flashbuylast").on("click", function () {
            if (flashbuyflag == 2) {
                flashbuyflag = 1;
                console.log("S")
                $(".flashbuygoodbox").animate({
                    left: 0,
                }, 600)
                $(this).stop().removeClass("flashbuybtnactive");
                $(".flashbuynext").addClass("flashbuybtnactive");
            }
        })
        // 手机模块数据处理
        $(function () {
            $.ajax({
                type: "get",
                url: "http://localhost:9090/proxy/bigd.gome.com.cn/gome/rec?callback=phonecallback&boxid=box82&pid=9140074135&cid=124407418736773848&uid=76987513076&area=65010100&brid=10007234&imagesize=100&c1id=cat31665542&c3id=cat10000070&shopid=&sid=1130551063&_=1536774335066",
                dateType: "jsonp",
                success: function (data) {
                    var reg = /^\w*\(/;
                    data = data.replace(reg, "").replace(/\)$/, "");
                    data = JSON.parse(data);
                    var goods = data.lst;
                    $(".phoneul").load("http://localhost:9090/proxy/page/template/phone.html", function () {
                        var tempstr = template("phonelist", {
                            list: goods
                        });
                        $(".phoneul").html(tempstr);
                    })
                }
            })
        });
        // 家电模块数据处理
        $(function () {
            $.ajax({
                type: "get",
                url: "http://localhost:9090/proxy/bigd.gome.com.cn/gome/rec?callback=bigd20778&boxid=box70&pid=&area=11010200&cid=208461623236978755&currentpage=2&uid=&imagesize=160&c1n=&c3n=&brid=&shopid=&c3id=&c2id=&sid=&pagingid=0a70b91000256163330036&_=1536980037640",
                dateType: "jsonp",
                success: function (data) {
                    var reg = /^\w*\(/;
                    data = data.replace(reg, "").replace(/\)$/, "");
                    data = JSON.parse(data);
                    var goods = data.lst;
                    $(".wiringul").load("http://localhost:9090/proxy/page/template/wiring.html", function () {
                        var tempstr = template("wiringlist", {
                            list: goods
                        });
                        $(".wiringul").html(tempstr);
                    })
                }
            })
        });
        // 智能模块数据处理
        $(function () {
            $.ajax({
                type: "get",
                url: "http://localhost:9090/proxy/ajaxtuan.gome.com.cn/cheap/getIndexRushbuyItem?areaCode=11010000&callback=tuanbackshouye&_=153698738074",
                dateType: "jsonp",
                success: function (data) {
                    var reg = /^\w*\(/;
                    data = data.replace(reg, "").replace(/\)$/, "");
                    data = JSON.parse(data);
                    var goods = data.data.indexRushItem;
                    $(".zhinengul").load("http://localhost:9090/proxy/page/template/zhineng.html", function () {
                        var tempstr = template("zhinenglist", {
                            list: goods
                        });
                        $(".zhinengul").html(tempstr);
                    })
                }
            })
        });
        // 小米搭配模块数据处理
        $(function () {
            _script = document.createElement("script");
            _script.src = "http://localhost:9090/proxy/rec.www.mi.com/rec/collection?jsonpcallback=phoneaa";
            document.body.appendChild(_script);
            window.phoneaa = function (data) {
                phonegoods = data.data;
                if (phonegoods != null) {
                    phonecallback();
                }
            }

            function phonecallback() {
                $(".matchul").load("http://localhost:9090/proxy/page/template/match.html", function () {
                    var tempstr = template("matchlist", {
                        list: phonegoods,
                    });
                    $(".matchul").html(tempstr);
                })
            };
        });

        // 小米配件模块数据处理
        $(function () {
            _script = document.createElement("script");
            _script.src = "http://localhost:9090/proxy/rec.www.mi.com/rec/accessory?jsonpcallback=partsaa";
            document.body.appendChild(_script);
            window.partsaa = function (data) {
                partsgoods = data.data;
                if (partsgoods != null) {
                    partscallback();
                }
            }

            function partscallback() {
                $(".partsul").load("http://localhost:9090/proxy/page/template/parts.html", function () {
                    var tempstr = template("partslist", {
                        list: partsgoods,
                    });
                    $(".partsul").html(tempstr);
                })
            };
        });
        // 周边模块数据处理
        $(function () {
            $.ajax({
                type: "get",
                url: "http://localhost:9090/proxy/bigd.gome.com.cn/gome/rec?callback=bigd20778&boxid=box70&pid=&area=11010200&cid=208461623236978755&currentpage=2&uid=&imagesize=160&c1n=&c3n=&brid=&shopid=&c3id=&c2id=&sid=&pagingid=0a70b91000256163330036&_=1536980037640",
                dateType: "jsonp",
                success: function (data) {
                    var reg = /^\w*\(/;
                    data = data.replace(reg, "").replace(/\)$/, "");
                    data = JSON.parse(data);
                    var goods = data.lst;
                    $(".rimul").load("http://localhost:9090/proxy/page/template/rim.html", function () {
                        var tempstr = template("rimlist", {
                            list: goods
                        });
                        $(".rimul").html(tempstr);
                    })
                }
            })
        });
        // 为你推荐模块数据处理
        $(function () {
            _script = document.createElement("script");
            _script.src = "http://localhost:9090/proxy/rec.www.mi.com/rec/guesslike?jsonpcallback=recommendaa";
            document.body.appendChild(_script);
            window.recommendaa = function (data) {
                recommendgoods = data.data;
                if (recommendgoods != null) {
                    recommendcallback();
                }
            }
            function recommendcallback() {
                $(".recommendul").load("http://localhost:9090/proxy/page/template/recommend.html", function () {
                    var tempstr = template("recommendlist", {
                        list: recommendgoods,
                    });
                    $(".recommendul").html(tempstr);
                })
            };
        });
        //为你推荐按钮滑动
        //当向右切换时
        $(".recommendnext").on("click", function () {
            if (recommendflag < 4) {
                recommendflag++;
                var dis = -1240 * (recommendflag - 1)
                $(".recommendul").stop().animate({
                    left: dis,
                }, 300)
                //$(this).removeClass("recommendbtnactive");
                $(".recommendlast").addClass("recommendbtnactive");
            }
        })
        //当向左切换时
        $(".recommendlast").on("click", function () {
            if (recommendflag > 1) {
                recommendflag--;
                var dic = -1240 * (recommendflag - 1)
                $(".recommendul").animate({
                    left: dic,
                }, 600)
                $(".recommendnext").addClass("recommendbtnactive");
            }
        })
        //内容轮播图
        $(function () {
            var mySwiper = new Swiper('.content-swiper', {
                // 如果需要分页器
                pagination: {
                    el: '.content-swiper-pagination',
                    clickable: true,
                },
                //切换方式
                effect: 'fade',
                // 如果需要前进后退按钮
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });
        })
        //用户登录后局部内容改变
        $(function () {
            var flag = cookie.getCookie("true");
            if (flag) {
                $(".top-bar-info").load("http://localhost:9090/proxy/page/template/afterlogin.html", function () {
                    var tempstr = template("afterloginlist", {
                        list: flag,
                    });
                    $(".top-bar-info").html(tempstr);
                })
            }
        })
        // 回到顶部按钮
        $(function () {
            $(".gotop").css({
                display: "none"
            })
            $(window).scroll(function () {
                if ($(window).scrollTop() >= 1000) {
                    $(".gotop").css({
                        display: "block"
                    })
                } else if ($(window).scrollTop() <= 1000) {
                    $(".gotop").css({
                        display: "none"
                    })
                }
            })
            $(".gotop").click(function(){
                $("html,body").animate({scrollTop: 0},300);
            })
        }) 
        //商品倒计时处理
        $(function(){
            var date=new Date();
            var h=date.getHours();
            var m=date.getMinutes();
            var s=date.getSeconds();
            //得到场次
            var hs=parseInt(h/2)*2+2;
            if(h>=22){
                hs=0;
            }
            hs>9?hs:"0"+hs;
            $(".times").text(hs);
            //得到时分秒
            h=h%2;
            var all=h*3600+m*60+s;
            var cha=7200-all;
            var h=parseInt(cha/3600);
            var m=parseInt((cha-h*3600)/60);
            var s= (cha-h*3600)%60 ;
            var timer=setInterval(function(){
                if(s<=0){
                    if(m>=1){
                         s=60;
                         m--;
                    }
                }
                if(m<=0){
                    if(h>=1){
                        m=60;
                        //h--;
                    }
                }
                if(s>0){
                    s--;
                }
                if(h==0&m==0&s==0){
                    clearInterval(timer);
                }
                var _h=h>9?h:"0"+h;
                var _m=m>9?m:"0"+m;
                var _s=s>9?s:"0"+s;
                $("hour").text(_h);
                $(".minutes").text(_m);
                $(".second").text(_s);
            },1000)
        })

        
    })
});
//闪购左右切换按钮的标志
var flashbuyflag = 1;
//为你推荐左右切换按钮的标志
var recommendflag = 1;
//手机板块函数预定义
var phonegoods = null;
//配件板块函数预定义
var partsgoods = null;
//推荐板块函数预定义
var recommendgoods = null;
//搜索框回调函数
function xmsearch(data) {
    $(".search-droplist").html("");
    if (data.length != 0) {
        $(".search-droplist").css({
            display: "block"
        })
    }
    if (data == 0) {
        $(".search-droplist").css({
            display: "none"
        })
    }
    data.forEach((item) => {
        var $li = $("<li>");
        var $span1 = $("<span>")
        var $span2 = $("<span>")
        $span1.addClass("search-droplist-left");
        $span2.addClass("search-droplist-right");
        $span1.text(item.Key);
        var t = "约有" + item.Rst + "件";
        $span2.text(t);
        $span1.appendTo($li);
        $span2.appendTo($li);
        var searchInput = document.getElementById("searchinput");
        $li.css({
            "margin": "0 10px",
            "height": "30px",
            "line-height": "30px"
        })
        $li.appendTo($(".search-droplist"));
    })
}
