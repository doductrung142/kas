

function miniLightbox(e) {
    var holder = $(".minilightbox-holder"),e=$(e),
        type = e.data("ilightbox")?e.data("ilightbox"):"image",
        url = e.attr("href"),
        title =e.attr("title"),
        pr= window.innerWidth -$(window).width() ,
        groupImg=false,
        currImg=false,
        imgload=false;

        if(e.find("img").hasClass("elm-active")) return false;

        if(!holder.length){
            $('body').append('<div class="minilightbox-holder" aria-hidden="true"><div class="minilightbox-close"></div><div class="minilightbox-mask"></div><div class="minilightbox-content"></div><div class="minilightbox-prev"><span></span></div><div class="minilightbox-next"><span></span></div></div>');
            holder = $(".minilightbox-holder");
        }

        $('.minilightbox-prev,.minilightbox-next').hide();

    var lightbox = $('.minilightbox-holder'),content = lightbox.find('.minilightbox-content');

        function lightContBox(type,url,title){
            var html="";
            switch(type){
                case "image":
                    html ='<div class="box lightbox-image"><img src="'+url+'" alt="'+(title?title:"")+'">'+(title?'<div class="minilight-title">'+title+'</div>':'')+'</div>';
                    content.addClass("loading");
                break;  
                case "youtube":
                    html ='<div class="box lightbox-youtube"><div class="box-responsive"><iframe src="'+url+'" frameborder="0" hspace="0" vspace="0" scrolling="scroll" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe></div></div>';
                break;
                case "vimeo":
                        html ='<div class="box lightbox-vimeo"><div class="box-responsive"><iframe src="'+url+'" frameborder="0" hspace="0" vspace="0" scrolling="scroll" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe></div></div>';
                        break;
                case "html5":
                        html ='<div class="box lightbox-html5"><div class="box-responsive"><video preload="metadata" controls="controls" src="'+url+'">';
                        html +='<source src="'+url+'" type="video/mp4">';
                        html +='</video></div></div>';

                        break;
                case "map":
                    html ='<div class="box lightbox-map"><div class="box-responsive"><iframe src="'+url+'" frameborder="0" hspace="0" vspace="0" scrolling="scroll" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe></div></div>';
                    break;
            }
            return html;
        }
        
        function hideNextPrev(){
            lightbox.find(".minilightbox-prev,.minilightbox-next").show();
            lightbox.find(".minilightbox-prev,.minilightbox-next").removeClass("disabled");
            if(currImg==0){
                lightbox.find(".minilightbox-prev").addClass("disabled");
            }else if(currImg==groupImg.length-1){
                lightbox.find(".minilightbox-next").addClass("disabled");
            }

        }

        if(e.attr("data-group") && $('.is-lightbox[data-group="'+e.attr("data-group")+'"]').length > 1 ){
            groupImg= $('.is-lightbox[data-group="'+e.attr("data-group")+'"]');
            currImg = groupImg.index(e);
            hideNextPrev();
        }
        content.html(lightContBox(type,url,title));
        $("html").css({"overflow":"hidden","padding-right":pr});
        content.find("img,iframe").on("load",function(){
            content.removeClass("loading");  
        })
        lightbox.fadeIn().addClass("active");
        $(".minilightbox-close,.minilightbox-mask").one("click",function(){
            lightbox.fadeOut(function(){
                lightbox.removeClass("active"); 
                content.html("");
            });
             $("html").css({"overflow":"","padding-right":''}); 
        })
        var AnimeEnd=true;
        lightbox.find(".minilightbox-prev,.minilightbox-next").off().on("click",function(){
            if($(this).hasClass("disabled") || !AnimeEnd) return;
            if(groupImg){
                AnimeEnd =false;
                if($(this).hasClass("minilightbox-next")){
                    currImg ++;
                var img = groupImg.eq(currImg);
                }else{
                    currImg --;
                var img =  groupImg.eq(currImg);
                }
                hideNextPrev();
                content.removeClass("loading");  
            var url2 = img.attr("href"),
                title2 =img.attr("title"),
                type2 =img.data("ilightbox")?img.data("ilightbox"):"image";
                imgload =true;
                var clonebox = $('<div class="minilightbox-content"></div>').html(lightContBox(type2,url2,title2));
                if($(this).hasClass("minilightbox-prev")){
                    content.addClass("next-cont").after(clonebox.addClass("prev-cont"))
                }else{
                    content.addClass("prev-cont").before(clonebox.addClass("next-cont"))
                }
                setTimeout(function(){
                    clonebox.removeClass("slder-cont prev-cont next-cont")
                },16)
                setTimeout(function(){
                    content.remove();
                    content = clonebox;
                    AnimeEnd =true; 
                    if(img.data("autoplay") && type2 == "html5"){
                        content.find("video")[0].play();
                    }
                },500)

            }
        }) 

        if(e.data("autoplay") && type == "html5"){
            content.find("video")[0].play();
        }
     

}


$(document).ready(function() {
    $('.is-lightbox').on("click",function (event) {
            event.preventDefault();
             if( typeof DNNapplyTypography == "undefined" ){
                miniLightbox(this);
            }
    });
})