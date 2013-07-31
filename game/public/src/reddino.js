var reddino;
var RedDino = function(){

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
  reddino = new Kinetic.Sprite({
    x: 200-64,
    y: 200-64,
    image: images.reddino,
    animation: 'running_n',
    animations: actor.animations,
    frameRate: 12,
    index: 0
  });

  reddino.on('mouseover', function() {
    console.log('Mouseover reddino');
  });
  //mouseover bushes, set reddino cord, when reddino reaches cord, chomp, bush changes anim


};

RedDino.update = function(){
  if (this.running) {
    RedDino.checkBoundaries();
    var radians = getRadians(dir);
    var pos = reddino.getPosition();

    reddino.setPosition(pos.x+Math.cos(radians)*1, pos.y+Math.sin(radians)*1);
  }
};

RedDino.checkBoundaries = function(){
  var reddinoX = reddino.getPosition().x;
  var reddinoY = reddino.getPosition().y;
  var windowWidth = window.outerWidth;
  var windowHeight = window.outerHeight;

  if (reddinoX >= windowWidth - 120){
    reddino.setPosition(reddinoX-20, reddinoY);
  } else if (reddinoY >= windowHeight - 200){
    reddino.setPosition(reddinoX, reddinoY-20);
  } else if (reddinoX <= 5){
    reddino.setPosition(reddinoX+20, reddinoY);
  } else if (reddinoY <= 5){
    reddino.setPosition(reddinoX, reddinoY+20);
  }
};