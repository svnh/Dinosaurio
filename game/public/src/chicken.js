var Chicken = function(randomX, randomY){

  this.hit = false;
  this.lastTime = 0;

  this.animationDefs = {
    picking: {
      start: 0,
      frames: 9
    },
    walking: {
      start: 81,
      frames: 7
    },
    hit: {
      start: 136,
      frames: 8
    }
  };

  chickenAnimArray(this.animationDefs, Chicken);

  Chicken.chickenObj = new Kinetic.Sprite({
    x: randomX,
    y: randomY,
    image: images.chicken,
    animation: 'walking_n',
    animations: Chicken.animations,
    frameRate: 12,
    index: 0
  });
};

Chicken.update = function(time){
  // console.log('updating chicken');
  var timeDiff = (time-this.lastTime)/20;
  var radians = getRadians(Chicken.dir);
  var pos = this.chickenObj.getPosition();
  this.chickenObj.setPosition(pos.x + .008, pos.y);
  this.lastTime = time;
  return;
};

var chickenAnimArray = function(chickenAnimationDefs, Chicken){
  Chicken.dir = 0;
  Chicken.animations = {};

  // Directions encoded order
  Chicken.directions = [
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
  // For each defined animation
  for (var prop in chickenAnimationDefs) {
    var animInfo = chickenAnimationDefs[prop];

    // In each of possible directions
    for (var i = 0; i < 8; i++) {
      // Get the direction string from the directions array in alpha order
      var direction = directionsAlpha[i];

      // Create an array to hold sprite positions
      // Store it in the animations object
      var animArray = Chicken.animations[prop+'_'+direction] = [];

      // For each of the frames of the animation
      for (var j = 0; j < animInfo.frames; j++) {
        // Calculate the offset in the sprite based on the direction
        var directionOffset = i*animInfo.frames*64;

        // Calculate the offset in the sprite based on the frame #
        var frameOffset = j*64;

        // Add a frame descriptor to the animation array
        animArray.push({
          x: animInfo.start*64 + directionOffset + frameOffset,
          y: 0,
          width: 64,
          height: 64
        });
      }
    }
  }
};