//先加载config配置文件
require(["../conf/config"], function () {
    //再加载各个模块
    require(["jquery", "swiper", "templateweb"], function ($, Swiper, template) {
       
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
       
        $(function () {
            _script = document.createElement("script");
            _script.src = "https://rms.vmall.com/comment/getCommentList.json?t=1537167237521&callback=phoneaa&pid=10086195106339&type=0&extraType=1&pageSize=10&pageNum=1";
            document.body.appendChild(_script);
            window.phoneaa = function (data) {
                phonegoods = data;
                if (phonegoods != null) {
                    phonecallback();
                }
            }

            function phonecallback() {
                // $(".matchul").load("http://localhost:9090/proxy/page/template/match.html", function () {
                //     var tempstr = template("matchlist", {
                //         list: phonegoods,
                //     });
                //     $(".matchul").html(tempstr);
                // })
                console.log(phonegoods);

                
            };
        });



      
    })
});

var phonegoods=null;
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
