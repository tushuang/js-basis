//先加载config配置文件
require(["../conf/config"], function () {
    //再加载各个模块
    require(["jquery", "cookie", "templateweb"], function ($, cookie, template) {
        //商品数据处理
        $(function () {
            updata();

            function updata() {
                var goods = cookie.getCookie("good");
                if (goods) {
                    $(".p1").find("span").text(1);
                    var obj = JSON.parse(goods);
                    $(".goodname").text(obj.name);
                    $("#mimg").attr("src", obj.img);
                    $(".goodprice").text(obj.price);
                    $(".numbers").text(obj.num);
                    $(".font").find("span").text(obj.all);
                    $(".numprice").text(Number(obj.price) * Number(obj.num) + "元")
                }

            }
            //当进行操作时
            $(".btn1").on("click", function () {
                var goods = cookie.getCookie("good");
                var obj = JSON.parse(goods);
                if (obj.num > 1) {
                    obj.num--;
                    var goods = JSON.stringify(obj);
                    cookie.setCookie("good", goods, "", "/");
                    updata();
                }
            })
            $(".btn2").on("click", function () {
                var goods = cookie.getCookie("good");
                if (goods) {
                     var obj = JSON.parse(goods);
                    obj.num++;
                    var goods = JSON.stringify(obj);
                    cookie.setCookie("good", goods, "", "/");
                    updata();
                }
               
            })

            function updataselect() {
                var goods = cookie.getCookie("good");
                if (goods) {
                    var obj = JSON.parse(goods);
                $(".font").find("span").text(Number(obj.price) * Number(obj.num));
                }
            }
            //全选按钮和单选按钮
            $(".selectone").on("click", function () {
                var isAllcheck = $(".selectone").is(function (index) {
                    return !$(this).prop("checked");
                });
                if (!isAllcheck) {
                    $(".select-all").prop("checked", true);
                    updataselect();
                } else {
                    $(".font").find("span").text(0);
                    $(".select-all").prop("checked", false);
                }
            })
            $(".select-all").on("click", function () {
                if ($(".select-all").prop("checked")) {
                    updataselect();
                } else {
                    $(".font").find("span").text(0);
                }
                $(".selectone").prop("checked", $(this).prop("checked"));
            })
            //当删除商品时
            $(".deletethis").on("click", function () {
                cookie.setCookie("good","none","-999999","/");
                $(".p1").find("span").text(0);
                $(".goods").css({
                    display: "none"
                })
            })


        })

    })
})