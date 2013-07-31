var bindScreenSizeHandlers = function() {
  var nodelist = document.getElementsByTagName('canvas');
  var cnvs = nodelist[0];

  $('#container').bind('resize', function(){
    var w = $(window).width();
    var h = $(window).height();

    $("#container").css("width", w + "px");
    $("#container").css("height", h + "px");

    cnvs.width = w;
    cnvs.height = h;
  });

  $(window).resize(function(){
     $('#container').resize();
     cnvs.resize();
  });
  var goFullScreen = function(){
    var elem = document.getElementById("container");
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  };
};