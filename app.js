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
    var left = serverChickens[prop].pos[0];
    var top = serverChickens[prop].pos[1];
    var size = 64;
    var doRotate = false;

    serverChickens[prop].random = random;

    if (left + size/4 <= 0) {
      left = -size/4;
      doRotate = true;
    }

    if (top + size/4 <= 0) {
      top = -size/4;
      doRotate = true;
    }

    if (left + size*3/4 >= 2048) {
      left = 2048 - size*3/4;
      doRotate = true;
    }

    if (top + size*3/4 >= 2048) {
      top = 2048 - size*3/4;
      doRotate = true;
    }

    if (doRotate) {
      serverChickens[prop].dir = Math.floor((serverChickens[prop].dir + 2) % 8);

      radians = getRadians(serverChickens[prop].dir);

      serverChickens[prop].pos = [serverChickens[prop].pos[0] + Math.cos(radians) * randomSpeed, serverChickens[prop].pos[1] + Math.sin(radians) * randomSpeed];
      serverChickens[prop].animation = 0;

    } if (time - serverChickens[prop].lastUpdate > 3000) {
      serverChickens[prop].lastUpdate = time;
      serverChickens[prop].animation = random;
      if (random === 0 || random === 1) {
        serverChickens[prop].dir = serverChickens[prop].dir === 7 ? 0 : serverChickens[prop].dir+1;
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

var room;

var initcount = 0;
var roomcount = 0;

var roomList = {};

io.sockets.on('connection', function (userSocket) {
  roomcount += 1;
  if (initcount % 2 === 0) {
    room = roomcount.toString();
    roomList[room] = {user1: userSocket.id};
  } else {
    roomList[room].user2 = userSocket.id
  }
  initcount += 1;
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
    var disconUser = userSocket.id;
    for (var prop in roomList) {
      if (disconUser === roomList[prop].user1 || disconUser === roomList[prop].user2 ){
        userSocket.in(prop).broadcast.emit('oppDisconnected', room);
        if (roomList[prop].user2 == undefined) {
          initcount += 1;
          console.log('adding')
        }
      }
    }
  });

});