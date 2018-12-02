
(function(){
        //获取元素页面绝对位置
    function offsetPage(obj) {
        var _left = obj.offsetLeft;
        var _top = obj.offsetTop;
        while(obj.offsetParent) {
                _left += obj.offsetParent.offsetLeft;
                _top += obj.offsetParent.offsetTop;
                obj = obj.offsetParent;
        }
        return {
                "left": _left,
                "top": _top
        };
    }
    
    //函数的事件添加
    var addEvent = (function() {
        if(window.VBArray) {
                return function(obj, eventname, func) {
                    obj.attachEvent("on" + eventname, func);
                }
        } else {
                return function(obj, eventname, func, isCapture) {
                    obj.addEventListener(eventname, func, !!isCapture);
                }
        }
    })();
    
    //合并对象
    function merge(a, b){
        if(!b) {
                return a;
        }
        var newobj = {};
        for(var attr in a){
                newobj[attr] = a[attr];
        }
        for(var attr in b) {
                newobj[attr] = b[attr];
        }
        return newobj;
    }
    
    var draggable = function(ele, _options) {
        //如果定位方式不是absolute，直接返回
        if(getStyle(ele,"position") != "absolute" && getStyle(ele,"position") != "fixed") return;
        
        var default_options = {
                x : true,
                y : true,
                limit : true,
                paddingLeft : 0,
                paddingRight :0,
                paddingTop : 0,
                paddingBottom  : 0,
                marginLeft : 0,
                marginTop : 0,
                callback : function(){}
        };
        
        var options = merge(default_options, _options);
        
        
        
        /*
        if(options.limit) { //如果用户设置了限定范围
                //计算元素的坐标取值范围
                var section = {
                    minLeft : options.paddingLeft - options.marginLeft,
                    maxLeft : ele.offsetParent.offsetWidth - ele.offsetWidth - options.paddingRight - options.marginLeft,
                    minTop : options.paddingTop - options.marginTop,
                    maxTop : (ele.offsetParent.offsetHeight - ele.offsetHeight) - options.paddingBottom - options.marginTop
                }
        }*/
        
        //console.log(section);
        
        var startPoint = {
                x: offsetPage(ele).left,
                y: offsetPage(ele).top
        }
        
        addEvent(ele, "mousedown", function(e){
                var e = e || event;
                
                //计算鼠标和要拖拽元素的相对位置
                var mouse = {
                    pageX : e.clientX + document.body.scrollLeft || document.documentElement.scrollLeft,
                    pageY : e.clientY + document.body.scrollTop || document.documentElement.scrollTop
                }
                mouse.offsetX = mouse.pageX - offsetPage(ele).left + options.marginLeft;
                mouse.offsetY = mouse.pageY - offsetPage(ele).top + options.marginTop;
                
                //添加移动事件
                addEvent(document, "mousemove", move);
                function move(e){
                    var e = e || event;
                    //计算鼠标当前的页面坐标pageX/Y
                    var currentPos = {
                            pageX : e.clientX + document.body.scrollLeft || document.documentElement.scrollLeft,
                            pageY : e.clientY + document.body.scrollTop || document.documentElement.scrollTop
                    }
                    
                    var section = {
                            minLeft : options.paddingLeft - options.marginLeft,
                            maxLeft : ele.offsetParent.offsetWidth - ele.offsetWidth - options.paddingRight - options.marginLeft,
                            minTop : options.paddingTop - options.marginTop,
                            maxTop : (ele.offsetParent.offsetHeight - ele.offsetHeight) - options.paddingBottom - options.marginTop
                    }
                    
                    
                    if(options.limit) { //如果限定范围
                            if(options.x) { //如果允许水平拖动
                                ele.style.left = Math.min(section.maxLeft ,Math.max(section.minLeft, currentPos.pageX - offsetPage(ele.offsetParent).left - mouse.offsetX)) + "px";
                            }
                            if(options.y) { //如果允许垂直拖动
                                ele.style.top = Math.min(section.maxTop ,Math.max(section.minTop, currentPos.pageY - offsetPage(ele.offsetParent).top - mouse.offsetY)) + "px";
                            }
                    } else {
                            if(options.x) {
                                ele.style.left = currentPos.pageX - offsetPage(ele.offsetParent).left - mouse.offsetX + "px";
                            }
                            if(options.y) {
                                ele.style.top = currentPos.pageY - offsetPage(ele.offsetParent).top - mouse.offsetY + "px";
                            }
                    }
                    options.callback.call(ele, section, {x:offsetPage(ele).left - startPoint.x, y:offsetPage(ele).top - startPoint.y});
                }
                addEvent(document, "mouseup", function(e){
                    //document.detach("mousemove", move);
                    document.removeEventListener("mousemove", move);
                });
        });
        
    }

    //animate( obj, {left: 300, width: 400})
    function animate(ele, options, callback){
        if(ele.isMoving) return;
        
        ele.isMoving = true;
        for(var attr in options) {
            (function(prop){
                var targetvalue = options[prop];  //获取到终点值
                ele[prop+"-timer"] = setInterval(function(){
                    if(prop == "opacity") {
                        var currentValue = parseFloat(getStyle(ele)[prop])*100;
                        var speed = (targetvalue - currentValue)/7;
                        speed = speed>0?Math.ceil(speed):Math.floor(speed);
                        ele.style.opacity = (currentValue + speed)/100;
                        ele.style.filter = "alpha(opacity="+(currentValue + speed)+")"
                        if(ele.style.opacity == targetvalue/100) {
                            clearInterval(ele["opacity-timer"]);
                            if(isAllover()) {
                                callback ? callback() : "";
                            }
                        }
                    } else {
                        var currentValue = parseInt(getStyle(ele)[prop]);
                        var speed = (targetvalue - currentValue)/7;
                        speed = speed>0?Math.ceil(speed):Math.floor(speed);
                        ele.style[prop] =  currentValue + speed + "px";
                        
                    }
                    
                    if(parseInt(getStyle(ele)[prop]) == targetvalue) {
                        clearInterval(ele[prop+"-timer"]);
                        if(isAllover()) {
                            callback ? callback() : "";
                        }
                    }
                }, 30);
                
            })(attr);
        }
        
        function isAllover() {
            var flag = true;
            for(var attr in options) {
                var targetval = options[attr];
                var curtVal = parseInt(getStyle(ele)[attr]);
                if(attr == "opacity") {
                    curtVal = getStyle(ele)[attr]*100;
                }
                if(curtVal != targetval) {
                    flag = false;
                    return flag;
                }
            }
            ele.isMoving = false;
            return flag;
        }
    }


    function getStyle(ele){
        if(ele.currentStyle) {
            return ele.currentStyle;
        } else {
            return getComputedStyle(ele);
        } 
    }

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
    $.ajax = function(options){
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
                //POST请求必须设置头信息
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
                //post请求的参数可以通过send方法提交
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
                //生成随机的函数名称
                var fnname = "_cbk"+Math.random()*10000000+newDate().getTime();
                //生成script标签，指定src属性
                _script.src = options.url + "&" + options.jsonp + "="+fnname;
                //准备好回调函数
                window[fnname] = function(data){
                    options.success(data); //调用success方法
                    _script.remove();      //删除script标签
                    delete window[fnname]; //删除回调函数
                }
                document.body.appendChild(_script);
            }

        }
    }

    window.$ = $;

})();
    
