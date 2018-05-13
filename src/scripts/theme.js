window.slate = window.slate || {};
window.theme = window.theme || {};

/*================ Slate ================*/
// =require slate/a11y.js
// =require slate/cart.js
// =require slate/utils.js
// =require slate/rte.js
// =require slate/sections.js
// =require slate/currency.js
// =require slate/images.js
// =require slate/variants.js

/*================ Sections ================*/
// =require sections/product.js
// =require sections/parallax-banner.js
// =require sections/site-header.js
// =require sections/mailchimp-signup.js
// =require sections/social-feeds.js

/*================ Templates ================*/
// =require templates/customers-addresses.js
// =require templates/customers-login.js

$(document).ready(function() {
  var sections = new slate.Sections();
  sections.register('product', theme.Product);

  // Common a11y fixes
  slate.a11y.pageLinkFocus($(window.location.hash));

  $('.in-page-link').on('click', function(evt) {
    slate.a11y.pageLinkFocus($(evt.currentTarget.hash));
  });

  // Target tables to make them scrollable
  var tableSelectors = '.rte table';

  slate.rte.wrapTable({
    $tables: $(tableSelectors),
    tableWrapperClass: 'rte__table-wrapper',
  });

  // Target iframes to make them responsive
  var iframeSelectors =
      '.rte iframe[src*="youtube.com/embed"],' +
      '.rte iframe[src*="player.vimeo"]';

  slate.rte.wrapIframe({
    $iframes: $(iframeSelectors),
    iframeWrapperClass: 'rte__video-wrapper'
  });

  // Apply a specific class to the html element for browser support of cookies.
  if (slate.cart.cookiesEnabled()) {
    document.documentElement.className = document.documentElement.className.replace('supports-no-cookies', 'supports-cookies');
  }

  addYolanaHandlers();
});

function addYolanaHandlers() {
  $('.menu-link-open').click(function() {
    $('.nav-links').addClass("open");
  });

  $('.menu-link-close').click(function() {
    $('.nav-links').removeClass("open");
  });

  $('.scroll-to').click(function () {
    var target = $(this).attr('href');

    if (target && target.charAt(0) === '#') {
      var current = $(window).scrollTop();
      var target = $(target).offset().top - 106;
      var duration = Math.abs(target - current) / 1.5;
      $('html, body').animate({scrollTop: target}, duration);
      return false;
    }
  });
}

$(window).scroll(function() {
  $('.sticky-wrapper').each(function() {
    var wrapper = $(this);
    var wrapperLeft = wrapper.offset().left;
    var wrapperTop = wrapper.offset().top;
    var wrapperBottom = wrapperTop + wrapper.outerHeight();
    var wrapperWidth = wrapper.width();

    var content = wrapper.find(".sticky-content");
    var contentTop = content.offset().top;
    var contentHeight = content.outerHeight();

    var scroll = $(window).scrollTop();

    var threshold = 100;

    if (scroll + threshold > wrapperTop) {
      if ((wrapperBottom - scroll) > (threshold + contentHeight)) {
        content.css("position", "fixed");
        content.css("top", threshold + "px");
        content.css("bottom", "auto");
        content.css("left", wrapperLeft + "px");
        content.css("width", wrapperWidth + "px");
      } else {
        content.css("position", "absolute");
        content.css("top", "auto");
        content.css("bottom", "0px");
        content.css("left", "0px");
        content.css("width", wrapperWidth + "px");
      }
    } else {
      content.css("position", "static");
      content.css("top", "auto");
      content.css("bottom", "auto");
      content.css("left", "auto");
      content.css("width", "auto");
    }
  });
});
