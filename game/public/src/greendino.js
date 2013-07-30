var animations = {};
var dir = 0;
var dino, animating = false;

// Directions encoded order
var directions = [
  'n',  // 0
  'ne', // 1
  'e',  // 2
  'se', // 3 
  's',  // 4
  'sw', // 5 
  'w',  // 6
  'nw'  // 7
];

// Directions in alphabetical order
var directionsAlpha = [
  'e',
  'n',
  'ne',
  'nw',
  's',
  'se',
  'sw',
  'w'
];

var animationDefs = {
  running: {
    frames: 8,
    start: 480
  },
  attacking: {
    start: 0,
    frames: 13
  },
  hit: {
    start: 104,
    frames: 9
  },
  looking: {
    start: 176,
    frames: 13
  },
  paused: {
    start: 280,
    frames: 12
  },
  roaring: {
    start: 376,
    frames: 13
  },
  falling: {
    start: 552,
    frames: 11
  },
  walking: {
    start: 640,
    frames: 8
  }
};

// For each defined animation
for (var prop in animationDefs) {
  var animInfo = animationDefs[prop];

  // In each of possible directions
  for (var i = 0; i < 8; i++) {
    // Get the direction string from the directions array in alpha order
    var direction = directionsAlpha[i];

    // Create an array to hold sprite positions
    // Store it in the animations object
    var animArray = animations[prop+'_'+direction] = [];

    // For each of the frames of the animation
    for (var j = 0; j < animInfo.frames; j++) {
      // Calculate the offset in the sprite based on the direction
      var directionOffset = i*animInfo.frames*128;

      // Calculate the offset in the sprite based on the frame #
      var frameOffset = j*128;

      // Add a frame descriptor to the animation array
      animArray.push({
        x: animInfo.start*128 + directionOffset + frameOffset,
        y: 0,
        width: 128,
        height: 128
      });
    }
  }
}

// Load sprite
var imageObj = new Image();

imageObj.onload = function() {
  var stage = new Kinetic.Stage({
    container: 'container',
    width: 600,
    height: 600
  });

  var layer = new Kinetic.Layer();

  // Create a new sprite
  var dino = new Kinetic.Sprite({
    x: 200-64,
    y: 200-64,
    image: imageObj,
    animation: 'running_n',
    animations: animations,
    frameRate: 12,
    index: 0
  });

  // add the shape to the layer
  layer.add(dino);

  // add the layer to the stage
  stage.add(layer);

  // start sprite animation
  dino.start();

  var running = false;
  var roaring = false;
  var attacking = false;

  Mousetrap.bind('up', function(){
    running = false;
    dino.setAnimation('paused_'+directions[dir]);
  }, 'keyup');
  Mousetrap.bind('up', function(){
    if (!running) {
      dino.setAnimation('running_'+directions[dir]);
    }
    running = true;
  }, 'keydown');

  Mousetrap.bind('left', function(){
    dir = dir === 0 ? 7 : dir -1;
    if (running)
      dino.setAnimation('running_'+directions[dir]);
    else
      dino.setAnimation('paused_'+directions[dir]);
  });
  Mousetrap.bind('right', function(){
    dir = dir === 7 ? 0 : dir+1;
    if (running)
      dino.setAnimation('running_'+directions[dir]);
    else
      dino.setAnimation('paused_'+directions[dir]);
  });

  Mousetrap.bind('space', function(){
    attacking = false;
    dino.setAnimation('paused_'+directions[dir]);
  }, 'keyup');
  Mousetrap.bind('space', function(){
    if (!attacking) {
      dino.setAnimation('attacking_'+directions[dir]);
    }
    attacking = true;
  }, 'keydown');

  Mousetrap.bind('/', function(){
    roaring = false;
    dino.setAnimation('paused_'+directions[dir]);
  }, 'keyup');
  Mousetrap.bind('/', function(){
    if (!roaring) {
      dino.setAnimation('roaring_'+directions[dir]);
    }
    roaring = true;
  }, 'keydown');

  var update = function(){
    if (running) {
      var radians = getRadians(dir);
      var pos = dino.getPosition();

      dino.setPosition(pos.x+Math.cos(radians)*1, pos.y+Math.sin(radians)*1);
    }
  };

  var gameLoop = function(){
    update();
    requestAnimationFrame(gameLoop);
  };

  gameLoop();

};


imageObj.src = './sprites/dino-green/dino-sprite.png';

// Convert a direction into radians
var getRadians = function(direction) {
  return Math.PI*2 / (8/direction) - Math.PI/2;
};