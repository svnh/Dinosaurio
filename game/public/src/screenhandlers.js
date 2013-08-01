// Rate limit how often we repaint/reflow the DOM
var resizer = _.throttle(function() {
  var newWidth = document.documentElement.clientWidth;
  var newHeight = document.documentElement.clientHeight;
  stage.setSize(newWidth, newHeight);
}, 75);

$(window).resize(resizer);

var goFullScreen = function(){
  console.trace();
  var elem = document.getElementById("container");
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  }
};