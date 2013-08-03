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

var chickens = [];
var chickenAttrs = [];

var loadStage = function(images) {

  var background = document.getElementById('background');

  window.stage = new Kinetic.Stage({
    container: 'game',
    width: window.innerWidth,
    height: window.innerHeight
  });

  var layer = new Kinetic.Layer();

  GreenDino();
  layer.add(GreenDino.greenDinoObj);

  for (var i = 0; i < 50; i++) {
    var randomX = Math.floor((Math.random()*2048)+1);
    var randomY = Math.floor((Math.random()*2048)+1);
    Chicken(randomX, randomY);
    layer.add(Chicken.chickenObj);
    chickens.push(Chicken.chickenObj)
  }

  stage.add(layer);

  for (var i = 0; i < chickens.length; i++) {
    chickens[i].start();
  }

  GreenDino.greenDinoObj.start();
  keyBindings(GreenDino, GreenDino.greenDinoObj, 'up', 'left', 'right', 'space', '/');

  gameLoop();

};

loadImages(sources, loadStage);

var gameLoop = function(time){

  for (var i = 0; i < chickens.length; i++) {
    var radians = getRadians(Chicken.dir);
    var pos = chickens[i].getPosition();
    chickenAttrs.push(pos);
    chickens[i].setPosition(pos.x+Math.cos(radians), pos.y+Math.sin(radians));
  }

  GreenDino.update(time);
  checkBoundaries();
  translateScreen(); 
  requestAnimationFrame(gameLoop);
};
