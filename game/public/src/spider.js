var Spider = function(image){

  this.animationDefs = {
    attack: {
      start: 0,
      frames: 9
    },
    running: {
      start: 72,
      frames: 8
    },
    hit: {
      start: 145,
      frames: 7
    }
  };

  getAnimArray(this.animationDefs, this, 64);

  this.spiderObj = new Kinetic.Sprite({
    x: util.randomCord(),
    y: util.randomCord(),
    image: image,
    animation: 'running_n',
    animations: this.animations,
    frameRate: 12,
    dir:0,
    hit: false,
    lastTime: 0
  });
};

Spider.prototype.update = function(time) {
  var timeDiff = (time-this.spiderObj.attrs.lastTime)/4;
  var radians = util.getRadians(this.spiderObj.attrs.dir);
  var pos = this.spiderObj.getPosition();
  this.spiderObj.setPosition(pos.x+Math.cos(radians), pos.y+Math.sin(radians));
  
  var newpos = [this.spiderObj.getPosition(), this.spiderObj.attrs.dir];
  this.spiderObj.attrs.lastTime = time;
}; 

