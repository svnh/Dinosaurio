var getRadians = function(direction) {
  return Math.PI * 2 / (8 / direction) - Math.PI / 2;
};

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

var theyAreColliding = function(rectA, rectB) {
  if (
    Math.abs(rectA.left - rectB.left) < (Math.abs(rectA.width + rectB.width) / 2) 
    && (Math.abs(rectA.top - rectB.top) < (Math.abs(rectA.height + rectB.height) / 2))
  )
  return true;
};

var getDirection = function(r) {
  return (Math.floor((8 / (Math.PI * 2)) * (r + Math.PI / 2)) + 6) % 8;
};