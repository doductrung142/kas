 /* custom JS here */
  function responheight() {
	var hfoot = $(window).height();
	var hheader=$('.logo').outerHeight();
	//var hfooter = $('.footer').outerHeight();
	//$('.page').css({minHeight:hfoot});	
	//$('.page').css({marginTop:hheader});	
	//$('.maincontent').css({height:hfoot});	
	/*$('.maincontent .container').css({paddingTop:hheader});	*/
}
$('#slider').slick({
	dots: false,
	arrows: true,
	autoplay: true,
 	autoplaySpeed: 3000
});

$(window).load(function() {
	responheight();
	
});

$(window).resize(function(){
	responheight();
});
