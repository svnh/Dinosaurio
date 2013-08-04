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

  getAnimArray(this.animationDefs, RedDino, 128);

  RedDino.redDinoObj = new Kinetic.Sprite({
    x: 210,
    y: 210,
    image: images.reddino,
    animation: 'running_n',
    animations: RedDino.animations,
    frameRate: 12,
    index: 0,
    dir:0
  });

  RedDino.update = function(x, y, direct){
    console.log('rddir', RedDino.directions)
    console.log('direct', direct)
    RedDino.redDinoObj.attrs.dir = direct
    console.log('rd', RedDino.redDinoObj.attrs.dir)
      var radians = getRadians(direct);
      this.redDinoObj.setPosition(x+Math.cos(radians)*5, y+Math.sin(radians)*5);
      var newpos = this.redDinoObj.getPosition();
      // RedDino.redDinoObj.setAnimation('running_'+RedDino.directions[RedDino.redDinoObj.attrs.dir]);

      RedDino.redDinoObj.setAnimation('running_'+RedDino.directions[direct]);
    return;
  };
};

// RedDino.update = function(){
//   if (this.running) {
//     var radians = getRadians(RedDino.dir);
//     var pos = RedDino.redDinoObj.getPosition();
//     RedDino.redDinoObj.setPosition(pos.x+Math.cos(radians)*2, pos.y+Math.sin(radians)*2);
//   }
// };

// RedDino.checkBoundaries = function(){
//   var reddinoX = RedDino.redDinoObj.getPosition().x;
//   var reddinoY = RedDino.redDinoObj.getPosition().y;
//   var windowWidth = window.outerWidth;
//   var windowHeight = window.outerHeight;

//   if (reddinoX >= windowWidth - 120){
//     RedDino.redDinoObj.setPosition(reddinoX-20, reddinoY);
//   } else if (reddinoY >= windowHeight - 200){
//     RedDino.redDinoObj.setPosition(reddinoX, reddinoY-20);
//   } else if (reddinoX <= 5){
//     RedDino.redDinoObj.setPosition(reddinoX+20, reddinoY);
//   } else if (reddinoY <= 5){
//     RedDino.redDinoObj.setPosition(reddinoX, reddinoY+20);
//   }
// };