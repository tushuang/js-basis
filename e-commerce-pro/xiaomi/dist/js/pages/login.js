require(["../conf/config"],function(){require(["jquery","cookie"],function(a,b){a(function(){a(".loginbtn").click(function(){var c=a("#uname").val(),d=b.getCookie(c);if(d){var e=a("#upwd").val();e==d?(window.location.href="http://localhost:9090/",b.setCookie("true",c,"","/")):a(".loginalert").text("\u5BC6\u7801\u4E0D\u6B63\u786E").css({display:"block"})}else a(".loginalert").text("\u7528\u6237\u540D\u4E0D\u6B63\u786E").css({display:"block"})})})})});