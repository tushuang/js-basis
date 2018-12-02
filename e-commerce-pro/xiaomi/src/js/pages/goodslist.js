//先加载config配置文件
require(["../conf/config"], function () {
    //再加载各个模块
    require(["jquery", "templateweb"], function ($, template) {

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
        //闪购商品列表的展示
        $(function () {
            var date = new Date();
            date = date.getTime() + "";
            date = date.slice(0, 10);
            updatelist();
            $(".seckill").find("li").click(function () {
                
                listd = $(this).index();
                $(this).addClass("active").siblings().removeClass("active");
                updatelist();
            })

            function updatelist() {
                var date = new Date();
                date = date.getTime() + "";
                date = date.slice(0, 10);
                _script = document.createElement("script");
                _script.src = `http://localhost:9090/proxy/a.huodong.mi.com/flashsale/getlist?jsonpcallback=parts&now_time=${date}&size=15&page=1&_=1537327244700`;
                document.body.appendChild(_script);
                window.parts = function (data) {
                    partsgoods = data.data.data.list[listd].list;
                    if (partsgoods != null) {
                        partscallback();
                    }
                }

                function partscallback() {
                    $(".goodsshow").load("http://localhost:9090/proxy/page/template/goodslistshow.html", function () {
                        var tempstr = template("goodsshowlist", {
                            list: partsgoods,
                        });
                        $(".goodsshow").html(tempstr);
                    })
                };
            }

        });
        //抢购的场次判断
        var date=new Date();
        var h=date.getHours();
        h=parseInt(h/2)*2;
        var a=[];
        for(var i=0;i<5;i++){
            h=h+2;
            h=h%24;
            a[i]=h;
            a[i]>9?a[i]:"0"+a[i];
            $(".lists").eq(i).find("span").text(a[i]);
        }
       

    })
});
var partsgoods = null;
var listd = 0;

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

var phonegoods = null;