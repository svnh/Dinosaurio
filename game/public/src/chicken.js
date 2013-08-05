// 1 chicken instance per chicken!
var Chicken = function(randomX, randomY){

  this.hit = false;

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
    hit: false
  });

};

// Update should control a single chicken
// GAME should call update on all chickens
// Chickens should be stored as a property of game
Chicken.prototype.update = _.throttle(function(Game, time){

  for (var i = 0; i < Game.chickens.length; i++) {
    var chickenInstance = Game.chickens[i].attrs;
    var random = Math.random()*5;
    var radians = getRadians(Game.chickens[i].attrs.dir);
    var pos = Game.chickens[i].getPosition();
    var possibAnims = ['running_'+this.directions[chickenInstance.dir],'running_'+this.directions[chickenInstance.dir], 'picking_'+this.directions[chickenInstance.dir]];

    if(chickenInstance.y < -20 || chickenInstance.y > 2055 || chickenInstance.x < -20 || chickenInstance.x > 2055) {
      chickenInstance.dir = chickenInstance.dir === 7 ? 0 : chickenInstance.dir+1;
      chickenInstance.turnedRight = true;

      radians = getRadians(chickenInstance.dir);
      Game.chickens[i].setAnimation('running_'+this.directions[chickenInstance.dir]);
      Game.chickens[i].setPosition(pos.x+Math.cos(radians)*random, pos.y+Math.sin(radians)*random);

    } else if (time - chickenInstance.lastUpdate > 3000){
      chickenInstance.lastUpdate = time;

      var randomChoice = Math.floor((Math.random()*3));
      Game.chickens[i].setAnimation(possibAnims[randomChoice]);

      if(randomChoice === 0 || randomChoice === 2){
        Game.chickens[i].setPosition(pos.x+Math.cos(radians)*random, pos.y+Math.sin(radians)*random);
      }

    } else if (chickenInstance.animation === 'running_'+this.directions[chickenInstance.dir] ) {
        Game.chickens[i].setPosition(pos.x+Math.cos(radians)*random, pos.y+Math.sin(radians)*random);
    }

  }
}, 30); 
