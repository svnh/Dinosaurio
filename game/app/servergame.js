var util = require('../public/src/util.js');
var Actor = require('./serveractor.js');
var SmartChicken = require('./smartchickens.js');
var Spider = require('./serverspider.js');

var serverGame = function() {
  this.serverChickens = [];
  this.serverSpiders = [];
  this.startTime = new Date().getTime();
  this.lastTime = null;
  this.playerPositions = {};
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

// Each player reports their own position, so actors react to whichever dino is closest.
serverGame.prototype.nearestPlayer = function (pos) {
  var nearest = [0,0];
  var nearestDistance = Infinity;
  for (var id in this.playerPositions) {
    var playerPos = this.playerPositions[id];
    var distance = Math.pow(playerPos[0] - pos[0], 2) + Math.pow(playerPos[1] - pos[1], 2);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearest = playerPos;
    }
  }
  return nearest;
};

serverGame.prototype.loop = function (time) {
  for (var i = 0; i < this.serverChickens.length; i++) {
    this.serverChickens[i].move(time, this.nearestPlayer(this.serverChickens[i].pos));
  }
  for (var i = 0; i < this.serverSpiders.length; i++) {
    this.serverSpiders[i].move(time, this.nearestPlayer(this.serverSpiders[i].pos));
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
