var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/game/public/'));

server.listen(8080);

io.sockets.on('connection', function (socket) {
  socket.on('init', function (msg) {
    socket.emit('msg', { hello: 'server emitting initizliaze' });
  });

  socket.on('dinocreated', function (msg) {
    socket.emit('msg', 'server emitting dinocreated');
    socket.broadcast.emit('msg', 'dinocreated broadcast emitted from server');
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
