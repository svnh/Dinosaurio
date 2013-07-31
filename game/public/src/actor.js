var actor = function(dinoAnimationDefs, dino){
  actor.animations = {};

  // Directions encoded order
  actor.directions = [
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
      var animArray = actor.animations[prop+'_'+direction] = [];

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
};