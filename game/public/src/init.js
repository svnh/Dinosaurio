var init = function() {
  $('.play').hide();
  $('.waiting').show();
  this.game = new Game();
  $(window).resize(Game.resizer);
}