var socket = io.connect('http://localhost:8080');

var init = function() {
  this.game = new Game();
}

var gameLoop = function(time){
  frames++;
  // if (frames % 100 === 0) {
  //   console.log(frames / (time/1000));
  // }
  collisionHandler(GreenDino, chickens);
  Chicken.update(time);
  GreenDino.update(time);
  checkBoundaries();
  translateScreen(); 
  requestAnimationFrame(this.gameLoop);
};