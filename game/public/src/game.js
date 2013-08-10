var Game = function() {
  this.sources = {
    greendino: '/dino-green/dino-sprite.png',
    chicken: '/chicken/chicken-sprite.png',
    reddino: '/dino-red/dino-sprite.png',
    palmtree: '/trees/palmtree.png',
    otpalm: '/trees/left.png',
    forward: '/trees/forward.png',
    spider: '/spider/spider.png'
  };

  this.images;
  this.Opp;
  this.chickens = {};
  this.spiders = {};
  this.palmTrees = [];

  this.score = 0;

  this.serverChickens;
  this.serverSpiders;

  this.chickenSound = document.getElementById('cluck');

  var socket = this.socket = io.connect(window.location.origin);
  // var socket = this.socket = io.connect('http://dinosaurio.jit.su/');

  var self = this;  
  this.room;

  socket.on('connect', function () {

    socket.on('join', function(room){
      self.room = room;
      socket.emit('room', room);
      socket.emit('init', room);
    });

    socket.on('serverChickens', function (serverChickens, serverSpiders) {

      self.serverChickens = serverChickens;
      self.serverSpiders = serverSpiders;
      $('.waiting').hide();
      $('#titles').hide();
      $('.fullScreen').css("top", "95%");
      self.loadImages(self.sources, self.loadStage);
    });

    socket.on('chickenUpdated', function (serverChickens, serverSpiders) {
      self.serverChickens = serverChickens;
      self.serverSpiders = serverSpiders;
    });
    
    socket.on('killedChicken', function (chickenIndex) {
      self.chickenSound.play();
      self.killChicken(chickenIndex);
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
        self.Opp.update(dinoupdated[0].x, dinoupdated[0].y, dinoupdated[1]);
    });
    
    socket.on('dinochangeanim', function (dinochangeanim) {
        self.Opp.dinoObj.setAnimation(dinochangeanim);
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

Game.prototype.bulkServerObjLoad = function(serverObjType, gameObj, ClassType, objType){
  var newObj;
  for (var prop in serverObjType) {
    var iden = serverObjType[prop].iden;
    var xCord = serverObjType[prop].pos[0];
    var yCord = serverObjType[prop].pos[1];
    newObj = this.newObj = new ClassType(iden, xCord, yCord);
    this.layer.add(newObj.chickenObj);
    gameObj[iden] = newObj;
  }
}

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

  this.bulkServerObjLoad(this.serverChickens, this.chickens, Chicken);
  // this.bulkServerObjLoad(this.serverSpiders, this.spiders, Spider);

  var newSpider;
  for (var prop in this.serverSpiders) {
    var iden = this.serverSpiders[prop].iden;
    var xCord = this.serverSpiders[prop].pos[0];
    var yCord = this.serverSpiders[prop].pos[1];
    newSpider = this.newSpider = new Spider(iden, xCord, yCord);
    layer.add(newSpider.spiderObj);
    this.spiders[iden] = newSpider;
  }

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

  for (var prop in this.serverSpiders) {
    this.spiders[prop].spiderObj.start();
  }

  for (var prop in this.serverChickens) {
    this.chickens[prop].chickenObj.start();
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
    var chickenBoundingRect = {
      left: parseInt(this.chickens[instance].chickenObj.attrs.x)+24,
      top: parseInt(this.chickens[instance].chickenObj.attrs.y)+24,
      width: 32,
      height: 32
    };
    if(util.theyAreColliding(playerBoundingRect, chickenBoundingRect)){
      if (this.greenDino.dinoObj.getAnimation() === 'attacking_'+this.greenDino.directions[this.greenDino.dinoObj.attrs.dir]) {
        if (this.chickens[instance] !== undefined){
          this.chickenSound.play();
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
    } for (var index in this.spiders) {
      var spiderBoundingRect = {
        left: parseInt(this.spiders[index].spiderObj.attrs.x)+24,
        top: parseInt(this.spiders[index].spiderObj.attrs.y)+24,
        width: 32,
        height: 32
      };
      if(util.theyAreColliding(playerBoundingRect, spiderBoundingRect)){
        this.score -= 1/4;
        $('.chickenCounter').text('CHICKENS: ' + this.score)
        this.socket.emit('counterChange', this.room, this.score);
      }
      if(util.theyAreColliding(chickenBoundingRect, spiderBoundingRect)){
        if (this.chickens[instance] !== undefined){
          var deadChicken = this.serverChickens[instance];
          delete this.serverChickens[instance];
          this.chickens[instance].chickenObj.remove()
          delete this.chickens[instance];
          this.socket.emit('chickenDown', this.room, instance);
        }
      }
    }
  }
};

Game.prototype.gameLoop = function(time) {
  var remainingChickens = _.size(this.chickens);

  this.collisionHandler(this.greenDino, this.serverChickens);
  this.greenDino.update(this, time);

  for (var i = 0; i < this.spiders.length; i++) {  
    this.spiders[i].update(time);
  }

  var playerPosition = [this.greenDino.dinoObj.attrs.x, this.greenDino.dinoObj.attrs.y];

  this.socket.emit('needchickenpos', this.room, playerPosition);

  for (var prop in this.serverChickens) {
    if (this.chickens[prop]){
      this.chickens[prop].update(this, this.serverChickens[prop]);
    }
  }

  for (var prop in this.serverSpiders) {
    if (this.spiders[prop]){
      this.spiders[prop].update(this, this.serverSpiders[prop]);
    }
  }

  this.checkBoundaries();
  this.translateScreen(); 
  this.resizer();

  if (remainingChickens > 0){
    requestAnimationFrame(this.gameLoop);
  } else {
    this.endGame();    
  }
};

Game.prototype.killChicken = function(chickenIndex){
  if (this.chickens[chickenIndex] !== undefined){
    delete this.serverChickens[chickenIndex];
    this.chickens[chickenIndex].chickenObj.remove()
    delete this.chickens[chickenIndex];
  }
};

Game.prototype.endGame = function() {
  this.layer.removeChildren();
  var self = this;

  setInterval(function(){
    iden = 1;
    var endChicken = self.endChicken = new Chicken(iden, util.randomCord(), util.randomCord());
    this.layer.add(endChicken.chickenObj);
  }, 200);
};
