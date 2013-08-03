var Chicken = function(randomX, randomY){

  this.hit = false;
  this.lastTime = 0;
  this.actionDuration = 0;
  this.lastActionChange = 0;

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
    dir:0
  });
  console.log(Chicken.chickenObj.attrs.dir)
};

// Chicken.setAction = function(action){
//   this.lastActionChange = this.lastUpdate;
//   Chicken.setAction.apply(this, arguments);
// };

// Chicken.setPosition = function(left, top) {
//   if (
//     left + this.size/4 < 0 ||
//     top + this.size/4 < 0 ||
//     left + this.size*3/4 > this.game.size[0] ||
//     top + this.size*3/4 > this.game.size[1]
//   ) {
//     this.rotateTo((Chicken.dir + 2) % 8);
//   }
//   Chicken.setPosition.apply(this, arguments);
// };

// Chicken.update = function(time) {
//   console.log(time)
//   // Store current time
//   this.lastUpdate = time;
//   if (time - this.lastActionChange > this.actionDuration) {
//           var possibleActions = 3;
//           var newAction = Math.round(Math.random()*(possibleActions-1));

//           // Peck sometimes
//           if (newAction === 0) {
//                   var peckTime = Math.round(Math.random()*1500);
//                   this.actionDuration = peckTime+500;

//                   this.setAction('attacking');
//                   return;
//           }
//           else if (newAction === 2) {
//                   var walkTime = Math.round(Math.random()*2000);
//                   this.actionDuration = walkTime;

//                   // Walk for a bit
//                   this.setAction('running');
//                   return;
//           }
//           else if (newAction === 1) {
//                   var direction = Math.round(Math.random());
//                   this.actionDuration = 1000;

//                   console.log('Chicken is rotating %s', direction ? 'left' : 'right');

//                   // Change direction
//                   if (direction)
//                           this.rotateRight();
//                   else
//                           this.rotateLeft();
//                   return;

//           }
//   }
//   return Chicken.update.call(this, time);
// };

//hit walls: direction+2 mod 7