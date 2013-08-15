var Spider = function(iden, randomX, randomY){

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
      start: 144,
      frames: 7
    }
  };

  getAnimArray(this.animationDefs, this, 64);

  this.spiderObj = new Kinetic.Sprite({
    x: randomX,
    y: randomY,
    image: images.spider,
    animation: 'running_n',
    animations: this.animations,
    frameRate: 12,
    dir:0,
    hit: false,
  });
};

Spider.prototype.update = function(Game, serverSpider) {
  var direct = serverSpider.dir
  var posx = serverSpider.pos[0];
  var posy = serverSpider.pos[1];
  var animation = serverSpider.animation;
  var possibAnims = ['running_'+this.directions[direct],'running_'+this.directions[direct], 'attack_'+this.directions[direct]];

  this.spiderObj.setPosition(posx, posy);      
  if (this.spiderObj.getAnimation() !== possibAnims[animation]){
    this.spiderObj.setAnimation(possibAnims[animation]);
  }
};

