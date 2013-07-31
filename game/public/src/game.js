var socket = io.connect('http://localhost:8080');

var dir = 0;

var sources = {
  dino: '/dino-green/dino-sprite.png'
};
var images;
var loadImages = function(sources, callback) {
  var assetDir = './sprites';
  images = {};

  var loadedImages = 0;
  var numImages = 0;
  for (var src in sources) {
    numImages++;
  }
  for (src in sources) {
    images[src] = new Image();
    images[src].onload = function() {
      if (++loadedImages >= numImages) {
        callback(images);
      }
    };
    images[src].src = assetDir + sources[src];
  }
};

var loadStage = function(images) {
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
  // this is where the canvas is added as well
  stage.add(layer);

  // var c = layer.get('canvas')
  // console.log(c)
  // console.log(c.width)


  // start sprite animation
  dino.start();

  keyBindings();

  gameLoop = function(){
    GreenDino.update();
    requestAnimationFrame(gameLoop);
  };

  gameLoop();

};
loadImages(sources, loadStage);

// Convert a direction into radians
var getRadians = function(direction) {
  return Math.PI*2 / (8/direction) - Math.PI/2;
};
