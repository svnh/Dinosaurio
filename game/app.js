(function(){
  var express = require('express');
  var app = express();
  var server = require('http').createServer(app);
  var io = require('socket.io').listen(server, { log: false });
  var util = require('./public/src/util.js');

  app.use(express.static(__dirname + '/public/'));

  server.listen(8080);

  var serverChickens = {};
  var smartChickens = {};

  var initGame = function () {
    for (var i = 0; i < 15; i++) {
      var randomX = util.randomCord();
      var randomY = util.randomCord();

      serverChickens[i] = {
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

      smartChickens[i] = {
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

  var serverMoveChicken = function(time, chickenType){
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

    var doRotate = util.isOutOfBounds(left, size, top);

    if (doRotate[0] === true) {
      newLeft = left + Math.cos(radians) * randomSpeed;
      newTop = top + Math.sin(radians) * randomSpeed

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
  }

  var loop = function (time) {
    for (var prop in serverChickens) {
      serverMoveChicken(time, serverChickens[prop]);
    }

    for (var prop in smartChickens) {
      var randomSpeed = Math.floor(Math.random() * 10);
      var random = Math.floor(Math.random() * 2);
      var radians = util.getRadians(smartChickens[prop].dir);
      var pos = smartChickens[prop].pos;
      var left = smartChickens[prop].pos[0];
      var top = smartChickens[prop].pos[1];
      var size = 64;
      var doRotate = false;
      var scaredDistance = 200

      smartChickens[prop].random = random;
      if (playerPosition !== undefined) {
        var adjacent = playerPosition[0]+(128/4) - smartChickens[prop].pos[0]+(64/4);
        var hypotenuse = playerPosition[1]+(128/4) - smartChickens[prop].pos[1]+(64/4);

        var playerDistance = Math.sqrt(
          Math.pow(adjacent, 2) + Math.pow(hypotenuse, 2)
        );

        if (playerDistance < scaredDistance
          && smartChickens[prop].pos[0] > 0
          && smartChickens[prop].pos[0] < 2000
          && smartChickens[prop].pos[1] > 0
          && smartChickens[prop].pos[1] < 2000
        ) {

          // Calculate heading
          var radians = Math.atan2(hypotenuse, adjacent) + Math.PI / 2;
          var direction = (util.getDirection(radians) + 4) % 8;
          smartChickens[prop].dir = direction;
          smartChickens[prop].animation = 0;
          smartChickens[prop].pos = [smartChickens[prop].pos[0] + Math.cos(radians), smartChickens[prop].pos[1] + Math.sin(radians)];
        } else {
          serverMoveChicken(time, smartChickens[prop])
        }  
      }
    }

    setTimeout(function() {
      lastTime = new Date().getTime();
      loop(lastTime-startTime);
    }, 1000/60);
  };

  var playerPosition;
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
        userSocket.in(room).broadcast.emit('serverChickens', serverChickens, smartChickens);
        userSocket.in(room).emit('serverChickens', serverChickens, smartChickens);
      }
    });

    userSocket.on('needchickenpos', function (room, playerpos) {
      playerPosition = playerpos;
      userSocket.in(room).emit('chickenUpdated', serverChickens, smartChickens);
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
          if (roomList[prop].user2 === undefined) {
            initcount += 1;
          }
        }
      }
    });
  });
})();