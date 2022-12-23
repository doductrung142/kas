
(function ($) {
	$.fn.dnngomegamenu = function (m) {
		m = $.extend({
			slide_speed: 200,
			delay_show: 150,
			delay_disappear: 500,
			megamenuwidth: "box",
			WidthBoxClassName: ".dnn_layout",
			popUp: "vertical",
			direction: "ltr"
		}, m || {});
		var rtl = m.direction == "rtl" ? true : false;
		return this.each(function (index) {
			var me = $(this),
				primary = me.find(".primary_structure > li"),
				slide = ".dnngo_menuslide",
				subs = ".dnngo_submenu",
				subbox = "dnngo_boxslide",
				mlist ='dnngo_menu_list',
				hover = "menu_hover",
				slidedefault = "dnngo_slide_menu",
				interval,
				interval2;
			if (rtl) {
				me.addClass("rtl")
			}
			if (!!('ontouchstart' in window)) {
				primary.children("a").on('click', function () {
					if ($(this).siblings("div").css("display") == "none") {
						return false;
					}
				})
			}
			primary.mouseenter(function () {
				var e = $(this),
					slides = e.find(slide);
					clearTimeout(interval);
					clearTimeout(interval2);

				interval2 = setTimeout(function () {
					if (slides.css('display') == 'none') {
						e.addClass("menu_hover");
						slides.attr("style", " ");
						var space = 20;
						var winwidth = $(window).width() - space,
							width = slides.width();
						var c_width = slides.data("width");
						c_width == 0 ? c_width = false : "";
						var posBox = $(m.WidthBoxClassName).last();

						if (m.popUp == "vertical") {
							var left = e.offset().left;
							if (slides.find("ul").hasClass(slidedefault)) {
								if (winwidth - left < width) {
									slides.css("left", '-' + parseInt(width + left - winwidth + 5) + 'px');
								}
							}
							if (c_width) {
								if (slides.find("div").hasClass(subbox) || slides.find("ul").hasClass(mlist)) {
									var position = slides.data("position") ? slides.data("position") : 0;
									offset = e.innerWidth() / 2;

									c_width = Math.min(c_width, winwidth);
								
									if (m.megamenuwidth == "box") {
										c_width = Math.min(c_width, parseInt(posBox.innerWidth()));
										var posleft = posBox.offset().left;
									} else {
										c_width = Math.min(c_width, winwidth);
										var posleft = space / 2;
									}

									var maxleft = left - posleft;
									var maxright = left - posleft - c_width;

									if (position == 0) {
										var cur = 0;
									} else if (position == 1) {
										var cur = c_width / 2 - offset;
									} else if (position == 2) {
										var cur = c_width - e.innerWidth();
									}
								

									var ju = cur;
									if (ju > left - posleft) {
										cur = left - posleft;
									}
									if (left + c_width - ju > posBox.innerWidth() + posleft) {
										cur = left + c_width - (posBox.innerWidth() + posleft)
									}
									slides.css({
										"width": c_width,
										"left": -cur
									})
								}
							} else {

								if (m.megamenuwidth == "full") { 
									if (slides.find("div").hasClass(subbox) || slides.children("ul").hasClass(mlist)) {
										slides.css({
											"width": winwidth,
											"max-width": winwidth,
											"left": -left + space / 2
										})
									}
								}
								if (m.megamenuwidth == "box") {
									if (slides.find("div").hasClass(subbox) || slides.children("ul").hasClass(mlist)) {
										slides.css({
											"width": posBox.innerWidth(),
											"max-width": winwidth,
											"left": posBox.offset().left - left - (Math.min(posBox.innerWidth(), winwidth) - posBox.innerWidth()) / 2
										})
									}
								}
							}
						}
						if (m.popUp == "level") {
							if (slides.find("ul").hasClass(slidedefault)) {
								if (rtl) {
									slides.css({
										"right": "100%",
										"left": "auto"
									});
								} else {
									slides.css("left", "100%");
								}
							}
							if (m.megamenuwidth == "box") {
								var subwidth = $(m.WidthBoxClassName).last().innerWidth();
							} else {
								var subwidth = $(window).width();
								if (c_width) {
									subwidth = Math.min($(window).width(), c_width);
								}
							}
							if (slides.find("div").hasClass(subbox) || slides.children("ul").hasClass(mlist)) {
								if (rtl) {
									slides.css({
										"width": subwidth,
										"max-width": slides.parent().offset().left - space / 2,
										"right": "100%",
										"left": "auto"
									})
								} else {
									slides.css({
										"width": subwidth,
										"max-width": winwidth - slides.parent().offset().left - slides.parent().innerWidth() + space / 2,
										"left": "100%"
									})
								}
							}
							var top = e.offset().top - $(window).scrollTop(),
								winheight = $(window).height(),
								height = slides.height();
							if (winheight < height + top) {
								if (winheight <= height) {
									slides.css({
										"top": -top
									})
								} else {
									slides.css({
										"top": winheight - (top + height)
									})
								}
							} else {
								slides.css({
									"top": 0
								})
							}
						}
						slides.fadeIn(m.slide_speed);
					}
				}, m.delay_show);
				e.siblings().find(slide).fadeOut(m.slide_speed);
				e.siblings().find(subs).fadeOut(m.slide_speed);
				e.siblings().find(slide).find("li").removeClass(hover);
				e.siblings().find(subs).find("li").removeClass(hover);
				e.siblings().removeClass(hover);
			}).mouseleave(function () {
				var e = $(this);
				clearTimeout(interval2);
				interval = setTimeout(function () {
					e.removeClass(hover);
					e.find("li").removeClass(hover);
					e.find(slide).fadeOut(m.slide_speed);
					e.find(subs).fadeOut(m.slide_speed);
				}, m.slide_speed > m.delay_disappear ? m.slide_speed : m.delay_disappear);
			})
			primary.find("li").mouseenter(function () {
				var subbox = $(this).find("> " + subs);
				if (subbox.css('display') == 'none') {
					$(this).addClass(hover);
					subbox.fadeIn(m.slide_speed);
					sub_l = $(this).offset().left;
					sub_left = sub_l + $(this).width(),
						winwidth = $(window).width(),
						sub_width = subbox.width();
					if (rtl) {
						if (sub_l < sub_width) {
							subbox.css({
								"left": "100%",
								"right": "auto"
							});
						} else {
							subbox.css({
								"left": "auto",
								"right": "100%"
							});
						}
					} else {
						if (winwidth - sub_left < sub_width) {
							subbox.css({
								"left": "auto",
								"right": "100%"
							});
						} else {
							subbox.css({
								"left": "100%",
								"right": "auto"
							});
						}
					}
					if (m.popUp == "level") {
						var top = $(this).offset().top - $(window).scrollTop(),
							winheight = $(window).height(),
							height = subbox.height();
						if (winheight < height + top) {
							if (winheight <= height) {
								subbox.css({
									"top": -top
								})
							} else {
								subbox.css({
									"top": winheight - (top + height)
								})
							}
						} else {
							subbox.css({
								"top": 0
							})
						}
					}
				}
				$(this).siblings().removeClass(hover);
				$(this).siblings().find(subs).fadeOut(m.slide_speed);
			})

			function roller(e, defaultTop) {
				if (e.offset().top + e.height() - $(window).scrollTop() > $(window).height()) {


					var s_top = $(window).scrollTop(),
						h = e.innerHeight(),
						w_h = $(window).height(),
						e_top = 0,
						p_height = e.parent().innerHeight(),
						n_w = false,
						min_top,
						max_top,
						rollerEv;
					e.addClass("roller");

					var up = $("<div class=\"roller-up\"></div>");
					var down = $("<div class=\"roller-down\"></div>")
					up.css({
						"width": e.width(),
						//	"left":e.offset().left
					})
					down.css({
						"width": e.width(),
						//	"left":e.offset().left
					})

					up.insertBefore(e.children("ul,div.dnngo_boxslide")).hide();
					down.insertAfter(e.children("ul,div.dnngo_boxslide"));
					if (e.hasClass("dnngo_submenu") || m.popUp == "level") {
						p_height = 0;
					}
					if (h < w_h) {
						min_top = p_height;
						max_top = -(e.offset().top - s_top - (w_h - h) - p_height);
						up.remove();
						n_w = true;
					} else {
						if (m.popUp == "level") {
							min_top = -(e.offset().top - s_top - p_height) + parseInt(defaultTop);
							max_top = -(h + e.offset().top - w_h - s_top - p_height) + parseInt(defaultTop);
						} else {
							min_top = -(e.offset().top - s_top - p_height);
							max_top = -(h + e.offset().top - w_h - s_top - p_height);
						}
					}
					var rollerEv;

					function up_d() {
						e_top = parseInt(e.css("top")) + 30;

						down.show();

						if (e_top >= min_top) {
							e.css("top", min_top)
							clearInterval(rollerEv);
							up.hide();
						} else {
							e.css("top", e_top)
						}

					}

					function down_d() {
						e_top = parseInt(e.css("top")) - 30;

						if (e_top < min_top) {
							up.show()
						} else {
							up.hide()
						}

						if (e_top <= max_top) {
							e.css("top", max_top)
							clearInterval(rollerEv);
							down.hide();
						} else {
							e.css("top", e_top)
						}
					}
					up.on("mouseenter", function () {
						rollerEv = setInterval(up_d, 100);
					}).on("mouseleave", function () {
						window.clearInterval(rollerEv);
					})
					down.on("mouseenter", function () {
						rollerEv = setInterval(down_d, 100);
					}).on("mouseleave", function () {
						window.clearInterval(rollerEv);
					})

					e.on('mousewheel', function (event) {
						e_top = parseInt(e.css("top")) + event.deltaY * 50;

						if (!n_w) {
							if (e_top > min_top) {

								if (event.deltaY < 0) {
									e.stop().css({
										"top": Math.max(e_top, min_top)
									})
									up.show();
								}

								if (event.deltaY > 0 && parseInt(e.css("top")) <= min_top) {
									e.stop().css({
										"top": min_top
									});
									down.show();
								}
								up.hide();

							} else if (e_top <= max_top) {
								e.stop().css({
									"top": max_top
								})
								down.hide();
								if (event.deltaY < 0 && parseInt(e.css("top")) >= min_top) {
									up.show();
								}

							} else {
								e.stop().css({
									"top": e_top
								})
								up.show();
								down.show();
							}
						} else {
							if (event.deltaY < 0) {
								e.stop().css({
									"top": Math.max(e_top, max_top)
								})
								if (e_top <= max_top) {
									down.hide();
								}
							}
						}
						event.stopPropagation();
						event.preventDefault();
					});

				}
			}

			function removeroller(e, defaultTop) {
				if (e.hasClass("roller")) {
					e.css("top", defaultTop);
					e.removeClass("roller");
					e.find(".roller-up , .roller-down").remove();
					e.unbind('mousewheel')
				}

			}
			me.find(".dnngo_menuslide,.dnngo_submenu").each(function (index, element) {
				var e = $(this),
					defaultTop = e.css("top"),
					rollerinterval;

				e.on("mouseenter", function () {
					if (!e.hasClass("roller")) {
						if (m.popUp == "level") {
							defaultTop = e.css("top");
						}
						roller(e, defaultTop)
					}
					clearTimeout(rollerinterval);

				})
				if (e.hasClass("dnngo_menuslide")) {
					e.on("mouseleave", function () {
						rollerinterval = setTimeout(function () {
							removeroller(e, defaultTop)
						}, m.slide_speed > m.delay_disappear ? m.slide_speed + m.slide_speed : m.delay_disappear + m.slide_speed);

					})
				}
				if (e.hasClass("dnngo_submenu")) {
					e.parent("li").on("mouseleave", function () {
						var te = $(this).children(".dnngo_submenu");
						rollerinterval = setTimeout(function () {
							removeroller(te, defaultTop)
						}, m.slide_speed > m.delay_disappear ? m.slide_speed + m.slide_speed : m.delay_disappear + m.slide_speed);

					})

				}
			});
			me.find(".dnngo_menu_list").each(function(){
				var line =$("<div class=\"line\"></div>");
				var n=$(this).parent("div").attr("class").split("numbercolumns-")[1].split(" ")[0];
				for(var i=0 ;i<n;i++){
					line.append("<span></span>")
				}
				$(this).find(".dnngo_submenu").each(function(){
					$(this).children("ul").unwrap();
				})

				$(this).after(line);

			})


		});
	};
})(jQuery);

