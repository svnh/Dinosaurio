if (typeof require !== 'undefined') {
// Include the assertion library
var expect = require('chai').expect;

var util = require('../game/public/src/util.js');
}

describe('getRadians', function() {
  it('should get radians of a direction', function() {
    var radians = util.getRadians(0);
    var answer = -1.5707963267948966;
    expect(radians).to.equal(answer);
  });
});

describe('getDirection', function() {
  it('should get radians of a direction', function() {
    var direction = util.getDirection(10);
    expect(direction).to.equal(4);
  });
});

describe('isOutOfBounds', function() {
  it('should check for out of bounds and return coords', function() {
    var inBounds = util.isOutOfBounds(128, 100, 200);
    expect(inBounds[0]).to.equal(false);
    var outOfBounds = util.isOutOfBounds(128, -100, 200);
    expect(outOfBounds[0]).to.equal(true);
  });
});

describe('findDistance', function() {
  it('should check distance between two objects', function() {
    var checkedTrue = util.findDistance([0,0], 200, 100, 100);
    expect(checkedTrue[0]).to.equal(true);
    var checkedFalse = util.findDistance([0,0], 200, 900, 900);
    expect(checkedFalse[0]).to.equal(false);
  });
});

describe('theyAreColliding', function() {
  it('should check if two items are colliding', function() {
     var firstBoundingRect = {
      left: 50,
      top: 50,
      width: 80,
      height: 80
    };
     var secondBoundingRect = {
      left: 0,
      top: 0,
      width: 80,
      height: 80
    };
    var colliding = util.theyAreColliding(firstBoundingRect, secondBoundingRect);
    expect(colliding).to.equal(true);
    var thirdBoundingRect = {
      left: 100,
      top: 100,
      width: 80,
      height: 80
    };
    var fourthBoundingRect = {
      left: 0,
      top: 0,
      width: 80,
      height: 80
    };
    var colliding = util.theyAreColliding(thirdBoundingRect, fourthBoundingRect);
    expect(colliding).to.equal(false);
  });
});
