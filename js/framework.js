(function(){
	function animate(ele,options,allTime,callback){  
		 //还要保证不能同时调用两次animate函数 或者 必须保证当前animate未结束之前 不能再次调用
		if(ele.isOver) return;
		ele.isOver = true;
		allTime = allTime*30 ||8;
		for(var attr in options){  
			(function(attr){   //采用闭包函数 访问animate的内部变量 attr不再是外面的attr 而是传进来的attr
				var targetNum = options[attr];  //取出目标值  50
				ele[attr+"-timer"] = setInterval(function(){  //由于定时器是异步函数 所以会先执行for循环 以至于只有最后一个定时器生效
					//还要判断opacity属性 和 IE的兼容
					if(attr == "opacity"){
						var attrValue = getStyle(ele)[attr] * 100;
						var speed = (targetNum - attrValue)/allTime;
						speed = speed > 0? Math.ceil(speed):Math.floor(speed);
						ele.style.opacity = (attrValue + speed)/100;  
						ele.style.filter = "alpha(opacity="+(attrValue + speed) +")";  //IE兼容
					}else{
						var attrValue = parseInt(getStyle(ele)[attr]); //获取该属性当前的值
						var speed = (targetNum - attrValue)/allTime; //使速度是一个整数  speed可能等于0 
						speed = speed > 0? Math.ceil(speed):Math.floor(speed);
						ele.style[attr] = attrValue + speed + "px";
					}
					if( speed == 0 ){
						clearInterval(ele[attr+"-timer"]);
						if(isAllOver()){
							callback?callback():"";
							ele.isOver = false;
						}
						
					}
				},30);
			})(attr);
		}
		
		//判断函数是否已经结束 实现动画效果 
		function isAllOver(){
			//判断属性值是否已经等于目标值
			var flag = true;
			for(var attr in options){
				var targetNum = options[attr];
				if(attr == "opacity"){
					if(getStyle(ele)[attr]*100 != targetNum){
						flag = false;
					}
				}else {
					if(parseInt(getStyle(ele)[attr]) != targetNum){
						flag = false;
					}
				}
			}
			//ele.isOver = false;
			return flag;
		}
	}
	
	//获得元素的样式
	var getStyle = function(ele){
		if(ele.currentStyle) {
			return ele.currentStyle;
		} else {
			return getComputedStyle(ele);
		} 
	}
	
	//事件捕获函数的封装 解决兼容
	var addEventHander = function(ele,even,fn,isCapture){
		if(addEventListener){
			ele.addEventListener(even,fn,isCapture);
		}else {
			ele.attachEvent("on"+even,fn);
		}
	}
	
	//获得页面的绝对位置
	var getPagePosition = function(target){
		var sumLeft = target.offsetLeft;
		var sumTop = target.offsetTop;
		while(target.offsetParent != null){    //获取有定位的父元素
			sumLeft += target.offsetParent.offsetLeft; //自身相对父元素的定位 加上有定位的父元素相对于页面或者其他元素的定位
			sumTop += target.offsetParent.offsetTop;  
			
			target = target.offsetParent;
		}
		return {
			pagesX:sumLeft,  //之间返回一个对象
			pagesY:sumTop
		};
	}
	
	var randInt = function(min,max){  //随机数
		return parseInt((Math.random()*(max-min))+min);
	}
	
	
	function $(selector){
		if(selector[0]=='#'){   //ID
			var str = selector.substring(1,selector.length);
			ele = document.getElementById(str);
			console.log(ele);
		}else if(/^\.[a-zA-Z0-9]$/.test(selector)){  //class
			var str = selector.replace(/\./,"");
			ele = Array.from( document.getElementsByClassName(str));
		}else if(/^\.\w+\[[0-9]\]$/.test(selector)){  //类名传进来的时候 判断有无下标
			var str = selector.replace(/\[[0-9]\]/,"").replace(/\./,"");
			var num = selector.replace(/^\.\w+\[/,"").replace(/\]/,"");
			ele =  document.getElementsByClassName(str)[num];
		}else if(/^\w+$/.test(selector)){  // 不写加号只能匹配到一个
			ele = Array.from(document.getElementsByTagName(selector));
		}else if(/^\w+\[[0-9]\]$/.test(selector)){  //标签传进来的时候 判断有没有下标
			var str = selector.replace(/\[[0-9]\]/,"");
			var num = selector.replace(/\w+\[/,"").replace(/\]/,"");
			ele = document.getElementsByTagName(str)[num];
		}
		
		//$(".box[1]").animate;
		return {
			animate : function(options,allTime,callback){  
				
				if( !(ele instanceof Array))  animate(ele,options,allTime,callback);  //先判断是不是数组
				else {
					ele.forEach(function(item){
						animate(item,options,allTime,callback);
					})
				}
			},
			getStyle : function(attr){   //如果不是数组则获得该元素的样式
				if( !(ele instanceof Array)) {
					return getStyle(ele)[attr];
				}
			},
			addEventHander : function(even,fn,isCapture){
				if(!(ele instanceof Array)) addEventHander(ele,even,fn,isCapture);
			},
			getPagePosition : function(){
				if(!(ele instanceof Array)) return getPagePosition(ele);
			},
			ele : ele
			
		}
	}
	
	$.ajax = function(options){  //设置静态方法
		var req = window.ActiveXObject?new ActiveXObject():new XMLHttpRequest();  
		switch(options.type){
			case "get":{
				req.open("GET",options.url);
				req.onreadystatechange = function(){
					if(req.readyState == 4){
						options.success(req.responseText);
					}
				}
				req.send();
			};break;
			case "post":{
				req.open("POST",options.url);
				var str = "";
				req.onreadystatechange = function(){
					if(req.readyState == 4){
						options.success(req.responseText);
					}
				}
				for(var attr in options.data){
					str += attr+"="+options.data[attr]+"&";
				}
				req.send(str.substring(0,str.length-1));				
			};break;
		/*	case "jsonp":{
				var _script = document.createElement("script");
				_script.src = options.url;
				document.body.appendChild(_script);
				var reg = new RegExp(options.jsonp+"=([^&]+)");  //匹配到 cb = callback
				var f = options.url.match(reg)[1];  //返回的是一个数组 cb=callback callback
				window[f] = function(data){ //浏览器返回数据时自动调用的
					options.success(data);
					_script.remove();
				}*/				
			case "jsonp":{   //和上面的区别是 传url时不写回调函数
				var _script = document.createElement("script");
				document.body.appendChild(_script);
				var fname = "_"+parseInt(Math.random()*1000)+new Date().getMinutes(); //自定义回调函数名字
				_script.src = options.url + "&" + options.jsonp + "="+fname;
				window[fname] = function(data){ //浏览器返回数据时自动调用的
					options.success(data);
					_script.remove();
					delete window[fname];
				}
			};break;
		}
	}
	
	$.randInt = function(min,max){  //随机数
		return parseInt((Math.random()*(max-min))+min);
	}
	
	$.randColor = function(){
		var r= randInt(0,255);
		var g= randInt(0,255);
		var b= randInt(0,255);
		return "rgb("+r+","+g+","+b+")";
	}
	$.getCookie = function(key){
		var cookiestr = document.cookie;
		var list = cookiestr.split("; ");
		for(i in list){
			var str = list[i].split("=");
			if(str[0] == key) return str[1];
		}
		return null;
	}
	$.setCookie = function(key,value,expires,path){
		switch(arguments.length){ //判断参数 的个数
			case 0:
			case 1:throw new Error("参数传错了");
			case 2:{
				document.cookie = key +"="+ value;
			}break;
			case 3:{
				var parm = arguments[2];
				if(typeof parm == "number"){
					var d = new Date();
					d.setSeconds(d.getSeconds()+parm);
					document.cookie = key +"="+ value+";expires="+d;
				}else{
					document.cookie = key +"="+ value+";path="+parm;
				}
			};break;
			case 4:{
				var d = new Date();
				d.setSeconds(d.getSeconds()+ expires);
				document.cookie = key +"="+ value+";expires="+d+";path="+path;
			}
		}
	}
	window.$ = $;
})();


/*
* $.ajax({
	type:"get/post/jsonp";
	url:
	success:function(data){  //当执行成功后 对数据操作的内容
		//内容
	}
	data:{    //使用post时url后如果需要传入数据 
		a:XXX,
		b:xxx
	}
	jsonp:"cb"; //浏览器固定的回调函数名字
})
*/

