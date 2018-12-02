function randomInt(min,max){
	return parseInt( Math.random()*(max - min + 1) + min);
}

function randomColor(){
	var R = parseInt(Math.random()*256).toString(16);
	var G = parseInt(Math.random()*256).toString(16);
	var B = parseInt(Math.random()*256).toString(16);
	return (R.length < 2 ? "0"+R : R) + (G.length < 2 ? "0"+G : G) +(B.length < 2 ? "0"+B : B);
}

function addEvent(obj,eventtype,fun,cancel){
	if(obj.attachEvent) {
		obj.attachEvent("on"+eventtype,fun);
	} else {
		obj.addEventListener(eventtype, fun, cancel);
	}
}

function getElementsByClassName(classname){
	var list = document.getElementsByTagName("*");
	var arr = [];
	for(var i=0;i<list.length;i++){
		if(list[i].className.contains(classname)) {
			arr.push(list[i]);
		}
	}
	return arr;
}
