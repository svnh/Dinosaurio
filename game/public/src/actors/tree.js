var Tree = function(image){
  this.animationDefs = {
    still: {
      start: 0,
      frames: 1
    }
  };

  getAnimArray(this.animationDefs, this, 126);

  this.treeObj = new Kinetic.Sprite({
    x: util.randomCord(),
    y: util.randomCord(),
    image: image,
    animation: 'still_e',
    animations: this.animations,
    frameRate: 0,
    dir: 4
  });
}