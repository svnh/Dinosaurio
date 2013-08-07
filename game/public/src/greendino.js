var GreenDino = function(){
  Dino.call(this, images.greendino);

  this.update = function(Game, time){
    if (this.running) {
      var timeDiff = (time-this.lastTime)/4;
      var radians = getRadians(this.dinoObj.attrs.dir);
      var pos = this.dinoObj.getPosition();
      this.dinoObj.setPosition(pos.x+Math.cos(radians)*timeDiff, pos.y+Math.sin(radians)*timeDiff);
      
      var newpos = [this.dinoObj.getPosition(), this.dinoObj.attrs.dir];
      Game.socket.emit('dinoupdated', Game.room, newpos);
    }
    this.lastTime = time;
    return;
  };
};

GreenDino.prototype = Object.create(Dino.prototype);
GreenDino.prototype.constructor = GreenDino;