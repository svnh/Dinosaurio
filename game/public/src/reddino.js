var RedDino = function(){
  Dino.call(this, images.reddino);

  this.update = function(x, y, direct){
    this.dinoObj.attrs.dir = direct
      var radians = util.getRadians(direct);
      this.dinoObj.setPosition(x+Math.cos(radians)*5, y+Math.sin(radians)*5);
      var newpos = this.dinoObj.getPosition();
    return;
  };
};

RedDino.prototype = Object.create(Dino.prototype);
RedDino.prototype.constructor = RedDino;