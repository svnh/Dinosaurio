var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/game/public/'));

server.listen(8080);

// chicken = {
//   hp: 100,
//   pos: [left, top]
// }
var serverChickens = [];

function initGame() {
  // Create chickens
  for (var i = 0; i < 30; i++) {
    var randomX = Math.floor((Math.random()*2048)+1);
    var randomY = Math.floor((Math.random()*2048)+1);

    serverChickens.push({
      iden: i,
      pos: [randomX, randomY]
    });
  }
}

function loop(time) {
  // Update chicken position

  // Broadcast chicken position to all clients

  // If all chickens eaten, init game
}

initGame();

io.sockets.on('connection', function (socket) {

  socket.on('init', function () {
    socket.emit('serverChickens', serverChickens);
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
