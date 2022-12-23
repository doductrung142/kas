

$.fn.scrollLoading = function (options) {
    var defaults = {
        attr: "data-src",
        container: window,
        loading: false,
        callback: $.noop
    };
    var params = $.extend({}, defaults, options || {});
    var container = $(params.container);
    params.cache = [];
    $(this).each(function () {
        var node = this.nodeName.toLowerCase(),
            url = $(this).attr(params["attr"]);
        var data = {
            obj: $(this),
            tag: node,
            url: url
        };
       
        if( typeof DNNapplyTypography == "undefined" && node=="img" ){

            var  viewBox =$(this).attr("src") && $(this).attr("src").indexOf("viewBox='")!=-1? $(this).attr("src").split("viewBox='")[1].split("' ")[0].split(" "):false;
                if(viewBox[2]){
                var w= viewBox[2];
                }else{
                var w= $(this).width();
                }

            if(url && (url.indexOf(".png")!= -1 || url.indexOf(".gif")!= -1 )){
                $(this).before('<span class="Lazy-loading-transparent" style="width:'+w+'px"></span>');
            }else if(url){
                $(this).before('<span class="Lazy-loading" style="width:'+w+'px"></span>');
            }
        }
        params.cache.push(data);
    });

    var callback = function (call) {
        if ($.isFunction(params.callback)) {
            params.callback.call(call);
        }
    };
    var loading = function () {
        var contHeight = container.outerHeight();
        var contWidth = container.outerWidth();
        if (container.get(0) === window) {
            var contop = $(window).scrollTop();
            var conleft = $(window).scrollLeft();
        } else {
            var contop = container.offset().top;
            var conleft = container.offset().left;
        }

        $.each(params.cache, function (i, data) {
            var o = data.obj,
                tag = data.tag,
                url = data.url,
                post, posb, posl, posr;
            if (o) {
                post = o.offset().top - (contop + contHeight);
                posb = o.offset().top + o.height() - contop;
                posl = o.offset().left - (conleft + contWidth);
                posr = o.offset().left + o.width() - conleft;
                if (o.is(':visible') && (post < 0 && posb > 0) && (posl < 0 && posr > 0)) {
                    if (url) {
                        if (tag === "img" ) {
                            callback(o.attr("src", url));
                            if (params.loading) {
                                o.one("load", function () {
                                    o.siblings(".Lazy-loading,.Lazy-loading-transparent").addClass("load-over").delay(400).queue(function(){$(this).remove().dequeue();});
                                })
                            } else {
                                o.one("load", function () {
                                    o.siblings(".Lazy-loading,.Lazy-loading-transparent").addClass("load-over").delay(400).queue(function(){$(this).remove().dequeue();});
                                })
                            }
                        }else if (tag === "iframe") {  
                            callback(o.attr("src", url));
                            o.one("load", function () {
                                o.removeClass("Lazy-loading");
                            })
                        } else {
                            callback(o.css("background-image", "url(" + url + ")"));
                            o.siblings(".Lazy-loading,.Lazy-loading-transparent").addClass("load-over").delay(400).queue(function(){$(this).remove().dequeue();});
                        }
                    } else {
                        callback(o);
                        o.siblings(".Lazy-loading,.Lazy-loading-transparent").addClass("load-over").delay(400).queue(function(){$(this).remove().dequeue();});
                    }
                    data.obj = null;
                }
            }
        });
    };
    loading();
    container.bind("scroll", loading);

};

jQuery(document).ready(function () {    
    $(".img-Lazy").scrollLoading({
        loading: true,
    });
    $(".iframe-Lazy").scrollLoading({
        loading: true,
    });
})


