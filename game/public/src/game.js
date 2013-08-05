var socket = io.connect('http://localhost:8080');

socket.on('connect', function () {
  console.log('socket connected on client')
  socket.emit('emitting client connected');
  socket.send('sending client connected from client');
  socket.on('dinoupdated', function (dinoupdated) {
    console.log('client received message: ');
    console.log('x', dinoupdated[0].x)
    console.log('y', dinoupdated[0].y)
    console.log('dir', dinoupdated[1])
    if (dinocounter < 1){
      RedDino();
      layer.add(RedDino.redDinoObj); 
      RedDino.redDinoObj.start();
      console.log('red added');
      opp = RedDino.redDinoObj;
    };
      dinocounter++;
    if (dinocounter > 2){
      console.log('updating')
      RedDino.update(dinoupdated[0].x, dinoupdated[0].y, dinoupdated[1]);
    }
  });
});
var opp;
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