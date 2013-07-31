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
    image: images.dino,
    animation: 'running_n',
    animations: actor.animations,
    frameRate: 12,
    index: 0
  });

  dino.on('mouseover', function() {
    console.log('Mouseover dino');
  });
  //mouseover bushes, set dino cord, when dino reaches cord, chomp, bush changes anim


};

GreenDino.update = function(){
  if (this.running) {
    GreenDino.checkBoundaries();
    var radians = getRadians(dir);
    var pos = dino.getPosition();

    dino.setPosition(pos.x+Math.cos(radians)*1, pos.y+Math.sin(radians)*1);
  }
};

GreenDino.checkBoundaries = function(){
  var dinoX = dino.getPosition().x;
  var dinoY = dino.getPosition().y;
  var windowWidth = window.outerWidth;
  var windowHeight = window.outerHeight;

  if (dinoX >= windowWidth - 120){
    dino.setPosition(dinoX-20, dinoY);
  } else if (dinoY >= windowHeight - 200){
    dino.setPosition(dinoX, dinoY-20);
  } else if (dinoX <= 5){
    dino.setPosition(dinoX+20, dinoY);
  } else if (dinoY <= 5){
    dino.setPosition(dinoX, dinoY+20);
  }
};