var init = function() {
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
  $('#titles').addClass('titles');
  $('#titlecontent').addClass('titlecontent');
  $('.fight').hide();
  $('.wat').hide();
  $('.play').css("top", "170px");
  $('.play').css("left", "20px");  
};