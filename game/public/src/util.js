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
  ) {
    return true;
  } else {
    return false;
  }
};

util.getDirection = function(r) {
  return (Math.floor((8 / (Math.PI * 2)) * (r + Math.PI / 2)) + 6) % 8;
};

util.isOutOfBounds = function(size, left, top){
  if (left + size/4 <= 0) {
    left = -size/4;
    return [true, left, top];
  }

  if (top + size/4 <= 0) {
    top = -size/4;
    return [true, left, top];
  }

  if (left + size*3/4 >= 2048) {
    left = 2048 - size*3/4;
    return [true, left, top];
  }

  if (top + size*3/4 >= 2048) {
    top = 2048 - size*3/4;
    return [true, left, top];
  }
  return [false, left, top];
};

util.findDistance = function(playerCords, testDistance, left, top){
  var adjacent = playerCords[0]+(128/4) - left+(64/4);
  var hypotenuse = playerCords[1]+(128/4) - top+(64/4);

  var playerDistance = Math.sqrt(
    Math.pow(adjacent, 2) + Math.pow(hypotenuse, 2)
  ); 
  if (playerDistance < testDistance
          && left > 0
          && left < 2000
          && top > 0
          && top < 2000
        ) {
    return [true, hypotenuse, adjacent];
  }
  return [false, hypotenuse, adjacent];
};

util.randomCord = function(){
  return Math.floor((Math.random() * 2048) + 1);
}

if (typeof module !== 'undefined') {
  module.exports = util;
}

