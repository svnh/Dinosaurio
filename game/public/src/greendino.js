var dino;
var GreenDino = function(){

  this.running = false;
  this.roaring = false;
  this.attacking = false;

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

  actor(this.animationDefs);

// Create a new sprite
  dino = new Kinetic.Sprite({
    x: 200-64,
    y: 200-64,
    image: imageObj,
    animation: 'running_n',
    animations: actor.animations,
    frameRate: 12,
    index: 0
  });

};

GreenDino.update = function(){
  if (this.running) {
    var radians = getRadians(dir);
    var pos = dino.getPosition();

    dino.setPosition(pos.x+Math.cos(radians)*1, pos.y+Math.sin(radians)*1);
  }
};