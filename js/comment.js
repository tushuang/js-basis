 function getStyle(ele){           //获得样式
	if(ele.currentStyle){
		return ele.currentStyle;   //ie
	}else{
		return getComputedStyle(ele,null);  //其他
	}
 }
 
 //过滤空白文本节点
function getAtrributeNodes(nodelist){
	var temp = [];
	for(var i=0;i<nodelist.length;i++){
		if(nodelist[i].nodeType == 1){
			temp.push(nodelist[i]);
		}
	}
	console.log(temp);
	return temp;
}

(function(){
	if(!(document.getElementsByClassName)){                       //ie不识别getElementsByClassName 
		document.getElementsByClassName = function (classname){   //给getElemngtsByClassName定义一个函数
			var temp = [];                                  
			var list = document.getElementsByTagName("*");        //先获取所有的标签名
			for(var i = 0;i<list.length;i++){                      //再取出标签名的className属性
				if(list[i].indexOf(classname) != null){            //传入的可能是一个class属性数组 只要数组里有classname则放入空数组
					temp.push(list[i]);
				}
			}
			return temp;                                             //最后返回数字
		}
		document.getElementsByClassName("abc");                      //调用函数
	}
})();


function randInt(min,max){  //随机数
	return parseInt((Math.random()*(max-min))+min);
}

