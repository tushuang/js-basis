$.fn.hoverdir = function(){
	
	$(this).on("mouseenter mouseleave", function(event){
		var evType = event.type;
		var direction = $.HoverDir._getDir($(this), {
			x: event.pageX,
			y: event.pageY
		});
//		console.log("evtype:"+evType+",dir:"+direction);
		$.HoverDir._moveTo($(this),direction, evType);
	});
}

$.HoverDir = {
	_getDir : function($el, coordinates) {
		var w = $el.width(),
			h = $el.height(),
	
			x = (coordinates.x - $el.offset().left - (w / 2)) * (w > h ? (h / w) : 1),
			y = (coordinates.y - $el.offset().top - (h / 2)) * (h > w ? (w / h) : 1),
	
			direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
		return direction;
	},
	_moveTo : function($el, direction, type){
		var $layer = $el.find("div");
		var coord = {};
		if(type === "mouseenter"){
			switch(direction){
				case 0 : $layer.css("top","-100%").css("left","0px");break;
				case 1 : $layer.css("left","100%").css("top","0px");break;
				case 2 : $layer.css("top","100%").css("left","0px");break;
				case 3 : $layer.css("left","-100%").css("top","0px");break;
			}
			coord = {left:0,top:0}
		}else{
			switch(direction){
				case 0 : coord = {left:0,top:'-100%'};break;
				case 1 : coord = {left:'100%',top:0};break;
				case 2 : coord = {left:0,top:'100%'};break;
				case 3 : coord = {left:'-100%',top:0};break;
			}
		}
		$layer.animate(coord,300);
	}
}
	


