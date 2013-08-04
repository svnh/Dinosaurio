var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/game/public/'));

server.listen(8080);

io.sockets.on('connection', function (socket) {
  socket.on('init', function (msg) {
    console.log('server received init: ', msg);
    socket.emit('msg', { hello: 'server emitting initizliaze' });
  });

  socket.on('dinocreated', function (msg) {
    console.log('server received dinocreated: ', msg);
    socket.emit('msg', 'server emitting dinocreated');
    socket.broadcast.emit('msg', 'dinocreated broadcast emitted from server');
  });

  socket.on('dinoupdated', function (dinoupdated) {
    console.log('server received dinoupdated: ', dinoupdated);
    //socket.emit('msg', 'server emitting dinoupdated');
    socket.broadcast.emit('msg', dinoupdated);
  });

});
