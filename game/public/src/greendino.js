var GreenDino = function(){

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

  getAnimArray(this.animationDefs, GreenDino);

  GreenDino.greenDinoObj = new Kinetic.Sprite({
    x: 200-64,
    y: 200-64,
    image: images.greendino,
    animation: 'running_n',
    animations: GreenDino.animations,
    frameRate: 12,
    index: 0
  });
  GreenDino.greenDinoObj.on('mouseover', function() {
    console.log('Mouseover greendino');
  });
};

GreenDino.prototype = Object.create(GreenDino.prototype);
GreenDino.prototype.constructor = GreenDino;
GreenDino.prototype.constructor = GreenDino;

GreenDino.update = function(time){
  if (this.running) {
    var timeDiff = (time-this.lastTime)/4;
    var radians = getRadians(GreenDino.dir);
    var pos = this.greenDinoObj.getPosition();
    this.greenDinoObj.setPosition(pos.x+Math.cos(radians)*timeDiff, pos.y+Math.sin(radians)*timeDiff);
  }
  this.lastTime = time;
};

GreenDino.checkBoundaries = function(){
  var stagePosition = stage.getPosition();
  var greendinoX = this.greenDinoObj.getPosition().x + stagePosition.x + 128;
  var greendinoY = this.greenDinoObj.getPosition().y + stagePosition.y + 128;
  var windowWidth = window.outerWidth;
  var windowHeight = window.outerHeight;

  var stageMoveX = 0;
  var stageMoveY = 0;
  if (greendinoX >= windowWidth/2){
    stageMoveX = (greendinoX - windowWidth/2)*-1;
  }
  if (greendinoY >= windowHeight/2){
    stageMoveY = (greendinoY - windowHeight/2)*-1;
  }

  if (greendinoX >= 0){
    stageMoveX = (greendinoX - windowWidth/2)*-1;
  }
  if (greendinoY >= 0){
    stageMoveY = (greendinoY - windowHeight/2)*-1;
  }

  if (stageMoveX || stageMoveY) {
    stage.move(stageMoveX, stageMoveY);
  }

  // } else if (greendinoY >= windowHeight - 200){
  //   this.greenDinoObj.setPosition(greendinoX, greendinoY-20);
  // } else if (greendinoX <= 5){
  //   this.greenDinoObj.setPosition(greendinoX+20, greendinoY);
  // } else if (greendinoY <= 5){
  //   this.greenDinoObj.setPosition(greendinoX, greendinoY+20);
  // }
};
