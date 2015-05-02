(function(){
  var express = require('express');
  var app = express();
  var server = require('http').createServer(app);
  var io = require('socket.io').listen(server, { log: false });

  app.use(express.static(__dirname + '/public/'), { maxAge: 1 });

  var port = process.env.PORT || 3000;
  server.listen(port, function() {
    console.log('Expres server listening on port', port);
    var events = require('./app/events');
    events(io);
  });
})();