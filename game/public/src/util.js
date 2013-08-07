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

var theyAreColliding = function(GreenDino, chickenInstance) {
  greenX = GreenDino.attrs.x;
  greenY = GreenDino.attrs.y;
  chickenInstanceX = chickenInstance.x;
  chickenInstanceY = chickenInstance.y;

  return( !(greenX > chickenInstanceX + 40 ||  //
   greenX + 60 < chickenInstanceX ||  // 
   greenY > chickenInstanceY + 40 ||   //
   greenY + 60 < chickenInstanceY));  //
};