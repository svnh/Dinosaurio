var socket = io.connect('http://localhost:8080');

var sources = {
  greendino: '/dino-green/dino-sprite.png',
  reddino: '/dino-red/dino-sprite.png',
  ground: '/ground.jpg'
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
  console.log(window.innerWidth, window.innerHeight)
  window.stage = new Kinetic.Stage({
    container: 'container',
    width: window.innerWidth,
    height: window.innerHeight
  });

  var layer = new Kinetic.Layer();


  var image = new Kinetic.Image({
    x: 0,
    y: 0,
    fillPatternImage: images.ground,
    width: 2048,
    height: 2048
  });

  layer.add(image)


  GreenDino();
  RedDino();
  // add the shape to the layer
  layer.add(GreenDino.greenDinoObj);
  layer.add(RedDino.redDinoObj);

  // add the layer to the stage
  // This is where the canvas is added as well
  stage.add(layer);

  // start sprite animation
  GreenDino.greenDinoObj.start();
  keyBindings(GreenDino, GreenDino.greenDinoObj, 'up', 'left', 'right', 'space', '/');
  RedDino.redDinoObj.start();
  keyBindings(RedDino, RedDino.redDinoObj, 'w', 'a', 'd', 'c', 'q');
  $('canvas').addClass('gameCanvas');
  gameLoop();

};

loadImages(sources, loadStage);


var gameLoop = function(time){
  RedDino.checkBoundaries();
  collisionHandler();
  GreenDino.update(time);
  GreenDino.checkBoundaries();
  RedDino.update();
  requestAnimationFrame(gameLoop);
};

// Convert a direction into radians
var getRadians = function(direction) {
  return Math.PI*2 / (8/direction) - Math.PI/2;
};


