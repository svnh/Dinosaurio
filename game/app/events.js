var serverGame = require('./servergame.js');
var Spider = require('./serverspider.js');

var room;
var initcount = 0;
var roomcount = 0;
var roomList = {};
var game;

module.exports = function(io) {
  io.sockets.on('connection', function (userSocket) {
    initcount += 1;
    if (initcount % 2 === 1) {
      roomcount += 1;
      room = roomcount.toString();
      roomList[room] = {user1: userSocket.id};
    } else {
      roomList[room].user2 = userSocket.id
    }
    userSocket.join(room);
    userSocket.in(room).emit('join', room);
    userSocket.on('init', function (room) {
      if (initcount % 2 === 0){
        game = new serverGame();
        roomList[room].game = game;
        roomList[room].game.initGame();
        userSocket.in(room).broadcast.emit('serverChickens', game.serverChickens, game.serverSpiders);
        userSocket.in(room).emit('serverChickens', game.serverChickens, game.serverSpiders);
      }
    });

    userSocket.on('needchickenpos', function (room, playerpos) {
      if (roomList[room].game !== undefined) {
      roomList[room].game.playerPosition = playerpos;
      userSocket.in(room).emit('chickenUpdated', roomList[room].game.serverChickens, roomList[room].game.serverSpiders);
      }
    });

    userSocket.on('newspider', function (room, x, y) {
      var newSpider = new Spider({
        iden: roomList[room].game.serverSpiders.length,
        posx: x,
        posy: y
      });
      roomList[room].game.serverSpiders.push(newSpider)
      userSocket.in(room).broadcast.emit('spidercreated', newSpider);
      userSocket.in(room).emit('spidercreated', newSpider);
    });

    userSocket.on('spiderattack', function (room, index) {
     if (roomList[room].game && roomList[room].game.serverSpiders[index] !== undefined) {
        roomList[room].game.serverSpiders[index].attacking = true;
        setTimeout(function(){
          roomList[room].game.serverSpiders[index].attacking = false;
          roomList[room].game.serverSpiders[index].pos = [roomList[room].game.serverSpiders[index].pos[0] - 1/20, roomList[room].game.serverSpiders[index].pos[1] - 1/20];
        }, 1000);
      }
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
}