var util = require('../public/src/util.js');
var chicken = require('./serverchicken.js');

var serverGame = {
  serverChickens: {},
  smartChickens: {},
  startTime: new Date().getTime(),
  lastTime: null,
  playerPosition: [0,0]
}

serverGame.initGame = function () {
  for (var i = 0; i < 15; i++) {
    var randomX = util.randomCord();
    var randomY = util.randomCord();

    serverGame.serverChickens[i] = {
      iden: i,
      pos: [randomX, randomY],
      dir: 0,
      random: 0,
      lastUpdate: 0,
      animation: 0,
    }
  }
  for (var i = 0; i < 15; i++) {
    var randomX = util.randomCord();
    var randomY = util.randomCord();

    serverGame.smartChickens[i] = {
      iden: i,
      pos: [randomX, randomY],
      dir: 0,
      random: 0,
      lastUpdate: 0,
      animation: 0,
    }
  }
  serverGame.loop(0);
}
  
serverGame.loop = function (time) {
  for (var prop in serverGame.serverChickens) {
    //hasownproperty
    chicken.serverMoveChicken(time, serverGame.serverChickens[prop]);
  }

  for (var prop in serverGame.smartChickens) {
    if (serverGame.smartChickens.hasOwnProperty(prop)) {
      chicken.moveSmartChicken(time, serverGame.smartChickens[prop], serverGame.playerPosition);
    }
  }

  setTimeout(function() {
    lastTime = new Date().getTime();
    serverGame.loop(lastTime-serverGame.startTime);
  }, 1000/60);
};

if (typeof module !== 'undefined') {
  module.exports = serverGame;
}