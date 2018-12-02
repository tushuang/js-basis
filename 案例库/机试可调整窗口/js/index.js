onload = function(){
	var omain = document.getElementsByClassName("main")[0];
	var obox = document.getElementsByClassName("box")[0];
	var tit = obox.getElementsByClassName("title")[0];
	var btn = document.getElementsByClassName("win")[0];
	var oul = document.getElementsByTagName("ul")[0].children;
	//点击按钮 出现窗口
	btn.addEventListener("click",function(){
		obox.style.display = "block";
		btn.style.display = "none";
	})
	//窗口拖拽效果
	tit.onmousedown = function(e){
		var e = e|| event;
		var pos = {
			x:e.offsetX,
			y:e.offsetY
		};
		document.onmousemove = function(e){
			var e = e||event;
			obox.style.margin = 0;
			var _left = e.clientX - pos.x;
			var _top = e.clientY - pos.y;
			obox.style.left = Math.max(0,Math.min(omain.offsetWidth - obox.offsetWidth,_left)) + "px";
			obox.style.top =  Math.max(0,Math.min(window.innerHeight - obox.offsetHeight,_top)) + "px";
		}
	}
	document.onmouseup = function(){
		this.onmousemove = null;
	}
	
	
	//点击放大效果
	oul[1].addEventListener("click",function(){
		obox.style.margin = 0;
		obox.style.top=0+"px";
		obox.style.left=0+"px";
		obox.style.width = "100%";
		obox.style.height = "100%";
		oul[1].style.background ="url(img/tool.png) -150px 0";
	})
	
	//关闭窗口 
	function close(){
		obox.style.display = "none";
		btn.style.display = "block";
	}
	oul[0].addEventListener("click",close);
	oul[2].addEventListener("click",close);
}