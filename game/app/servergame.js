var util = require('../public/src/util.js');
var Chicken = require('./serverchicken.js');
var SmartChicken = require('./smartchickens.js');
var Spider = require('./serverspider.js');

var serverGame = {
  serverSpiders: [],
  serverChickens: [],
  startTime: new Date().getTime(),
  lastTime: null,
  playerPosition: [0,0], 
  roomList: {}
}

serverGame.initGame = function () {
  for (var i = 0; i < 15; i++) {
    serverGame.serverChickens[i] = new Chicken({
      iden: i
    })
  }
  for (var i = 15; i < 30; i++) {
    serverGame.serverChickens[i] = new SmartChicken({
      iden: i
    })
  }
  for (var i = 0; i < 10; i++) {
    serverGame.serverSpiders[i] = new Spider({
      iden: i
    })
  }
  serverGame.loop(0);
}

serverGame.loop = function (time) {
  for (var i = 0; i < serverGame.serverChickens.length; i++) {
    serverGame.serverChickens[i].move(time, serverGame.playerPosition);
  }
  for (var i = 0; i < serverGame.serverSpiders.length; i++) {
    serverGame.serverSpiders[i].move(time, serverGame.playerPosition);
  }

  setTimeout(function() {
    lastTime = new Date().getTime();
    serverGame.loop(lastTime - serverGame.startTime);
  }, 1000/60);
};

if (typeof module !== 'undefined') {
  module.exports = serverGame;
}