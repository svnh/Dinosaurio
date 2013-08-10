var util = require('../public/src/util.js');
var Actor = require('./serveractor.js');

var Spider = function(options){
  Actor.call(this, options);
  
  this.move = function(time, playerPosition){
    var left = this.pos[0];
    var top = this.pos[1];
    var attackDistance = 200;

    if (playerPosition !== undefined) {
      var close = util.findDistance(playerPosition, attackDistance, left, top);
      if (close[0]) {
        var radians = Math.atan2(close[1], close[2]) + Math.PI / 2;
        this.dir = (util.getDirection(radians) + 8) % 8;
        this.animation = 0;

        var rotation = util.getRadians(this.dir);

        var moveLeft = Math.cos(rotation);
        var moveTop = Math.sin(rotation);

        this.pos = [left + moveLeft, top + moveTop];

        this.lastUpdate = time;
      } else {
        Actor.prototype.move.call(this, time);
      }  
    }
  };
};

Spider.prototype = Object.create(Actor.prototype);
Spider.prototype.constructor = Spider;

if (typeof module !== 'undefined') {
  module.exports = Spider;
}
