var socket = io.connect('http://localhost:8080');

var dir = 0;

// Load sprite
var imageObj = new Image();
imageObj.src = './sprites/dino-green/dino-sprite.png';

imageObj.onload = function() {
  var stage = new Kinetic.Stage({
    container: 'container',
    width: window.outerWidth,
    height: window.outerHeight
  });

  var layer = new Kinetic.Layer();

  GreenDino();
  // add the shape to the layer
  layer.add(dino);

  // add the layer to the stage
  stage.add(layer);

  // start sprite animation
  dino.start();

  bindScreenSizeHandlers();

  var cnvs = document.getElementsByTagName('canvas');
  console.log(cnvs[0])

  keyBindings();

  gameLoop = function(){
    GreenDino.checkBoundaries();
    GreenDino.update();
    requestAnimationFrame(gameLoop);
  };

  gameLoop();

};

// Convert a direction into radians
var getRadians = function(direction) {
  return Math.PI*2 / (8/direction) - Math.PI/2;
};
