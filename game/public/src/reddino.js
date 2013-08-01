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

  getAnimArray(this.animationDefs, RedDino);

  RedDino.redDinoObj = new Kinetic.Sprite({
    x: 1024,
    y: 1024,
    image: images.reddino,
    animation: 'running_n',
    animations: RedDino.animations,
    frameRate: 12,
    index: 0
  });

  RedDino.redDinoObj.on('mouseover', function() {
    console.log('Mouseover reddino');
  });

};

RedDino.update = function(){
  if (this.running) {
    var radians = getRadians(RedDino.dir);
    var pos = RedDino.redDinoObj.getPosition();
    RedDino.redDinoObj.setPosition(pos.x+Math.cos(radians)*2, pos.y+Math.sin(radians)*2);
  }
};

RedDino.checkBoundaries = function(){
  var reddinoX = RedDino.redDinoObj.getPosition().x;
  var reddinoY = RedDino.redDinoObj.getPosition().y;
  var windowWidth = window.outerWidth;
  var windowHeight = window.outerHeight;

  if (reddinoX >= windowWidth - 120){
    RedDino.redDinoObj.setPosition(reddinoX-20, reddinoY);
  } else if (reddinoY >= windowHeight - 200){
    RedDino.redDinoObj.setPosition(reddinoX, reddinoY-20);
  } else if (reddinoX <= 5){
    RedDino.redDinoObj.setPosition(reddinoX+20, reddinoY);
  } else if (reddinoY <= 5){
    RedDino.redDinoObj.setPosition(reddinoX, reddinoY+20);
  }
};