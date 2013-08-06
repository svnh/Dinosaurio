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

// chicken = {
//   hp: 100,
//   pos: [left, top]
// }
var serverChickens = [];

function initGame() {
  // Create chickens
  for (var i = 0; i < 3; i++) {
    var randomX = Math.floor((Math.random()*2048)+1);
    var randomY = Math.floor((Math.random()*2048)+1);

    serverChickens.push({
      iden: i,
      pos: [randomX, randomY],
      dir: 0,
      random: 0,
      lastUpdate: 0,
      animation: 0,
      hit: false
    });
  }

  loop(0);
}


var startTime = new Date().getTime();
var lastTime;

function loop(time) {
  for (var i = 0; i < serverChickens.length; i++) {
    if (serverChickens[i].hit === false) {
      var random = Math.floor(Math.random()*3);
      var radians = getRadians(serverChickens[i].dir);
      var pos = serverChickens[i].pos;

      serverChickens[i].random = random;

     if(serverChickens[i].pos[1] < -20 || serverChickens[i].pos[1] > 2055 || serverChickens[i].pos[0] < -20 || serverChickens[i].pos[0] > 2055) {
        serverChickens[i].dir = serverChickens[i].dir === 7 ? 0 : serverChickens[i].dir+1;

        radians = getRadians(serverChickens[i].dir);

        serverChickens[i].pos = [serverChickens[i].pos[0]+Math.cos(radians)*random, serverChickens[i].pos[1]+Math.sin(radians)*random];
        serverChickens[i].animation = 0;
      } if (time - serverChickens[i].lastUpdate > 3000) {
        serverChickens[i].lastUpdate = time;
        serverChickens[i].animation = random;

        if (random === 0 || random === 1) {
          serverChickens[i].pos = [serverChickens[i].pos[0]+Math.cos(radians)*random, serverChickens[i].pos[1]+Math.sin(radians)*random];
        }

      } else {
        if (serverChickens[i].animation === 0 || serverChickens[i].animation === 1) {
          serverChickens[i].pos = [serverChickens[i].pos[0]+Math.cos(radians)*random, serverChickens[i].pos[1]+Math.sin(radians)*random];
        } if (serverChickens[i].animation === 2) {
          serverChickens[i].pos = [serverChickens[i].pos[0], serverChickens[i].pos[1]];
          serverChickens[i].animation = 2;
        }
      }
    }
  }

  setTimeout(function() {
    lastTime = new Date().getTime();
    loop(lastTime-startTime)
  }, 1000/60);
};


  // Broadcast chicken position to all clients

  // If all chickens eaten, init game

function killChicken(chickenIndex){
  serverChickens[chickenIndex].hit = true;
};

initGame();

io.sockets.on('connection', function (socket) {
  socket.on('init', function () {
    socket.emit('serverChickens', serverChickens);
  });

  socket.on('needchickenpos', function (time) {
    socket.emit('chickenUpdated', serverChickens);
    // socket.broadcast.emit('chickenUpdated', serverChickens);
  });

  socket.on('chickenDown', function (chickenIndex) {
    if (serverChickens[chickenIndex] !== null || serverChickens[chickenIndex] !== undefined) {
      // socket.emit('chickenDown', chickenIndex);
      socket.broadcast.emit('chickenDown', chickenIndex);
      killChicken(chickenIndex);
    }
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
