//动画效果  , 动画时长,  属性 ,  目标值
/*
 * Tween.js
 * t: currentTimes（当前第几步）
 * b: startVal（初始值）
 * c: distance（总路程）
 * d: totaltimes（总共多少步）
 */

+ function () {
	var Tween = {
		Linear: function (currentTimes, startVal, distance, totaltimes) {
			return distance * currentTimes / totaltimes + startVal;
		},
		Quad: {
			easeIn: function (currentTimes, startVal, distance, totaltimes) {
				return distance * (currentTimes /= totaltimes) * currentTimes + startVal;
			},
			easeOut: function (t, b, c, d) {
				return -c * (t /= d) * (t - 2) + b;
			},
			easeInOut: function (t, b, c, d) {
				if ((t /= d / 2) < 1) return c / 2 * t * t + b;
				return -c / 2 * ((--t) * (t - 2) - 1) + b;
			}
		},
		Cubic: {
			easeIn: function (t, b, c, d) {
				return c * (t /= d) * t * t + b;
			},
			easeOut: function (t, b, c, d) {
				return c * ((t = t / d - 1) * t * t + 1) + b;
			},
			easeInOut: function (t, b, c, d) {
				if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
				return c / 2 * ((t -= 2) * t * t + 2) + b;
			}
		},
		Quart: {
			easeIn: function (t, b, c, d) {
				return c * (t /= d) * t * t * t + b;
			},
			easeOut: function (t, b, c, d) {
				return -c * ((t = t / d - 1) * t * t * t - 1) + b;
			},
			easeInOut: function (t, b, c, d) {
				if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
				return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
			}
		},
		Quint: {
			easeIn: function (t, b, c, d) {
				return c * (t /= d) * t * t * t * t + b;
			},
			easeOut: function (t, b, c, d) {
				return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
			},
			easeInOut: function (t, b, c, d) {
				if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
				return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
			}
		},
		Sine: {
			easeIn: function (t, b, c, d) {
				return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
			},
			easeOut: function (t, b, c, d) {
				return c * Math.sin(t / d * (Math.PI / 2)) + b;
			},
			easeInOut: function (t, b, c, d) {
				return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
			}
		},
		Expo: {
			easeIn: function (t, b, c, d) {
				return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
			},
			easeOut: function (t, b, c, d) {
				return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
			},
			easeInOut: function (t, b, c, d) {
				if (t == 0) return b;
				if (t == d) return b + c;
				if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
				return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
			}
		},
		Circ: {
			easeIn: function (t, b, c, d) {
				return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
			},
			easeOut: function (t, b, c, d) {
				return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
			},
			easeInOut: function (t, b, c, d) {
				if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
				return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
			}
		},
		Elastic: {
			easeIn: function (t, b, c, d, a, p) {
				var s;
				if (t == 0) return b;
				if ((t /= d) == 1) return b + c;
				if (typeof p == "undefined") p = d * .3;
				if (!a || a < Math.abs(c)) {
					s = p / 4;
					a = c;
				} else {
					s = p / (2 * Math.PI) * Math.asin(c / a);
				}
				return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
			},
			easeOut: function (t, b, c, d, a, p) {
				var s;
				if (t == 0) return b;
				if ((t /= d) == 1) return b + c;
				if (typeof p == "undefined") p = d * .3;
				if (!a || a < Math.abs(c)) {
					a = c;
					s = p / 4;
				} else {
					s = p / (2 * Math.PI) * Math.asin(c / a);
				}
				return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
			},
			easeInOut: function (t, b, c, d, a, p) {
				var s;
				if (t == 0) return b;
				if ((t /= d / 2) == 2) return b + c;
				if (typeof p == "undefined") p = d * (.3 * 1.5);
				if (!a || a < Math.abs(c)) {
					a = c;
					s = p / 4;
				} else {
					s = p / (2 * Math.PI) * Math.asin(c / a);
				}
				if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
				return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
			}
		},
		Back: {
			easeIn: function (t, b, c, d, s) {
				if (typeof s == "undefined") s = 1.70158;
				return c * (t /= d) * t * ((s + 1) * t - s) + b;
			},
			easeOut: function (t, b, c, d, s) {
				if (typeof s == "undefined") s = 1.70158;
				return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
			},
			easeInOut: function (t, b, c, d, s) {
				if (typeof s == "undefined") s = 1.70158;
				if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
				return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
			}
		},
		Bounce: {
			easeIn: function (t, b, c, d) {
				return c - Tween.Bounce.easeOut(d - t, 0, c, d) + b;
			},
			easeOut: function (t, b, c, d) {
				if ((t /= d) < (1 / 2.75)) {
					return c * (7.5625 * t * t) + b;
				} else if (t < (2 / 2.75)) {
					return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
				} else if (t < (2.5 / 2.75)) {
					return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
				} else {
					return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
				}
			},
			easeInOut: function (t, b, c, d) {
				if (t < d / 2) {
					return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
				} else {
					return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
				}
			}
		}
	}

	window.animator = {
		linear: function (ele, options, duration, callback) {
			this.animate(ele, options, duration, Tween.Linear, callback);
		},
		quadEaseIn: function (ele, options, duration, callback) {
			this.animate(ele, options, duration, Tween.Quad.easeIn, callback);
		},
		quadEaseOut: function (ele, options, duration, callback) {
			this.animate(ele, options, duration, Tween.Quad.easeOut, callback);
		},
		quadEaseInOut: function (ele, options, duration, callback) {
			this.animate(ele, options, duration, Tween.Quad.easeInOut, callback);
		},
		cubicEaseIn: function (ele, options, duration, callback) {
			this.animate(ele, options, duration, Tween.Cubic.easeIn, callback);
		},
		cubicEaseOut: function (ele, options, duration, callback) {
			this.animate(ele, options, duration, Tween.Cubic.easeOut, callback);
		},
		cubicEaseInOut: function (ele, options, duration, callback) {
			this.animate(ele, options, duration, Tween.Cubic.easeInOut, callback);
		},
		quartEaseIn: function (ele, options, duration, callback) {
			this.animate(ele, options, duration, Twee.Quart.easeIn, callback);
		},
		quartEaseOut: function (ele, options, duration, callback) {
			this.animate(ele, options, duration, Twee.Quart.easeOut, callback);
		},
		quartEaseInOut: function (ele, options, duration, callback) {
			this.animate(ele, options, duration, Twee.Quart.easeInOut, callback);
		},
		quintEaseIn: function (ele, options, duration, callback) {
			this.animate(ele, options, duration, Twee.Quint.easeIn, callback);
		},
		quintEaseOut: function (ele, options, duration, callback) {
			this.animate(ele, options, duration, Twee.Quint.easeOut, callback);
		},
		quintEaseInOut: function (ele, options, duration, callback) {
			this.animate(ele, options, duration, Twee.Quint.easeInOut, callback);
		},
		expoEaseIn: function (ele, options, duration, callback) {
			this.animate(ele, options, duration, Twee.Expo.easeIn, callback);
		},
		expoEaseOut: function (ele, options, duration, callback) {
			this.animate(ele, options, duration, Twee.Expo.easeOut, callback);
		},
		expoEaseInOut: function (ele, options, duration, callback) {
			this.animate(ele, options, duration, Twee.Expo.easeInOut, callback);
		},
		circEaseIn: function (ele, options, duration, callback) {
			this.animate(ele, options, duration, Twee.Circ.easeIn, callback);
		},
		circEaseOut: function (ele, options, duration, callback) {
			this.animate(ele, options, duration, Twee.Circ.easeOut, callback);
		},
		circEaseInOut: function (ele, options, duration, callback) {
			this.animate(ele, options, duration, Twee.Circ.easeInOut, callback);
		},
		elasticEaseIn: function (ele, options, duration, callback) {
			this.animate(ele, options, duration, Twee.Elastic.easeIn, callback);
		},
		elasticEaseOut: function (ele, options, duration, callback) {
			this.animate(ele, options, duration, Twee.Elastic.easeOut, callback);
		},
		elasticEaseInOut: function (ele, options, duration, callback) {
			this.animate(ele, options, duration, Twee.Elastic.easeInOut, callback);
		},
		backEaseIn: function (ele, options, duration, callback) {
			this.animate(ele, options, duration, Twee.Back.easeIn, callback);
		},
		backEaseOut: function (ele, options, duration, callback) {
			this.animate(ele, options, duration, Twee.Back.easeOut, callback);
		},
		backEaseInOut: function (ele, options, duration, callback) {
			this.animate(ele, options, duration, Twee.Back.easeInOut, callback);
		},
		bounceEaseIn: function (ele, options, duration, callback) {
			this.animate(ele, options, duration, Twee.Bounce.easeIn, callback);
		},
		bounceEaseOut: function (ele, options, duration, callback) {
			this.animate(ele, options, duration, Twee.Bounce.easeOut, callback);
		},
		bounceEaseInOut: function (ele, options, duration, callback) {
			this.animate(ele, options, duration, Twee.Bounce.easeInOut, callback);
		},
		animate: function (ele, options, duration, exec, callback) {
			var times = 0; //从0次开始
			var startvalues = Object.assign({}, getStyle(ele)); //保存初始值
			var t = setInterval(function () {
				for (var attr in options) {
					var defaultvalue = parseInt(startvalues[attr]);
					this.style[attr] = exec(times, defaultvalue, options[attr], 100) + "px";
				}
				times++;
				if (times >= 101) {
					clearInterval(t);
					callback ? callback() : "";
				}
			}.bind(ele), duration / 100)
		}
	}

}();
if (!window.getStyle || typeof window.getStyle != "function") {
	window.getStyle = function (ele) {
		if (ele.currentStyle) {
			return ele.currentStyle;
		} else {
			return getComputedStyle(ele);
		}
	}
}