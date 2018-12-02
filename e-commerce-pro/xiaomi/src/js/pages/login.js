require(["../conf/config"], function () {
    //再加载各个模块
    require(["jquery", "cookie"], function ($, cookie) {
        $(function () {
            $(".loginbtn").click(function () {
                // 判断用户名
                var uname = $("#uname").val();
                var pwds = cookie.getCookie(uname);
                if (pwds) {
                    //验证密码
                    var pwd=$("#upwd").val();
                    if(pwd==pwds){
                        window.location.href="http://localhost:9090/"; 
                        cookie.setCookie("true",uname,"","/")
                    }
                    else{
                        $(".loginalert").text("密码不正确").css({
                            display:"block",
                        })
                    }
                } else{
                    $(".loginalert").text("用户名不正确").css({
                        display:"block",
                    })
                }
            })


        })

    })
})