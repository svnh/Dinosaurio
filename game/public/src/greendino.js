var GreenDino = function(){
  Dino.call(this, images.greendino);

  this.update = function(Game, time){
    if (this.running) {
        var timeDiff = (time-this.lastTime)/4;
        var radians = getRadians(this.dinoObj.attrs.dir);
        var pos = this.dinoObj.getPosition();
        this.dinoObj.setPosition(pos.x+Math.cos(radians)*timeDiff, pos.y+Math.sin(radians)*timeDiff);
        
        var newpos = [this.dinoObj.getPosition(), this.dinoObj.attrs.dir];
        Game.socket.emit('dinoupdated', newpos);
    }   
    this.lastTime = time;
    return;
  };
};

GreenDino.prototype = Object.create(Dino.prototype);
GreenDino.prototype.constructor = GreenDino;

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
