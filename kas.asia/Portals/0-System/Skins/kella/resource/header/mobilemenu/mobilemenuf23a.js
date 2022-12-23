jQuery(document).ready(function ($) {


    $(".mobilemenu-main").each(function () {
        var e = $(this);

        e.siblings(".mobile-menu-icon").on("click", function () {
            e.addClass("active");
            $("html").addClass("opne-mobilemenu");
        })
        e.find(".mobileclose").on("click", function () {
            e.removeClass("active");
            $("html").removeClass("opne-mobilemenu");
        })
         e.find(".gomenu .dir").prepend('<span class="arrows"><i></i></span>')

        e.find(".gomenu > ul").before('<div class="menutitle">'+(e.data("title")?e.data("title"):"Menu")+'</div>')

        e.find(".gomenu > ul >li.dir").each(function () {
            var ul = $(this).children("ul").addClass("sub-menu");
            e.find(".m-menu").append(ul);
            ul.wrap('<div class="sub-menu-wrap"></div>');
            ul.parent().prepend('<div class="menutitle">' + $(this).children("a").text() + '</div>')
            $(this).children(".arrows").on("click", function () {
                ul.parent().toggleClass("active").siblings().removeClass("active");
                $(this).toggleClass("active");
            })
            if($(this).hasClass("current") && ul.find(".subcurrent").length){
                $(this).children(".arrows").click();
            }
        })
        e.find(".sub-menu-wrap .menutitle").on("click", function () {
            $(this).parent().removeClass("active");
            e.find(".gomenu .arrows").removeClass("active");
        })
        e.find(".sub-menu-wrap .arrows").on("click", function () {
            $(this).toggleClass("active");
            $(this).siblings("ul").slideToggle().parent().siblings().children("ul").slideUp().siblings().removeClass("active");
        })
        $("body").append(e);
 
        e.find(".subcurrent").parent("ul").siblings(".arrows").click();

        e.find('a[href*="#"]:not(.mm-btn):not(.mm-next):not(.mm-title):not(.mm-subblocker)').on("click", function () {
            if (jQuery(this.hash).length) {
                $(".mobileclose").click();
            }
        })
        e.find('.dir > a[href="javascript:;"]').on("click",function(event){
            event.preventDefault();
            $(this).siblings(".arrows").click();
        })
    })
});