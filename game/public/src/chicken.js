var Chicken = function(randomX, randomY){

  this.hit = false;
  // this.iden = iden;

  this.animationDefs = {
    picking: {
      start: 0,
      frames: 9
    },
    running: {
      start: 72,
      frames: 8
    },
    hit: {
      start: 144,
      frames: 7
    }
  };

  getAnimArray(this.animationDefs, this, 64);
  this.chickenObj = new Kinetic.Sprite({
    x: randomX,
    y: randomY,
    image: images.chicken,
    animation: 'running_n',
    animations: this.animations,
    frameRate: 12,
    index: 0,
    dir:0,
    lastUpdate: 0,
    hit: false,
  });

};

Chicken.prototype.update = function(Game, serverChicken) {
  if (serverChicken !== null){
    var direct = serverChicken.dir
    var posx = serverChicken.pos[0];
    var posy = serverChicken.pos[1];
    var animation = serverChicken.animation;
    var possibAnims = ['running_'+this.directions[direct],'running_'+this.directions[direct], 'picking_'+this.directions[direct]];

    if (!this.chickenObj.hit){
      this.chickenObj.setPosition(posx, posy);      
      if (this.chickenObj.getAnimation() !== possibAnims[animation]){
        this.chickenObj.setAnimation(possibAnims[animation]);
      }
    }
  }
};

