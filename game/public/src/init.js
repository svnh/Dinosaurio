var startMusic = function() {
  var music = document.getElementById('george');
  if (music.paused) {
    music.play().catch(function(){});
  }
};

var init = function() {
  startMusic();
  $('#titles').addClass('titles');
  $('#titlecontent').addClass('titlecontent');
  $('.play').hide();
  $('.wat').hide();
  $('.fork').hide();
  $('.keyboard').hide();
  $('.fight').hide();
  $('.waiting').show();
  $('.chickenCounter').show();
  $('.oppCounter').show();
  this.game = new Game();
};

var wat = function() {
  startMusic();
  $('#titles').addClass('titles');
  $('#titlecontent').addClass('titlecontent');
  $('.fight').hide();
  $('.wat').hide();
  $('.play').css("top", "30%");
  $('.play').css("left", "20px");  
};