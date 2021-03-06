var util = require('../public/src/util.js');
var Actor = require('./serveractor.js');

var SmartChicken = function(options){
  Actor.call(this, options);
  
  
  this.move = function(time, playerPosition){
    var left = this.pos[0];
    var top = this.pos[1];
    var scaredDistance = 200;

    if (playerPosition !== undefined) {
      var close = util.findDistance(playerPosition, scaredDistance, left, top);
      if (close[0]) {
        var radians = Math.atan2(close[1], close[2]) + Math.PI / 2;
        this.dir = (util.getDirection(radians) + 4) % 8;
        this.animation = 0;

        var rotation = util.getRadians(this.dir);

        var moveLeft = Math.cos(rotation) * 2;
        var moveTop = Math.sin(rotation) * 2;

        this.pos = [left + moveLeft, top + moveTop];

        this.lastUpdate = time;

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