(function ($) {
	$.fn.menusKeyboard =function(){
				
		var menus=$(this);
		var curr = menus.find(":focus");
		var level_1=true;
		var drop = false;
		var keyCode;
		var shiftKey;
		
		
		function menusondownkey(e,key){
			switch(key){		 			
				case 9:				
					menusonfocus("tab");
				break;
				case 13:
				case 32:
				if(curr.parent("li").hasClass("dir") && !curr.parent("li").hasClass("menu_hover")){
					e.preventDefault();
					menusonfocus("enter");
				}
				break;
				case 37:
				e.preventDefault();
				menusonfocus("left");
				break;
				case 38:
				e.preventDefault();
				menusonfocus("up");
				break;
				case 39:
				e.preventDefault();
				menusonfocus("right");
				break;
				case 40:
				e.preventDefault();
				menusonfocus("down");
				break;
				case 27:
				e.preventDefault();
				menusonfocus("end");
				break;				
			//	case 123:
				//e.preventDefault();
			//	menusonfocus("first");
			//	break;				
				
			}
	
		}
		function menusonup(){
			if(curr.parent("li").prev().length){
				curr.parent("li").prev().mouseenter().children("a").focus();
			}else{
				curr.parent("li").siblings().last().mouseenter().children("a").focus();
			}			
		}
		function menusondown(){
			drop=true;
			if(level_1){
				curr.parent().mouseenter();
				setTimeout(function(){
					curr.siblings("div").find("a").eq(0).focus().mouseenter();
					curr = menus.find(":focus");		
				},150);
			}else{ 
				if(curr.parent("li").next().length){
					curr.parent("li").next().mouseenter().children("a").focus();
				}else{
					curr.parent("li").siblings().first().mouseenter().children("a").focus();
				}
			}
		}
		function menusonright(){
			if(level_1){
				if(curr.parent("li").nextAll().children("a").first().length){
					drop?curr.parent("li").nextAll().children("a").first().focus().parent().mouseenter():curr.parent("li").nextAll().children("a").first().focus();
	
				}else{
					drop?curr.parent("li").siblings().prevAll().children("a").last().focus().parent().mouseenter():curr.parent("li").siblings().prevAll().children("a").last().focus();
				}
			}else{
				setTimeout(function(){
					if(curr.siblings("div").length){
						curr.siblings("div").find("a").eq(0).focus();							
					}else{
						if(curr.parents("li.dir").last().nextAll().children("a").length){
							curr.parents("li.dir").last().nextAll().children("a").first().focus().parent().mouseenter();
						
						}else{
							curr.parents("li.dir").last().prevAll().mouseenter().children("a").last().focus().parent().mouseenter();		
						}															
					}
					curr = menus.find(":focus");	
				},100);
			}
		}
		function menusonleft(){
			if(level_1){
				
				if(curr.parent("li").prevAll().children("a").first().length){
					drop?curr.parent("li").prevAll().children("a").first().focus().parent().mouseenter():curr.parent("li").prevAll().children("a").first().focus();						
				}else{
					drop?curr.parent("li").siblings().nextAll().children("a").last().focus().parent().mouseenter():curr.parent("li").siblings().nextAll().children("a").last().focus();
				}
	
			}else{
				curr.parent("li").parents("li.dir").first().mouseenter().children("a").focus();					
			}
		}
		function menusonfocus(action){
	
			switch(action){	
				case "first":
					menus.find("a").eq(0).focus();	
				break;
				case "down":
					menusondown();		
				break;
				case "up":
					menusonup();		
				break;
				case "right":
					if(curr.parents(".dnngo_boxslide").length){
						menusondown();
					}else{
						menusonright();	
					}
				break;
				case "left":
					if(curr.parents(".dnngo_boxslide").length){
						menusonup();
					}else{
						menusonleft();		
					}
				break;
				case "enter":				
					curr.parent().mouseenter();
				break;

				case "end":	
					if(!level_1){
						curr.parents("li.dir").last().mouseenter().children("a").focus();
					}
					curr.mouseleave();
					drop=false;	
	
				break;
	
				curr = menus.find(":focus");
	
				if(curr.parents("ul").eq(0).hasClass("primary_structure")){
					curr.parent().mouseleave();
					level_1=true;
				}else{
					level_1=false;
				}
	
			}
		}


		menus.find("ul").each(function(){
			$(this).children("li:last").children("a").on("blur",function(){
				if(!$(this).siblings("ul:visible,div:visible").length){
					$(this).parents(".dir").last().mouseleave();
				}
			})
		})
		menus.children("li").children("a").on("blur",function(){
			if(!$(this).siblings("ul:visible,div:visible").length){
				$(this).parents(".dir").last().mouseleave();
			}
		})

		menus.find("a").on("focus",function(){
			$(this).parent().mouseenter();
		})



		menus.on("keydown",function(e){	
			
			 keyCode = e.keyCode || e.which || e.charCode; 
			 shiftKey = e.shiftKey ;
			if(menus.find("a").is(":focus") || keyCode==123){
				//curr.mouseout();
				curr = menus.find(":focus");

				if(curr.parents("ul").eq(0).hasClass("primary_structure")){
					level_1=true;
				}else{
					level_1=false;
				}

				if(shiftKey && keyCode == 123) { 
					e.preventDefault();
					menusonfocus("first");	
				}else if(shiftKey && keyCode == 9) {
					menusonfocus("backtab");	
				}else{
					menusondownkey(e,e.keyCode);
				}	
			}
			
		});		 
		

	};
	})(jQuery);


