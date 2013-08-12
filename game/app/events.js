var serverGame = require('./servergame.js');
var Spider = require('./serverspider.js');

var room;
var initcount = 0;
var roomcount = 0;
  
module.exports = function(io) {
  io.sockets.on('connection', function (userSocket) {
    roomcount += 1;
    if (initcount % 2 === 0) {
      room = roomcount.toString();
      serverGame.roomList[room] = {user1: userSocket.id};
    } else {
      serverGame.roomList[room].user2 = userSocket.id
    }
    initcount += 1;
    userSocket.join(room);
    userSocket.in(room).emit('join', room);
    userSocket.on('init', function (room) {
      serverGame.initGame();
      if (initcount % 2 === 0){
        userSocket.in(room).broadcast.emit('serverChickens', serverGame.serverChickens, serverGame.serverSpiders);
        userSocket.in(room).emit('serverChickens', serverGame.serverChickens, serverGame.serverSpiders);
      }
    });

    userSocket.on('needchickenpos', function (room, playerpos) {
      serverGame.playerPosition = playerpos;
      userSocket.in(room).emit('chickenUpdated', serverGame.serverChickens, serverGame.serverSpiders);
    });

    userSocket.on('newspider', function (room, x, y) {
      var newSpider = new Spider({
        iden: serverGame.serverSpiders.length,
        posx: x,
        posy: y
      });
      serverGame.serverSpiders.push(newSpider)
      userSocket.in(room).emit('newspidercreated', newSpider);
    });

    userSocket.on('spiderattack', function (room, index) {
      serverGame.serverSpiders[index].attacking = true;
      setTimeout(function(){
        serverGame.serverSpiders[index].attacking = false;
        serverGame.serverSpiders[index].pos = [serverGame.serverSpiders[index].pos[0] - 1/20, serverGame.serverSpiders[index].pos[1] - 1/20];
      }, 1000);
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
}