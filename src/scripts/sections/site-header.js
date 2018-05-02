$(window).scroll(function() {
  var scroll = $(window).scrollTop();
  if (scroll > 50) {
    $('.logo-background').addClass("collapsed");
  } else {
    $('.logo-background').removeClass("collapsed");
  }
});