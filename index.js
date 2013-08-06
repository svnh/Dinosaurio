var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
// var _ = require('underscore');


app.use(express.static(__dirname + '/game/public/'));

server.listen(8080);

var getRadians = function(direction) {
  return Math.PI*2 / (8/direction) - Math.PI/2;
};

var serverChickens = {};

function initGame() {
  for (var i = 0; i < 30; i++) {
    var randomX = Math.floor((Math.random()*2048)+1);
    var randomY = Math.floor((Math.random()*2048)+1);

    serverChickens[i] = {
      iden: i,
      pos: [randomX, randomY],
      dir: 0,
      random: 0,
      lastUpdate: 0,
      animation: 0,
    }
  }
  loop(0);
}


var startTime = new Date().getTime();
var lastTime;

function loop(time) {
  for (var prop in serverChickens) {
    var random = Math.floor(Math.random()*3);
    var radians = getRadians(serverChickens[prop].dir);
    var pos = serverChickens[prop].pos;

    serverChickens[prop].random = random;

   if(serverChickens[prop].pos[1] < -20 || serverChickens[prop].pos[1] > 2055 || serverChickens[prop].pos[0] < -20 || serverChickens[prop].pos[0] > 2055) {
      serverChickens[prop].dir = serverChickens[prop].dir === 7 ? 0 : serverChickens[prop].dir+1;

      radians = getRadians(serverChickens[prop].dir);

      serverChickens[prop].pos = [serverChickens[prop].pos[0]+Math.cos(radians)*random, serverChickens[prop].pos[1]+Math.sin(radians)*random];
      serverChickens[prop].animation = 0;
    } if (time - serverChickens[prop].lastUpdate > 3000) {
      serverChickens[prop].lastUpdate = time;
      serverChickens[prop].animation = random;

      if (random === 0 || random === 1) {
        serverChickens[prop].pos = [serverChickens[prop].pos[0]+Math.cos(radians)*random, serverChickens[prop].pos[1]+Math.sin(radians)*random];
      }

    } else {
      if (serverChickens[prop].animation === 0 || serverChickens[prop].animation === 1) {
        serverChickens[prop].pos = [serverChickens[prop].pos[0]+Math.cos(radians)*random, serverChickens[prop].pos[1]+Math.sin(radians)*random];
      } if (serverChickens[prop].animation === 2) {
        serverChickens[prop].pos = [serverChickens[prop].pos[0], serverChickens[prop].pos[1]];
        serverChickens[prop].animation = 2;
      }
    }
  }

  setTimeout(function() {
    lastTime = new Date().getTime();
    loop(lastTime-startTime);
  }, 1000/60);
};

  // If all chickens eaten, init game

function killChicken(chickenIndex){
  delete serverChickens[chickenIndex];
};


io.sockets.on('connection', function (socket) {
  socket.on('init', function () {
    initGame();
    socket.emit('serverChickens', serverChickens);
  });

  socket.on('needchickenpos', function () {
    socket.emit('chickenUpdated', serverChickens);
  });

  socket.on('chickenDown', function (chickenIndex) {
      socket.broadcast.emit('killedChicken', chickenIndex);
      killChicken(chickenIndex);
  });

  socket.on('dinoupdated', function (dinoupdated) {
    socket.broadcast.emit('dinoupdated', dinoupdated);
  });

  socket.on('dinochangeanim', function (dinochangeanim) {
    socket.broadcast.emit('dinochangeanim', dinochangeanim);
  });

  socket.on('counterChange', function (counterChange) {
    socket.broadcast.emit('counterChange', counterChange);
  });
});
