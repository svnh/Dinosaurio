// Rate limit how often we repaint/reflow the DOM
var resizer = _.throttle(function() {
  var newWidth = window.innerWidth;
  var newHeight = window.innerHeight;
  var background = document.getElementById('background');

  background.style.width=newWidth;
  background.style.height=newHeight;

  stage.setSize(newWidth, newHeight);
}, 75);

$(window).resize(resizer);

var goFullScreen = function(){
  var elem = document.getElementById("gameScreen");
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  }
};