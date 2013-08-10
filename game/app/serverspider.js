var util = require('../public/src/util.js');
var Actor = require('./serveractor.js');

var Spider = function(options){
  Actor.call(this, options);
  this.speed = 1/2;
  this.attacking = false;

  this.move = function(time, playerPosition){
    var left = this.pos[0];
    var top = this.pos[1];
    var attackDistance = 200;

    if (playerPosition !== undefined) {
      var close = util.findDistance(playerPosition, attackDistance, left, top);
      if (this.attacking === true){
        this.animation = 2;
      } else if (close[0]) {
        var radians = Math.atan2(close[1], close[2]) + Math.PI / 2;
        this.dir = (util.getDirection(radians) + 8) % 8;
        this.animation = 0;

        var rotation = util.getRadians(this.dir);

        var moveLeft = Math.cos(rotation)/2;
        var moveTop = Math.sin(rotation)/2;

        this.pos = [left + moveLeft, top + moveTop];

        this.lastUpdate = time;
      } else {
        Actor.prototype.move.call(this, time, this.speed);
      }  
    }
  };
};

Spider.prototype = Object.create(Actor.prototype);
Spider.prototype.constructor = Spider;

if (typeof module !== 'undefined') {
  module.exports = Spider;
}
