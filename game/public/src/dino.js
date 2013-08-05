var Dino = function(image){

  this.running = false;
  this.roaring = false;
  this.attacking = false;
  this.hit = false;
  this.lastTime = 0;

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

  this.dinoObj = new Kinetic.Sprite({
    x: 200,
    y: 200,
    image: image,
    animation: 'paused_n',
    animations: this.animations,
    frameRate: 12,
    index: 0,
    dir:0
  });

};