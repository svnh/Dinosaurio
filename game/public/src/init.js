var init = function() {
  $('.play').hide();
  $('.waiting').show();
  $('.chickenCounter').show();
  $('.oppCounter').show();
  this.game = new Game();
  $(window).resize(Game.resizer);
}