function randColor(){
	var r= randInt(0,255);
	var g= randInt(0,255);
	var b= randInt(0,255);
	return "rgb("+r+","+g+","+b+")";
}
//获取元素在页面的绝对位置
function getPagePosition(target){
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

//递归写法 f(x) = x + f(x.parent)
/*function getPagePosition(target){
	if(target.offsetParent == null)
		return {
			pageX : 0,
			pageY :0
		};
	var parentP = getPagePosition(target.offsetParent); //要把这个放在判断之后
	return {
		pageX : target.offsetLeft + parentP.pageX,
		pageY : target.offsetTop + parentP.pageY
	};
}
*/
function section(val,min,max){   //限定数字的范围 如果在min max之间 返回val 
	return Math.max(min,Math.min(max,val));
}
// 转化数组
function toArray(arr){
	var temp = [];
	for(var i=0;i<arr.length;i++){
		temp.push(arr[i]);
	}
	return temp;
}

//事件捕获函数的封装
function addEventHander(ele,even,fn,isCapture){
	if(addEventListener){
		ele.addEventListener(even,fn,isCapture);
	}else {
		ele.attachEvent("on"+even,fn);
	}
}

//封装一个拖拽函数
function draggable(ele,box,title,callback){  //ele拖拽的元素 box 限制的宽度 title是标题
	//getComputedStyle(ele).position = "absolute";
	/*if(ele.parentNode){
		ele.parentNode.style.position = "relative";
		console.log("1ok");
	}*/
	var target = title || ele;
	target.onmousedown = function(e){
		var e = e||event;
		pos = {
			x:e.offsetX,
			y:e.offsetY
		};
		document.onmousemove = function(e){
			var e = e || event;
			ele.style.margin = 0;
			var limitWidht = box?(box.offsetWidth - ele.offsetWidth):window.innerWidth - ele.offsetWidth;
			var limitHeight = box?(box.offsetHeight - ele.offsetHeight):window.innerHeight - ele.offsetHeight;
			if(!box){
				ele.style.left = Math.max(0,Math.min(limitWidht, e.clientX - pos.x ))+"px";
				console.log("123");
				ele.style.top = Math.max(0,Math.min(limitHeight, e.clientY - pos.y ))+"px";
			}else{
				//ele.style.left = Math.max(-getPagePosition(box).pagesX,Math.min(window.innerWidth - ele.offsetWidth- getPagePosition(box).pagesX, e.clientX - pos.x - getPagePosition(box).pagesX))+"px";
				//console.log(- getPagePosition(box).pagesX);
				//ele.style.left = Math.max(0,Math.min(0, e.clientX - pos.x ))+"px";
				//console.log(window.innerHeight - ele.offsetHeight - 2*getPagePosition(box).pagesY);
				//ele.style.top = Math.max(0,Math.min(window.innerHeight - ele.offsetHeight - 2*getPagePosition(box).pagesY, e.clientY - pos.y))+"px";
				//ele.style.top = Math.max(-getPagePosition(box).pagesY,Math.min(window.innerHeight - ele.offsetHeight -getPagePosition(box).pagesY, e.clientY - pos.y-getPagePosition(box).pagesY ))+"px";
				ele.style.left = Math.max(0,Math.min(box.offsetWidth - ele.offsetWidth,e.clientX - pos.x- getPagePosition(box).pagesX)) + "px";
				ele.style.top = Math.max(0,Math.min(box.offsetHeight - ele.offsetHeight,e.clientY - pos.y- getPagePosition(box).pagesY)) + "px";
				
				callback?callback():"";
			}
		}
	}
	document.onmouseup = function(){
		document.onmousemove = null;
	}
}


//获得cookie值
function getCookie(key){
	var cookiestr = document.cookie;
	var list = cookiestr.split("; ");
	for(i in list){
		var str = list[i].split("=");
		if(str[0] == key) return str[1];
	}
	return null;
}
//设置cookie值
//以秒为单位
/*function setCookie(key,value,expires,path){
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
		}
		case 4:{
			var d = new Date();
			d.setSeconds(d.getSeconds()+ expires);
			document.cookie = key +"="+ value+";expires="+d+";path="+path;
		}
		
	}
	
}*/
function setCookie_value2(key,value){
	setCookie_value4(key,value);
}
function setCookie_value3_ex(key,value,expires){
	setCookie_value4(key,value,expires,"");
}
function setCookie_value3_path(key,value,path){
	setCookie_value4(key,value,"",path);
}
function setCookie_value4(key,value,expires,path){
	document.cookie = key + "=" + value + (expires?";expires="+expires:"")+(path?";path="+path:"");
}

function setCookie(key,value,expires,path){
	switch(arguments.length){ //判断参数 的个数
		case 0:
		case 1:throw new Error("参数传错了");
		case 2:{
			setCookie_value2(key,value);
		}break;
		case 3:{
			var parm = arguments[2];
			if(typeof parm == "number"){
				var d = new Date();
				d.setSeconds(d.getSeconds()+parm);
				//document.cookie = key +"="+ value+";expires="+d;
				setCookie_value3_ex(key,value,d,"");
			}else{
				//document.cookie = key +"="+ value+";path="+parm;
				setCookie_value3_path(key,value,"",parm);
			}
		};break;
		case 4:{
			var d = new Date();
			d.setSeconds(d.getSeconds()+ expires);
			//document.cookie = key +"="+ value+";expires="+d+";path="+path;
			setCookie_value4(key,value,expires,path);
		}
		
	}
	
}


//e.preventDefault?e.preventDefault( ):e.returnValue=false;  //阻止浏览器的默认行为

function $(selector){
	//先判断传进来的是什么
	if(selector[0]=='#'){
		var str = selector.substring(1,selector.length);
		return document.getElementById(str);
	}else if(/^\.[a-zA-Z0-9]$/.test(selector)){
		var str = selector.replace(/\./,"");
		return toArray( document.getElementsByClassName(str));
	}else if(/^\.\w+\[[0-9]\]$/.test(selector)){  //类名传进来的时候 判断有无下标
		var str = selector.replace(/\[[0-9]\]/,"").replace(/\./,"");
		var num = selector.replace(/^\.\w+\[/,"").replace(/\]/,"");
		return document.getElementsByClassName(str)[num];
	}else if(/^\w+$/.test(selector)){  // 不写加号只能匹配到一个
		return toArray(document.getElementsByTagName(selector));
	}else if(/^\w+\[[0-9]\]$/.test(selector)){  //标签传进来的时候 判断有没有下标
		var str = selector.replace(/\[[0-9]\]/,"");
		var num = selector.replace(/\w+\[/,"").replace(/\]/,"");
		return document.getElementsByTagName(str)[num];
	}
}


//移动元素 样式 目标值 时间传入的时间是毫秒为单位
function move(ele,cssval,targetNum,totalTime){
	var getcssval = parseInt( getStyle(ele)[cssval]); // 获得属性值
	//计算速度 总路程/总时间
	var speed = (targetNum - getcssval)/totalTime ; //每毫秒的速度
	var speed = speed*30;  //根据定时器来 每30毫秒移动多少路程
	clearInterval(ele.timer);  //清除其他定时器
	ele.timer = setInterval(function(){
		//更新后的属性值
		var updateCssval = getStyle(ele)[cssval];
		ele.style[cssval] = parseInt( updateCssval )+ speed + "px";  
		if( Math.abs(parseInt(ele.style[cssval])-targetNum) < 0.5){
			ele.style[cssval] = targetNum + "px";
			clearInterval(ele.timer);
		}
	},30);
}



//定点缓冲运动
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
//函数防抖
function debounce(callback, delay=300, context){
	var t = null;
	return function(e){
		clearTimeout(t);
		t = setTimeout(()=>{
			callback.call(context, e);
		}, delay);
	}
}
//函数节流
function throttle(callback,delay=300,context){
	var starTime = 0; //最开始的时间设置为0 函数一有请求就会触发
	return function(e){
		var end = new Date().getTime();
		if(end - starTime > delay){   //超过delay时间后 才会执行该函数  减少了函数的触发次数
			callback.call(context,e);
			starTime = new Date().getTime();  //调用后 重新给初始值设置时间
		}
	};
}

parabola:function(ele,stop,callback){
            //先获取做抛物线运动的小球的起始位置
            var starPos = {
                x:ele.offsetLeft,
                y:ele.offsetTop
            };
            var a = -0.005; //a为负数表示开口向下
            // 获取结束小球的坐标
            var endPos = {
                x:stop.x - starPos.x,   //是相对于运动小球的的坐标
                y:-(stop.y - starPos.y)  //浏览器top方向与y轴相反
            };
            //求出b
            var b = (endPos.y - (a*endPos.x*endPos.x))/endPos.x;
            var offsetX = 0;  //代表x轴
            var t = setInterval(function(){
                var x = starPos.x + offsetX;
                var y = starPos.y - (a*offsetX*offsetX + b*offsetX) ;
                offsetX+=13;
                ele.style.left = x + "px";
                ele.style.top = y + "px";
                if( parseInt(ele.style.left) >= stop.x){
                    ele.style.left = stop.x + "px";
                    callback?callback():"";
                    clearInterval(t);
                }
            },60)
        }