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

  for (var i = 0; i < 30; i++) {
    var randomX = Math.floor((Math.random()*2048)+1);
    var randomY = Math.floor((Math.random()*2048)+1);
    Chicken(randomX, randomY);
    layer.add(Chicken.chickenObj);
    chickens.push(Chicken.chickenObj)
  }
  console.log(chickens)
  stage.add(layer);

  for (var i = 0; i < chickens.length-1; i++) {
    chickens[i].start();
  }

  GreenDino.greenDinoObj.start();
  keyBindings(GreenDino, GreenDino.greenDinoObj, 'up', 'left', 'right', 'space', '/');

  gameLoop();

};

loadImages(sources, loadStage);

var chickenAttrs = [];

var updateChickens = _.throttle(function(){
  chickenAttrs = [];
  for (var i = 0; i < chickens.length; i++) {
    var random = Math.random()*10;
    var radians = getRadians(chickens[i].attrs.dir);
    var pos = chickens[i].getPosition();
    chickenAttrs.push(pos);
      if(chickenAttrs[i].y < 20  || chickenAttrs[i].y > 2048 || chickenAttrs[i].x < 20 || chickenAttrs[i].x > 2048) {
        chickens[i].attrs.dir = chickens[i].attrs.dir === 7 ? 0 : chickens[i].attrs.dir+1
        pos = chickens[i].getPosition();
        radians = getRadians(chickens[i].attrs.dir);
        chickens[i].setAnimation('running_'+Chicken.directions[chickens[i].attrs.dir]);
        chickens[i].setPosition(pos.x+Math.cos(radians)*random, pos.y+Math.sin(radians)*random);
      } else {
        chickens[i].setPosition(pos.x+Math.cos(radians)*random, pos.y+Math.sin(radians)*random);
      }
  }
}, 50); 

var frames = 0;
var gameLoop = function(time){
  frames++;
  // if (frames % 100 === 0) {
  //   console.log(frames / (time/1000));
  // }

  // collisionHandler();
  updateChickens();

  GreenDino.update(time);
  checkBoundaries();
  translateScreen(); 
  requestAnimationFrame(gameLoop);
};