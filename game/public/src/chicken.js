var Chicken = function(randomX, randomY){

  this.hit = false;
  this.lastTime = 0;

  this.animationDefs = {
    picking: {
      start: 0,
      frames: 9
    },
    running: {
      start: 72,
      frames: 8
    },
    hit: {
      start: 144,
      frames: 7
    }
  };

  getAnimArray(this.animationDefs, Chicken, 64);

  Chicken.chickenObj = new Kinetic.Sprite({
    x: randomX,
    y: randomY,
    image: images.chicken,
    animation: 'running_n',
    animations: Chicken.animations,
    frameRate: 12,
    index: 0,
  });

};

//hit walls: direction+2 mod 7