//先加载config配置文件
require(["../conf/config"], function () {
    //再加载各个模块
    require(["jquery", "templateweb","cookie"], function ($, template,cookie) {
       
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
         // 商品评论信息处理数据处理
         $(function () {
            _script = document.createElement("script");
            _script.src = "http://localhost:9090/proxy/www.okhqb.com/detail/rates.json?goodsId=1000336433&status=0&currentPage=1&t=0.7450756714099216&callback=goodsinfoaa";
            document.body.appendChild(_script);
            window.goodsinfoaa = function (data) {
                goodsinfocontent = data.data.tcRates;
                if (goodsinfocontent != null) {
                    goodsinfocontentcallback();
                }
            }

            function goodsinfocontentcallback() {
                $(".contentul").load("http://localhost:9090/proxy/page/template/goodsinfocontent.html", function () {
                    var tempstr = template("goodsinfocontentlist", {
                        list: goodsinfocontent,
                    });
                    $(".contentul").html(tempstr);
                })
            };
        });
        // 商品主要信息信息处理数据处理
        $(function () {
            _script = document.createElement("script");
            _script.src = "http://localhost:9090/proxy/rec.www.mi.com/rec/collection?jsonpcallback=briefgoodsinfoaa";
            document.body.appendChild(_script);
            window.briefgoodsinfoaa = function (data) {
                briefgoodsinfo = data.data;
                if (briefgoodsinfo != null) {
                    briefgoodsinfocallback();
                }
            }

            function briefgoodsinfocallback() {
                $(".goodsmessageright").load("http://localhost:9090/proxy/page/template/briefgoodsinfo.html", function () {
                    var tempstr = template("briefgoodsinfolist", {
                        list: briefgoodsinfo,
                    });
                    $(".goodsmessageright").html(tempstr);
                     //模板写入后加入购物车写入cookie
                    $("#gocart").on("click",function(){
                        console.log("s");
                        var obj={
                            "name":"小米无线充电器（通用快充版）",
                            "price":"69",
                            "num":"1",
                            "img":"//i1.mifile.cn/a1/pms_1535440524.10478102!80x80.jpg",
                            "all":"0"
                        };
                        var _obj=JSON.stringify(obj);
                        cookie.setCookie("good",_obj,"","/");
                    })

                })
            };
        });
        // 商品图片查看样式处理
        $(".goodsmessage-left").find("li").click(function(){
            $(this).addClass("active").siblings().removeClass("active");
        })

    })
});
var briefgoodsinfo=null;
var goodsinfocontent=null;
function xmsearch(data) {
    console.log(data.length);
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
        $li.css({
            "margin": "0 10px",
            "height": "30px",
            "line-height": "30px"
        })
        $li.appendTo($(".search-droplist"));
    })
}

var phonegoods=null;