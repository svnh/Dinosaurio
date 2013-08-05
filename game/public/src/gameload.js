var Game = function() {
  this.sources = {
    greendino: '/dino-green/dino-sprite.png',
    chicken: '/chicken/chicken-sprite.png',
    reddino: '/dino-red/dino-sprite.png',
  };

  this.images;

  this.loadImages(this.sources, this.loadStage);

  this.frames = 0;

  // Permenantly bind gameLoop to this object
  this.gameLoop = this.gameLoop.bind(this);
  this.loadStage = this.loadStage.bind(this);
};

// Game.prototype.connectors = function(){
//   var socket = this.socket = io.connect(window.location.origin);

//   socket.on('connect', function () {

//     socket.on('dinoupdated', function (dinoupdated) {
//       if (dinocounter < 1){
//         RedDino();
//         layer.add(RedDino.redDinoObj); 
//         RedDino.redDinoObj.start();
//         opp = RedDino.redDinoObj;
//       };
//         dinocounter++;
//       if (dinocounter > 2){
//         RedDino.update(dinoupdated[0].x, dinoupdated[0].y, dinoupdated[1]);
//       }
//     });

//     socket.on('dinochangeanim', function (dinochangeanim) {
//       if (dinocounter > 2){
//         opp.setAnimation(dinochangeanim);
//       }
//     });

//     socket.on('counterChange', function (counterChange) {
//       $('.oppCounter').text('OPPONENT CHICKENS: ' + counterChange);
//     });
//   });
// };

Game.prototype.loadImages = function(sources, callback) {
  var assetDir = './sprites';
  images = {};

  var self = this;

  var loadedImages = 0;
  var numImages = 0;
  for (var src in sources) {
    numImages++;
  }
  for (src in sources) {
    images[src] = new Image();
    images[src].onload = function() {
      if (++loadedImages >= numImages) {
        callback.call(self, images);
      }
    };
    images[src].src = assetDir + sources[src];
  }
};

// Listen for chickenposition event on socket
// Move chickens

// Listen for initgame event
// Create chickens

Game.prototype.loadStage = function(images) {
  var background = document.getElementById('background');

  var stage = this.stage = new Kinetic.Stage({
    container: 'game',
    width: window.innerWidth,
    height: window.innerHeight
  });

  layer = this.layer =  new Kinetic.Layer();

  var greenDino = this.greenDino = new GreenDino();

  layer.add(greenDino.greenDinoObj);
  var newChicken;
  for (var i = 0; i < 30; i++) {
    var randomX = Math.floor((Math.random()*2048)+1);
    var randomY = Math.floor((Math.random()*2048)+1);
    var newChicken = this.newChicken = new Chicken(randomX, randomY);
    layer.add(newChicken.chickenObj);
    chickens.push(newChicken.chickenObj)
  }

  stage.add(this.layer);

  for (var i = 0; i < chickens.length; i++) {
    chickens[i].start();
  }

  greenDino.greenDinoObj.start();
  keyBindings(greenDino, greenDino.greenDinoObj, 'up', 'left', 'right', 'space', '/');

  requestAnimationFrame(this.gameLoop);
};

Game.prototype.checkBoundaries = function(){
  var dinoX = this.greenDino.greenDinoObj.getPosition().x;
  var dinoY = this.greenDino.greenDinoObj.getPosition().y;

  var sizeX = 1935;
  var sizeY = 1950;
  var backgroundWidth = document.getElementById('background').offsetHeight;

  if (dinoY >= sizeY){
    this.greenDino.greenDinoObj.setPosition(dinoX, sizeY);
  }
  if (dinoY <= -20){
    this.greenDino.greenDinoObj.setPosition(dinoX, -20);
  }
  if (dinoX >= sizeX){
    this.greenDino.greenDinoObj.setPosition(sizeX, dinoY);
  }
  if (dinoX <= -15){
    this.greenDino.greenDinoObj.setPosition(-15, dinoY);
  }
  if (dinoX <= -15 && dinoY <= -20){
    this.greenDino.greenDinoObj.setPosition(-15, -20);
  }
  if (dinoX >= sizeX && dinoY >= sizeY){
    this.greenDino.greenDinoObj.setPosition(sizeX, sizeY);
  }
  if (dinoX >= sizeX && dinoY <= -20){
    this.greenDino.greenDinoObj.setPosition(sizeX, -20);
  }
  if (dinoX <= -15 && dinoY >= sizeY){
    this.greenDino.greenDinoObj.setPosition(-15, sizeY);
  }
};


Game.prototype.translateScreen = function(){
  var dinoX = this.greenDino.greenDinoObj.getPosition().x + 128/2;
  var dinoY = this.greenDino.greenDinoObj.getPosition().y + 128/2;

  var width = window.innerWidth;
  var height = window.innerHeight;

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
  this.stage.setOffsetX(translateLeft);
  this.stage.setOffsetY(translateTop);
  background.style.webkitTransform = 'translate3d('+Math.floor(translateLeft*-1)+'px, '+Math.floor(translateTop*-1)+'px, 0)';
};

Game.prototype.resizer = _.throttle(function() {
  var newWidth = window.innerWidth;
  var newHeight = window.innerHeight;
  var background = document.getElementById('background');

  background.style.width=newWidth;
  background.style.height=newHeight;
  this.stage.setSize(newWidth, newHeight);
}, 75);

Game.prototype.gameLoop = function(time) {
  collisionHandler(this.greenDino, chickens);
  this.greenDino.update(time);

  this.newChicken.update(time);
  this.checkBoundaries();
  this.translateScreen(); 
  requestAnimationFrame(this.gameLoop);
};
