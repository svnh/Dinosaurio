var init = function() {
  $('.play').hide();
  $('.fork').hide();
  $('.keyboard').hide();
  $('.waiting').show();
  $('.chickenCounter').show();
  $('.oppCounter').show();
  this.game = new Game();
  $(window).resize(Game.resizer);
}