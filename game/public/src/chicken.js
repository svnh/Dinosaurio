var Chicken = function(){

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
    x: 1020,
    y: 1020,
    image: images.chicken,
    animation: 'walking_n',
    animations: Chicken.animations,
    frameRate: 12,
    index: 0
  });
};

var chickenAnimArray = function(dinoAnimationDefs, DinoClass){
  console.log('chickenarray')
  DinoClass.dir = 0;
  DinoClass.animations = {};

  // Directions encoded order
  DinoClass.directions = [
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
  for (var prop in dinoAnimationDefs) {
    var animInfo = dinoAnimationDefs[prop];

    // In each of possible directions
    for (var i = 0; i < 8; i++) {
      // Get the direction string from the directions array in alpha order
      var direction = directionsAlpha[i];

      // Create an array to hold sprite positions
      // Store it in the animations object
      var animArray = DinoClass.animations[prop+'_'+direction] = [];

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