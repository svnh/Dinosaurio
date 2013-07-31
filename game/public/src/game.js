
var dir = 0;

// Load sprite
var imageObj = new Image();
imageObj.src = './sprites/dino-green/dino-sprite.png';

imageObj.onload = function() {
  var stage = new Kinetic.Stage({
    container: 'container',
    width: 600,
    height: 600
  });

  var layer = new Kinetic.Layer();

  GreenDino();
  // add the shape to the layer
  layer.add(dino);

  // add the layer to the stage
  stage.add(layer);

  // start sprite animation
  dino.start();

  keyBindings();

  gameLoop = function(){
    GreenDino.update();
    requestAnimationFrame(gameLoop);
  };

  gameLoop();

};

// Convert a direction into radians
var getRadians = function(direction) {
  return Math.PI*2 / (8/direction) - Math.PI/2;
};
