// Move all socket connection goodies into GAME
var socket = io.connect(window.location.origin);

socket.on('connect', function () {

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
    if (dinocounter > 2){
      opp.setAnimation(dinochangeanim);
    }
  });

  socket.on('counterChange', function (counterChange) {
    $('.oppCounter').text('OPPONENT CHICKENS: ' + counterChange);
  });

});

var init = function() {
  $('.play').hide();
  this.game = new Game();
  $(window).resize(Game.resizer);
}

// Don't be global
var opp;
var dinocounter = 0;

var chickens = [];
var counter = 0;
