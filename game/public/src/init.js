var init = function() {
  $('.play').hide();
  this.game = new Game();
  $(window).resize(Game.resizer);
}