

function $(selector){
    //选择器，选取dom元素
    if(/^#.+/.test(selector)) {
        var doms = [document.getElementById(selector.substring(1))];
    }
    if(/^\..+/.test(selector)) {
        var doms = Array.from(document.getElementsByClassName(selector.substring(1)));
    }
    if(/^[a-z].+/i.test(selector)) {
        var doms =  Array.from(document.getElementsByTagName(selector));
    }
    // if(  )
    return {
        animate : function(){
            var args = Array.from(arguments);
            doms.forEach(dom=> {
                animate(dom, ...args);
            })
        },
        draggable : function(options){
            
            doms.forEach(dom=>{
                draggable(dom, options)
            })
        }
    }
}
$.ajax = function(options){  //加静态属性
    var req = window.ActiveXObject? new ActiveXObject() : new XMLHttpRequest();
    switch(options.type) {
        case "get" : {
            req.open("get", options.url);
            req.onreadystatechange = function(){
                if(req.readystate == 4){
                    options.success(req.responseText);
                } 
            }
            req.send();
            break;
        }
        case "post" : {
            req.open("post", options.url);
            req.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            req.onreadystatechange = function(){
                if(req.readystate == 4){
                    options.success(req.responseText);
                } 
            }
            var datastr = "";
            for(var attr in options.data) {
                datastr += attr+"="+options.data[attr] + "&";
            }
            req.send(datastr.substring(0,datastr.length-1));
            break;
        }
        // case "jsonp" : {
        //     var _script = document.createElement("script");
        //     _script.src = options.url;
        //     var reg = new RegExp(options.jsonp+"=([^&]+)");
        //     var funname = otpions.url.match(reg)[1];
        //     window[funname] = function(data){
        //         options.success(data);
        //         _script.remove();
        //     }
        //     document.body.appendChild(_script);
        // }
        case "jsonp" : {
            var _script = document.createElement("script");
            var fnname = Math.random()*10000000+newDate().getTime();
            _script.src = options.url + "&" + options.jsonp + "=_cbk"+fnname;
            //"xxxxxxxx?q=3&p=3&cb=_cbk1231231231241242354353453453454353453"
            window["_cbk"+fnname] = function(data){
                options.success(data);
            }
        }

    }
}


$(".box").animate({left:100}, function(){})
$("#box").draggable({
    x : true,
    y : false
});
$.ajax({
    type : "jsop",
    url : "xxxxxxxx?q=3&p=3",
    jsonp : "cb",
    success : function(data){
        console.log(data);
    }
});



// $("#box")
// $(".container")
// $("div")

// $("#box[xx] ")
// $(".xx[prop=123]")
// $("div[name=xx]")

