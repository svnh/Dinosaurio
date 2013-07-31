var greendino;
var GreenDino = function(){

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

  getAnimArray(this.animationDefs, GreenDino);

  greendino = new Kinetic.Sprite({
    x: 200-64,
    y: 200-64,
    image: images.greendino,
    animation: 'running_n',
    animations: GreenDino.animations,
    frameRate: 12,
    index: 0
  });

  greendino.on('mouseover', function() {
    console.log('Mouseover greendino');
  });

};

GreenDino.update = function(){
  if (this.running) {
    var radians = getRadians(dir);
    var pos = greendino.getPosition();
    greendino.setPosition(pos.x+Math.cos(radians)*2, pos.y+Math.sin(radians)*2);
  }
};

GreenDino.checkBoundaries = function(){
  var greendinoX = greendino.getPosition().x;
  var greendinoY = greendino.getPosition().y;
  var windowWidth = window.outerWidth;
  var windowHeight = window.outerHeight;

  if (greendinoX >= windowWidth - 120){
    greendino.setPosition(greendinoX-20, greendinoY);
  } else if (greendinoY >= windowHeight - 200){
    greendino.setPosition(greendinoX, greendinoY-20);
  } else if (greendinoX <= 5){
    greendino.setPosition(greendinoX+20, greendinoY);
  } else if (greendinoY <= 5){
    greendino.setPosition(greendinoX, greendinoY+20);
  }
};