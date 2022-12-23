jQuery(function() {
    ParallaxScroll.init();
});

var ParallaxScroll = {
    /* PUBLIC VARIABLES */
    showLogs: false,
    round: 1000,

    /* PUBLIC FUNCTIONS */
    init: function() {
        this._log("init");
        if (this._inited) {
            this._log("Already Inited");
            this._inited = true;
            return;
        }
        this._requestAnimationFrame = (function(){
          return  window.requestAnimationFrame       || 
                  window.webkitRequestAnimationFrame || 
                  window.mozRequestAnimationFrame    || 
                  window.oRequestAnimationFrame      || 
                  window.msRequestAnimationFrame     || 
                  function(/* function */ callback, /* DOMElement */ element){
                      window.setTimeout(callback, 1000 / 60);
                  };
        })();
        this._onScroll(true);
    },

    /* PRIVATE VARIABLES */
    _inited: false,
    _properties: ['x', 'y', 'z','rotate', 'rotateX', 'rotateY', 'rotateZ', 'scaleX', 'scaleY', 'scaleZ', 'scale','opacity'],
    _requestAnimationFrame:null,

    /* PRIVATE FUNCTIONS */
    _log: function(message) {
        if (this.showLogs) console.log("Parallax Scroll / " + message);
    },
    _onScroll: function(noSmooth) {
        var scroll = jQuery(document).scrollTop();
        var windowHeight = jQuery(window).height();
        this._log("onScroll " + scroll);
        jQuery("[data-parallax2]").each(jQuery.proxy(function(index, el) {
            var jQueryel = jQuery(el);
            var properties = [];
            var applyProperties = false;
            var style = jQueryel.data("style");
            if (style == undefined) {
                style = jQueryel.attr("style") || "";
                jQueryel.data("style", style);
            }
            var datas = [jQueryel.data("parallax2")];
            var iData;
            for(iData = 2; ; iData++) {
                if(jQueryel.data("parallax2"+iData)) {
                    datas.push(jQueryel.data("parallax2-"+iData));
                }
                else {
                    break;
                }
            }
			
            var datasLength = datas.length;
            for(iData = 0; iData < datasLength; iData ++) {
                var data = datas[iData];
                var scrollFrom = data["from-scroll"];
               // if (scrollFrom == undefined) scrollFrom = Math.max(0, jQuery(el).offset().top - windowHeight);
               if (scrollFrom == undefined){
               // if(jQuery(el).parent().length){
               //     scrollFrom =  Math.max(jQuery(el).parent().offset().top,jQuery(el).offset().top) - windowHeight;
               // }else{
                    scrollFrom =  jQuery(el).offset().top - windowHeight;
               // }
               }
               if(scrollFrom && String(scrollFrom).indexOf("%") != -1){
                scrollFrom = Number(windowHeight)*Number(scrollFrom.replace("%",""))*0.01;  
               }
                scrollFrom = scrollFrom | 0;
                var scrollDistance = data["distance"];
                var scrollTo = data["to-scroll"];
                if (scrollDistance == undefined && scrollTo == undefined) scrollDistance = windowHeight+jQueryel.height();
                if(scrollDistance && String(scrollDistance).indexOf("%") != -1){
                    scrollDistance =  Number(windowHeight)*Number(scrollDistance.replace("%",""))*0.01 ;   //- parseInt(jQueryel.height())
                }
                

                scrollDistance = Math.max(scrollDistance | 0, 1);
                var easing = data["easing"];
                var easingReturn = data["easing-return"];
                if (easing == undefined || !jQuery.easing|| !jQuery.easing[easing]) easing = null;
                if (easingReturn == undefined || !jQuery.easing|| !jQuery.easing[easingReturn]) easingReturn = easing;
                if (easing) {
                    var totalTime = data["duration"];
                    if (totalTime == undefined) totalTime = scrollDistance;
                    totalTime = Math.max(totalTime | 0, 1);
                    var totalTimeReturn = data["duration-return"];
                    if (totalTimeReturn == undefined) totalTimeReturn = totalTime;
                    scrollDistance = 1;
                    var currentTime = jQueryel.data("current-time");
                    if(currentTime == undefined) currentTime = 0;
                }
                if (scrollTo == undefined) scrollTo = scrollFrom + scrollDistance;
                scrollTo = scrollTo | 0;
                var smoothness = data["smoothness"];
                if (smoothness == undefined) smoothness = 10;
                smoothness = smoothness | 0;
                if (noSmooth || smoothness == 0) smoothness = 1;
                smoothness = smoothness | 0;
                var scrollCurrent = scroll;
                
                scrollCurrent = Math.max(scrollCurrent, scrollFrom);
                scrollCurrent = Math.min(scrollCurrent, scrollTo);

                if(easing) {
                    if(jQueryel.data("sens") == undefined) jQueryel.data("sens", "back");
                    if(scrollCurrent>scrollFrom) {
                        if(jQueryel.data("sens") == "back") {
                            currentTime = 1;
                            jQueryel.data("sens", "go");
                        }
                        else {
                            currentTime++;
                        }
                    }
                    if(scrollCurrent<scrollTo) {
                        if(jQueryel.data("sens") == "go") {
                            currentTime = 1;
                            jQueryel.data("sens", "back");
                        }
                        else {
                            currentTime++;
                        }
                    }
                    if(noSmooth) currentTime = totalTime;
                    jQueryel.data("current-time", currentTime);
                }
                this._properties.map(jQuery.proxy(function(prop) {
                    var defaultProp = 0;
                    var to = data[prop];
					
                    if (to == undefined) return;
                    if(prop=="scale" || prop=="scaleX" || prop=="scaleY" || prop=="scaleZ" || prop=="opacity" ) {
                        defaultProp = 1;
                    }else {
                      //  to = to | 0;
                    }
                    var prev = jQueryel.data("_" + prop);
                    if (prev == undefined) prev = defaultProp;
                    var next = (((to-defaultProp) * (scrollCurrent - scrollFrom) / (scrollTo - scrollFrom)) + defaultProp);
                    var val = prev + (next - prev) / smoothness;
                   // val =parseFloat(val).toFixed(4);
                    if(easing && currentTime>0 && currentTime<=totalTime) { 
                        var from = defaultProp;
                        if(jQueryel.data("sens") == "back") {
                            from = to;
                            to = -to;
                            easing = easingReturn;
                            totalTime = totalTimeReturn;
                        }
                        val = jQuery.easing[easing](null, currentTime, from, to, totalTime);
                    }
                   // val = Math.ceil(val * this.round) / this.round;
                    if(val==prev&&next==to) val = Number(to);
                   
                    if(!properties[prop]) properties[prop] = 0;
                    
                    if(scroll < scrollFrom){val = Number(to)};

                    properties[prop] = val; 
                  
                    if (prev != properties[prop]) {
                        if(scroll >= scrollFrom){
                        jQueryel.data("_" + prop, properties[prop]);
                        }
                        applyProperties = true;
                    }else{
                      //  properties[prop] = defaultProp; 
                    }
                    
                }, this));
            }

          //  if (applyProperties) {
				var currDatas =datas[iData-1] ;
                if (properties["z"] != undefined || properties["scaleX"] != undefined || properties["scaleY"] != undefined || properties["scaleZ"] != undefined || properties["rotateX"] != undefined || properties["rotateY"] != undefined || properties["rotateZ"] != undefined ) {
                    var perspective = data["perspective"];
                    if (perspective == undefined) perspective = 800;
                    var jQueryparent = jQueryel.parent();
                    if(!jQueryparent.data("style")) jQueryparent.data("style", jQueryparent.attr("style") || "");
                    jQueryparent.attr("style", "perspective:" + perspective + "px; -webkit-perspective:" + perspective + "px; "+ jQueryparent.data("style"));
                }
                if(scroll >= scrollFrom){
                    for (var key in properties) { 
                        if(currDatas[key] != undefined){
                            if( (key=="opacity") && properties[key] != 1 && properties[key] ){
                                properties[key]  =Math.min(Number(currDatas[key]) - Number(properties[key])*2 + 2,1);
                            
                            }else if( (key=="scaleX" || key=="scaleY" || key=="scaleZ") && properties[key] != 1 && properties[key] ){
                                // console.log( (Number(currDatas[key]) - properties[key] + 1))
                              //  if(Number(currDatas[key])>1){
                             //       properties[key] =   Math.max((Number(currDatas[key]) - Number(1+(properties[key]-1)*2) + 1),1).toFixed(4).replace(/[.]?0+$/g,"");
                             //   }else{
                                properties[key]  =Math.max(0,Math.min(Number(currDatas[key]) - Number(properties[key])*2 + 2,1));
                              //  }
                            }else if((key=="x" || key=="y" || key=="z" )  && properties[key] ){
                                properties[key] = (currDatas[key]-properties[key]*2).toFixed(4).replace(/[.]?0+$/g,"");
                            }else if(( key=="rotate" || key=="rotateX" || key=="rotateY" || key=="rotateZ")  && properties[key] ){
                                properties[key] = (currDatas[key]-properties[key]).toFixed(4).replace(/[.]?0+$/g,"");
                            }
                        }
                    }
               }
              //  console.log(properties)
                var translate3d = "translate3d(" + (properties["x"] ? properties["x"] : 0) + "px, " + (properties["y"] ? properties["y"] : 0) + "px, " + (properties["z"] ? properties["z"] : 0) + "px)";
                var rotate3d =(properties["rotateX"] ? "rotateX("+properties["rotateX"]+"deg) " :"")+(properties["rotateY"] ? "rotateY("+properties["rotateY"]+"deg) " :"")+(properties["rotateZ"] ? "rotateZ("+properties["rotateZ"]+"deg) " :"");
                if(properties["rotate"]){
                    rotate3d ="rotate("+properties["rotate"]+"deg)";
                }
				var scale3d =(properties["scaleX"] || properties["scaleX"]==0 ? "scaleX("+properties["scaleX"]+") " :"")+(properties["scaleY"] || properties["scaleY"]==0? "scaleY("+properties["scaleY"]+") " :"")+(properties["scaleZ"] || properties["scaleZ"]==0 ? "scaleZ("+properties["scaleZ"]+") " :"");
                var opacity =properties["opacity"] || properties["opacity"]===0 ? "opacity:"+properties["opacity"]+";" :"";
                
                var cssTransform = translate3d + " " + rotate3d + " " + scale3d + ";";
                 this._log(cssTransform);
            
                jQueryel.attr("style", "transform:" + cssTransform + " -webkit-transform:" + cssTransform +opacity+ " " + style+" ");

          //  }
			
			
			
        }, this));
        if(window.requestAnimationFrame) {
            window.requestAnimationFrame(jQuery.proxy(this._onScroll, this, false));
        }
        else {
            this._requestAnimationFrame(jQuery.proxy(this._onScroll, this, false));
        }
    }
};