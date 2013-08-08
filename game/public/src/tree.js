var Tree = function(image){
  this.animationDefs = {
    still: {
      start: 0,
      frames: 1
    }
  };

  getAnimArray(this.animationDefs, this, 126);

  var randomX = Math.floor((Math.random() * 2048) + 1);
  var randomY = Math.floor((Math.random() * 2048) + 1);

  this.treeObj = new Kinetic.Sprite({
    x: randomX,
    y: randomY,
    image: image,
    animation: 'still_e',
    animations: this.animations,
    frameRate: 0,
    dir: 4
  });
}