var util = require('../public/src/util.js');
var Chicken = require('./serverchicken.js');

var SmartChicken = function(options){
  Chicken.call(this, options);
  
  this.move = function(time, playerPosition){
    var randomSpeed = Math.floor(Math.random() * 10);
    var random = this.random = Math.floor(Math.random() * 2);
    var radians = util.getRadians(this.dir);
    var pos = this.pos;
    var left = this.pos[0];
    var top = this.pos[1];
    var size = 64;
    var doRotate = false;
    var scaredDistance = 200;

    if (playerPosition !== undefined) {
      var adjacent = playerPosition[0]+(128/4) - this.pos[0]+(64/4);
      var hypotenuse = playerPosition[1]+(128/4) - this.pos[1]+(64/4);

      var playerDistance = Math.sqrt(
        Math.pow(adjacent, 2) + Math.pow(hypotenuse, 2)
      );

      if (playerDistance < scaredDistance
        && this.pos[0] > 0
        && this.pos[0] < 2000
        && this.pos[1] > 0
        && this.pos[1] < 2000
      ) {

      var radians = Math.atan2(hypotenuse, adjacent) + Math.PI / 2;
      var direction = (util.getDirection(radians) + 4) % 8;
      this.dir = direction;
      this.animation = 0;
      this.pos = [this.pos[0] + Math.cos(radians), this.pos[1] + Math.sin(radians)];
      } else {
        Chicken.prototype.move.call(this, time);
      }  
    }
  };
};

SmartChicken.prototype = Object.create(Chicken.prototype);
SmartChicken.prototype.constructor = SmartChicken;

if (typeof module !== 'undefined') {
  module.exports = SmartChicken;
}
