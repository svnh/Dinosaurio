var util = {};
util.getRadians = function(direction) {
  return Math.PI * 2 / (8 / direction) - Math.PI / 2;
};

util.goFullScreen = function(){
  var elem = document.getElementById("gameScreen");
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  }
};

util.theyAreColliding = function(rectA, rectB) {
  if (
    Math.abs(rectA.left - rectB.left) < (Math.abs(rectA.width + rectB.width) / 2) 
    && (Math.abs(rectA.top - rectB.top) < (Math.abs(rectA.height + rectB.height) / 2))
  )
  return true;
};

util.getDirection = function(r) {
  return (Math.floor((8 / (Math.PI * 2)) * (r + Math.PI / 2)) + 6) % 8;
};

if (typeof module !== 'undefined') {
  module.exports = util;
}

// module.exports = {
//   getDirection: function(r) {
//     return (Math.floor((8 / (Math.PI * 2)) * (r + Math.PI / 2)) + 6) % 8;
//   } 
// }

