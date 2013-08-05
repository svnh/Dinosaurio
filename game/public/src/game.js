var socket = io.connect(window.location.origin);

socket.on('connect', function () {
  socket.emit('emitting client connected');
  socket.send('sending client connected from client');
  socket.on('dinoupdated', function (dinoupdated) {
    if (dinocounter < 1){
      RedDino();
      layer.add(RedDino.redDinoObj); 
      RedDino.redDinoObj.start();
      opp = RedDino.redDinoObj;
    };
      dinocounter++;
    if (dinocounter > 2){
      RedDino.update(dinoupdated[0].x, dinoupdated[0].y, dinoupdated[1]);
    }
  });
  socket.on('dinochangeanim', function (dinochangeanim) {
    opp.setAnimation(dinochangeanim);
  });
  socket.on('counterChange', function (counterChange) {
    $('.oppCounter').text('OPPONENT CHICKENS: ' + counterChange);
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