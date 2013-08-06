var Game = function() {
  this.sources = {
    greendino: '/dino-green/dino-sprite.png',
    chicken: '/chicken/chicken-sprite.png',
    reddino: '/dino-red/dino-sprite.png',
  };

  this.images;
  this.Opp;
  this.chickens = [];
  this.counter = 0;
  this.loadImages(this.sources, this.loadStage);
  // Permenantly bind methods to this object
  this.gameLoop = this.gameLoop.bind(this);


  this.dinocounter = 0;
  this.serverChickens;

  var self = this;

  var socket = this.socket = io.connect(window.location.origin);
  socket.on('connect', function () {
    socket.emit('init', 'client init');
    socket.on('serverChickens', function (serverChickens) {
      self.serverChickens = serverChickens;
      console.log(self.serverChickens)
    });

    socket.on('dinoupdated', function (dinoupdated) {
      if (self.dinocounter < 1){
        self.Opp = new RedDino();
        layer.add(self.Opp.dinoObj); 
        self.Opp.dinoObj.start();
      };
        self.dinocounter++;
      if (self.dinocounter > 2){
        self.Opp.update(dinoupdated[0].x, dinoupdated[0].y, dinoupdated[1]);
      }
    });
    
    socket.on('dinochangeanim', function (dinochangeanim) {
      if (self.dinocounter > 2){
        self.Opp.dinoObj.setAnimation(dinochangeanim);
      }
    });
    
    socket.on('counterChange', function (counterChange) {
      $('.oppCounter').text('OPPONENT CHICKENS: ' + counterChange);
    });
  });
};

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
// Move this.chickens

// Listen for initgame event
// Create this.chickens

Game.prototype.loadStage = function(images) {
  var background = document.getElementById('background');

  var stage = this.stage = new Kinetic.Stage({
    container: 'game',
    width: window.innerWidth,
    height: window.innerHeight
  });

  layer = this.layer =  new Kinetic.Layer();

  var greenDino = this.greenDino = new GreenDino();
  layer.add(greenDino.dinoObj);

  var newChicken;

  for (var i = 0; i < 30; i++) {
    var iden = this.serverChickens[i].iden
    var randomX = this.serverChickens[i].pos[0];
    var randomY = this.serverChickens[i].pos[1];
    newChicken = this.newChicken = new Chicken(iden, randomX, randomY);
    layer.add(newChicken.chickenObj);
    this.chickens.push(newChicken)
  }

  stage.add(this.layer);

  for (var i = 0; i < this.chickens.length; i++) {
    this.chickens[i].chickenObj.start();
  }

  greenDino.dinoObj.start();
  keyBindings(this, greenDino, greenDino.dinoObj, 'up', 'left', 'right', 'space', '/');

  requestAnimationFrame(this.gameLoop);
};

Game.prototype.checkBoundaries = function(){
  var dinoX = this.greenDino.dinoObj.getPosition().x;
  var dinoY = this.greenDino.dinoObj.getPosition().y;

  var sizeX = 1935;
  var sizeY = 1950;
  var backgroundWidth = document.getElementById('background').offsetHeight;

  if (dinoY >= sizeY){
    this.greenDino.dinoObj.setPosition(dinoX, sizeY);
  }
  if (dinoY <= -20){
    this.greenDino.dinoObj.setPosition(dinoX, -20);
  }
  if (dinoX >= sizeX){
    this.greenDino.dinoObj.setPosition(sizeX, dinoY);
  }
  if (dinoX <= -15){
    this.greenDino.dinoObj.setPosition(-15, dinoY);
  }
  if (dinoX <= -15 && dinoY <= -20){
    this.greenDino.dinoObj.setPosition(-15, -20);
  }
  if (dinoX >= sizeX && dinoY >= sizeY){
    this.greenDino.dinoObj.setPosition(sizeX, sizeY);
  }
  if (dinoX >= sizeX && dinoY <= -20){
    this.greenDino.dinoObj.setPosition(sizeX, -20);
  }
  if (dinoX <= -15 && dinoY >= sizeY){
    this.greenDino.dinoObj.setPosition(-15, sizeY);
  }
};


Game.prototype.translateScreen = function(){
  var dinoX = this.greenDino.dinoObj.getPosition().x + 128/2;
  var dinoY = this.greenDino.dinoObj.getPosition().y + 128/2;

  var width = window.innerWidth;
  var height = window.innerHeight;

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

Game.prototype.collisionHandler = function(GreenDino, chickens, stage){
  for (var i = 0; i < chickens.length; i++) {
    var chickenInstance = chickens[i].chickenObj.attrs;
    if(theyAreColliding(this.greenDino.dinoObj, chickenInstance)){
      if (this.greenDino.dinoObj.getAnimation() === 'attacking_'+this.greenDino.directions[this.greenDino.dinoObj.attrs.dir]){
        if (!chickenInstance.hit) {
          chickenInstance.hit = true;
          chickens[i].chickenObj.hide();
          this.counter++;
          $('.chickenCounter').text('CHICKENS: ' + this.counter)
          this.socket.emit('counterChange', this.counter);
        }
      }
   } else {
      chickenInstance.hit = false;
    }
  }
};

Game.prototype.gameLoop = function(time) {
  this.collisionHandler(this.greenDino, this.chickens);
  this.greenDino.update(this, time);

  for (var i = 0; i < this.chickens.length; i++) {
    this.chickens[i].update(this, time);
  }

  this.checkBoundaries();
  this.translateScreen(); 
  requestAnimationFrame(this.gameLoop);
};
