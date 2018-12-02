(function($, undefined){
	$.fn.hoverdir = function(){
		$(this).on("mouseenter mouseleave", function(evt){
			var evType = evt.type;
			var self = this;
			new HoverDir({
				ele: $(self),
				mouse: {x:evt.pageX, y:evt.pageY}, 
				type: evType
			}).move();
		});
		return this;
	}
	
	
	function HoverDir(options){
		$.extend(this, $.extend(HoverDir.defaults,options));  //合并对象
		this.init();
	}

	HoverDir.defaults = {
		a : "xx",
		b : "yy"
	}
	
	HoverDir.prototype = {
		init : function(){
			var w = this.ele.width(),
				h = this.ele.height(),
				x = (this.mouse.x - this.ele.offset().left - (w / 2)) * (w > h ? (h / w) : 1),
				y = (this.mouse.y - this.ele.offset().top - (h / 2)) * (h > w ? (w / h) : 1);
			console.log(w,h,this.mouse.x,this.mouse.y)
			this.direction = Math.round(( Math.atan2(y, x) * (180 / Math.PI) / 90) + 5) % 4;
			
		},
		move : function(){
			var $layer = this.ele.find("div");
			var target = {};
			if(this.type === "mouseenter"){
				switch(this.direction){
					case 0 : $layer.css({top : "-100%", left:0}); break;
					case 1 : $layer.css("left","100%").css("top","0px"); break;
					case 2 : $layer.css("top","100%").css("left","0px"); break;
					case 3 : $layer.css("left","-100%").css("top","0px"); break;
				}
				target = {left:0,top:0}
			}else{
				switch(this.direction){
					case 0 : target = {left:0,top:'-100%'};break;
					case 1 : target = {left:'100%',top:0};break;
					case 2 : target = {left:0,top:'100%'};break;
					case 3 : target = {left:'-100%',top:0};break;
				}
			}
			$layer.animate(target,300);
		}
	}
	
})(jQuery);


