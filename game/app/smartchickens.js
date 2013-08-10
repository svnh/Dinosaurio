var util = require('../public/src/util.js');
var Actor = require('./serveractor.js');

var SmartChicken = function(options){
  Actor.call(this, options);
  
  this.move = function(time, playerPosition){
    var pos = this.pos;
    var left = this.pos[0];
    var top = this.pos[1];
    var scaredDistance = 200;

    if (playerPosition !== undefined) {
      var adjacent = playerPosition[0]+(128/4) - left+(64/4);
      var hypotenuse = playerPosition[1]+(128/4) - top+(64/4);

      var playerDistance = Math.sqrt(
        Math.pow(adjacent, 2) + Math.pow(hypotenuse, 2)
      );

      if (playerDistance < scaredDistance
        && left > 0
        && left < 2000
        && top > 0
        && top < 2000
      ) {

      var radians = Math.atan2(hypotenuse, adjacent) + Math.PI / 2;
      var direction = (util.getDirection(radians) + 4) % 8;
      this.dir = direction;
      this.animation = 0;
      this.pos = [left + Math.cos(radians), top + Math.sin(radians)];
      } else {
        Actor.prototype.move.call(this, time);
      }  
    }
  };
};

SmartChicken.prototype = Object.create(Actor.prototype);
SmartChicken.prototype.constructor = SmartChicken;

if (typeof module !== 'undefined') {
  module.exports = SmartChicken;
}
