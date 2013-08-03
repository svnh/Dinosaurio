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

  getAnimArray(this.animationDefs, Chicken, 64);

  Chicken.chickenObj = new Kinetic.Sprite({
    x: randomX,
    y: randomY,
    image: images.chicken,
    animation: 'running_n',
    animations: Chicken.animations,
    frameRate: 12,
    index: 0,
    dir:0,
    lastUpdate: 0,
    hit: false
  });

};

Chicken.update = _.throttle(function(time){

  for (var i = 0; i < chickens.length; i++) {
    var chickenInstance = chickens[i].attrs;
    var random = Math.random()*5;
    var radians = getRadians(chickens[i].attrs.dir);
    var pos = chickens[i].getPosition();
    var possibAnims = ['running_'+Chicken.directions[chickenInstance.dir],'running_'+Chicken.directions[chickenInstance.dir], 'picking_'+Chicken.directions[chickenInstance.dir]];

    if(chickenInstance.y < -20 || chickenInstance.y > 2055 || chickenInstance.x < -20 || chickenInstance.x > 2055) {
      chickenInstance.dir = chickenInstance.dir === 7 ? 0 : chickenInstance.dir+1;
      chickenInstance.turnedRight = true;

      radians = getRadians(chickenInstance.dir);
      chickens[i].setAnimation('running_'+Chicken.directions[chickenInstance.dir]);
      chickens[i].setPosition(pos.x+Math.cos(radians)*random, pos.y+Math.sin(radians)*random);

    } else if (time - chickenInstance.lastUpdate > 3000){
      chickenInstance.lastUpdate = time;

      var randomChoice = Math.floor((Math.random()*3));
      chickens[i].setAnimation(possibAnims[randomChoice]);

      if(randomChoice === 0 || randomChoice === 2){
        chickens[i].setPosition(pos.x+Math.cos(radians)*random, pos.y+Math.sin(radians)*random);
      }

    } else if (chickenInstance.animation === 'running_'+Chicken.directions[chickenInstance.dir] ) {
        chickens[i].setPosition(pos.x+Math.cos(radians)*random, pos.y+Math.sin(radians)*random);
    }

  }
}, 30); 