jQuery(document).ready(function ($) {
	$("#dng-megamenu").each(function () {
		var dnngomegamenu_default = {
			slide_speed: 200,
			delay_disappear: 500,
			popUp: "vertical",
			delay_show: 150,
			direction: "ltr",
			megamenuwidth: "box",
			WidthBoxClassName: $(this).parents(".container")
		};
		var e = $(this);
		for (var i in dnngomegamenu_default) {
			if (e.data(i) !== undefined) {
				dnngomegamenu_default[i] = e.data(i)
			} else {
				if (e.data(i.toLowerCase()) !== undefined) {
					dnngomegamenu_default[i] = e.data(i.toLowerCase())
				}
			}
		}
		e.dnngomegamenu(dnngomegamenu_default);
		e.find(".mega-menu").each(function () {
			if ($(this).attr("class").split("columns-")[1]) {
				var col = Math.min($(this).find(".boxslide > ul >li").length, $(this).attr("class").split("columns-")[1].substring(0, 1))
			}
			if (e.data("line") === "on") {
				var line = $('<div class="line"></div>');
				for (var i = 0; i < col; i++) {
					line.append("<span></span>")
				}
				$(this).find(".boxslide").append(line)
			}
		})
	});	
});


jQuery(document).ready(function() { 
	$(".primary_structure").menusKeyboard();
})






