var socket = io.connect('http://localhost:8080');

var sources = {
  greendino: '/dino-green/dino-sprite.png',
  chicken: '/chicken/chicken-sprite.png',
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

  var groundImage = new Kinetic.Image({
    x: 0,
    y: 0,
    fillPatternImage: images.ground,
    width: 2048,
    height: 2048
  });

  layer.add(groundImage)

  GreenDino();
  layer.add(GreenDino.greenDinoObj);


// var randomX = Math.floor((Math.random()*2048)+1);
// var randomY = Math.floor((Math.random()*2048)+1);

//   Chicken(randomX, randomY);
//   layer.add(Chicken.chickenObj);
// var randomX = Math.floor((Math.random()*2048)+1);
// var randomY = Math.floor((Math.random()*2048)+1);

//   Chicken(randomX, randomY);
//   layer.add(Chicken.chickenObj);
// var randomX = Math.floor((Math.random()*2048)+1);
// var randomY = Math.floor((Math.random()*2048)+1);

//   Chicken(randomX, randomY);
//   layer.add(Chicken.chickenObj);
// var randomX = Math.floor((Math.random()*2048)+1);
// var randomY = Math.floor((Math.random()*2048)+1);

  // RedDino();
  // layer.add(RedDino.redDinoObj);

  // add the layer and canvas to the stage
  stage.add(layer);
  $('canvas').addClass('gameCanvas');

  // start sprite animation
  Chicken.chickenObj.start();
  GreenDino.greenDinoObj.start();
  keyBindings(GreenDino, GreenDino.greenDinoObj, 'up', 'left', 'right', 'space', '/');
  // RedDino.redDinoObj.start();
  // keyBindings(RedDino, RedDino.redDinoObj, 'w', 'a', 'd', 'c', 'q');

  gameLoop();

};

loadImages(sources, loadStage);

var checkBoundaries = function(){
  var dinoX = GreenDino.greenDinoObj.getPosition().x + 128/2;
  var dinoY = GreenDino.greenDinoObj.getPosition().y + 128/2;
  var width = window.outerWidth;
  var height = window.outerHeight;

  var sizeX = 2048;
  var sizeY = 2048;

  var stageOffsetX = 0;
  var stageOffsetY = 0;

  if (dinoX + width/2 > sizeX) {
    stageOffsetX = (sizeX - width);
  }
  else if (dinoX > width/2) {
    stageOffsetX = (dinoX - width/2);
  }

  if (dinoY + height/2 > sizeY) {
    stageOffsetY = (sizeY - height);
  }
  else if (dinoY > height/2) {
    stageOffsetY = (dinoY - height/2);
  }

  stage.setOffsetX(stageOffsetX);
  stage.setOffsetY(stageOffsetY);
};

var throttleupdate = _.throttle(function(time){
  GreenDino.update(time);
  requestAnimationFrame(gameLoop);
}, 20);

var gameLoop = function(time){
  // RedDino.checkBoundaries();
  // RedDino.update();

  // collisionHandler();
  Chicken.update(time);

  GreenDino.update(time);
  requestAnimationFrame(gameLoop);

  throttleupdate(time);
  checkBoundaries(); 

};

// Convert a direction into radians
var getRadians = function(direction) {
  return Math.PI*2 / (8/direction) - Math.PI/2;
};


