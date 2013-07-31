var socket = io.connect('http://localhost:8080');
var dir = 0;

var sources = {
  greendino: '/dino-green/dino-sprite.png',
  reddino: '/dino-red/dino-sprite.png'
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
  RedDino();
  // add the shape to the layer
  layer.add(greendino);
  layer.add(reddino);

  // add the layer to the stage
  // this is where the canvas is added as well
  stage.add(layer);

  // var c = layer.get('canvas')
  // console.log(c)
  // console.log(c.width)


  // start sprite animation
  greendino.start();
  keyBindings(GreenDino, greendino, 'up', 'left', 'right', 'space', '/');
  reddino.start();
  keyBindings(RedDino, reddino, 'w', 'a', 'd', 'c', 'q');

  gameLoop = function(){
    collisionHandler();
    GreenDino.update();
    RedDino.update();
    requestAnimationFrame(gameLoop);
  };

  gameLoop();

};

loadImages(sources, loadStage);

// Convert a direction into radians
var getRadians = function(direction) {
  return Math.PI*2 / (8/direction) - Math.PI/2;
};

var theyAreColliding = function(greendino, reddino) {
  greenX = greendino.attrs.x;
  greenY = greendino.attrs.y;
  redX = reddino.attrs.x;
  redY = reddino.attrs.y;

  return( !(greenX > redX + 64 ||  //
   greenX + 64 < redX ||  // 
   greenY > redY + 64 ||   //
   greenY + 64 < redY));  //
};

var collisionHandler = function(){
  if(theyAreColliding(greendino, reddino)){
    if (greendino.getAnimation() === 'attacking_'+GreenDino.directions[dir]){
      if (!RedDino.hit) {
        RedDino.hit = true;
        reddino.setAnimation('hit_'+RedDino.directions[dir]);
      }
    }
    if (reddino.getAnimation() === 'attacking_'+RedDino.directions[dir]){
      if (!GreenDino.hit) {
        GreenDino.hit = true;
        console.log(GreenDino.hit);
        greendino.setAnimation('hit_'+GreenDino.directions[dir]);
      }
    }
  } else {
    RedDino.hit = false;
    GreenDino.hit = false;
  }
};


