(function(){
  var express = require('express');
  var app = express();
  var server = require('http').createServer(app);
  var io = require('socket.io').listen(server, { log: false });
  var util = require('./public/src/util.js');
  var chicken = require('./app/serverchicken.js');
  var serverGame = require('./app/servergame.js');

  app.use(express.static(__dirname + '/public/'));

  server.listen(8080);

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
      serverGame.initGame();
      if (initcount % 2 === 0){
        userSocket.in(room).broadcast.emit('serverChickens', serverGame.serverChickens, serverGame.smartChickens);
        userSocket.in(room).emit('serverChickens', serverGame.serverChickens, serverGame.smartChickens);
      }
    });

    userSocket.on('needchickenpos', function (room, playerpos) {
      serverGame.playerPosition = playerpos;
      userSocket.in(room).emit('chickenUpdated', serverGame.serverChickens, serverGame.smartChickens);
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
      for (var prop in serverGame.roomList) {
        if (disconUser === serverGame.roomList[prop].user1 || disconUser === serverGame.roomList[prop].user2 ){
          userSocket.in(prop).broadcast.emit('oppDisconnected', room);
          if (serverGame.roomList[prop].user2 === undefined) {
            initcount += 1;
          }
        }
      }
    });
  });

})();