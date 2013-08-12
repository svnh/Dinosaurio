(function(){
  var express = require('express');
  var app = express();
  var server = require('http').createServer(app);
  var io = require('socket.io').listen(server, { log: false });

  app.use(express.static(__dirname + '/public/'), { maxAge: 1 });

  server.listen(8080);
  var events = require('./app/events');
  events(io);

})();