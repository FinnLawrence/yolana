function ParallaxSection(element) {

  var parallaxScale = -0.05;
  var background = element.parentNode;
  var section = background.parentNode;
  var src = element.src;

  background.style.backgroundImage = "url(" + src + ")";
  background.style.opacity = 1;

  this.followCursor = function() {
    var e = window.event;
    var mouseX = e.clientX;
    var mouseY = e.clientY;

    var bounding = section.getBoundingClientRect();

    var left = bounding.left;
    var right = bounding.right;
    var top = bounding.top;
    var bottom = bounding.bottom;

    if(mouseX >= left && mouseY <= right && mouseY >= top && mouseY <= bottom) {

      var displaceX = ((mouseX - ((right - left) / 2)) / ((right - left) / 2)) * (right - left) * parallaxScale;
      var displaceY = ((mouseY - ((bottom - top) / 2)) / ((bottom - top) / 2)) * (bottom - top) * parallaxScale;

      background.style.webkitTransform = "translate(" + displaceX + "px , " + displaceY + "px)";
    }
  }

  this.followGyro = function () {
    var e = window.event;
    
    var x = e.accelerationIncludingGravity.x;  
    var y = e.accelerationIncludingGravity.y;
    
    var motionX = x / 10;
    if (motionX > 1) {
      motionX = 1;
    } else if (motionX < -1) {
      motionX = -1;
    }
    
    var motionY = (y + 5) / 5;
    if (motionY > 1) {
      motionY = 1;
    } else if (motionY < -1) {
      motionY = -1;
    }
    
    var bounding = section.getBoundingClientRect();

    var left = bounding.left;
    var right = bounding.right;
    var top = bounding.top;
    var bottom = bounding.bottom;
    
    var displaceX = motionX * (right - left) * parallaxScale;
    var displaceY = motionY * (bottom - top) * parallaxScale;
    
    background.style.webkitTransform = "translate(" + displaceX + "px , " + displaceY + "px)";
  }

  this.isOnMobileDevice = function() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if ((/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) || /android/i.test(userAgent)) {
      return true;
    } else {
      return false;
    }
  }

  if (this.isOnMobileDevice()) {
    //console.log("Mobile Device");
    window.ondevicemotion = this.followGyro;
  } else {
    //console.log("Desktop Device");
    window.onmousemove = this.followCursor;
    window.onscroll = this.followCursor;
  }
}
