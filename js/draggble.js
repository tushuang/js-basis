/*
draggble(ele,{
    limit:true/false,需不需要再有定位的父元素里运动
    title:dragTitle, //可拖拽的标题
    x:true,  //判断能不能水平拖拽
    y:false  //能不能垂直拖拽
}，callback)
*/

function draggble(ele,options,callback ){
    //判断拖拽的元素有无定位 没有直接返回
    console.log(getStyle(ele).position);
    if(getStyle(ele).position != "fixed" && getStyle(ele).position != "absolute") {
       console.error("该元素没有定位，不能拖拽");
       return;
    }
    var draggTitle = options.title||ele;
    draggTitle.addEventListener("mousedown",function(e){
        var e = e||event;
        var mousePos = {
            x:e.offsetX,
            y:e.offsetY
        }
        document.onmousemove = function(e){
            var e = e||event;
            var _left = e.clientX - mousePos.x;
            var _top = e.clientY - mousePos.y;
            ele.style.margin = 0;
            if(options.limit){  //限制在有定位的父元素内  最大值需要减去父元素的定位值 left top 以及margin值
                if(options.x) ele.style.left = Math.max(0,Math.min(ele.offsetParent.offsetWidth - ele.offsetWidth + getPagePosition( ele.offsetParent).pagesX -parseInt( getStyle(ele.offsetParent).marginLeft)-parseInt( getStyle(ele.offsetParent).left),_left - getPagePosition( ele.offsetParent).pagesX ))+"px";
                if(options.y) ele.style.top = Math.max(0,Math.min(ele.offsetParent.offsetHeight - ele.offsetHeight + getPagePosition( ele.offsetParent).pagesY - parseInt( getStyle(ele.offsetParent).marginTop)-parseInt( getStyle(ele.offsetParent).top),_top - getPagePosition( ele.offsetParent).pagesY))+"px";
                console.log(getPagePosition( ele.offsetParent).pagesX);
            }else{
                if(options.x) ele.style.left = Math.max(0,Math.min(window.innerWidth - ele.offsetWidth,_left)) + "px";
                if(options.y) ele.style.top = Math.max(0,Math.min(window.innerHeight - ele.offsetHeight,_top)) + "px";
            }
        }
    })
    document.addEventListener("mouseup",function(e){
        this.onmousemove = null;
        callback?callback():"";
    })
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

function getStyle(ele){           //获得样式
	if(ele.currentStyle){
		return ele.currentStyle;   //ie
	}else{
		return getComputedStyle(ele,null);  //其他
	}
 }

