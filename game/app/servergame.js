var util = require('../public/src/util.js');
var Actor = require('./serveractor.js');
var SmartChicken = require('./smartchickens.js');
var Spider = require('./serverspider.js');

var serverGame = function() {
  this.serverChickens = [];
  this.serverSpiders = [];
  this.startTime = new Date().getTime();
  this.lastTime = null;
  this.playerPosition = [0,0];
};

serverGame.prototype.initGame = function () {
  for (var i = 0; i < 15; i++) {
    this.serverChickens[i] = new Actor({
      iden: i
    })
  }
  for (var i = 15; i < 30; i++) {
    this.serverChickens[i] = new SmartChicken({
      iden: i
    })
  }
  for (var i = 0; i < 10; i++) {
    this.serverSpiders[i] = new Spider({
      iden: i
    })
  }
  this.loop(0);
}

serverGame.prototype.loop = function (time) {
  for (var i = 0; i < this.serverChickens.length; i++) {
    this.serverChickens[i].move(time, this.playerPosition);
  }
  for (var i = 0; i < this.serverSpiders.length; i++) {
    this.serverSpiders[i].move(time, this.playerPosition);
  }
  var self = this;
  setTimeout(function() {
    lastTime = new Date().getTime();
    self.loop(lastTime - self.startTime);
  }, 1000/60);
};

if (typeof module !== 'undefined') {
  module.exports = serverGame;
}
