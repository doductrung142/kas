/*visible element*/
if ($(".dng-main").data("page-type") == "verticalfullpage") {

	jQuery.fn.visible = function (partial) {

		var $t = $(this),
			$w = $(".dng-main"),
			viewTop = $w.scrollTop(),
			viewBottom = viewTop + $w.height() * 0.85,
			_top = $t.offsetTopParent($w) ? $t.offsetTopParent($w) : $t.parent().offsetTopParent($w),
			_bottom = _top + $t.height(),
			compareTop = partial === true ? _bottom : _top,
			compareBottom = partial === true ? _top : _bottom;


		if ($t.hasClass("visible")) {
			return false
		}
		return ((compareBottom <= viewBottom) && (compareTop >= viewTop))
	};

} else {

	jQuery.fn.visible = function (partial) {
		var $t = $(this),
			$w = $(window),
			viewTop = $w.scrollTop(),
			viewBottom = viewTop + $w.height() * 0.85,
			_top = $t.offset().top ? $t.offset().top : ($t.parent().length ? $t.parent().offset().top:0),
			_bottom = _top + $t.height(),
			compareTop = partial === true ? _bottom : _top,
			compareBottom = partial === true ? _top : _bottom;
		
		if ($t.hasClass("visible")) {
			return false
		}
		return ((compareBottom <= viewBottom) && (compareTop >= viewTop))
	};
}


