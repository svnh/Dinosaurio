// Move all socket connection goodies into GAME
var socket = io.connect(window.location.origin);

socket.on('connect', function () {
  socket.on('dinoupdated', function (dinoupdated) {
    if (dinocounter < 1){
      Opp = new RedDino();
      console.log(Opp)
      layer.add(Opp.redDinoObj); 
      Opp.redDinoObj.start();
    };
      dinocounter++;
    if (dinocounter > 2){
      Opp.update(dinoupdated[0].x, dinoupdated[0].y, dinoupdated[1]);
    }
  });

  socket.on('dinochangeanim', function (dinochangeanim) {
    if (dinocounter > 2){
      Opp.redDinoObj.setAnimation(dinochangeanim);
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
var Opp;
var dinocounter = 0;

var chickens = [];
var counter = 0;
