var socket = io.connect('http://localhost:8080');

socket.on('connect', function () {
  console.log('socket connected on client')
  socket.emit('emitting client connected');
  socket.send('sending client connected from client');
  socket.on('msg', function (msg) {
    console.log('client received message: ');
    console.log('x', msg[0].x)
    console.log('y', msg[0].y)
    console.log('dir', msg[1])
    if (dinocounter < 1){
      RedDino();
      layer.add(RedDino.redDinoObj); 
      RedDino.redDinoObj.start();
      console.log('red added');
    };
      dinocounter++;
    if (dinocounter > 2){
      console.log('updating')
      RedDino.update(msg[0].x, msg[0].y, msg[1]);
    }
  });
});

var dinocounter = 0;

var init = function() {
  this.game = new Game();
  socket.emit('init', "initalizing from client");
}

var chickens = [];
var counter = 0;
var layer;

var gameLoop = function(time){
  frames++;
  // if (frames % 100 === 0) {
  //   console.log(frames / (time/1000));
  // }
  collisionHandler(GreenDino, chickens);
  Chicken.update(time);
  GreenDino.update(time);
  checkBoundaries();
  translateScreen(); 
  requestAnimationFrame(this.gameLoop);
};