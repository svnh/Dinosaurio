var Game = function() {
  this.sources = {
    greendino: '/dino-green/dino-sprite.png',
    chicken: '/chicken/chicken-sprite.png',
    reddino: '/dino-red/dino-sprite.png',
    palmtree: '/trees/palmtree.png',
    otpalm: '/trees/left.png',
    forward: '/trees/forward.png'
  };

  this.images;
  this.Opp;
  this.chickens = {};
  this.smartChickenObjs = {};
  this.score = 0;

  this.dinocounter = 0;
  this.serverChickens;
  this.smartChickens;

  var socket = this.socket = io.connect('http://dinosaurio.jit.su/');

  var self = this;  
  this.room;

  socket.on('connect', function () {

    socket.on('join', function(room){
      self.room = room;
      socket.emit('room', room);
      socket.emit('init', room);
    });

    socket.on('serverChickens', function (serverChickens, smartChickens) {
      self.serverChickens = serverChickens;
      self.smartChickens = smartChickens;
      $('.waiting').hide();
      $('#titles').hide();
      $('.fullScreen').css("top", "95%");
      self.loadImages(self.sources, self.loadStage);
    });

    socket.on('chickenUpdated', function (serverChickens, smartChickens) {
      self.serverChickens = serverChickens;
      self.smartChickens = smartChickens;
    });
    
    socket.on('killedChicken', function (chickenIndex) {
      var chickenSound = document.getElementById('cluck');
      chickenSound.play();
      if (self.chickens[chickenIndex] !== undefined){
        delete self.serverChickens[chickenIndex];
        self.chickens[chickenIndex].chickenObj.remove()
        delete self.chickens[chickenIndex];
      }
      var dinoSound = document.getElementById('bite');
      dinoSound.play();
    });

    socket.on('dinoCreated', function () {
      self.Opp = new RedDino();
      self.layer.add(self.Opp.dinoObj); 
      self.Opp.dinoObj.start();
    });

    socket.on('dinoupdated', function (dinoupdated) {
      if (self.Opp === undefined) {
        self.Opp = new RedDino();
        self.layer.add(self.Opp.dinoObj); 
        self.Opp.dinoObj.start();
      }
      self.dinocounter++;
      if (self.dinocounter > 2){
        self.Opp.update(dinoupdated[0].x, dinoupdated[0].y, dinoupdated[1]);
      }
    });
    
    socket.on('dinochangeanim', function (dinochangeanim) {
      if (self.dinocounter > 0){
        self.Opp.dinoObj.setAnimation(dinochangeanim);
      }
    });
    
    socket.on('counterChange', function (counterChange) {
      $('.oppCounter').text('OPPONENT CHICKENS: ' + counterChange);
    });

    socket.on('oppDisconnected', function () {
      self.endGame();
    });

  });

  this.gameLoop = this.gameLoop.bind(this);
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

Game.prototype.loadStage = function(images) {
  var background = document.getElementById('background');

  var stage = this.stage = new Kinetic.Stage({
    container: 'game',
    width: window.innerWidth,
    height: window.innerHeight
  });

  layer = this.layer = new Kinetic.Layer();

  var greenDino = this.greenDino = new GreenDino();
  layer.add(greenDino.dinoObj);

  var newChicken;
  for (var prop in this.serverChickens) {
    var iden = this.serverChickens[prop].iden;
    var randomX = this.serverChickens[prop].pos[0];
    var randomY = this.serverChickens[prop].pos[1];
    newChicken = this.newChicken = new Chicken(iden, randomX, randomY);
    layer.add(newChicken.chickenObj);
    this.chickens[iden] = newChicken;
  }

  var newSmartChicken;
  for (var prop in this.smartChickens) {
    var iden = this.smartChickens[prop].iden;
    var randomX = this.smartChickens[prop].pos[0];
    var randomY = this.smartChickens[prop].pos[1];
    newSmartChicken = this.newSmartChicken = new Chicken(iden, randomX, randomY);
    layer.add(newSmartChicken.chickenObj);
    this.smartChickenObjs[iden] = newSmartChicken;
  }

  this.palmTrees = [];
  var palmTree;
  for (var i = 0; i < 5; i++) {
    palmTree = this.palmTree = new Tree(images.palmtree);
    layer.add(palmTree.treeObj);
    this.palmTrees.push(palmTree.treeObj);
    palmTree = this.palmTree = new Tree(images.forward);
    layer.add(palmTree.treeObj);
    this.palmTrees.push(palmTree.treeObj);
    palmTree = this.palmTree = new Tree(images.otpalm);
    layer.add(palmTree.treeObj);
    this.palmTrees.push(palmTree.treeObj);
  }

  stage.add(this.layer);

  for (var prop in this.serverChickens) {
    this.chickens[prop].chickenObj.start();
  }

  for (var prop in this.smartChickens) {
    this.smartChickenObjs[prop].chickenObj.start();
  }

  greenDino.dinoObj.start();
  keyBindings(this, greenDino, greenDino.dinoObj, 'up', 'left', 'right', 'space', '/');
  this.socket.emit('dinoCreated', this.room);

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
  var chompSize = 128/5;
  var chompDistance = 128/4;
  var direction = util.getRadians(this.greenDino.dinoObj.attrs.dir);
  var playerCenterLeft = this.greenDino.dinoObj.attrs.x+128/2;
  var playerCenterTop = this.greenDino.dinoObj.attrs.y+128/2;
  var playerBoundingRect = {
    left: playerCenterLeft-chompSize/2+Math.cos(direction)*chompDistance,
    top: playerCenterTop-chompSize/2+Math.sin(direction)*chompDistance,
    width: chompSize,
    height: chompSize
  };

  for (var instance in this.chickens) {
    var itemBoundingRect = {
      left: parseInt(this.chickens[instance].chickenObj.attrs.x)+24,
      top: parseInt(this.chickens[instance].chickenObj.attrs.y)+24,
      width: 32,
      height: 32
    };
    if(util.theyAreColliding(playerBoundingRect, itemBoundingRect)){
      if (this.greenDino.dinoObj.getAnimation() === 'attacking_'+this.greenDino.directions[this.greenDino.dinoObj.attrs.dir]) {
        var chickenSound = document.getElementById('cluck');
        chickenSound.play();
        var deadChicken = this.serverChickens[instance];
        delete this.serverChickens[instance];
        this.chickens[instance].chickenObj.remove()
        delete this.chickens[instance];
        this.socket.emit('chickenDown', this.room, instance);
        this.score++;
        $('.chickenCounter').text('CHICKENS: ' + this.score)
        this.socket.emit('counterChange', this.room, this.score);
      }
    }
  }

  for (var instance in this.smartChickenObjs) {
    var smartBoundingRect = {
      left: parseInt(this.smartChickenObjs[instance].chickenObj.attrs.x)+24,
      top: parseInt(this.smartChickenObjs[instance].chickenObj.attrs.y)+24,
      width: 32,
      height: 32
    };
    if(util.theyAreColliding(playerBoundingRect, smartBoundingRect)){
      if (this.greenDino.dinoObj.getAnimation() === 'attacking_'+this.greenDino.directions[this.greenDino.dinoObj.attrs.dir]) {
        var deadChicken = this.smartChickens[instance];
        delete this.smartChickens[instance];
        this.smartChickenObjs[instance].chickenObj.remove()
        delete this.smartChickenObjs[instance];
        this.socket.emit('chickenDown', this.room, instance);
        this.score++;
        $('.chickenCounter').text('CHICKENS: ' + this.score)
        this.socket.emit('counterChange', this.room, this.score);
      }
    }
  }
};

Game.prototype.gameLoop = function(time) {
  var remainingChickens = _.size(this.chickens);

  this.collisionHandler(this.greenDino, this.serverChickens);
  this.greenDino.update(this, time);

  var playerPosition = [this.greenDino.dinoObj.attrs.x, this.greenDino.dinoObj.attrs.y];

  this.socket.emit('needchickenpos', this.room, playerPosition);

  for (var prop in this.serverChickens) {
    if (this.chickens[prop]){
      this.chickens[prop].update(this, this.serverChickens[prop]);
    }
  }

  for (var prop in this.smartChickens) {
    if (this.smartChickenObjs[prop]){
      this.smartChickenObjs[prop].update(this, this.smartChickens[prop]);
    }
  }

  this.checkBoundaries();
  this.translateScreen(); 

  if (remainingChickens > 0){
    requestAnimationFrame(this.gameLoop);
  } else {
    this.endGame();    
  }
};

Game.prototype.endGame = function() {
  this.layer.removeChildren();
  var self = this;

  setInterval(function(){
    iden = 1;
    var randomX = Math.floor((Math.random() * 2048) + 1);
    var randomY = Math.floor((Math.random() * 2048) + 1);
    var endChicken = self.endChicken = new Chicken(iden, randomX, randomY);
    this.layer.add(endChicken.chickenObj);
  }, 100);
};