// $(".box").animate({left:100}, function(){})
// $("#box").draggable({
//     x : true,
//     y : false
// });
// $.ajax({
//     type : "jsop",
//     url : "xxxxxxxx?q=3&p=3",
//     jsonp : "cb",
//     success : function(data){
//         console.log(data);
//     }
// });



// $("#box")
// $(".container")
// $("div")

// $("#box[xx] ")
// $(".xx[prop=123]")
// $("div[name=xx]")


/**
 * draggbale 拖拽元素
 * 1.0版本
 * 使用方式：
 * draggable(ele, {
 *          x : false, //表示水平方向是否可拖拽
 *          y : true, //表示垂直方向是否可拖拽
 *          limit : true, //表示活动范围是否限制在定位父元素内
 *          paddingLeft : 0,  //增加填充，即进一步缩小活动范围
            paddingRight :0,  //增加填充，即进一步缩小活动范围
            paddingTop : 0,  //增加填充，即进一步缩小活动范围
            paddingBottom  : 0,  //增加填充，即进一步缩小活动范围
            maringLeft : 0, //设置margin值，可以消除由于margin带来的拖拽误差，不填则可能会受影响
            marginTop : 0, //设置margin值，可以消除由于margin带来的拖拽误差，不填则可能会受影响
            callback : function(section, distance){
                  回调函数，在拖拽过程中不断触发
                  两个参数分别为：拖拽元素的可活动范围大小，拖拽元素在可活动范围内的坐标
                  section包括，minLeft\maxLeft\minTop\maxTop
                  distance包括, x\y
                  绑定了this，回调函数中可以直接使用this来指向拖拽元素ele本身
            }
 * })
 * */

