var GreenDino = function(){
  socket.emit('dinocreated', "dinocreated from client");

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

  getAnimArray(this.animationDefs, GreenDino, 128);

  GreenDino.greenDinoObj = new Kinetic.Sprite({
    x: 200,
    y: 200,
    image: images.greendino,
    animation: 'paused_n',
    animations: GreenDino.animations,
    frameRate: 12,
    index: 0,
    dir:0
  });

  GreenDino.update = function(time){
    if (this.running) {
      var timeDiff = (time-this.lastTime)/4;
      var radians = getRadians(GreenDino.greenDinoObj.attrs.dir);
      var pos = this.greenDinoObj.getPosition();
      this.greenDinoObj.setPosition(pos.x+Math.cos(radians)*timeDiff, pos.y+Math.sin(radians)*timeDiff);
      
      var newpos = [this.greenDinoObj.getPosition(), GreenDino.greenDinoObj.attrs.dir];
      socket.emit('dinoupdated', newpos);
    }
    
    this.lastTime = time;
    return;
  };
};


// GreenDino.checkBoundaries = function(){
//   var stagePosition = stage.getPosition();
//   var greendinoX = this.greenDinoObj.getPosition().x + stagePosition.x + 128/2;
//   var greendinoY = this.greenDinoObj.getPosition().y + stagePosition.y + 128/2;
//   var windowWidth = window.outerWidth;
//   var windowHeight = window.outerHeight;

//   var stageMoveX = 0;
//   var stageMoveY = 0;

//   if (
//     (greendinoX <= windowWidth/2 && stagePosition.x <= 0) ||
//     (greendinoX >= windowWidth/2 && stagePosition.x - windowWidth >= -2048)
//   ){
//      stageMoveX = (greendinoX - windowWidth/2)*-1;
//   }
//   if (
//     (greendinoY <= windowHeight/2 && stagePosition.y <= 0) ||
//     (greendinoY >= windowHeight/2 && stagePosition.y - windowHeight >= -2048)
//   ){
//     stageMoveY = (greendinoY - windowHeight/2)*-1;
//   }

//   if (stageMoveX || stageMoveY) {
//     stage.move(stageMoveX, stageMoveY);
//   }
// };
