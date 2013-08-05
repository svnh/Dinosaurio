
var RedDino = function(){
  Dino.call(this, images.reddino);

  // this.redDinoObj = new Kinetic.Sprite({
  //   x: 210,
  //   y: 210,
  //   image: images.reddino,
  //   animation: 'paused_n',
  //   animations: this.animations,
  //   frameRate: 12,
  //   index: 0,
  //   dir:0
  // });

  this.update = function(x, y, direct){
    this.dinoObj.attrs.dir = direct
      var radians = getRadians(direct);
      this.dinoObj.setPosition(x+Math.cos(radians)*5, y+Math.sin(radians)*5);
      var newpos = this.dinoObj.getPosition();
    return;
  };
};

RedDino.prototype = Object.create(Dino.prototype);
RedDino.prototype.constructor = RedDino;