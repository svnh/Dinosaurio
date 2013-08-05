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

function initGame() {
  // Create chickens
}

function loop(time) {
  // Update chicken position

  // Broadcast chicken position to all clients

  // If all chickens eaten, init game
}

io.sockets.on('connection', function (socket) {

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
