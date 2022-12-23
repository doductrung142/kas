/*dngCanvas */
(function ($) {
	$.fn.dngCanvas = function (o) {
		o = $.extend({
			effect: "outline",
			speed: 500,
			brushcolor: "#000"
		}, o || {});
		var d = $(this);

		var effect = {
			outline: function () {
				var svg = $('<svg  version="1.1" xmlns="http://www.w3.org/2000/svg" ></svg>');
				var w = parseInt(d.innerWidth());
				var h = parseInt(d.height());
				d.css("position") == "static" && d.css("position", "relative");
				d.find("svg").remove();
				svg.attr({
					"width": w + "px",
					"height": h + "px",
					"viewBox": "0 0 " + w + " " + h
				})
				svg.css({
					"position": "absolute",
					"top": 0,
					"left": 0
				});

				d.append(svg);

				var line = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
				var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

				var sx = 5;
				var sy = 5;
				var lineColor = '#FFFFFF';
				var circleColor = '#FFFFFF';
				var linestrokeWidth = '1';
				var time = 10;
				var step = 10;
				var length = w * 2 + h * 2 - sy * 2 - sx * 2;
				var lengthoffset = length - 40;
				var point = [{
					x: 0
				}, {
					y: 0
				}];
				var out = false;
				line.setAttribute('points', parseInt(w/2-20)+','+sy+' '+(w-sx)+','+sy+' '+(w-sx)+','+(h-sy)+' '+sx+','+(h-sy)+' '+sx+','+sy+' '+parseInt(w/2-19)+','+sy);
				line.setAttribute('stroke', lineColor);
				line.setAttribute('fill', 'none');
			//	line.setAttribute('style', '-webkit-transform: translate(-0.5px,0.5px);transform: translate(-0.5px,0.5px);')
				line.setAttribute('stroke-width', linestrokeWidth);
				line.setAttribute('stroke-dasharray', length + "px");
				line.setAttribute('stroke-dashoffset', lengthoffset + "px");

				svg.append(line);

				circle.setAttribute('cx', parseInt(w / 2 + 20));
				circle.setAttribute('cy', sy + .5);
				circle.setAttribute('r', '3');
				circle.setAttribute('fill', circleColor);
				svg.append(circle);

				var ani = function () {
					if (out) {
						lengthoffset = Math.min(lengthoffset + step, length - 40);
					} else {
						lengthoffset = Math.max(lengthoffset - step, 0);
					}
					line.setAttribute('stroke-dashoffset', lengthoffset + "px");

					point = line.getPointAtLength(length - lengthoffset)
					circle.setAttribute('cx', point.x);
					circle.setAttribute('cy', point.y);
					if (lengthoffset == 0 || lengthoffset == length) {
						clearInterval(anitime);
					}
				}

				var anitime = setInterval(function () {}, time);

				d.parents("li").last().on("mouseenter", function () {
					if ($(this).hasClass("active")) {

						w = parseInt(d.innerWidth());
						h = parseInt(d.height());
						line.setAttribute('points', parseInt(w/2-20)+','+sy+' '+(w-sx)+','+sy+' '+(w-sx)+','+(h-sy)+' '+sx+','+(h-sy)+' '+sx+','+sy+' '+parseInt(w/2-19)+','+sy);
						line.setAttribute('stroke-dasharray', length + "px");

						out = false;
						clearInterval(anitime);
						anitime = setInterval(function () {
							ani()
						}, time);
						
					}
				}).on("mouseleave", function () {
					var e = $(this);
					setTimeout(function () {
						if (!e.hasClass("active")) {
							out = true;
							clearInterval(anitime);
							anitime = setInterval(function () {
								ani()
							}, time);
						}
					}, 50)
				})
				if (d.parents("li").last().hasClass("active")) {
					line.setAttribute('stroke-dashoffset', 0);
					point = line.getPointAtLength(length)
					circle.setAttribute('cx', point.x);
					circle.setAttribute('cy', point.y);
				}

				/* */
				$(window).resize(function(){

					d.css("width",$(".photos-slide-style2 > li:not(.active)").width());

					clearInterval(anitime);
					 w = parseInt(d.innerWidth());
					 h = parseInt(d.height());
						svg.attr({
							"width": w + "px",
							"height": h + "px",
							"viewBox": "0 0 " + w + " " + h
						})
					length = w * 2 + h * 2 - sy * 2 - sx * 2;
					lengthoffset = length - 40;
					line.setAttribute('stroke-dasharray', length + "px");

					if (d.parents("li").hasClass("active")) {

						line.setAttribute('points', parseInt(w/2-20)+','+sy+' '+(w-sx)+','+sy+' '+(w-sx)+','+(h-sy)+' '+sx+','+(h-sy)+' '+sx+','+sy+' '+parseInt(w/2-19)+','+sy);

						line.setAttribute('stroke-dashoffset', 0);
						
						point = line.getPointAtLength(length);

						circle.setAttribute('cx', point.x);
						circle.setAttribute('cy', point.y);

					}else{
						line.setAttribute('points', parseInt(w/2-20)+','+sy+' '+(w-sx)+','+sy+' '+(w-sx)+','+(h-sy)+' '+sx+','+(h-sy)+' '+sx+','+sy+' '+parseInt(w/2-19)+','+sy);

						line.setAttribute('stroke-dashoffset', lengthoffset + "px");

						circle.setAttribute('cx', parseInt(w / 2 + 20));
						circle.setAttribute('cy', sy + .5);
					}
							

				}) 

			},
			brush: function () {
				var id = Math.ceil(Math.random() * 100000);
				var svg = $('<svg  version="1.1" xmlns="http://www.w3.org/2000/svg" ><defs><filter id="f'+id+'"><feGaussianBlur stdDeviation="0.8"></feGaussianBlur></filter></defs></svg>');
				var w = parseInt(d.innerWidth());
				var h = 16;
				d.css("position") == "static" && d.css("position", "relative");

				svg.attr({
					"width": w + "px",
					"height": h + "px",
					"viewBox": "0 0 " + w + " " + h
				})
				svg.css({
					"position": "absolute",
					"left": 0,
					"bottom": "0",
					"z-index": '-1'
				});

				
				d.append(svg);

				var path = document.createElementNS("http://www.w3.org/2000/svg", "path");

				var lineColor = o.brushcolor;
				var speed =d.data("speed")?d.data("speed"):o.speed;
				var time = 1000/60;
				var leng = w-4;
				var step = leng/(speed/time);
				var out = false;
				var ex = 0;
				var op= .02;

				if(d.innerWidth()<=50){
					op =.4;
				}


				function pathLength() {
					path.setAttribute('fill-opacity', Math.min(1, ex * op));
					path.setAttribute('stroke-opacity', Math.min(1, ex * op));
					path.setAttribute('d', 'M1,8 1,5 2,5 2,4 3,4 3,2 4,2 4,1 '+ex+',1 '+ex+',2 '+(ex+1)+',2 '+(ex+1)+',3 '+(ex+3)+',3 '+(ex+3)+',4 '+(ex+5)+',5 '+(ex+8)+',5 '+(ex+8)+',8 '+(ex+9)+',8 '+(ex+9)+',10 '+(ex+7)+',10 '+(ex+7)+',11 '+(ex+5)+',11 '+(ex+5)+',12 '+(ex+4)+',12 '+(ex+4)+',13 8,13 8,12 7,12 7,11 6,11 6,10 2,10 2,8 1,8');
				}
				pathLength();
				path.setAttribute('stroke', "none");
				path.setAttribute('fill', lineColor);
				path.setAttribute('filter', 'url(#f'+id+')');
				svg.append(path);

				var ani = function () { 
					ex = out ? Math.max(0, ex - step) : Math.min(w - 12, ex + step);
					pathLength();
					if (ex == 0 || ex == w - 12) clearInterval(anitime);

				}

				var anitime = setInterval(function () {}, time);
				d.on("change", function () { 
					if (d.hasClass("active")) {
						out = false;
						clearInterval(anitime);
						anitime = setInterval(function () {
							ani()
						}, time);
					} else {
						out = true;
						clearInterval(anitime);
						anitime = setInterval(function () {
							ani()
						}, time);
					}
				})
				if (d.hasClass("active")) {
					ex = w - 12;
					pathLength();
				}
			}

		};

		typeof effect[o.effect] != undefined && effect[o.effect]();
	}
})(jQuery);



var dngCanvasLauncher = function(mod){
	mod.each(function(){
		var e=$(this);
		var brushcolor = e.data("brushcolor")?e.data("brushcolor"):GlobalThemeOptions["accent2"];
			if(GlobalThemeOptions[brushcolor]){
				brushcolor=GlobalThemeOptions[brushcolor]
			}
		if(!e.find("svg").length){
			e.dngCanvas({effect: "brush",brushcolor:brushcolor});
		}
		var animated =true;
		$(window).scroll(function(){
			if(animated && e.hasClass("animated")){
				animated =false;
				e.addClass("active").change();
			}
		})
		
		if(animated && e.hasClass("animated")){
			animated =false;
			e.addClass("active").change();
		}
	
	})
}


$(document).ready(function() {
	dngCanvasLauncher($(".brush.animation"));
})
