var socket = io.connect('http://localhost:8080');

var sources = {
  greendino: '/dino-green/dino-sprite.png',
  chicken: '/chicken/chicken-sprite.png',
  reddino: '/dino-red/dino-sprite.png',
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

  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;

  var background = document.getElementById('background');

  background.style.width=windowWidth;
  background.style.height=windowHeight;

  window.stage = new Kinetic.Stage({
    container: 'game',
    width: windowWidth,
    height: windowHeight
  });

  var layer = new Kinetic.Layer();

  GreenDino();
  layer.add(GreenDino.greenDinoObj);


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

  // start sprite animation
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

  var backgroundWidth = document.getElementById('background').offsetWidth;
  var backgroundHeight = document.getElementById('background').offsetHeight;

  var sizeX = 2048;
  var sizeY = 2048;

  var translateLeft = 0;
  var translateTop = 0;

  if (dinoX + width/2 > sizeX) {
    translateLeft = (sizeX - width);
  }
  else if (dinoX > width/2) {
    translateLeft = (dinoX - width/2);
  }

  if (dinoY + height/2 > sizeY) {
    translateTop = (sizeY - height);
  }
  else if (dinoY > height/2) {
    translateTop = (dinoY - height/2);
  }
  stage.setOffsetX(translateLeft);
  stage.setOffsetY(translateTop);
  background.style.webkitTransform = 'translate3d('+Math.floor(translateLeft*-1)+'px, '+Math.floor(translateTop*-1)+'px, 0)';
};

var frames = 0;
var gameLoop = function(time){
  frames++;
  // if (frames % 100 === 0) {
  //   console.log(frames / (time/1000));
  // }

  // RedDino.checkBoundaries();
  // RedDino.update();

  // collisionHandler();
  // Chicken.update(time);

  GreenDino.update(time);

  checkBoundaries(); 

  requestAnimationFrame(gameLoop);
};

// Convert a direction into radians
var getRadians = function(direction) {
  return Math.PI*2 / (8/direction) - Math.PI/2;
};


