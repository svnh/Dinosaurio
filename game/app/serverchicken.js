var util = require('../public/src/util.js');
var chicken = {}

chicken.serverMoveChicken = function(time, chickenType){
  var randomSpeed = (Math.random() * 2);
  var random = Math.floor(Math.random() * 3);
  var radians = util.getRadians(chickenType.dir);
  var pos = chickenType.pos;
  var left = chickenType.pos[0];
  var top = chickenType.pos[1];
  var size = 64;
  var newLeft = left + Math.cos(radians) * randomSpeed;
  var newTop = top + Math.sin(radians) * randomSpeed;

  chickenType.random = random;

  var doRotate;
  doRotate = util.isOutOfBounds(size, left, top);

  if (doRotate[0] === true) {
    newLeft = doRotate[1] + Math.cos(radians) * randomSpeed;
    newTop = doRotate[2] + Math.sin(radians) * randomSpeed

    chickenType.dir = Math.floor((chickenType.dir + 2) % 8);

    radians = util.getRadians(chickenType.dir);

    chickenType.pos = [newLeft, newTop];
    chickenType.animation = 0;

  } if (time - chickenType.lastUpdate > 3000) {
    chickenType.lastUpdate = time;
    chickenType.animation = random;
    if (random === 0 || random === 1) {
      chickenType.dir = chickenType.dir === 7 ? 0 : chickenType.dir+1;
      chickenType.pos = [newLeft, newTop];
    }

  } else {
    if (chickenType.animation === 0 || chickenType.animation === 1) {
      chickenType.pos = [newLeft, newTop];
    } if (chickenType.animation === 2) {
      chickenType.pos = [chickenType.pos[0], chickenType.pos[1]];
      chickenType.animation = 2;
    }
  }
};

chicken.moveSmartChicken = function(time, smartChicken, playerPosition){
  var randomSpeed = Math.floor(Math.random() * 10);
  var random = Math.floor(Math.random() * 2);
  var radians = util.getRadians(smartChicken.dir);
  var pos = smartChicken.pos;
  var left = smartChicken.pos[0];
  var top = smartChicken.pos[1];
  var size = 64;
  var doRotate = false;
  var scaredDistance = 200
    // console.log('boo')

  smartChicken.random = random;
  if (playerPosition !== undefined) {
    // console.log('bha')
    var adjacent = playerPosition[0]+(128/4) - smartChicken.pos[0]+(64/4);
    var hypotenuse = playerPosition[1]+(128/4) - smartChicken.pos[1]+(64/4);

    var playerDistance = Math.sqrt(
      Math.pow(adjacent, 2) + Math.pow(hypotenuse, 2)
    );

    if (playerDistance < scaredDistance
      && smartChicken.pos[0] > 0
      && smartChicken.pos[0] < 2000
      && smartChicken.pos[1] > 0
      && smartChicken.pos[1] < 2000
    ) {

      // Calculate heading
      var radians = Math.atan2(hypotenuse, adjacent) + Math.PI / 2;
      var direction = (util.getDirection(radians) + 4) % 8;
      smartChicken.dir = direction;
      smartChicken.animation = 0;
      smartChicken.pos = [smartChicken.pos[0] + Math.cos(radians), smartChicken.pos[1] + Math.sin(radians)];
    } else {
      chicken.serverMoveChicken(time, smartChicken)
    }  
  }
};

if (typeof module !== 'undefined') {
  module.exports = chicken;
}

