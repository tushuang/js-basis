//先加载config配置文件
require(["../conf/config"], function () {
    //再加载各个模块
    require(["jquery", "cookie"], function ($, cookie) {
        $(function () {
            var $id = $("#account");
            var $pwd = $("#pwd");
            var pwd=0;
            var id=0;
            //验证手机号
            $id.blur(function(){
                var reg=/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
                if(reg.test($id.val())){
                    id=1;
                    $(".alertphone").css({
                        display:"none"
                    })
                    $(".inputnum").css({
                        border:"none"
                    })
                }
                else{
                    $(".inputnum").css({
                        border:"#FF6700 solid 1px"
                    })
                    $(".alertphone").css({
                        display:"block"
                    })
                }
            })
            //验证密码
            $pwd.blur(function(){
                var reg=/^[a-z]\w{5,17}$/i;
                if(reg.test($pwd.val())){
                    pwd=1;
                    $(".countryinfo").text("密码格式符合要求").css({
                        color: "green"
                    })
                    $(".country").css({
                        border:"solid #E8E8E8 1px"
                    })
                }
                else{
                    $(".countryinfo").text("6-18位的字母数字下划线组成，不能由数字开头").css({
                        color: "red"
                    })
                    $(".country").css({
                        border:"solid 1px #FF6700"
                    })
                }
            })
            $(".signupbtn").click(function () {
                
                //如果手机号密码都合格
                if(id==1&&pwd==1){
                   cookie.setCookie($id.val(),$pwd.val(),"","/");
                   window.location.href="http://localhost:9090/";
                   cookie.setCookie("true",$("#account").val(),"","/")
                }
            })
        })





    })
})