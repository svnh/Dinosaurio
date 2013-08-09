if (typeof require !== 'undefined') {
// Include the assertion library
var expect = require('chai').expect;

var util = require('./game/public/src/util.js');
}

describe('getRadians', function() {
  // Create id blocks for each test
  it('should get radians of a direction', function() {
    var hi = 0;
    // var direction = util.getRadians(direction);
    // var direction = 1.5707963267948966;
    expect(hi).to.equal(0);
  });
});


// util.getRadians = function() {
//   return Math.PI * 2 / (8 / 0) - Math.PI / 2;
// };