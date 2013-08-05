// Try to inherit 
// Pass Red/greenness as an option
var RedDino = function(){

  this.running = false;
  this.roaring = false;
  this.attacking = false;
  this.hit = false;

  this.animationDefs = {
    running: {
      frames: 8,
      start: 480
    },
    attacking: {
      start: 0,
      frames: 13
    },
    hit: {
      start: 104,
      frames: 9
    },
    looking: {
      start: 176,
      frames: 13
    },
    paused: {
      start: 280,
      frames: 12
    },
    roaring: {
      start: 376,
      frames: 13
    },
    falling: {
      start: 552,
      frames: 11
    },
    walking: {
      start: 640,
      frames: 8
    }
  };

  getAnimArray(this.animationDefs, this, 128);

  this.redDinoObj = new Kinetic.Sprite({
    x: 210,
    y: 210,
    image: images.reddino,
    animation: 'paused_n',
    animations: this.animations,
    frameRate: 12,
    index: 0,
    dir:0
  });

  this.update = function(x, y, direct){
    this.redDinoObj.attrs.dir = direct
      var radians = getRadians(direct);
      this.redDinoObj.setPosition(x+Math.cos(radians)*5, y+Math.sin(radians)*5);
      var newpos = this.redDinoObj.getPosition();
    return;
  };
};
