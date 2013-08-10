var util = require('../public/src/util.js');

var Chicken = function(options){
  options = options || {};
  options.posx = options.posx || util.randomCord();
  options.posy = options.posy || util.randomCord();
  this.iden = options.iden || 0;
  this.pos = [
    options.posx, options.posy
  ];
  this.dir = options.dir || 0;
  this.random = options.random || 0;
  this.lastUpdate = options.lastUpdate || 0;
  this.animation = options.animation || 0;
}

Chicken.prototype.move = function(time){
  var randomSpeed = (Math.random() * 2);
  var random = this.random = Math.floor(Math.random() * 3);
  var radians = util.getRadians(this.dir);
  var left = this.pos[0];
  var top = this.pos[1];
  var size = 64;
  var newLeft = left + Math.cos(radians) * randomSpeed;
  var newTop = top + Math.sin(radians) * randomSpeed;


  var doRotate;
  doRotate = util.isOutOfBounds(size, left, top);

  if (doRotate[0] === true) {
    newLeft = doRotate[1] + Math.cos(radians) * randomSpeed;
    newTop = doRotate[2] + Math.sin(radians) * randomSpeed

    this.dir = Math.floor((this.dir + 2) % 8);
    radians = util.getRadians(this.dir);

    this.pos = [newLeft, newTop];
    this.animation = 0;

  } if (time - this.lastUpdate > 3000) {
    this.lastUpdate = time;
    this.animation = random;
    if (random === 0 || random === 1) {
      this.dir = this.dir === 7 ? 0 : this.dir+1;
      this.pos = [newLeft, newTop];
    }

  } else {
    if (this.animation === 0 || this.animation === 1) {
      this.pos = [newLeft, newTop];
    } if (this.animation === 2) {
      this.pos = [this.pos[0], this.pos[1]];
      this.animation = 2;
    }
  }
};

if (typeof module !== 'undefined') {
  module.exports = Chicken;
}

