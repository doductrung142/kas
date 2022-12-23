$(document).ready(function () {

  jQuery.fn.stepvisible = function (partial) {
      var $t = $(this),
          $w = $(window),
          viewTop = $w.scrollTop(),
          viewBottom = viewTop + $w.height() * 0.7,
          _top = $t.offset().top ? $t.offset().top : $t.parent().offset().top,
          _bottom = _top + $t.height(),
          compareTop = partial === true ? _bottom : _top,
          compareBottom = partial === true ? _top : _bottom;

      if ($t.hasClass("visible")) {
          return false
      }
      return ((compareBottom <= viewBottom))
  };

  $(".step-01").each(function(){
  var li = $(this).children("li");
  li.each(function () {
      var c = $(this).removeClass("active current prev");
      if (!c.children(".top-line").length) {
          c.append("<div class=\"top-line\"><span></span></div><div class=\"bottom-line\"><span></span></div>")
      }
  })
  var start = li.eq(0);
  var curr = li.eq(0);
  function step() {
      if (curr.stepvisible(true) && !curr.hasClass("active")) {
          curr.addClass("current").siblings().removeClass("current");
          curr.addClass("active").stop().delay(600).queue(function () {

              if ($(this).next().length) {
                  curr = $(this).next();
                  $(this).dequeue();
                  step();
              }
          })
          curr.addClass("active").prev().addClass("prev");
      }
  }

  $(window).scroll(function (event) {
      step();
  })
  step();

  })





})