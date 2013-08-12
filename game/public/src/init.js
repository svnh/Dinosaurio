var init = function() {
  $('.play').hide();
  $('.fork').hide();
  $('.keyboard').hide();
  $('.fight').hide();
  $('#titles').addClass('titles')
  $('#titlecontent').addClass('titlecontent')
  $('.waiting').show();
  $('.chickenCounter').show();
  $('.oppCounter').show();
  this.game = new Game();
}