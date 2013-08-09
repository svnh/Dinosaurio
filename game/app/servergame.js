var serverChicken = {};
var util = require('../public/src/util.js');

serverChicken.moveChicken = function(time, chickenType){
    var randomSpeed = (Math.random() * 2);
    var random = Math.floor(Math.random() * 3);
    var radians = util.getRadians(chickenType.dir);
    var pos = chickenType.pos;
    var left = chickenType.pos[0];
    var top = chickenType.pos[1];
    var size = 64;
    var newLeft = left + Math.cos(radians) * randomSpeed;
    var newTop = top + Math.sin(radians) * randomSpeed;

    chickenType.random = random;

    var doRotate = util.isOutOfBounds(left, size, top);

    if (doRotate[0] === true) {
      newLeft = doRotate[1] + Math.cos(radians) * randomSpeed;
      newTop = doRotate[1] + Math.sin(radians) * randomSpeed

      chickenType.dir = Math.floor((chickenType.dir + 2) % 8);

      radians = util.getRadians(chickenType.dir);

      chickenType.pos = [newLeft, newTop];
      chickenType.animation = 0;

    } if (time - chickenType.lastUpdate > 3000) {
      chickenType.lastUpdate = time;
      chickenType.animation = random;
      if (random === 0 || random === 1) {
        chickenType.dir = chickenType.dir === 7 ? 0 : chickenType.dir+1;
        chickenType.pos = [newLeft, newTop];
      }

    } else {
      if (chickenType.animation === 0 || chickenType.animation === 1) {
        chickenType.pos = [newLeft, newTop];
      } if (chickenType.animation === 2) {
        chickenType.pos = [chickenType.pos[0], chickenType.pos[1]];
        chickenType.animation = 2;
      }
    }
  }


if (typeof module !== 'undefined') {
  module.exports = serverChicken;
}