jQuery.fn.dynamicnumbers = function (number, time, speed) {
	var numbers = parseInt(number),
		i = 0,
		interval, $el = this,
		times = time ? time : 1000,
		speeds = speed ? speed : 20,
		cent = RegExp(/[(\%)]+/).test(number) ? "%" : "";
	var dynamic = function () {
		if (i < numbers) {
			i = Math.min(i + numbers / (times / speeds), numbers);
			$el.css("min-width", Math.max(parseInt($el.width()), parseInt($el.css("min-width"))));
			$el.data("separator") ? $el.text(String(parseInt(i)).replace(/(\d)(?=(?:\d{3})+$)/g, "$1,") + cent) : $el.text(parseInt(i) + cent)
		} else {
			$el.data("separator") ? $el.text(String(numbers).replace(/(\d)(?=(?:\d{3})+$)/g, "$1,") + cent) : $el.text(number);
			clearTimeout(interval)
		}
	};
	interval = setInterval(dynamic, speeds)
};
var addJsAnimation = function (element) {
	var animationType = {
		width: function (el) {
			delay = el.data("delay") !== undefined ? el.data("delay") : 400;
			speed = el.data("speed") !== undefined ? el.data("speed") : 50;
			el.css("width", el.attr("data-width"));
			el.find("span").show().dynamicnumbers(el.attr("data-width"), delay, speed)
		},
		height: function (el) {
			delay = el.data("delay") !== undefined ? el.data("delay") : 400;
			speed = el.data("speed") !== undefined ? el.data("speed") : 50;
			el.css("height", el.attr("data-height"));
			el.find("span").show().dynamicnumbers(el.attr("data-height"), delay, speed)
		},
		number: function (el) {
			delay = el.data("delay") !== undefined ? el.data("delay") : 1500;
			speed = el.data("speed") !== undefined ? el.data("speed") : 50;
			el.dynamicnumbers(el.attr("data-number"), delay, speed)
		},
		typewriter: function (el) {
			var array = el.html().split("|");

			var icolor = false;
			if (el.data("color")) {
				icolor = (el.data("color")).split("|")
			}
			if (icolor) {
				if (icolor[0] === "none") {
					el.removeAttr("style")
				} else {
					el.css("color", icolor[0])
				}
			}
			if ($(window).width() < 768) {
				el.html(array[0]);
				return false;
			}

			var p_index = 0,
				p_length = array.length;
			var html = array[p_index],
				index = 0,
				time = 100,
				l = html.length,
				loop = el.data("loop") !== undefined ? el.data("loop") : true;
			delay = el.data("delay") !== undefined ? el.data("delay") : 3000;
			speed = el.data("speed") !== undefined ? el.data("speed") : 100;
			el.addClass("active").html(" ");
			var printer = function () {
				if (index < l) {
					index++;
					if (html.slice(index, index + 1) === " ") {
						clearInterval(stack);
						setTimeout(function () {
							stack = setInterval(printer, speed)
						}, speed);
					}
					el.html(html.slice(0, index + 1));
				} else {
					if (loop || p_index < p_length - 1) {
						clearInterval(stack);
						setTimeout(function () {
							stack = setInterval(delete_printer, 30)
						}, delay);
					} else {
						clearInterval(stack);
						el.removeClass("active")
					}
				}
			};
			var delete_printer = function () {
				if (index > 0) {
					el.html(html.slice(0, index - 1));
					index--;
				} else {
					p_index = p_index <= p_length - 2 ? p_index + 1 : 0;
					html = array[p_index];
					l = html.length;
					if (icolor) {
						if (icolor[p_index] === "none") {
							el.removeAttr("style")
						} else {
							el.css("color", icolor[p_index])
						}
					}
					clearInterval(stack);
					setTimeout(function () {
						stack = setInterval(printer, time)
					}, 300);
				}
			};
			var stack = setInterval(printer, speed);

		},
		textslider: function (el) {
			var speed = el.data("speed") ? el.data("speed") : 3000;
			el.animate({
				"width": el.find(".active").width() + 1
			}, 400)

			var textslide = function () {
				if ($(window).width() <= 767) return false;
				el.find("span").removeClass("previous");
				var curr = el.find(".active");
				curr.removeClass("active").addClass("previous");
				if (curr.next().length !== 0) {
					curr.next().addClass("active");
				} else {
					el.find("span").eq(0).addClass("active");
				}
				el.animate({
					"width": el.find(".active").width() + 1
				}, 400);
			};

			setInterval(textslide, speed);
		},

		iconsvg: function (el) {
			if (typeof Vivus == "undefined") return false;
			i = Math.random().toString(36).substr(2);
			var id = "icon-svg-" + i;
			el.find("svg").attr("id", id);
			new Vivus(id, {
				duration: 40,
				type: "sync"
			})

		},
		animationhover: function (el) {
			var t = el.css("animation-duration");
			t = t.indexOf("ms") > 0 ? parseInt(t) : parseInt(t) * 1000;
			el.delay(t).queue(function () {
				$(this).removeClass("animated").addClass("visible").on("mouseenter", function () {
					if (!$(this).hasClass("animated")) {
						$(this).addClass("animated").delay(t).queue(function () {
							$(this).removeClass("animated").dequeue()
						})
					}
				}).dequeue()
			})
		},
		clip:function (el) {
		}
	};
	var animationStart = function (el) {
		type = el.attr("data-width") && "width" || el.attr("data-height") && "height" || el.attr("data-number") && "number" || el.hasClass("dg-typewriter") && "typewriter" || el.hasClass("dng-clip") && "clip" || el.hasClass("dng-clip-text") && "clip" || el.hasClass("text-slide") && "textslider" || (el.hasClass("icon-svg") && !el.attr("id") && el.find("svg").length) && "iconsvg" || el.hasClass("animationhover") && "animationhover" || false, type && animationType[type](el)
	};

	element.each(function (i, n) {
		var el = $(n);
		(el.visible(true) || el.parents(".triggerAnimation").length) && !el.hasClass("animated") && (animationStart(el), el.removeClass("visible").addClass("animated"));
	})

	var animationscroll = function (el, event) {
		(el.visible(true) || el.parents(".triggerAnimation").length) && !el.hasClass("animated") && (animationStart(el), el.removeClass("visible").addClass("animated"), $(this).unbind(event))
	};
	element.each(function () {
		var e = $(this);
		if ($(".dng-main").data("page-type") == "verticalfullpage") {
			$(".dng-main").scroll(function (event) {
				var w = $(this);
				animationscroll(e, event)
			})
		} else {

			$(window).scroll(function (event) {
				var w = $(this);
				animationscroll(e, event)
			})
		}

		if(e.hasClass("dng-clip")){
			e.find(".dng-clipping-shade").remove();
			var shade = $('<span class="dng-clipping-shade">');
			var data =	e.data("clipping");
			if(!data) return;
			if(data["bg"]){
				shade.css({"background":data["bg"]});
			}
			if(data["duration"]){
				e.css({"-webkit-animation-duration":data["duration"]+"ms","animation-duration":data["duration"]+"ms"});
			}
			if(data["timing"]){
				e.css({"-webkit-animation-timing-function":data["timing"],"animation-timing-function":data["timing"]});
			}
			if(data["delay"]){ 
				e.css({"-webkit-animation-delay":data["delay"]+"ms","animation-delay":data["delay"]+"ms"});
			} 
			if(! e.children().length && e.hasClass("dng-clip-text")){
				e.wrapInner($('<span class="dng-clipping-wrapper">'));
			}
			e.append(shade);
		}


	})

};

$(document).ready(function () {
	addJsAnimation($(".animation:not(.animated),.animationhover:not(.animated),.icon-svg:not(.animated),.css3-animate:not(.animated)"));
});