var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server, { log: false });

app.use(express.static(__dirname + '/game/public/'));

server.listen(8080);

var getRadians = function(direction) {
  return Math.PI * 2 / (8 / direction) - Math.PI / 2;
};

var serverChickens = {};

var initGame = function () {
  for (var i = 0; i < 30; i++) {
    var randomX = Math.floor((Math.random() * 2048) + 1);
    var randomY = Math.floor((Math.random() * 2048) + 1);

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

var loop = function (time) {
  for (var prop in serverChickens) {
    var randomSpeed = Math.floor(Math.random() * 2);
    var random = Math.floor(Math.random() * 3);
    var radians = getRadians(serverChickens[prop].dir);
    var pos = serverChickens[prop].pos;

    serverChickens[prop].random = random;

   if(serverChickens[prop].pos[1] < -20 || serverChickens[prop].pos[1] > 2055 || serverChickens[prop].pos[0] < -20 || serverChickens[prop].pos[0] > 2055) {
      serverChickens[prop].dir = serverChickens[prop].dir === 7 ? 0 : serverChickens[prop].dir+1;

      radians = getRadians(serverChickens[prop].dir);

      serverChickens[prop].pos = [serverChickens[prop].pos[0] + Math.cos(radians) * randomSpeed, serverChickens[prop].pos[1] + Math.sin(radians) * randomSpeed];
      serverChickens[prop].animation = 0;
    } if (time - serverChickens[prop].lastUpdate > 3000) {
      serverChickens[prop].lastUpdate = time;
      serverChickens[prop].animation = random;

      if (random === 0 || random === 1) {
        serverChickens[prop].pos = [serverChickens[prop].pos[0] + Math.cos(radians) * randomSpeed, serverChickens[prop].pos[1] + Math.sin(radians) * randomSpeed];
      }

    } else {
      if (serverChickens[prop].animation === 0 || serverChickens[prop].animation === 1) {
        serverChickens[prop].pos = [serverChickens[prop].pos[0] + Math.cos(radians) * randomSpeed, serverChickens[prop].pos[1] + Math.sin(radians) * randomSpeed];
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

var killChicken = function (chickenIndex) {
  delete serverChickens[chickenIndex];
};

var room = "room";

var initcount = 0;

io.sockets.on('connection', function (userSocket) {
  initcount += 1;
  if (initcount % 2 === 1) {
    room = initcount.toString();
  }
  userSocket.join(room);
  userSocket.in(room).emit('join', room);
  userSocket.on('init', function (room) {
    initGame();
    if (initcount % 2 === 0){
      userSocket.in(room).broadcast.emit('serverChickens', serverChickens);
      userSocket.in(room).emit('serverChickens', serverChickens);
    }
  });

  userSocket.on('needchickenpos', function (room) {
    userSocket.in(room).emit('chickenUpdated', serverChickens);
  });

  userSocket.on('chickenDown', function (room, chickenIndex) {
      userSocket.in(room).broadcast.emit('killedChicken', chickenIndex);
      // killChicken(chickenIndex);
  });

  userSocket.on('dinoCreated', function (room) {
    userSocket.in(room).broadcast.emit('dinoCreated', room);
  });

  userSocket.on('dinoupdated', function (room, dinoupdated) {
    userSocket.in(room).broadcast.emit('dinoupdated', dinoupdated);
  });

  userSocket.on('dinochangeanim', function (room, dinochangeanim) {
    userSocket.in(room).broadcast.emit('dinochangeanim', dinochangeanim);
  });

  userSocket.on('counterChange', function (room, counterChange) {
    userSocket.in(room).broadcast.emit('counterChange', counterChange);
  });

  userSocket.on('disconnect', function () {
    userSocket.in(room).broadcast.emit('oppDisconnected', room);
    if (initcount % 2 === 1) {
      initcount -= 1;
    }
  });

});